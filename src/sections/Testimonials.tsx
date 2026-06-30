import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, TrendingUp } from 'lucide-react';
import GoogleReviews from '@/components/GoogleReviews';
import { MOTION, prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '4.9 / 5', label: 'Average Google rating' },
  { value: '479+', label: 'Patient reviews' },
  { value: '10,000+', label: 'Patients treated' },
  { value: '15+', label: 'Years of experience' },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-title',
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="testimonial-title inline-block text-healing-green text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">
            Patient Reviews | मरीज़ों की राय
          </span>
          <h2 className="testimonial-title text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-blue mb-4 sm:mb-6 tracking-tight">
            What Patients Say
          </h2>
          <p className="testimonial-title text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Every review below is public and verifiable on Google Maps.
          </p>
        </div>

        {/* Stats Banner - one consistent set of numbers */}
        <div className="testimonial-title bg-gradient-to-r from-medical-blue to-navy-soft rounded-3xl p-6 sm:p-10 mb-12 sm:mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center text-white">
            {stats.map((stat, i) => (
              <div key={i}>
                {i === 0 && (
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 sm:w-5 h-4 sm:h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                )}
                <div className="text-2xl sm:text-3xl font-bold counter">{stat.value}</div>
                <div className="text-white/70 text-xs sm:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Reviews - the real social proof */}
        <div className="testimonial-title">
          <GoogleReviews variant="full" />
        </div>

        {/* Review CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Have you visited Dr. Verma? Share your experience!
          </p>
          <a
            href="https://www.justdial.com/Kanpur/Dr-A-K-Verma-Opposite-Vikas-Diagnostic-Near-Motijheel-Chauraha-Ashok-Nagar/0512PX512-X512-230419221406-B7P5_BZDET/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-medical-blue font-semibold hover:text-healing-green transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
            Write a Review on Justdial
          </a>
        </div>
      </div>
    </div>
  );
}
