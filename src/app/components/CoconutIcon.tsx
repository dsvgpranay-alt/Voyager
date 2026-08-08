import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CoconutIconProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const CoconutIcon = React.forwardRef<HTMLButtonElement, CoconutIconProps>(
  ({ isOpen, onClick, className = "" }, ref) => {
  const handleClick = () => {
    // Add subtle haptic feedback simulation
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50);
    }
    onClick();
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={`relative w-10 h-10 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded-full transition-all duration-200 hover:shadow-lg ${className}`}
      aria-label={isOpen ? "Close utilities menu" : "Open utilities menu"}
      title={isOpen ? "Close utilities menu" : "Open utilities menu"}
    >
      <div className="relative w-full h-full">
        {/* Coconut Background Circle */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full shadow-lg"
          animate={{
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
        />
        
        {/* Top Half of Coconut */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-amber-700 to-amber-800 rounded-t-full overflow-hidden"
          style={{ 
            transformOrigin: "center bottom",
            zIndex: 2
          }}
          animate={{
            rotateZ: isOpen ? -18 : 0,
            y: isOpen ? -2 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            duration: 0.6
          }}
        >
          {/* Coconut Fiber Texture */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1 left-1 w-0.5 h-2 bg-amber-600 rounded-full transform rotate-12" />
            <div className="absolute top-1 right-2 w-0.5 h-1.5 bg-amber-600 rounded-full transform -rotate-45" />
            <div className="absolute top-2 left-3 w-0.5 h-1 bg-amber-600 rounded-full transform rotate-45" />
          </div>
        </motion.div>
        
        {/* Bottom Half of Coconut */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-tr from-amber-800 to-amber-700 rounded-b-full overflow-hidden"
          style={{ 
            transformOrigin: "center top",
            zIndex: 1
          }}
          animate={{
            rotateZ: isOpen ? 15 : 0,
            y: isOpen ? 2 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            duration: 0.6
          }}
        >
          {/* Coconut Fiber Texture */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute bottom-1 left-2 w-0.5 h-2 bg-amber-900 rounded-full transform -rotate-12" />
            <div className="absolute bottom-1 right-1 w-0.5 h-1.5 bg-amber-900 rounded-full transform rotate-45" />
            <div className="absolute bottom-2 left-4 w-0.5 h-1 bg-amber-900 rounded-full transform -rotate-45" />
          </div>
        </motion.div>
        
        {/* Crack Line */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-0.5 bg-amber-950 transform -translate-y-1/2"
          style={{ zIndex: 3 }}
          animate={{
            scaleX: isOpen ? 1.2 : 0.8,
            opacity: isOpen ? 1 : 0.3,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
        />
        
        {/* Inner Coconut Meat (visible when cracked) */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-6 h-3 bg-gradient-to-b from-slate-50 to-slate-100 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-inner"
          style={{ zIndex: 1 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            delay: isOpen ? 0.2 : 0
          }}
        />
        
        {/* Coconut Water Droplets */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-200 rounded-full transform -translate-x-1/2"
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  y: [0, 8, 16], 
                  scale: [0, 1, 0.5],
                  x: [-2, -3, -4]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: "easeOut"
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-blue-300 rounded-full transform translate-x-1"
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  y: [0, 6, 12], 
                  scale: [0, 1, 0.3],
                  x: [2, 3, 4]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: "easeOut"
                }}
              />
            </>
          )}
        </AnimatePresence>
        
        {/* Crack Sound Wave Effect */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-amber-300/40"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ 
                scale: [1, 1.5, 2],
                opacity: [0.8, 0.4, 0]
              }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
            />
          )}
        </AnimatePresence>
        
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full"
          animate={{
            opacity: isOpen ? 0.8 : 0,
            scale: isOpen ? 1.3 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
        />
      </div>
      
      {/* Hover Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-amber-400/50"
        animate={{
          scale: isOpen ? 1.2 : 1,
          opacity: isOpen ? 1 : 0,
        }}
        whileHover={{
          scale: 1.1,
          opacity: 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      />
    </button>
  );
});

CoconutIcon.displayName = 'CoconutIcon';