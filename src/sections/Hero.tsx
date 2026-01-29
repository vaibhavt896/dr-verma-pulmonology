import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Phone, Calendar, Star, Award, Users, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onBookAppointment: () => void;
}

export default function Hero({ onBookAppointment }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Atmospheric Particles Animation (Base Float) - ENHANCED VISIBILITY
      gsap.fromTo('.particle',
        {
          y: 'random(100, 200)',
          opacity: 0
        },
        {
          y: 'random(-100, -200)',
          opacity: 'random(0.3, 0.6)', // Increased max opacity
          duration: 'random(10, 20)', // Slower, more calming drift
          stagger: {
            amount: 5,
            repeat: -1,
            yoyo: true
          },
          ease: 'sine.inOut',
        }
      );

      // 2. Content Entrance
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -40, filter: 'blur(10px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(imageRef.current,
        { opacity: 0, x: 40, scale: 0.95, filter: 'blur(10px)' },
        { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.4 }
      );

      // 3. Mouse Move Parallax (Physics)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        // Move particles opposite to mouse
        gsap.to('.particle', {
          x: xPos * -50,
          y: yPos * -50,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        // Move floating stats slightly with mouse
        gsap.to('.hero-stat', {
          x: xPos * 30,
          y: yPos * 30,
          duration: 1.5,
          ease: 'power2.out'
        });

        // Move background blob slowly
        gsap.to('.hero-blob', {
          x: xPos * -20,
          y: yPos * -20,
          duration: 2,
          ease: 'power1.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // 4. Scroll Parallax for Background
      gsap.to('.hero-bg-layer', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Cleanup
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Magnetic Button Logic
  const magneticBtnRef = useRef<HTMLButtonElement>(null);

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = magneticBtnRef.current;
    if (!btn) return;

    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    gsap.to(btn, {
      x: x * 0.2, // Magnetic pull strength
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMagneticLeave = () => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-soft-grey"
    >
      {/* 1. Cinematic Background: Warm, Organic, Breathing */}
      <div className="absolute inset-0 z-0 hero-bg-layer">
        {/* Warm Ambient Glow */}
        <div className="hero-blob absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-amber-100/40 to-orange-50/30 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="hero-blob absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-gradient-to-tl from-blue-100/40 to-cyan-50/30 rounded-full blur-[100px] mix-blend-multiply" />

        {/* Subtle Noise Texture for Film Grain Feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* 2. Atmospheric Particles (Visualizing "Air") */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-amber-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 20}%`,
              transform: `scale(${Math.random() * 2 + 0.5})`,
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`blue-${i}`}
            className="particle absolute w-1.5 h-1.5 bg-blue-300/20 rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 30}%`,
              transform: `scale(${Math.random() * 3 + 1})`,
            }}
          />
        ))}
      </div>

      {/* Content Container - Immersive Layering */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 lg:py-20 lg:pt-32 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

          {/* Left Column - Cinematic Typography (Depth Layer: 1) */}
          <div ref={contentRef} className="text-left relative z-10 pointer-events-none">
            {/* Enable pointer events only for interactive elements */}
            <div className="pointer-events-auto">

              {/* Trust Badge - Floating Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/50 mb-8 hover:shadow-md transition-all duration-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-gray-600 tracking-wide uppercase text-[11px]">Accepting Urgent Cases</span>
              </div>

              {/* Headline - Mixed Typography with Depth */}
              <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold text-medical-blue leading-[1.05] mb-8 tracking-tight relative">
                Helping Kanpur <br />
                <span className="font-display italic font-normal bg-gradient-to-r from-healing-green to-medical-blue bg-clip-text text-transparent p-1">
                  Breathe Better
                </span>
              </h1>

              {/* Subheadline - Storytelling */}
              <p className="text-lg sm:text-xl text-[#4A5568] mb-10 leading-relaxed max-w-lg font-light backdrop-blur-sm bg-white/30 rounded-lg p-2 -ml-2">
                Most respiratory struggles are silent. We help you find your voice and your breath again with <span className="font-semibold text-medical-blue">world-class pulmonology care</span>, right here in Ashok Nagar.
              </p>

              {/* CTAs - Magnetic Feel */}
              <div className="flex flex-col sm:flex-row gap-5 mb-16">
                <Button
                  ref={magneticBtnRef}
                  onClick={onBookAppointment}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  size="lg"
                  className="group relative overflow-hidden bg-medical-blue hover:bg-[#0B1120] text-white rounded-2xl px-10 py-8 text-lg font-medium shadow-[0_20px_50px_rgba(2,6,23,0.15)] transition-all hover:shadow-[0_20px_50px_rgba(2,6,23,0.3)] will-change-transform"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </span>
                </Button>

                <a href="tel:+917041055430">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border border-medical-blue/10 bg-white/50 backdrop-blur-sm text-medical-blue hover:bg-white hover:text-medical-blue rounded-2xl px-10 py-8 text-lg font-medium transition-all hover:-translate-y-1 shadow-sm"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    +91-7041055430
                  </Button>
                </a>
              </div>

              {/* Trust Indicators - Minimalist */}
              <div className="flex items-center gap-8 border-t border-[#0A2540]/10 pt-8 max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-[#FAFAF9] bg-gray-200 overflow-hidden shadow-sm">
                        <img src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} alt="Patient" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-[#FAFAF9] bg-medical-blue flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      +10k
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-medical-blue">4.9</span>
                    </div>
                    <span className="text-xs text-[#4A5568] font-medium">Trusted by Families</span>
                  </div>
                </div>

                <div className="h-12 w-px bg-medical-blue/10" />

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-healing-green/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-healing-green" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-medical-blue text-lg leading-tight">15+ Years</span>
                    <span className="text-xs text-[#4A5568]">Clinical Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Immersive Image (Depth Layer: 2) */}
          <div ref={imageRef} className="block relative z-0 mt-8 lg:mt-0">
            {/* The "Blob" Morph Background - Behind Everything */}
            <div className="hero-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-[#E0F2FE] via-[#F1F5F9] to-transparent rounded-full blur-[80px] opacity-70 animate-pulse-slow pointer-events-none" />

            <div className="relative">
              {/* Main Doctor Image - Cutout Style */}
              {/* Using a mask to blend the left edge if it's not transparent, creating the 'bleed' effect */}
              <div className="relative rounded-[3rem] overflow-visible">
                {/* Note: In a real 'Cutout' scenario, we'd use a transparent PNG. Since we might have a JPG, 
                     we'll use a gradient mask to blend it softly into the background for that 'immersive' feel. */}
                <div className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] border text-white/50 border-white/60 backdrop-blur-sm mx-auto max-w-[90%] lg:max-w-none">
                  <img
                    src="/dr-verma.jpg"
                    alt="Dr. A.K. Verma"
                    className="w-full h-auto object-cover relative z-10 scale-105"
                    style={{
                      aspectRatio: '3/4',
                      maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
                      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)'
                    }}
                  />

                  {/* Cinematic Overlay Gradient */}
                  <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-[#0A2540]/90 via-[#0A2540]/20 to-transparent z-20" />

                  {/* Floating Info Cards - Glassmorphism */}
                  <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 z-30 flex justify-between items-end">
                    <div className="hero-stat bg-white/10 backdrop-blur-xl border border-white/20 p-4 lg:p-5 rounded-2xl text-white shadow-2xl">
                      <p className="text-[10px] lg:text-xs opacity-80 mb-1 uppercase tracking-wider">Specialization</p>
                      <p className="font-display text-xl lg:text-2xl">Pulmonology</p>
                    </div>
                    <div className="hero-stat bg-healing-green text-white p-4 lg:p-5 rounded-[20px] lg:rounded-[24px] rounded-br-[12px] shadow-lg shadow-healing-green/40 hover:scale-105 transition-transform duration-300 cursor-default">
                      <Wind className="w-6 h-6 lg:w-8 lg:h-8 mb-2 text-white" />
                      <div className="h-1 w-6 lg:w-8 bg-white/30 rounded-full mb-2" />
                      <p className="text-[10px] lg:text-xs font-bold uppercase tracking-wide">Breathe Easy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Parallax Floating Elements (Foreground) */}
            <div className="absolute top-[10%] -right-4 lg:top-[15%] lg:-right-8 hero-stat z-40 hidden sm:block">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex items-center gap-4 animate-float border border-white/50">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Happy Patients</p>
                  <p className="font-bold text-medical-blue text-xl">10,000+</p>
                </div>
              </div>
            </div>

            {/* Decorative 'Air' Circle */}
            <div className="absolute -bottom-12 -left-12 w-32 h-32 border border-healing-green/30 rounded-full blur-[1px] animate-spin-slow opacity-60 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] uppercase tracking-widest text-[#0A2540]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#0A2540] to-transparent" />
      </div>
    </div >
  );
}
