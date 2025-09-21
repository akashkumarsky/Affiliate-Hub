import React from 'react';
import { Star } from 'lucide-react';

// This component takes a numerical rating and displays it as stars.
const StarRating = ({ rating = 0 }) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);

    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => (
                <Star
                    key={index}
                    size={16}
                    className={`
                        ${index < filledStars ? "text-yellow-400 fill-current" : "text-gray-300"}
                    `}
                />
            ))}
            <span className="ml-2 text-sm text-gray-500">{rating.toFixed(1)}</span>
        </div>
    );
};

export default StarRating;