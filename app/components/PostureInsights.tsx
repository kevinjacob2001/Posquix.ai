import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../theme/theme.context';
import { colors } from '../theme/colors';

export default function PostureInsights({ insights }: { insights: {msg: string, good: boolean}[] }) {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;
  
  // Only take the most recent insight
  const latestInsight = insights[0];
  
  if (!latestInsight) return null;
  
  const statusColors = latestInsight.good ? themeColors.status.success : themeColors.status.warning;
  
  return (
    <div className="w-full px-1">
      <div
        className="flex items-center gap-3 py-3.5 px-4 rounded-xl transition-all duration-500 fadeInScale"
        style={{
          background: statusColors.bg,
          border: `1px solid ${statusColors.border}`,
          backdropFilter: 'blur(8px)',
        }}
      >
        {latestInsight.good ? (
          <CheckCircleIcon className="w-5 h-5 flex-shrink-0"
            style={{ color: statusColors.icon }} />
        ) : (
          <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0"
            style={{ color: statusColors.icon }} />
        )}
        <span 
          className="text-sm font-medium truncate"
          style={{ 
            color: statusColors.text,
            maxWidth: 'calc(100% - 28px)' 
          }}>
          {latestInsight.msg}
        </span>
      </div>
    </div>
  );
} 