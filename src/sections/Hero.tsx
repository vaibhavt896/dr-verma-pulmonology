import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Calendar, Star, Award, Users, Megaphone, Activity, Wind, Droplets, Moon, ArrowRight, ShieldCheck } from 'lucide-react';
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-32 pb-8 sm:pb-12 lg:pt-36 lg:pb-0 lg:min-h-screen flex items-center">
        <div className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-10 sm:gap-16 lg:gap-8 items-center w-full">

          {/* ══════════ Left — copy ══════════ */}
          <div className="text-left">

            {/* Eyebrow badge — teal pill w/ megaphone on mobile, white pill on desktop */}
            <div className="hero-fade inline-flex items-center gap-2 px-4 py-2 bg-healing-green/10 lg:bg-white rounded-full shadow-xs border border-healing-green/15 lg:border-slate-200/60 mb-4 sm:mb-6 lg:mb-8">
              <Megaphone className="w-3.5 h-3.5 text-healing-green lg:hidden flex-shrink-0" />
              <span className="text-[11px] font-semibold text-healing-green tracking-widest uppercase">
                <span className="lg:hidden">Accepting New Patients · Kanpur</span>
                <span className="hidden lg:inline">Expert Respiratory Care in Kanpur</span>
              </span>
            </div>

            {/* Headline — line 1 static, line 2 animated cycling */}
            <h1 className="font-display text-[clamp(2.1rem,5.2vw,4.5rem)] font-bold text-medical-blue leading-[1.05] mb-4 sm:mb-5 lg:mb-6 tracking-tight">
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

            {/* Divider — short teal flourish on mobile, logo divider on desktop */}
            <div className="hero-fade mb-5 sm:mb-7">
              <span className="lg:hidden block h-1 w-24 rounded-full bg-gradient-to-r from-healing-green to-healing-green/20" />
              <div className="hidden lg:flex items-center gap-3 max-w-sm">
                <span className="h-px flex-1 bg-gradient-to-r from-slate-300/80 to-transparent" />
                <img src="/logo.webp" alt="" width={28} height={28} className="w-6 h-6 object-contain opacity-80 flex-shrink-0" aria-hidden="true" />
                <span className="h-px flex-1 bg-gradient-to-l from-slate-300/80 to-transparent" />
              </div>
            </div>

            {/* Paragraph */}
            <p className="hero-fade text-[15px] lg:text-xl text-slate-600 mb-6 lg:mb-10 leading-relaxed max-w-lg">
              <span className="font-semibold text-medical-blue">Expert pulmonary care</span> for asthma, COPD, allergies and sleep disorders, with accurate diagnosis and a personalized treatment plan at our Ashok Nagar clinic.
            </p>

            {/* Mobile — Doctor profile card */}
            <div className="hero-fade lg:hidden rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-[0_4px_28px_rgba(2,6,23,0.07)]">
              <div className="relative flex items-end">
                {/* Ambient teal wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-healing-green/[0.05] to-transparent pointer-events-none" aria-hidden="true" />

                {/* Left — credentials */}
                <div className="relative z-10 flex-1 p-5 self-center">
                  <div className="flex items-center gap-0.5 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-semibold text-slate-500 ml-2">4.9</span>
                  </div>
                  <p className="text-[10px] font-bold text-healing-green tracking-widest uppercase mb-2">Pulmonologist</p>
                  <h3 className="font-bold text-medical-blue text-[22px] leading-tight tracking-tight">Dr. A.K. Verma</h3>
                  <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                    MBBS, MD (KGMU), DM<br />Consultant Chest Physician
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 bg-healing-green/10 rounded-full px-3 py-1.5 border border-healing-green/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-healing-green animate-pulse" />
                    <span className="text-[11px] font-semibold text-healing-green">Accepting Patients</span>
                  </div>
                </div>

                {/* Right — doctor image anchored to card bottom */}
                <div className="w-[45%] flex-shrink-0 self-end">
                  <picture>
                    <source type="image/webp" srcSet="/dr-verma-new.webp" />
                    <img
                      src="/dr-verma-new.png"
                      alt="Dr. A.K. Verma, Pulmonologist"
                      width={774}
                      height={1024}
                      loading="eager"
                      decoding="sync"
                      className="w-full h-auto object-contain select-none"
                      style={{ filter: 'drop-shadow(0 8px 24px rgba(2,6,23,0.12))' }}
                    />
                  </picture>
                </div>
              </div>
            </div>

            {/* CTAs — desktop only; mobile uses bottom nav + Take the first step banner */}
            <div className="hero-fade hidden lg:flex gap-3 lg:mt-0 lg:mb-12">
              <Button
                onClick={onBookAppointment}
                size="lg"
                className="btn-shine flex-1 lg:flex-none bg-healing-green hover:bg-healing-green-dim text-white rounded-2xl px-3 sm:px-8 py-4 sm:py-7 text-[13px] sm:text-lg font-semibold shadow-cta hover:shadow-card-hover transition-all duration-300 ease-smooth hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                Book Appointment
              </Button>

              <a href="tel:+919454097191" className="flex-1 lg:flex-none">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border border-slate-200 bg-white text-medical-blue hover:bg-slate-50 hover:text-medical-blue rounded-2xl px-3 sm:px-8 py-4 sm:py-7 text-[13px] sm:text-lg font-semibold transition-all duration-300 ease-smooth hover:-translate-y-0.5 shadow-xs"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">+91 94540 97191</span>
                  <span className="sm:hidden">Call Now</span>
                </Button>
              </a>
            </div>

            {/* Trust row — desktop / tablet inline */}
            <div className="hero-fade hidden sm:flex items-center justify-start gap-7 border-t border-medical-blue/10 pt-6 lg:pt-8 max-w-xl">
              {/* Years of Experience */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-healing-green/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-healing-green" />
                </span>
                <div className="flex flex-col">
                  <span className="counter font-bold text-medical-blue text-lg sm:text-2xl leading-none">
                    <span data-count="15">15</span>+
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 mt-1">Years of Experience</span>
                </div>
              </div>

              <div className="h-9 w-px bg-medical-blue/10 hidden sm:block" />

              {/* Patients Treated */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-medical-blue/5 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-medical-blue" />
                </span>
                <div className="flex flex-col">
                  <span className="counter font-bold text-medical-blue text-lg sm:text-2xl leading-none">
                    <span data-count="10000">10,000</span>+
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 mt-1">Patients Treated</span>
                </div>
              </div>

              <div className="h-9 w-px bg-medical-blue/10 hidden sm:block" />

              {/* Google Rating */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex flex-col">
                  <span className="counter font-bold text-medical-blue text-lg sm:text-2xl leading-none">4.9</span>
                  <span className="text-[11px] sm:text-xs text-slate-500 mt-1">Google Rating</span>
                </div>
              </div>
            </div>

            {/* Trust row — mobile card */}
            <div className="hero-fade sm:hidden mt-7 bg-white rounded-2xl shadow-card border border-slate-100 px-1.5 py-5 grid grid-cols-3 divide-x divide-slate-200">
              <div className="flex flex-col items-center text-center px-1">
                <Star className="w-5 h-5 text-healing-green mb-2" />
                <span className="counter font-bold text-medical-blue text-xl leading-none">4.9</span>
                <span className="text-[11px] text-slate-500 mt-1 leading-tight">Google Rating</span>
              </div>
              <div className="flex flex-col items-center text-center px-1">
                <Users className="w-5 h-5 text-healing-green mb-2" />
                <span className="counter font-bold text-medical-blue text-xl leading-none"><span data-count="15">15</span>+</span>
                <span className="text-[11px] text-slate-500 mt-1 leading-tight">Years of Experience</span>
              </div>
              <div className="flex flex-col items-center text-center px-1">
                <ShieldCheck className="w-5 h-5 text-healing-green mb-2" />
                <span className="counter font-bold text-medical-blue text-xl leading-none"><span data-count="10000">10,000</span>+</span>
                <span className="text-[11px] text-slate-500 mt-1 leading-tight">Patients Treated</span>
              </div>
            </div>

            {/* Mobile — Expert Respiratory Care quick links */}
            <div className="lg:hidden mt-10">
              <h2 className="text-xl font-bold text-medical-blue mb-4">Expert Respiratory Care</h2>
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { icon: Activity, label: 'Asthma Care' },
                  { icon: Wind, label: 'COPD Management' },
                  { icon: Droplets, label: 'Allergy Treatment' },
                  { icon: Moon, label: 'Sleep Disorders' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#services"
                    className="flex flex-col items-center text-center gap-2 bg-white rounded-2xl border border-slate-100 shadow-xs p-3 active:scale-95 transition-transform"
                  >
                    <Icon className="w-6 h-6 text-healing-green" />
                    <span className="text-[11px] font-semibold text-medical-blue leading-tight">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile — Take the first step banner */}
            <div className="lg:hidden mt-6 bg-gradient-to-br from-medical-blue to-navy-soft rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white leading-tight">Take the first step</p>
                <p className="text-xs text-white/70 leading-tight mt-0.5">Better breathing starts with the right care.</p>
              </div>
              <button
                onClick={onBookAppointment}
                className="flex items-center gap-1 bg-white text-medical-blue text-sm font-semibold rounded-xl px-4 py-2.5 flex-shrink-0 active:scale-95 transition-transform"
              >
                Book Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ══════════ Right — Apple-style floating figure ══════════ */}
          <div ref={visualRef} className="hero-visual hidden lg:block relative mx-auto w-full max-w-[34rem]">

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

            {/* Faint plus accents */}
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true" data-depth="0.45">
              <span className="absolute top-[12%] left-[4%] text-healing-green/25 text-3xl font-light">+</span>
              <span className="absolute top-[44%] left-[1%] text-healing-green/15 text-xl font-light">+</span>
              <span className="absolute top-[24%] right-[5%] text-healing-green/20 text-2xl font-light">+</span>
              <span className="absolute bottom-[34%] right-[2%] text-healing-green/15 text-lg font-light">+</span>
            </div>

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

              {/* Credential card — compact & bottom-right on mobile, centered on desktop */}
              <div className="hero-card absolute z-20 bottom-[5%] right-[-0.75rem] w-[185px] min-w-0 lg:bottom-[10%] lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:w-[82%] lg:min-w-[240px]" data-depth="0.28">
                <div className="bg-white/95 backdrop-blur-md border border-white/60 rounded-2xl shadow-card px-3 py-2.5 lg:px-5 lg:py-3.5 flex items-center gap-2.5 lg:gap-3.5">
                  <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-full bg-healing-green flex items-center justify-center flex-shrink-0">
                    <img src="/logo.webp" alt="" width={48} height={48} className="w-5 h-5 lg:w-7 lg:h-7 object-contain brightness-0 invert" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-bold text-medical-blue text-[13px] lg:text-base leading-tight">Dr. A. K. Verma</p>
                    <p className="text-[11px] lg:text-sm font-semibold text-healing-green leading-tight">MBBS, MD, DM (Pulmonology)</p>
                    <p className="text-[10px] lg:text-xs text-slate-500 leading-tight mt-0.5">Consultant Chest Physician</p>
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
