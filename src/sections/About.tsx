import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Check } from 'lucide-react';
import { MOTION, prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.about-image',
        { opacity: 0, y: MOTION.rise },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.dur.slow,
          ease: MOTION.easeSlow,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );

      gsap.fromTo('.about-content',
        { opacity: 0, y: MOTION.rise },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.dur.base,
          ease: MOTION.ease,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-12 sm:py-24 lg:py-32 bg-soft-grey overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="relative order-2 lg:order-1">
            <div className="about-image relative">
              <div className="overflow-hidden rounded-3xl shadow-card">
                <picture>
                  <source media="(min-width: 1024px)" srcSet="/images/dr-verma-hero-lg.webp 1200w" />
                  <source media="(min-width: 640px)" srcSet="/images/dr-verma-hero-md.webp 768w" />
                  <img
                    src="/images/dr-verma-hero-sm.webp"
                    alt="Dr. A.K. Verma, Pulmonologist in Kanpur"
                    width={1200}
                    height={675}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover object-top"
                  />
                </picture>
              </div>

              {/* Floating Badge - hidden on small mobile */}
              <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 bg-white rounded-2xl shadow-card p-4 sm:p-6 z-10">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 sm:w-14 h-10 sm:h-14 bg-healing-green/10 rounded-xl flex items-center justify-center">
                    <Award className="w-5 sm:w-7 h-5 sm:h-7 text-healing-green" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-medical-blue">MBBS, MD</div>
                    <div className="text-gray-500 text-xs sm:text-sm">Pulmonology</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="about-content order-1 lg:order-2">
            <span className="inline-block text-healing-green text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              About Dr. A.K. Verma
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-blue mb-6 leading-tight">
              Restoring Your Health & <span className="text-healing-green">Peace of Mind</span>
            </h2>

            {/* Single Powerful Quote */}
            <blockquote className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 border-l-4 border-healing-green pl-4 sm:pl-6">
              "Most respiratory disease is treatable when caught early. My goal for every patient is simple: understand the cause, treat it properly, and prevent it from coming back."
              <footer className="mt-3 text-sm font-semibold text-medical-blue">
                Dr. A.K. Verma, MBBS, MD (Pulmonology)
              </footer>
            </blockquote>

            {/* 3 Key Stats - Inline */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-healing-green counter">15+</div>
                <div className="text-sm text-slate-600">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-medical-blue counter">10K+</div>
                <div className="text-sm text-slate-600">Patients Treated</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-amber-500 counter">4.9★</div>
                <div className="text-sm text-slate-600">Google Rating</div>
              </div>
            </div>

            {/* Single CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-medical-blue text-white px-8 py-4 rounded-full font-semibold hover:bg-navy-soft transition-all duration-300 ease-smooth hover:-translate-y-0.5 shadow-card"
            >
              Book a Consultation
            </a>
          </div>
        </div>

        {/* Clinic & Features Section */}
        <div className="mt-24 sm:mt-32 border-t border-gray-200 pt-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Clinic Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-card h-[300px] sm:h-[400px]">
              <img
                src="/clinic-interior.webp"
                alt="Dr. A.K. Verma Clinic - Ashok Nagar, Kanpur"
                width={1184}
                height={864}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/90 via-medical-blue/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-white">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">State-of-the-Art Facility</h3>
                <p className="text-white/80">Equipped with advanced diagnostic tools for comprehensive care.</p>
              </div>
            </div>

            {/* Facilities List */}
            <div>
              <span className="inline-block text-healing-green text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">
                Why Choose Us
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-medical-blue mb-6">
                Complete Respiratory Care <br />
                <span className="text-healing-green">Under One Roof</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Pulmonary Function Test (PFT)',
                  'Allergy Testing & Immunotherapy',
                  'Digital X-Ray & ECG',
                  'In-House Pharmacy',
                  'Sleep Study Facilities',
                  'Nebulization Therapy'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-xs border border-gray-100/50">
                    <div className="w-8 h-8 rounded-full bg-healing-green/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-healing-green" />
                    </div>
                    <span className="text-sm font-medium text-medical-blue">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-6">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Location</div>
                  <div className="font-semibold text-medical-blue">Ashok Nagar, Kanpur</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Timing</div>
                  <div className="font-semibold text-medical-blue">9:00 AM - 7:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
