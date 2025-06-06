"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { createContext, useContext, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Theme context
const ThemeContext = createContext<{theme: 'light'|'dark', toggle: () => void}>({theme: 'dark', toggle: () => {}});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light'|'dark'>("dark");
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <html lang="en" data-theme={theme}>
      <body
        className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          color: 'var(--text-primary)',
          background: 'var(--background)',
          transition: 'background 0.3s ease, color 0.3s ease'
        }}
      >
        <ThemeContext.Provider value={{theme, toggle}}>
          {/* Theme toggle button */}
          <button
            onClick={toggle}
            className="fixed top-6 right-6 z-50 rounded-full p-2 transition-all duration-300 flex items-center justify-center hover:scale-110"
            style={{
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              border: `2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
              boxShadow: 'var(--shadow)'
            }}
            aria-label="Toggle color mode"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: 'rgb(250, 204, 21)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m15.364-6.364l-1.06 1.06M6.343 17.657l-1.06 1.06m12.02 0l-1.06-1.06M6.343 6.343l-1.06-1.06M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: 'rgb(59, 130, 246)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.005 2.364-7.453 5.778-9.01a.75.75 0 01.976.937 7.501 7.501 0 0010.03 9.01.75.75 0 01.718 1.065z" />
              </svg>
            )}
          </button>
          {children}
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
