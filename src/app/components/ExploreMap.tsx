import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { GoogleMaps } from './GoogleMaps';
import { 
  MapPin, 
  Search, 
  Filter, 
  Mountain, 
  Waves, 
  TreePine, 
  Building2,
  Compass,
  Globe
} from 'lucide-react';
import { motion } from 'motion/react';

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
  'Varkala',
  'Kottayam',
  'Palakkad',
  'Kannur',
  'Idukki',
  'Kasaragod'
];

const destinationCategories = {
  'Beach': ['Kovalam', 'Varkala', 'Kozhikode (Calicut)'],
  'Hill Station': ['Munnar', 'Wayanad', 'Idukki'],
  'Backwaters': ['Alleppey (Alappuzha)', 'Kumarakom', 'Kottayam'],
  'Wildlife': ['Thekkady (Periyar)', 'Wayanad', 'Idukki'],
  'Cultural': ['Kochi (Cochin)', 'Thrissur', 'Kannur'],
  'Adventure': ['Wayanad', 'Idukki', 'Thekkady (Periyar)']
};

export function ExploreMap() {
  const [selectedDestination, setSelectedDestination] = React.useState<string>('Kochi (Cochin)');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [sourceLocation, setSourceLocation] = React.useState('');

  const filteredDestinations = React.useMemo(() => {
    let filtered = keralaDestinations;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(dest => 
        dest.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryDestinations = destinationCategories[selectedCategory as keyof typeof destinationCategories];
      filtered = filtered.filter(dest => categoryDestinations.includes(dest));
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Beach': return <Waves className="h-4 w-4" />;
      case 'Hill Station': return <Mountain className="h-4 w-4" />;
      case 'Backwaters': return <Waves className="h-4 w-4" />;
      case 'Wildlife': return <TreePine className="h-4 w-4" />;
      case 'Cultural': return <Building2 className="h-4 w-4" />;
      case 'Adventure': return <Compass className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getDestinationCategories = (destination: string) => {
    return Object.entries(destinationCategories)
      .filter(([_, destinations]) => destinations.includes(destination))
      .map(([category]) => category);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center">
            <Globe className="h-6 w-6 text-primary" />
            Explore Kerala Destinations
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Discover the beauty of God's Own Country through interactive maps
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Destination Selector */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Destinations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="space-y-2">
                <Input
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.keys(destinationCategories).map(category => (
                      <SelectItem key={category} value={category}>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(category)}
                          {category}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Source Location Input */}
              <div className="space-y-2">
                <Input
                  placeholder="Your starting location (optional)"
                  value={sourceLocation}
                  onChange={(e) => setSourceLocation(e.target.value)}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Destination List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Destinations ({filteredDestinations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredDestinations.map((destination) => (
                  <motion.div
                    key={destination}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant={selectedDestination === destination ? 'default' : 'ghost'}
                      size="sm"
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => setSelectedDestination(destination)}
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-medium">{destination}</span>
                        <div className="flex flex-wrap gap-1">
                          {getDestinationCategories(destination).map(category => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              <span className="mr-1">{getCategoryIcon(category)}</span>
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
                {filteredDestinations.length === 0 && (
                  <div className="text-center text-muted-foreground py-4">
                    <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No destinations found</p>
                    <p className="text-xs">Try adjusting your search or filter</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Quick Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(destinationCategories).map(([category, destinations]) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    className="flex items-center gap-1 text-xs"
                    onClick={() => {
                      setSelectedCategory(category);
                      if (destinations.length > 0) {
                        setSelectedDestination(destinations[0]);
                      }
                    }}
                  >
                    {getCategoryIcon(category)}
                    {category}
                    <Badge variant="secondary" className="ml-1">
                      {destinations.length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Map Area */}
        <div className="lg:col-span-2">
          <GoogleMaps 
            destination={selectedDestination}
            source={sourceLocation}
            showRoute={!!sourceLocation}
            className="sticky top-4"
          />
        </div>
      </div>

      {/* Information Footer */}
      <Card className="border-amber-500/20 bg-amber-50 dark:bg-amber-950/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Setup Instructions:</strong> To use real Google Maps, replace 'YOUR_GOOGLE_MAPS_API_KEY' 
              in the GoogleMaps component with your actual Google Maps API key.
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400">
              Get your API key from: Google Cloud Console → APIs & Services → Credentials → Create Credentials
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}