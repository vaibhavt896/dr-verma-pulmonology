import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Newspaper, Award, ExternalLink, Mic } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const mediaItems = [
    {
        id: 1,
        image: '/images/newspaper-asthma-awareness.jpg',
        title: 'Asthma & Inhalers Awareness Campaign',
        source: 'Nagar Chhaya Samachar',
        description: 'Dr. A.K. Verma featured in a major awareness campaign about asthma and proper inhaler usage in collaboration with Cipla.',
        type: 'newspaper',
    },
    {
        id: 2,
        image: '/images/dr-verma-conference.jpg',
        title: 'COPD Dual Bronchodilator Therapy Conference',
        source: 'Medical Conference',
        description: 'Dr. A.K. Verma presenting on "Optimizing Dual Bronchodilator Therapy in COPD Outcome" at a leading pulmonology conference.',
        type: 'conference',
    },
    {
        id: 3,
        image: '/images/dr-verma-profile.jpg',
        title: 'Expert Opinion on Pulmonary Fibrosis',
        source: 'Medical Journal',
        description: 'Dr. A.K. Verma shares insights on pulmonary fibrosis treatment and the importance of patient awareness.',
        type: 'feature',
    },
    {
        id: 4,
        image: '/images/article-pah-management.jpg',
        title: 'Management of High-risk PAH',
        source: 'Healthcare Publication',
        description: 'In-depth article by Dr. A.K. Verma on managing pulmonary arterial hypertension in high-risk patients.',
        type: 'article',
    },
];

export default function MediaMentions() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.media-title',
                { opacity: 0, y: 30 },
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

            gsap.fromTo('.media-card',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.media-grid',
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
            className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F6F9FC] to-white overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-healing-green/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-medical-blue/5 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="media-title inline-flex items-center gap-2 bg-medical-blue/5 rounded-full px-4 py-2 mb-6">
                        <Newspaper className="w-4 h-4 text-medical-blue" />
                        <span className="text-sm font-semibold text-medical-blue">Featured In</span>
                    </div>
                    <h2 className="media-title text-3xl lg:text-4xl font-bold text-[#0A2540] mb-4">
                        Media & Publications
                    </h2>
                    <p className="media-title text-lg text-[#4A5568] max-w-2xl mx-auto">
                        Dr. A.K. Verma's expertise recognized in leading healthcare publications and awareness campaigns
                    </p>
                </div>

                {/* Media Grid */}
                <div className="media-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {mediaItems.map((item) => (
                        <div
                            key={item.id}
                            className="media-card group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${item.type === 'newspaper'
                                        ? 'bg-blue-500 text-white'
                                        : item.type === 'conference'
                                            ? 'bg-orange-500 text-white'
                                            : item.type === 'feature'
                                                ? 'bg-[#00D4AA] text-white'
                                                : 'bg-purple-500 text-white'
                                        }`}>
                                        {item.type === 'newspaper' && <Newspaper className="w-3 h-3" />}
                                        {item.type === 'conference' && <Mic className="w-3 h-3" />}
                                        {item.type === 'feature' && <Award className="w-3 h-3" />}
                                        {item.type === 'article' && <ExternalLink className="w-3 h-3" />}
                                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="text-xs font-semibold text-healing-green uppercase tracking-wider mb-2">
                                    {item.source}
                                </div>
                                <h3 className="text-lg font-bold text-medical-blue mb-2 line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-[#4A5568] line-clamp-3">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
