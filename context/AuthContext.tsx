"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: any;
    token: string | null;
    login: (userData: any, token: string, needsOnboarding?: boolean) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false,
    isLoading: true,
});

const setCookie = (name: string, value: string, days = 7) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken) {
            setToken(storedToken);
            setCookie("token", storedToken);
        }
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setCookie("needsOnboarding", String(parsed?.needsOnboarding ?? false));
        }
        setIsLoading(false);
    }, []);

    const login = (userData: any, authToken: string, needsOnboarding?: boolean) => {
        const onboarding = needsOnboarding ?? userData?.needsOnboarding ?? false;
        const userWithOnboarding = { ...userData, needsOnboarding: onboarding };
        setUser(userWithOnboarding);
        setToken(authToken);
        localStorage.setItem("token", authToken);
        localStorage.setItem("user", JSON.stringify(userWithOnboarding));
        setCookie("token", authToken);
        setCookie("needsOnboarding", String(onboarding));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        deleteCookie("token");
        deleteCookie("needsOnboarding");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
