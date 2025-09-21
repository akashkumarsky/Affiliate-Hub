import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { Tag, Shield, Home, LogOut } from 'lucide-react';

const Navbar = ({ onNavigate }) => {
    const { isAuthenticated, logout } = useAuth(); // Get auth status and logout function

    const handleLogout = () => {
        logout();
        onNavigate('home'); // Redirect to home after logout
    };

    return (
        <nav className="bg-gray-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
                    <Tag className="text-yellow-400 mr-2" size={24} />
                    <h1 className="text-xl font-bold">Affiliate Hub</h1>
                </div>
                <div>
                    <button onClick={() => onNavigate('home')} className="inline-flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                        <Home size={18} className="mr-2" /> Home
                    </button>
                    <button onClick={() => onNavigate('admin')} className="inline-flex items-center px-4 py-2 hover:bg-gray-700 rounded-md">
                        <Shield size={18} className="mr-2" /> Admin
                    </button>
                    {/* --- NEW: Conditionally render Logout button --- */}
                    {isAuthenticated && (
                        <button onClick={handleLogout} className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md ml-4">
                            <LogOut size={18} className="mr-2" /> Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;