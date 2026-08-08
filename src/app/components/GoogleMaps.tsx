import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Navigation, Layers, Route, ExternalLink, Compass, Car, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface GoogleMapsProps {
  destination: string;
  source?: string;
  showRoute?: boolean;
  className?: string;
}

interface LocationData {
  lat: number;
  lng: number;
  description: string;
  highlights: string[];
  travelTime?: string;
  distance?: string;
}

// Mock location data for Kerala destinations
const keraladestinations: Record<string, LocationData> = {
  'Kochi (Cochin)': {
    lat: 9.9312,
    lng: 76.2673,
    description: 'The Queen of the Arabian Sea, a historic port city with colonial architecture',
    highlights: ['Chinese Fishing Nets', 'Fort Kochi', 'Mattancherry Palace', 'Marine Drive'],
    travelTime: '45 mins from airport',
    distance: '30 km from city center'
  },
  'Munnar': {
    lat: 10.0889,
    lng: 77.0595,
    description: 'Hill station famous for tea plantations and scenic beauty',
    highlights: ['Tea Gardens', 'Eravikulam National Park', 'Mattupetty Dam', 'Top Station'],
    travelTime: '3.5 hours from Kochi',
    distance: '130 km from Kochi'
  },
  'Alleppey (Alappuzha)': {
    lat: 9.4981,
    lng: 76.3388,
    description: 'Venice of the East, famous for backwaters and houseboats',
    highlights: ['Backwaters', 'Houseboats', 'Alleppey Beach', 'Vembanad Lake'],
    travelTime: '1.5 hours from Kochi',
    distance: '53 km from Kochi'
  },
  'Thekkady (Periyar)': {
    lat: 9.5916,
    lng: 77.1541,
    description: 'Wildlife sanctuary with spice plantations and boat safaris',
    highlights: ['Periyar Wildlife Sanctuary', 'Spice Plantations', 'Bamboo Rafting', 'Elephant Junction'],
    travelTime: '4 hours from Kochi',
    distance: '190 km from Kochi'
  },
  'Wayanad': {
    lat: 11.6854,
    lng: 76.1320,
    description: 'Green paradise with wildlife, waterfalls, and hill stations',
    highlights: ['Edakkal Caves', 'Soochipara Falls', 'Banasura Sagar Dam', 'Chembra Peak'],
    travelTime: '5 hours from Kochi',
    distance: '260 km from Kochi'
  },
  'Kovalam': {
    lat: 8.4004,
    lng: 76.9779,
    description: 'Beautiful beach destination with lighthouse and resorts',
    highlights: ['Lighthouse Beach', 'Hawah Beach', 'Samudra Beach', 'Vizhinjam Fishing Harbor'],
    travelTime: '30 mins from Trivandrum',
    distance: '16 km from Trivandrum'
  },
  'Kumarakom': {
    lat: 9.6177,
    lng: 76.4280,
    description: 'Backwater destination with bird sanctuary and luxury resorts',
    highlights: ['Kumarakom Bird Sanctuary', 'Vembanad Lake', 'Traditional Houseboats', 'Pathiramanal Island'],
    travelTime: '1.5 hours from Kochi',
    distance: '65 km from Kochi'
  },
  'Varkala': {
    lat: 8.7379,
    lng: 76.7164,
    description: 'Cliff-top beach with natural springs and Ayurvedic centers',
    highlights: ['Varkala Cliff', 'Papanasam Beach', 'Sivagiri Mutt', 'Natural Springs'],
    travelTime: '1 hour from Trivandrum',
    distance: '51 km from Trivandrum'
  }
};

export const GoogleMaps: React.FC<GoogleMapsProps> = ({ 
  destination, 
  source = 'Your Location',
  showRoute = false,
  className = ''
}) => {
  const [mapView, setMapView] = React.useState<'satellite' | 'terrain' | 'roadmap'>('roadmap');
  const [showDirections, setShowDirections] = React.useState(false);
  
  const locationData = keraladestinations[destination];
  
  if (!locationData) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p>Location data not available for {destination}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Mock Google Maps Embed URL (replace with real API key)
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(destination + ', Kerala, India')}&zoom=12&maptype=${mapView}`;
  
  // Mock directions URL
  const directionsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(source)}/${encodeURIComponent(destination + ', Kerala, India')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {destination}
              </CardTitle>
              <CardDescription>{locationData.description}</CardDescription>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Compass className="h-3 w-3" />
              Kerala
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Map Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={mapView === 'roadmap' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMapView('roadmap')}
              >
                Map
              </Button>
              <Button
                variant={mapView === 'satellite' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMapView('satellite')}
              >
                <Layers className="h-4 w-4 mr-1" />
                Satellite
              </Button>
              <Button
                variant={mapView === 'terrain' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMapView('terrain')}
              >
                Terrain
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDirections(!showDirections)}
              className="flex items-center gap-2"
            >
              <Route className="h-4 w-4" />
              {showDirections ? 'Hide Route' : 'Show Route'}
            </Button>
          </div>

          {/* Mock Map Display */}
          <div className="relative rounded-lg overflow-hidden border bg-muted/20 h-64">
            {/* This would be the actual Google Maps embed in production */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rotate-45" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{destination}</p>
                  <p className="text-sm text-muted-foreground">
                    {locationData.lat.toFixed(4)}, {locationData.lng.toFixed(4)}
                  </p>
                </div>
                <Badge variant="outline" className="bg-white/80">
                  {mapView} view
                </Badge>
              </div>
            </div>
            
            {/* Overlay for production note */}
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
              Demo Map - Replace with Google Maps API
            </div>
          </div>

          {/* Route Information */}
          {showDirections && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-muted/50 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <Route className="h-4 w-4 text-primary" />
                Route from {source} to {destination}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{locationData.travelTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span>{locationData.distance}</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.open(directionsUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in Google Maps
              </Button>
            </motion.div>
          )}

          {/* Location Highlights */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              Key Attractions
            </h4>
            <div className="flex flex-wrap gap-2">
              {locationData.highlights.map((highlight, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => window.open(directionsUrl, '_blank')}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(destination + ' attractions')}`, '_blank')}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Explore Area
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};