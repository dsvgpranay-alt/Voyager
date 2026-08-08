import React from 'react';
import { RiskyAreaAlert, CompactRiskyAreaAlert } from './RiskyAreaAlert';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Shield, RefreshCw, CheckCircle, Info } from 'lucide-react';
import { TravelData } from './TravelForm';
import { motion, AnimatePresence } from 'motion/react';

interface TravelRiskyAreaAlertsProps {
  travelData: TravelData;
  compact?: boolean;
  onViewSafeRoutes?: (location: string) => void;
  className?: string;
}

interface RiskAlert {
  id: string;
  location: string;
  riskType: string;
  description: string;
  severity: 'low' | 'moderate' | 'high';
  timeRestriction?: string;
  relevance: number; // 0-100, how relevant to the user's trip
}

export function TravelRiskyAreaAlerts({ 
  travelData, 
  compact = false, 
  onViewSafeRoutes,
  className = ""
}: TravelRiskyAreaAlertsProps) {
  const [dismissedAlerts, setDismissedAlerts] = React.useState<Set<string>>(new Set());
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [lastUpdated, setLastUpdated] = React.useState(new Date());

  // Generate location-specific alerts based on travel data
  const generateAlerts = React.useCallback((): RiskAlert[] => {
    const { source, destination, startDate } = travelData;
    const alerts: RiskAlert[] = [];

    // Create a helper function to check if it's monsoon season
    const isMonSoonSeason = (dateString: string): boolean => {
      const date = new Date(dateString);
      const month = date.getMonth() + 1;
      return month >= 6 && month <= 9;
    };

    // Destination-specific alerts
    const destinationLower = destination.toLowerCase();
    
    // Munnar alerts
    if (destinationLower.includes('munnar')) {
      alerts.push({
        id: 'munnar-landslide',
        location: 'Munnar',
        riskType: 'Landslide-Prone Zone',
        description: isMonSoonSeason(startDate) 
          ? 'Heavy monsoon rains increase landslide risk. Road conditions may be hazardous on winding hill roads.'
          : 'Occasional landslides possible during heavy rains. Exercise caution on mountain roads.',
        severity: isMonSoonSeason(startDate) ? 'high' : 'moderate',
        timeRestriction: isMonSoonSeason(startDate) ? 'Avoid travel after 6 PM' : undefined,
        relevance: 95
      });
    }

    // Alleppey/Kumarakom alerts (backwaters)
    if (destinationLower.includes('alleppey') || destinationLower.includes('kumarakom')) {
      alerts.push({
        id: 'backwater-weather',
        location: destinationLower.includes('alleppey') ? 'Alleppey' : 'Kumarakom',
        riskType: 'Backwater Weather Advisory',
        description: isMonSoonSeason(startDate)
          ? 'Strong winds and rough waters during monsoon. Houseboat operations may be suspended.'
          : 'Check weather conditions before boating activities. Carry life jackets at all times.',
        severity: isMonSoonSeason(startDate) ? 'high' : 'low',
        timeRestriction: isMonSoonSeason(startDate) ? 'Avoid water activities during storms' : undefined,
        relevance: 90
      });
    }

    // Thekkady alerts
    if (destinationLower.includes('thekkady')) {
      alerts.push({
        id: 'thekkady-wildlife',
        location: 'Thekkady',
        riskType: 'Wildlife Activity Zone',
        description: 'Frequent elephant and wild boar sightings near roads. Maintain safe distance and avoid honking.',
        severity: 'moderate',
        timeRestriction: 'Peak activity: Dawn and dusk',
        relevance: 85
      });
    }

    // Wayanad alerts
    if (destinationLower.includes('wayanad')) {
      alerts.push({
        id: 'wayanad-terrain',
        location: 'Wayanad',
        riskType: 'Hilly Terrain Advisory',
        description: 'Steep, winding roads with limited visibility. Drive slowly and use low beam headlights.',
        severity: 'moderate',
        timeRestriction: 'Extra caution during fog (early morning)',
        relevance: 80
      });
    }

    // Kovalam/Varkala beach alerts
    if (destinationLower.includes('kovalam') || destinationLower.includes('varkala')) {
      alerts.push({
        id: 'beach-safety',
        location: destinationLower.includes('kovalam') ? 'Kovalam' : 'Varkala',
        riskType: 'Beach Safety Advisory',
        description: 'Strong undercurrents reported. Swim only in designated areas with lifeguard presence.',
        severity: 'moderate',
        timeRestriction: 'Avoid swimming during high tide',
        relevance: 75
      });
    }

    // Kochi urban alerts
    if (destinationLower.includes('kochi') || destinationLower.includes('cochin')) {
      alerts.push({
        id: 'kochi-traffic',
        location: 'Kochi',
        riskType: 'Urban Traffic Advisory',
        description: isMonSoonSeason(startDate)
          ? 'Heavy traffic and waterlogging during monsoon. Plan extra travel time.'
          : 'Heavy traffic during peak hours. Use metro when possible.',
        severity: 'low',
        timeRestriction: 'Peak hours: 8-10 AM, 5-8 PM',
        relevance: 70
      });
    }

    // Route-specific alerts (source to destination)
    if (source.toLowerCase().includes('bangalore') || source.toLowerCase().includes('bengaluru')) {
      alerts.push({
        id: 'bangalore-route',
        location: 'Bangalore-Kerala Highway',
        riskType: 'Long Distance Route',
        description: 'Ghat section roads can be challenging. Take regular breaks and avoid night driving in hills.',
        severity: 'moderate',
        timeRestriction: 'Avoid night driving in ghat sections',
        relevance: 60
      });
    }

    // General monsoon alert if traveling during monsoon
    if (isMonSoonSeason(startDate)) {
      alerts.push({
        id: 'monsoon-general',
        location: 'Kerala State',
        riskType: 'Monsoon Season Advisory',
        description: 'Heavy rainfall expected. Carry waterproof clothing and check weather updates regularly.',
        severity: 'moderate',
        relevance: 50
      });
    }

    // Sort by relevance and return top alerts
    return alerts
      .filter(alert => !dismissedAlerts.has(alert.id))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, compact ? 2 : 4);
  }, [travelData, dismissedAlerts]);

  const [alerts, setAlerts] = React.useState<RiskAlert[]>(() => generateAlerts());

  // Refresh alerts
  const handleRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAlerts(generateAlerts());
    setLastUpdated(new Date());
    setIsRefreshing(false);
  }, [generateAlerts]);

  // Dismiss alert
  const handleDismissAlert = React.useCallback((alertId: string) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  }, []);

  // Handle view safe routes
  const handleViewSafeRoutes = React.useCallback((location: string) => {
    if (onViewSafeRoutes) {
      onViewSafeRoutes(location);
    } else {
      // Default behavior - could navigate to a safe routes page
      console.log(`Viewing safe routes for ${location}`);
    }
  }, [onViewSafeRoutes]);

  // Update alerts when travel data changes
  React.useEffect(() => {
    setAlerts(generateAlerts());
  }, [generateAlerts]);

  if (compact) {
    return (
      <div className={`space-y-2 ${className}`}>
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CompactRiskyAreaAlert
                location={alert.location}
                riskType={alert.riskType}
                severity={alert.severity}
                onViewSafeRoutes={() => handleViewSafeRoutes(alert.location)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              Travel Advisories
              {alerts.length > 0 && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {alerts.length} active
                </Badge>
              )}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>For your route: {travelData.source} → {travelData.destination}</span>
            <span>Updated {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {alerts.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RiskyAreaAlert
                  location={alert.location}
                  riskType={alert.riskType}
                  description={alert.description}
                  severity={alert.severity}
                  timeRestriction={alert.timeRestriction}
                  onViewSafeRoutes={() => handleViewSafeRoutes(alert.location)}
                  onDismiss={() => handleDismissAlert(alert.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            <strong>All clear!</strong> No current travel advisories for your selected route. 
            Have a safe and wonderful journey through Kerala!
          </AlertDescription>
        </Alert>
      )}

      {/* Info footer */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              These advisories are based on your travel route and dates. 
              Always check local conditions and follow official guidance for the safest journey.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}