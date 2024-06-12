'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  colorMode: string;
  setColorMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorMode, setColorMode] = useState<string>('light');

  useEffect(() => {
    const savedColorMode = localStorage.getItem('colorMode') || 'light';
    setColorMode(savedColorMode);
    document.documentElement.classList.add(savedColorMode);
  }, []);

  const toggleColorMode = (mode: string) => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
    localStorage.setItem('colorMode', mode);
    setColorMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode: toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
