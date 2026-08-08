import React from 'react';
import { RiskyAreaAlert, RiskyAreaAlertDemo } from './RiskyAreaAlert';
import { TravelRiskyAreaAlerts } from './TravelRiskyAreaAlerts';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Shield, 
  RefreshCw,
  MapPin,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';
import { TravelData } from './TravelForm';

interface SafetyAlertDemoProps {
  currentDestination?: string;
  travelData?: TravelData | null;
}

export function SafetyAlertDemo({ currentDestination, travelData }: SafetyAlertDemoProps) {
  const [activeAlerts, setActiveAlerts] = React.useState<string[]>([]);
  const [demoMode, setDemoMode] = React.useState(false);

  // Sample alerts based on current destination or default Kerala locations
  const getSampleAlerts = () => {
    const destination = currentDestination || 'Munnar';
    
    const alertTypes = [
      {
        id: 1,
        location: destination,
        riskType: 'Landslide-Prone Zone',
        description: 'Heavy rains reported in the area. Road conditions may be challenging. Exercise extra caution while driving.',
        severity: 'high' as const,
        timeRestriction: 'Avoid travel after 6 PM'
      },
      {
        id: 2,
        location: 'Kochi',
        riskType: 'Urban Flooding Risk',
        description: 'Waterlogging expected in low-lying areas due to heavy monsoon rains. Plan alternate routes.',
        severity: 'moderate' as const,
        timeRestriction: 'Peak risk: 2 PM - 8 PM'
      },
      {
        id: 3,
        location: 'Thekkady',
        riskType: 'Wildlife Activity',
        description: 'Increased elephant movement reported near the main road. Drive slowly and maintain safe distance.',
        severity: 'low' as const,
        timeRestriction: 'Peak activity: 5 AM - 8 AM'
      },
      {
        id: 4,
        location: 'Alleppey',
        riskType: 'High Tide Warning',
        description: 'Strong currents and high waves expected along the coast. Backwater activities may be affected.',
        severity: 'moderate' as const,
        timeRestriction: undefined
      },
      {
        id: 5,
        location: 'Wayanad',
        riskType: 'Road Construction',
        description: 'Major roadwork on NH766. Expect delays and follow traffic diversions for smoother travel.',
        severity: 'low' as const,
        timeRestriction: 'Work hours: 9 AM - 5 PM'
      }
    ];

    return alertTypes;
  };

  const [sampleAlerts] = React.useState(getSampleAlerts());

  const toggleAlert = (index: number) => {
    const alertId = `alert-${index}`;
    setActiveAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const showAllAlerts = () => {
    setActiveAlerts(sampleAlerts.map((_, index) => `alert-${index}`));
    setDemoMode(true);
  };

  const hideAllAlerts = () => {
    setActiveAlerts([]);
    setDemoMode(false);
  };

  const handleViewRoutes = (location: string) => {
    // In a real app, this would navigate to safe routes for the location
    console.log(`Viewing safe routes for ${location}`);
    // You could integrate this with your maps or routing functionality
  };

  const handleDismissAlert = (index: number) => {
    const alertId = `alert-${index}`;
    setActiveAlerts(prev => prev.filter(id => id !== alertId));
  };

  return (
    <div className="space-y-6">
      {/* Smart Travel Alerts - Show if travel data is available */}
      {travelData && (
        <TravelRiskyAreaAlerts
          travelData={travelData}
          onViewSafeRoutes={(location) => console.log(`Viewing safe routes for ${location}`)}
        />
      )}
      
      {/* Demo Controls */}
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
            <Shield className="h-5 w-5" />
            Safety Alert System
            <Badge variant="secondary" className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
              Demo
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-amber-800 dark:text-amber-200 mb-4">
            View sample safety advisories for Kerala destinations. These alerts help travelers 
            make informed decisions and choose safer routes.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={showAllAlerts}
              size="sm"
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/20"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Show Sample Alerts
            </Button>
            
            <Button
              onClick={hideAllAlerts}
              size="sm"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900/20"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>

          {/* Alert Type Buttons */}
          <div className="mt-4 space-y-2">
            <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">Individual Alert Types:</p>
            <div className="flex flex-wrap gap-2">
              {sampleAlerts.map((alert, index) => (
                <Button
                  key={index}
                  onClick={() => toggleAlert(index)}
                  size="sm"
                  variant={activeAlerts.includes(`alert-${index}`) ? "default" : "outline"}
                  className="text-xs h-7"
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {alert.location}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Safety Alerts */}
      <div className="space-y-3">
        {sampleAlerts.map((alert, index) => (
          activeAlerts.includes(`alert-${index}`) && (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
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
                onViewSafeRoutes={() => handleViewRoutes(alert.location)}
                onDismiss={() => handleDismissAlert(index)}
              />
            </motion.div>
          )
        ))}
      </div>

      {/* Usage Information */}
      {demoMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    How Safety Alerts Work
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• <strong>Real-time updates</strong> from local authorities and weather services</li>
                    <li>• <strong>Location-specific</strong> alerts based on your planned route</li>
                    <li>• <strong>Alternative routes</strong> suggested when risks are detected</li>
                    <li>• <strong>Severity levels</strong> help you assess the urgency of each alert</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}