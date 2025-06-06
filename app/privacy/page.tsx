'use client'

import React from 'react';
import { useTheme } from '../theme/theme.context';
import { colors } from '../theme/colors';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8"
      style={{
        background: `linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-middle) 50%, var(--gradient-end) 100%)`
      }}>
      <div className="w-full max-w-4xl backdrop-blur-2xl rounded-[28px] p-6 md:p-8 space-y-6"
        style={{
          background: themeColors.background,
          borderColor: themeColors.cardBorder,
          borderWidth: '1px',
          boxShadow: themeColors.shadow.card
        }}>
        {/* Back button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 mb-4"
          style={{
            background: themeColors.accent.primary + '20',
            border: `1px solid ${themeColors.accent.primary}40`,
            color: themeColors.accent.primary
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Home
        </Link>
        
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold mb-6"
            style={{ color: themeColors.text.primary }}>
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base leading-relaxed mb-4"
            style={{ color: themeColors.text.secondary }}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {sections.map((section, index) => (
          <section key={index} className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold"
              style={{ color: themeColors.text.primary }}>
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-sm md:text-base leading-relaxed"
                  style={{ color: themeColors.text.secondary }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}

        <footer className="pt-8 text-sm text-center"
          style={{ color: themeColors.text.tertiary }}>
          For any questions about this Privacy Policy, please contact us at kevinjacob2001@gmail.com
        </footer>
      </div>
    </div>
  );
}

const sections = [
  {
    title: "Introduction",
    content: [
      "Welcome to Posquix.ai. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your data when you use our posture detection service.",
      "By using Posquix.ai, you agree to the collection and use of information in accordance with this policy."
    ]
  },
  {
    title: "Camera Usage and Data Processing",
    content: [
      "Posquix.ai uses your device's camera to provide real-time posture analysis. All camera processing is done entirely in your browser using TensorFlow.js.",
      "We do not store, transmit, or record any video data from your camera. The video stream is processed in real-time and immediately discarded.",
      "No images or video recordings are ever sent to our servers or stored anywhere."
    ]
  },
  {
    title: "Data Collection and Usage",
    content: [
      "We collect minimal technical data necessary for the service to function, including:",
      "• Browser type and version\n• Device type and screen resolution\n• Operating system information",
      "This information helps us optimize the application's performance and improve user experience.",
      "We do not collect or store any personal identification information."
    ]
  },
  {
    title: "Local Storage",
    content: [
      "We use local storage on your device to save your preferences (such as dark/light mode settings).",
      "This data never leaves your device and is not shared with us or any third parties."
    ]
  },
  {
    title: "Third-Party Services",
    content: [
      "We use TensorFlow.js for posture detection processing. This runs entirely in your browser.",
      "We do not share any data with third parties, and no third-party services have access to your camera feed."
    ]
  },
  {
    title: "Data Security",
    content: [
      "Since all processing happens locally in your browser and we don't store any personal data, your privacy is inherently protected.",
      "We implement appropriate technical measures to prevent unauthorized access to any temporary data during processing."
    ]
  },
  {
    title: "Children's Privacy",
    content: [
      "Posquix.ai is not intended for children under 13 years of age.",
      "We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us."
    ]
  },
  {
    title: "Changes to This Privacy Policy",
    content: [
      "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
      "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page."
    ]
  },
  {
    title: "Your Rights",
    content: [
      "You have the right to:",
      "• Access your data\n• Request deletion of your data\n• Object to our processing of your data\n• Request restrictions on processing",
      "Since we don't store personal data, these rights primarily apply to any technical data that might be temporarily stored during your session."
    ]
  }
]; 