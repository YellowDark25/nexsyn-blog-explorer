
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AdminSession {
  username: string;
  expiresAt: number;
  sessionId: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  username: string | null;
  sessionId: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    
    if (adminSession) {
      try {
        const session: AdminSession = JSON.parse(adminSession);
        const currentTime = new Date().getTime();
        
        if (session.expiresAt > currentTime) {
          setIsAuthenticated(true);
          setUsername(session.username);
          setSessionId(session.sessionId);
        } else {
          // Expired session
          localStorage.removeItem('adminSession');
        }
      } catch (e) {
        console.error('Error parsing admin session:', e);
        localStorage.removeItem('adminSession');
      }
    }
  }, []);

  // Function to generate a unique session ID using timestamp and random string
  const generateSessionId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    // Hardcoded credentials for now
    if (username === 'kleverson' && password === 'nexsyn@2023') {
      const newSessionId = generateSessionId();
      const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
      
      const session: AdminSession = {
        username,
        expiresAt,
        sessionId: newSessionId
      };
      
      localStorage.setItem('adminSession', JSON.stringify(session));
      
      setIsAuthenticated(true);
      setUsername(username);
      setSessionId(newSessionId);
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminSession');
    setIsAuthenticated(false);
    setUsername(null);
    setSessionId(null);
  };

  const contextValue: AdminContextType = {
    isAuthenticated,
    username,
    sessionId,
    login,
    logout
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  
  return context;
};
