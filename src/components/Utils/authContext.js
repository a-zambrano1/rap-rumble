import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const idMember = localStorage.getItem('idMember');
        if (idMember) {
            setUser(idMember);
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}