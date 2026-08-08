import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { SafetyAdvisor } from './SafetyAdvisor';
import { TravelData } from './TravelForm';
import { TravelerDetailsData } from './TravelerDetails';

interface FloatingSafetyButtonProps {
  travelData?: TravelData | null;
  travelerData?: TravelerDetailsData | null;
  currentStep?: string;
}

export function FloatingSafetyButton({ travelData, travelerData, currentStep }: FloatingSafetyButtonProps) {
  const [hasHighPriorityAlerts, setHasHighPriorityAlerts] = React.useState(false);

  // Check for high priority alerts based on travel data
  React.useEffect(() => {
    if (travelData) {
      const isMonSoon = (dateString: string): boolean => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        return month >= 6 && month <= 9;
      };

      const isSummer = (dateString: string): boolean => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        return month >= 3 && month <= 5;
      };

      const hasWeatherAlerts = isMonSoon(travelData.startDate) || isSummer(travelData.startDate);
      const hasDestinationAlerts = 
        travelData.destination?.toLowerCase().includes('alleppey') ||
        travelData.destination?.toLowerCase().includes('kumarakom') ||
        travelData.destination?.toLowerCase().includes('munnar') ||
        travelData.destination?.toLowerCase().includes('wayanad') ||
        travelData.destination?.toLowerCase().includes('thekkady');

      setHasHighPriorityAlerts(hasWeatherAlerts || hasDestinationAlerts);
    } else {
      setHasHighPriorityAlerts(false);
    }
  }, [travelData]);

  // Only show during planning steps, not on explore page
  if (currentStep === 'explore') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <SafetyAdvisor 
          travelData={travelData}
          travelerData={travelerData}
          currentStep={currentStep}
        />
        
        {/* Pulse animation for high priority alerts */}
        {hasHighPriorityAlerts && (
          <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></div>
        )}
        
        {/* High priority indicator */}
        {hasHighPriorityAlerts && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-6 w-6 p-0 flex items-center justify-center animate-pulse"
          >
            <AlertTriangle className="h-3 w-3" />
          </Badge>
        )}
      </div>
    </div>
  );
}