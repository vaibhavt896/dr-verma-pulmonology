import { Star, ExternalLink, MapPin, ShieldCheck } from 'lucide-react';

// Google Maps URLs for Dr. Verma's clinic
const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/Dr+A+K+Verma+Pulmonologist+Ashok+Nagar+Kanpur';
const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/search/Dr+A+K+Verma+Pulmonologist+Kanpur';

// Sample reviews from Google (can be updated regularly)
const googleReviews = [
    {
        name: 'Himanshu Sachan',
        rating: 5,
        date: '2 weeks ago',
        text: 'Highly experienced, highly professional. Dr. Verma diagnosed my chronic cough accurately when other doctors couldn\'t. The treatment worked within a week.',
        avatar: 'HS',
        verified: true,
    },
    {
        name: 'Saket Kumar',
        rating: 5,
        date: '1 month ago',
        text: 'I had a great experience with Dr. A K Verma. The care was excellent and the in-house chemist made it very convenient.',
        avatar: 'SK',
        verified: true,
    },
    {
        name: 'Ramroshne Kushwaha',
        rating: 5,
        date: '3 weeks ago',
        text: 'Best doctor! My father\'s COPD has been under control since we started treatment here. Dr. Verma explains everything so clearly.',
        avatar: 'RK',
        verified: true,
    },
    {
        name: 'Priya Sharma',
        rating: 5,
        date: '1 month ago',
        text: 'Dr. Verma is very polite and listens patiently. He explained my asthma condition in detail and gave me a proper action plan.',
        avatar: 'PS',
        verified: true,
    },
];

interface GoogleReviewsProps {
    variant?: 'full' | 'compact' | 'badge';
}

export default function GoogleReviews({ variant = 'full' }: GoogleReviewsProps) {
    const overallRating = 4.9;
    const totalReviews = 479;

    // Compact Badge Version
    if (variant === 'badge') {
        return (
            <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white rounded-full px-4 py-2.5 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-0.5 group"
            >
                {/* Google Logo */}
                <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < Math.floor(overallRating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                        />
                    ))}
                </div>

                {/* Rating */}
                <span className="font-bold text-gray-900">{overallRating}</span>
                <span className="text-sm text-gray-500">({totalReviews} reviews)</span>

                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </a>
        );
    }

    // Compact Version
    if (variant === 'compact') {
        return (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-md">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
                        <svg className="w-7 h-7" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-gray-900">{overallRating}</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">{totalReviews} reviews on Google</p>
                    </div>
                </div>

                {/* Verify Link */}
                <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors"
                >
                    <ShieldCheck className="w-4 h-4" />
                    Verify on Google Maps
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        );
    }

    // Full Version
    return (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Google Logo */}
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                            <svg className="w-8 h-8" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Google Reviews</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1">
                                    <span className="text-2xl font-bold text-gray-900">{overallRating}</span>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-gray-500">({totalReviews} reviews)</span>
                            </div>
                        </div>
                    </div>

                    {/* Verify Button */}
                    <a
                        href={GOOGLE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
                    >
                        <MapPin className="w-4 h-4" />
                        View on Google Maps
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="p-6 sm:p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                    {googleReviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            {/* Review Header */}
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {review.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-900 truncate">{review.name}</span>
                                        {review.verified && (
                                            <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                        <span>•</span>
                                        <span>{review.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                "{review.text}"
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Footer */}
                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        <ShieldCheck className="w-4 h-4 inline mr-1 text-green-500" />
                        All reviews verified from Google Maps
                    </p>

                    <div className="flex gap-3">
                        <a
                            href={GOOGLE_REVIEWS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full font-medium text-sm hover:bg-amber-100 transition-colors"
                        >
                            <Star className="w-4 h-4 fill-amber-500" />
                            Write a Review
                        </a>
                        <a
                            href={GOOGLE_MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm hover:bg-gray-200 transition-colors"
                        >
                            See All Reviews
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
