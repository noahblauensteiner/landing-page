import React from 'react';
import Reveal from './Reveal';
import Terminal from './Terminal';

const AskSection: React.FC = () => (
  <section id="terminal" className="mx-auto max-w-4xl scroll-mt-16 px-4 py-24 sm:px-6">
    <Reveal>
      <p className="font-mono text-xs text-phosphor-dim">// the interesting part</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Don&apos;t read about me. <span className="text-glow text-phosphor">Interrogate me.</span>
      </h2>
      <p className="mt-4 max-w-2xl text-sm text-fog sm:text-base">
        This terminal is wired to a live LLM that knows my work. Recruiters: ask it the questions
        you&apos;d ask in a first screening call — it answers from my actual profile, and admits
        what it doesn&apos;t know.
      </p>
    </Reveal>
    <Reveal delay={0.15} className="mt-10">
      <Terminal />
    </Reveal>
  </section>
);

export default AskSection;
