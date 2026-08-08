import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RouteWeatherAlert } from './RouteWeatherAlert';
import { 
  MapPin, 
  Calendar, 
  RefreshCw,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { addDays } from 'date-fns';

const keralaDestinations = [
  'Kochi (Cochin)',
  'Munnar',
  'Alleppey (Alappuzha)',
  'Thekkady (Periyar)',
  'Wayanad',
  'Kovalam',
  'Kumarakom',
  'Thrissur',
  'Kozhikode (Calicut)',
  'Varkala'
];

const sourceLocations = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Ahmedabad'
];

interface RouteWeatherAlertDemoProps {
  className?: string;
}

export function RouteWeatherAlertDemo({ className }: RouteWeatherAlertDemoProps) {
  const [demoSource, setDemoSource] = React.useState('Mumbai');
  const [demoDestination, setDemoDestination] = React.useState('Munnar');
  const [demoTravelDate, setDemoTravelDate] = React.useState<Date>(addDays(new Date(), 2));
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [showAlert, setShowAlert] = React.useState(true);

  const handleDateSuggestionAccept = (newDate: Date) => {
    setDemoTravelDate(newDate);
    console.log('Demo: Accepted suggested date:', newDate);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setShowAlert(true);
  };

  const resetDemo = () => {
    setDemoSource('Mumbai');
    setDemoDestination('Munnar');
    setDemoTravelDate(addDays(new Date(), 2));
    setShowAlert(true);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Route Weather Alert System Demo
          </CardTitle>
          <p className="text-muted-foreground">
            VOYAGER's focused weather alert system shows critical weather information specifically 
            for your boarding point and destination, helping you make informed travel decisions.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Demo Controls */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Interactive Demo Controls
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Boarding Point</label>
                <Select value={demoSource} onValueChange={setDemoSource}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sourceLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Kerala Destination</label>
                <Select value={demoDestination} onValueChange={setDemoDestination}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {keralaDestinations.map((destination) => (
                      <SelectItem key={destination} value={destination}>
                        {destination}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Actions</label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleRefresh}>
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetDemo}>
                    Reset Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Live Demo */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Live Route Weather Check</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{demoSource}</span>
                <ArrowRight className="h-3 w-3" />
                <span>{demoDestination}</span>
              </div>
            </div>

            {showAlert ? (
              <RouteWeatherAlert
                key={refreshKey}
                sourceLocation={demoSource}
                destinationLocation={demoDestination}
                travelDate={demoTravelDate}
                onDateSuggestionAccept={handleDateSuggestionAccept}
                onDismiss={() => setShowAlert(false)}
              />
            ) : (
              <div className="text-center py-8 bg-green-50 dark:bg-green-950/50 rounded-lg border border-green-200 dark:border-green-800">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                  Weather Alert Dismissed
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                  All weather alerts have been acknowledged for this route.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowAlert(true)}
                  className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900"
                >
                  Show Alerts Again
                </Button>
              </div>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h5 className="font-medium text-blue-800 dark:text-blue-200">Location-Focused</h5>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Shows weather alerts only for your specific boarding point and destination, 
                eliminating noise from irrelevant locations.
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <h5 className="font-medium text-amber-800 dark:text-amber-200">Critical Warnings</h5>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Uses distinct red and orange colors to highlight severe weather warnings 
                that could impact your travel plans.
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                <h5 className="font-medium text-green-800 dark:text-green-200">Smart Suggestions</h5>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Automatically suggests alternative travel dates when weather conditions 
                are expected to improve.
              </p>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-muted/30 border-l-4 border-primary p-4 rounded">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h5 className="font-medium">How It Works</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Monitors weather conditions at both boarding point and destination</li>
                  <li>• Displays minimal, focused alerts without route-wide information</li>
                  <li>• Uses color-coding: amber for warnings, red for critical/emergency conditions</li>
                  <li>• Provides instant alternative date suggestions based on weather forecasts</li>
                  <li>• Integrates with existing VOYAGER travel planning workflow</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              This focused approach ensures travelers get critical weather information without information overload.
            </p>
            <Badge variant="outline" className="text-xs">
              Integrated with Kerala Weather Services
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}