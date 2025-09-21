import React from 'react';

// The component now accepts three props from its parent (App.jsx)
const Sidebar = ({ categories = [], selectedCategory, onSelectCategory }) => {
    return (
        <aside className="w-64 bg-white p-6 shadow-lg fixed h-full pt-20">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Categories</h2>
            <ul>
                {/* --- "All Products" Button --- */}
                {/* It calls onSelectCategory with 'null' when clicked */}
                <li
                    onClick={() => onSelectCategory(null)}
                    className={`cursor-pointer p-2 rounded-md mb-2 ${!selectedCategory ? 'bg-yellow-400 text-gray-900 font-bold' : 'hover:bg-gray-100'
                        }`}
                >
                    All Products
                </li>

                {/* --- Category List --- */}
                {categories.map((category) => (
                    // It calls onSelectCategory with the category's name when clicked
                    <li
                        key={category.id}
                        onClick={() => onSelectCategory(category.name)}
                        className={`cursor-pointer p-2 rounded-md mb-2 ${selectedCategory === category.name
                                ? 'bg-yellow-400 text-gray-900 font-bold'
                                : 'hover:bg-gray-100'
                            }`}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;