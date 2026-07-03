import { useState } from 'react';
import { X, Calendar, Clock, Phone, User, MessageSquare, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Bookable slots at 10-minute intervals across the clinic's consulting hours
// (12:00 PM to 3:00 PM and 6:30 PM to 8:30 PM, Mon to Sat).
const buildSlots = (startMin: number, endMin: number, step: number): string[] => {
    const out: string[] = [];
    for (let t = startMin; t < endMin; t += step) {
        const h24 = Math.floor(t / 60);
        const m = t % 60;
        const period = h24 >= 12 ? 'PM' : 'AM';
        const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
        out.push(`${h12}:${String(m).padStart(2, '0')} ${period}`);
    }
    return out;
};

const timeSlots = [
    ...buildSlots(12 * 60, 15 * 60, 10),            // 12:00 PM to 3:00 PM
    ...buildSlots(18 * 60 + 30, 20 * 60 + 30, 10),  // 6:30 PM to 8:30 PM
];

const consultationTypes = [
    { id: 'in-person', label: 'In-Person Visit', duration: '10 min', description: 'Full consultation' },
    { id: 'follow-up', label: 'Follow-up Consultation', duration: '10 min', description: 'Progress review' },
    { id: 'emergency', label: 'Emergency Consultation', duration: '10 min', description: 'Priority care' },
];

// Clinic WhatsApp number (international format, no '+'), matching the rest of the site.
const CLINIC_WHATSAPP = '919454097191';

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        symptoms: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [autoSent, setAutoSent] = useState(false);

    if (!isOpen) return null;

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isDateDisabled = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const dayOfWeek = date.getDay();
        return date < today || dayOfWeek === 0; // Disable past dates and Sundays
    };

    const handleDateSelect = (day: number) => {
        if (!isDateDisabled(day)) {
            setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Compose the appointment details as a clean, formatted WhatsApp message
    // for the doctor (WhatsApp renders *bold*/_italic_ client-side).
    const buildWhatsAppMessage = () => {
        const typeLabel = consultationTypes.find(t => t.id === selectedType)?.label ?? 'Consultation';
        const lines = [
            '*Dr. A.K. Verma*',
            '_Consultant Chest Physician_',
            '',
            '*New Appointment Booking*',
            '',
            `*Patient:* ${formData.name.trim()}`,
            `*Phone:* ${formData.phone.trim()}`,
            `*Date:* ${selectedDate ? formatDate(selectedDate) : ''}`,
            `*Time:* ${selectedTime}`,
            `*Consultation:* ${typeLabel}`,
        ];
        if (formData.symptoms.trim()) {
            lines.push(`*Symptoms:* ${formData.symptoms.trim()}`);
        }
        lines.push('', 'Kindly confirm this appointment at your convenience.');
        return lines.join('\n');
    };

    // Open WhatsApp addressed to the clinic with the pre-filled appointment details.
    // Called directly from the click handler so the browser treats it as a user
    // gesture and does not block the new tab.
    const openWhatsApp = () => {
        const url = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const typeLabel = consultationTypes.find(t => t.id === selectedType)?.label ?? 'Consultation';
        let sent = false;
        try {
            // Send the appointment straight to the clinic's WhatsApp via the
            // serverless function (CallMeBot). No manual step for the patient.
            const res = await fetch('/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    phone: formData.phone.trim(),
                    date: selectedDate ? formatDate(selectedDate) : '',
                    time: selectedTime,
                    type: typeLabel,
                    symptoms: formData.symptoms.trim(),
                }),
            });
            const data = await res.json().catch(() => null);
            sent = res.ok && data?.ok === true;
        } catch {
            sent = false;
        }

        setAutoSent(sent);
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-medical-blue to-navy-soft p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Book Appointment</h2>
                            <p className="text-white/80 text-sm mt-1">Dr. A.K. Verma &nbsp;·&nbsp; Consultant Chest Physician</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 mt-6">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s ? 'bg-healing-green text-white' : 'bg-white/20 text-white/60'
                                    }`}>
                                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                                </div>
                                {s < 3 && (
                                    <div className={`w-12 h-1 mx-2 rounded ${step > s ? 'bg-healing-green' : 'bg-white/20'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {isSuccess ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-healing-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-healing-green" />
                            </div>
                            <h3 className="text-2xl font-bold text-medical-blue mb-2">
                                {autoSent ? 'Appointment Request Sent!' : 'Almost There!'}
                            </h3>
                            <p className="text-slate-600 mb-6">
                                Your request for<br />
                                <strong>{selectedDate && formatDate(selectedDate)}</strong> at <strong>{selectedTime}</strong>
                            </p>
                            <div className="bg-soft-grey rounded-2xl p-6 max-w-sm mx-auto">
                                {autoSent ? (
                                    <p className="text-sm text-slate-600">
                                        Your details have been sent to Patel Chest &amp; Allergy Clinic on WhatsApp.
                                        The clinic will contact you shortly to confirm. Please arrive 10 minutes early.
                                    </p>
                                ) : (
                                    <>
                                        <p className="text-sm text-slate-600 mb-4">
                                            Tap below to send your appointment details to the clinic on WhatsApp and confirm your booking.
                                        </p>
                                        <button
                                            onClick={openWhatsApp}
                                            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5C] text-white font-semibold px-5 py-2.5 rounded-full transition-colors"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            Send on WhatsApp
                                        </button>
                                    </>
                                )}
                                <a
                                    href="tel:+919454097191"
                                    className="mt-4 inline-flex items-center gap-2 text-healing-green font-semibold w-full justify-center"
                                >
                                    <Phone className="w-4 h-4" />
                                    Or call +91-9454097191
                                </a>
                            </div>
                            <Button
                                onClick={onClose}
                                className="mt-8 bg-medical-blue hover:bg-navy-soft text-white px-8 py-3 rounded-full"
                            >
                                Done
                            </Button>
                        </div>
                    ) : (
                        <>
                            {/* Step 1: Select Consultation Type */}
                            {step === 1 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-medical-blue mb-4">Select Consultation Type</h3>
                                    <div className="space-y-3">
                                        {consultationTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => setSelectedType(type.id)}
                                                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${selectedType === type.id
                                                    ? 'border-healing-green bg-healing-green/5'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-semibold text-medical-blue">{type.label}</div>
                                                        <div className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                                                            <Clock className="w-4 h-4" />
                                                            {type.duration}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-medium text-slate-600">{type.description}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Select Date & Time */}
                            {step === 2 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-medical-blue mb-4">Select Date & Time</h3>

                                    {/* Calendar */}
                                    <div className="bg-soft-grey rounded-2xl p-4 mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <button
                                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                                className="p-2 hover:bg-white rounded-lg transition-colors"
                                            >
                                                <ChevronLeft className="w-5 h-5 text-slate-600" />
                                            </button>
                                            <span className="font-semibold text-medical-blue">
                                                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                            </span>
                                            <button
                                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                                className="p-2 hover:bg-white rounded-lg transition-colors"
                                            >
                                                <ChevronRight className="w-5 h-5 text-slate-600" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-7 gap-1 text-center">
                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                                <div key={day} className="text-xs font-medium text-slate-600 py-2">{day}</div>
                                            ))}
                                            {Array.from({ length: firstDay }).map((_, i) => (
                                                <div key={`empty-${i}`} />
                                            ))}
                                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                                const day = i + 1;
                                                const isSelected = selectedDate?.getDate() === day &&
                                                    selectedDate?.getMonth() === currentMonth.getMonth() &&
                                                    selectedDate?.getFullYear() === currentMonth.getFullYear();
                                                const disabled = isDateDisabled(day);

                                                return (
                                                    <button
                                                        key={day}
                                                        onClick={() => handleDateSelect(day)}
                                                        disabled={disabled}
                                                        className={`p-2 text-sm rounded-lg transition-all ${isSelected
                                                            ? 'bg-healing-green text-white font-semibold'
                                                            : disabled
                                                                ? 'text-gray-300 cursor-not-allowed'
                                                                : 'hover:bg-white text-medical-blue'
                                                            }`}
                                                    >
                                                        {day}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Time Slots */}
                                    {selectedDate && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-medical-blue mb-3">Available Time Slots</h4>
                                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                                {timeSlots.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`p-3 text-sm rounded-xl border-2 transition-all ${selectedTime === time
                                                            ? 'border-healing-green bg-healing-green/5 text-healing-green font-semibold'
                                                            : 'border-gray-200 text-slate-600 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 3: Patient Details */}
                            {step === 3 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-medical-blue mb-4">Your Details</h3>

                                    {/* Selected Summary */}
                                    <div className="bg-healing-green/5 border border-healing-green/20 rounded-2xl p-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <Calendar className="w-10 h-10 text-healing-green" />
                                            <div>
                                                <div className="font-semibold text-medical-blue">
                                                    {selectedDate && formatDate(selectedDate)}
                                                </div>
                                                <div className="text-sm text-slate-600">{selectedTime} • {consultationTypes.find(t => t.id === selectedType)?.label}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-600 mb-2">
                                                <User className="w-4 h-4 inline mr-2" />
                                                Full Name *
                                            </label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Enter your full name"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border-gray-200"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-600 mb-2">
                                                <Phone className="w-4 h-4 inline mr-2" />
                                                Phone Number *
                                            </label>
                                            <Input
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+91 98765 43210"
                                                required
                                                className="w-full px-4 py-3 rounded-xl border-gray-200"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-600 mb-2">
                                                <MessageSquare className="w-4 h-4 inline mr-2" />
                                                Describe Your Symptoms (Optional)
                                            </label>
                                            <textarea
                                                value={formData.symptoms}
                                                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                                                placeholder="Brief description of your symptoms..."
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 resize-none focus:outline-none focus:border-healing-green"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                {!isSuccess && (
                    <div className="border-t border-gray-100 p-6 bg-gray-50">
                        <div className="flex items-center justify-between">
                            {step > 1 ? (
                                <Button
                                    variant="outline"
                                    onClick={() => setStep(step - 1)}
                                    className="px-6 py-3 rounded-full"
                                >
                                    Back
                                </Button>
                            ) : (
                                <div />
                            )}

                            <Button
                                onClick={() => {
                                    if (step < 3) setStep(step + 1);
                                    else handleSubmit();
                                }}
                                disabled={
                                    (step === 1 && !selectedType) ||
                                    (step === 2 && (!selectedDate || !selectedTime)) ||
                                    (step === 3 && (!formData.name || !formData.phone)) ||
                                    isSubmitting
                                }
                                className="bg-healing-green hover:bg-healing-green-dim text-white px-8 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Confirming...
                                    </span>
                                ) : step === 3 ? (
                                    'Confirm Booking'
                                ) : (
                                    'Continue'
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
