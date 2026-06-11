import React from 'react';
import { ExternalLink, Presentation } from 'lucide-react';
import { profile } from '../data/profile';
import Reveal from './Reveal';

const Workshops: React.FC = () => (
  <section id="workshops" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
    <Reveal>
      <p className="font-mono text-xs text-phosphor-dim">// workshops &amp; knowledge sharing</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Learning, packaged as experience<span className="text-phosphor">.</span>
      </h2>
      <p className="mt-4 max-w-2xl text-sm text-fog sm:text-base">
        The best consulting outcome is a team that no longer needs you — so a big part of my
        work is turning knowledge into hands-on, interactive formats.
      </p>
    </Reveal>
    <div className="mt-12 grid gap-5 lg:grid-cols-2">
      {profile.workshops.map((workshop, i) => (
        <Reveal key={workshop.id} delay={i * 0.08}>
          <article className="card-glow flex h-full flex-col rounded-xl border border-edge bg-panel p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] text-fog">
                  {workshop.host} · {workshop.period}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{workshop.name}</h3>
              </div>
              <span className="inline-flex shrink-0 rounded-lg border border-phosphor-dim/40 bg-ink p-2.5 text-phosphor">
                <Presentation className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-fog">{workshop.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {workshop.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-edge px-2 py-0.5 font-mono text-[11px] text-fog"
                >
                  {tag}
                </span>
              ))}
            </div>
            {workshop.url && (
              <a
                href={workshop.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-phosphor px-5 py-2.5 font-mono text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
              >
                &gt;_ {workshop.cta ?? 'open'} <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Workshops;
