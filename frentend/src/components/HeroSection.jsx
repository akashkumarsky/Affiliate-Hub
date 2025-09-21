import React from 'react';
import { BadgeCheck } from 'lucide-react'; // An icon for trust and verification

const HeroSection = () => {
    return (
        <section className="bg-white rounded-xl shadow-md p-8 mb-8 text-center">
            <div className="flex flex-col items-center">
                <BadgeCheck className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                    Shop with Confidence
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-gray-600">
                    Welcome to Affiliate Hub! Every link on our site is a genuine affiliate link from the official
                    <span className="font-semibold text-gray-800"> Amazon Associates Program</span>.
                </p>
                <p className="mt-2 max-w-2xl text-md text-gray-500">
                    When you purchase through our links, we earn a small commission{' '}
                    <span className="font-semibold">at no extra cost to you</span>. This helps us continue to find and share the best deals. Thank you for your support!
                </p>
            </div>
        </section>
    );
};

export default HeroSection;