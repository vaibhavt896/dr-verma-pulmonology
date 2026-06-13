import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion';
import {
  Check,
  AlertCircle,
  Stethoscope,
  Wind,
  Moon,
  Activity,
  Thermometer,
  Heart,
  Brain,
  MessageCircle,
  Phone,
  Clock,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Enhanced symptoms with urgency weights
const symptoms = [
  {
    id: 'cough',
    label: 'Persistent cough (>3 weeks)',
    icon: Activity,
    description: 'Cough that doesn\'t go away with regular medication',
    urgencyWeight: 3,
    emoji: '😷',
    relatedService: 'Bronchitis Treatment'
  },
  {
    id: 'breath',
    label: 'Shortness of breath',
    icon: Wind,
    description: 'Difficulty breathing during normal activities',
    urgencyWeight: 4,
    emoji: '😮‍💨',
    relatedService: 'PFT & Breathing Analysis'
  },
  {
    id: 'wheeze',
    label: 'Wheezing',
    icon: Stethoscope,
    description: 'Whistling sound when breathing',
    urgencyWeight: 3,
    emoji: '🌬️',
    relatedService: 'Asthma Management'
  },
  {
    id: 'chest',
    label: 'Chest tightness/pain',
    icon: Heart,
    description: 'Pressure or discomfort in chest area',
    urgencyWeight: 5,
    emoji: '❤️‍🔥',
    relatedService: 'Urgent Cardiac/Lung Evaluation'
  },
  {
    id: 'bronchitis',
    label: 'Chronic bronchitis',
    icon: Thermometer,
    description: 'Frequent chest congestion and mucus',
    urgencyWeight: 3,
    emoji: '🤧',
    relatedService: 'COPD Management'
  },
  {
    id: 'infections',
    label: 'Recurring lung infections',
    icon: AlertCircle,
    description: 'Frequent colds that turn into chest infections',
    urgencyWeight: 4,
    emoji: '🦠',
    relatedService: 'Immunity & Infection Control'
  },
  {
    id: 'sleep',
    label: 'Sleep apnea/snoring',
    icon: Moon,
    description: 'Loud snoring or breathing pauses during sleep',
    urgencyWeight: 3,
    emoji: '😴',
    relatedService: 'Sleep Study (Polysomnography)'
  },
  {
    id: 'allergy',
    label: 'Allergic reactions',
    icon: Brain,
    description: 'Sneezing, runny nose triggered by dust/pollen',
    urgencyWeight: 2,
    emoji: '🤧',
    relatedService: 'Allergy Testing'
  },
];

interface Recommendation {
  level: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  titleHindi: string;
  message: string;
  action: string;
  urgent: boolean;
  urgencyScore: number;
  urgencyLabel: string;
  timeframe: string;
  gradient: string;
  textColor: string;
  suggestedService?: string;
}

export default function SymptomChecker() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showWhatsAppMessage, setShowWhatsAppMessage] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.symptom-title',
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

      gsap.fromTo('.symptom-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.symptoms-grid',
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
    setShowWhatsAppMessage(false);
  };

  // Calculate urgency score based on weighted symptoms
  const calculateUrgencyScore = (): number => {
    return selectedSymptoms.reduce((total, symptomId) => {
      const symptom = symptoms.find(s => s.id === symptomId);
      return total + (symptom?.urgencyWeight || 0);
    }, 0);
  };

  const getRecommendation = (): Recommendation | null => {
    const count = selectedSymptoms.length;
    if (count === 0) return null;

    const urgencyScore = calculateUrgencyScore();

    // Identify most relevant service based on highest weighted symptom
    const highestWeightedSymptomID = selectedSymptoms.reduce((prev, current) => {
      const prevSym = symptoms.find(s => s.id === prev);
      const currSym = symptoms.find(s => s.id === current);
      return (prevSym?.urgencyWeight || 0) > (currSym?.urgencyWeight || 0) ? prev : current;
    }, selectedSymptoms[0]);

    const suggestedService = symptoms.find(s => s.id === highestWeightedSymptomID)?.relatedService;

    const baseRecommendation = {
      urgencyScore,
      suggestedService
    };

    // Urgent: High urgency score or chest pain selected
    if (urgencyScore >= 15 || selectedSymptoms.includes('chest')) {
      return {
        ...baseRecommendation,
        level: 'urgent',
        title: 'Immediate Consultation Recommended',
        titleHindi: 'तुरंत परामर्श की सलाह',
        message: 'Your symptoms indicate you should see Dr. Verma as soon as possible. Chest-related symptoms require prompt evaluation.',
        action: 'Contact Now',
        urgent: true,
        urgencyLabel: 'High Priority',
        timeframe: 'Within 24-48 hours',
        gradient: 'from-red-500 to-rose-600',
        textColor: 'text-white'
      };
    }

    // High: Multiple concerning symptoms
    if (urgencyScore >= 10 || count >= 4) {
      return {
        ...baseRecommendation,
        level: 'high',
        title: 'You Should See a Pulmonologist Soon',
        titleHindi: 'जल्द फेफड़ों के डॉक्टर से मिलें',
        message: 'Based on your symptoms, we recommend booking a consultation with Dr. Verma within this week.',
        action: 'Book Appointment',
        urgent: true,
        urgencyLabel: 'Priority',
        timeframe: 'Within 1 week',
        gradient: 'from-orange-500 to-amber-500',
        textColor: 'text-white'
      };
    }

    // Medium: Moderate concerns
    if (urgencyScore >= 5 || count >= 2) {
      return {
        ...baseRecommendation,
        level: 'medium',
        title: 'Consider a Consultation',
        titleHindi: 'परामर्श पर विचार करें',
        message: 'Your symptoms suggest you may benefit from a professional evaluation. Early diagnosis can help prevent complications.',
        action: 'Schedule a Visit',
        urgent: false,
        urgencyLabel: 'Moderate',
        timeframe: 'Within 2 weeks',
        gradient: 'from-healing-green to-healing-green-dim',
        textColor: 'text-white'
      };
    }

    // Low: Minor symptoms
    return {
      ...baseRecommendation,
      level: 'low',
      title: 'Monitor Your Symptoms',
      titleHindi: 'अपने लक्षणों पर नज़र रखें',
      message: 'While your symptoms may be mild, keep track of any changes. If they persist or worsen, consider consulting a specialist.',
      action: 'Learn More',
      urgent: false,
      urgencyLabel: 'Low',
      timeframe: 'As needed',
      gradient: 'from-gray-100 to-gray-50',
      textColor: 'text-medical-blue'
    };
  };

  // Generate WhatsApp message with symptoms list
  const generateWhatsAppMessage = (): string => {
    const recommendation = getRecommendation();
    const selectedSymptomLabels = selectedSymptoms.map(id => {
      const symptom = symptoms.find(s => s.id === id);
      return symptom ? `- ${symptom.label}` : '';
    }).filter(Boolean).join('\n');

    return `Good day,

I used the Symptom Checker on your website and would like to book a consultation at Patel Chest & Allergy Clinic.

Reported Symptoms:
${selectedSymptomLabels}

Urgency: ${recommendation?.urgencyLabel || 'Consultation Required'}
Suggested Service: ${recommendation?.suggestedService || 'General Consultation'}
Recommended Timeframe: ${recommendation?.timeframe || 'At your earliest convenience'}

Please let me know the next available appointment slot. Thank you.`;
  };

  const handleWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/919454097191?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const recommendation = getRecommendation();
  const urgencyScore = calculateUrgencyScore();

  return (
    <div
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 bg-soft-grey overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-healing-green/5 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="symptom-title inline-flex items-center gap-2 bg-gradient-to-r from-healing-green/20 to-healing-green/10 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-6 border border-healing-green/20">
            <Sparkles className="w-4 h-4 text-healing-green" />
            <span className="text-xs sm:text-sm font-semibold text-medical-blue">Smart Symptom Analysis</span>
          </div>
          <h2 className="symptom-title text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-blue mb-4 sm:mb-6 px-2 tracking-tight">
            Do You Need a Pulmonologist?
          </h2>
          <p className="symptom-title text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-2">
            Select your symptoms. We'll analyze urgency and recommend next steps.
          </p>
        </div>

        {/* Symptom Grid - 2 columns on mobile */}
        <div className="symptoms-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-10">
          {symptoms.map((symptom) => {
            const Icon = symptom.icon;
            const isSelected = selectedSymptoms.includes(symptom.id);

            return (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`symptom-card relative p-3 sm:p-6 rounded-xl sm:rounded-2xl text-left transition-all duration-200 active:scale-[0.98] ${isSelected
                  ? 'bg-gradient-to-br from-healing-green to-healing-green-dim text-white shadow-lg shadow-healing-green/30'
                  : 'bg-white text-medical-blue shadow-md border border-gray-100'
                  }`}
              >
                {/* Urgency Badge */}
                {isSelected && symptom.urgencyWeight >= 4 && (
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shadow-lg">
                    Priority
                  </div>
                )}

                {/* Selection Indicator */}
                <div className={`absolute top-2 sm:top-4 right-2 sm:right-4 w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                  {isSelected ? (
                    <Check className="w-3 sm:w-4 h-3 sm:h-4" />
                  ) : (
                    <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full border-2 border-gray-300" />
                  )}
                </div>

                {/* Icon */}
                <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4 ${isSelected ? 'bg-white/20' : 'bg-healing-green/10'
                  }`}>
                  <Icon className={`w-5 sm:w-6 h-5 sm:h-6 ${isSelected ? 'text-white' : 'text-healing-green'}`} />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-xs sm:text-base mb-0.5 sm:mb-1 leading-tight">{symptom.label}</h3>
                <p className={`text-[10px] sm:text-sm leading-tight ${isSelected ? 'text-white/80' : 'text-slate-600'}`}>
                  {symptom.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Count & Urgency Score */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="text-center">
            <span className="text-sm sm:text-base text-slate-600">
              <span className="font-bold text-medical-blue text-xl sm:text-2xl">{selectedSymptoms.length}</span> selected
            </span>
          </div>

          {selectedSymptoms.length > 0 && (
            <div className="flex items-center gap-2 bg-white rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-md border border-gray-100">
              <Activity className="w-4 sm:w-5 h-4 sm:h-5 text-healing-green" />
              <span className="text-xs sm:text-sm text-slate-600">Urgency:</span>
              <span className={`font-bold text-base sm:text-lg ${urgencyScore >= 15 ? 'text-red-500' :
                urgencyScore >= 10 ? 'text-orange-500' :
                  urgencyScore >= 5 ? 'text-healing-green' : 'text-gray-500'
                }`}>
                {urgencyScore}
              </span>
            </div>
          )}
        </div>

        {/* Result Card */}
        {selectedSymptoms.length > 0 && recommendation && (
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 transition-all duration-500 overflow-hidden relative ${recommendation.level === 'low'
              ? 'bg-white border-2 border-healing-green shadow-lg'
              : `bg-gradient-to-r ${recommendation.gradient} text-white shadow-2xl`
              }`}
          >
            {/* Background decoration for urgent */}
            {recommendation.urgent && (
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              </div>
            )}

            <div className="relative max-w-2xl mx-auto text-center">
              {/* Urgency Badge */}
              <div className={`inline-flex flex-wrap items-center justify-center gap-2 ${recommendation.level === 'low' ? 'bg-healing-green/10' : 'bg-white/20'
                } rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6`}>
                {recommendation.urgent ? (
                  <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5" />
                ) : (
                  <Clock className="w-4 sm:w-5 h-4 sm:h-5" />
                )}
                <span className="font-semibold text-sm sm:text-base">{recommendation.urgencyLabel}</span>
                <span className="opacity-70">•</span>
                <span className="text-xs sm:text-sm opacity-90">{recommendation.timeframe}</span>
              </div>

              <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ${recommendation.textColor}`}>
                {recommendation.title}
              </h3>
              <p className={`text-xs sm:text-sm mb-3 sm:mb-4 ${recommendation.level === 'low' ? 'text-healing-green' : 'text-white/80'}`}>
                {recommendation.titleHindi}
              </p>
              <p className={`text-sm sm:text-lg mb-6 sm:mb-8 ${recommendation.level === 'low' ? 'text-slate-600' : 'text-white/90'
                }`}>
                {recommendation.message}
              </p>

              {recommendation.suggestedService && (
                <div className={`mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${recommendation.level === 'low' ? 'bg-healing-green/10 text-healing-green' : 'bg-white/20 text-white'
                  }`}>
                  <Stethoscope className="w-4 h-4" />
                  Recommended: {recommendation.suggestedService}
                </div>
              )}

              {/* Action Buttons - Stack on mobile */}
              <div className="flex flex-col gap-3 justify-center">
                {/* WhatsApp Button - Primary for urgent cases */}
                <button
                  onClick={handleWhatsApp}
                  className={`w-full inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-semibold transition-all active:scale-[0.98] ${recommendation.urgent
                    ? 'bg-white text-medical-blue shadow-lg'
                    : recommendation.level === 'low'
                      ? 'bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30'
                      : 'bg-white text-medical-blue shadow-lg'
                    }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Results to Dr. Verma
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Call Button */}
                <a
                  href="tel:+919454097191"
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 font-semibold transition-all active:scale-[0.98] ${recommendation.level === 'low'
                    ? 'bg-medical-blue text-white hover:bg-navy-soft'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                    }`}
                >
                  <Phone className="w-5 h-5" />
                  <span className="hidden sm:inline">Call:</span> +91-9454097191
                </a>
              </div>

              {/* Quick Message Preview */}
              {!showWhatsAppMessage && (
                <button
                  onClick={() => setShowWhatsAppMessage(true)}
                  className={`mt-6 text-sm underline underline-offset-4 hover:no-underline transition-all ${recommendation.level === 'low' ? 'text-slate-600' : 'text-white/80'
                    }`}
                >
                  Preview WhatsApp message →
                </button>
              )}

              {showWhatsAppMessage && (
                <div className={`mt-6 p-4 rounded-2xl text-left text-sm ${recommendation.level === 'low' ? 'bg-gray-50 text-slate-600' : 'bg-white/10 text-white/90'
                  }`}>
                  <pre className="whitespace-pre-wrap font-sans">{generateWhatsAppMessage()}</pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MCI Badge */}
        {selectedSymptoms.length === 0 && (
          <div className="flex justify-center mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg border border-gray-100">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-medical-blue to-navy-soft rounded-full flex items-center justify-center">
                <span className="text-white text-[8px] sm:text-xs font-bold">MCI</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm sm:text-base text-medical-blue">Dr. A.K. Verma</div>
                <div className="text-[10px] sm:text-xs text-slate-600">MCI Registered</div>
              </div>
              <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-healing-green" />
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs sm:text-sm text-slate-600 mt-6 sm:mt-8 px-4">
          <AlertCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4 inline mr-1" />
          For informational purposes only. Consult a doctor for medical advice.
        </p>
      </div>
    </div>
  );
}
