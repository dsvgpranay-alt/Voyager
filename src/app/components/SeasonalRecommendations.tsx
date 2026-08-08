import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Thermometer, 
  Umbrella, 
  Shirt, 
  Camera, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Droplets
} from 'lucide-react';
import { TravelData } from './TravelForm';

interface SeasonalRecommendationsProps {
  travelData: TravelData;
  destination: string;
}

interface SeasonInfo {
  name: string;
  icon: React.ReactNode;
  months: string[];
  weather: string;
  temperature: string;
  rainfall: string;
  description: string;
  advantages: string[];
  considerations: string[];
  bestActivities: string[];
  clothing: string[];
  budgetImpact: 'Low' | 'Medium' | 'High';
  crowdLevel: 'Low' | 'Medium' | 'High';
  color: string;
}

const seasons: Record<string, SeasonInfo> = {
  winter: {
    name: 'Winter',
    icon: <Sun className="h-5 w-5" />,
    months: ['December', 'January', 'February'],
    weather: 'Pleasant and Dry',
    temperature: '23°C - 32°C',
    rainfall: 'Minimal',
    description: 'Perfect weather for all outdoor activities with comfortable temperatures and clear skies.',
    advantages: [
      'Ideal weather for sightseeing',
      'Perfect for beach activities',
      'Clear skies for photography',
      'Comfortable for trekking',
      'All transportation runs smoothly'
    ],
    considerations: [
      'Peak tourist season - book accommodations early',
      'Higher prices for hotels and activities',
      'Popular destinations may be crowded',
      'Flight prices are at their highest'
    ],
    bestActivities: [
      'Beach visits and water sports',
      'Houseboat cruises',
      'Wildlife safaris',
      'Trekking and hiking',
      'Cultural tours',
      'Photography tours'
    ],
    clothing: [
      'Light cotton clothes',
      'Comfortable walking shoes',
      'Sun hat and sunglasses',
      'Light sweater for evenings',
      'Swimwear for beaches'
    ],
    budgetImpact: 'High',
    crowdLevel: 'High',
    color: 'text-orange-600 bg-orange-50 border-orange-200'
  },
  summer: {
    name: 'Summer',
    icon: <Thermometer className="h-5 w-5" />,
    months: ['March', 'April', 'May'],
    weather: 'Hot and Humid',
    temperature: '28°C - 37°C',
    rainfall: 'Occasional',
    description: 'Hot and humid weather, but perfect for hill stations like Munnar and Wayanad.',
    advantages: [
      'Great weather in hill stations',
      'Lower accommodation prices',
      'Less crowded destinations',
      'Perfect for Ayurvedic treatments',
      'Excellent for tea garden visits'
    ],
    considerations: [
      'Very hot in coastal areas',
      'Beach activities best in early morning/evening',
      'Carry plenty of water',
      'Prefer air-conditioned transportation'
    ],
    bestActivities: [
      'Hill station visits (Munnar, Wayanad)',
      'Tea plantation tours',
      'Ayurvedic spa treatments',
      'Early morning wildlife safaris',
      'Indoor cultural activities',
      'Cave exploration'
    ],
    clothing: [
      'Light, breathable cotton clothes',
      'Sun protection gear',
      'Comfortable sandals',
      'Light jacket for hill stations',
      'Plenty of sunscreen'
    ],
    budgetImpact: 'Medium',
    crowdLevel: 'Low',
    color: 'text-red-600 bg-red-50 border-red-200'
  },
  monsoon: {
    name: 'Monsoon',
    icon: <CloudRain className="h-5 w-5" />,
    months: ['June', 'July', 'August', 'September', 'October', 'November'],
    weather: 'Heavy Rainfall',
    temperature: '24°C - 30°C',
    rainfall: 'Heavy',
    description: 'Lush green landscapes with heavy rainfall. Perfect for experiencing Kerala\'s natural beauty.',
    advantages: [
      'Lush green landscapes',
      'Waterfalls at their best',
      'Best rates for accommodations',
      'Authentic Ayurvedic season',
      'Fewer tourists, peaceful atmosphere',
      'Perfect for indoor cultural experiences'
    ],
    considerations: [
      'Heavy rainfall can disrupt travel plans',
      'Some outdoor activities may be limited',
      'Carry good rain gear',
      'Roads in rural areas may be challenging',
      'Beach activities are limited'
    ],
    bestActivities: [
      'Ayurvedic treatments and spa',
      'Backwater cruises in covered boats',
      'Waterfall visits',
      'Cultural center visits',
      'Traditional art performances',
      'Spice plantation tours (covered)',
      'Indoor cooking classes'
    ],
    clothing: [
      'Waterproof rain jacket',
      'Quick-dry clothing',
      'Waterproof footwear',
      'Umbrella',
      'Extra dry clothes',
      'Waterproof bag for electronics'
    ],
    budgetImpact: 'Low',
    crowdLevel: 'Low',
    color: 'text-blue-600 bg-blue-50 border-blue-200'
  }
};

// Destination-specific seasonal recommendations
const destinationSeasonalTips: Record<string, Record<string, string[]>> = {
  'Munnar': {
    winter: ['Perfect weather for tea garden walks', 'Clear mountain views', 'Ideal for Eravikulam National Park'],
    summer: ['Best time to visit - cool climate', 'Tea gardens at their greenest', 'Perfect for trekking'],
    monsoon: ['Misty mountain views', 'Tea processing season', 'Indoor tea museum visits recommended']
  },
  'Alleppey (Alappuzha)': {
    winter: ['Perfect for houseboat stays', 'Calm backwaters', 'Ideal sunset cruises'],
    summer: ['Early morning/evening boat rides', 'Stay in AC houseboats', 'Focus on shaded areas'],
    monsoon: ['Lush green backwaters', 'Covered houseboat experiences', 'Best rates available']
  },
  'Kochi (Cochin)': {
    winter: ['Perfect for Fort Kochi walks', 'Best time for Chinese fishing nets photography', 'Comfortable sightseeing'],
    summer: ['Visit air-conditioned museums', 'Early morning heritage walks', 'Focus on indoor attractions'],
    monsoon: ['Visit covered spice markets', 'Indoor cultural performances', 'Monsoon photography opportunities']
  },
  'Kovalam': {
    winter: ['Perfect beach weather', 'Ideal for water sports', 'Best time for sunbathing'],
    summer: ['Early morning/evening beach visits', 'Focus on Ayurvedic treatments', 'Stay hydrated'],
    monsoon: ['Dramatic beach views', 'Best for Ayurvedic treatments', 'Indoor resort activities']
  },
  'Wayanad': {
    winter: ['Perfect for trekking', 'Clear views from peaks', 'Ideal wildlife spotting'],
    summer: ['Cooler than plains', 'Great for cave exploration', 'Best time for plantation visits'],
    monsoon: ['Waterfalls at full flow', 'Lush forest treks', 'Stay in covered accommodations']
  },
  'Thekkady (Periyar)': {
    winter: ['Best wildlife viewing', 'Clear boat safaris', 'Perfect for spice tours'],
    summer: ['Early morning safaris', 'Cool spice plantation visits', 'Focus on shaded activities'],
    monsoon: ['Lush forest cover', 'Waterfalls nearby', 'Indoor spice processing tours']
  }
};

function getSeason(date: Date): string {
  const month = date.getMonth(); // 0-based (0 = January)
  
  if (month >= 11 || month <= 1) return 'winter'; // Dec, Jan, Feb
  if (month >= 2 && month <= 4) return 'summer'; // Mar, Apr, May
  return 'monsoon'; // Jun, Jul, Aug, Sep, Oct, Nov
}

export function SeasonalRecommendations({ travelData, destination }: SeasonalRecommendationsProps) {
  if (!travelData.startDate) return null;

  const season = getSeason(travelData.startDate);
  const seasonInfo = seasons[season];
  const destinationTips = destinationSeasonalTips[destination]?.[season] || [];

  return (
    <div className="space-y-6">
      {/* Season Overview */}
      <Card className={`border-2 ${seasonInfo.color}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {seasonInfo.icon}
            <span>Traveling in {seasonInfo.name} Season</span>
            <Badge variant="outline" className="ml-auto">
              {travelData.startDate.toLocaleDateString('en-US', { month: 'long' })}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {seasonInfo.description}
          </p>
          
          {/* Weather Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-background">
              <Thermometer className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Temperature</p>
                <p className="text-xs text-muted-foreground">{seasonInfo.temperature}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-background">
              <Cloud className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Weather</p>
                <p className="text-xs text-muted-foreground">{seasonInfo.weather}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-background">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Rainfall</p>
                <p className="text-xs text-muted-foreground">{seasonInfo.rainfall}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">Budget Impact:</span>
              <Badge variant={seasonInfo.budgetImpact === 'High' ? 'destructive' : seasonInfo.budgetImpact === 'Medium' ? 'default' : 'secondary'}>
                {seasonInfo.budgetImpact}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Crowd Level:</span>
              <Badge variant={seasonInfo.crowdLevel === 'High' ? 'destructive' : seasonInfo.crowdLevel === 'Medium' ? 'default' : 'secondary'}>
                {seasonInfo.crowdLevel}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Destination-Specific Tips */}
      {destinationTips.length > 0 && (
        <Alert>
          <MapPin className="h-4 w-4" />
          <AlertDescription>
            <strong>{destination} in {seasonInfo.name}:</strong>
            <ul className="mt-2 space-y-1">
              {destinationTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Advantages & Considerations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Seasonal Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {seasonInfo.advantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{advantage}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              Things to Consider
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {seasonInfo.considerations.map((consideration, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{consideration}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Best Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Best Activities for {seasonInfo.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {seasonInfo.bestActivities.map((activity, index) => (
              <Badge key={index} variant="outline" className="justify-center p-2">
                {activity}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Packing Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shirt className="h-5 w-5" />
            What to Pack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {seasonInfo.clothing.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                {item.toLowerCase().includes('rain') || item.toLowerCase().includes('umbrella') ? (
                  <Umbrella className="h-4 w-4 text-blue-500" />
                ) : (
                  <Shirt className="h-4 w-4 text-gray-500" />
                )}
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Monsoon Alert */}
      {season === 'monsoon' && (
        <Alert className="border-blue-200 bg-blue-50">
          <CloudRain className="h-4 w-4" />
          <AlertDescription>
            <strong>Monsoon Travel Alert:</strong> Kerala receives heavy rainfall during this period. 
            While it's beautiful with lush landscapes, keep backup indoor activities planned and 
            carry proper rain gear. Many consider this the best time for Ayurvedic treatments!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}