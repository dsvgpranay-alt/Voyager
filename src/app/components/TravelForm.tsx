import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { GoogleMaps } from './GoogleMaps';
import { WeatherDateSuggestion, checkWeatherRisk } from './WeatherDateSuggestion';
import { RouteWeatherAlert } from './RouteWeatherAlert';

interface TravelFormProps {
  onSubmit: (data: TravelData) => void;
}

export interface TravelData {
  source: string;
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  duration: number;
}

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

export function TravelForm({ onSubmit }: TravelFormProps) {
  const [source, setSource] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [showMap, setShowMap] = React.useState(false);
  const [showWeatherSuggestion, setShowWeatherSuggestion] = React.useState(false);
  const [weatherRiskData, setWeatherRiskData] = React.useState<any>(null);
  const [showRouteWeatherAlert, setShowRouteWeatherAlert] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !destination || !startDate || !endDate) return;
    
    // Check for weather risks
    const weatherCheck = checkWeatherRisk(destination, startDate, endDate);
    
    if (weatherCheck.hasRisk && weatherCheck.issue && weatherCheck.suggestedDates) {
      // Show weather suggestion modal
      setWeatherRiskData({
        originalDates: { start: startDate, end: endDate },
        suggestedDates: weatherCheck.suggestedDates,
        weatherIssue: weatherCheck.issue
      });
      setShowWeatherSuggestion(true);
      return;
    }
    
    // Proceed with original submission if no weather risks
    submitTravelData({ source, destination, startDate, endDate });
  };

  const submitTravelData = (data: { source: string; destination: string; startDate: Date; endDate: Date }) => {
    const duration = Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    onSubmit({
      source: data.source,
      destination: data.destination,
      startDate: data.startDate,
      endDate: data.endDate,
      duration
    });
  };

  const handleAcceptSuggestedDates = (newDates: { start: Date; end: Date }) => {
    setStartDate(newDates.start);
    setEndDate(newDates.end);
    
    // Submit with new dates
    submitTravelData({
      source,
      destination,
      startDate: newDates.start,
      endDate: newDates.end
    });
  };

  const handleKeepOriginalDates = () => {
    // Submit with original dates despite weather warning
    if (startDate && endDate) {
      submitTravelData({ source, destination, startDate, endDate });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Plan Your Kerala Journey
          </CardTitle>
        </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">From (Source)</Label>
              <Input
                id="source"
                placeholder="Enter your starting location"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination">To (Kerala Destination)</Label>
              <Select 
                value={destination} 
                onValueChange={(value) => {
                  setDestination(value);
                  setShowMap(!!value);
                }} 
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Kerala destination" />
                </SelectTrigger>
                <SelectContent>
                  {keralaDestinations.map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : 'Select start date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : 'Select end date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date < (startDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={!source || !destination || !startDate || !endDate}>
            Continue to Traveler Details
          </Button>
        </form>
      </CardContent>
      </Card>

      {/* Route Weather Alert - Show when both source and destination are selected */}
      {source && destination && (
        <RouteWeatherAlert
          sourceLocation={source}
          destinationLocation={destination}
          travelDate={startDate}
          onDateSuggestionAccept={(newDate) => {
            setStartDate(newDate);
            // Auto-adjust end date to maintain duration if it was already set
            if (startDate && endDate) {
              const originalDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
              const newEndDate = new Date(newDate);
              newEndDate.setDate(newEndDate.getDate() + originalDuration);
              setEndDate(newEndDate);
            }
          }}
          onDismiss={() => setShowRouteWeatherAlert(false)}
        />
      )}

      {/* Show destination map when selected */}
      {showMap && destination && (
        <GoogleMaps 
          destination={destination}
          source={source}
          showRoute={!!source}
        />
      )}

      {/* Weather Date Suggestion Modal */}
      {weatherRiskData && (
        <WeatherDateSuggestion
          isOpen={showWeatherSuggestion}
          onClose={() => setShowWeatherSuggestion(false)}
          onAcceptSuggestion={handleAcceptSuggestedDates}
          onKeepOriginal={handleKeepOriginalDates}
          originalDates={weatherRiskData.originalDates}
          suggestedDates={weatherRiskData.suggestedDates}
          destination={destination}
          weatherIssue={weatherRiskData.weatherIssue}
        />
      )}
    </div>
  );
}