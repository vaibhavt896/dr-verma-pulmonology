import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone, Car, Accessibility, Wifi, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const facilities = [
  { icon: Check, label: 'Pulmonary Function Test Lab' },
  { icon: Check, label: 'Allergy Testing Center' },
  { icon: Check, label: 'In-House Pharmacy' },
  { icon: Check, label: 'Digital X-Ray' },
  { icon: Check, label: 'ECG Facility' },
  { icon: Check, label: 'Blood Test Collection' },
  { icon: Check, label: 'Nebulization' },
  { icon: Check, label: 'Oxygen Therapy' },
];

const amenities = [
  { icon: Car, label: 'Parking Available' },
  { icon: Accessibility, label: 'Wheelchair Accessible' },
  { icon: Wifi, label: 'Free WiFi' },
  { icon: Clock, label: 'Minimal Wait Time' },
];

export default function Clinic() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.clinic-title',
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

      gsap.fromTo('.clinic-image',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.clinic-image',
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo('.facility-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.facilities-list',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-soft-grey overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="clinic-title inline-block text-healing-green text-sm font-semibold uppercase tracking-wider mb-4">
            Visit Our Clinic
          </span>
          <h2 className="clinic-title text-4xl lg:text-5xl font-bold text-medical-blue mb-6">
            Modern Facility, Complete Care
          </h2>
          <p className="clinic-title text-lg text-slate-600 max-w-2xl mx-auto">
            Our Ashok Nagar clinic is equipped with the latest diagnostic tools and
            treatment facilities for comprehensive respiratory care.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image & Map */}
          <div className="space-y-6">
            {/* Clinic Image */}
            <div className="clinic-image relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/clinic-interior.webp"
                alt="Dr. A.K. Verma Clinic - Ashok Nagar, Kanpur"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Dr. A.K. Verma Clinic</h3>
                <p className="text-white/80 text-sm">
                  Opposite Vikas Diagnostic, Near Motijheel Chauraha
                </p>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="clinic-image rounded-3xl overflow-hidden shadow-lg border border-gray-200 h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.5588!2d80.3319!3d26.4499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c47f0b5d1e7b5%3A0x2e5cff0b5d1e7b5!2sAshok%20Nagar%2C%20Kanpur!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dr. A.K. Verma Clinic Location"
              />
            </div>
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-medical-blue mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-healing-green" />
                Clinic Address
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong className="text-medical-blue">111A/34, Dr. A.K. Verma Clinic</strong><br />
                Opposite Vikas Diagnostic<br />
                Near Motijheel Chauraha<br />
                Ashok Nagar Road, Kanpur - 208012<br />
                Uttar Pradesh, India
              </p>
              <a
                href="https://maps.google.com/?q=26.4499,80.3319"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-healing-green font-semibold hover:underline"
              >
                Get Directions
              </a>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-medical-blue mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-healing-green" />
                Working Hours
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Monday - Saturday</span>
                  <span className="font-semibold text-medical-blue">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Sunday</span>
                  <span className="font-semibold text-care-coral">Closed</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-healing-green/10 rounded-xl">
                <p className="text-sm text-medical-blue">
                  <strong>Emergency consultations</strong> available on call
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-medical-blue mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-healing-green" />
                Contact
              </h3>
              <a
                href="tel:+917041055430"
                className="text-2xl font-bold text-healing-green hover:text-healing-green-dim transition-colors"
              >
                +91-7041055430
              </a>
              <p className="text-sm text-slate-600 mt-2">
                Call or WhatsApp for appointments
              </p>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-medical-blue mb-4">
                In-House Facilities
              </h3>
              <div className="facilities-list grid grid-cols-2 gap-3">
                {facilities.map((facility, index) => {
                  const Icon = facility.icon;
                  return (
                    <div
                      key={index}
                      className="facility-item flex items-center gap-2 text-sm text-slate-600"
                    >
                      <Icon className="w-4 h-4 text-healing-green" />
                      {facility.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-3">
              {amenities.map((amenity, index) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-healing-green/10 rounded-full text-sm text-medical-blue"
                  >
                    <Icon className="w-4 h-4 text-healing-green" />
                    {amenity.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
