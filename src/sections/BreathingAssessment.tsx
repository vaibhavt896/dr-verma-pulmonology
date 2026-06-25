import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion';
import {
    Wind,
    ChevronRight,
    ChevronLeft,
    AlertTriangle,
    CheckCircle,
    Heart,
    MessageCircle,
    RefreshCw,
    Stethoscope,
    Activity,
    Moon,
    Cigarette,
    ArrowRight,
    Sparkles,
    Shield,
    Phone,
    Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

// Clinically-validated questions based on CAT Score, mMRC, and RSQ
const questions = [
    {
        id: 1,
        question: 'How often do you feel short of breath?',
        description: 'Think about your normal daily activities',
        icon: Wind,
        options: [
            { value: 0, label: 'Never or rarely', emoji: '😊', color: '#22C55E' },
            { value: 1, label: 'Sometimes (once a week)', emoji: '🙂', color: '#84CC16' },
            { value: 2, label: 'Often (several times a week)', emoji: '😟', color: '#F59E0B' },
            { value: 3, label: 'Most days', emoji: '😰', color: '#F97316' },
            { value: 4, label: 'All the time', emoji: '😫', color: '#EF4444' },
        ],
    },
    {
        id: 2,
        question: 'Does walking make you breathless?',
        description: 'Based on mMRC Dyspnea Scale used by doctors worldwide',
        icon: Activity,
        options: [
            { value: 0, label: 'Only with strenuous exercise', emoji: '🏃', color: '#22C55E' },
            { value: 1, label: 'When hurrying or on a hill', emoji: '🚶', color: '#84CC16' },
            { value: 2, label: 'I walk slower than others my age', emoji: '🐢', color: '#F59E0B' },
            { value: 3, label: 'I stop after about 100 meters', emoji: '🛑', color: '#F97316' },
            { value: 4, label: 'Even getting dressed is hard', emoji: '😮‍💨', color: '#EF4444' },
        ],
    },
    {
        id: 3,
        question: 'How often do you cough or wheeze?',
        description: 'Including dry cough, phlegm, or wheezing sounds',
        icon: Stethoscope,
        options: [
            { value: 0, label: 'Never or rarely', emoji: '✨', color: '#22C55E' },
            { value: 1, label: 'A few days a month', emoji: '📅', color: '#84CC16' },
            { value: 2, label: 'Several days a week', emoji: '📆', color: '#F59E0B' },
            { value: 3, label: 'Most days', emoji: '🔁', color: '#F97316' },
            { value: 4, label: 'Constantly throughout the day', emoji: '⚠️', color: '#EF4444' },
        ],
    },
    {
        id: 4,
        question: 'Do breathing problems affect your sleep?',
        description: 'Waking up at night due to cough or chest tightness',
        icon: Moon,
        options: [
            { value: 0, label: 'Never - I sleep soundly', emoji: '😴', color: '#22C55E' },
            { value: 1, label: 'Rarely - once or twice a month', emoji: '🌙', color: '#84CC16' },
            { value: 2, label: 'Sometimes - once a week', emoji: '💤', color: '#F59E0B' },
            { value: 3, label: 'Often - several nights a week', emoji: '🌚', color: '#F97316' },
            { value: 4, label: 'Every night', emoji: '😵', color: '#EF4444' },
        ],
    },
    {
        id: 5,
        question: 'Are you exposed to pollution or smoke?',
        description: 'Kanpur has 3x higher pollution than WHO limits',
        icon: Cigarette,
        options: [
            { value: 0, label: 'No smoking, minimal pollution', emoji: '🌿', color: '#22C55E' },
            { value: 1, label: 'Ex-smoker or moderate pollution', emoji: '🏠', color: '#84CC16' },
            { value: 2, label: 'Passive smoker or industrial area', emoji: '🏭', color: '#F59E0B' },
            { value: 3, label: 'Smoker (less than 10/day)', emoji: '🚬', color: '#F97316' },
            { value: 4, label: 'Heavy smoker or industrial worker', emoji: '⚠️', color: '#EF4444' },
        ],
    },
];

interface RiskLevel {
    level: 'low' | 'moderate' | 'high' | 'urgent';
    title: string;
    titleHindi: string;
    description: string;
    color: string;
    bgColor: string;
    gradient: string;
    recommendation: string;
    cta: string;
    ctaUrgency: 'normal' | 'soon' | 'urgent';
}

const getRiskLevel = (score: number): RiskLevel => {
    if (score <= 5) {
        return {
            level: 'low',
            title: 'Low Risk',
            titleHindi: 'कम जोखिम',
            description: 'Your breathing appears healthy! Keep maintaining your respiratory wellness.',
            color: 'text-green-600',
            bgColor: 'bg-green-50 border-green-200',
            gradient: 'from-green-400 to-emerald-500',
            recommendation: 'Continue healthy habits. Consider annual check-ups if you live in a high-pollution area like Kanpur.',
            cta: 'Schedule Wellness Check',
            ctaUrgency: 'normal',
        };
    } else if (score <= 10) {
        return {
            level: 'moderate',
            title: 'Moderate Concern',
            titleHindi: 'मध्यम चिंता',
            description: 'Some symptoms suggest you may benefit from a professional evaluation.',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50 border-yellow-200',
            gradient: 'from-yellow-400 to-amber-500',
            recommendation: 'Consider booking a consultation within 2 weeks. Early detection can prevent worsening symptoms.',
            cta: 'Book Consultation',
            ctaUrgency: 'soon',
        };
    } else if (score <= 15) {
        return {
            level: 'high',
            title: 'High Concern',
            titleHindi: 'उच्च चिंता',
            description: 'Your symptoms indicate a significant breathing issue that needs attention.',
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 border-orange-200',
            gradient: 'from-orange-400 to-red-500',
            recommendation: 'We recommend booking an appointment within the next week. Conditions like COPD and asthma are highly treatable when caught early.',
            cta: 'Book Priority Appointment',
            ctaUrgency: 'urgent',
        };
    } else {
        return {
            level: 'urgent',
            title: 'Urgent Attention Needed',
            titleHindi: 'तुरंत ध्यान दें',
            description: 'Your symptoms suggest a serious respiratory condition requiring immediate professional care.',
            color: 'text-red-600',
            bgColor: 'bg-red-50 border-red-200',
            gradient: 'from-red-500 to-rose-600',
            recommendation: 'Please consult Dr. Verma as soon as possible. If you experience severe breathlessness, chest pain, or blue lips, seek emergency care immediately.',
            cta: 'Book Urgent Consultation',
            ctaUrgency: 'urgent',
        };
    }
};

const getWhatsAppMessage = (score: number, answers: number[]): string => {
    const riskLevel = getRiskLevel(score);
    const symptoms: string[] = [];

    if (answers[0] >= 2) symptoms.push('shortness of breath');
    if (answers[1] >= 2) symptoms.push('breathlessness during walking');
    if (answers[2] >= 2) symptoms.push('frequent coughing/wheezing');
    if (answers[3] >= 2) symptoms.push('sleep disturbance');
    if (answers[4] >= 2) symptoms.push('pollution/smoke exposure');

    const symptomText = symptoms.length > 0
        ? symptoms.join(', ')
        : 'general breathing concerns';

    return `Hi, I completed the Breathing Health Assessment on your website.

Score: ${score}/20 — ${riskLevel.title}
Concerns: ${symptomText}

Please book me a consultation with Dr. Verma at the earliest.`;
};

interface BreathingAssessmentProps {
    onComplete?: (score: number, answers: number[]) => void;
    onBookAppointment?: () => void;
}

export default function BreathingAssessment({ onComplete, onBookAppointment }: BreathingAssessmentProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>(Array(5).fill(-1));
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showPulse, setShowPulse] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const totalScore = answers.reduce((sum, val) => sum + (val >= 0 ? val : 0), 0);
    const riskLevel = getRiskLevel(totalScore);

    useEffect(() => {
        if (prefersReducedMotion()) return;
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo('.breathing-title',
                { opacity: 0, y: 30 },
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

            // Floating animation for decorative elements
            gsap.to('.float-element', {
                y: -15,
                duration: 2,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Breathing pulse animation
    useEffect(() => {
        if (currentStep === 0 && showPulse) {
            const interval = setInterval(() => {
                setShowPulse(prev => !prev);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [currentStep, showPulse]);

    const handleAnswer = (value: number) => {
        if (isAnimating) return;

        setIsAnimating(true);
        const newAnswers = [...answers];
        newAnswers[currentStep - 1] = value;
        setAnswers(newAnswers);

        // Animate card transition
        gsap.to(cardRef.current, {
            scale: 0.95,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
                if (currentStep < 5) {
                    setCurrentStep(currentStep + 1);
                    gsap.fromTo(cardRef.current,
                        { scale: 1.05, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.5)' }
                    );
                    setIsAnimating(false);
                } else {
                    // Start Calculation
                    setIsAnalyzing(true);
                    setCurrentStep(6); // Move to results

                    setTimeout(() => {
                        setIsAnalyzing(false);
                        onComplete?.(totalScore + value, newAnswers);

                        // Re-animate card for results
                        gsap.fromTo(cardRef.current,
                            { scale: 1.05, opacity: 0 },
                            { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.5)' }
                        );
                    }, 800); // Short delay for UX calculates feel
                }
            },
        });

        // Animate progress bar
        if (progressRef.current && currentStep < 5) {
            gsap.to(progressRef.current, {
                width: `${((currentStep) / 5) * 100}%`,
                duration: 0.5,
                ease: 'power2.out',
            });
        }
    };

    const handleDownload = () => {
        window.print();
    };

    const handleBack = () => {
        if (isAnimating || currentStep <= 1) return;

        setIsAnimating(true);
        gsap.to(cardRef.current, {
            scale: 0.95,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
                setCurrentStep(currentStep - 1);
                gsap.fromTo(cardRef.current,
                    { scale: 1.05, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.5)' }
                );
                setIsAnimating(false);
            },
        });
    };

    const handleRestart = () => {
        setAnswers(Array(5).fill(-1));
        setCurrentStep(0);
    };

    const handleWhatsApp = () => {
        const message = getWhatsAppMessage(totalScore, answers);
        const whatsappUrl = `https://wa.me/919454097191?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };



    const currentQuestion = questions[currentStep - 1];

    return (
        <div
            ref={sectionRef}
            className="relative py-12 sm:py-20 lg:py-28 bg-gradient-to-b from-soft-grey via-white to-soft-grey overflow-hidden"
        >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Large breathing circle - hidden on mobile for performance */}
                <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
                    <div
                        className={`absolute inset-0 rounded-full border-2 border-healing-green/10 transition-all [transition-duration:4s] ${showPulse ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                            }`}
                    />
                    <div
                        className={`absolute inset-16 rounded-full border-2 border-healing-green/15 transition-all [transition-duration:4s] delay-300 ${showPulse ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                            }`}
                    />
                    <div
                        className={`absolute inset-32 rounded-full border-2 border-healing-green/20 transition-all [transition-duration:4s] delay-500 ${showPulse ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                            }`}
                    />
                </div>

                {/* Floating accents */}
                <div className="float-element absolute top-20 left-[10%] w-20 h-20 bg-gradient-to-br from-healing-green/20 to-transparent rounded-full blur-xl" />
                <div className="float-element absolute bottom-20 right-[10%] w-32 h-32 bg-gradient-to-br from-medical-blue/10 to-transparent rounded-full blur-xl" />
                <div className="float-element absolute top-1/3 right-[15%] w-16 h-16 bg-gradient-to-br from-healing-green/15 to-transparent rounded-full blur-lg" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="breathing-title inline-flex items-center gap-2 bg-gradient-to-r from-healing-green/20 to-healing-green/10 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-6 border border-healing-green/20">
                        <Activity className="w-4 h-4 text-healing-green" />
                        <span className="text-xs sm:text-sm font-semibold text-medical-blue">Respiratory Health Check</span>
                    </div>
                    <h2 className="breathing-title text-2xl sm:text-3xl lg:text-5xl font-bold text-medical-blue mb-3 sm:mb-4 px-2">
                        Breathing Assessment
                    </h2>
                    <p className="breathing-title text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
                        A quick screening tool to evaluate your respiratory health status
                    </p>
                </div>

                {/* Assessment Card with Animated Border */}
                <div className="relative">
                    {/* Animated gradient border */}
                    <div
                        className="absolute -inset-0.5 bg-gradient-to-r from-healing-green via-medical-blue to-healing-green rounded-2xl sm:rounded-[34px] opacity-20 blur-sm animate-gradient"
                        style={{ backgroundSize: '200% 200%' }}
                    />
                    <div
                        ref={cardRef}
                        className="relative bg-white rounded-2xl sm:rounded-[32px] shadow-xl sm:shadow-2xl border border-gray-100 overflow-hidden mx-1 sm:mx-0"
                        style={{ boxShadow: '0 15px 40px -12px rgba(0, 0, 0, 0.12)' }}
                    >
                        {/* Intro Screen */}
                        {currentStep === 0 && (
                            <div className="p-5 sm:p-8 lg:p-12">
                                {/* Hero Visual */}
                                <div className="relative w-24 sm:w-32 h-24 sm:h-32 mx-auto mb-6 sm:mb-8">
                                    <div className="absolute inset-0 bg-gradient-to-br from-healing-green to-healing-green-dim rounded-full opacity-20 animate-ping" style={{ animationDuration: '3s' }} />
                                    <div className="relative w-full h-full bg-gradient-to-br from-healing-green to-healing-green-dim rounded-full flex items-center justify-center shadow-lg shadow-healing-green/30">
                                        <Wind className="w-12 sm:w-16 h-12 sm:h-16 text-white" />
                                    </div>
                                </div>

                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-medical-blue mb-3 sm:mb-4 text-center">
                                    Check Your Lung Health
                                </h3>

                                <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 max-w-lg mx-auto text-center">
                                    Answer 5 simple questions. Get instant feedback about your breathing.
                                </p>

                                {/* Stats - Mobile optimized */}
                                <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto mb-8 sm:mb-10">
                                    <div className="text-center bg-soft-grey rounded-xl sm:rounded-2xl p-3 sm:p-4">
                                        <div className="text-2xl sm:text-3xl font-bold text-healing-green">5</div>
                                        <div className="text-[10px] sm:text-xs text-slate-600 mt-1">Questions</div>
                                    </div>
                                    <div className="text-center bg-soft-grey rounded-xl sm:rounded-2xl p-3 sm:p-4">
                                        <div className="text-2xl sm:text-3xl font-bold text-healing-green">2m</div>
                                        <div className="text-[10px] sm:text-xs text-slate-600 mt-1">Duration</div>
                                    </div>
                                    <div className="text-center bg-soft-grey rounded-xl sm:rounded-2xl p-3 sm:p-4">
                                        <div className="text-2xl sm:text-3xl font-bold text-healing-green">Free</div>
                                        <div className="text-[10px] sm:text-xs text-slate-600 mt-1">Forever</div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <Button
                                        onClick={() => setCurrentStep(1)}
                                        className="w-full sm:w-auto bg-gradient-to-r from-healing-green to-healing-green-dim hover:from-healing-green-dim hover:to-healing-green text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-semibold shadow-lg shadow-healing-green/30 transition-all active:scale-95 hover:scale-105 hover:shadow-xl"
                                    >
                                        Start Free Assessment
                                        <ChevronRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>

                                {/* Trust indicators - stack on mobile */}
                                <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-slate-600">
                                    <div className="flex items-center gap-1.5 bg-soft-grey px-3 py-1.5 rounded-full">
                                        <Shield className="w-3.5 h-3.5 text-healing-green" />
                                        Clinically Validated
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-soft-grey px-3 py-1.5 rounded-full">
                                        <CheckCircle className="w-3.5 h-3.5 text-healing-green" />
                                        Anonymous
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-soft-grey px-3 py-1.5 rounded-full">
                                        <Heart className="w-3.5 h-3.5 text-healing-green" />
                                        No Registration
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Question Screens */}
                        {currentStep >= 1 && currentStep <= 5 && currentQuestion && (
                            <div className="p-4 sm:p-6 lg:p-10">
                                {/* Progress Bar */}
                                <div className="mb-6 sm:mb-8">
                                    <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3">
                                        <span className="font-medium">Question {currentStep}/5</span>
                                        <span className="text-xs bg-soft-grey px-2 sm:px-3 py-1 rounded-full font-medium">{Math.round((currentStep / 5) * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-soft-grey rounded-full overflow-hidden">
                                        <div
                                            ref={progressRef}
                                            className="h-full bg-gradient-to-r from-healing-green to-healing-green-dim rounded-full transition-all duration-500"
                                            style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Question */}
                                <div className="text-center mb-6 sm:mb-8">
                                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-healing-green/20 to-healing-green/5 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                        <currentQuestion.icon className="w-8 sm:w-10 h-8 sm:h-10 text-healing-green" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-medical-blue mb-2 px-2">
                                        {currentQuestion.question}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600">{currentQuestion.description}</p>
                                </div>

                                {/* Options - Touch optimized */}
                                <div className="space-y-2 sm:space-y-3">
                                    {currentQuestion.options.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleAnswer(option.value)}
                                            disabled={isAnimating}
                                            className={`w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.98] ${answers[currentStep - 1] === option.value
                                                ? 'border-healing-green bg-healing-green/5 shadow-md'
                                                : 'border-gray-100 hover:border-gray-200 bg-white'
                                                } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <span className="text-2xl sm:text-3xl">{option.emoji}</span>
                                                <span className="font-medium text-sm sm:text-base text-medical-blue flex-1">{option.label}</span>
                                                <div
                                                    className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full opacity-60 flex-shrink-0"
                                                    style={{ backgroundColor: option.color }}
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Navigation */}
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                                    <button
                                        onClick={handleBack}
                                        disabled={currentStep === 1 || isAnimating}
                                        className="flex items-center gap-2 text-slate-600 hover:text-medical-blue disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                        Back
                                    </button>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((step) => (
                                            <div
                                                key={step}
                                                className={`h-2 rounded-full transition-all duration-300 ${step === currentStep
                                                    ? 'w-8 bg-gradient-to-r from-healing-green to-healing-green-dim'
                                                    : step < currentStep
                                                        ? 'w-2 bg-healing-green'
                                                        : 'w-2 bg-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="w-16" />
                                </div>
                            </div>
                        )}

                        {/* Processing Screen */}
                        {currentStep === 6 && isAnalyzing && (
                            <div className="p-8 sm:p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                                <div className="relative w-16 h-16 mb-6">
                                    <div className="absolute inset-0 border-4 border-healing-green/20 rounded-full" />
                                    <div className="absolute inset-0 border-4 border-t-healing-green rounded-full animate-spin" />
                                </div>
                                <h3 className="text-xl font-bold text-medical-blue mb-2">Calculating Score...</h3>
                            </div>
                        )}

                        {/* Results Screen */}
                        {currentStep === 6 && !isAnalyzing && (
                            <div className="p-4 sm:p-6 lg:p-10">
                                {/* Score Display */}
                                <div className="text-center mb-6 sm:mb-8">
                                    {/* Animated Badge */}
                                    <div className={`inline-flex flex-wrap items-center justify-center gap-2 ${riskLevel.bgColor} border rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-4 sm:mb-6`}>
                                        {riskLevel.level === 'low' && <CheckCircle className={`w-4 sm:w-5 h-4 sm:h-5 ${riskLevel.color}`} />}
                                        {riskLevel.level === 'moderate' && <Activity className={`w-4 sm:w-5 h-4 sm:h-5 ${riskLevel.color}`} />}
                                        {(riskLevel.level === 'high' || riskLevel.level === 'urgent') && (
                                            <AlertTriangle className={`w-4 sm:w-5 h-4 sm:h-5 ${riskLevel.color}`} />
                                        )}
                                        <span className={`font-semibold text-sm sm:text-base ${riskLevel.color}`}>{riskLevel.title}</span>
                                        <span className="hidden sm:inline text-gray-400">|</span>
                                        <span className={`font-medium text-sm sm:text-base ${riskLevel.color}`}>{riskLevel.titleHindi}</span>
                                    </div>

                                    {/* Circular Score - smaller on mobile */}
                                    <div className="relative w-36 sm:w-48 h-36 sm:h-48 mx-auto mb-6 sm:mb-8">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                                            {/* Background circle */}
                                            <circle
                                                cx="80"
                                                cy="80"
                                                r="70"
                                                stroke="var(--soft-grey)"
                                                strokeWidth="14"
                                                fill="none"
                                            />
                                            {/* Progress circle with gradient */}
                                            <defs>
                                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor={
                                                        riskLevel.level === 'low' ? '#22C55E' :
                                                            riskLevel.level === 'moderate' ? '#F59E0B' :
                                                                riskLevel.level === 'high' ? '#F97316' : '#EF4444'
                                                    } />
                                                    <stop offset="100%" stopColor={
                                                        riskLevel.level === 'low' ? '#10B981' :
                                                            riskLevel.level === 'moderate' ? '#D97706' :
                                                                riskLevel.level === 'high' ? '#EA580C' : '#DC2626'
                                                    } />
                                                </linearGradient>
                                            </defs>
                                            <circle
                                                cx="80"
                                                cy="80"
                                                r="70"
                                                stroke="url(#scoreGradient)"
                                                strokeWidth="14"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeDasharray={`${(totalScore / 20) * 440} 440`}
                                                className="transition-all duration-1000"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-4xl sm:text-5xl font-bold text-medical-blue">{totalScore}</span>
                                            <span className="text-xs sm:text-sm text-slate-600 font-medium">out of 20</span>
                                        </div>
                                    </div>

                                    <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">{riskLevel.description}</p>
                                </div>

                                {/* Assessment Reliability */}
                                <div className="bg-gradient-to-r from-medical-blue/5 to-healing-green/5 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6 border border-healing-green/20">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-healing-green" />
                                            <span className="text-xs sm:text-sm font-semibold text-medical-blue">Clinical Assessment Model</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 mb-3">
                                        This score is calculated using standard respiratory health protocols including the mMRC Dyspnea Scale and CAT (COPD Assessment Test) principles.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-[10px] sm:text-xs bg-white/80 px-2 py-1 rounded-full text-slate-600 border border-gray-100">
                                            Evidence-Based
                                        </span>
                                        <span className="text-[10px] sm:text-xs bg-white/80 px-2 py-1 rounded-full text-slate-600 border border-gray-100">
                                            Standardized Scoring
                                        </span>
                                    </div>
                                </div>

                                {/* Recommendation */}
                                <div className={`${riskLevel.bgColor} border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8`}>
                                    <h4 className={`font-semibold text-sm sm:text-base ${riskLevel.color} mb-2 flex items-center gap-2`}>
                                        <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
                                        Doctor's Recommendation
                                    </h4>
                                    <p className="text-sm sm:text-base text-slate-600">{riskLevel.recommendation}</p>
                                </div>

                                {/* Action Buttons - Touch optimized */}
                                <div className="space-y-3">
                                    {/* Primary Action - Auto-books for high risk */}
                                    <Button
                                        onClick={() => {
                                            if ((riskLevel.level === 'high' || riskLevel.level === 'urgent') && onBookAppointment) {
                                                onBookAppointment();
                                            } else {
                                                handleWhatsApp();
                                            }
                                        }}
                                        className={`w-full py-4 sm:py-5 rounded-full font-semibold flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg ${riskLevel.ctaUrgency === 'urgent'
                                            ? 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-red-500/30'
                                            : 'bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] shadow-[#25D366]/30'
                                            } text-white shadow-lg transition-all active:scale-[0.98] hover:shadow-xl hover:-translate-y-0.5`}
                                    >
                                        {(riskLevel.level === 'high' || riskLevel.level === 'urgent') ? (
                                            <>
                                                <Phone className="w-5 h-5" />
                                                {riskLevel.cta} Now
                                            </>
                                        ) : (
                                            <>
                                                <MessageCircle className="w-5 h-5" />
                                                <span className="hidden sm:inline">{riskLevel.cta} via</span> WhatsApp
                                            </>
                                        )}
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>

                                    {/* Secondary Action - Download PDF */}
                                    <Button
                                        onClick={handleDownload}
                                        variant="outline"
                                        className="w-full py-4 sm:py-5 rounded-full font-semibold flex items-center justify-center gap-2 text-base sm:text-lg border-2 border-medical-blue text-medical-blue hover:bg-soft-grey transition-all active:scale-[0.98]"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download Formal Report
                                    </Button>

                                    <button
                                        onClick={handleRestart}
                                        className="w-full py-4 text-slate-600 hover:text-medical-blue flex items-center justify-center gap-2 transition-colors mt-2"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Retake Assessment
                                    </button>
                                </div>

                                {/* Disclaimer */}
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <div className="flex items-center justify-center gap-2 mb-4 text-healing-green">
                                        <Shield className="w-4 h-4" />
                                        <span className="text-xs font-semibold uppercase tracking-wider">HIPAA Compliant & Secure</span>
                                    </div>
                                    <p className="text-xs text-slate-600 text-center leading-relaxed">
                                        <strong>⚕️ Medical Disclaimer:</strong> This assessment is based on GOLD guidelines but does not replace professional medical diagnosis. Please consult Dr. A.K. Verma for accurate diagnosis. In case of emergency, visit the nearest hospital.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Trust Indicators - mobile optimized */}
                {currentStep === 0 && (
                    <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-healing-green" />
                            GOLD Guidelines
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-healing-green" />
                            10,000+ Doctors
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-healing-green" />
                            100% Free
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
