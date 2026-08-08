import React from 'react';
import { Shield, MapPin, Clock, AlertTriangle, CheckCircle, Navigation, Car, Bus, Train } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface RouteInfo {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  safetyRating: number;
  roadCondition: 'excellent' | 'good' | 'fair' | 'poor';
  transportModes: string[];
  highlights: string[];
  warnings: string[];
  bestTime: string;
  alternativeRoutes: {
    name: string;
    distance: string;
    duration: string;
    description: string;
  }[];
}

interface SafeRoutesProps {
  from: string;
  to: string;
  onBack?: () => void;
  onContinue?: () => void;
}

export function SafeRoutes({ from, to, onBack, onContinue }: SafeRoutesProps) {
  const [selectedRoute, setSelectedRoute] = React.useState<string>('main');

  // Mock route data - In a real app, this would come from an API
  const routeData: RouteInfo = React.useMemo(() => {
    const routes: Record<string, RouteInfo> = {
      'Kochi-Munnar': {
        id: 'kochi-munnar',
        from: 'Kochi (Cochin)',
        to: 'Munnar',
        distance: '130 km',
        duration: '4-5 hours',
        safetyRating: 85,
        roadCondition: 'good',
        transportModes: ['car', 'bus', 'taxi'],
        highlights: [
          'Scenic mountain roads with tea plantations',
          'Well-maintained highways for most of the journey',
          'Multiple rest stops and fuel stations',
          'Good mobile network coverage'
        ],
        warnings: [
          'Winding roads in the last 40 km - drive carefully',
          'Heavy fog possible during monsoon season',
          'Avoid night travel during rainy season'
        ],
        bestTime: 'Early morning (6 AM - 8 AM) for best visibility',
        alternativeRoutes: [
          {
            name: 'Via Adimali',
            distance: '135 km',
            duration: '4.5-5.5 hours',
            description: 'Slightly longer but more scenic route through spice plantations'
          },
          {
            name: 'Via Udumalaipettai',
            distance: '145 km',
            duration: '5-6 hours',
            description: 'Longer route via Tamil Nadu with good road conditions'
          }
        ]
      },
      'Kochi-Alleppey': {
        id: 'kochi-alleppey',
        from: 'Kochi (Cochin)',
        to: 'Alleppey (Alappuzha)',
        distance: '85 km',
        duration: '2-3 hours',
        safetyRating: 92,
        roadCondition: 'excellent',
        transportModes: ['car', 'bus', 'taxi', 'boat'],
        highlights: [
          'Excellent road conditions throughout',
          'Multiple route options available',
          'Well-lit highways with good signage',
          'Frequent public transport options'
        ],
        warnings: [
          'Heavy traffic during peak tourist seasons',
          'Waterlogged areas during heavy monsoon'
        ],
        bestTime: 'Morning (7 AM - 10 AM) or late afternoon (4 PM - 6 PM)',
        alternativeRoutes: [
          {
            name: 'Via Backwaters',
            distance: 'N/A',
            duration: '6-8 hours',
            description: 'Scenic boat journey through Kerala backwaters - highly recommended'
          },
          {
            name: 'Via Kottayam',
            distance: '95 km',
            duration: '3-4 hours',
            description: 'Longer road route with beautiful countryside views'
          }
        ]
      }
    };

    const routeKey = `${from.split(' ')[0]}-${to.split(' ')[0]}`;
    return routes[routeKey] || {
      id: 'default',
      from,
      to,
      distance: '120 km',
      duration: '3-4 hours',
      safetyRating: 80,
      roadCondition: 'good' as const,
      transportModes: ['car', 'bus', 'taxi'],
      highlights: [
        'Well-maintained state highways',
        'Good mobile network coverage',
        'Regular fuel stations and rest stops'
      ],
      warnings: [
        'Check weather conditions before travel',
        'Carry emergency contact numbers'
      ],
      bestTime: 'Early morning or late afternoon',
      alternativeRoutes: [
        {
          name: 'Highway Route',
          distance: '125 km',
          duration: '3.5-4.5 hours',
          description: 'Main highway route with excellent road conditions'
        }
      ]
    };
  }, [from, to]);

  const getSafetyColor = (rating: number) => {
    if (rating >= 90) return 'text-green-600';
    if (rating >= 80) return 'text-yellow-600';
    if (rating >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSafetyBadgeColor = (rating: number) => {
    if (rating >= 90) return 'bg-green-100 text-green-800';
    if (rating >= 80) return 'bg-yellow-100 text-yellow-800';
    if (rating >= 70) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getRoadConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'car': return <Car className="h-4 w-4" />;
      case 'bus': return <Bus className="h-4 w-4" />;
      case 'train': return <Train className="h-4 w-4" />;
      default: return <Navigation className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Safe Routes</h2>
          </div>
          <p className="text-muted-foreground">
            Safety information and route recommendations for your Kerala journey
          </p>
        </div>
        <div className="flex gap-2">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              ← Back
            </Button>
          )}
          {onContinue && (
            <Button onClick={onContinue}>
              Continue to Summary →
            </Button>
          )}
        </div>
      </div>

      {/* Route Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {routeData.from} → {routeData.to}
          </CardTitle>
          <CardDescription>
            Complete safety analysis and route recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Distance</p>
              <p className="text-lg font-semibold">{routeData.distance}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Duration</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <p className="text-lg font-semibold">{routeData.duration}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Safety Rating</p>
              <div className="flex items-center gap-2">
                <Progress value={routeData.safetyRating} className="flex-1" />
                <Badge className={getSafetyBadgeColor(routeData.safetyRating)}>
                  {routeData.safetyRating}%
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Road Condition</p>
              <p className={`text-lg font-semibold capitalize ${getRoadConditionColor(routeData.roadCondition)}`}>
                {routeData.roadCondition}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information */}
      <Tabs value={selectedRoute} onValueChange={setSelectedRoute} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="main">Main Route</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="safety">Safety Tips</TabsTrigger>
          <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
        </TabsList>

        <TabsContent value="main" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Route Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {routeData.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Warnings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Important Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {routeData.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{warning}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Best Travel Time */}
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              <strong>Best Travel Time:</strong> {routeData.bestTime}
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="transport" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Transport Options</CardTitle>
              <CardDescription>
                Choose the best transport mode for your journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {routeData.transportModes.map((mode) => (
                  <div key={mode} className="flex items-center gap-2 p-3 border rounded-lg">
                    {getTransportIcon(mode)}
                    <span className="capitalize font-medium">{mode}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold">Transport Recommendations:</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Private Car/Taxi</span>
                      <Badge variant="secondary">Recommended</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Most flexible option with door-to-door service. Ideal for families and groups.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Bus className="h-4 w-4 text-green-600" />
                      <span className="font-medium">State Transport Bus</span>
                      <Badge variant="secondary">Budget Friendly</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Economical option with regular services. AC and non-AC buses available.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Pre-Journey Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Check weather conditions and road alerts
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Ensure vehicle is in good condition
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Carry emergency contact numbers
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Pack first aid kit and medications
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Inform someone about your travel plans
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>During Travel</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Maintain safe following distance
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Take regular breaks every 2 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Stay hydrated and avoid heavy meals
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Use hands-free devices for calls
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    Follow traffic rules and speed limits
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium">Police</p>
                  <p className="text-primary">100</p>
                </div>
                <div>
                  <p className="font-medium">Ambulance</p>
                  <p className="text-primary">108</p>
                </div>
                <div>
                  <p className="font-medium">Fire Service</p>
                  <p className="text-primary">101</p>
                </div>
                <div>
                  <p className="font-medium">Tourist Helpline</p>
                  <p className="text-primary">1363</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alternatives" className="space-y-4">
          <div className="space-y-4">
            {routeData.alternativeRoutes.map((route, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{route.name}</span>
                    <div className="flex gap-2">
                      <Badge variant="outline">{route.distance}</Badge>
                      <Badge variant="outline">{route.duration}</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{route.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert>
            <Navigation className="h-4 w-4" />
            <AlertDescription>
              <strong>Pro Tip:</strong> Consider alternative routes during peak tourist seasons 
              (December-February) and monsoon months (June-September) for better travel experience.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}