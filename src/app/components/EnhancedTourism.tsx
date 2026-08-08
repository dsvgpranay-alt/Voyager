import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Camera, 
  Mountain, 
  Waves, 
  TreePine,
  Sun,
  Utensils,
  Car,
  Plane,
  Train,
  Ship,
  Calendar,
  Heart,
  Info,
  Award,
  Compass,
  Binoculars,
  Eye
} from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TravelData } from './TravelForm';
import { SeasonalRecommendations } from './SeasonalRecommendations';

interface Attraction {
  id: string;
  name: string;
  type: 'nature' | 'cultural' | 'adventure' | 'spiritual' | 'beach' | 'heritage';
  rating: number;
  duration: string;
  bestTime: string;
  entryFee: number;
  description: string;
  highlights: string[];
  image: string;
  distance: string;
  coordinates: { lat: number; lng: number };
}

interface Experience {
  id: string;
  name: string;
  type: 'activity' | 'tour' | 'workshop' | 'cuisine' | 'wellness';
  price: number;
  duration: string;
  groupSize: number;
  rating: number;
  description: string;
  inclusions: string[];
  image: string;
  availability: string;
}

interface EnhancedTourismProps {
  destination: string;
  travelData?: TravelData;
  onBack: () => void;
}

export function EnhancedTourism({ destination, travelData, onBack }: EnhancedTourismProps) {
  const [selectedTab, setSelectedTab] = React.useState('attractions');
  const [favorites, setFavorites] = React.useState<string[]>([]);

  // Destination-specific attractions
  const getAttractionsByDestination = (dest: string): Attraction[] => {
    const attractionsMap: Record<string, Attraction[]> = {
      'Kochi (Cochin)': [
        {
          id: 'fort-kochi',
          name: 'Fort Kochi',
          type: 'heritage',
          rating: 4.6,
          duration: '3-4 hours',
          bestTime: 'Morning/Evening',
          entryFee: 0,
          description: 'Historic area with colonial architecture, Chinese fishing nets, and cultural heritage.',
          highlights: ['Chinese Fishing Nets', 'St. Francis Church', 'Dutch Palace', 'Jew Town'],
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3J0JTIwa29jaGl8ZW58MXx8fHwxNzU3MzI1NDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          distance: '0 km',
          coordinates: { lat: 9.9647, lng: 76.2424 }
        },
        {
          id: 'mattancherry-palace',
          name: 'Mattancherry Palace',
          type: 'heritage',
          rating: 4.4,
          duration: '1-2 hours',
          bestTime: 'Morning',
          entryFee: 15,
          description: 'Also known as Dutch Palace, featuring beautiful murals and royal artifacts.',
          highlights: ['Royal Murals', 'Historical Artifacts', 'Traditional Architecture'],
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxhY2UlMjBrZXJhbGF8ZW58MXx8fHwxNzU3MzI1NDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          distance: '2 km',
          coordinates: { lat: 9.9580, lng: 76.2597 }
        }
      ],
      'Munnar': [
        {
          id: 'tea-gardens',
          name: 'Tea Gardens',
          type: 'nature',
          rating: 4.8,
          duration: '2-3 hours',
          bestTime: 'Morning',
          entryFee: 0,
          description: 'Sprawling tea plantations with scenic views and fresh mountain air.',
          highlights: ['Tea Factory Visit', 'Scenic Views', 'Photography', 'Tea Tasting'],
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBnYXJkZW5zJTIwbXVubmFyfGVufDF8fHx8MTc1NzMyNTQxNnww&ixlib=rb-4.1.0&q=80&w=1080',
          distance: '5 km',
          coordinates: { lat: 10.0889, lng: 77.0595 }
        },
        {
          id: 'eravikulam-park',
          name: 'Eravikulam National Park',
          type: 'nature',
          rating: 4.7,
          duration: '4-5 hours',
          bestTime: 'Morning',
          entryFee: 125,
          description: 'Home to endangered Nilgiri Tahr and scenic mountain landscapes.',
          highlights: ['Nilgiri Tahr', 'Anamudi Peak', 'Endemic Flora', 'Trekking'],
          image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXRpb25hbCUyMHBhcmslMjBrZXJhbGF8ZW58MXx8fHwxNzU3MzI1NDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          distance: '13 km',
          coordinates: { lat: 10.1367, lng: 77.0753 }
        }
      ],
      'Alleppey (Alappuzha)': [
        {
          id: 'backwaters',
          name: 'Alleppey Backwaters',
          type: 'nature',
          rating: 4.9,
          duration: 'Full day',
          bestTime: 'Morning to Evening',
          entryFee: 0,
          description: 'Network of canals, lagoons, and lakes with traditional houseboats.',
          highlights: ['Houseboat Cruise', 'Village Life', 'Sunset Views', 'Local Cuisine'],
          image: 'https://images.unsplash.com/photo-1654530050931-3b02b28570c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGxlcHBleSUyMGJhY2t3YXRlcnN8ZW58MXx8fHwxNzU3MzI1NDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          distance: '0 km',
          coordinates: { lat: 9.4981, lng: 76.3388 }
        }
      ]
    };

    return attractionsMap[dest] || [];
  };

  // Destination-specific experiences
  const getExperiencesByDestination = (dest: string): Experience[] => {
    const experiencesMap: Record<string, Experience[]> = {
      'Kochi (Cochin)': [
        {
          id: 'kathakali-show',
          name: 'Traditional Kathakali Performance',
          type: 'activity',
          price: 350,
          duration: '1.5 hours',
          groupSize: 50,
          rating: 4.7,
          description: 'Experience the classical dance-drama of Kerala with elaborate costumes and makeup.',
          inclusions: ['Performance', 'Makeup Demo', 'Cultural Explanation', 'Photo Session'],
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXRoYWthbGl8ZW58MXx8fHwxNzU3MzI1NDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          availability: 'Daily 6:30 PM'
        },
        {
          id: 'spice-tour',
          name: 'Spice Market Walking Tour',
          type: 'tour',
          price: 450,
          duration: '2 hours',
          groupSize: 15,
          rating: 4.5,
          description: 'Explore the aromatic spice markets and learn about Kerala\'s spice trade history.',
          inclusions: ['Guide', 'Spice Tasting', 'Market Tour', 'Recipe Card'],
          image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZSUyMG1hcmtldHxlbnwxfHx8fDE3NTczMjU0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
          availability: 'Daily 9:00 AM, 4:00 PM'
        }
      ],
      'Munnar': [
        {
          id: 'tea-tasting',
          name: 'Tea Factory Tour & Tasting',
          type: 'tour',
          price: 250,
          duration: '2 hours',
          groupSize: 20,
          rating: 4.6,
          description: 'Learn about tea processing and taste different varieties of Munnar tea.',
          inclusions: ['Factory Tour', 'Tea Tasting', 'Take-home Sample', 'Guide'],
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBmYWN0b3J5fGVufDF8fHx8MTc1NzMyNTQxNnww&ixlib=rb-4.1.0&q=80&w=1080',
          availability: 'Daily 10:00 AM, 2:00 PM'
        }
      ],
      'Alleppey (Alappuzha)': [
        {
          id: 'houseboat-cruise',
          name: 'Traditional Houseboat Experience',
          type: 'activity',
          price: 3500,
          duration: '22 hours',
          groupSize: 8,
          rating: 4.8,
          description: 'Overnight houseboat cruise through the serene backwaters of Alleppey.',
          inclusions: ['Houseboat Stay', 'All Meals', 'Sunset Cruise', 'Village Walk'],
          image: 'https://images.unsplash.com/photo-1654530050931-3b02b28570c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZWJvYXQlMjBrZXJhbGF8ZW58MXx8fHwxNzU3MzI1NDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
          availability: 'Daily (advance booking required)'
        }
      ]
    };

    return experiencesMap[dest] || [];
  };

  const attractions = getAttractionsByDestination(destination);
  const experiences = getExperiencesByDestination(destination);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      nature: TreePine,
      cultural: Award,
      adventure: Mountain,
      spiritual: Sun,
      beach: Waves,
      heritage: Compass,
      activity: Camera,
      tour: Binoculars,
      workshop: Users,
      cuisine: Utensils,
      wellness: Heart
    };
    return icons[type as keyof typeof icons] || MapPin;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      nature: 'text-green-600',
      cultural: 'text-purple-600',
      adventure: 'text-orange-600',
      spiritual: 'text-yellow-600',
      beach: 'text-blue-600',
      heritage: 'text-brown-600',
      activity: 'text-pink-600',
      tour: 'text-indigo-600',
      workshop: 'text-teal-600',
      cuisine: 'text-red-600',
      wellness: 'text-emerald-600'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Button variant="outline" onClick={onBack} className="mb-4">
          ← Back to Planning
        </Button>
        
        <div className="flex items-center justify-center gap-3">
          <MapPin className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Explore {destination}</h1>
            <p className="text-muted-foreground">
              Discover attractions, experiences, and hidden gems
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="attractions">Attractions</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Guide</TabsTrigger>
          <TabsTrigger value="practical">Practical Info</TabsTrigger>
        </TabsList>

        {/* Attractions Tab */}
        <TabsContent value="attractions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction) => {
              const TypeIcon = getTypeIcon(attraction.type);
              return (
                <motion.div
                  key={attraction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full">
                    <div className="relative">
                      <ImageWithFallback
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      
                      {/* Type Badge */}
                      <Badge className="absolute top-2 left-2 bg-white/90 text-gray-800">
                        <TypeIcon className={`h-3 w-3 mr-1 ${getTypeColor(attraction.type)}`} />
                        {attraction.type}
                      </Badge>

                      {/* Favorite Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        onClick={() => toggleFavorite(attraction.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            favorites.includes(attraction.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-500'
                          }`} 
                        />
                      </Button>

                      {/* Entry Fee */}
                      {attraction.entryFee > 0 && (
                        <Badge className="absolute bottom-2 right-2 bg-green-600 text-white">
                          ₹{attraction.entryFee}
                        </Badge>
                      )}
                      {attraction.entryFee === 0 && (
                        <Badge className="absolute bottom-2 right-2 bg-blue-600 text-white">
                          Free
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-4 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{attraction.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {attraction.description}
                        </p>
                        
                        {/* Rating and Duration */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{attraction.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {attraction.duration}
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-1 mb-3">
                          <h4 className="text-xs font-medium text-muted-foreground">Highlights:</h4>
                          <div className="flex flex-wrap gap-1">
                            {attraction.highlights.slice(0, 3).map((highlight, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Best Time and Distance */}
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div>
                            <span className="font-medium">Best Time:</span> {attraction.bestTime}
                          </div>
                          <div>
                            <span className="font-medium">Distance:</span> {attraction.distance}
                          </div>
                        </div>
                      </div>

                      <Button className="w-full mt-4" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        View on Map
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {attractions.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No attractions found</h3>
              <p className="text-muted-foreground">
                We're working on adding more attractions for {destination}.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Experiences Tab */}
        <TabsContent value="experiences" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((experience) => {
              const TypeIcon = getTypeIcon(experience.type);
              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full">
                    <div className="relative">
                      <ImageWithFallback
                        src={experience.image}
                        alt={experience.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      
                      <Badge className="absolute top-2 left-2 bg-white/90 text-gray-800">
                        <TypeIcon className={`h-3 w-3 mr-1 ${getTypeColor(experience.type)}`} />
                        {experience.type}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        onClick={() => toggleFavorite(experience.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            favorites.includes(experience.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-500'
                          }`} 
                        />
                      </Button>
                    </div>

                    <CardContent className="p-4 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{experience.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {experience.description}
                        </p>
                        
                        {/* Price and Rating */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-xl font-bold text-primary">
                            ₹{experience.price}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{experience.rating}</span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {experience.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Max {experience.groupSize}
                          </div>
                        </div>

                        {/* Inclusions */}
                        <div className="space-y-1 mb-3">
                          <h4 className="text-xs font-medium text-muted-foreground">Includes:</h4>
                          <ul className="text-xs space-y-1">
                            {experience.inclusions.slice(0, 3).map((inclusion, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <div className="h-1 w-1 bg-green-500 rounded-full" />
                                {inclusion}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Availability */}
                        <div className="text-xs text-muted-foreground mb-4">
                          <span className="font-medium">Available:</span> {experience.availability}
                        </div>
                      </div>

                      <Button className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Experience
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {experiences.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No experiences found</h3>
              <p className="text-muted-foreground">
                We're working on adding more experiences for {destination}.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Seasonal Guide Tab */}
        <TabsContent value="seasonal" className="space-y-6">
          {travelData && travelData.startDate ? (
            <SeasonalRecommendations 
              travelData={travelData} 
              destination={destination} 
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Seasonal Travel Guide for {destination}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Travel Dates Required</h3>
                  <p className="text-muted-foreground mb-4">
                    To show you personalized seasonal recommendations, we need your travel dates.
                  </p>
                  <Button onClick={onBack} variant="outline">
                    ← Go Back to Add Travel Dates
                  </Button>
                </div>
                
                {/* General Seasonal Information */}
                <div className="mt-8 space-y-4">
                  <h4 className="font-semibold">General Seasonal Information for Kerala:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Sun className="h-5 w-5 text-orange-500" />
                        <h5 className="font-medium">Winter (Dec-Feb)</h5>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Perfect weather, ideal for all activities. Peak tourist season with higher prices.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Sun className="h-5 w-5 text-red-500" />
                        <h5 className="font-medium">Summer (Mar-May)</h5>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Hot and humid, great for hill stations. Lower prices and fewer crowds.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Mountain className="h-5 w-5 text-blue-500" />
                        <h5 className="font-medium">Monsoon (Jun-Nov)</h5>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Heavy rainfall, lush landscapes. Best for Ayurveda and lowest prices.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Practical Info Tab */}
        <TabsContent value="practical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transportation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Transportation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Plane className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">By Air</p>
                      <p className="text-sm text-muted-foreground">
                        Nearest airport: Kochi International Airport (26 km)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Train className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">By Train</p>
                      <p className="text-sm text-muted-foreground">
                        {destination} Railway Station
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">By Road</p>
                      <p className="text-sm text-muted-foreground">
                        Well connected by NH and state highways
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Time to Visit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Best Time to Visit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-green-600">Peak Season</p>
                    <p className="text-sm text-muted-foreground">
                      December - February (Cool & Pleasant)
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-600">Shoulder Season</p>
                    <p className="text-sm text-muted-foreground">
                      March - May, September - November
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-600">Monsoon</p>
                    <p className="text-sm text-muted-foreground">
                      June - August (Heavy rainfall)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Local Cuisine */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Must-Try Local Cuisine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Appam & Stew</Badge>
                    <Badge variant="outline">Fish Curry</Badge>
                    <Badge variant="outline">Puttu & Kadala</Badge>
                    <Badge variant="outline">Sadya</Badge>
                    <Badge variant="outline">Karimeen Fry</Badge>
                    <Badge variant="outline">Coconut Barfi</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Important Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Emergency:</span>
                    <span className="font-mono text-red-600">112</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tourist Helpline:</span>
                    <span className="font-mono text-blue-600">0471-2321132</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Police:</span>
                    <span className="font-mono">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medical Emergency:</span>
                    <span className="font-mono">108</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}