import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { 
  Calculator, 
  Bed, 
  Car, 
  Utensils, 
  MapPin, 
  Camera, 
  ShoppingBag,
  IndianRupee,
  Cloud,
  CloudRain,
  Sun,
  Thermometer,
  Info
} from 'lucide-react';
import { TravelData } from './TravelForm';
import { TravelerDetailsData } from './TravelerDetails';

interface BudgetCalculatorProps {
  travelData: TravelData;
  travelerData: TravelerDetailsData;
  onBack: () => void;
  onComplete: () => void;
}

interface BudgetBreakdown {
  accommodation: number;
  transport: number;
  food: number;
  sightseeing: number;
  shopping: number;
  miscellaneous: number;
  total: number;
}

export function BudgetCalculator({ travelData, travelerData, onBack, onComplete }: BudgetCalculatorProps) {
  const calculateBudget = (): BudgetBreakdown => {
    const { duration } = travelData;
    const { travelers, accommodationType, transportPreference } = travelerData;
    const numTravelers = travelers.length;

    // Accommodation costs per room per night
    const accommodationRates = {
      budget: 2250,
      'mid-range': 4500,
      luxury: 10500,
      resort: 22500,
      homestay: 1750,
      houseboat: 8500
    };

    // Transport costs estimation (total for the trip)
    const transportCosts = {
      taxi: numTravelers * 3000,
      bus: numTravelers * 800,
      train: numTravelers * 1500,
      'self-drive': 4500,
      bike: numTravelers * 1200,
      flight: numTravelers * 6000
    };

    // Food costs per person per day
    const foodCostPerPersonPerDay = 800;

    // Sightseeing costs per person for the entire trip
    const sightseeingCosts = {
      'Kochi (Cochin)': 2500,
      'Munnar': 3000,
      'Alleppey (Alappuzha)': 2800,
      'Thekkady (Periyar)': 2200,
      'Wayanad': 2400,
      'Kovalam': 2000,
      'Kumarakom': 2600,
      'Thrissur': 1800,
      'Kozhikode (Calicut)': 1600,
      'Varkala': 2000,
      'Kottayam': 1400,
      'Palakkad': 1200,
      'Kannur': 1500,
      'Idukki': 2800,
      'Kasaragod': 1800
    };

    const accommodation = accommodationRates[accommodationType as keyof typeof accommodationRates] * duration;
    const transport = transportCosts[transportPreference as keyof typeof transportCosts];
    const food = foodCostPerPersonPerDay * numTravelers * duration;
    const sightseeing = (sightseeingCosts[travelData.destination as keyof typeof sightseeingCosts] || 2000) * numTravelers;
    const shopping = 1500 * numTravelers; // Average shopping budget per person
    const miscellaneous = 1000 * numTravelers; // Emergency/miscellaneous costs per person

    const total = accommodation + transport + food + sightseeing + shopping + miscellaneous;

    return {
      accommodation,
      transport,
      food,
      sightseeing,
      shopping,
      miscellaneous,
      total
    };
  };

  const budget = calculateBudget();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPercentage = (amount: number) => {
    return (amount / budget.total) * 100;
  };

  // Quick weather info for budget planning
  const getWeatherIcon = (destination: string) => {
    const hillStations = ['Munnar', 'Wayanad', 'Idukki'];
    const beaches = ['Kovalam', 'Varkala'];
    const backwaters = ['Alleppey (Alappuzha)', 'Kumarakom'];
    
    if (hillStations.some(place => destination.includes(place))) {
      return <Cloud className="h-4 w-4 text-blue-500" />;
    }
    if (beaches.some(place => destination.includes(place))) {
      return <Sun className="h-4 w-4 text-yellow-500" />;
    }
    if (backwaters.some(place => destination.includes(place))) {
      return <CloudRain className="h-4 w-4 text-blue-600" />;
    }
    return <Sun className="h-4 w-4 text-orange-500" />;
  };

  const getWeatherNote = (destination: string) => {
    const hillStations = ['Munnar', 'Wayanad', 'Idukki'];
    const beaches = ['Kovalam', 'Varkala'];
    
    if (hillStations.some(place => destination.includes(place))) {
      return "Cool climate (15-25°C) - pack warm clothes";
    }
    if (beaches.some(place => destination.includes(place))) {
      return "Warm & sunny (26-32°C) - perfect beach weather";
    }
    return "Tropical climate (24-30°C) - light cotton recommended";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Budget Estimation for Your Kerala Trip
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{travelerData.travelers.length} Traveler(s)</Badge>
          <Badge variant="secondary">{travelData.duration} Days</Badge>
          <Badge variant="secondary">{travelData.destination}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Budget */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Total Estimated Budget</p>
              <div className="flex items-center justify-center gap-2">
                <IndianRupee className="h-8 w-8 text-primary" />
                <span className="text-4xl font-bold text-primary">{budget.total.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {formatCurrency(budget.total / travelerData.travelers.length)} per person
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Budget Breakdown */}
        <div className="space-y-4">
          <h3>Budget Breakdown</h3>
          
          <div className="grid gap-4">
            {/* Accommodation */}
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <Bed className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Accommodation</p>
                  <p className="text-sm text-muted-foreground">
                    {travelerData.accommodationType} • {travelData.duration} nights
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(budget.accommodation)}</p>
                <div className="w-24 mt-1">
                  <Progress value={getPercentage(budget.accommodation)} className="h-2" />
                </div>
              </div>
            </div>

            {/* Transport */}
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <Car className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Transportation</p>
                  <p className="text-sm text-muted-foreground">
                    {travelerData.transportPreference} • Round trip
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(budget.transport)}</p>
                <div className="w-24 mt-1">
                  <Progress value={getPercentage(budget.transport)} className="h-2" />
                </div>
              </div>
            </div>

            {/* Food */}
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <Utensils className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium">Food & Dining</p>
                  <p className="text-sm text-muted-foreground">
                    All meals • {travelData.duration} days
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(budget.food)}</p>
                <div className="w-24 mt-1">
                  <Progress value={getPercentage(budget.food)} className="h-2" />
                </div>
              </div>
            </div>

            {/* Sightseeing */}
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <Camera className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="font-medium">Sightseeing & Activities</p>
                  <p className="text-sm text-muted-foreground">
                    Entry fees, tours, activities
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(budget.sightseeing)}</p>
                <div className="w-24 mt-1">
                  <Progress value={getPercentage(budget.sightseeing)} className="h-2" />
                </div>
              </div>
            </div>

            {/* Shopping */}
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-pink-500" />
                <div>
                  <p className="font-medium">Shopping & Souvenirs</p>
                  <p className="text-sm text-muted-foreground">
                    Spices, handicrafts, clothing
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(budget.shopping)}</p>
                <div className="w-24 mt-1">
                  <Progress value={getPercentage(budget.shopping)} className="h-2" />
                </div>
              </div>
            </div>

            {/* Miscellaneous */}
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">Miscellaneous</p>
                  <p className="text-sm text-muted-foreground">
                    Emergency fund, tips, extras
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(budget.miscellaneous)}</p>
                <div className="w-24 mt-1">
                  <Progress value={getPercentage(budget.miscellaneous)} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Weather Preview */}
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-2">
                {getWeatherIcon(travelData.destination)}
                <Thermometer className="h-4 w-4 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  Weather Insight for {travelData.destination}
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {getWeatherNote(travelData.destination)}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  💡 This may affect your packing list and activity choices. Check detailed weather in your trip summary.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Enhanced Features Recommendations */}
        <div className="bg-muted/50 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-lg mb-4">Enhance Your Kerala Experience</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Shopping */}
            <div className="bg-white rounded-lg p-4 text-center space-y-2">
              <ShoppingBag className="h-8 w-8 text-green-600 mx-auto" />
              <h4 className="font-medium">Shop Local Products</h4>
              <p className="text-sm text-muted-foreground">
                Authentic spices, handicrafts & souvenirs from {travelData.destination}
              </p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Budget: ₹2,000-5,000
              </Badge>
            </div>
            
            {/* Insurance */}
            <div className="bg-white rounded-lg p-4 text-center space-y-2">
              <IndianRupee className="h-8 w-8 text-blue-600 mx-auto" />
              <h4 className="font-medium">Travel Insurance</h4>
              <p className="text-sm text-muted-foreground">
                Protect your trip with comprehensive coverage
              </p>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                From ₹299 per person
              </Badge>
            </div>
            
            {/* Tourism */}
            <div className="bg-white rounded-lg p-4 text-center space-y-2">
              <MapPin className="h-8 w-8 text-purple-600 mx-auto" />
              <h4 className="font-medium">Premium Experiences</h4>
              <p className="text-sm text-muted-foreground">
                Exclusive tours, activities & cultural experiences
              </p>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Various packages
              </Badge>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            💡 Tip: Access these features from the navigation menu above
          </p>
        </div>

        {/* Money Saving Tips */}
        <div className="space-y-3">
          <h3>Money Saving Tips</h3>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <p>• Book accommodations in advance for better rates</p>
            <p>• Try local Kerala cuisine at authentic restaurants for great value</p>
            <p>• Use public transport or shared taxis for short distances</p>
            <p>• Visit during off-season (June-September) for lower prices</p>
            <p>• Bargain while shopping at local markets</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button onClick={onComplete} className="flex-1">
            Complete Planning
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}