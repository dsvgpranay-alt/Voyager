import React from 'react';
import { AlertTriangle, Shield, Clock, MapPin, ChevronRight, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface RiskyAreaAlertProps {
  location: string;
  riskType: string;
  description: string;
  severity: 'low' | 'moderate' | 'high';
  timeRestriction?: string;
  onViewSafeRoutes?: () => void;
  onDismiss?: () => void;
  className?: string;
}

interface RiskConfig {
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
}

export function RiskyAreaAlert({
  location,
  riskType,
  description,
  severity,
  timeRestriction,
  onViewSafeRoutes,
  onDismiss,
  className = ""
}: RiskyAreaAlertProps) {
  const getRiskConfig = (severity: string): RiskConfig => {
    switch (severity) {
      case 'high':
        return {
          color: 'text-red-700',
          bgColor: 'bg-red-50 border-red-200',
          borderColor: 'border-l-red-500',
          icon: <AlertTriangle className="h-5 w-5 text-red-600" />
        };
      case 'moderate':
        return {
          color: 'text-orange-700',
          bgColor: 'bg-orange-50 border-orange-200',
          borderColor: 'border-l-orange-500',
          icon: <Shield className="h-5 w-5 text-orange-600" />
        };
      default:
        return {
          color: 'text-yellow-700',
          bgColor: 'bg-yellow-50 border-yellow-200',
          borderColor: 'border-l-yellow-500',
          icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />
        };
    }
  };

  const config = getRiskConfig(severity);

  const getSeverityBadge = () => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High Alert</Badge>;
      case 'moderate':
        return <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">Moderate</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">Advisory</Badge>;
    }
  };

  return (
    <Card className={`${config.bgColor} border-l-4 ${config.borderColor} ${className} shadow-sm hover:shadow-md transition-shadow`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          {/* Main Content */}
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {config.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={`font-semibold ${config.color}`}>
                    {location} – {riskType}
                  </h3>
                  {getSeverityBadge()}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>Kerala Travel Advisory</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className={`text-sm ${config.color} leading-relaxed`}>
              {description}
            </p>

            {/* Time Restriction */}
            {timeRestriction && (
              <div className="flex items-center gap-2 p-2 bg-white/50 rounded-md">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">
                  {timeRestriction}
                </span>
              </div>
            )}

            {/* Action Button */}
            <div className="flex items-center gap-2 pt-1">
              <Button
                onClick={onViewSafeRoutes}
                size="sm"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                <Shield className="h-4 w-4" />
                View Safe Routes
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              {/* Secondary info */}
              <span className="text-xs text-muted-foreground">
                Updated 2 hours ago
              </span>
            </div>
          </div>

          {/* Dismiss Button */}
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Demo/Example component showing different alert types
export function RiskyAreaAlertDemo() {
  const [alerts, setAlerts] = React.useState([
    {
      id: 1,
      location: 'Munnar',
      riskType: 'Landslide-Prone Zone',
      description: 'Heavy rains reported in the area. Road conditions may be challenging. Exercise extra caution while driving.',
      severity: 'high' as const,
      timeRestriction: 'Avoid travel after 6 PM'
    },
    {
      id: 2,
      location: 'Kovalam Beach',
      riskType: 'High Tide Warning',
      description: 'Strong currents and high waves expected. Swimming not recommended for the next 24 hours.',
      severity: 'moderate' as const,
      timeRestriction: undefined
    },
    {
      id: 3,
      location: 'Thekkady',
      riskType: 'Wildlife Activity',
      description: 'Increased elephant movement reported near the main road. Drive slowly and maintain safe distance.',
      severity: 'low' as const,
      timeRestriction: 'Peak activity: 5 AM - 8 AM'
    }
  ]);

  const handleDismissAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleViewSafeRoutes = (location: string) => {
    console.log(`Viewing safe routes for ${location}`);
    // In real app, this would navigate to safe routes page
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-foreground">Current Travel Advisories</h2>
        <p className="text-sm text-muted-foreground">
          Stay informed about potential risks in your travel areas
        </p>
      </div>
      
      {alerts.length > 0 ? (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <RiskyAreaAlert
              key={alert.id}
              location={alert.location}
              riskType={alert.riskType}
              description={alert.description}
              severity={alert.severity}
              timeRestriction={alert.timeRestriction}
              onViewSafeRoutes={() => handleViewSafeRoutes(alert.location)}
              onDismiss={() => handleDismissAlert(alert.id)}
            />
          ))}
        </div>
      ) : (
        <Card className="bg-green-50 border-green-200 border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-700">All Clear!</p>
                <p className="text-sm text-green-600">No current travel advisories for your selected destinations.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Compact version for mobile/sidebar use
export function CompactRiskyAreaAlert({
  location,
  riskType,
  severity,
  onViewSafeRoutes,
  className = ""
}: Omit<RiskyAreaAlertProps, 'description' | 'onDismiss'>) {
  const config = getRiskConfig(severity);
  
  function getRiskConfig(severity: string): RiskConfig {
    switch (severity) {
      case 'high':
        return {
          color: 'text-red-700',
          bgColor: 'bg-red-50 border-red-200',
          borderColor: 'border-l-red-500',
          icon: <AlertTriangle className="h-4 w-4 text-red-600" />
        };
      case 'moderate':
        return {
          color: 'text-orange-700',
          bgColor: 'bg-orange-50 border-orange-200',
          borderColor: 'border-l-orange-500',
          icon: <Shield className="h-4 w-4 text-orange-600" />
        };
      default:
        return {
          color: 'text-yellow-700',
          bgColor: 'bg-yellow-50 border-yellow-200',
          borderColor: 'border-l-yellow-500',
          icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />
        };
    }
  }

  return (
    <Card className={`${config.bgColor} border-l-4 ${config.borderColor} ${className}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {config.icon}
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium ${config.color} truncate`}>
                {location}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {riskType}
              </p>
            </div>
          </div>
          <Button
            onClick={onViewSafeRoutes}
            size="sm"
            variant="outline"
            className="text-xs px-2"
          >
            Routes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}