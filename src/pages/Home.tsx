import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import AcademicExcellence from '../sections/AcademicExcellence';
import ProblemAwareness from '../sections/ProblemAwareness';
import SymptomChecker from '../sections/SymptomChecker';
import About from '../sections/About';
import Credentials from '../sections/Credentials';
import Services from '../sections/Services';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import Clinic from '../sections/Clinic';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import MediaMentions from '../sections/MediaMentions';
import BookingModal from '../components/BookingModal';
import WhatsAppButton from '../components/WhatsAppButton';
import { Toaster } from '../components/ui/sonner';
import { scrollToId } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const mainRef = useRef<HTMLDivElement>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        // Handle hash scrolling on mount/update
        if (window.location.hash) {
            const sectionId = window.location.hash.replace('#', '');
            setTimeout(() => scrollToId(sectionId), 100); // Small delay to ensure rendering
        }

        // Initialize ScrollTrigger
        ScrollTrigger.defaults({
            toggleActions: 'play none none reverse',
        });

        // Mobile stability: the browser address bar showing/hiding fires a resize
        // that would otherwise recalculate every scroll animation and cause jitter.
        ScrollTrigger.config({ ignoreMobileResize: true });

        // Refresh after fonts load
        document.fonts.ready.then(() => {
            ScrollTrigger.refresh();
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        scrollToId(sectionId);
    };

    return (
        <div ref={mainRef} className="min-h-screen bg-soft-grey overflow-x-hidden">
            <SEOHead />

            <Navigation onNavigate={scrollToSection} />

            <main>
                <section id="home">
                    <Hero onBookAppointment={() => setIsBookingOpen(true)} />
                </section>

                <section id="academic-excellence">
                    <AcademicExcellence />
                </section>

                <section id="problem">
                    <ProblemAwareness />
                </section>

                <section id="symptoms">
                    <SymptomChecker />
                </section>

                <section id="about">
                    <About />
                </section>

                <section id="credentials">
                    <Credentials />
                </section>

                <section id="services">
                    <Services />
                </section>

                <section id="media">
                    <MediaMentions />
                </section>

                <section id="testimonials">
                    <Testimonials />
                </section>

                <section id="faq">
                    <FAQ />
                </section>

                <section id="clinic">
                    <Clinic />
                </section>

                <section id="contact">
                    <Contact />
                </section>
            </main>

            <Footer onNavigate={scrollToSection} />

            {/* Booking Modal */}
            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

            {/* WhatsApp Floating Button */}
            <WhatsAppButton />

            <Toaster position="top-right" richColors />
        </div>
    );
}

// SEO Component
function SEOHead() {
    useEffect(() => {
        // Update document title
        document.title = "Dr. A.K. Verma | Pulmonologist in Kanpur | Chest & Respiratory Specialist";

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content',
                "Dr. A.K. Verma, Consultant Chest Physician & Interventional Pulmonologist at Patel Chest & Allergy Clinic, Kanpur. MBBS, MD (KGMU), DM (Pulmonary, Critical Care & Sleep Medicine). Asthma, COPD, TB, ILD, Pneumonia, Lung Cancer, Pleural disease, Sleep Disorders (Sleep Apnea, Insomnia, Parasomnia) & Critical Care. Bronchoscopy, Thoracoscopy, EBUS, PFT & Impulse Oscillometry. Book: +91-9454097191."
            );
        }

        // Schema data logic... (omitted for brevity, can be kept same as App.tsx)
    }, []);

    return null;
}
