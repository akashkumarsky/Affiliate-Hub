import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
    // State for the form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Get the login function from our AuthContext
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        const success = await login(username, password);

        if (!success) {
            setError('Invalid username or password. Please try again.');
        }
        // If login is successful, the App component will automatically redirect.
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
                    <p className="text-gray-500">Please sign in to access the dashboard.</p>
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-800 bg-red-100 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center items-center px-4 py-2 font-bold text-gray-900 bg-yellow-500 rounded-md hover:bg-yellow-600 transition-colors duration-300"
                        >
                            <LogIn size={20} className="mr-2" />
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;