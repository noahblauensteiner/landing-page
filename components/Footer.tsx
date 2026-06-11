import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/profile';
import Reveal from './Reveal';

const Footer: React.FC = () => (
  <footer id="contact" className="border-t border-edge/60 bg-panel/40">
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="font-mono text-xs text-phosphor-dim">// contact</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Have an ambitious idea? Let&apos;s make it real
          <span className="text-phosphor">.</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm text-fog sm:text-base">{profile.availability}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-phosphor px-5 py-3 font-mono text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            <Mail className="h-4 w-4" /> {profile.email}
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-md border border-edge p-3 text-fog transition-colors hover:border-phosphor-dim hover:text-phosphor"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-md border border-edge p-3 text-fog transition-colors hover:border-phosphor-dim hover:text-phosphor"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
      <div className="mt-16 flex flex-col gap-2 border-t border-edge/60 pt-6 font-mono text-[11px] text-fog/60 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {profile.name} — built with React, Vite &amp; the Claude API
        </span>
        <span>
          exit code 0 <span className="cursor-blink text-phosphor">▋</span>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
