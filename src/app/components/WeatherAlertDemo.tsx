import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { WeatherAlert, WeatherAlertContainer, sampleWeatherAlerts, WeatherAlertData, WeatherAlertSeverity, WeatherAlertType } from './WeatherAlert';
import { 
  CloudRain, 
  Sun, 
  Zap, 
  Waves, 
  Wind, 
  Mountain,
  CloudSnow,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Settings
} from 'lucide-react';
import { motion } from 'motion/react';

interface WeatherAlertDemoProps {
  destination?: string;
}

export function WeatherAlertDemo({ destination }: WeatherAlertDemoProps) {
  const [activeAlerts, setActiveAlerts] = React.useState<WeatherAlertData[]>(sampleWeatherAlerts);
  const [selectedSeverity, setSelectedSeverity] = React.useState<WeatherAlertSeverity | 'all'>('all');
  const [isAutoRotating, setIsAutoRotating] = React.useState(false);
  const [currentDemo, setCurrentDemo] = React.useState(0);

  // Auto-rotate demo alerts
  React.useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % sampleWeatherAlerts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const handleDismissAlert = (alertId: string) => {
    setActiveAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isActive: false } : alert
    ));
  };

  const handleViewDetails = (alertId: string) => {
    console.log('Viewing details for alert:', alertId);
    // In a real implementation, this would open a detailed view
  };

  const resetAlerts = () => {
    setActiveAlerts(sampleWeatherAlerts);
  };

  const filteredAlerts = selectedSeverity === 'all' 
    ? activeAlerts 
    : activeAlerts.filter(alert => alert.severity === selectedSeverity);

  const alertTypeIcons = {
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

  const severityColors = {
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    warning: 'bg-amber-100 text-amber-800 border-amber-300',
    critical: 'bg-red-100 text-red-800 border-red-300',
    emergency: 'bg-red-200 text-red-900 border-red-400'
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Weather Alert System Demo
          </CardTitle>
          <p className="text-muted-foreground">
            Experience VOYAGER's comprehensive weather alert system that keeps tourists safe with 
            real-time weather warnings, safety advice, and emergency information tailored for Kerala travel.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Demo Controls:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Switch
                checked={isAutoRotating}
                onCheckedChange={setIsAutoRotating}
                id="auto-rotate"
              />
              <label htmlFor="auto-rotate" className="text-sm">
                Auto-rotate alerts
              </label>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={resetAlerts}
              className="flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Reset All
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Filter:</span>
              <div className="flex gap-1">
                {(['all', 'info', 'warning', 'critical', 'emergency'] as const).map((severity) => (
                  <Button
                    key={severity}
                    variant={selectedSeverity === severity ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSeverity(severity)}
                    className="text-xs px-2 py-1 h-auto"
                  >
                    {severity === 'all' ? 'All' : severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Alert Types Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {sampleWeatherAlerts.map((alert) => {
              const IconComponent = alertTypeIcons[alert.type];
              const isActive = activeAlerts.find(a => a.id === alert.id)?.isActive;
              
              return (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    isActive 
                      ? severityColors[alert.severity] 
                      : 'bg-gray-50 text-gray-400 border-gray-200'
                  }`}
                  onClick={() => {
                    if (!isActive) {
                      setActiveAlerts(prev => prev.map(a => 
                        a.id === alert.id ? { ...a, isActive: true } : a
                      ));
                    }
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent className="h-4 w-4" />
                    <span className="text-xs font-medium">
                      {alert.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <div className="text-xs opacity-80">{alert.location}</div>
                  <Badge 
                    variant="outline" 
                    className="mt-1 text-xs"
                  >
                    {alert.severity}
                  </Badge>
                </div>
              );
            })}
          </div>

          <Separator />

          {/* Live Weather Alerts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Active Weather Alerts
                {filteredAlerts.filter(a => a.isActive).length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {filteredAlerts.filter(a => a.isActive).length} Active
                  </Badge>
                )}
              </h3>
              
              {destination && (
                <Badge variant="outline" className="text-xs">
                  For: {destination}
                </Badge>
              )}
            </div>

            {/* Alert Container */}
            <WeatherAlertContainer
              alerts={filteredAlerts}
              onDismiss={handleDismissAlert}
              onViewDetails={handleViewDetails}
              maxVisible={3}
            />

            {/* No Active Alerts */}
            {filteredAlerts.filter(a => a.isActive).length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-medium text-green-800 mb-2">
                  All Clear!
                </h4>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  No active weather warnings for your destination. 
                  {destination && ` Conditions in ${destination} are favorable for travel.`}
                </p>
              </motion.div>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="space-y-4">
              <h4 className="font-medium text-green-800 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                How VOYAGER Weather Alerts Keep You Safe
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h5 className="font-medium text-green-700">🎯 Location-Specific</h5>
                  <p className="text-green-600">
                    Alerts are tailored to your exact destination and travel route in Kerala
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-green-700">⚡ Real-Time Updates</h5>
                  <p className="text-green-600">
                    Instant notifications when weather conditions change during your trip
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-green-700">🛡️ Actionable Advice</h5>
                  <p className="text-green-600">
                    Clear safety instructions and emergency contacts for immediate action
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-green-700">📞 Emergency Ready</h5>
                  <p className="text-green-600">
                    Local emergency numbers and tourist helplines at your fingertips
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Integration Note */}
          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded border-l-4 border-primary">
            <strong>Technical Note:</strong> This demo shows static sample alerts. In production, 
            VOYAGER integrates with the India Meteorological Department (IMD) and Kerala State 
            Disaster Management Authority for real-time weather data and emergency alerts.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}