import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Star, Users, ThumbsUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Award, value: 15, suffix: '+', label: 'Years Experience', color: 'var(--healing-green)' },
  { icon: Users, value: 10000, suffix: '+', label: 'Patients Treated', color: 'var(--medical-blue)' },
  { icon: Star, value: 4.9, suffix: '★', label: 'Rating (479 Reviews)', color: '#FFB800' },
  { icon: ThumbsUp, value: 99, suffix: '%', label: 'Satisfaction Rate', color: 'var(--healing-green)' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const hasAnimatedRef = useRef(false);

  // Counter animation using IntersectionObserver (more reliable)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            // Animate each counter
            stats.forEach((stat, index) => {
              const startTime = Date.now();
              const duration = 2000;
              const startValue = 0;
              const endValue = stat.value;
              const isDecimal = stat.value % 1 !== 0;

              const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentValue = startValue + (endValue - startValue) * easeOut;

                setCounters(prev => {
                  const newCounters = [...prev];
                  newCounters[index] = isDecimal
                    ? Number(currentValue.toFixed(1))
                    : Math.floor(currentValue);
                  return newCounters;
                });

                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };

              setTimeout(() => requestAnimationFrame(animate), index * 150);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsGridRef.current) {
      observer.observe(statsGridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // GSAP animations for image and content
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-image',
        { opacity: 0, scale: 0.9, clipPath: 'circle(0% at 50% 50%)' },
        {
          opacity: 1,
          scale: 1,
          clipPath: 'circle(100% at 50% 50%)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      gsap.fromTo('.about-content',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  return (
    <div
      ref={sectionRef}
      className="relative py-12 sm:py-24 lg:py-32 bg-soft-grey overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-healing-green/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="relative order-2 lg:order-1">
            <div className="about-image relative">
              {/* Main Image with Blob Mask */}
              <div className="blob-morph overflow-hidden shadow-xl sm:shadow-2xl rounded-2xl">
                <img
                  src="/images/dr-verma-professional.jpg"
                  alt="Dr. A.K. Verma - Best Pulmonologist in Kanpur"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover object-top"
                />
              </div>

              {/* Floating Badge - hidden on small mobile */}
              <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 bg-white rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 sm:p-6 z-10">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 sm:w-14 h-10 sm:h-14 bg-healing-green/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Award className="w-5 sm:w-7 h-5 sm:h-7 text-healing-green" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-[#0A2540]">MBBS, MD</div>
                    <div className="text-gray-500 text-xs sm:text-sm">Pulmonology</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Blobs - smaller on mobile */}
            <div className="hidden sm:block absolute -top-8 -left-8 w-32 h-32 bg-healing-green/10 rounded-full blur-2xl" />
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-40 h-40 bg-medical-blue/5 rounded-full blur-2xl" />
          </div>

          {/* Content Column - STREAMLINED */}
          <div className="about-content order-1 lg:order-2">
            <span className="inline-block text-healing-green text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              About Dr. A.K. Verma
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540] mb-6 leading-tight">
              Helping Kanpur Families{' '}
              <span className="gradient-text">Breathe Better</span>
            </h2>

            {/* Single Powerful Quote */}
            <blockquote className="text-lg sm:text-xl text-[#4A5568] leading-relaxed mb-8 border-l-4 border-healing-green pl-4 sm:pl-6">
              "Most respiratory problems are preventable. In 15 years, I've helped 10,000+ patients — not just treat symptoms, but understand and prevent them. Let me do the same for you."
              <footer className="mt-3 text-sm font-semibold text-[#0A2540]">
                — Dr. A.K. Verma, MBBS, MD (Pulmonology)
              </footer>
            </blockquote>

            {/* 3 Key Stats - Inline */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-healing-green">15+</div>
                <div className="text-sm text-[#4A5568]">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#0A2540]">10K+</div>
                <div className="text-sm text-[#4A5568]">Patients Treated</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#FFB800]">4.9★</div>
                <div className="text-sm text-[#4A5568]">Google Rating</div>
              </div>
            </div>

            {/* Single CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-[#0A2540] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1a3a5c] transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Book a Consultation
            </a>
          </div>
        </div>

        {/* Stats Bar */}
        <div ref={statsGridRef} className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-12 sm:mt-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bento-glass rounded-2xl p-4 sm:p-6 text-center"
              >
                <div
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: stat.color }} />
                </div>
                <div className="counter text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A2540] mb-0.5 sm:mb-1">
                  {stat.value >= 1000 ? formatNumber(counters[index]) : counters[index]}
                  {stat.suffix}
                </div>
                <div className="text-[#4A5568] text-xs sm:text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
