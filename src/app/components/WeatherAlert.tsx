import React from 'react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { 
  AlertTriangle, 
  CloudRain, 
  Sun, 
  CloudSnow, 
  Zap, 
  Wind, 
  Thermometer,
  Waves,
  Mountain,
  Shield,
  X,
  ExternalLink,
  Phone,
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './ui/utils';

export type WeatherAlertSeverity = 'info' | 'warning' | 'critical' | 'emergency';
export type WeatherAlertType = 
  | 'heavy-rain' 
  | 'thunderstorm' 
  | 'heatwave' 
  | 'flooding' 
  | 'cyclone' 
  | 'landslide' 
  | 'strong-winds' 
  | 'fog' 
  | 'coastal-warning';

export interface WeatherAlertData {
  id: string;
  type: WeatherAlertType;
  severity: WeatherAlertSeverity;
  title: string;
  message: string;
  location: string;
  validUntil: Date;
  actionAdvice: string[];
  emergencyContacts?: {
    police: string;
    medical: string;
    touristHelpline: string;
  };
  affectedAreas?: string[];
  isActive: boolean;
}

interface WeatherAlertProps {
  alert: WeatherAlertData;
  onDismiss?: (alertId: string) => void;
  onViewDetails?: (alertId: string) => void;
  className?: string;
  compact?: boolean;
}

const alertIcons = {
  'heavy-rain': CloudRain,
  'thunderstorm': Zap,
  'heatwave': Sun,
  'flooding': Waves,
  'cyclone': Wind,
  'landslide': Mountain,
  'strong-winds': Wind,
  'fog': CloudSnow,
  'coastal-warning': Waves
};

const severityConfig = {
  info: {
    bgClass: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
    iconClass: 'text-blue-600 dark:text-blue-400',
    titleClass: 'text-blue-900 dark:text-blue-100',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200',
    accentClass: 'bg-blue-500'
  },
  warning: {
    bgClass: 'bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800',
    iconClass: 'text-amber-600 dark:text-amber-400',
    titleClass: 'text-amber-900 dark:text-amber-100',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-200',
    accentClass: 'bg-amber-500'
  },
  critical: {
    bgClass: 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800',
    iconClass: 'text-red-600 dark:text-red-400',
    titleClass: 'text-red-900 dark:text-red-100',
    badgeClass: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200',
    accentClass: 'bg-red-500'
  },
  emergency: {
    bgClass: 'bg-red-100 border-red-300 dark:bg-red-900 dark:border-red-700',
    iconClass: 'text-red-700 dark:text-red-300',
    titleClass: 'text-red-900 dark:text-red-100',
    badgeClass: 'bg-red-200 text-red-900 border-red-400 dark:bg-red-800 dark:text-red-100',
    accentClass: 'bg-red-600'
  }
};

export const WeatherAlert = React.forwardRef<HTMLDivElement, WeatherAlertProps>(function WeatherAlert({
  alert,
  onDismiss,
  onViewDetails,
  className,
  compact = false
}, ref) {
  const IconComponent = alertIcons[alert.type];
  const config = severityConfig[alert.severity];
  const [isExpanded, setIsExpanded] = React.useState(!compact);

  const formatTimeUntil = (date: Date) => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Expires soon';
    if (diffHours === 1) return '1 hour remaining';
    if (diffHours < 24) return `${diffHours} hours remaining`;
    
    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} remaining`;
  };

  const getSeverityLabel = (severity: WeatherAlertSeverity) => {
    switch (severity) {
      case 'info': return 'Advisory';
      case 'warning': return 'Warning';
      case 'critical': return 'Critical Alert';
      case 'emergency': return 'Emergency';
      default: return 'Alert';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      ref={ref}
      className={cn("relative", className)}
    >
      <Alert className={cn(
        "border-2 shadow-lg relative overflow-hidden",
        config.bgClass,
        alert.severity === 'emergency' && "animate-pulse"
      )}>
        {/* Accent bar */}
        <div className={cn("absolute left-0 top-0 w-1 h-full", config.accentClass)} />
        
        <div className="flex items-start justify-between gap-4 ml-3">
          <div className="flex items-start gap-3 flex-1">
            {/* Icon */}
            <div className={cn(
              "p-2 rounded-full",
              alert.severity === 'emergency' ? 'bg-red-200 dark:bg-red-800' : 'bg-white/80 dark:bg-gray-800/80'
            )}>
              <IconComponent className={cn("h-6 w-6", config.iconClass)} />
            </div>

            <div className="flex-1 space-y-2">
              {/* Header */}
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className={cn("font-bold text-lg", config.titleClass)}>
                  {alert.title}
                </h3>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs font-medium", config.badgeClass)}
                >
                  {getSeverityLabel(alert.severity)}
                </Badge>
              </div>

              {/* Location and Time */}
              <div className="flex items-center gap-4 text-sm opacity-80">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{alert.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeUntil(alert.validUntil)}</span>
                </div>
              </div>

              {/* Message */}
              <AlertDescription className={cn(
                "text-sm leading-relaxed", 
                config.titleClass,
                "opacity-90"
              )}>
                {alert.message}
              </AlertDescription>

              {/* Expandable content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 pt-2"
                  >
                    {/* Safety Actions */}
                    {alert.actionAdvice.length > 0 && (
                      <div className="space-y-2">
                        <h4 className={cn("font-semibold text-sm flex items-center gap-2", config.titleClass)}>
                          <Shield className="h-4 w-4" />
                          Safety Actions
                        </h4>
                        <ul className="space-y-1">
                          {alert.actionAdvice.map((advice, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm opacity-90">
                              <CheckCircle2 className="h-3 w-3 mt-0.5 flex-shrink-0 text-green-600" />
                              <span>{advice}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Affected Areas */}
                    {alert.affectedAreas && alert.affectedAreas.length > 0 && (
                      <div className="space-y-2">
                        <h4 className={cn("font-semibold text-sm", config.titleClass)}>
                          Affected Areas
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {alert.affectedAreas.map((area, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Emergency Contacts */}
                    {alert.emergencyContacts && (
                      <div className="space-y-2">
                        <h4 className={cn("font-semibold text-sm flex items-center gap-2", config.titleClass)}>
                          <Phone className="h-4 w-4" />
                          Emergency Contacts
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div className="flex items-center gap-2 p-2 bg-white/60 dark:bg-gray-800/60 rounded">
                            <span className="font-medium">Police:</span>
                            <a href={`tel:${alert.emergencyContacts.police}`} className="text-blue-600 hover:underline">
                              {alert.emergencyContacts.police}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-white/60 dark:bg-gray-800/60 rounded">
                            <span className="font-medium">Medical:</span>
                            <a href={`tel:${alert.emergencyContacts.medical}`} className="text-blue-600 hover:underline">
                              {alert.emergencyContacts.medical}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-white/60 dark:bg-gray-800/60 rounded">
                            <span className="font-medium">Tourism:</span>
                            <a href={`tel:${alert.emergencyContacts.touristHelpline}`} className="text-blue-600 hover:underline">
                              {alert.emergencyContacts.touristHelpline}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      {onViewDetails && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewDetails(alert.id)}
                          className="text-xs"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          More Details
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle button for compact mode */}
              {compact && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs px-2 py-1 h-auto"
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
              )}
            </div>
          </div>

          {/* Dismiss button */}
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDismiss(alert.id)}
              className="h-8 w-8 p-0 opacity-60 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Alert>
    </motion.div>
  );
});

// Container component for multiple alerts
interface WeatherAlertContainerProps {
  alerts: WeatherAlertData[];
  onDismiss?: (alertId: string) => void;
  onViewDetails?: (alertId: string) => void;
  maxVisible?: number;
  className?: string;
}

export function WeatherAlertContainer({ 
  alerts, 
  onDismiss, 
  onViewDetails, 
  maxVisible = 3,
  className 
}: WeatherAlertContainerProps) {
  const [dismissedAlerts, setDismissedAlerts] = React.useState<Set<string>>(new Set());
  
  const activeAlerts = alerts
    .filter(alert => alert.isActive && !dismissedAlerts.has(alert.id))
    .sort((a, b) => {
      // Sort by severity (emergency > critical > warning > info)
      const severityOrder = { emergency: 4, critical: 3, warning: 2, info: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    })
    .slice(0, maxVisible);

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
    onDismiss?.(alertId);
  };

  if (activeAlerts.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <AnimatePresence mode="popLayout">
        {activeAlerts.map((alert) => (
          <WeatherAlert
            key={alert.id}
            alert={alert}
            onDismiss={handleDismiss}
            onViewDetails={onViewDetails}
            compact={activeAlerts.length > 1}
          />
        ))}
      </AnimatePresence>
      
      {alerts.filter(a => a.isActive).length > maxVisible && (
        <Card className="border-dashed">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              +{alerts.filter(a => a.isActive).length - maxVisible} more alerts available
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Sample weather alerts for demonstration
export const sampleWeatherAlerts: WeatherAlertData[] = [
  {
    id: 'alert-001',
    type: 'thunderstorm',
    severity: 'critical',
    title: 'Severe Thunderstorm Warning',
    message: 'Severe thunderstorms with heavy rain and strong winds expected in Munnar region. Lightning activity poses significant danger to outdoor activities.',
    location: 'Munnar and surrounding hills',
    validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    actionAdvice: [
      'Stay indoors and avoid open areas',
      'Postpone trekking and outdoor activities',
      'Keep emergency supplies ready',
      'Avoid using electronic devices during lightning',
      'Stay away from tall trees and metal objects'
    ],
    emergencyContacts: {
      police: '100',
      medical: '108',
      touristHelpline: '0471-2321132'
    },
    affectedAreas: ['Munnar', 'Marayoor', 'Top Station', 'Mattupetty'],
    isActive: true
  },
  {
    id: 'alert-002',
    type: 'heatwave',
    severity: 'warning',
    title: 'Extreme Heat Advisory',
    message: 'Temperatures expected to reach 38°C in Thrissur. High risk of heat exhaustion and dehydration for tourists.',
    location: 'Thrissur and Central Kerala',
    validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    actionAdvice: [
      'Drink plenty of water regularly',
      'Wear light-colored, loose clothing',
      'Use sunscreen with high SPF',
      'Avoid outdoor activities during 11 AM - 4 PM',
      'Seek shade and air-conditioned spaces',
      'Watch for signs of heat exhaustion'
    ],
    affectedAreas: ['Thrissur', 'Palakkad', 'Malappuram'],
    isActive: true
  },
  {
    id: 'alert-003',
    type: 'flooding',
    severity: 'emergency',
    title: 'Flash Flood Emergency',
    message: 'Immediate evacuation required for low-lying areas in Alleppey. Water levels rising rapidly due to heavy upstream rainfall.',
    location: 'Alleppey Backwater Region',
    validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    actionAdvice: [
      'Evacuate to higher ground immediately',
      'Do not attempt to cross flooded roads',
      'Follow local authority instructions',
      'Keep emergency contacts handy',
      'Avoid houseboat activities',
      'Move to designated relief centers'
    ],
    emergencyContacts: {
      police: '100',
      medical: '108',
      touristHelpline: '0477-2253308'
    },
    affectedAreas: ['Alleppey Town', 'Kumarakom', 'Thottappally', 'Ambalappuzha'],
    isActive: true
  },
  {
    id: 'alert-004',
    type: 'coastal-warning',
    severity: 'warning',
    title: 'High Tide & Strong Currents',
    message: 'Dangerous sea conditions with high tides and strong undercurrents along Kovalam beaches. Swimming not recommended.',
    location: 'Kovalam and nearby beaches',
    validUntil: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    actionAdvice: [
      'Avoid swimming and water sports',
      'Stay away from rocky coastlines',
      'Follow lifeguard instructions',
      'Keep children under supervision',
      'Watch waves from safe distance only'
    ],
    affectedAreas: ['Kovalam', 'Lighthouse Beach', 'Hawa Beach', 'Samudra Beach'],
    isActive: true
  }
];