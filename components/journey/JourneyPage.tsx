import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Mail, TerminalSquare } from 'lucide-react';
import { profile, type JourneyKind, type JourneyStop } from '../../data/profile';

const KIND_STYLE: Record<
  JourneyKind,
  { legend: string; text: string; dot: string; border: string; glow: string; cardGlow: string }
> = {
  work: {
    legend: 'work',
    text: 'text-phosphor',
    dot: 'bg-phosphor border-phosphor',
    border: 'border-phosphor/50',
    glow: 'shadow-[0_0_18px_rgba(0,255,156,0.65)]',
    cardGlow: 'shadow-[0_0_40px_rgba(0,255,156,0.10)]',
  },
  life: {
    legend: 'life',
    text: 'text-amber',
    dot: 'bg-amber border-amber',
    border: 'border-amber/50',
    glow: 'shadow-[0_0_18px_rgba(255,180,84,0.65)]',
    cardGlow: 'shadow-[0_0_40px_rgba(255,180,84,0.10)]',
  },
  learning: {
    legend: 'learning & sharing',
    text: 'text-lilac',
    dot: 'bg-lilac border-lilac',
    border: 'border-lilac/50',
    glow: 'shadow-[0_0_18px_rgba(185,166,255,0.65)]',
    cardGlow: 'shadow-[0_0_40px_rgba(185,166,255,0.10)]',
  },
};

const NODE_BORDER: Record<JourneyKind, string> = {
  work: 'border-phosphor/70',
  life: 'border-amber/70',
  learning: 'border-lilac/70',
};

const MOBILE_BREAKPOINT = 768;

/** Horizontal position of the "reading line": where the rail's glow ends and stops count as reached. */
function anchorFor(viewW: number): number {
  return viewW * (viewW < MOBILE_BREAKPOINT ? 0.08 : 0.4);
}

interface Dims {
  viewW: number;
  viewH: number;
  trackW: number;
  /** Centre of each stop's node, in track coordinates. */
  nodeX: number[];
}

const EMPTY_DIMS: Dims = { viewW: 0, viewH: 0, trackW: 0, nodeX: [] };

const JourneyPage: React.FC = () => {
  const stops = profile.journey;
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dimsRef = useRef<Dims>(EMPTY_DIMS);
  const activeRef = useRef(-1);

  const [dims, setDims] = useState<Dims>(EMPTY_DIMS);
  const [active, setActive] = useState(-1);

  const x = useMotionValue(0);
  const progress = useMotionValue(0);
  const fill = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 40, mass: 0.35 });
  const trackX = reduceMotion ? x : springX;

  const measure = useCallback(() => {
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!sticky || !track) return;
    const trackLeft = track.getBoundingClientRect().left;
    const nodeX = nodeRefs.current.map((node) =>
      node ? node.getBoundingClientRect().left + node.offsetWidth / 2 - trackLeft : 0,
    );
    const next: Dims = {
      viewW: sticky.clientWidth,
      viewH: sticky.clientHeight,
      trackW: track.scrollWidth,
      nodeX,
    };
    const prev = dimsRef.current;
    if (
      prev.viewW === next.viewW &&
      prev.viewH === next.viewH &&
      prev.trackW === next.trackW &&
      prev.nodeX.join() === next.nodeX.join()
    ) {
      return;
    }
    dimsRef.current = next;
    setDims(next);
  }, []);

  // The section is exactly as tall as the horizontal distance to travel plus one
  // screen, so 1px of vertical scroll moves the track 1px sideways.
  const update = useCallback(() => {
    const section = sectionRef.current;
    const d = dimsRef.current;
    if (!section || !d.viewW) return;
    const distance = Math.max(0, d.trackW - d.viewW);
    const scrolled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), distance);
    x.set(-scrolled);
    progress.set(distance ? scrolled / distance : 0);

    const reading = scrolled + anchorFor(d.viewW) + 4;
    let next = -1;
    d.nodeX.forEach((nodeX, i) => {
      if (nodeX <= reading) next = i;
    });
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActive(next);
    }
  }, [x, progress]);

  const scrollToStop = useCallback(
    (index: number) => {
      const d = dimsRef.current;
      const section = sectionRef.current;
      if (!section || index < 0 || index >= d.nodeX.length) return;
      const distance = Math.max(0, d.trackW - d.viewW);
      const target = Math.min(Math.max(d.nodeX[index] - anchorFor(d.viewW), 0), distance);
      window.scrollTo({ top: section.offsetTop + target, behavior: reduceMotion ? 'auto' : 'smooth' });
    },
    [reduceMotion],
  );

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    update();
  }, [dims, update]);

  useEffect(() => {
    const observer = new ResizeObserver(() => measure());
    if (trackRef.current) observer.observe(trackRef.current);
    if (stickyRef.current) observer.observe(stickyRef.current);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', measure);
    void document.fonts?.ready.then(measure);

    // Horizontal trackpad swipes move the timeline too.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) window.scrollBy({ top: e.deltaX });
    };
    window.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', measure);
      window.removeEventListener('wheel', onWheel);
    };
  }, [measure, update]);

  // ← / → jump between stops.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToStop(Math.min(activeRef.current + 1, stops.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (activeRef.current <= 0) {
          window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        } else {
          scrollToStop(activeRef.current - 1);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [scrollToStop, stops.length, reduceMotion]);

  // The glowing part of the rail always ends at the reading line.
  useEffect(() => {
    const computeFill = (v: number) => {
      const d = dimsRef.current;
      if (d.nodeX.length === 0) return;
      const start = d.nodeX[0];
      const length = d.nodeX[d.nodeX.length - 1] - start;
      fill.set(Math.min(Math.max(-v + anchorFor(d.viewW) - start, 0), length));
    };
    computeFill(trackX.get());
    return trackX.on('change', computeFill);
  }, [trackX, fill, dims]);

  const railStart = dims.nodeX[0] ?? 0;
  const railLength = dims.nodeX.length > 1 ? dims.nodeX[dims.nodeX.length - 1] - railStart : 0;
  const panelWidth = dims.viewW || '100vw';
  // On desktop the intro leaves room for the first stop to peek in from the right.
  const introWidth = dims.viewW >= MOBILE_BREAKPOINT ? Math.round(dims.viewW * 0.82) : panelWidth;

  return (
    <div className="min-h-screen bg-ink text-paper">
      <JourneyHeader progress={progress} />
      <main>
        <section
          ref={sectionRef}
          aria-label={`Timeline of ${profile.name}'s professional and personal journey`}
          className="relative"
          style={{ height: dims.viewW ? dims.trackW - dims.viewW + dims.viewH : '100svh' }}
        >
          <div
            ref={stickyRef}
            className="sticky top-0 h-svh overflow-hidden"
            // Focusing an off-screen link makes the browser scroll this clipped
            // box sideways on top of the track transform; keep it pinned.
            onScroll={(e) => {
              e.currentTarget.scrollLeft = 0;
              e.currentTarget.scrollTop = 0;
            }}
          >
            <div className="journey-grid absolute inset-0" aria-hidden="true" />
            <BackgroundLabel stop={active >= 0 ? stops[active] : undefined} reduceMotion={!!reduceMotion} />

            <motion.div
              ref={trackRef}
              style={{ x: trackX }}
              className="relative flex h-full w-max [--node-y:32%] md:[--node-y:50%]"
            >
              <div
                aria-hidden="true"
                className="absolute top-[var(--node-y)] h-px bg-edge"
                style={{ left: railStart, width: railLength }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute top-[var(--node-y)] h-[2px] -translate-y-1/2 bg-gradient-to-r from-phosphor-dim/40 to-phosphor"
                style={{ left: railStart, width: fill }}
              >
                <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-phosphor shadow-[0_0_16px_4px_rgba(0,255,156,0.55)]" />
              </motion.div>

              <Intro width={introWidth} reduceMotion={!!reduceMotion} />

              {stops.map((stop, i) => (
                <Stop
                  key={stop.id}
                  stop={stop}
                  index={i}
                  isLast={i === stops.length - 1}
                  reached={i <= active}
                  isActive={i === active}
                  nodeRef={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  onKeyboardFocus={() => scrollToStop(i)}
                />
              ))}

              <Outro width={panelWidth} />
            </motion.div>

            <Minimap stops={stops} active={active} onJump={scrollToStop} />
          </div>
        </section>
      </main>
    </div>
  );
};

const JourneyHeader: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => (
  <header className="fixed inset-x-0 top-0 z-50 border-b border-edge/60 bg-ink/70 backdrop-blur-md">
    <div className="flex items-center justify-between px-4 py-3 md:px-8">
      <a href="/" className="font-mono text-sm text-phosphor">
        ~/noah<span className="text-fog">/journey</span>
        <span className="cursor-blink">_</span>
      </a>
      <a
        href="/"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-fog transition-colors hover:text-phosphor"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> portfolio
      </a>
    </div>
    <motion.div className="h-[2px] origin-left bg-phosphor" style={{ scaleX: progress }} />
  </header>
);

const Legend: React.FC = () => (
  <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-fog">
    {(Object.keys(KIND_STYLE) as JourneyKind[]).map((kind) => (
      <li key={kind} className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full border ${KIND_STYLE[kind].dot}`} />
        {KIND_STYLE[kind].legend}
      </li>
    ))}
  </ul>
);

const Intro: React.FC<{ width: number | string; reduceMotion: boolean }> = ({ width, reduceMotion }) => (
  <div
    style={{ width }}
    className="relative z-10 flex h-full shrink-0 flex-col justify-center px-5 pb-16 pt-20 md:px-16 lg:px-24"
  >
    <img
      src="/noah.jpg"
      alt={profile.name}
      width={96}
      height={96}
      className="mb-6 h-20 w-20 rounded-full object-cover ring-1 ring-phosphor-dim/40 grayscale-[45%] transition-[filter] duration-300 hover:grayscale-0 md:h-24 md:w-24"
    />
    <p className="font-mono text-xs text-phosphor-dim md:text-sm">// the journey so far</p>
    <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
      From Vienna to Amsterdam,
      <br />
      from clean code to <span className="text-phosphor">agentic AI</span>.
    </h1>
    <p className="mt-6 max-w-xl text-sm leading-relaxed text-fog md:text-base">
      A sideways walk through my professional and personal journey — the roles, the moves, and the
      things that happened off the keyboard.
    </p>
    <div className="mt-8">
      <Legend />
    </div>
    <p className="mt-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-fog/70">
      scroll or swipe
      <motion.span
        animate={reduceMotion ? undefined : { x: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="text-phosphor"
      >
        <ArrowRight className="h-4 w-4" />
      </motion.span>
    </p>
  </div>
);

interface StopProps {
  stop: JourneyStop;
  index: number;
  isLast: boolean;
  reached: boolean;
  isActive: boolean;
  nodeRef: (el: HTMLSpanElement | null) => void;
  onKeyboardFocus: () => void;
}

const Stop: React.FC<StopProps> = ({ stop, index, isLast, reached, isActive, nodeRef, onKeyboardFocus }) => {
  const style = KIND_STYLE[stop.kind];
  // Desktop alternates cards above / below the rail, with the label on the opposite side.
  const cardAbove = index % 2 === 0;
  const isYear = /^\d{4}$/.test(stop.label);
  const meta = [stop.period, stop.place].filter(Boolean).join(' · ');

  return (
    <div
      onFocus={(e) => {
        if ((e.target as HTMLElement).matches(':focus-visible')) onKeyboardFocus();
      }}
      className={`relative z-10 grid h-full w-[80vw] max-w-[340px] shrink-0 grid-rows-[calc(var(--node-y)_-_12px)_24px_1fr] md:w-[340px] md:max-w-none ${
        isLast ? 'mr-[8vw] md:mr-28' : 'mr-[8vw] md:mr-6'
      }`}
    >
      <div
        className={`row-start-1 self-end pb-4 ${
          cardAbove ? 'md:row-start-3 md:self-start md:pb-0 md:pt-5' : 'md:pb-5'
        }`}
      >
        <span
          className={`block max-w-[14rem] font-bold leading-none tracking-tight transition-opacity duration-500 ${style.text} ${
            isYear ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'
          } ${reached ? 'opacity-100' : 'opacity-40'}`}
        >
          {stop.label}
        </span>
      </div>

      <span
        ref={nodeRef}
        aria-hidden="true"
        className={`row-start-2 h-6 w-6 self-center rounded-full border-2 transition-all duration-500 ${
          reached ? style.dot : `bg-ink ${NODE_BORDER[stop.kind]}`
        } ${isActive ? `scale-110 ${style.glow}` : ''}`}
      />

      <article
        className={`row-start-3 self-start pt-4 md:pt-3 ${cardAbove ? 'md:row-start-1 md:self-end md:pb-3 md:pt-0' : ''}`}
      >
        <div
          className={`journey-card rounded-xl border bg-panel/90 p-4 backdrop-blur-sm transition-[opacity,border-color,box-shadow] duration-500 md:p-5 ${
            isActive ? `${style.border} ${style.cardGlow}` : 'border-edge'
          } ${reached ? 'opacity-100' : 'opacity-60'}`}
        >
          {meta && <p className="font-mono text-[11px] text-fog">{meta}</p>}
          <h2 className="mt-1 text-lg font-semibold leading-snug md:text-xl">{stop.title}</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-fog md:text-sm">{stop.text}</p>
          {stop.tags && stop.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {stop.tags.map((tag) => (
                <li key={tag} className="rounded border border-edge px-2 py-0.5 font-mono text-[10.5px] text-fog">
                  {tag}
                </li>
              ))}
            </ul>
          )}
          {stop.url && (
            <a
              href={stop.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-phosphor px-3.5 py-2 font-mono text-xs font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              &gt;_ {stop.cta ?? 'open'} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </article>
    </div>
  );
};

const Outro: React.FC<{ width: number | string }> = ({ width }) => (
  <div
    style={{ width }}
    className="relative z-10 flex h-full shrink-0 flex-col justify-center px-5 pb-16 pt-20 md:px-16 lg:px-24"
  >
    <p className="font-mono text-xs text-phosphor-dim md:text-sm">// next stop</p>
    <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
      The next chapter is still unwritten<span className="text-phosphor">.</span>
    </h2>
    <p className="mt-6 max-w-lg text-sm leading-relaxed text-fog md:text-base">
      Maybe it&apos;s one we write together.
    </p>
    <div className="mt-8 flex flex-wrap gap-3">
      <a
        href={`mailto:${profile.email}`}
        className="inline-flex items-center gap-2 rounded-md bg-phosphor px-4 py-2.5 font-mono text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
      >
        <Mail className="h-4 w-4" /> get in touch
      </a>
      <a
        href="/#terminal"
        className="inline-flex items-center gap-2 rounded-md border border-edge px-4 py-2.5 font-mono text-sm text-paper transition-colors hover:border-phosphor-dim hover:text-phosphor"
      >
        <TerminalSquare className="h-4 w-4" /> ask my AI
      </a>
      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-md border border-edge px-4 py-2.5 font-mono text-sm text-paper transition-colors hover:border-phosphor-dim hover:text-phosphor"
      >
        <ArrowLeft className="h-4 w-4" /> portfolio
      </a>
    </div>
  </div>
);

const BackgroundLabel: React.FC<{ stop?: JourneyStop; reduceMotion: boolean }> = ({ stop, reduceMotion }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute bottom-16 left-6 hidden select-none md:block lg:left-12"
  >
    <AnimatePresence initial={false}>
      {stop && (
        <motion.span
          key={stop.label}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -30 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-outline absolute bottom-0 left-0 whitespace-nowrap text-[clamp(7rem,15vw,14rem)] font-bold leading-none"
        >
          {stop.label}
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

const Minimap: React.FC<{ stops: JourneyStop[]; active: number; onJump: (i: number) => void }> = ({
  stops,
  active,
  onJump,
}) => (
  <nav
    aria-label="Timeline stops"
    className="absolute inset-x-0 bottom-0 z-20 border-t border-edge/60 bg-ink/75 backdrop-blur-md"
  >
    <ol className="mx-auto flex max-w-5xl items-center justify-between gap-1 px-4 py-2 md:px-8">
      {stops.map((stop, i) => {
        const style = KIND_STYLE[stop.kind];
        return (
          <li key={stop.id}>
            <button
              type="button"
              onClick={() => onJump(i)}
              aria-label={`Jump to ${stop.label}: ${stop.title}`}
              title={`${stop.label} — ${stop.title}`}
              aria-current={i === active ? 'step' : undefined}
              className="group flex flex-col items-center gap-1.5 rounded px-1.5 py-1"
            >
              <span
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i <= active ? style.dot.split(' ')[0] : 'bg-edge group-hover:bg-fog/50'
                } ${i === active ? `scale-150 ${style.glow}` : ''}`}
              />
              <span
                className={`journey-minimap-label hidden whitespace-nowrap font-mono text-[10px] transition-colors md:block ${
                  i === active ? 'text-paper' : 'text-fog/60 group-hover:text-fog'
                }`}
              >
                {stop.label}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  </nav>
);

export default JourneyPage;
