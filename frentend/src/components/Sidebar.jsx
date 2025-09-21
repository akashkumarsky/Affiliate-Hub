import React from 'react';
import { X } from 'lucide-react';

const Sidebar = ({ categories = [], selectedCategory, onSelectCategory, isOpen, onClose }) => {
    return (
        <>
            <aside className={`w-64 bg-white p-6 shadow-lg fixed h-full pt-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
                <div className="flex justify-between items-center md:hidden mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Categories</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4 hidden md:block">Categories</h2>
                <ul>
                    <li
                        onClick={() => { onSelectCategory(null); onClose(); }}
                        className={`cursor-pointer p-2 rounded-md mb-2 ${!selectedCategory ? 'bg-yellow-400 text-gray-900 font-bold' : 'hover:bg-gray-100'}`}
                    >
                        All Products
                    </li>
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            onClick={() => { onSelectCategory(category.name); onClose(); }}
                            className={`cursor-pointer p-2 rounded-md mb-2 ${selectedCategory === category.name ? 'bg-yellow-400 text-gray-900 font-bold' : 'hover:bg-gray-100'}`}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden z-30" onClick={onClose}></div>}
        </>
    );
};

export default Sidebar;