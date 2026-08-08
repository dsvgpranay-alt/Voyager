import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Clock, Camera, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TravelData } from './TravelForm';
import { SeasonalRecommendations } from './SeasonalRecommendations';

interface Place {
  name: string;
  description: string;
  category: string;
  timeToSpend: string;
  rating: number;
  highlights: string[];
  image: string;
  seasons?: string[]; // Recommended seasons for this place
}

interface PlacesToVisitProps {
  destination: string;
  travelData?: TravelData;
}

const placesData: Record<string, Place[]> = {
  'Kochi (Cochin)': [
    {
      name: 'Fort Kochi',
      description: 'Historic area with colonial architecture, Chinese fishing nets, and art galleries',
      category: 'Historical',
      timeToSpend: '4-5 hours',
      rating: 4.5,
      highlights: ['Chinese Fishing Nets', 'St. Francis Church', 'Dutch Palace'],
      image: 'https://images.unsplash.com/photo-1654530050931-3b02b28570c1'
    },
    {
      name: 'Mattancherry Palace',
      description: 'Portuguese palace showcasing Kerala murals and royal artifacts',
      category: 'Palace',
      timeToSpend: '2-3 hours',
      rating: 4.2,
      highlights: ['Kerala Murals', 'Royal Artifacts', 'Architecture'],
      image: 'https://images.unsplash.com/photo-1654530050931-3b02b28570c1'
    },
    {
      name: 'Marine Drive',
      description: 'Scenic walkway along Vembanad Lake with evening boat rides',
      category: 'Waterfront',
      timeToSpend: '2-3 hours',
      rating: 4.3,
      highlights: ['Lake Views', 'Boat Rides', 'Street Food'],
      image: 'https://images.unsplash.com/photo-1654530050931-3b02b28570c1'
    }
  ],
  'Munnar': [
    {
      name: 'Tea Gardens',
      description: 'Endless rolling hills covered with lush green tea plantations',
      category: 'Nature',
      timeToSpend: '6-8 hours',
      rating: 4.7,
      highlights: ['Tea Tasting', 'Photography', 'Scenic Views'],
      image: 'https://images.unsplash.com/photo-1673118857471-34bedcb90ee7'
    },
    {
      name: 'Eravikulam National Park',
      description: 'Home to the endangered Nilgiri Tahr and scenic mountain views',
      category: 'Wildlife',
      timeToSpend: '4-5 hours',
      rating: 4.4,
      highlights: ['Nilgiri Tahr', 'Trekking', 'Photography'],
      image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa'
    },
    {
      name: 'Mattupetty Dam',
      description: 'Beautiful dam with boating facilities surrounded by hills',
      category: 'Dam',
      timeToSpend: '2-3 hours',
      rating: 4.1,
      highlights: ['Boating', 'Mountain Views', 'Echo Point'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
    }
  ],
  'Alleppey (Alappuzha)': [
    {
      name: 'Backwater Cruise',
      description: 'Traditional houseboat experience through serene backwaters',
      category: 'Backwaters',
      timeToSpend: 'Full Day',
      rating: 4.8,
      highlights: ['Houseboat Stay', 'Local Cuisine', 'Village Life'],
      image: 'https://images.unsplash.com/photo-1654530050931-3b02b28570c1'
    },
    {
      name: 'Alleppey Beach',
      description: 'Beautiful beach with lighthouse and water sports activities',
      category: 'Beach',
      timeToSpend: '3-4 hours',
      rating: 4.2,
      highlights: ['Lighthouse', 'Water Sports', 'Sunset Views'],
      image: 'https://images.unsplash.com/photo-1615289139857-99b7eb0702dd'
    },
    {
      name: 'Kuttanad',
      description: 'Below sea level farming region with unique agricultural practices',
      category: 'Agricultural',
      timeToSpend: '4-5 hours',
      rating: 4.0,
      highlights: ['Rice Fields', 'Village Tour', 'Local Culture'],
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176'
    }
  ],
  'Thekkady (Periyar)': [
    {
      name: 'Periyar Wildlife Sanctuary',
      description: 'Famous wildlife sanctuary known for elephants and boat safaris',
      category: 'Wildlife',
      timeToSpend: 'Full Day',
      rating: 4.6,
      highlights: ['Elephant Spotting', 'Boat Safari', 'Nature Walk'],
      image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa'
    },
    {
      name: 'Spice Plantations',
      description: 'Aromatic spice gardens with guided tours and tastings',
      category: 'Agriculture',
      timeToSpend: '3-4 hours',
      rating: 4.3,
      highlights: ['Spice Tour', 'Shopping', 'Educational'],
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'
    }
  ],
  'Wayanad': [
    {
      name: 'Chembra Peak',
      description: 'Highest peak in Wayanad with heart-shaped lake and trekking trails',
      category: 'Trekking',
      timeToSpend: '6-7 hours',
      rating: 4.5,
      highlights: ['Heart Lake', 'Trekking', 'Panoramic Views'],
      image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa'
    },
    {
      name: 'Soochipara Falls',
      description: 'Three-tiered waterfall perfect for swimming and rock climbing',
      category: 'Waterfall',
      timeToSpend: '3-4 hours',
      rating: 4.4,
      highlights: ['Swimming', 'Rock Climbing', 'Photography'],
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0'
    }
  ],
  'Kovalam': [
    {
      name: 'Lighthouse Beach',
      description: 'Famous crescent-shaped beach with iconic lighthouse',
      category: 'Beach',
      timeToSpend: '4-5 hours',
      rating: 4.4,
      highlights: ['Lighthouse', 'Swimming', 'Ayurvedic Massage'],
      image: 'https://images.unsplash.com/photo-1615289139857-99b7eb0702dd'
    },
    {
      name: 'Hawah Beach',
      description: 'Secluded beach known for topless sunbathing and water sports',
      category: 'Beach',
      timeToSpend: '2-3 hours',
      rating: 4.1,
      highlights: ['Water Sports', 'Sunbathing', 'Beach Shacks'],
      image: 'https://images.unsplash.com/photo-1615289139857-99b7eb0702dd'
    }
  ],
  'Kumarakom': [
    {
      name: 'Kumarakom Bird Sanctuary',
      description: 'Paradise for bird watchers with migratory birds',
      category: 'Bird Watching',
      timeToSpend: '3-4 hours',
      rating: 4.3,
      highlights: ['Bird Watching', 'Photography', 'Nature Walk'],
      image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa'
    },
    {
      name: 'Vembanad Lake',
      description: 'Largest lake in Kerala perfect for houseboat experiences',
      category: 'Lake',
      timeToSpend: 'Half Day',
      rating: 4.5,
      highlights: ['Houseboat', 'Fishing', 'Sunset Views'],
      image: 'https://images.unsplash.com/photo-1654530050931-3b02b28570c1'
    }
  ]
};

// Default places for destinations not in the list
const defaultPlaces: Place[] = [
  {
    name: 'Local Market',
    description: 'Explore local markets for authentic Kerala products and spices',
    category: 'Shopping',
    timeToSpend: '2-3 hours',
    rating: 4.0,
    highlights: ['Local Products', 'Spices', 'Handicrafts'],
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'
  },
  {
    name: 'Traditional Kerala Cuisine',
    description: 'Experience authentic Kerala food at local restaurants',
    category: 'Food',
    timeToSpend: '1-2 hours',
    rating: 4.2,
    highlights: ['Kerala Meals', 'Seafood', 'Local Flavors'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe'
  }
];

function getSeason(date: Date): string {
  const month = date.getMonth(); // 0-based (0 = January)
  
  if (month >= 11 || month <= 1) return 'winter'; // Dec, Jan, Feb
  if (month >= 2 && month <= 4) return 'summer'; // Mar, Apr, May
  return 'monsoon'; // Jun, Jul, Aug, Sep, Oct, Nov
}

export function PlacesToVisit({ destination, travelData }: PlacesToVisitProps) {
  const places = placesData[destination] || defaultPlaces;

  return (
    <div className="space-y-6">
      {/* Seasonal Recommendations */}
      {travelData && travelData.startDate && (
        <SeasonalRecommendations 
          travelData={travelData} 
          destination={destination} 
        />
      )}

      {/* Places to Visit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Places to Visit in {destination}
          </CardTitle>
        </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place, index) => (
            <div key={index} className="group cursor-pointer">
              <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                      {place.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{place.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{place.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {place.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{place.timeToSpend}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Highlights:</p>
                    <div className="flex flex-wrap gap-1">
                      {place.highlights.slice(0, 3).map((highlight, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Camera className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Pro Tip for {destination}
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {destination.includes('Kochi') && 'Best visited during sunset for magical lighting at Fort Kochi and Chinese Fishing Nets.'}
                {destination.includes('Munnar') && 'Visit during early morning hours for the best views and tea garden photography.'}
                {destination.includes('Alleppey') && 'Book houseboat stays in advance, especially during peak season (December-February).'}
                {destination.includes('Thekkady') && 'Early morning is the best time for wildlife spotting in Periyar Wildlife Sanctuary.'}
                {destination.includes('Wayanad') && 'Carry trekking gear and start early for Chembra Peak to avoid afternoon heat.'}
                {destination.includes('Kovalam') && 'Best enjoyed during October to March when the weather is pleasant for beach activities.'}
                {destination.includes('Kumarakom') && 'Visit the bird sanctuary during early morning hours for the best bird watching experience.'}
                {!destination.includes('Kochi') && !destination.includes('Munnar') && !destination.includes('Alleppey') && 
                 !destination.includes('Thekkady') && !destination.includes('Wayanad') && !destination.includes('Kovalam') && 
                 !destination.includes('Kumarakom') && 'Explore local markets and try authentic Kerala cuisine for the best cultural experience.'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      </Card>
    </div>
  );
}