"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Theme context
const ThemeContext = createContext<{theme: 'light'|'dark', toggle: () => void}>({theme: 'dark', toggle: () => {}});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light'|'dark'>("dark");
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme, toggle}}>
      {children}
    </ThemeContext.Provider>
  );
}