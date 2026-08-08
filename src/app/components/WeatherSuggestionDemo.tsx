import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { WeatherDateSuggestion } from './WeatherDateSuggestion';
import { Calendar, Cloud, CloudRain, Sun, Zap } from 'lucide-react';
import { addDays } from 'date-fns';

interface DemoScenario {
  id: string;
  destination: string;
  originalDates: { start: Date; end: Date };
  suggestedDates: { start: Date; end: Date };
  weatherIssue: {
    type: 'heavy-rain' | 'storm' | 'cyclone' | 'extreme-heat' | 'flooding';
    severity: 'high' | 'moderate' | 'severe';
    description: string;
  };
  title: string;
  description: string;
}

const demoScenarios: DemoScenario[] = [
  {
    id: 'monsoon-munnar',
    destination: 'Munnar',
    originalDates: {
      start: new Date(2024, 7, 15), // August 15
      end: new Date(2024, 7, 22)    // August 22
    },
    suggestedDates: {
      start: new Date(2024, 8, 5),  // September 5
      end: new Date(2024, 8, 12)    // September 12
    },
    weatherIssue: {
      type: 'heavy-rain',
      severity: 'high',
      description: 'Heavy monsoon rainfall expected during your travel dates. Road conditions may be challenging and outdoor activities limited.'
    },
    title: 'Monsoon Season in Munnar',
    description: 'Peak monsoon with heavy rainfall'
  },
  {
    id: 'storm-alleppey',
    destination: 'Alleppey (Alappuzha)',
    originalDates: {
      start: new Date(2024, 6, 20), // July 20
      end: new Date(2024, 6, 25)    // July 25
    },
    suggestedDates: {
      start: new Date(2024, 8, 15), // September 15
      end: new Date(2024, 8, 20)    // September 20
    },
    weatherIssue: {
      type: 'storm',
      severity: 'severe',
      description: 'Severe thunderstorms and heavy winds expected. Houseboat operations may be suspended for safety.'
    },
    title: 'Storm Warning in Alleppey',
    description: 'Severe weather affecting backwater cruises'
  },
  {
    id: 'heat-thrissur',
    destination: 'Thrissur',
    originalDates: {
      start: new Date(2024, 3, 10), // April 10
      end: new Date(2024, 3, 17)    // April 17
    },
    suggestedDates: {
      start: new Date(2024, 10, 15), // November 15
      end: new Date(2024, 10, 22)    // November 22
    },
    weatherIssue: {
      type: 'extreme-heat',
      severity: 'moderate',
      description: 'Extremely hot temperatures expected. Daytime sightseeing may be uncomfortable and outdoor activities should be limited.'
    },
    title: 'Summer Heat in Thrissur',
    description: 'Peak summer with extreme temperatures'
  }
];

export function WeatherSuggestionDemo() {
  const [selectedDemo, setSelectedDemo] = React.useState<DemoScenario | null>(null);
  const [showModal, setShowModal] = React.useState(false);

  const handleDemoClick = (scenario: DemoScenario) => {
    setSelectedDemo(scenario);
    setShowModal(true);
  };

  const handleAcceptSuggestion = (newDates: { start: Date; end: Date }) => {
    console.log('Accepted suggested dates:', newDates);
    // In a real implementation, this would update the travel form
  };

  const handleKeepOriginal = () => {
    console.log('Keeping original dates despite weather warning');
    // In a real implementation, this would proceed with original dates
  };

  const getWeatherIcon = (type: string) => {
    switch (type) {
      case 'heavy-rain':
      case 'flooding':
        return CloudRain;
      case 'storm':
      case 'cyclone':
        return Zap;
      case 'extreme-heat':
        return Sun;
      default:
        return Cloud;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'severe':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Weather-Smart Date Suggestions Demo
          </CardTitle>
          <p className="text-muted-foreground">
            Experience how VOYAGER intelligently suggests better travel dates when weather conditions are risky.
            Click on any scenario below to see the weather suggestion modal in action.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoScenarios.map((scenario) => {
              const WeatherIcon = getWeatherIcon(scenario.weatherIssue.type);
              const severityColor = getSeverityColor(scenario.weatherIssue.severity);
              
              return (
                <Card 
                  key={scenario.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/50"
                  onClick={() => handleDemoClick(scenario)}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{scenario.title}</h3>
                      <WeatherIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        {scenario.description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {scenario.destination}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${severityColor}`}
                        >
                          {scenario.weatherIssue.severity} risk
                        </Badge>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDemoClick(scenario);
                      }}
                    >
                      Try This Scenario
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 text-green-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-green-800">How It Works</h4>
                <p className="text-sm text-green-700">
                  When you select travel dates, VOYAGER automatically checks weather forecasts for your Kerala destination. 
                  If risky conditions are detected (heavy monsoons, storms, extreme heat), you'll see a helpful suggestion 
                  with safer alternative dates. You can either accept the suggestion or proceed with your original dates.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Suggestion Modal */}
      {selectedDemo && (
        <WeatherDateSuggestion
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAcceptSuggestion={handleAcceptSuggestion}
          onKeepOriginal={handleKeepOriginal}
          originalDates={selectedDemo.originalDates}
          suggestedDates={selectedDemo.suggestedDates}
          destination={selectedDemo.destination}
          weatherIssue={selectedDemo.weatherIssue}
        />
      )}
    </div>
  );
}