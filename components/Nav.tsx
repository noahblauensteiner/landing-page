import React from 'react';
import { profile } from '../data/profile';

const LINKS = [
  { href: '#passions', label: 'passions' },
  { href: '#work', label: 'work' },
  { href: '#workshops', label: 'workshops' },
  { href: '#contact', label: 'contact' },
];

const Nav: React.FC = () => (
  <header className="fixed inset-x-0 top-0 z-50 border-b border-edge/60 bg-ink/80 backdrop-blur-md">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <a href="#top" className="font-mono text-sm text-phosphor">
        ~/{profile.name.split(' ')[0].toLowerCase()}
        <span className="cursor-blink">_</span>
      </a>
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden gap-6 font-mono text-xs text-fog sm:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-phosphor">
              ./{link.label}
            </a>
          ))}
        </div>
        <a
          href="#terminal"
          className="rounded-md border border-phosphor-dim/60 px-3 py-1.5 font-mono text-xs text-phosphor transition-colors hover:bg-phosphor hover:text-ink"
        >
          &gt;_ ask my AI
        </a>
      </div>
    </nav>
  </header>
);

export default Nav;
