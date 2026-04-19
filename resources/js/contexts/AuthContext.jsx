import { createContext, useEffect, useState } from 'react';
import { login, logout, me, register } from '../services/authService';
import { getUserRole } from '../utils/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isBootstrapping, setIsBootstrapping] = useState(true);

    useEffect(() => {
        async function bootstrapAuth() {
            try {
                await refreshUser();
            } catch (error) {
                // Biarkan state user tetap null saat belum login.
            } finally {
                setIsBootstrapping(false);
            }
        }

        bootstrapAuth();
    }, []);

    async function refreshUser() {
        try {
            const response = await me();
            setUser(response.user);
            return response.user;
        } catch (error) {
            setUser(null);
            throw error;
        }
    }

    async function signIn(credentials) {
        const response = await login(credentials);
        setUser(response.user);
        return response;
    }

    async function signUp(payload) {
        const response = await register(payload);
        setUser(response.user);
        return response;
    }

    async function signOut() {
        await logout();
        setUser(null);
    }

    const role = getUserRole(user);

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                isAdmin: role === 'admin',
                isUser: role === 'user',
                isAuthenticated: Boolean(user),
                isBootstrapping,
                refreshUser,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
