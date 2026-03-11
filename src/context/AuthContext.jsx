import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const MOCK_USER = {
    email: "test@test.com",
    password: "123456",
    name: "John Doe",
    role: "Site Engineer",
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = sessionStorage.getItem("fieldSync_user");
        return saved ? JSON.parse(saved) : null;
    });

    const login = (email, password) => {
        if (email === MOCK_USER.email && password === MOCK_USER.password) {
            const userData = {
                email: MOCK_USER.email,
                name: MOCK_USER.name,
                role: MOCK_USER.role,
            };
            setUser(userData);
            sessionStorage.setItem("fieldSync_user", JSON.stringify(userData));
            return { success: true };
        }
        return { success: false, error: "Invalid email or password" };
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("fieldSync_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
