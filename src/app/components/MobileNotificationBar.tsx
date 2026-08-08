import React from 'react';
import { Button } from './ui/button';
import {
  Compass,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileNotificationBarProps {
  showNotification?: boolean;
  onDismissNotification?: () => void;
  onViewNotification?: () => void;
}

export function MobileNotificationBar({ 
  showNotification = true, 
  onDismissNotification,
  onViewNotification 
}: MobileNotificationBarProps) {
  const [isVisible, setIsVisible] = React.useState(showNotification);
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Update visibility when prop changes
  React.useEffect(() => {
    setIsVisible(showNotification);
  }, [showNotification]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismissNotification?.();
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      {/* Android-style Notification */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.98 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 30,
              duration: 0.3 
            }}
            className="mx-4 mt-3 mb-2"
          >
            <div className="bg-gradient-to-r from-sky-100 via-blue-50 to-white dark:from-sky-950/40 dark:via-blue-950/40 dark:to-gray-900/40 rounded-2xl shadow-lg border border-sky-200/50 dark:border-sky-800/30 backdrop-blur-sm">
              {/* Main notification content */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* App Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Compass className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* App name and time */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white text-sm">
                          Voyager
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          now
                        </span>
                      </div>
                    </div>

                    {/* Notification text */}
                    <div className="mb-2">
                      <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                        Your trip to Kerala starts tomorrow at 8:00 AM
                      </p>
                      
                      {/* Expanded content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 pt-2 border-t border-sky-200/50 dark:border-sky-800/30"
                          >
                            <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                              Don't forget to pack your essentials and check the weather forecast. 
                              Have your booking confirmations ready for a smooth journey to God's Own Country!
                            </p>
                            <div className="mt-2 flex gap-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300">
                                📍 Kochi Airport
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                ✈️ 6 days
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Right side icons */}
                  <div className="flex items-start gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleExpand}
                      className="h-7 w-7 p-0 text-gray-500 hover:text-gray-700 hover:bg-sky-100/50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-sky-900/30 rounded-full"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDismiss}
                      className="h-7 w-7 p-0 text-gray-500 hover:text-gray-700 hover:bg-sky-100/50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-sky-900/30 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action buttons - only show when expanded */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 pt-3 border-t border-sky-200/50 dark:border-sky-800/30"
                    >
                      <div className="flex gap-3">
                        <Button
                          onClick={onViewNotification}
                          size="sm"
                          className="bg-sky-600 hover:bg-sky-700 text-white text-xs px-4 py-2 h-8 rounded-full shadow-sm"
                        >
                          View Trip
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-sky-700 border-sky-300 hover:bg-sky-50 dark:text-sky-300 dark:border-sky-700 dark:hover:bg-sky-900/20 text-xs px-4 py-2 h-8 rounded-full"
                        >
                          Remind Later
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Subtle bottom accent line */}
              <div className="h-0.5 bg-gradient-to-r from-sky-300 via-blue-400 to-sky-300 opacity-30 rounded-b-2xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}