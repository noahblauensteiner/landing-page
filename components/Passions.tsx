import React from 'react';
import { Sparkles, Code2, Cloud, Users, Volleyball } from 'lucide-react';
import { profile } from '../data/profile';
import Reveal from './Reveal';

const ICONS: Record<string, React.ReactNode> = {
  sparkles: <Sparkles className="h-6 w-6" />,
  code: <Code2 className="h-6 w-6" />,
  cloud: <Cloud className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
  volleyball: <Volleyball className="h-6 w-6" />,
};

const Passions: React.FC = () => (
  <section id="passions" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6">
    <Reveal>
      <p className="font-mono text-xs text-phosphor-dim">// what drives me</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Passions, not just skills<span className="text-phosphor">.</span>
      </h2>
    </Reveal>
    <div className="mt-12 grid gap-5 sm:grid-cols-2">
      {profile.passions.map((passion, i) => (
        <Reveal key={passion.title} delay={i * 0.08}>
          <div className="card-glow flex h-full items-start gap-4 rounded-xl border border-edge bg-panel p-5 sm:p-6">
            <div className="inline-flex shrink-0 rounded-lg border border-phosphor-dim/40 bg-ink p-2.5 text-phosphor sm:p-3">
              {ICONS[passion.icon] ?? <Sparkles className="h-6 w-6" />}
            </div>
            <div>
              <h3 className="text-base font-semibold sm:text-lg">{passion.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fog">{passion.text}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Passions;
