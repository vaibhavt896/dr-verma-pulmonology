import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What conditions does Dr. Verma treat?',
    questionHindi: 'डॉ. वर्मा किन बीमारियों का इलाज करते हैं?',
    answer: 'Dr. Verma specializes in treating all respiratory conditions including asthma, COPD (Chronic Obstructive Pulmonary Disease), allergic bronchitis, chronic cough, sleep apnea, interstitial lung disease, tuberculosis, pneumonia, and other chest-related conditions. He also provides allergy testing and treatment.',
    answerHindi: 'दमा, COPD, एलर्जी, टीबी, निमोनिया और छाती की सभी बीमारियों का इलाज होता है।',
  },
  {
    question: 'How do I book an appointment?',
    questionHindi: 'अपॉइंटमेंट कैसे बुक करें?',
    answer: 'You can book an appointment by calling +91-7041055430, clicking the "Book Appointment" button on this website, or visiting the clinic directly. Same-day appointments are often available for urgent cases.',
    answerHindi: '+91-7041055430 पर कॉल करें या WhatsApp करें। अर्जेंट केस के लिए उसी दिन अपॉइंटमेंट मिल जाती है।',
  },
  {
    question: 'How quickly can I expect improvement?',
    questionHindi: 'कितने दिन में आराम मिलेगा?',
    answer: 'Treatment outcomes vary by condition. Many patients with acute issues like bronchitis see improvement within a week. Chronic conditions like asthma and COPD require ongoing management, but most patients report better symptom control within 2-4 weeks of starting proper treatment.',
    answerHindi: 'ब्रोंकाइटिस में 1 हफ्ते में आराम। दमा और COPD में 2-4 हफ्ते में लक्षणों में सुधार दिखता है।',
  },
  {
    question: 'Is in-house testing available?',
    questionHindi: 'क्या टेस्ट क्लिनिक में ही हो जाते हैं?',
    answer: 'Yes, our clinic has comprehensive in-house testing facilities including Pulmonary Function Tests (PFT), spirometry, allergy testing (skin prick test), digital X-ray, ECG, and blood test collection. This means you can get diagnosed and start treatment in one visit.',
    answerHindi: 'हाँ, PFT, स्पाइरोमेट्री, एलर्जी टेस्ट, X-Ray सब क्लिनिक में ही होता है। एक ही विज़िट में टेस्ट और इलाज।',
  },
  {
    question: 'What should I bring to my first visit?',
    questionHindi: 'पहली विज़िट में क्या लाना है?',
    answer: 'Please bring any previous medical records, test reports, current medications, and a list of symptoms. If you have asthma or COPD, bring your inhalers. Also carry a valid ID and previous doctor\'s prescriptions if available.',
    answerHindi: 'पुरानी रिपोर्ट्स, दवाइयां, और पहचान पत्र लेकर आएं। इनहेलर वाले मरीज़ अपना इनहेलर ज़रूर लाएं।',
  },
  {
    question: 'How long is the typical wait time?',
    questionHindi: 'कितनी देर इंतज़ार करना पड़ता है?',
    answer: 'Most patients are seen within 30 minutes of their scheduled appointment time. We value your time and strive to minimize waiting periods. For walk-in patients, the wait time may vary based on the queue.',
    answerHindi: 'अपॉइंटमेंट वालों को 30 मिनट में बुलाया जाता है। बिना अपॉइंटमेंट वालों का नंबर के हिसाब से।',
  },
  {
    question: 'Does Dr. Verma treat children?',
    questionHindi: 'क्या बच्चों का इलाज होता है?',
    answer: 'Yes, Dr. Verma treats patients of all ages, including children with respiratory issues like asthma, allergies, and recurrent chest infections. His gentle approach makes children feel comfortable during examinations.',
    answerHindi: 'हाँ, बच्चों का भी इलाज होता है — दमा, एलर्जी, बार-बार होने वाले छाती के इंफेक्शन सब।',
  },
  {
    question: 'What are the clinic timings?',
    questionHindi: 'क्लिनिक का समय क्या है?',
    answer: 'The clinic is open Monday to Saturday from 9:00 AM to 7:00 PM. Sunday is closed. For emergencies, you can call +91-7041055430 and the doctor will guide you accordingly.',
    answerHindi: 'सोमवार से शनिवार: सुबह 9 बजे से शाम 7 बजे। रविवार बंद। इमरजेंसी में फोन करें।',
  },
  {
    question: 'Do you accept health insurance?',
    questionHindi: 'क्या स्वास्थ्य बीमा चलता है?',
    answer: 'We accept all major health insurance providers and third-party administrator (TPA) cards. Please bring your insurance card and a valid ID. Our staff will assist with the paperwork and claims process.',
    answerHindi: 'सभी बड़ी बीमा कंपनियों का कार्ड और TPA चलता है। बीमा कार्ड और ID लेकर आएं।',
  },
  {
    question: 'Is parking available near the clinic?',
    questionHindi: 'पार्किंग की सुविधा है?',
    answer: 'Yes, free parking is available right outside the clinic in Ashok Nagar. The clinic is easily accessible from Motijheel Chauraha and is wheelchair accessible for elderly and differently-abled patients.',
    answerHindi: 'हाँ, क्लिनिक के बाहर फ्री पार्किंग है। मोतीझील चौराहे से आसानी से पहुंचा जा सकता है।',
  },
];

// Generate JSON-LD schema for FAQPage
const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-title',
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

      gsap.fromTo('.faq-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-soft-grey overflow-hidden"
    >
      {/* JSON-LD FAQ Schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema()) }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="faq-title inline-block text-[#00D4AA] text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">
            FAQ | अक्सर पूछे जाने वाले सवाल
          </span>
          <h2 className="faq-title text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0A2540] mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ List */}
        <div className="faq-list space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`faq-item bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-xl ring-2 ring-healing-green' : 'shadow-md hover:shadow-lg'
                  }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
                >
                  <div className="pr-4">
                    <span className={`font-semibold text-base sm:text-lg block ${isOpen ? 'text-healing-green' : 'text-medical-blue'}`}>
                      {faq.question}
                    </span>
                    <span className="text-xs sm:text-sm text-[#4A5568]/70 block mt-1">
                      {faq.questionHindi}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-healing-green' : 'text-[#4A5568]'
                      }`}
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3">
                    <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
                      {faq.answer}
                    </p>
                    <p className="text-xs sm:text-sm text-healing-green leading-relaxed border-l-2 border-healing-green pl-3">
                      {faq.answerHindi}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-medical-blue to-[#1a3a5c] rounded-3xl p-8 text-white">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-healing-green" />
            <h3 className="text-2xl font-bold mb-2">Still Have Questions?</h3>
            <p className="text-white/80 mb-6">
              Our team is here to help. Call us or send a WhatsApp message.
            </p>
            <a
              href="tel:+917041055430"
              className="inline-flex items-center gap-2 bg-healing-green text-white px-8 py-4 rounded-full font-semibold hover:bg-[#00B894] transition-all hover:-translate-y-1"
            >
              Call: +91-7041055430
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
