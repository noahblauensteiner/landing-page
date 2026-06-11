import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';

const ROTATING = ['AI-powered systems', 'agentic workflows', 'clean architecture', 'delightful UX'];

/** Lightweight typewriter for the rotating hero words. */
function useTypewriter(words: string[]): string {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let delay = deleting ? 40 : 85;
    if (!deleting && text === word) delay = 1800;
    else if (deleting && text === '') delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setWordIndex((i) => i + 1);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words]);

  return text;
}

const Hero: React.FC = () => {
  const typed = useTypewriter(ROTATING);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-4 pt-24 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 font-mono text-xs text-phosphor-dim sm:text-sm"
        >
          // {profile.title.toLowerCase()} @ {profile.company.toLowerCase()}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
        >
          Hi, I&apos;m {profile.name.split(' ')[0]}.
          <br />
          I build{' '}
          <span className="text-glow text-phosphor">
            {typed}
            <span className="cursor-blink">▋</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
          className="mt-6 max-w-2xl text-base text-fog sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#terminal"
            className="rounded-md bg-phosphor px-5 py-3 font-mono text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            &gt;_ interrogate my AI
          </a>
          <a
            href="#work"
            className="rounded-md border border-edge px-5 py-3 font-mono text-sm text-paper transition-colors hover:border-phosphor-dim hover:text-phosphor"
          >
            ./view-work
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-fog/60"
        >
          scroll ↓
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
