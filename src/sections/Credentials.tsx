import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ChevronLeft, ChevronRight, X, GraduationCap, ExternalLink } from 'lucide-react';
import { MOTION, prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  type: string;
  typeBg: string;
  typeText: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  orgShort: string;
  organization: string;
  event: string;
  venue: string;
  date: string;
  extra?: string;
  src: string;
}

const certificates: Certificate[] = [
  {
    type: 'Hands-on Workshop',
    typeBg: 'bg-sky-100',
    typeText: 'text-sky-700',
    borderColor: 'border-sky-500',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    orgShort: 'IAB',
    organization: 'Indian Association for Bronchology',
    event: 'Hands-on Basic Bronchoscopy Workshop',
    venue: 'Atal Bihari Vajpayee Scientific Convention Centre, Lucknow',
    date: 'May 10, 2026',
    src: '/Certificates/Certificate%201.webp',
  },
  {
    type: 'Speaker / Faculty',
    typeBg: 'bg-emerald-100',
    typeText: 'text-emerald-700',
    borderColor: 'border-emerald-500',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    orgShort: 'VPCI · University of Delhi',
    organization: 'Vallabhbhai Patel Chest Institute',
    event: 'Workshop on Biostatistics',
    venue: 'Paintai Memorial Golden Jubilee Auditorium, New Delhi',
    date: 'February 25, 2021',
    src: '/Certificates/Certificate%202.webp',
  },
  {
    type: 'CME Completion',
    typeBg: 'bg-violet-100',
    typeText: 'text-violet-700',
    borderColor: 'border-violet-500',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    orgShort: 'IAOHNS',
    organization: 'Indian Academy of Otorhinolaryngology, Head and Neck Surgery',
    event: 'Primary Care Allergology: All you need to know about Allergic Rhinitis',
    venue: 'CME · Uttar Pradesh',
    date: 'April 3, 2023',
    extra: '4 CME Hours',
    src: '/Certificates/Certificate%203.webp',
  },
];

export default function Credentials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.cred-header',
        { opacity: 0, y: MOTION.rise },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.dur.base,
          ease: MOTION.ease,
          stagger: MOTION.stagger,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo('.cred-card',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.dur.base,
          stagger: 0.14,
          ease: MOTION.ease,
          scrollTrigger: {
            trigger: '.cred-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex(prev => prev !== null ? (prev + 1) % certificates.length : null);
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => prev !== null ? (prev - 1 + certificates.length) % certificates.length : null);
    };

    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <div ref={sectionRef} className="relative py-16 sm:py-24 lg:py-32 bg-soft-grey overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-healing-green/5 rounded-full blur-3xl translate-x-1/3" />
        <div className="absolute -bottom-32 left-0 w-[500px] h-[500px] bg-medical-blue/5 rounded-full blur-3xl -translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="cred-header inline-flex items-center gap-2 text-healing-green text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4" />
            Certifications & Professional Development
          </span>
          <h2 className="cred-header text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-blue mb-4 tracking-tight">
            Credentials & <span className="text-healing-green">Recognition</span>
          </h2>
          <p className="cred-header text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Workshops, CMEs, and invited faculty positions — ongoing commitment to staying
            at the forefront of pulmonology and respiratory care.
          </p>
        </div>

        {/* Certificate cards */}
        <div className="cred-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {certificates.map((cert, index) => (
            <button
              key={index}
              className={`cred-card group text-left bg-white border border-slate-100 border-l-4 ${cert.borderColor} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden w-full`}
              onClick={() => setLightboxIndex(index)}
              aria-label={`View certificate: ${cert.event}`}
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-50">
                <img
                  src={cert.src}
                  alt={cert.event}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-medical-blue/0 group-hover:bg-medical-blue/50 transition-colors duration-300">
                  <span className="flex items-center gap-2 bg-white text-medical-blue text-xs font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Certificate
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5 sm:p-6">
                {/* Type badge */}
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3.5 ${cert.typeBg} ${cert.typeText}`}>
                  {cert.type}
                </span>

                {/* Org row */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${cert.iconBg}`}>
                    <Award className={`w-4 h-4 ${cert.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold uppercase tracking-wide ${cert.typeText}`}>{cert.orgShort}</p>
                    <p className="text-xs text-slate-400 leading-snug truncate">{cert.organization}</p>
                  </div>
                </div>

                {/* Event name */}
                <h3 className="text-sm sm:text-base font-bold text-medical-blue leading-snug mb-2 group-hover:text-healing-green transition-colors duration-200">
                  {cert.event}
                </h3>

                {/* Venue & date */}
                <p className="text-xs text-slate-400 leading-relaxed mb-0.5">{cert.venue}</p>
                <p className="text-xs font-semibold text-slate-500">{cert.date}</p>

                {cert.extra && (
                  <p className="text-xs font-semibold text-healing-green mt-1">{cert.extra}</p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-slate-400 mt-10">
          Click any certificate to view in full detail
        </p>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Certificate image */}
            <img
              src={certificates[lightboxIndex].src}
              alt={certificates[lightboxIndex].event}
              className="w-full rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
            />

            {/* Caption strip */}
            <div className="mt-5 text-center px-4">
              <p className="text-white/90 text-sm sm:text-base font-semibold leading-snug">
                {certificates[lightboxIndex].event}
              </p>
              <p className="text-white/50 text-xs mt-1">
                {certificates[lightboxIndex].organization} &nbsp;·&nbsp; {certificates[lightboxIndex].date}
              </p>
            </div>

            {/* Counter pill */}
            <div className="absolute top-4 left-4 bg-black/60 text-white/80 text-xs font-bold px-3 py-1.5 rounded-full select-none">
              {lightboxIndex + 1} / {certificates.length}
            </div>

            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
              className="absolute top-2 right-2 sm:top-0 sm:-right-14 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Previous */}
            <button
              onClick={() => setLightboxIndex(prev => prev !== null ? (prev - 1 + certificates.length) % certificates.length : null)}
              aria-label="Previous certificate"
              className="absolute left-2 sm:-left-14 top-[calc(50%-3rem)] w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Next */}
            <button
              onClick={() => setLightboxIndex(prev => prev !== null ? (prev + 1) % certificates.length : null)}
              aria-label="Next certificate"
              className="absolute right-2 sm:-right-14 top-[calc(50%-3rem)] w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
