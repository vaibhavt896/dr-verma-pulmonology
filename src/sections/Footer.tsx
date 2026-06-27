import { Phone, Mail, MapPin, Star, MessageCircle, Shield, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const quickLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About Dr. Verma', id: 'about' },
  { label: 'Our Services', id: 'services' },
  { label: 'Patient Reviews', id: 'testimonials' },
  { label: 'Clinic Location', id: 'clinic' },
  { label: 'Contact Us', id: 'contact' },
];

const services = [
  'Asthma Treatment',
  'COPD Management',
  'Tuberculosis (TB) Care',
  'Pneumonia & Chest Infections',
  'Lung Cancer Evaluation',
  'Pleural Disease Care',
  'Sleep Apnea & Sleep Medicine',
  'Critical Care & Respiratory ICU',
  'Allergy Testing',
  'Pulmonary Function Tests',
];

export default function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (id: string) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-medical-blue text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5">
                <img
                  src="/logo-mark.webp"
                  alt="Dr. A.K. Verma Pulmonology clinic logo"
                  width={444}
                  height={345}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">Dr. A.K. Verma</h3>
                <p className="text-white/60 text-sm">Consultant Chest Physician</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              Consultant Chest Physician & Interventional Pulmonologist in Kanpur. MBBS, MD (KGMU), DM (Pulmonary, Critical Care & Sleep Medicine). 15+ years experience. 4.9★ Google rating from 479+ patient reviews.
            </p>

            {/* Rating Badge */}
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold">4.9 (479+ Reviews)</span>
            </div>

            {/* Verified profiles */}
            <div className="flex gap-3">
              <a
                href="https://www.google.com/maps/search/Dr+A+K+Verma+Pulmonologist+Ashok+Nagar+Kanpur"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps profile"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-healing-green transition-colors"
              >
                <MapPin className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/919454097191"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-healing-green transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-white/70 hover:text-healing-green transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Book Appointment Button */}
            <a
              href="https://wa.me/919454097191"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full font-semibold text-sm hover:bg-[#1fb855] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Book on WhatsApp
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-white/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-healing-green flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  111A/34, Opposite Vikas Diagnostic<br />
                  Near Motijheel Chauraha<br />
                  Ashok Nagar, Kanpur - 208012
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-healing-green flex-shrink-0" />
                <a
                  href="tel:+919454097191"
                  className="text-white/70 hover:text-healing-green transition-colors"
                >
                  +91-9454097191
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-healing-green flex-shrink-0" />
                <a
                  href="mailto:dmpulmonarymedicine.in@gmail.com"
                  className="text-white/70 hover:text-healing-green transition-colors text-sm"
                >
                  dmpulmonarymedicine.in@gmail.com
                </a>
              </li>
            </ul>

            {/* Working Hours */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl">
              <h5 className="font-medium mb-2 text-sm">Working Hours</h5>
              <p className="text-white/70 text-sm">Mon – Sat: 12:00 PM – 3:00 PM</p>
              <p className="text-white/70 text-sm">Mon – Sat: 6:30 PM – 8:30 PM</p>
              <p className="text-white/50 text-sm">Sunday: Closed</p>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <Shield className="w-4 h-4 text-healing-green" />
                <span className="text-xs font-medium">MCI Registered</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-medium">Justdial Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar — extra bottom padding on mobile clears the fixed bottom nav bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Patel Chest & Allergy Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
