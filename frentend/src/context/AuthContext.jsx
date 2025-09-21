import React, { createContext, useState, useContext } from 'react';

// Create the context object
const AuthContext = createContext(null);

// Create the Provider component. It will wrap our entire app.
export const AuthProvider = ({ children }) => {
    // State to hold whether the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // The login function - cleaner, more reliable, and follows best practices.
    const login = async (username, password) => {
        const credentials = btoa(`${username}:${password}`);

        try {
            // Call our dedicated authentication endpoint
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/user/me`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Basic ${credentials}`
                    }
                }
            );

            if (response.ok) {
                setIsAuthenticated(true);
                localStorage.setItem('authCredentials', credentials);
                return true; // Indicate login success
            }

            setIsAuthenticated(false);
            return false; // Indicate login failure

        } catch (error) {
            console.error("Login attempt failed with an error:", error);
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('authCredentials');
    };

    const value = { isAuthenticated, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to easily use the auth context in other components
export const useAuth = () => {
    return useContext(AuthContext);
};
