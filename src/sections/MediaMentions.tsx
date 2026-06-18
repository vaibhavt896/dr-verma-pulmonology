import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Newspaper, Award, ExternalLink, Mic } from 'lucide-react';
import { MOTION, prefersReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

const featuredPress = {
    image: '/Paper%20cutting.webp',
    title: 'Palpitations Explained: What NVAF Feels Like',
    source: 'National Daily',
    description:
        'Dr. A.K. Verma cited as the expert voice on NVAF — explaining how palpitations, irregular heartbeats and atrial fibrillation are connected, and when patients must seek timely cardiac and pulmonary evaluation.',
    quote: 'Palpitations are one of the most common symptoms of NVAF and are often described as a sensation of a racing, fluttering or irregular heartbeat.',
};

const mediaItems = [
    {
        id: 1,
        image: '/images/newspaper-asthma-awareness.webp',
        title: 'Asthma & Inhalers Awareness Campaign',
        source: 'Nagar Chhaya Samachar',
        description: 'Dr. A.K. Verma featured in a major awareness campaign about asthma and proper inhaler usage in collaboration with Cipla.',
        type: 'newspaper',
    },
    {
        id: 2,
        image: '/images/dr-verma-conference.webp',
        title: 'COPD Dual Bronchodilator Therapy Conference',
        source: 'Medical Conference',
        description: 'Dr. A.K. Verma presenting on "Optimizing Dual Bronchodilator Therapy in COPD Outcome" at a leading pulmonology conference.',
        type: 'conference',
    },
    {
        id: 3,
        image: '/images/dr-verma-profile.webp',
        title: 'Expert Opinion on Pulmonary Fibrosis',
        source: 'Medical Journal',
        description: 'Dr. A.K. Verma shares insights on pulmonary fibrosis treatment and the importance of patient awareness.',
        type: 'feature',
    },
    {
        id: 4,
        image: '/images/article-pah-management.webp',
        title: 'Management of High-risk PAH',
        source: 'Healthcare Publication',
        description: 'In-depth article by Dr. A.K. Verma on managing pulmonary arterial hypertension in high-risk patients.',
        type: 'article',
    },
];

export default function MediaMentions() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.media-title',
                { opacity: 0, y: MOTION.rise },
                {
                    opacity: 1,
                    y: 0,
                    duration: MOTION.dur.base,
                    ease: MOTION.ease,
                    stagger: MOTION.stagger,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo('.media-card',
                { opacity: 0, y: MOTION.rise },
                {
                    opacity: 1,
                    y: 0,
                    duration: MOTION.dur.base,
                    stagger: MOTION.stagger,
                    ease: MOTION.ease,
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
            className="relative py-16 sm:py-24 lg:py-32 bg-soft-grey overflow-hidden"
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
                    <h2 className="media-title text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-blue mb-4 tracking-tight">
                        Media & Publications
                    </h2>
                    <p className="media-title text-lg text-slate-600 max-w-2xl mx-auto">
                        Dr. A.K. Verma's expertise recognized in leading healthcare publications and awareness campaigns
                    </p>
                </div>

                {/* Featured Press Clip */}
                <div className="media-card mb-10 lg:mb-14">
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 max-w-4xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-stretch">
                            {/* Newspaper image */}
                            <div className="sm:w-[45%] relative overflow-hidden bg-slate-50 min-h-[220px] sm:min-h-0">
                                <img
                                    src={featuredPress.image}
                                    alt={featuredPress.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                                />
                                {/* Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-medical-blue text-white shadow">
                                        <Newspaper className="w-3 h-3" />
                                        Press Coverage
                                    </span>
                                </div>
                            </div>

                            {/* Text side */}
                            <div className="sm:w-[55%] p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                                <p className="text-xs font-bold text-healing-green uppercase tracking-widest mb-3">
                                    {featuredPress.source}
                                </p>
                                <h3 className="text-xl sm:text-2xl font-bold text-medical-blue mb-4 leading-tight group-hover:text-healing-green transition-colors duration-200">
                                    {featuredPress.title}
                                </h3>

                                {/* Pull quote */}
                                <blockquote className="border-l-4 border-healing-green pl-4 mb-4">
                                    <p className="text-sm text-slate-500 italic leading-relaxed">
                                        "{featuredPress.quote}"
                                    </p>
                                    <footer className="text-xs font-semibold text-medical-blue mt-2">
                                        — Dr. A.K. Verma, Pulmonologist, Kanpur
                                    </footer>
                                </blockquote>

                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {featuredPress.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media Grid */}
                <div className="media-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-smooth"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-medical-blue/85 text-white backdrop-blur-sm">
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
                                <p className="text-sm text-slate-600 line-clamp-3">
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
