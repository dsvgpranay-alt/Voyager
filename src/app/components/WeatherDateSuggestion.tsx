import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  CloudRain, 
  Sun, 
  CloudSnow,
  Cloud,
  CloudDrizzle,
  Zap,
  AlertTriangle,
  ArrowRight,
  Calendar,
  MapPin,
  Lightbulb,
  CheckCircle2,
  CloudLightning
} from 'lucide-react';
import { motion } from 'motion/react';
import { format, addDays } from 'date-fns';

interface WeatherCondition {
  type: 'heavy-rain' | 'storm' | 'cyclone' | 'extreme-heat' | 'flooding';
  severity: 'high' | 'moderate' | 'severe';
  description: string;
}

interface DateRange {
  start: Date;
  end: Date;
}

interface WeatherDateSuggestionProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptSuggestion: (newDates: DateRange) => void;
  onKeepOriginal: () => void;
  originalDates: DateRange;
  suggestedDates: DateRange;
  destination: string;
  weatherIssue: WeatherCondition;
}

const weatherIcons = {
  'heavy-rain': CloudRain,
  'storm': CloudLightning,
  'cyclone': CloudLightning,
  'extreme-heat': Sun,
  'flooding': CloudRain
};

const weatherColors = {
  'heavy-rain': 'text-blue-600',
  'storm': 'text-purple-600',
  'cyclone': 'text-red-600',
  'extreme-heat': 'text-orange-600',
  'flooding': 'text-blue-700'
};

const severityColors = {
  'moderate': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'high': 'bg-orange-100 text-orange-800 border-orange-300',
  'severe': 'bg-red-100 text-red-800 border-red-300'
};

export function WeatherDateSuggestion({
  isOpen,
  onClose,
  onAcceptSuggestion,
  onKeepOriginal,
  originalDates,
  suggestedDates,
  destination,
  weatherIssue
}: WeatherDateSuggestionProps) {
  const WeatherIcon = weatherIcons[weatherIssue.type];
  const weatherColorClass = weatherColors[weatherIssue.type];
  const severityColorClass = severityColors[weatherIssue.severity];

  const handleAccept = () => {
    onAcceptSuggestion(suggestedDates);
    onClose();
  };

  const handleKeepOriginal = () => {
    onKeepOriginal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-12 w-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
            >
              <Lightbulb className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <DialogTitle className="text-xl font-semibold text-left">
                Better Weather Ahead!
              </DialogTitle>
              <DialogDescription className="text-left text-muted-foreground">
                We found safer dates for your Kerala adventure
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Weather Issue Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="font-medium text-sm">Weather Advisory</span>
            </div>
            <div className={`p-3 rounded-lg border ${severityColorClass}`}>
              <div className="flex items-center gap-2 mb-1">
                <WeatherIcon className={`h-4 w-4 ${weatherColorClass}`} />
                <span className="font-medium text-sm capitalize">
                  {weatherIssue.type.replace('-', ' ')} forecast in {destination}
                </span>
              </div>
              <p className="text-xs opacity-90">
                {weatherIssue.description}
              </p>
            </div>
          </motion.div>

          {/* Date Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="text-center">
              <span className="text-sm font-medium text-muted-foreground">Date Comparison</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Original Dates */}
              <Card className="border-2 border-orange-200 bg-orange-50/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">Your Pick</span>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold">
                          {format(originalDates.start, 'MMM dd')} - {format(originalDates.end, 'MMM dd, yyyy')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.ceil((originalDates.end.getTime() - originalDates.start.getTime()) / (1000 * 60 * 60 * 24))} days
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <WeatherIcon className={`h-8 w-8 ${weatherColorClass} opacity-70`} />
                      <p className="text-xs text-orange-600 font-medium">Risky Weather</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow Indicator */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-xs font-medium">Better Option</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Suggested Dates */}
              <Card className="border-2 border-green-200 bg-green-50/50 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Our Suggestion</span>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-green-800">
                          {format(suggestedDates.start, 'MMM dd')} - {format(suggestedDates.end, 'MMM dd, yyyy')}
                        </p>
                        <p className="text-xs text-green-600">
                          {Math.ceil((suggestedDates.end.getTime() - suggestedDates.start.getTime()) / (1000 * 60 * 60 * 24))} days
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Sun className="h-8 w-8 text-yellow-500" />
                      <p className="text-xs text-green-600 font-medium">Perfect Weather</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-green-800">
                  Why these dates are better:
                </p>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>• Clear skies and pleasant weather conditions</li>
                  <li>• Safer travel with better road conditions</li>
                  <li>• Enhanced outdoor activities and sightseeing</li>
                  <li>• More enjoyable photography opportunities</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={handleKeepOriginal}
            className="flex-1 sm:flex-none"
          >
            No, Keep My Dates
          </Button>
          <Button
            onClick={handleAccept}
            className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white"
          >
            Yes, Switch to {format(suggestedDates.start, 'MMM dd')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Mock weather API function for demonstration
export function checkWeatherRisk(destination: string, startDate: Date, endDate: Date): { 
  hasRisk: boolean; 
  issue?: WeatherCondition; 
  suggestedDates?: DateRange;
} {
  // Simulate weather risk based on destination and dates
  const month = startDate.getMonth();
  const isMonsooonSeason = month >= 5 && month <= 9; // June to October
  
  // Monsoon-prone destinations
  const monsoonProneDestinations = [
    'Munnar', 
    'Wayanad', 
    'Thekkady (Periyar)', 
    'Idukki',
    'Alleppey (Alappuzha)',
    'Kumarakom'
  ];

  if (isMonsooonSeason && monsoonProneDestinations.includes(destination)) {
    // Suggest dates 2-3 weeks later when weather improves
    const suggestedStart = addDays(endDate, 14);
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const suggestedEnd = addDays(suggestedStart, duration);

    return {
      hasRisk: true,
      issue: {
        type: 'heavy-rain',
        severity: 'high',
        description: `Heavy monsoon rainfall expected during your travel dates. Road conditions may be challenging and outdoor activities limited.`
      },
      suggestedDates: {
        start: suggestedStart,
        end: suggestedEnd
      }
    };
  }

  // Summer heat for certain destinations
  const summerHotDestinations = ['Thrissur', 'Palakkad', 'Kozhikode (Calicut)'];
  const isSummerPeak = month >= 2 && month <= 4; // March to May

  if (isSummerPeak && summerHotDestinations.includes(destination)) {
    const suggestedStart = addDays(endDate, 21);
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const suggestedEnd = addDays(suggestedStart, duration);

    return {
      hasRisk: true,
      issue: {
        type: 'extreme-heat',
        severity: 'moderate',
        description: `Extremely hot temperatures expected. Daytime sightseeing may be uncomfortable.`
      },
      suggestedDates: {
        start: suggestedStart,
        end: suggestedEnd
      }
    };
  }

  return { hasRisk: false };
}