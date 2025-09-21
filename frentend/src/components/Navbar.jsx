import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Tag, Shield, Home, LogOut, Menu, X } from 'lucide-react';

const Navbar = ({ onNavigate }) => {
    const { isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        onNavigate('home');
        setIsMenuOpen(false);
    };

    const handleNavClick = (page) => {
        onNavigate(page);
        setIsMenuOpen(false);
    }

    return (
        <nav className="bg-gray-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
                    <Tag className="text-yellow-400 mr-2" size={24} />
                    <h1 className="text-xl font-bold">Affiliate Hub</h1>
                </div>
                <div className="hidden md:flex items-center">
                    <button onClick={() => handleNavClick('home')} className="inline-flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                        <Home size={18} className="mr-2" /> Home
                    </button>
                    <button onClick={() => handleNavClick('admin')} className="inline-flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                        <Shield size={18} className="mr-2" /> Admin
                    </button>
                    {isAuthenticated && (
                        <button onClick={handleLogout} className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md ml-4">
                            <LogOut size={18} className="mr-2" /> Logout
                        </button>
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={() => handleNavClick('home')} className="w-full text-left inline-flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                            <Home size={18} className="mr-2" /> Home
                        </button>
                        <button onClick={() => handleNavClick('admin')} className="w-full text-left inline-flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                            <Shield size={18} className="mr-2" /> Admin
                        </button>
                        {isAuthenticated && (
                            <button onClick={handleLogout} className="w-full text-left inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md mt-2">
                                <LogOut size={18} className="mr-2" /> Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;