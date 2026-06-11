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
    <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2.5 sm:px-6 sm:py-3">
      <a href="#top" className="flex shrink-0 items-center gap-2.5 font-mono text-sm text-phosphor">
        <img
          src="/noah.jpg"
          alt={profile.name}
          width={28}
          height={28}
          className="avatar h-7 w-7 rounded-full ring-1 ring-phosphor-dim/50"
        />
        <span className="hidden sm:inline">
          ~/{profile.name.split(' ')[0].toLowerCase()}
          <span className="cursor-blink">_</span>
        </span>
      </a>
      <div className="flex min-w-0 items-center gap-3 sm:gap-6">
        <div className="flex gap-3 font-mono text-[11px] text-fog sm:gap-6 sm:text-xs">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-phosphor">
              <span className="hidden sm:inline">./</span>
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#terminal"
          className="shrink-0 rounded-md border border-phosphor-dim/60 px-2.5 py-1.5 font-mono text-xs text-phosphor transition-colors hover:bg-phosphor hover:text-ink sm:px-3"
        >
          <span className="sm:hidden">&gt;_ AI</span>
          <span className="hidden sm:inline">&gt;_ ask my AI</span>
        </a>
      </div>
    </nav>
  </header>
);

export default Nav;
