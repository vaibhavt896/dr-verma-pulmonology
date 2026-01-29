import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Users, ExternalLink } from 'lucide-react';
import LiveAQI from '@/components/LiveAQI';

gsap.registerPlugin(ScrollTrigger);

// Stats for the other two cards (first one is now LiveAQI)
const stats = [
  {
    icon: Users,
    value: 98.6,
    suffix: ' Lakh',
    label: 'COPD Patients in UP',
    sublabel: '46% increase since 1990',
    color: '#0A2540',
    source: 'Lancet GBD Study 2019',
    sourceUrl: 'https://www.thelancet.com/gbd'
  },
  {
    icon: TrendingUp,
    value: 50,
    suffix: '%',
    label: 'Disease from Air Pollution',
    sublabel: 'Primary cause of respiratory illness',
    color: '#0D9488', // healing-green
    source: 'WHO India Report',
    sourceUrl: 'https://www.who.int/india/health-topics/air-pollution'
  },
];

export default function ProblemAwareness() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
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
              const duration = 2000; // 2 seconds
              const startValue = 0;
              const endValue = stat.value;

              const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentValue = startValue + (endValue - startValue) * easeOut;

                setCounters(prev => {
                  const newCounters = [...prev];
                  newCounters[index] = Number(currentValue.toFixed(1));
                  return newCounters;
                });

                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };

              // Stagger start
              setTimeout(() => requestAnimationFrame(animate), index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // GSAP animations for other elements
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.problem-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      );

      gsap.fromTo('.problem-content',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } }
      );

      gsap.fromTo('.stat-card',
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.stats-container', start: 'top 75%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-soft-grey overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF6B6B]/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Professional & Educational */}
        <div className="text-center mb-16">
          <div className="problem-title flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-6 w-fit mx-auto">
            <TrendingUp className="w-4 h-4 text-medical-blue" />
            <span className="text-sm font-semibold text-medical-blue">Kanpur Health Awareness Initiative</span>
          </div>

          <h2 className="problem-title text-4xl lg:text-5xl font-bold text-medical-blue mb-6 tracking-tight">
            Is Local Air Quality Impacting <br className="hidden sm:block" />
            <span className="text-healing-green">Your Respiratory Health?</span>
          </h2>

          {/* Scientific Impact Statement */}
          <div className="problem-content max-w-4xl mx-auto">
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Kanpur's current particulate matter levels put residents at higher risk for respiratory sensitivity.
              Understanding your daily exposure is the first step toward better lung health.
            </p>

            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-xl">⚠️</span>
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Daily Risk Factor</p>
                  <p className="text-medical-blue font-bold">High PM2.5 Exposure</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-slate-200"></div>
              <p className="text-sm text-slate-500 text-left max-w-xs">
                Long-term exposure can silently affect lung capacity. Early screening is recommended for families.
              </p>
            </div>

            {/* Professional CTA */}
            <div>
              <a
                href="#breathing-assessment"
                className="inline-flex items-center gap-2 text-medical-blue font-semibold hover:text-healing-green transition-colors border-b-2 border-transparent hover:border-healing-green pb-1"
              >
                <span>Check your respiratory health status</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="stats-container grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {/* Live AQI Card - Real-time data */}
          <LiveAQI />

          {/* Other stats with animated counters */}
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="stat-card group relative overflow-hidden rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)', // More solid for separation
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 1)',
                  boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0,0,0,0.02)' // Visible default shadow + subtle dark ring
                }}
              >
                {/* Premium Hover Gradient Glow - Stronger */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(800px circle at 50% 0%, ${stat.color}15, transparent 60%)`
                  }}
                />

                {/* Animated Border Gradient on Hover */}
                <div
                  className="absolute inset-x-0 top-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stat.color}80, transparent)`
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon with Glass Container */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/50 transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${stat.color}10` }}
                  >
                    <Icon className="w-8 h-8 transition-colors duration-300" style={{ color: stat.color }} />
                  </div>

                  {/* Counter with Gradient Text */}
                  <div
                    className="counter text-5xl lg:text-6xl font-bold mb-3 tabular-nums tracking-tight"
                    style={{ color: stat.color }}
                  >
                    {counters[index]}
                    <span className="text-2xl lg:text-3xl ml-1 opacity-60 font-medium text-medical-blue">{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <div className="text-lg font-bold text-medical-blue mb-2 leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-sm text-slate-500 mb-6 leading-relaxed">
                    {stat.sublabel}
                  </div>

                  {/* Source Citation - Pushed to bottom */}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <a
                      href={stat.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-medical-blue transition-colors uppercase tracking-wide"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Source: {stat.source}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Patient Story + CTA */}
        <div className="problem-content bg-gradient-to-r from-[#0A2540] to-[#1a3a5c] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-healing-green/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FF6B6B]/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Mini Patient Story */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-healing-green rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  SD
                </div>
                <div>
                  <p className="text-white/90 italic mb-2">
                    "मेरे बेटे को रात में खांसी आती थी। मुझे लगा बस सर्दी है। Dr. Verma ने बताया कि pollution से asthma हो गया था। अब 3 महीने से कोई attack नहीं आया।"
                  </p>
                  <p className="text-white/60 text-sm">— Sunita Devi, Kidwai Nagar</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
              Don't Wait Until It Gets Worse
            </h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto text-center">
              Persistent cough, wheezing, or breathlessness? These could be early warning signs.
              <span className="text-healing-green font-semibold"> Early diagnosis prevents 90% of complications.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#breathing-assessment"
                className="inline-flex items-center justify-center bg-healing-green hover:bg-[#00B894] text-white rounded-full px-8 py-4 font-semibold transition-all hover:-translate-y-1 shadow-lg"
              >
                🫁 Take Free Breathing Assessment
              </a>
              <a
                href="tel:+917041055430"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full px-8 py-4 font-semibold transition-all border border-white/30"
              >
                📞 Call Dr. Verma Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
