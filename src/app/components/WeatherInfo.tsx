import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  CloudSnow, 
  Wind, 
  Droplets, 
  Thermometer,
  Eye,
  Sunrise,
  Sunset,
  Umbrella,
  AlertTriangle,
  Calendar
} from 'lucide-react';

interface WeatherInfoProps {
  destination: string;
  startDate?: Date;
  endDate?: Date;
}

interface WeatherData {
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    uvIndex: number;
    sunrise: string;
    sunset: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
  }>;
  recommendations: string[];
  bestTimeToVisit: string;
  rainyDays: number;
  avgTemperature: number;
}

// Mock weather data for Kerala destinations
const weatherDatabase: Record<string, WeatherData> = {
  'Kochi (Cochin)': {
    current: {
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 75,
      windSpeed: 12,
      visibility: 8,
      uvIndex: 6,
      sunrise: '6:15 AM',
      sunset: '6:45 PM'
    },
    forecast: [
      { date: 'Today', high: 30, low: 24, condition: 'Partly Cloudy', precipitation: 20 },
      { date: 'Tomorrow', high: 29, low: 23, condition: 'Light Rain', precipitation: 60 },
      { date: 'Day 3', high: 31, low: 25, condition: 'Sunny', precipitation: 10 },
      { date: 'Day 4', high: 28, low: 22, condition: 'Thunderstorms', precipitation: 80 },
      { date: 'Day 5', high: 30, low: 24, condition: 'Partly Cloudy', precipitation: 30 }
    ],
    recommendations: [
      'Carry light cotton clothes and a light raincoat',
      'Best time for backwater cruises is early morning or evening',
      'Umbrella recommended for afternoon outings',
      'Perfect weather for exploring Fort Kochi and Chinese fishing nets'
    ],
    bestTimeToVisit: 'October to March',
    rainyDays: 12,
    avgTemperature: 27
  },
  'Munnar': {
    current: {
      temperature: 18,
      condition: 'Misty',
      humidity: 85,
      windSpeed: 8,
      visibility: 5,
      uvIndex: 4,
      sunrise: '6:20 AM',
      sunset: '6:40 PM'
    },
    forecast: [
      { date: 'Today', high: 22, low: 15, condition: 'Misty', precipitation: 40 },
      { date: 'Tomorrow', high: 20, low: 14, condition: 'Light Rain', precipitation: 70 },
      { date: 'Day 3', high: 24, low: 16, condition: 'Partly Cloudy', precipitation: 20 },
      { date: 'Day 4', high: 19, low: 13, condition: 'Foggy', precipitation: 50 },
      { date: 'Day 5', high: 23, low: 15, condition: 'Clear', precipitation: 10 }
    ],
    recommendations: [
      'Pack warm clothes including sweaters and jackets',
      'Early morning is perfect for tea plantation visits',
      'Visibility may be limited due to mist - plan accordingly',
      'Great weather for trekking and nature walks'
    ],
    bestTimeToVisit: 'September to March',
    rainyDays: 8,
    avgTemperature: 19
  },
  'Alleppey (Alappuzha)': {
    current: {
      temperature: 29,
      condition: 'Humid',
      humidity: 82,
      windSpeed: 10,
      visibility: 7,
      uvIndex: 7,
      sunrise: '6:12 AM',
      sunset: '6:48 PM'
    },
    forecast: [
      { date: 'Today', high: 32, low: 26, condition: 'Humid', precipitation: 30 },
      { date: 'Tomorrow', high: 30, low: 25, condition: 'Light Showers', precipitation: 65 },
      { date: 'Day 3', high: 33, low: 27, condition: 'Partly Cloudy', precipitation: 25 },
      { date: 'Day 4', high: 29, low: 24, condition: 'Heavy Rain', precipitation: 85 },
      { date: 'Day 5', high: 31, low: 26, condition: 'Cloudy', precipitation: 40 }
    ],
    recommendations: [
      'Houseboat stays are most comfortable in the evening',
      'Stay hydrated and use sunscreen during daytime',
      'Waterproof bags recommended for backwater tours',
      'Light, breathable fabrics are essential'
    ],
    bestTimeToVisit: 'November to February',
    rainyDays: 14,
    avgTemperature: 28
  },
  'Kovalam': {
    current: {
      temperature: 30,
      condition: 'Sunny',
      humidity: 70,
      windSpeed: 15,
      visibility: 10,
      uvIndex: 8,
      sunrise: '6:10 AM',
      sunset: '6:50 PM'
    },
    forecast: [
      { date: 'Today', high: 32, low: 26, condition: 'Sunny', precipitation: 15 },
      { date: 'Tomorrow', high: 31, low: 25, condition: 'Partly Cloudy', precipitation: 25 },
      { date: 'Day 3', high: 33, low: 27, condition: 'Clear', precipitation: 10 },
      { date: 'Day 4', high: 30, low: 24, condition: 'Light Rain', precipitation: 55 },
      { date: 'Day 5', high: 32, low: 26, condition: 'Sunny', precipitation: 20 }
    ],
    recommendations: [
      'Perfect beach weather - carry high SPF sunscreen',
      'Best surfing conditions in the morning',
      'Stay hydrated and take breaks in shade',
      'Evening beach walks are most pleasant'
    ],
    bestTimeToVisit: 'December to March',
    rainyDays: 6,
    avgTemperature: 29
  },
  'Wayanad': {
    current: {
      temperature: 22,
      condition: 'Pleasant',
      humidity: 78,
      windSpeed: 6,
      visibility: 9,
      uvIndex: 5,
      sunrise: '6:25 AM',
      sunset: '6:35 PM'
    },
    forecast: [
      { date: 'Today', high: 26, low: 18, condition: 'Pleasant', precipitation: 25 },
      { date: 'Tomorrow', high: 24, low: 17, condition: 'Light Rain', precipitation: 55 },
      { date: 'Day 3', high: 27, low: 19, condition: 'Partly Cloudy', precipitation: 30 },
      { date: 'Day 4', high: 23, low: 16, condition: 'Cloudy', precipitation: 45 },
      { date: 'Day 5', high: 28, low: 20, condition: 'Clear', precipitation: 15 }
    ],
    recommendations: [
      'Ideal weather for wildlife safaris and trekking',
      'Light jackets recommended for early morning activities',
      'Perfect conditions for visiting waterfalls',
      'Great for outdoor photography and nature walks'
    ],
    bestTimeToVisit: 'October to May',
    rainyDays: 9,
    avgTemperature: 23
  }
};

// Add default weather for destinations not in database
const getDefaultWeather = (destination: string): WeatherData => ({
  current: {
    temperature: 26,
    condition: 'Tropical',
    humidity: 75,
    windSpeed: 10,
    visibility: 8,
    uvIndex: 6,
    sunrise: '6:15 AM',
    sunset: '6:45 PM'
  },
  forecast: [
    { date: 'Today', high: 29, low: 23, condition: 'Partly Cloudy', precipitation: 35 },
    { date: 'Tomorrow', high: 28, low: 22, condition: 'Light Rain', precipitation: 60 },
    { date: 'Day 3', high: 30, low: 24, condition: 'Sunny', precipitation: 20 },
    { date: 'Day 4', high: 27, low: 21, condition: 'Thunderstorms', precipitation: 75 },
    { date: 'Day 5', high: 29, low: 23, condition: 'Partly Cloudy', precipitation: 40 }
  ],
  recommendations: [
    'Pack light cotton clothes and rain gear',
    'Best to explore early morning or late afternoon',
    'Stay hydrated and use sun protection',
    'Check local weather updates for outdoor activities'
  ],
  bestTimeToVisit: 'October to March',
  rainyDays: 10,
  avgTemperature: 26
});

const getWeatherIcon = (condition: string) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes('rain') || lowerCondition.includes('shower')) {
    return <CloudRain className="h-5 w-5 text-blue-500" />;
  }
  if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
    return <Cloud className="h-5 w-5 text-gray-500" />;
  }
  if (lowerCondition.includes('sunny') || lowerCondition.includes('clear')) {
    return <Sun className="h-5 w-5 text-yellow-500" />;
  }
  if (lowerCondition.includes('storm') || lowerCondition.includes('thunder')) {
    return <CloudRain className="h-5 w-5 text-purple-500" />;
  }
  if (lowerCondition.includes('mist') || lowerCondition.includes('fog')) {
    return <Cloud className="h-5 w-5 text-gray-400" />;
  }
  return <Sun className="h-5 w-5 text-yellow-500" />;
};

export function WeatherInfo({ destination, startDate, endDate }: WeatherInfoProps) {
  const weatherData = weatherDatabase[destination] || getDefaultWeather(destination);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getWeatherIcon(weatherData.current.condition)}
          Weather Information - {destination}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            Best Time: {weatherData.bestTimeToVisit}
          </Badge>
          <Badge variant="outline">
            Avg Temp: {weatherData.avgTemperature}°C
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Weather */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  {getWeatherIcon(weatherData.current.condition)}
                  <span className="text-2xl font-bold">{weatherData.current.temperature}°C</span>
                </div>
                <p className="text-lg">{weatherData.current.condition}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span>{weatherData.current.humidity}% Humidity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <span>{weatherData.current.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-purple-500" />
                    <span>{weatherData.current.visibility} km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-orange-500" />
                    <span>UV: {weatherData.current.uvIndex}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <h4 className="font-medium">Sun Times</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Sunrise className="h-4 w-4 text-orange-400" />
                  <span className="text-sm">Sunrise: {weatherData.current.sunrise}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sunset className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Sunset: {weatherData.current.sunset}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Rainy days/month:</span>
                    <span>{weatherData.rainyDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average temp:</span>
                    <span>{weatherData.avgTemperature}°C</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 5-Day Forecast */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            5-Day Forecast
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {weatherData.forecast.map((day, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-4 pb-4">
                  <p className="text-sm font-medium mb-2">{day.date}</p>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{day.high}° / {day.low}°</p>
                    <p className="text-xs text-muted-foreground">{day.condition}</p>
                    <div className="flex items-center justify-center gap-1">
                      <Umbrella className="h-3 w-3 text-blue-500" />
                      <span className="text-xs">{day.precipitation}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Travel Recommendations */}
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardContent className="pt-6">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-green-600" />
              Weather-Based Travel Tips
            </h4>
            <ul className="space-y-2">
              {weatherData.recommendations.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Weather Alert */}
        {startDate && (
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-1" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Weather Advisory
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Weather conditions may vary during your travel dates. Check local forecasts 
                    closer to your departure date for the most accurate information. Kerala's 
                    tropical climate can change quickly, especially during monsoon season.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}