import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';
import Reveal from './Reveal';

const Projects: React.FC = () => (
  <section id="work" className="scroll-mt-16 border-y border-edge/60 bg-panel/40">
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <p className="font-mono text-xs text-phosphor-dim">// reference projects</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Shipped, not just demoed<span className="text-phosphor">.</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {profile.projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.08}>
            <article className="card-glow flex h-full flex-col rounded-xl border border-edge bg-panel p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] text-fog">
                    {project.client} · {project.period}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-phosphor"
                      >
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="mt-0.5 font-mono text-xs text-phosphor-dim">{project.role}</p>
                </div>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.name}`}
                    className="shrink-0 text-phosphor transition-transform hover:scale-110"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                ) : (
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-fog/50" />
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-fog">{project.description}</p>
              <p className="mt-4 border-l-2 border-phosphor-dim/60 pl-3 font-mono text-xs text-paper">
                {project.impact}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-edge px-2 py-0.5 font-mono text-[11px] text-fog"
                  >
                    {tech}
                  </span>
                ))}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto font-mono text-[11px] text-phosphor underline-offset-4 hover:underline"
                  >
                    play it live ↗
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
