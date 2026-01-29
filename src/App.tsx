import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import ProblemAwareness from './sections/ProblemAwareness';
import SymptomChecker from './sections/SymptomChecker';
import BreathingAssessment from './sections/BreathingAssessment';
import About from './sections/About';
import Services from './sections/Services';

import Testimonials from './sections/Testimonials';
import Clinic from './sections/Clinic';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import MediaMentions from './sections/MediaMentions';
import BookingModal from './components/BookingModal';
import WhatsAppButton from './components/WhatsAppButton';
import { Toaster } from './components/ui/sonner';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
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
      {/* SEO Meta Tags - Injected via Helmet or similar in production */}
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

        <section id="breathing-assessment">
          <BreathingAssessment onBookAppointment={() => setIsBookingOpen(true)} />
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

        <section id="clinic">
          <Clinic />
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

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content',
        "Dr. A.K. Verma - Best Pulmonologist in Kanpur with 15+ years experience. 4.9★ rating from 479+ patients. Expert in asthma, COPD, allergy treatment. Book appointment: +91-7041055430. Location: Ashok Nagar, Kanpur."
      );
    }

    // Add structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Dr. A.K. Verma",
      "description": "Best Pulmonologist in Kanpur with 15+ years experience. Expert in asthma, COPD, allergy treatment.",
      "url": "https://drakverma.com",
      "telephone": "+91-7041055430",
      "email": "drakverma.clinic@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "111A/34, Opposite Vikas Diagnostic Near Motijheel Chauraha, Ashok Nagar Road",
        "addressLocality": "Kanpur",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "208012",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "26.4499",
        "longitude": "80.3319"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "priceRange": "₹₹",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "479",
        "bestRating": "5",
        "worstRating": "1"
      },
      "medicalSpecialty": ["Pulmonology", "Respiratory Medicine", "Chest Medicine"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Pulmonology Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalProcedure",
              "name": "Asthma Treatment"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalProcedure",
              "name": "COPD Treatment"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalProcedure",
              "name": "Allergy Testing"
            }
          }
        ]
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

export default App;
