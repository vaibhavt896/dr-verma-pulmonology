import { useRef, useState } from 'react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import BreathingAssessment from '../sections/BreathingAssessment';
import WhatsAppButton from '../components/WhatsAppButton';
import BookingModal from '../components/BookingModal';
import { Toaster } from '../components/ui/sonner';
import { useNavigate } from 'react-router-dom';

export default function AssessmentPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = (sectionId: string) => {
        // If navigating to a section on the homepage, go to home#sectionId
        navigate(`/#${sectionId}`);
    };

    return (
        <div className="min-h-screen bg-[#F6F9FC]">
            <Navigation onNavigate={handleNavigate} />

            <main className="pt-20">
                <BreathingAssessment onBookAppointment={() => setIsBookingOpen(true)} />
            </main>

            <Footer onNavigate={handleNavigate} />

            <WhatsAppButton />
            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
            <Toaster position="top-right" richColors />
        </div>
    );
}
