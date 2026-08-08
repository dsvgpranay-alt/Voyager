import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  AlertTriangle, 
  CloudRain, 
  Sun, 
  Zap, 
  Wind, 
  Waves, 
  MapPin,
  Calendar,
  ArrowRight,
  Clock,
  Shield,
  RefreshCw,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, addDays } from 'date-fns';
import { cn } from './ui/utils';

export interface LocationWeatherAlert {
  location: string;
  type: 'storm' | 'heavy-rain' | 'heatwave' | 'flooding' | 'strong-winds' | 'cyclone';
  severity: 'warning' | 'critical' | 'emergency';
  message: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  validUntil: Date;
}

export interface RouteWeatherData {
  source: {
    location: string;
    alerts: LocationWeatherAlert[];
  };
  destination: {
    location: string;
    alerts: LocationWeatherAlert[];
  };
  suggestedDates?: Date[];
  currentTravelDate?: Date;
}

interface RouteWeatherAlertProps {
  sourceLocation: string;
  destinationLocation: string;
  travelDate?: Date;
  onDateSuggestionAccept?: (newDate: Date) => void;
  onDismiss?: () => void;
  className?: string;
}

const weatherIcons = {
  'storm': Zap,
  'heavy-rain': CloudRain,
  'heatwave': Sun,
  'flooding': Waves,
  'strong-winds': Wind,
  'cyclone': Wind
};

const severityColors = {
  warning: {
    bg: 'bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800',
    text: 'text-amber-800 dark:text-amber-200',
    icon: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900 dark:text-amber-200'
  },
  critical: {
    bg: 'bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
    icon: 'text-red-600 dark:text-red-400',
    badge: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200'
  },
  emergency: {
    bg: 'bg-red-100 border-red-300 dark:bg-red-900/70 dark:border-red-700',
    text: 'text-red-900 dark:text-red-100',
    icon: 'text-red-700 dark:text-red-300',
    badge: 'bg-red-200 text-red-900 border-red-400 dark:bg-red-800 dark:text-red-100'
  }
};

// Generate mock weather data based on Kerala locations and current conditions
function generateRouteWeatherData(source: string, destination: string, travelDate?: Date): RouteWeatherData {
  const now = new Date();
  const currentMonth = now.getMonth();
  const isMonsoontSeason = currentMonth >= 5 && currentMonth <= 9; // June to October
  const isSummerSeason = currentMonth >= 2 && currentMonth <= 4; // March to May

  const riskProfiles: Record<string, string[]> = {
    'Kochi (Cochin)': ['heavy-rain', 'flooding'],
    'Munnar': ['heavy-rain', 'storm', 'strong-winds'],
    'Alleppey (Alappuzha)': ['heavy-rain', 'flooding'],
    'Thekkady (Periyar)': ['heavy-rain', 'storm'],
    'Wayanad': ['heavy-rain', 'strong-winds'],
    'Kovalam': ['strong-winds', 'heatwave'],
    'Kumarakom': ['heavy-rain', 'flooding'],
    'Thrissur': ['heatwave', 'storm'],
    'Kozhikode (Calicut)': ['heavy-rain', 'strong-winds'],
    'Varkala': ['strong-winds', 'heatwave']
  };

  const generateAlerts = (location: string): LocationWeatherAlert[] => {
    const alerts: LocationWeatherAlert[] = [];
    const risks = riskProfiles[location] || [];
    
    // Simulate current weather conditions
    if (isMonsoontSeason && risks.includes('heavy-rain')) {
      alerts.push({
        location,
        type: 'heavy-rain',
        severity: 'warning',
        message: 'Heavy rainfall expected. Roads may be waterlogged.',
        icon: CloudRain,
        isActive: true,
        validUntil: addDays(now, 1)
      });
    }

    if (isMonsoontSeason && ['Munnar', 'Thekkady (Periyar)', 'Wayanad'].includes(location)) {
      alerts.push({
        location,
        type: 'storm',
        severity: 'critical',
        message: 'Thunderstorm warning. Avoid outdoor activities.',
        icon: Zap,
        isActive: true,
        validUntil: addDays(now, 1)
      });
    }

    if (isSummerSeason && risks.includes('heatwave')) {
      alerts.push({
        location,
        type: 'heatwave',
        severity: 'warning',
        message: 'Extreme heat expected. Stay hydrated.',
        icon: Sun,
        isActive: true,
        validUntil: addDays(now, 2)
      });
    }

    // Coastal warnings
    if (['Kovalam', 'Varkala', 'Kozhikode (Calicut)'].includes(location)) {
      const today = now.getDay();
      if (today === 0 || today === 3 || today === 6) { // Simulate high tide days
        alerts.push({
          location,
          type: 'strong-winds',
          severity: 'warning',
          message: 'Strong coastal winds. Exercise caution near beaches.',
          icon: Wind,
          isActive: true,
          validUntil: addDays(now, 1)
        });
      }
    }

    return alerts;
  };

  const sourceAlerts = generateAlerts(source);
  const destinationAlerts = generateAlerts(destination);
  
  // Generate suggested dates if there are active alerts
  const hasActiveAlerts = sourceAlerts.some(a => a.isActive) || destinationAlerts.some(a => a.isActive);
  const suggestedDates = hasActiveAlerts ? [
    addDays(now, 3),
    addDays(now, 5),
    addDays(now, 7)
  ] : [];

  return {
    source: {
      location: source,
      alerts: sourceAlerts
    },
    destination: {
      location: destination,
      alerts: destinationAlerts
    },
    suggestedDates,
    currentTravelDate: travelDate
  };
}

function LocationWeatherCard({ 
  location, 
  alerts, 
  isSource = false 
}: { 
  location: string; 
  alerts: LocationWeatherAlert[]; 
  isSource?: boolean;
}) {
  const activeAlerts = alerts.filter(alert => alert.isActive);
  const hasAlerts = activeAlerts.length > 0;
  const highestSeverity = activeAlerts.reduce((max, alert) => {
    const severityOrder = { warning: 1, critical: 2, emergency: 3 };
    return severityOrder[alert.severity] > severityOrder[max] ? alert.severity : max;
  }, 'warning' as const);

  return (
    <div className={cn(
      "relative p-4 rounded-lg border-2 transition-all",
      hasAlerts 
        ? severityColors[highestSeverity].bg 
        : "bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800"
    )}>
      {/* Location Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin className={cn(
            "h-4 w-4",
            hasAlerts 
              ? severityColors[highestSeverity].icon
              : "text-green-600 dark:text-green-400"
          )} />
          <span className={cn(
            "font-medium text-sm",
            hasAlerts 
              ? severityColors[highestSeverity].text
              : "text-green-800 dark:text-green-200"
          )}>
            {isSource ? 'Boarding Point' : 'Destination'}
          </span>
        </div>
        
        {hasAlerts ? (
          <Badge variant="outline" className={severityColors[highestSeverity].badge}>
            {activeAlerts.length} Alert{activeAlerts.length > 1 ? 's' : ''}
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200">
            Clear
          </Badge>
        )}
      </div>

      {/* Location Name */}
      <h3 className={cn(
        "font-semibold mb-2",
        hasAlerts 
          ? severityColors[highestSeverity].text
          : "text-green-800 dark:text-green-200"
      )}>
        {location}
      </h3>

      {/* Alerts or Clear Status */}
      {hasAlerts ? (
        <div className="space-y-2">
          {activeAlerts.map((alert, index) => {
            const IconComponent = alert.icon;
            return (
              <div key={index} className="flex items-start gap-2">
                <IconComponent className={cn("h-4 w-4 mt-0.5 flex-shrink-0", severityColors[alert.severity].icon)} />
                <div className="flex-1">
                  <p className={cn("text-sm", severityColors[alert.severity].text)}>
                    {alert.message}
                  </p>
                  <p className="text-xs opacity-75 mt-1">
                    Valid until {format(alert.validUntil, 'MMM d, h:mm a')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
          <Check className="h-4 w-4" />
          <span className="text-sm">Weather conditions are favorable</span>
        </div>
      )}
    </div>
  );
}

export function RouteWeatherAlert({
  sourceLocation,
  destinationLocation,
  travelDate,
  onDateSuggestionAccept,
  onDismiss,
  className
}: RouteWeatherAlertProps) {
  const [weatherData, setWeatherData] = React.useState<RouteWeatherData | null>(null);
  const [showDateSuggestions, setShowDateSuggestions] = React.useState(false);

  React.useEffect(() => {
    const data = generateRouteWeatherData(sourceLocation, destinationLocation, travelDate);
    setWeatherData(data);
    
    // Auto-show date suggestions if there are alerts and travel date is within alert period
    const hasActiveAlerts = data.source.alerts.some(a => a.isActive) || data.destination.alerts.some(a => a.isActive);
    if (hasActiveAlerts && travelDate) {
      const alertValidUntil = Math.max(
        ...data.source.alerts.filter(a => a.isActive).map(a => a.validUntil.getTime()),
        ...data.destination.alerts.filter(a => a.isActive).map(a => a.validUntil.getTime())
      );
      
      if (travelDate.getTime() <= alertValidUntil) {
        setShowDateSuggestions(true);
      }
    }
  }, [sourceLocation, destinationLocation, travelDate]);

  if (!weatherData) {
    return null;
  }

  const hasAnyAlerts = weatherData.source.alerts.some(a => a.isActive) || 
                     weatherData.destination.alerts.some(a => a.isActive);

  if (!hasAnyAlerts) {
    return null; // Don't show component if no alerts
  }

  const handleDateSelect = (newDate: Date) => {
    onDateSuggestionAccept?.(newDate);
    setShowDateSuggestions(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn("space-y-4", className)}
    >
      {/* Main Alert Card */}
      <Alert className="border-2 border-amber-200 bg-amber-50 dark:bg-amber-950/50 dark:border-amber-800">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <strong>Weather alerts detected for your route.</strong>
              <p className="text-sm mt-1">Review conditions at boarding point and destination before traveling.</p>
            </div>
            {onDismiss && (
              <Button variant="ghost" size="sm" onClick={onDismiss} className="ml-4">
                ×
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>

      {/* Route Weather Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LocationWeatherCard 
          location={weatherData.source.location}
          alerts={weatherData.source.alerts}
          isSource={true}
        />
        
        <div className="hidden md:flex items-center justify-center">
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
        </div>
        
        <LocationWeatherCard 
          location={weatherData.destination.location}
          alerts={weatherData.destination.alerts}
          isSource={false}
        />
      </div>

      {/* Date Suggestions */}
      <AnimatePresence>
        {showDateSuggestions && weatherData.suggestedDates && weatherData.suggestedDates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/50 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">
                    Suggested Alternative Dates
                  </h4>
                </div>
                
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                  Consider these dates for better weather conditions:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {weatherData.suggestedDates.map((date, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleDateSelect(date)}
                      className="flex items-center gap-2 h-auto p-3 bg-white dark:bg-gray-800 border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900"
                    >
                      <Calendar className="h-3 w-3" />
                      <div className="text-left">
                        <div className="font-medium text-sm">
                          {format(date, 'MMM d, yyyy')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(date, 'EEEE')}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                    <Shield className="h-3 w-3" />
                    <span>Weather conditions improve after current alerts expire</span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDateSuggestions(false)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                  >
                    Maybe Later
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const newData = generateRouteWeatherData(sourceLocation, destinationLocation, travelDate);
            setWeatherData(newData);
          }}
          className="flex items-center gap-2 text-xs"
        >
          <RefreshCw className="h-3 w-3" />
          Update Weather Info
        </Button>
      </div>
    </motion.div>
  );
}