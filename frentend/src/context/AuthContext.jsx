import React, { createContext, useState, useContext } from 'react';

// Create the context object
const AuthContext = createContext(null);

// Create the Provider component. It will wrap our entire app.
export const AuthProvider = ({ children }) => {
    // State to hold whether the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // The login function. We will build the API call logic here.
    // The login function - cleaner, more reliable, and follows best practices.
    const login = async (username, password) => {
        const credentials = btoa(`${username}:${password}`);

        try {
            // We now call our new, dedicated authentication endpoint.
            // It's a GET request, so no request body is needed!
            const response = await fetch('http://localhost:8081/api/user/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${credentials}`
                }
            });

            // If the response is OK (status 200), the credentials are valid.
            if (response.ok) {
                setIsAuthenticated(true);
                localStorage.setItem('authCredentials', credentials);
                return true; // Indicate login success
            }

            // If the response is not ok, the login failed.
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

    // The value provided to all children components
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