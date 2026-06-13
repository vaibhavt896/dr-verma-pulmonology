import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Menu, X, Phone, Calendar, Home, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
}

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Reviews', id: 'testimonials' },
  { label: 'Clinic', id: 'clinic' },
  { label: 'Contact', id: 'contact' },
];

export default function Navigation({ onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Refs for GSAP animations
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Drawer Animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Open Drawer
      gsap.to(mobileMenuRef.current, {
        x: '0%',
        duration: 0.8,
        ease: 'power3.out',
        display: 'block'
      });

      // Fade in Backdrop
      gsap.to(backdropRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out'
      });

      // Stagger Items
      gsap.fromTo('.mobile-nav-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      // Close Drawer
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.inOut'
      });

      // Fade out Backdrop
      gsap.to(backdropRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (id: string) => {
    if (id === 'assessment') {
      navigate('/assessment');
    } else {
      onNavigate(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Navigation - Dynamic Island */}
      <nav
        className={`fixed z-50 transition-all duration-500 ease-smooth ${isScrolled
          ? 'top-4 left-1/2 -translate-x-1/2 w-[95%] sm:w-auto min-w-[320px] rounded-full bg-white/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 py-2 sm:px-2'
          : 'top-0 left-0 right-0 w-full bg-transparent py-6'
          }`}
      >
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${isScrolled ? 'max-w-none' : 'max-w-7xl'}`}>
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group"
            >
              <div className={`w-11 h-11 flex items-center justify-center transition-transform duration-500 ${isScrolled ? 'scale-90' : ''}`}>
                <picture>
                  <source type="image/webp" srcSet="/logo.webp" />
                  <img
                    src="/logo.png"
                    alt="Dr. A.K. Verma Pulmonology clinic logo"
                    width={192}
                    height={192}
                    className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                  />
                </picture>
              </div>
              <div className={`hidden sm:block transition-all duration-500 ${isScrolled ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                <h1 className="font-bold text-lg leading-tight text-medical-blue">
                  Dr. A.K. Verma
                </h1>
                <p className="text-xs text-slate-600">
                  Consultant Chest Physician
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className={`hidden lg:flex items-center gap-1 transition-all duration-500 ${isScrolled ? 'gap-1' : 'gap-8'}`}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-100/50 ${isScrolled
                    ? 'text-medical-blue hover:text-healing-green'
                    : 'text-slate-600 hover:text-healing-green'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">


              <Button
                onClick={() => handleNavClick('assessment')}
                variant="ghost"
                className={`hidden md:flex rounded-full bg-white text-medical-blue border-2 border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:scale-95 hover:border-medical-blue/20 transition-all duration-300 ${isScrolled ? 'px-4 py-2 h-9 text-xs font-bold' : 'px-6 h-11 text-sm font-bold'}`}
              >
                <span className="flex items-center gap-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-healing-green"></span>
                  Free Lung Check
                </span>
              </Button>

              {/* Book Appointment - Primary Action */}
              <Button
                onClick={() => handleNavClick('contact')}
                variant="secondary"
                className={`hidden sm:flex rounded-full transition-all duration-300 ease-smooth hover:scale-105 shadow-[0_4px_14px_0_rgba(13,148,136,0.39)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.23)] ${isScrolled ? 'px-4 py-4 h-10 text-sm' : 'px-6 h-11'}`}
              >
                Book <span className={`${isScrolled ? 'hidden lg:inline ml-1' : 'inline ml-1'}`}>Appointment</span>
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 text-medical-blue" /> : <Menu className="w-6 h-6 text-medical-blue" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - GSAP Controlled */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-white shadow-2xl transform translate-x-full will-change-transform lg:hidden"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Menu Header with Close Button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="" width={192} height={192} className="w-9 h-9 object-contain" />
              <div>
                <span className="font-bold text-base leading-tight text-medical-blue block">Dr. A.K. Verma</span>
                <span className="text-xs text-slate-500">Consultant Chest Physician</span>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-soft-grey text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-6 px-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="mobile-nav-item text-left text-lg font-medium text-medical-blue py-4 px-4 rounded-xl hover:bg-soft-grey hover:pl-6 transition-all duration-300 border-b border-gray-50 last:border-0"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('assessment')}
              className="mobile-nav-item text-left text-lg font-medium text-medical-blue py-4 px-4 rounded-xl hover:bg-soft-grey hover:pl-6 transition-all duration-300 border-b border-gray-50 last:border-0"
            >
              Lung Check
            </button>
          </div>

          {/* Menu Footer */}
          <div className="p-6 bg-soft-grey mt-auto">
            <a
              href="tel:+919454097191"
              className="flex items-center justify-center gap-2 w-full bg-white border border-medical-blue/10 text-medical-blue font-semibold py-4 rounded-xl mb-4 shadow-sm"
            >
              <Phone className="w-5 h-5 text-healing-green" />
              <span>+91-9454097191</span>
            </a>
            <Button
              onClick={() => handleNavClick('contact')}
              className="w-full bg-healing-green hover:bg-healing-green-dim text-white rounded-xl py-6 text-lg shadow-lg shadow-healing-green/20"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 bg-medical-blue/20 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden"
        onClick={() => setIsMobileMenuOpen(false)}
      />



      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-200/50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] pb-safe">
        <div className="grid grid-cols-4 gap-1 py-1 px-2">
          {[{ label: 'Home', icon: Home, id: 'home' }, { label: 'About', icon: User, id: 'about' }].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(10);
                handleNavClick(item.id);
              }}
              className="flex flex-col items-center gap-1 py-3 text-slate-grey hover:text-healing-green transition-colors active:scale-95"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
          <a
            href="tel:+919454097191"
            onClick={() => { if (navigator.vibrate) navigator.vibrate(10); }}
            className="flex flex-col items-center gap-1 py-3 text-slate-grey hover:text-healing-green transition-colors active:scale-95"
          >
            <Phone className="w-6 h-6" />
            <span className="text-[10px] font-medium">Call</span>
          </a>
          <a
            href="https://wa.me/919454097191"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { if (navigator.vibrate) navigator.vibrate(10); }}
            className="flex flex-col items-center gap-1 py-3 rounded-2xl bg-healing-green text-white shadow-[0_4px_12px_rgba(13,148,136,0.3)] active:scale-95 transition-transform"
          >
            <Calendar className="w-6 h-6" />
            <span className="text-[10px] font-medium">Book</span>
          </a>
        </div>
      </div>
    </>
  );
}
