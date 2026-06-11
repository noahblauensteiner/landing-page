import path from 'path';
import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite';

/**
 * Mounts netlify/functions/chat.ts on the Vite dev server so the AI terminal
 * works locally with `npm run dev`. In production the same file runs as a
 * Netlify Function at /api/chat.
 */
function chatApiDevPlugin(): Plugin {
  return {
    name: 'chat-api-dev',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const mod = await server.ssrLoadModule('/netlify/functions/chat.ts');
          const handler = mod.default as (req: Request) => Promise<Response>;

          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const request = new Request(`http://localhost${req.url ?? '/api/chat'}`, {
            method: req.method,
            headers: { 'content-type': req.headers['content-type'] ?? 'application/json' },
            body: chunks.length > 0 ? Buffer.concat(chunks) : undefined,
          });

          const response = await handler(request);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          if (response.body) {
            const reader = response.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              res.write(value);
            }
          }
          res.end();
        } catch (error) {
          console.error('[chat-api-dev]', error);
          res.statusCode = 500;
          res.end('Internal error in dev chat endpoint.');
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  // Make the key available to the dev API middleware only — it is never
  // defined into the client bundle.
  if (env.ANTHROPIC_API_KEY) {
    process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;
  }
  return {
    plugins: [chatApiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
  };
});
