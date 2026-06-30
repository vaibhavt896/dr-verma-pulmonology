import { useState, useEffect, useRef } from 'react';

import { Wind, RefreshCw, ExternalLink, Activity } from 'lucide-react';

interface AQIData {
    aqi: number;
    pm25: number;
    pm10?: number;
    lastUpdated: string;
    station: string;
    status: 'loading' | 'success' | 'error';
}

// Cinematic AQI Definitions with "Atmosphere" colors
const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return {
        label: 'Fresh Air',
        color: '#10B981',
        gradient: 'from-emerald-400/20 to-teal-500/20',
        smokeColor: 'rgba(16, 185, 129, 0.4)',
        textColor: 'text-emerald-700',
        description: 'Perfect for outdoor activities.'
    };
    if (aqi <= 100) return {
        label: 'Moderate',
        color: '#F59E0B',
        gradient: 'from-amber-300/20 to-orange-400/20',
        smokeColor: 'rgba(245, 158, 11, 0.4)',
        textColor: 'text-amber-700',
        description: 'Sensitive groups should limit exertion.'
    };
    if (aqi <= 150) return {
        label: 'Unhealthy for Sensitive',
        color: '#F97316',
        gradient: 'from-orange-400/20 to-red-400/20',
        smokeColor: 'rgba(249, 115, 22, 0.4)',
        textColor: 'text-orange-700',
        description: 'Risk of respiratory issues.'
    };
    if (aqi <= 200) return {
        label: 'Unhealthy',
        color: '#EF4444',
        gradient: 'from-red-500/20 to-rose-600/20',
        smokeColor: 'rgba(239, 68, 68, 0.4)',
        textColor: 'text-red-700',
        description: 'Avoid outdoor exercise.'
    };
    if (aqi <= 300) return {
        label: 'Very Unhealthy',
        color: '#8B5CF6',
        gradient: 'from-purple-500/20 to-indigo-600/20',
        smokeColor: 'rgba(139, 92, 246, 0.4)',
        textColor: 'text-purple-700',
        description: 'Serious health risk.'
    };
    return {
        label: 'Hazardous',
        color: '#7F1D1D',
        gradient: 'from-gray-700/40 to-black/40',
        smokeColor: 'rgba(127, 29, 29, 0.6)',
        textColor: 'text-gray-900',
        description: 'Emergency conditions.'
    };
};

export default function LiveAQI() {
    const [aqiData, setAqiData] = useState<AQIData>({
        aqi: 0,
        pm25: 0,
        lastUpdated: '',
        station: '',
        status: 'loading'
    });
    const [isRefreshing, setIsRefreshing] = useState(false);
    const smokeRef = useRef<HTMLDivElement>(null);

    const fetchAQI = async () => {
        setIsRefreshing(true);
        try {
            // Simulate API call for demo if token fails, or use real one
            const response = await fetch(
                'https://api.waqi.info/feed/geo:26.458;80.350/?token=6008235d80ef7200e13c90e350b6d058501f8e87'
            );
            const data = await response.json();

            if (data.status === 'ok' && data.data) {
                const { aqi, iaqi, time } = data.data;
                setAqiData({
                    aqi: typeof aqi === 'number' ? aqi : parseInt(aqi) || 0,
                    pm25: iaqi?.pm25?.v || 0,
                    pm10: iaqi?.pm10?.v || 0,
                    lastUpdated: time?.s ? new Date(time.s).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                    station: 'Kanpur',
                    status: 'success'
                });
            } else {
                setAqiData(prev => ({ ...prev, status: 'error' }));
            }
        } catch (error) {
            setAqiData(prev => ({ ...prev, status: 'error' }));
        }
        setIsRefreshing(false);
    };

    useEffect(() => {
        fetchAQI();
        const interval = setInterval(fetchAQI, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const aqiLevel = getAQILevel(aqiData.aqi);

    return (
        <div className="relative h-full w-full">
            {/* Clean card with a single condition-tinted wash */}
            <div className="group relative h-full w-full overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-card transition-all duration-300 ease-smooth hover:shadow-card-hover hover:-translate-y-1">

                {/* Condition tint */}
                <div ref={smokeRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 transition-colors duration-1000 opacity-[0.07]"
                        style={{ background: `linear-gradient(to bottom right, ${aqiLevel.color}, transparent 70%)` }}
                    />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 p-8 flex flex-col h-full justify-between">

                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                                <Wind className="w-6 h-6 transition-colors duration-700" style={{ color: aqiLevel.color }} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-bold text-medical-blue">{aqiData.station}</p>
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                </div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Live Air Quality</p>
                            </div>
                        </div>

                        {/* Live Indicator */}
                        <div className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-medical-blue/70">
                                {aqiData.status === 'loading' ? 'Syncing...' : 'Live'}
                            </span>
                        </div>
                    </div>

                    {/* Main Hero & Simulation */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center my-6">
                        <div className="relative">
                            {/* Main Number - sized to never clip its card */}
                            <h2
                                className="text-7xl lg:text-8xl font-bold tracking-tighter tabular-nums leading-none transition-colors duration-700"
                                style={{ color: aqiLevel.color }}
                            >
                                {aqiData.status === 'loading' ? '--' : aqiData.aqi}
                            </h2>
                            <span className="block mt-2 text-xs font-bold uppercase tracking-[0.3em] text-slate-400 text-center">AQI</span>
                        </div>

                        <div className="mt-4 space-y-1">
                            <p className={`text-2xl font-bold transition-colors duration-700 ${aqiLevel.textColor}`}>
                                {aqiLevel.label}
                            </p>
                            <p className="text-sm text-slate-600 max-w-[240px] mx-auto">
                                {aqiLevel.description}
                            </p>
                        </div>
                    </div>

                    {/* Footer Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* PM2.5 Card */}
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <Activity className="w-4 h-4 text-slate-600" />
                                <span className="text-xs font-semibold text-slate-600">PM 2.5</span>
                            </div>
                            <div className="text-2xl font-bold text-medical-blue">
                                {aqiData.pm25.toFixed(0)} <span className="text-xs font-medium text-gray-500">μg/m³</span>
                            </div>
                            {/* Tiny Progress Bar */}
                            <div className="w-full h-1 bg-black/5 rounded-full mt-2 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                        width: `${Math.min((aqiData.pm25 / 100) * 100, 100)}%`,
                                        backgroundColor: aqiLevel.color
                                    }}
                                />
                            </div>
                        </div>

                        {/* Refresh / Source */}
                        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-white/40 flex flex-col justify-between hover:bg-white/50 transition-colors">
                            <div className="text-xs text-slate-600 flex items-center justify-between">
                                <span className="font-semibold">Last Update</span>
                                <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                            </div>
                            <div className="text-lg font-bold text-medical-blue">
                                {aqiData.lastUpdated || '--:--'}
                            </div>
                            <a
                                href="https://aqicn.org/city/india/uttar-pradesh/kanpur/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[10px] text-slate-600/70 hover:text-medical-blue transition-colors mt-auto pt-1"
                            >
                                Source: WAQI <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
