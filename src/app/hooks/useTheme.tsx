import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('voyager-theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply simple theme colors that match the original design
    if (theme === 'light') {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--card', '#ffffff');
      root.style.setProperty('--card-foreground', '#0f172a');
      root.style.setProperty('--primary', '#059669');
      root.style.setProperty('--primary-foreground', '#ffffff');
      root.style.setProperty('--accent-custom', '#0ea5e9');
      root.style.setProperty('--muted', '#f1f5f9');
      root.style.setProperty('--muted-foreground', '#64748b');
    } else {
      root.style.setProperty('--background', '#0f172a');
      root.style.setProperty('--card', '#1e293b');
      root.style.setProperty('--card-foreground', '#f8fafc');
      root.style.setProperty('--primary', '#10b981');
      root.style.setProperty('--primary-foreground', '#ffffff');
      root.style.setProperty('--accent-custom', '#38bdf8');
      root.style.setProperty('--muted', '#334155');
      root.style.setProperty('--muted-foreground', '#94a3b8');
    }

    // Save to localStorage
    localStorage.setItem('voyager-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}