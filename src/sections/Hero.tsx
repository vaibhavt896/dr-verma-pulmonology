import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Calendar, Star, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOTION, prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

// The last two words cycle through these — keep them punchy, lung-relevant
const CYCLE_PHRASES = ['breathe better.', 'sleep deeper.', 'live fuller.'];

interface HeroProps {
  onBookAppointment: () => void;
}

export default function Hero({ onBookAppointment }: HeroProps) {
  const heroRef    = useRef<HTMLDivElement>(null);
  const visualRef  = useRef<HTMLDivElement>(null);
  const typeTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (typeTextRef.current) typeTextRef.current.textContent = CYCLE_PHRASES[0];
      if (cursorRef.current)   cursorRef.current.style.display = 'none';
      return;
    }

    let removePointerParallax: (() => void) | undefined;

    const ctx = gsap.context(() => {

      /* ── 1 · Entrance ── */
      const tl = gsap.timeline({ defaults: { ease: MOTION.easeSlow } });

      tl.fromTo('.hero-mask-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, stagger: 0.14 },
        0.1
      )
      .fromTo('.hero-fade',
        { opacity: 0, y: MOTION.rise },
        { opacity: 1, y: 0, duration: MOTION.dur.base, stagger: MOTION.stagger },
        0.55
      )
      .fromTo('.hero-visual',
        { opacity: 0, y: 56, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4 },
        0.3
      )
      .fromTo('.hero-card',
        { opacity: 0, y: 20, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.13 },
        1.05
      );

      /* ── 2 · Animated counters ── */
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          delay: 1.1,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-IN'); },
        });
      });

      /* ── 3 · Typewriter cycling ── */
      const el = typeTextRef.current!;

      // Build a master timeline that types → holds → deletes for each phrase, on loop
      const buildPhraseTimeline = (phrase: string) => {
        const tl = gsap.timeline();
        const TYPE_SPEED   = 0.055; // seconds per character while typing
        const DELETE_SPEED = 0.032; // seconds per character while deleting
        const HOLD_TIME    = 1.9;   // seconds to hold after fully typed
        const GAP_TIME     = 0.22;  // pause before typing next phrase

        // Type in — add one character at a time
        for (let i = 1; i <= phrase.length; i++) {
          const captured = i;
          tl.call(() => { el.textContent = phrase.slice(0, captured); }, [], (i - 1) * TYPE_SPEED);
        }

        // Hold with cursor blinking
        tl.to({}, { duration: HOLD_TIME });

        // Delete — remove one character at a time (skip if last phrase iteration handled outside)
        for (let i = phrase.length - 1; i >= 0; i--) {
          const captured = i;
          tl.call(() => { el.textContent = phrase.slice(0, captured); }, [], `+=${DELETE_SPEED}`);
        }

        // Brief gap before next phrase starts
        tl.to({}, { duration: GAP_TIME });

        return tl;
      };

      // Chain all phrases into a master looping timeline
      const master = gsap.timeline({ repeat: -1, delay: 1.6 });
      CYCLE_PHRASES.forEach((phrase) => {
        master.add(buildPhraseTimeline(phrase));
      });

      /* ── 4 · Pointer parallax (desktop only) ── */
      if (window.matchMedia('(pointer: fine)').matches) {
        const layers = gsap.utils.toArray<HTMLElement>('[data-depth]').map((el) => ({
          depth: Number(el.dataset.depth),
          x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
        }));

        const onMove = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => { l.x(nx * 32 * l.depth); l.y(ny * 20 * l.depth); });
        };

        window.addEventListener('mousemove', onMove);
        removePointerParallax = () => window.removeEventListener('mousemove', onMove);
      }

      /* ── 5 · Scroll parallax on visual column ── */
      gsap.to(visualRef.current, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

    }, heroRef);

    return () => {
      removePointerParallax?.();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={heroRef} className="relative overflow-hidden bg-soft-grey">

      {/* Background — dot grid + two ambient washes, nothing more */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,black_30%,transparent_75%)]" />
        <div className="absolute top-[-30%] right-[-10%] w-[60%] h-[80%] bg-gradient-to-bl from-healing-green/[0.07] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[45%] h-[55%] bg-gradient-to-tr from-medical-blue/[0.04] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12 lg:pt-28 lg:pb-0 lg:min-h-screen flex items-center">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 sm:gap-16 lg:gap-8 items-center w-full">

          {/* ══════════ Left — copy ══════════ */}
          <div className="text-left">

            {/* Live badge */}
            <div className="hero-fade inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-full shadow-xs border border-slate-200/60 mb-4 sm:mb-6 lg:mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-healing-green opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-healing-green" />
              </span>
              <span className="text-[11px] font-semibold text-slate-600 tracking-widest uppercase">
                Accepting new patients · Kanpur
              </span>
            </div>

            {/* Headline — line 1 static, line 2 animated cycling */}
            <h1 className="text-[clamp(2.4rem,7vw,5.75rem)] font-bold text-medical-blue leading-[1.02] mb-3 sm:mb-5 lg:mb-7 tracking-tight">
              <span className="block overflow-hidden pb-1">
                <span className="hero-mask-line block">Helping Kanpur</span>
              </span>

              {/* Typewriter line — single span, GSAP writes characters */}
              <span className="block pb-3">
                <span
                  ref={typeTextRef}
                  className="font-display italic font-medium text-healing-green"
                />
                {/* Blinking cursor */}
                <span
                  ref={cursorRef}
                  className="typewriter-cursor text-healing-green"
                  aria-hidden="true"
                />
              </span>
            </h1>

            <p className="hero-fade text-base sm:text-lg lg:text-xl text-slate-600 mb-5 sm:mb-8 lg:mb-10 leading-relaxed max-w-lg">
              Specialist care for asthma, COPD, allergies and sleep disorders,
              with accurate diagnosis and a clear treatment plan at our Ashok Nagar clinic.
            </p>

            {/* CTAs */}
            <div className="hero-fade flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5 sm:mb-8 lg:mb-12">
              <Button
                onClick={onBookAppointment}
                size="lg"
                className="btn-shine bg-medical-blue hover:bg-navy-soft text-white rounded-2xl px-8 py-5 sm:py-7 text-base sm:text-lg font-semibold shadow-card hover:shadow-card-hover transition-all duration-300 ease-smooth hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>

              <a href="tel:+919454097191" className="sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border border-slate-200 bg-white text-medical-blue hover:bg-slate-50 hover:text-medical-blue rounded-2xl px-8 py-5 sm:py-7 text-base sm:text-lg font-semibold transition-all duration-300 ease-smooth hover:-translate-y-0.5 shadow-xs"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +91-9454097191
                </Button>
              </a>
            </div>

            {/* Trust row */}
            <div className="hero-fade flex items-start justify-between sm:justify-start sm:items-center gap-3 sm:gap-10 border-t border-medical-blue/10 pt-5 sm:pt-6 lg:pt-8 max-w-xl">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="counter font-bold text-medical-blue text-xl sm:text-3xl leading-none">4.9</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-xs text-slate-500 mt-1.5">
                  <span data-count="479" className="counter font-semibold text-slate-600">479</span> Google reviews
                </span>
              </div>

              <div className="h-10 w-px bg-medical-blue/10 hidden sm:block" />

              <div className="flex flex-col">
                <span className="counter font-bold text-medical-blue text-xl sm:text-3xl leading-none">
                  <span data-count="15">15</span>+
                </span>
                <span className="text-xs text-slate-500 mt-1.5">Years of practice</span>
              </div>

              <div className="h-10 w-px bg-medical-blue/10 hidden sm:block" />

              <div className="flex flex-col">
                <span className="counter font-bold text-medical-blue text-xl sm:text-3xl leading-none">
                  <span data-count="10000">10,000</span>+
                </span>
                <span className="text-xs text-slate-500 mt-1.5">Patients treated</span>
              </div>
            </div>
          </div>

          {/* ══════════ Right — Apple-style floating figure ══════════ */}
          <div ref={visualRef} className="hero-visual relative mx-auto w-full max-w-md lg:max-w-[34rem]">

            {/* Breathing rings — behind the figure */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
              data-depth="0.25"
            >
              <div className="animate-breathe absolute w-[82%] aspect-square rounded-full border border-healing-green/20" />
              <div className="animate-breathe absolute w-[98%] aspect-square rounded-full border border-healing-green/12" style={{ animationDelay: '1.3s' }} />
              <div className="animate-breathe absolute w-[114%] aspect-square rounded-full border border-healing-green/[0.06]" style={{ animationDelay: '2.6s' }} />
            </div>

            {/* Soft platform glow — grounds the floating figure */}
            <div
              className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[70%] h-[18%] bg-healing-green/20 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
              data-depth="0.1"
            />

            {/* ── The doctor figure — no background, no container ── */}
            <div className="relative" data-depth="0.12">
              <picture>
                <source type="image/webp" srcSet="/dr-verma-new.webp" />
                <img
                  src="/dr-verma-new.png"
                  alt="Dr. A.K. Verma, Pulmonologist"
                  width={774}
                  height={1024}
                  fetchPriority="high"
                  loading="eager"
                  decoding="sync"
                  className="relative z-10 w-full h-auto object-contain object-bottom select-none"
                  style={{
                    filter: 'drop-shadow(0 24px 56px rgba(2,6,23,0.22)) drop-shadow(0 8px 16px rgba(2,6,23,0.12))',
                  }}
                />
              </picture>

              {/* Credential bar — bottom */}
              <div className="hero-card absolute bottom-[12%] left-1/2 -translate-x-1/2 z-20 w-[78%] min-w-[220px]" data-depth="0.28">
                <div className="bg-white/90 backdrop-blur-md border border-white/60 rounded-2xl shadow-card px-5 py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">Dr. A.K. Verma</p>
                    <p className="font-heading font-bold text-medical-blue leading-tight">MBBS, MD, DM · Pulmonology</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-medical-blue flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 opacity-40" aria-hidden="true">
        <span className="text-[10px] uppercase tracking-widest text-medical-blue">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-medical-blue to-transparent" />
      </div>
    </div>
  );
}
