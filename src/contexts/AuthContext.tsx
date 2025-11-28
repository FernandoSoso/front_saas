import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Usuario } from '../models/usuario.model'; // Assuming Usuario model is UsuarioResponseDTO
import { useServices } from '../hooks/useServices';
import { UsuarioLoginDTO } from '../models/usuario-login.model';

interface AuthContextType {
  user: Usuario | null;
  isAuthenticated: boolean;
  login: (credentials: UsuarioLoginDTO) => Promise<void>;
  logout: () => void;
  loading: boolean;
  empresaUuid: string | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const { usuarioService } = useServices();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: UsuarioLoginDTO) => {
    setLoading(true);
    try {
      const response = await usuarioService.fazerLogin(credentials);
      const loggedInUser = response.data;
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to allow component to handle error
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;
  const empresaUuid = user?.empresa?.uuid;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading, empresaUuid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
