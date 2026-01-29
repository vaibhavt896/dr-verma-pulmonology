import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, TrendingUp, Check } from 'lucide-react';
import GoogleReviews from '@/components/GoogleReviews';

gsap.registerPlugin(ScrollTrigger);

// Featured Patient Journeys - Detailed before/after stories
const patientJourneys = [
  {
    name: 'Sunita Devi',
    age: 45,
    location: 'Kidwai Nagar, Kanpur',
    condition: 'Chronic Cough & Breathing Difficulty',
    initials: 'SD',
    timeline: {
      before: '8 months of suffering',
      treatment: '3 weeks with Dr. Verma',
      after: 'Completely symptom-free',
    },
    story: 'I visited 4 doctors before coming to Dr. Verma. Everyone gave me cough syrups that didn\'t work. Dr. Verma did a spirometry test on the first visit and diagnosed early-stage COPD. Within 3 weeks of proper treatment, my cough stopped completely.',
    storyHindi: 'मैंने डॉ. वर्मा से पहले 4 डॉक्टरों से मिली। सबने खांसी की दवाई दी जो काम नहीं की। डॉ. वर्मा ने पहली बार में ही टेस्ट किया और सही इलाज शुरू किया।',
    highlight: 'Diagnosed when others missed it',
  },
  {
    name: 'Rajesh Tiwari',
    age: 58,
    location: 'Govind Nagar, Kanpur',
    condition: 'Severe COPD',
    initials: 'RT',
    timeline: {
      before: 'Couldn\'t walk 50 meters',
      treatment: '6 months of care',
      after: 'Back to daily activities',
    },
    story: 'My COPD was so severe that I couldn\'t even walk to my kitchen without gasping for breath. Dr. Verma created a personalized treatment plan with inhalers and pulmonary rehab. Today, I can walk 2 kilometers daily and even play with my grandchildren.',
    storyHindi: 'मेरी सांस इतनी खराब थी कि किचन तक नहीं जा पाता था। अब रोज 2 किलोमीटर चलता हूं।',
    highlight: 'Life-changing recovery',
  },
  {
    name: 'Meera Agarwal',
    age: 32,
    location: 'Civil Lines, Kanpur',
    condition: 'Severe Asthma',
    initials: 'MA',
    timeline: {
      before: '3-4 attacks per week',
      treatment: '2 months of proper care',
      after: 'Zero attacks in 6 months',
    },
    story: 'I was using my emergency inhaler 3-4 times a week. Hospital visits were becoming normal for me. Dr. Verma changed my entire treatment approach — I haven\'t had a single asthma attack in the last 6 months. He also taught me proper inhaler technique which made a huge difference.',
    storyHindi: 'हफ्ते में 3-4 बार अस्थमा का अटैक आता था। अब 6 महीने से एक भी अटैक नहीं आया।',
    highlight: 'Zero attacks in 6 months',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-title',
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

      gsap.fromTo('.testimonial-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: '.testimonials-grid',
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-healing-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-medical-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="testimonial-title inline-block text-healing-green text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">
            Patient Stories | मरीज़ों की कहानियां
          </span>
          <h2 className="testimonial-title text-2xl sm:text-4xl lg:text-5xl font-bold text-medical-blue mb-4 sm:mb-6 tracking-tight">
            Real <span className="font-serif italic text-healing-green">Patient Journeys</span>
          </h2>
          <p className="testimonial-title text-sm sm:text-lg text-[#4A5568] max-w-2xl mx-auto px-4">
            From suffering to recovery — see how patients transformed their lives with Dr. Verma's care.
          </p>
        </div>

        {/* Featured Patient Journeys */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {patientJourneys.map((journey, index) => (
            <div
              key={index}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--x', `${x}px`);
                e.currentTarget.style.setProperty('--y', `${y}px`);
              }}
              className="testimonial-card group relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Header - Improved Contrast */}
              <div className="bg-gradient-to-r from-medical-blue to-[#1e293b] p-4 sm:p-6 text-white relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-lg font-bold border border-white/20 shadow-inner">
                    {journey.initials}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{journey.name}, {journey.age}</div>
                    <div className="text-sm text-blue-100 font-medium">{journey.location}</div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium border border-white/10">
                  <span className="w-1.5 h-1.5 bg-healing-green rounded-full shadow-[0_0_8px_rgba(13,148,136,0.8)]" />
                  {journey.condition}
                </div>
              </div>

              {/* Journey Timeline - High Contrast */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-8 relative px-2">
                  {/* Timeline Line */}
                  <div className="absolute top-3 left-6 right-6 h-1 bg-slate-100 rounded-full" />
                  <div className="absolute top-3 left-6 right-6 h-1 bg-gradient-to-r from-slate-300 via-medical-blue to-healing-green rounded-full opacity-30" />

                  {/* Before */}
                  <div className="relative z-10 text-center flex-1">
                    <div className="w-7 h-7 bg-white border-2 border-slate-300 rounded-full mx-auto mb-2 shadow-sm flex items-center justify-center text-[10px] text-slate-400 font-bold">1</div>
                    <div className="text-xs text-slate-500 font-medium leading-tight px-1">
                      {journey.timeline.before}
                    </div>
                  </div>

                  {/* Treatment */}
                  <div className="relative z-10 text-center flex-1">
                    <div className="w-7 h-7 bg-medical-blue text-white border-2 border-white rounded-full mx-auto mb-2 shadow-md flex items-center justify-center text-[10px] font-bold">2</div>
                    <div className="text-xs text-medical-blue font-bold leading-tight px-1">
                      {journey.timeline.treatment}
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative z-10 text-center flex-1">
                    <div className="w-7 h-7 bg-healing-green text-white border-2 border-white rounded-full mx-auto mb-2 shadow-md flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs text-healing-green font-bold leading-tight px-1">
                      {journey.timeline.after}
                    </div>
                  </div>
                </div>

                {/* Story - Darker text for readability */}
                <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed mb-4">
                  "{journey.story}"
                </p>

                {/* Hindi Translation - Improved Visibility */}
                <p className="text-slate-500 text-sm italic border-l-2 border-healing-green/50 pl-3 leading-relaxed mb-6 bg-slate-50 py-2 pr-2 rounded-r-lg">
                  {journey.storyHindi}
                </p>

                {/* Highlight Badge */}
                <div className="border-t border-slate-100 pt-4 mt-auto">
                  <span className="inline-flex items-center gap-2 text-healing-green text-xs font-bold uppercase tracking-wider">
                    <Star className="w-4 h-4 fill-healing-green" />
                    {journey.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="testimonial-title bg-gradient-to-r from-medical-blue to-[#1a3a5c] rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-12 sm:mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center text-white">
            <div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 sm:w-6 h-4 sm:h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-2xl sm:text-3xl font-bold">4.9/5</div>
              <div className="text-white/70 text-xs sm:text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">479+</div>
              <div className="text-white/70 text-xs sm:text-sm">Patient Reviews</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">98%</div>
              <div className="text-white/70 text-xs sm:text-sm">Would Recommend</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">10K+</div>
              <div className="text-white/70 text-xs sm:text-sm">Patients Treated</div>
            </div>
          </div>
        </div>

        {/* Google Reviews Widget */}
        <div className="mt-16 mb-12">
          <GoogleReviews variant="full" />
        </div>

        {/* Review CTA */}
        <div className="text-center mt-12">
          <p className="text-[#4A5568] mb-4">
            Have you visited Dr. Verma? Share your experience!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
    </div>
  );
}
