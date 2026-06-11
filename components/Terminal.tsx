import React, { useCallback, useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';

type LineKind = 'prompt' | 'output' | 'system' | 'error';

interface Line {
  id: number;
  kind: LineKind;
  text: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const PROMPT = 'guest@noah:~$';

const BOOT_LINES: Array<{ kind: LineKind; text: string }> = [
  { kind: 'system', text: 'NOAH.SYS v2.0 — portfolio intelligence online' },
  { kind: 'system', text: `loaded profile: ${profile.name} · ${profile.title} @ ${profile.company}` },
  { kind: 'output', text: "Ask me anything about Noah — projects, skills, what drives him.\nType 'help' for built-in commands." },
];

const HELP_TEXT = [
  'built-in commands:',
  '  about      who is Noah?',
  '  projects   reference projects',
  '  skills     tech stack & practices',
  '  passions   what drives him',
  '  contact    how to reach out',
  '  clear      wipe the screen',
  '',
  'anything else is sent to the AI. try: "what was his biggest project?"',
].join('\n');

const SUGGESTIONS = [
  'What is Noah passionate about?',
  'Tell me about his biggest project',
  'Why should I hire him?',
];

function commandOutput(command: string): string | null {
  switch (command) {
    case 'help':
      return HELP_TEXT;
    case 'about':
      return profile.bio.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    case 'projects':
      return profile.projects
        .map((p) => `▸ ${p.name} (${p.period}) — ${p.role}\n  ${p.impact}`)
        .join('\n');
    case 'skills':
      return Object.entries(profile.skills)
        .map(([group, items]) => `${group}: ${items.join(', ')}`)
        .join('\n');
    case 'passions':
      return profile.passions.map((p) => `▸ ${p.title} — ${p.text}`).join('\n');
    case 'contact':
      return [
        `email:    ${profile.email}`,
        `github:   ${profile.links.github}`,
        `linkedin: ${profile.links.linkedin}`,
        profile.availability,
      ].join('\n');
    default:
      return null;
  }
}

/** Keyword fallback so the terminal stays useful when the AI endpoint is unavailable. */
function offlineAnswer(question: string): string {
  const q = question.toLowerCase();
  if (/(project|work|built|reference|portfolio)/.test(q)) return commandOutput('projects')!;
  if (/(skill|stack|tech|language|tool|cloud)/.test(q)) return commandOutput('skills')!;
  if (/(passion|drive|motivat|love|interest|enjoy)/.test(q)) return commandOutput('passions')!;
  if (/(contact|email|hire|reach|available|book)/.test(q)) return commandOutput('contact')!;
  return `${commandOutput('about')!}\n\nFor anything more specific, email ${profile.email}.`;
}

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const nextId = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pushLine = useCallback((kind: LineKind, text: string): number => {
    const id = nextId.current++;
    setLines((prev) => [...prev, { id, kind, text }]);
    return id;
  }, []);

  const appendToLine = useCallback((id: number, delta: string) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, text: l.text + delta } : l)));
  }, []);

  // Boot sequence
  useEffect(() => {
    let cancelled = false;
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        if (!cancelled) pushLine(line.kind, line.text);
      }, 250 * (i + 1));
    });
    return () => {
      cancelled = true;
    };
  }, [pushLine]);

  // Keep the latest output in view
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, busy]);

  const askAi = useCallback(
    async (question: string) => {
      setBusy(true);
      const history: ChatMessage[] = [...chatHistory, { role: 'user', content: question }];
      const outputId = pushLine('output', '');
      let answer = '';
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        });
        if (!response.ok || !response.body) {
          throw new Error(`status ${response.status}`);
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const delta = decoder.decode(value, { stream: true });
          answer += delta;
          appendToLine(outputId, delta);
        }
        if (answer.trim().length === 0) {
          throw new Error('empty response');
        }
        setChatHistory([...history, { role: 'assistant', content: answer }].slice(-12));
      } catch {
        answer = offlineAnswer(question);
        appendToLine(outputId, answer);
        pushLine('system', '(offline mode — answered from local profile data)');
        setChatHistory([...history, { role: 'assistant', content: answer }].slice(-12));
      } finally {
        setBusy(false);
      }
    },
    [appendToLine, chatHistory, pushLine],
  );

  const submit = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || busy) return;
      setInput('');
      pushLine('prompt', text);

      const command = text.toLowerCase();
      if (command === 'clear') {
        setLines([]);
        return;
      }
      const builtin = commandOutput(command);
      if (builtin !== null) {
        pushLine('output', builtin);
        return;
      }
      void askAi(text);
    },
    [askAi, busy, pushLine],
  );

  return (
    <div
      className="crt relative rounded-xl border border-edge bg-panel shadow-[0_0_80px_rgba(0,255,156,0.06)] overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-edge px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-xs text-fog">
          noah@portfolio: ~/ask-me-anything
        </span>
        <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-widest text-phosphor-dim sm:block">
          ● live · claude
        </span>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className="terminal-scroll h-[340px] overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed sm:h-[420px] sm:px-6 sm:text-sm"
        aria-live="polite"
      >
        {lines.map((line) => (
          <div key={line.id} className="terminal-output mb-2">
            {line.kind === 'prompt' && (
              <span>
                <span className="text-phosphor-dim">{PROMPT} </span>
                <span className="text-paper">{line.text}</span>
              </span>
            )}
            {line.kind === 'output' && <span className="text-fog">{line.text}</span>}
            {line.kind === 'system' && <span className="text-amber/80 italic">{line.text}</span>}
            {line.kind === 'error' && <span className="text-[#ff5f57]">{line.text}</span>}
          </div>
        ))}
        {busy && <span className="cursor-blink text-phosphor">▋</span>}
      </div>

      {/* Suggestions */}
      <div className="flex gap-2 overflow-x-auto border-t border-edge px-4 py-2 sm:px-6">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => submit(s)}
            disabled={busy}
            className="shrink-0 rounded-full border border-edge px-3 py-1 font-mono text-[11px] text-fog transition-colors hover:border-phosphor-dim hover:text-phosphor disabled:opacity-40"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        className="flex items-center gap-2 border-t border-edge px-4 py-3 sm:px-6"
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
      >
        <span className="font-mono text-sm text-phosphor">{'>'}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
          placeholder={busy ? 'thinking…' : 'ask about Noah, or type help'}
          className="w-full bg-transparent font-mono text-sm text-paper placeholder-fog/50 outline-none disabled:opacity-50"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Ask the AI terminal a question"
        />
        <button
          type="submit"
          disabled={busy || input.trim().length === 0}
          className="rounded-md border border-phosphor-dim/60 px-3 py-1 font-mono text-xs text-phosphor transition-colors hover:bg-phosphor hover:text-ink disabled:opacity-30"
        >
          run
        </button>
      </form>
    </div>
  );
};

export default Terminal;
