import React from 'react';
import Webcam from 'react-webcam';
import StatusBar from './StatusBar';
import PostureInsights from './PostureInsights';
import { useTheme } from '../theme/theme.context';
import { colors } from '../theme/colors';

export default function MainCard({
  isGoodPosture,
  postureStatus,
  insights,
  webcamRef,
  canvasRef,
}: {
  isGoodPosture: boolean,
  postureStatus: string,
  insights: {msg: string, good: boolean}[],
  webcamRef: React.RefObject<Webcam | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
}) {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;
  
  return (
    <div className="backdrop-blur-2xl rounded-[28px] md:rounded-[28px] rounded-[16px] shadow-2xl flex flex-col items-center w-full max-w-lg relative transition-all duration-500 mx-4 md:mx-0 min-h-[560px] md:h-[660px] p-5 md:p-7"
      style={{
        background: themeColors.background,
        borderColor: themeColors.cardBorder,
        borderWidth: '1px',
        boxShadow: themeColors.shadow.card
      }}>
      <div className="flex flex-col items-center w-full h-full gap-5 md:gap-6">
        {/* Status section */}
        <div className="w-full space-y-3 md:space-y-3">
          <StatusBar isGoodPosture={isGoodPosture} postureStatus={postureStatus} />
          <PostureInsights insights={insights} />
        </div>
        
        {/* Main content */}
        <div className="text-center space-y-3 md:space-y-4">
          <div className="space-y-1">
            <h6 className="text-base md:text-lg font-extrabold tracking-tight transition-all duration-500 leading-none mb-2"
              style={{ 
                color: themeColors.text.primary,
                letterSpacing: '-0.03em',
                textShadow: themeColors.shadow.text
              }}>
              Posquix.ai
            </h6>
            <div className="w-12 md:w-16 h-0.5 md:h-1 mx-auto rounded-full transition-all duration-500"
              style={{
                background: themeColors.accent.soft
              }}
            />
          </div>
          <p className="text-xs md:text-sm max-w-[280px] md:max-w-md font-medium leading-relaxed transition-all duration-500 text-shimmer px-2 md:px-0"
            style={{ 
              color: themeColors.text.secondary,
              textShadow: themeColors.shadow.text
            }}>
            Experience real-time AI-powered posture analysis. Maintain perfect alignment by keeping your ears level with your shoulders.
          </p>
        </div>

        {/* Webcam container */}
        <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            borderColor: themeColors.cardBorder,
            borderWidth: '1px',
            background: theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)',
            boxShadow: themeColors.shadow.element
          }}>
          <Webcam
            ref={webcamRef}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            style={{ borderRadius: "inherit" }}
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
            style={{ borderRadius: "inherit" }}
          />
        </div>

        {/* Footer */}
        <div className="text-xs md:text-sm font-medium transition-all duration-500 flex flex-col items-center gap-2"
          style={{ 
            color: themeColors.text.tertiary
          }}>
          <span>Created by Kevin Jacob</span>
          <a 
            href="/privacy" 
            className="hover:underline transition-all duration-300"
            style={{ 
              color: themeColors.text.tertiary,
              opacity: 0.8
            }}>
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
} 