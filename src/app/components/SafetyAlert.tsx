import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Clock,
  X,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SafetyAlertProps {
  isVisible?: boolean;
  location: string;
  riskType: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timeInfo?: string;
  onViewRoutes?: () => void;
  onDismiss?: () => void;
}

export function SafetyAlert({
  isVisible = true,
  location,
  riskType,
  description,
  severity,
  timeInfo,
  onViewRoutes,
  onDismiss
}: SafetyAlertProps) {
  const [isDismissed, setIsDismissed] = React.useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const handleViewRoutes = () => {
    onViewRoutes?.();
  };

  const getSeverityConfig = (level: string) => {
    switch (level) {
      case 'high':
        return {
          bgColor: 'from-red-50 via-orange-50 to-amber-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-amber-950/20',
          borderColor: 'border-red-200 dark:border-red-800/30',
          iconColor: 'text-red-600 dark:text-red-400',
          iconBg: 'bg-red-100 dark:bg-red-900/30',
          badgeColor: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
          accentColor: 'from-red-400 via-orange-400 to-amber-400'
        };
      case 'medium':
        return {
          bgColor: 'from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20',
          borderColor: 'border-orange-200 dark:border-orange-800/30',
          iconColor: 'text-orange-600 dark:text-orange-400',
          iconBg: 'bg-orange-100 dark:bg-orange-900/30',
          badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
          accentColor: 'from-orange-400 via-amber-400 to-yellow-400'
        };
      default:
        return {
          bgColor: 'from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/20 dark:via-yellow-950/20 dark:to-orange-950/20',
          borderColor: 'border-amber-200 dark:border-amber-800/30',
          iconColor: 'text-amber-600 dark:text-amber-400',
          iconBg: 'bg-amber-100 dark:bg-amber-900/30',
          badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
          accentColor: 'from-amber-400 via-yellow-400 to-orange-400'
        };
    }
  };

  const config = getSeverityConfig(severity);

  if (isDismissed || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -40, scale: 0.95 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25,
          duration: 0.4 
        }}
        className="mx-4 mb-4"
      >
        <Card className={`relative overflow-hidden border-2 ${config.borderColor} shadow-lg bg-gradient-to-r ${config.bgColor} backdrop-blur-sm`}>
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(251,191,36,0.4)_1px,_transparent_0)] bg-[length:16px_16px]" />
          </div>
          
          <CardContent className="p-4 relative">
            <div className="flex items-start gap-3">
              {/* Warning Icon with subtle animation */}
              <motion.div 
                className="flex-shrink-0 mt-0.5"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className={`w-10 h-10 ${config.iconBg} rounded-full flex items-center justify-center shadow-sm border border-white/50`}>
                  <div className="relative">
                    <Shield className={`h-5 w-5 ${config.iconColor}`} />
                    <AlertTriangle className={`h-3 w-3 ${config.iconColor} absolute -top-0.5 -right-0.5`} />
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header with location and badge */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className={`h-4 w-4 ${config.iconColor} flex-shrink-0`} />
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                        {location} – {riskType}
                      </h4>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${config.badgeColor} text-xs font-medium border-0`}
                    >
                      <Info className="h-3 w-3 mr-1" />
                      Safety Advisory
                    </Badge>
                  </div>
                  
                  {/* Dismiss button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDismiss}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-white/50 rounded-full flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-2">
                    {description}
                  </p>
                  
                  {/* Time info if provided */}
                  {timeInfo && (
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{timeInfo}</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="flex items-center gap-3">
                  <Button 
                    onClick={handleViewRoutes}
                    size="sm"
                    className={`bg-gradient-to-r ${config.accentColor} hover:shadow-md text-white shadow-sm transition-all duration-200 rounded-full px-4 text-xs h-8 font-medium`}
                  >
                    <Shield className="h-3 w-3 mr-1.5" />
                    View Safe Routes
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                  
                  {/* Additional info */}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Updated 2 hours ago
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.accentColor} opacity-60 rounded-b-lg`} />
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

// Pre-configured safety alerts for common Kerala travel risks
export const keralaSafetyAlerts = {
  landslide: (location: string) => ({
    location,
    riskType: "Landslide-Prone Zone",
    description: "Heavy rains reported in the region. Exercise caution and avoid travel during late evening hours.",
    severity: "medium" as const,
    timeInfo: "Avoid travel after 6 PM"
  }),
  
  flooding: (location: string) => ({
    location,
    riskType: "Flood Alert",
    description: "Water levels rising due to continuous rainfall. Several low-lying areas are waterlogged.",
    severity: "high" as const,
    timeInfo: "Current conditions"
  }),
  
  roadwork: (location: string) => ({
    location,
    riskType: "Road Construction",
    description: "Major road maintenance in progress. Expect delays and consider alternative routes.",
    severity: "low" as const,
    timeInfo: "6 AM - 6 PM daily"
  }),
  
  wildlife: (location: string) => ({
    location,
    riskType: "Wildlife Crossing",
    description: "Elephant movement reported in the area. Drive carefully and maintain safe distance.",
    severity: "medium" as const,
    timeInfo: "Early morning & evening"
  }),
  
  weatherWarning: (location: string) => ({
    location,
    riskType: "Weather Advisory",
    description: "Strong winds and intermittent showers expected. Secure loose items and drive carefully.",
    severity: "low" as const,
    timeInfo: "Next 6 hours"
  })
};