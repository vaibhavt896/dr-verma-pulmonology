import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wind, Activity, Moon, Shield, Droplets, Microscope, ArrowRight, Check } from 'lucide-react';
import { MOTION, prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Wind,
    title: 'Asthma Management',
    subtitle: 'Long-Term Control',
    outcome: 'Personalised action plan from your first visit',
    description: 'Accurate diagnosis, trigger identification and a written action plan help most patients achieve stable, everyday control of their asthma.',
    approach: 'How Dr. Verma Treats It',
    approachDetail: 'In-house PFT and allergy testing on the first visit, followed by inhaler technique training and a clear, written management plan.',
    benefits: ['Know your exact triggers', 'Proper inhaler technique', 'Written action plan', 'Fewer emergency visits'],
  },
  {
    icon: Activity,
    title: 'COPD Treatment',
    subtitle: 'Breathlessness & Chronic Cough',
    outcome: 'Structured care with monthly progress reviews',
    description: 'The right combination of medication, breathing exercises and pulmonary rehabilitation helps ease breathlessness and protect your independence.',
    approach: 'How Dr. Verma Treats It',
    approachDetail: 'Comprehensive lung assessment, staged treatment and pulmonary rehab guidance, with progress reviewed every month.',
    benefits: ['Improved stamina', 'Fewer flare-ups', 'Better sleep', 'Optimised medication'],
  },
  {
    icon: Moon,
    title: 'Sleep Disorders',
    subtitle: 'Sleep Apnea · Insomnia · Parasomnia',
    outcome: 'In-clinic sleep study · CPAP & BiPAP fitting available',
    description: 'From obstructive sleep apnea and chronic insomnia to parasomnias, sleep-related disorders are fully evaluated and managed in-clinic. Untreated sleep apnea raises the risk of uncontrolled hypertension, diabetes complications and heart disease.',
    approach: 'How Dr. Verma Treats It',
    approachDetail: 'A sleep study assessment to pinpoint the disorder, followed by CPAP or BiPAP titration and fitting at the clinic, plus targeted treatment for insomnia and parasomnia. Oxygen therapy is also available.',
    benefits: ['Restful, uninterrupted sleep', 'Better BP & sugar control', 'Reduced cardiac risk', 'CPAP / BiPAP fitting in-clinic'],
  },
  {
    icon: Droplets,
    title: 'Allergy Testing & Treatment',
    subtitle: 'Allergic Rhinitis & Bronchitis',
    outcome: 'Skin prick testing available in-clinic',
    description: 'Dust, pollen, pets or food: identify exactly what triggers your symptoms, then treat the cause with a plan that goes beyond antihistamines.',
    approach: 'How Dr. Verma Treats It',
    approachDetail: 'Skin prick testing to identify triggers, a personalised avoidance plan, and immunotherapy where lasting desensitisation is appropriate.',
    benefits: ['Know your triggers', 'Reduce daily medication', 'Long-term immunity', 'Better quality of life'],
  },
  {
    icon: Shield,
    title: 'Lung Cancer Screening',
    subtitle: 'For Smokers & Ex-Smokers',
    outcome: 'Risk assessment with low-dose CT referral',
    description: 'If you have a significant smoking history, screening can find changes early, when treatment options are widest. You do not need symptoms to begin.',
    approach: 'How Dr. Verma Treats It',
    approachDetail: 'Structured risk assessment, low-dose CT referral where indicated, and results explained in plain language with clear next steps.',
    benefits: ['Early detection', 'Clear next steps', 'Ongoing monitoring', 'Specialist guidance'],
  },
  {
    icon: Microscope,
    title: 'Lung Function Testing',
    subtitle: 'PFT · Impulse Oscillometry',
    outcome: 'Same-day spirometry results, explained simply',
    description: 'Unexplained breathlessness or a cough that will not settle deserves objective answers. In-house PFT and impulse oscillometry mean no outside referrals.',
    approach: 'How Dr. Verma Treats It',
    approachDetail: 'Full spirometry with bronchodilator response and impulse oscillometry (IOS), performed in-clinic. Results are reviewed with you the same day in simple terms.',
    benefits: ['Accurate diagnosis', 'Same-day results', 'Clear explanation', 'Treatment roadmap'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.services-title',
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

      gsap.fromTo('.service-card',
        { opacity: 0, y: MOTION.rise },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.dur.base,
          stagger: MOTION.stagger,
          ease: MOTION.ease,
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
      className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-healing-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-medical-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="services-title inline-block text-healing-green text-sm font-semibold uppercase tracking-wider mb-4">
            Conditions We Treat
          </span>
          <h2 className="services-title text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-blue mb-6 tracking-tight">
            Specialist Care for <span className="text-healing-green">Every Breathing Concern</span>
          </h2>
          <p className="services-title text-lg text-slate-600 max-w-2xl mx-auto">
            From first consultation to long-term management, each condition is treated
            with a clear plan you can understand and follow.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            // Alternate between subtle blue and teal accents for professional variety without chaos
            const isAlternate = index % 2 === 1;

            const accentBg = isAlternate ? 'bg-healing-green/10' : 'bg-medical-blue/5';
            const accentText = isAlternate ? 'text-healing-green' : 'text-medical-blue';

            return (
              <div
                key={index}
                className="service-card group relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card hover:shadow-card-hover hover:border-healing-green/40 transition-all duration-300 ease-smooth hover:-translate-y-1"
              >
                {/* Subtitle Badge */}
                <div className="relative flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${accentBg}`}>
                    <Icon className={`w-6 h-6 ${accentText}`} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{service.subtitle}</span>
                </div>

                {/* Outcome-Focused Title */}
                <h3 className="relative text-xl font-bold text-medical-blue mb-2 group-hover:text-healing-green transition-colors leading-tight">
                  {service.title}
                </h3>

                {/* Outcome Badge */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 ${accentBg} ${accentText}`}>
                  <Check className="w-3.5 h-3.5" />
                  {service.outcome}
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
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </a>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-medical-blue to-healing-green" />
              </div>
            );
          })}
        </div>

        {/* Clinic Specializations Banner */}
        <div className="mt-16 flex flex-col lg:flex-row items-center gap-8 bg-gradient-to-br from-medical-blue to-navy-soft rounded-3xl p-5 sm:p-8 shadow-xl overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-healing-green rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
          </div>

          <div className="lg:w-1/3 relative z-10">
            <div className="relative group">
              <img
                src="/images/clinic-services-hindi.webp"
                alt="Dr. A.K. Verma Clinic Specializations"
                width={508}
                height={649}
                loading="lazy"
                decoding="async"
                className="rounded-2xl shadow-2xl w-full h-auto border-4 border-white/20"
              />
              <div className="absolute -bottom-3 -right-3 bg-healing-green text-white text-xs font-bold px-3 py-1 rounded-full">
                30+ Conditions
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 relative z-10">
            <span className="inline-flex items-center gap-2 bg-healing-green/20 text-teal-300 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              Pulmonary · Critical Care · Sleep Medicine
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mt-2 mb-4">
              Comprehensive Treatments Under One Roof
            </h3>
            <p className="text-white/80 mb-6">
              With a DM in Pulmonary, Critical Care &amp; Sleep Medicine, Dr. Verma manages
              everything from common chest infections to complex pleural and critical-care
              conditions, all without referrals to multiple specialists.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {[
                {
                  group: 'Conditions We Treat',
                  items: [
                    'Tuberculosis (TB)',
                    'Interstitial Lung Disease (ILD)',
                    'Asthma & COPD',
                    'Lung Cancer',
                    'Pneumonia & Chest Infections',
                    'Pleural Effusion, Pneumothorax & Hydropneumothorax',
                    'Sleep Disorders: Apnea, Insomnia & Parasomnia',
                    'Respiratory Allergy & Allergic Rhinitis',
                    'Pediatric Pulmonary Diseases (5+ yrs)',
                    'Critical Care & Respiratory ICU',
                  ],
                },
                {
                  group: 'Procedures & Diagnostics',
                  items: [
                    'Bronchoscopy',
                    'Thoracoscopy',
                    'EBUS (Endobronchial Ultrasound)',
                    'Thoracentesis (Pleural Fluid Tapping)',
                    'Intercostal Drainage (ICD) Tube Insertion',
                    'Pleurodesis',
                    'Pulmonary Function Test (PFT)',
                    'Impulse Oscillometry (IOS)',
                    'Sleep Study · CPAP & BiPAP',
                    'Allergy Testing (Skin Prick)',
                  ],
                },
              ].map((col) => (
                <div key={col.group}>
                  <p className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-3">
                    {col.group}
                  </p>
                  <div className="space-y-2.5">
                    {col.items.map((service, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-teal-300 flex-shrink-0" />
                        <span className="text-white/90">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-6">
            Not sure which service you need? Book a consultation and we'll help you.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-healing-green text-white px-8 py-4 rounded-full font-semibold hover:bg-healing-green-dim transition-all hover:-translate-y-1 shadow-lg shadow-healing-green/30"
          >
            Book a Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div >
  );
}
