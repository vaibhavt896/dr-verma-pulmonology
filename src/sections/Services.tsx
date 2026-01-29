import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wind, Activity, Moon, Shield, Droplets, Microscope, ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Wind,
    title: 'Asthma That Doesn\'t Control Your Life',
    subtitle: 'Asthma Management',
    outcome: '80% fewer attacks within 3 months',
    description: 'No more midnight emergencies. With proper diagnosis and a personalized action plan, most patients regain control of their daily life.',
    approach: 'Dr. Verma\'s Approach',
    approachDetail: 'In-house PFT + allergy testing on first visit. You leave with a clear action plan, not just prescriptions.',
    benefits: ['Know your exact triggers', 'Proper inhaler technique', 'Emergency action plan', 'Fewer hospital visits'],
  },
  {
    icon: Activity,
    title: 'Breathe Easier, Walk Further',
    subtitle: 'COPD Treatment',
    outcome: 'Most patients walk 2x more within 6 months',
    description: 'COPD doesn\'t mean giving up your independence. With the right treatment, you can get back to activities you thought were gone.',
    approach: 'Dr. Verma\'s Approach',
    approachDetail: 'Comprehensive lung assessment + pulmonary rehab guidance. We track your progress monthly, not just yearly.',
    benefits: ['Improved stamina', 'Fewer flare-ups', 'Better sleep', 'Medication optimization'],
  },
  {
    icon: Moon,
    title: 'Wake Up Actually Rested',
    subtitle: 'Sleep Apnea & Snoring',
    outcome: 'Partners report 90% snoring reduction',
    description: 'If you\'re tired all day despite "sleeping" 8 hours, your breathing may be the problem. Fix the cause, not just the symptoms.',
    approach: 'Dr. Verma\'s Approach',
    approachDetail: 'Home sleep study referral + CPAP fitting if needed. No surgery-first approach — conservative treatment first.',
    benefits: ['All-day energy', 'Better focus', 'Lower BP risk', 'Happier spouse'],
  },
  {
    icon: Droplets,
    title: 'Stop Sneezing Through Life',
    subtitle: 'Allergy Treatment',
    outcome: 'Symptom-free seasons within 6 weeks',
    description: 'Seasonal allergies, dust, pets — know exactly what triggers you and how to avoid or immunize against it.',
    approach: 'Dr. Verma\'s Approach',
    approachDetail: 'Skin prick testing + personalized avoidance plan. Immunotherapy for lasting relief, not just antihistamines.',
    benefits: ['Know your triggers', 'Reduce medication', 'Long-term immunity', 'Better quality of life'],
  },
  {
    icon: Shield,
    title: 'Peace of Mind for Smokers & Ex-Smokers',
    subtitle: 'Lung Cancer Screening',
    outcome: 'Detect problems 5+ years before symptoms',
    description: 'If you\'ve smoked 20+ pack-years, early screening can catch issues when they\'re still treatable. Don\'t wait for symptoms.',
    approach: 'Dr. Verma\'s Approach',
    approachDetail: 'Risk assessment + low-dose CT referral. Clear explanation of results, not medical jargon.',
    benefits: ['Early detection', 'Clear next steps', 'Ongoing monitoring', 'Expert guidance'],
  },
  {
    icon: Microscope,
    title: 'Finally Understand Your Lungs',
    subtitle: 'Lung Function Testing',
    outcome: 'Complete lung health picture in 1 hour',
    description: 'Unexplained breathlessness? Chronic cough? Get accurate answers with in-house PFT testing — no referrals needed.',
    approach: 'Dr. Verma\'s Approach',
    approachDetail: 'Full spirometry + bronchodilator response. Same-day results explained in simple terms.',
    benefits: ['Accurate diagnosis', 'Same-day results', 'Clear explanation', 'Treatment roadmap'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.services-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo('.service-card',
        { opacity: 0, y: 50, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#F6F9FC] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#00D4AA]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#0A2540]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="services-title inline-block text-[#00D4AA] text-sm font-semibold uppercase tracking-wider mb-4">
            How We Help You
          </span>
          <h2 className="services-title text-4xl lg:text-5xl font-bold text-medical-blue mb-6 tracking-tight">
            Real Results, <span className="font-serif italic text-healing-green">Not Just Treatment</span>
          </h2>
          <p className="services-title text-lg text-[#4A5568] max-w-2xl mx-auto">
            Every condition has a solution. Here's what you can expect when you visit us —
            and the outcomes other patients have achieved.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            // Alternate between subtle blue and teal accents for professional variety without chaos
            const isAlternate = index % 2 === 1;
            const accentColor = isAlternate ? 'var(--healing-green)' : 'var(--medical-blue)';
            const accentBg = isAlternate ? 'bg-healing-green/10' : 'bg-medical-blue/5';
            const accentText = isAlternate ? 'text-healing-green' : 'text-medical-blue';

            return (
              <div
                key={index}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--x', `${x}px`);
                  e.currentTarget.style.setProperty('--y', `${y}px`);
                }}
                className="service-card group relative bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:border-healing-green/50 transition-all duration-300 hover:-translate-y-1"
                style={{ perspective: '1000px' }}
              >
                {/* Ambient Glow Gradient - Subtle and Professional */}
                <div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br from-healing-green/20 to-transparent pointer-events-none"
                />

                {/* Subtitle Badge */}
                <div className="relative flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${accentBg}`}>
                    <Icon className={`w-6 h-6 ${accentText}`} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{service.subtitle}</span>
                </div>

                {/* Outcome-Focused Title */}
                <h3 className="relative text-xl font-bold text-medical-blue mb-2 group-hover:text-healing-green transition-colors leading-tight font-display">
                  {service.title}
                </h3>

                {/* Outcome Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 ${accentBg} ${accentText}`}>
                  ✓ {service.outcome}
                </div>

                {/* Description */}
                <p className="relative text-slate-600 text-sm leading-relaxed mb-5 font-medium">
                  {service.description}
                </p>

                {/* Dr. Verma's Approach */}
                <div className="relative bg-soft-grey rounded-xl p-4 mb-5 border border-slate-100">
                  <div className="text-xs font-bold text-medical-blue mb-1">{service.approach}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{service.approachDetail}</p>
                </div>

                {/* Benefits */}
                <div className="relative grid grid-cols-2 gap-2 mb-5">
                  {service.benefits.map((benefit: string, i: number) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                      <Check className="w-3.5 h-3.5 text-healing-green flex-shrink-0" />
                      <span className="text-slate-600">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="relative inline-flex items-center text-sm font-bold text-medical-blue group-hover:text-healing-green transition-colors group/btn"
                >
                  <span>Book for This</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </a>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-medical-blue to-healing-green" />
              </div>
            );
          })}
        </div>

        {/* Clinic Specializations Banner */}
        <div className="mt-16 flex flex-col lg:flex-row items-center gap-8 bg-gradient-to-br from-medical-blue to-[#1a4a7a] rounded-3xl p-8 shadow-xl overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4AA] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
          </div>

          <div className="lg:w-1/3 relative z-10">
            <div className="relative group">
              <img
                src="/images/clinic-services-hindi.jpg"
                alt="Dr. A.K. Verma Clinic Specializations"
                className="rounded-2xl shadow-2xl w-full h-auto border-4 border-white/20"
              />
              <div className="absolute -bottom-3 -right-3 bg-[#00D4AA] text-white text-xs font-bold px-3 py-1 rounded-full">
                15+ Services
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 relative z-10">
            <span className="inline-flex items-center gap-2 bg-[#00D4AA]/20 text-[#00D4AA] text-sm font-semibold px-3 py-1 rounded-full mb-4">
              ✨ Advanced Procedures Available
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mt-2 mb-4">
              Comprehensive Treatments Under One Roof
            </h3>
            <p className="text-white/80 mb-6">
              From routine check-ups to advanced interventions like bronchoscopy and thoracoscopy —
              Dr. Verma offers complete pulmonology care without the need for referrals to multiple specialists.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Bronchoscopy',
                'Thoracoscopy',
                'Sleep Studies',
                'Lung Function Tests',
                'Allergy Testing',
                'TB Treatment',
                'COPD Management',
                'Non-Invasive Ventilation'
              ].map((service, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#00D4AA] flex-shrink-0" />
                  <span className="text-white/90">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-[#4A5568] mb-6">
            Not sure which service you need? Book a consultation and we'll help you.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#00D4AA] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#00B894] transition-all hover:-translate-y-1 shadow-lg shadow-[#00D4AA]/30"
          >
            Book a Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div >
  );
}
