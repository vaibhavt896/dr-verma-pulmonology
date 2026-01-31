import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import ProblemAwareness from '../sections/ProblemAwareness';
import SymptomChecker from '../sections/SymptomChecker';
import About from '../sections/About';
import Services from '../sections/Services';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import MediaMentions from '../sections/MediaMentions';
import BookingModal from '../components/BookingModal';
import WhatsAppButton from '../components/WhatsAppButton';
import { Toaster } from '../components/ui/sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const mainRef = useRef<HTMLDivElement>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        // Handle hash scrolling on mount/update
        if (window.location.hash) {
            const sectionId = window.location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // Small delay to ensure rendering
        }

        // Initialize ScrollTrigger
        ScrollTrigger.defaults({
            toggleActions: 'play none none reverse',
        });

        // Refresh after fonts load
        document.fonts.ready.then(() => {
            ScrollTrigger.refresh();
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div ref={mainRef} className="min-h-screen bg-[#F6F9FC] overflow-x-hidden">
            <SEOHead />

            <Navigation onNavigate={scrollToSection} />

            <main>
                <section id="home">
                    <Hero onBookAppointment={() => setIsBookingOpen(true)} />
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
        document.title = "Best Pulmonologist in Kanpur | Dr. A.K. Verma | Chest Specialist - 4.9★ (479+ Reviews)";

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content',
                "Dr. A.K. Verma - Best Pulmonologist in Kanpur with 15+ years experience. 4.9★ rating from 479+ patients. Expert in asthma, COPD, allergy treatment. Book appointment: +91-7041055430. Location: Ashok Nagar, Kanpur."
            );
        }

        // Schema data logic... (omitted for brevity, can be kept same as App.tsx)
    }, []);

    return null;
}
