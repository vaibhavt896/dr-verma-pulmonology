import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, GraduationCap, Stethoscope, MapPin } from 'lucide-react';
import { MOTION, prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  highlight?: boolean;
}

const milestones: Milestone[] = [
  {
    year: '2015',
    degree: 'MBBS',
    field: 'Bachelor of Medicine, Bachelor of Surgery',
    institution: 'BRD Medical College',
    location: 'Gorakhpur',
  },
  {
    year: '2018',
    degree: 'MD',
    field: 'Pulmonary Medicine',
    institution: "King George's Medical University (KGMU)",
    location: 'Lucknow',
  },
  {
    year: '2019–2022',
    degree: 'DM',
    field: 'Pulmonary, Critical Care & Sleep Medicine',
    institution: 'Vallabhbhai Patel Chest Institute, University of Delhi',
    location: 'New Delhi',
    highlight: true,
  },
];

export default function AcademicExcellence() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.aex-header',
        { opacity: 0, y: MOTION.rise },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.dur.base,
          ease: MOTION.ease,
          stagger: MOTION.stagger,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo('.aex-achievement',
        { opacity: 0, y: MOTION.rise, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: MOTION.dur.slow,
          stagger: 0.15,
          ease: MOTION.easeSlow,
          scrollTrigger: { trigger: '.aex-achievements', start: 'top 78%' },
        }
      );

      gsap.fromTo('.aex-milestone',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.dur.base,
          stagger: 0.16,
          ease: MOTION.ease,
          scrollTrigger: { trigger: '.aex-timeline', start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-28 bg-gradient-to-b from-medical-blue to-navy-soft overflow-hidden"
    >
      {/* Ambient background accents */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.04] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black_30%,transparent_75%)]" />
        <div className="absolute -top-24 left-1/4 w-[480px] h-[480px] bg-healing-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-0 w-[420px] h-[420px] bg-healing-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="aex-header inline-flex items-center gap-2 text-healing-green text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4" />
            Academic &amp; Professional Excellence
          </span>
          <h2 className="aex-header text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Trained at India&rsquo;s Premier <span className="text-healing-green">Medical Institutions</span>
          </h2>
          <p className="aex-header text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            A highly accomplished and dedicated specialist in Pulmonary, Critical Care, and
            Sleep Medicine &mdash; recognised for his clinical excellence and a strong focus on
            patient-centric care.
          </p>
        </div>

        {/* ── Key Achievements ── */}
        <div className="aex-achievements mb-14 sm:mb-20">

          {/* Feature card - All India Rank 9 */}
          <div className="aex-achievement relative rounded-[2rem] p-px bg-gradient-to-br from-healing-green/50 via-white/10 to-transparent shadow-[0_24px_80px_rgba(13,148,136,0.12)]">
            <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-gradient-to-br from-medical-blue via-medical-blue to-navy-soft">

              {/* Giant watermark numeral */}
              <span
                className="absolute -right-4 -bottom-16 text-[16rem] sm:text-[20rem] font-bold leading-none tracking-tighter text-white/[0.03] select-none pointer-events-none"
                aria-hidden="true"
              >
                9
              </span>

              <div className="relative grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-8 lg:gap-0 px-6 py-10 sm:px-10 sm:py-12 lg:px-14">

                {/* Numeral block */}
                <div className="relative flex flex-col items-center justify-center py-2">
                  {/* Breathing rings - echo the hero's visual language */}
                  <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <div className="animate-breathe absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-healing-green/20" />
                    <div className="animate-breathe absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-healing-green/10" style={{ animationDelay: '1.4s' }} />
                  </div>
                  {/* Soft glow behind the numeral */}
                  <div className="absolute w-40 h-40 bg-healing-green/20 rounded-full blur-3xl" aria-hidden="true" />

                  <p className="relative text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-white/60 mb-1">
                    All India Rank
                  </p>
                  <p className="relative font-bold leading-none tracking-tighter text-[clamp(6rem,14vw,8.5rem)] bg-gradient-to-b from-white via-teal-100 to-healing-green bg-clip-text text-transparent">
                    9
                  </p>
                  <span className="relative mt-4 inline-flex items-center gap-1.5 rounded-full border border-healing-green/30 bg-healing-green/10 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-healing-green">
                    <Trophy className="w-3.5 h-3.5" />
                    NEET-SS 2019
                  </span>
                </div>

                {/* Copy block */}
                <div className="text-center lg:text-left lg:border-l lg:border-white/10 lg:pl-12">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-healing-green mb-3">
                    Key Achievement
                  </p>
                  <h3 className="text-xl sm:text-2xl lg:text-[1.7rem] font-bold text-white leading-snug mb-4">
                    A Top-Tier Rank, Nationwide &mdash; in India&rsquo;s Toughest Super Speciality Examination
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Secured All India Rank 9 in the highly competitive NEET-SS (Super Speciality)
                    Entrance Examination in 2019 &mdash; the gateway through which the country&rsquo;s
                    finest physicians are selected for advanced super-speciality training.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary achievement - advanced training */}
          <div className="aex-achievement mt-5 sm:mt-6 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-healing-green/10 border border-healing-green/25 flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-6 h-6 sm:w-7 sm:h-7 text-healing-green" />
            </div>
            <div>
              <p className="font-bold text-white text-base sm:text-lg leading-snug">
                Advanced Training at a Premier National Chest Institute
              </p>
              <p className="text-sm text-white/65 mt-1.5 leading-relaxed">
                Extensively trained in managing complex respiratory disorders, advanced critical
                care emergencies, and comprehensive sleep disorders.
              </p>
            </div>
          </div>
        </div>

        {/* ── Academic Timeline ── */}
        <p className="aex-header text-center text-white/50 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-6 sm:mb-8">
          The Academic Journey
        </p>

        <div className="aex-timeline relative">
          {/* Vertical rail - mobile */}
          <div
            className="sm:hidden absolute left-[6px] top-3 bottom-3 w-px bg-gradient-to-b from-white/20 via-healing-green/40 to-healing-green/70"
            aria-hidden="true"
          />
          {/* Horizontal rail - desktop */}
          <div
            className="hidden sm:block absolute top-[5px] left-0 right-0 h-px bg-gradient-to-r from-white/15 via-healing-green/35 to-healing-green/70"
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-3 gap-y-8 sm:gap-x-6 lg:gap-x-8">
            {milestones.map((m, i) => (
              <div key={m.degree} className="aex-milestone relative pl-8 sm:pl-0">
                {/* Node dot */}
                <span
                  className={`absolute left-0 top-5 sm:static sm:block sm:mb-6 w-[13px] h-[13px] sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
                    m.highlight
                      ? 'bg-healing-green ring-4 ring-healing-green/25 shadow-[0_0_16px_rgba(13,148,136,0.6)]'
                      : 'bg-white/40 ring-4 ring-white/10'
                  }`}
                  aria-hidden="true"
                />

                {/* Card - the final DM milestone gets a gradient border */}
                <div
                  className={
                    m.highlight
                      ? 'rounded-2xl p-px bg-gradient-to-br from-healing-green/60 via-healing-green/15 to-transparent h-full'
                      : 'h-full'
                  }
                >
                  <div
                    className={`relative overflow-hidden p-5 sm:p-6 h-full ${
                      m.highlight
                        ? 'bg-medical-blue rounded-[calc(1rem-1px)]'
                        : 'bg-white/[0.05] border border-white/10 rounded-2xl'
                    }`}
                  >
                    {/* Step watermark */}
                    <span
                      className="absolute -right-1 -top-3 text-6xl font-bold tracking-tighter text-white/[0.05] select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>

                    <div className="flex items-center justify-between gap-2 mb-3">
                      <p className="text-healing-green text-xs font-bold uppercase tracking-wider">
                        {m.year}
                      </p>
                      {m.highlight && (
                        <span className="inline-flex items-center rounded-full bg-healing-green/15 border border-healing-green/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-healing-green">
                          Super Speciality
                        </span>
                      )}
                    </div>

                    <h3 className="text-white font-bold text-2xl sm:text-[1.6rem] leading-none tracking-tight mb-1.5">
                      {m.degree}
                    </h3>
                    <p className="text-white/85 text-sm font-semibold leading-snug mb-3">
                      {m.field}
                    </p>

                    <p className="text-white/60 text-sm leading-relaxed">
                      {m.institution}
                    </p>
                    <p className="text-white/40 text-xs mt-1.5 inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" aria-hidden="true" />
                      {m.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing note */}
        <div className="aex-header mt-12 sm:mt-16 text-center">
          <span className="block w-10 h-0.5 bg-healing-green rounded-full mx-auto mb-5" aria-hidden="true" />
          <p className="text-white/60 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Dr. Verma&rsquo;s rigorous training and commitment to medical excellence ensure the
            highest standards of diagnostic and therapeutic care for every patient.
          </p>
        </div>
      </div>
    </div>
  );
}
