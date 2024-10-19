import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Loader({
  size = 200,
  primaryColor = '#10b981',
  secondaryColor = '#34d399',
  duration = 1.5,
  pulseSize = 70,
  showText = true,
  customText = 'Loading',
  showProgress = true,
  progressDuration = 10
}) {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    if (showProgress) {
      const progressInterval = setInterval(() => {
        setProgress(prev => (prev < 100 ? prev + 1 : 0));
      }, progressDuration * 10);

      return () => clearInterval(progressInterval);
    }
  }, [showProgress, progressDuration]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50">
      <motion.div
        className="relative cursor-pointer"
        style={{ width: size, height: size }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width={size}
          height={size}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
          </defs>
          
          {/* Pulse effect */}
          <circle
            cx="50"
            cy="50"
            r={pulseSize / 2}
            fill="url(#gradient)"
            opacity="0.3"
            className="animate-ping"
          />

          {/* Stethoscope body */}
          <path
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            d="M50 15 A35 35 0 1 1 50 85 A35 35 0 1 1 50 15"
            className="animate-pulse"
            style={{ animationDuration: `${duration}s` }}
            filter="url(#glow)"
          />

          {/* Stethoscope tubing */}
          <path
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            d="M30 50 Q50 30 70 50"
            filter="url(#glow)"
          >
            <animate
              attributeName="d"
              values="M30 50 Q50 30 70 50; M30 50 Q50 70 70 50; M30 50 Q50 30 70 50"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </path>

          {/* Earpieces */}
          <circle
            cx="30"
            cy="50"
            r="6"
            fill={secondaryColor}
            filter="url(#glow)"
          >
            <animate
              attributeName="cy"
              values="50; 40; 50"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="70"
            cy="50"
            r="6"
            fill={secondaryColor}
            filter="url(#glow)"
          >
            <animate
              attributeName="cy"
              values="50; 60; 50"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </circle>

          {/* Heartbeat line */}
          <path
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2"
            strokeLinecap="round"
            d="M20 50 L30 50 L35 40 L40 60 L45 50 L80 50"
            className="opacity-0"
          >
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${duration * 1.5}s`}
              repeatCount="indefinite"
            />
          </path>

          {/* Progress circle */}
          {showProgress && (
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={secondaryColor}
              strokeWidth="4"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              transform="rotate(-90 50 50)"
            />
          )}
        </svg>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 flex items-center justify-center bg-emerald-800 bg-opacity-50 rounded-full"
            >
              <p className="text-white text-lg font-semibold">
                {showProgress ? `${progress}%` : 'Loading...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {showText && (
        <motion.div
          className="mt-4 text-xl font-semibold text-emerald-700"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {customText}{dots}
        </motion.div>
      )}
    </div>
  )
}

export default Loader