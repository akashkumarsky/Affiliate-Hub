import React from 'react';
import StarRating from './StarRating';

const ProductCard = ({ product }) => {
    const { name, price, discount, rating, imageUrl, asin } = product;
    const finalPrice = (price * (1 - discount / 100)).toFixed(2);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0, // Optional: removes decimals for cleaner look
        }).format(amount);
    };

    // --- THIS IS THE FIX ---
    // The affiliate tag must be a string, enclosed in quotes.
    const affiliateTag = "skylight01-21";
    const amazonUrl = `https://www.amazon.in/dp/${asin}?tag=${affiliateTag}`; // Using .in for your tag

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="relative">
                <img src={imageUrl} alt={name} className="w-full h-48 object-cover" onError={(e) => { e.target.src = 'https://placehold.co/400x300/e2e8f0/333?text=Image+Not+Found'; }} />
                {discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {discount}% OFF
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{name}</h3>
                <div className="flex items-baseline mb-3">
                    {/* --- UPDATED: Display price in Rupees --- */}
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(finalPrice)}</p>
                    {discount > 0 && <p className="text-sm text-gray-500 line-through ml-2">{formatCurrency(price)}</p>}
                </div>
                <div className="mb-4">
                    <StarRating rating={rating} />
                </div>
                <a
                    href={amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full text-center bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors duration-300"
                >
                    View on Amazon
                </a>
            </div>
        </div>
    );
};

export default ProductCard;