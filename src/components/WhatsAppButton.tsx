import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';

interface ContextMessage {
    score?: number;
    symptoms?: string[];
    source?: 'symptom-checker' | 'breathing-assessment' | 'service' | 'general';
    serviceName?: string;
}

interface WhatsAppButtonProps {
    contextMessage?: ContextMessage;
}

// Condition-specific messages based on real patient concerns
const symptomBasedMessages = [
    {
        category: 'Breathing Issues',
        messages: [
            'I have persistent cough for more than 3 weeks',
            'I feel breathless while climbing stairs',
            'I have wheezing and chest tightness at night',
        ],
    },
    {
        category: 'Specific Conditions',
        messages: [
            'I was diagnosed with COPD and need follow-up',
            'I need consultation for asthma management',
            'I have allergy symptoms (sneezing, runny nose)',
        ],
    },
    {
        category: 'General',
        messages: [
            'I want to book a consultation appointment',
            'What are your clinic timings?',
            'I need a follow-up after my previous visit',
        ],
    },
];

const generateContextMessage = (context: ContextMessage): string => {
    if (context.source === 'breathing-assessment' && context.score !== undefined) {
        const riskText = context.score <= 5 ? 'Low Risk' :
            context.score <= 10 ? 'Moderate Concern' :
                context.score <= 15 ? 'High Concern' : 'Urgent';
        const symptomsText = context.symptoms?.join(', ') || 'general breathing concerns';

        return `Hi, I completed the Breathing Health Assessment on your website.

Score: ${context.score}/20 (${riskText})
Concerns: ${symptomsText}

Please book me a consultation with Dr. Verma at the earliest.`;
    }

    if (context.source === 'symptom-checker' && context.symptoms) {
        return `Hi, I used the Symptom Checker on your website and need a consultation with Dr. Verma.

Symptoms: ${context.symptoms.join(', ')}

Please share an available appointment slot.`;
    }

    if (context.source === 'service' && context.serviceName) {
        return `Hi, I'd like to consult Dr. Verma for ${context.serviceName}. Please share the next available appointment slot.`;
    }

    return `Hi, I'd like to book a consultation with Dr. A.K. Verma. Please share the next available appointment slot.`;
};

export default function WhatsAppButton({ contextMessage }: WhatsAppButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);

    const phoneNumber = '919454097191';

    useEffect(() => {
        // Let the visitor read the hero before any chrome appears
        const timer = setTimeout(() => setIsVisible(true), 4000);

        // Tooltip appears once, briefly, well after page load
        const tooltipShowTimer = setTimeout(() => setShowTooltip(true), 12000);
        const tooltipHideTimer = setTimeout(() => setShowTooltip(false), 20000);

        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipShowTimer);
            clearTimeout(tooltipHideTimer);
        };
    }, []);

    // Pre-fill message if context is provided
    useEffect(() => {
        if (contextMessage) {
            setMessage(generateContextMessage(contextMessage));
        }
    }, [contextMessage]);

    // Lock background scroll while the mobile bottom sheet is open
    useEffect(() => {
        if (isOpen && window.matchMedia('(max-width: 767px)').matches) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [isOpen]);

    const handleSendMessage = (customMessage?: string) => {
        const text = customMessage || message || generateContextMessage({ source: 'general' });
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
        setIsOpen(false);
        setMessage('');
    };

    const handleQuickMessage = (msg: string) => {
        const fullMessage = `Hi, ${msg}

Please book me a consultation with Dr. Verma and share an available slot.`;
        handleSendMessage(fullMessage);
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Chat Widget - full-height bottom sheet on mobile, floating card on desktop */}
            {isOpen && (
                <>
                {/* Mobile dim backdrop - tap to dismiss the sheet */}
                <div
                    className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60] animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                />
                <div className="fixed z-[60] inset-x-0 bottom-0 md:inset-x-auto md:bottom-24 md:right-4 md:w-96 animate-in slide-in-from-bottom-4 fade-in duration-300">
                    <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[85vh] md:h-auto">
                        {/* Mobile drag handle */}
                        <div className="md:hidden flex justify-center pt-2.5 pb-1 bg-[#25D366]">
                            <span className="w-10 h-1 rounded-full bg-white/40" />
                        </div>
                        {/* Header */}
                        <div className="bg-[#25D366] px-4 pb-4 pt-3 md:pt-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 bg-white shadow-sm">
                                        <img
                                            src="/images/dr-verma-avatar.webp"
                                            alt="Dr. A.K. Verma"
                                            width={192}
                                            height={192}
                                            className="w-full h-full object-cover object-top"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Dr. A.K. Verma</h4>
                                        <div className="flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                                            <p className="text-xs text-white/90">Usually replies within 1 hour</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div className="bg-[#ECE5DD] p-4 flex-1 md:flex-none md:max-h-[400px] overflow-y-auto">
                            {/* Welcome Message */}
                            <div className="bg-white rounded-lg p-3 shadow-sm max-w-[90%] mb-4">
                                <p className="text-sm text-gray-700 font-medium">
                                    Patel Chest & Allergy Clinic
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Hello! How can we assist you today? Select a topic below or type your message.
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                    Ashok Nagar, Kanpur &nbsp;·&nbsp; Mon–Sat: 12–3 PM & 6:30–8:30 PM
                                </p>
                                <span className="text-[10px] text-gray-400 mt-1 block">Now</span>
                            </div>

                            {/* Symptom-based Quick Messages */}
                            <div className="space-y-4">
                                {symptomBasedMessages.map((category, catIndex) => (
                                    <div key={catIndex}>
                                        <p className="text-xs font-semibold text-gray-600 mb-2">{category.category}</p>
                                        <div className="space-y-2">
                                            {category.messages.map((msg, msgIndex) => (
                                                <button
                                                    key={msgIndex}
                                                    onClick={() => handleQuickMessage(msg)}
                                                    className="flex items-center justify-between w-full text-left text-sm bg-white hover:bg-gray-50 rounded-xl px-4 py-3 text-gray-700 transition-all shadow-sm hover:shadow group"
                                                >
                                                    <span className="pr-2">{msg}</span>
                                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#25D366] flex-shrink-0" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Custom Message Input */}
                        <div className="p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:pb-3 bg-white border-t border-gray-100">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20BA5C] transition-colors flex-shrink-0"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 text-center mt-2">
                                Messages are sent via WhatsApp
                            </p>
                        </div>
                    </div>
                </div>
                </>
            )}

            {/* Floating Button - raised above the mobile bottom nav so it never covers it */}
            <div className={`fixed bottom-[88px] md:bottom-4 right-3 md:right-4 z-50 flex-col items-end gap-3 ${isOpen ? 'hidden md:flex' : 'flex'}`}>
                {/* Tooltip - desktop only; on mobile it overlapped content */}
                {showTooltip && !isOpen && (
                    <div className="hidden md:block bg-white rounded-xl shadow-card px-4 py-3 text-sm text-gray-700 max-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <p className="font-medium text-medical-blue">Book an Appointment</p>
                        <p className="text-xs text-gray-500 mt-1">Connect with Patel Chest & Allergy Clinic on WhatsApp</p>
                    </div>
                )}

                {/* WhatsApp Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95"
                >
                    {isOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <MessageCircle className="w-6 h-6" />
                    )}
                </button>
            </div>
        </>
    );
}
