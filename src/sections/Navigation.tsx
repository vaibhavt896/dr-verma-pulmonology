import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Menu, X, Phone, Calendar, Home, User, Sparkles, MapPin } from 'lucide-react';
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
      {/* Announcement Bar — all screens, slides away on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-medical-blue text-white transition-transform duration-500 ease-smooth ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="h-9 flex items-center overflow-hidden">
          {/* Mobile: scrolling ticker */}
          <div className="flex md:hidden w-screen overflow-hidden">
            <div className="animate-marquee flex items-center whitespace-nowrap">
              {[0, 1].map((i) => (
                <span key={i} className="flex items-center gap-2 pr-14 text-[12px]">
                  <Sparkles className="w-3 h-3 text-healing-green flex-shrink-0" />
                  <span className="font-semibold text-white">Accepting New Patients in Kanpur</span>
                  <span className="text-healing-green/60 mx-1">·</span>
                  <span className="text-white/70">Asthma · COPD · Allergies · Sleep Disorders</span>
                </span>
              ))}
            </div>
          </div>

          {/* Desktop: centered static */}
          <div className="hidden md:flex w-full max-w-7xl mx-auto px-6 lg:px-8 items-center justify-center">
            <p className="flex items-center gap-2.5 text-[13px]">
              <Sparkles className="w-3.5 h-3.5 text-healing-green flex-shrink-0" />
              <span className="font-semibold text-white">Accepting New Patients in Kanpur</span>
              <span className="w-1 h-1 rounded-full bg-healing-green/70 flex-shrink-0" />
              <span className="text-white/60">Compassionate care for Asthma, COPD, Allergies &amp; Sleep Disorders</span>
            </p>
          </div>
        </div>
      </div>

      {/* Top Navigation - Dynamic Island */}
      <nav
        className={`fixed z-50 transition-all duration-500 ease-smooth ${isScrolled
          ? 'top-3 left-1/2 -translate-x-1/2 w-[95%] sm:w-auto rounded-full bg-white/85 lg:backdrop-blur-xl lg:backdrop-saturate-150 shadow-[0_6px_24px_-8px_rgba(13,30,50,0.18)] ring-1 ring-black/[0.06] py-1.5 px-1.5'
          : 'top-9 left-0 right-0 w-full bg-transparent py-3'
          }`}
      >
        <div className={`mx-auto ${isScrolled ? 'max-w-none px-2' : 'max-w-7xl px-4 sm:px-6 lg:px-8'}`}>
          <div className={`flex items-center justify-between ${isScrolled ? 'gap-2' : 'gap-4'}`}>
            {/* Logo — full lockup at the top of the page, icon mark once collapsed */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center group flex-shrink-0"
              aria-label="Dr. A.K. Verma — go to top"
            >
              {/* Full stacked lockup (icon + name + role) — expanded state */}
              <picture className={isScrolled ? 'hidden' : 'block'}>
                <source type="image/webp" srcSet="/logo-full.webp" />
                <img
                  src="/logo-full.png"
                  alt="Dr. A.K. Verma — Consultant Chest Physician"
                  width={853}
                  height={651}
                  className="h-14 w-auto object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </picture>
              {/* Icon mark only — collapsed pill state */}
              <picture className={isScrolled ? 'block' : 'hidden'}>
                <source type="image/webp" srcSet="/logo-mark.webp" />
                <img
                  src="/logo-mark.png"
                  alt="Dr. A.K. Verma logo"
                  width={444}
                  height={345}
                  className="h-9 w-auto object-contain ml-1 drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                />
              </picture>
            </button>

            {/* Desktop Navigation */}
            <div className={`hidden lg:flex items-center gap-1 transition-all duration-500 ${isScrolled ? 'gap-1' : 'gap-8'}`}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-100/50 ${isScrolled
                    ? 'px-3 py-1.5 text-medical-blue hover:text-healing-green'
                    : 'px-4 py-2 text-slate-600 hover:text-healing-green'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className={`flex items-center ${isScrolled ? 'gap-2' : 'gap-4 lg:gap-5'}`}>

              {/* Phone contact block — desktop, hidden once collapsed to pill */}
              <a
                href="tel:+919454097191"
                className={`items-center gap-2.5 group/phone ${isScrolled ? 'hidden' : 'hidden lg:flex'}`}
              >
                <span className="w-10 h-10 rounded-full bg-healing-green/10 flex items-center justify-center transition-colors group-hover/phone:bg-healing-green/20">
                  <Phone className="w-4 h-4 text-healing-green" />
                </span>
                <span className="leading-tight whitespace-nowrap">
                  <span className="block text-sm font-bold text-medical-blue">+91 94540 97191</span>
                  <span className="block text-[11px] text-slate-500">Call for Appointments</span>
                </span>
              </a>

              {/* Divider between phone and Book */}
              <span className={`h-9 w-px bg-slate-200 ${isScrolled ? 'hidden' : 'hidden lg:block'}`} />

              {/* Book Appointment - Primary Action */}
              <Button
                onClick={() => handleNavClick('contact')}
                variant="secondary"
                className={`hidden sm:flex rounded-full transition-all duration-300 ease-smooth hover:scale-105 shadow-[0_4px_14px_0_rgba(13,148,136,0.39)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.23)] ${isScrolled ? 'px-4 h-9 text-sm' : 'px-7 h-11'}`}
              >
                <span className="whitespace-nowrap">
                  Book<span className={isScrolled ? 'hidden lg:inline' : 'inline'}>&nbsp;Appointment</span>
                </span>
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
            <picture>
              <source type="image/webp" srcSet="/logo-full.webp" />
              <img
                src="/logo-full.png"
                alt="Dr. A.K. Verma — Consultant Chest Physician"
                width={853}
                height={651}
                className="h-12 w-auto object-contain"
              />
            </picture>
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
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200/50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] pb-safe">
        <div className="grid grid-cols-5 items-end px-2 py-1">
          {/* Home */}
          <button
            onClick={() => { if (navigator.vibrate) navigator.vibrate(10); handleNavClick('home'); }}
            className="flex flex-col items-center gap-1 py-3 text-slate-grey hover:text-healing-green transition-colors active:scale-95"
          >
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">Home</span>
          </button>

          {/* About */}
          <button
            onClick={() => { if (navigator.vibrate) navigator.vibrate(10); handleNavClick('about'); }}
            className="flex flex-col items-center gap-1 py-3 text-slate-grey hover:text-healing-green transition-colors active:scale-95"
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-medium">About</span>
          </button>

          {/* Book — elevated center */}
          <div className="flex justify-center">
            <button
              onClick={() => { if (navigator.vibrate) navigator.vibrate(10); handleNavClick('contact'); }}
              className="flex flex-col items-center -mt-6 active:scale-95 transition-transform"
            >
              <span className="w-14 h-14 rounded-full bg-healing-green text-white flex items-center justify-center shadow-[0_6px_16px_rgba(13,148,136,0.45)] border-4 border-white">
                <Calendar className="w-6 h-6" />
              </span>
              <span className="text-[10px] font-medium text-healing-green mt-1">Book</span>
            </button>
          </div>

          {/* Call */}
          <a
            href="tel:+919454097191"
            onClick={() => { if (navigator.vibrate) navigator.vibrate(10); }}
            className="flex flex-col items-center gap-1 py-3 text-slate-grey hover:text-healing-green transition-colors active:scale-95"
          >
            <Phone className="w-6 h-6" />
            <span className="text-[10px] font-medium">Call</span>
          </a>

          {/* Clinic */}
          <button
            onClick={() => { if (navigator.vibrate) navigator.vibrate(10); handleNavClick('clinic'); }}
            className="flex flex-col items-center gap-1 py-3 text-slate-grey hover:text-healing-green transition-colors active:scale-95"
          >
            <MapPin className="w-6 h-6" />
            <span className="text-[10px] font-medium">Clinic</span>
          </button>
        </div>
      </div>
    </>
  );
}
