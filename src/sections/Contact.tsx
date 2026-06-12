import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, Clock, CheckCircle, User, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Phone,
    title: 'Call Now',
    content: '+91-7041055430',
    link: 'tel:+917041055430',
    color: 'var(--healing-green)',
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'Ashok Nagar, Kanpur',
    link: 'https://maps.google.com/?q=26.4499,80.3319',
    color: 'var(--care-coral)',
    external: true,
  },
  {
    icon: Clock,
    title: 'Hours',
    content: 'Mon-Sat: 9AM - 7PM',
    link: null,
    color: '#8B5CF6',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-title',
        { opacity: 0, y: 40 },
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

      gsap.fromTo('.contact-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsApp = () => {
    const message = `नमस्ते Dr. Verma 🙏

I'd like to book an appointment.

Name: ${formData.name || '[Please share]'}
Phone: ${formData.phone || '[Please share]'}

धन्यवाद 🙏`;
    const whatsappUrl = `https://wa.me/917041055430?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Open WhatsApp with pre-filled message
    handleWhatsApp();

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-soft-grey to-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-healing-green/5 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="contact-title inline-flex items-center gap-2 bg-gradient-to-r from-healing-green/20 to-healing-green/10 rounded-full px-4 py-2 mb-4 border border-healing-green/20">
            <Sparkles className="w-4 h-4 text-healing-green" />
            <span className="text-xs sm:text-sm font-semibold text-medical-blue">Book in 30 Seconds</span>
          </div>
          <h2 className="contact-title text-2xl sm:text-4xl lg:text-5xl font-bold text-medical-blue mb-4">
            Ready to Breathe Easier?
          </h2>
          <p className="contact-title text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            Same-day appointments often available. Just tap WhatsApp or call.
          </p>
        </div>

        {/* Primary CTAs - WhatsApp & Call */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16">
          <a
            href="https://wa.me/917041055430"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-title flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 sm:py-5 rounded-full font-semibold text-lg shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] hover:-translate-y-1 transition-all active:scale-[0.98]"
          >
            <MessageCircle className="w-6 h-6" />
            WhatsApp Dr. Verma
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="tel:+917041055430"
            className="contact-title flex items-center justify-center gap-3 bg-medical-blue text-white px-8 py-4 sm:py-5 rounded-full font-semibold text-lg shadow-[0_10px_30px_rgba(10,37,64,0.3)] hover:shadow-[0_15px_40px_rgba(10,37,64,0.4)] hover:-translate-y-1 transition-all active:scale-[0.98]"
          >
            <Phone className="w-6 h-6" />
            Call: +91-7041055430
          </a>
        </div>

        {/* Quick Info Cards */}
        <div className="contact-grid grid grid-cols-3 gap-3 sm:gap-6 mb-12 sm:mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            const CardContent = (
              <div className="contact-card text-center bg-white rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${info.color}15` }}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: info.color }} />
                </div>
                <div className="text-xs sm:text-sm text-slate-600 mb-1">{info.title}</div>
                <div className="font-semibold text-sm sm:text-base text-medical-blue">{info.content}</div>
              </div>
            );

            return info.link ? (
              <a
                key={index}
                href={info.link}
                target={info.external ? '_blank' : undefined}
                rel={info.external ? 'noopener noreferrer' : undefined}
              >
                {CardContent}
              </a>
            ) : (
              <div key={index}>{CardContent}</div>
            );
          })}
        </div>

        {/* Minimal Form - Name + Phone only */}
        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-medical-blue mb-2 text-center">
              Request a Callback
            </h3>
            <p className="text-sm text-slate-600 mb-6 text-center">
              We'll call you within 30 minutes
            </p>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-healing-green/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <CheckCircle className="w-8 h-8 text-healing-green" />
                </div>
                <h4 className="text-xl font-bold text-medical-blue mb-2">Request Received!</h4>
                <p className="text-slate-600 text-sm">We'll call you shortly at {formData.phone}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Your Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-healing-green focus:ring-healing-green transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-healing-green focus:ring-healing-green transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-lg font-semibold bg-healing-green hover:bg-healing-green-dim text-white transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" />
                      Request Callback
                    </span>
                  )}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
