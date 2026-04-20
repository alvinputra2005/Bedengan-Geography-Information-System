import { createContext, useEffect, useState } from 'react';
import { login, logout, me, register } from '../services/authService';
import { getUserRole } from '../utils/auth';

export const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'bedengan.auth.user';

function readStoredUser() {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
        return rawValue ? JSON.parse(rawValue) : null;
    } catch (error) {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
    }
}

function writeStoredUser(user) {
    if (typeof window === 'undefined') {
        return;
    }

    if (!user) {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        return;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => readStoredUser());
    const [isBootstrapping, setIsBootstrapping] = useState(() => !readStoredUser());

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
            writeStoredUser(response.user);
            return response.user;
        } catch (error) {
            setUser(null);
            writeStoredUser(null);
            throw error;
        }
    }

    async function signIn(credentials) {
        const response = await login(credentials);
        setUser(response.user);
        writeStoredUser(response.user);
        return response;
    }

    async function signUp(payload) {
        const response = await register(payload);
        setUser(response.user);
        writeStoredUser(response.user);
        return response;
    }

    async function signOut() {
        try {
            await logout();
        } catch (error) {
            const status = error.response?.status;

            if (status !== 401 && status !== 419) {
                throw error;
            }
        } finally {
            setUser(null);
            writeStoredUser(null);
        }
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
