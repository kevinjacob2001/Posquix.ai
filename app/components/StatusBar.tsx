import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useTheme } from '../theme/theme.context';
import { colors } from '../theme/colors';

export default function StatusBar({ isGoodPosture, postureStatus }: { isGoodPosture: boolean, postureStatus: string }) {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;
  const statusColors = isGoodPosture ? themeColors.status.success : themeColors.status.error;
  
  return (
    <div
      className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-2xl transition-all duration-500"
      style={{
        background: statusColors.bg,
        border: `1px solid ${statusColors.border}`,
        backdropFilter: 'blur(8px)',
        boxShadow: theme === 'light' ? '0 2px 10px rgba(0, 0, 0, 0.05)' : 'none'
      }}
    >
      {isGoodPosture ? (
        <CheckCircleIcon className="w-6 h-6 transition-transform duration-500" 
          style={{ color: statusColors.icon }} />
      ) : (
        <ExclamationCircleIcon className="w-6 h-6 transition-transform duration-500"
          style={{ color: statusColors.icon }} />
      )}
      <span 
        className="text-lg font-semibold tracking-tight"
        style={{ color: statusColors.text }}>
        {postureStatus}
      </span>
    </div>
  );
} 