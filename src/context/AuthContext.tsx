import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem('ev_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: any) => {
    // Simulate API call
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('ev_user');
    
    if (storedUser) {
      // Existing user
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      // New user
      const newUser: User = {
        id: Date.now().toString(),
        phone: credentials.phoneOrEmail.includes('@') ? undefined : credentials.phoneOrEmail,
        email: credentials.phoneOrEmail.includes('@') ? credentials.phoneOrEmail : undefined,
        isNewUser: true,
      };
      setUser(newUser);
      localStorage.setItem('ev_user', JSON.stringify(newUser));
    }
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ev_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data, isNewUser: false };
    setUser(updatedUser);
    localStorage.setItem('ev_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
