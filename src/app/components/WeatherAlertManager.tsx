import React from 'react';
import { WeatherAlertContainer, WeatherAlertData, WeatherAlertType, WeatherAlertSeverity } from './WeatherAlert';
import { TravelData } from './TravelForm';
import { addHours, isAfter, isBefore } from 'date-fns';

interface WeatherAlertManagerProps {
  travelData?: TravelData | null;
  currentLocation?: string;
  onAlertDismiss?: (alertId: string) => void;
  onAlertViewDetails?: (alertId: string) => void;
  className?: string;
}

// Generate context-aware weather alerts based on destination and travel dates
function generateContextualAlerts(travelData: TravelData | null, currentLocation?: string): WeatherAlertData[] {
  if (!travelData) return [];

  const destination = travelData.destination;
  const startDate = travelData.startDate;
  const endDate = travelData.endDate;
  const now = new Date();
  
  const alerts: WeatherAlertData[] = [];

  // Kerala-specific weather patterns and seasonal risks
  const destinationRisks: Record<string, { types: WeatherAlertType[], season: string[] }> = {
    'Munnar': {
      types: ['heavy-rain', 'thunderstorm', 'landslide', 'fog'],
      season: ['monsoon', 'winter']
    },
    'Alleppey (Alappuzha)': {
      types: ['flooding', 'heavy-rain', 'coastal-warning'],
      season: ['monsoon', 'pre-monsoon']
    },
    'Kumarakom': {
      types: ['flooding', 'heavy-rain', 'strong-winds'],
      season: ['monsoon', 'pre-monsoon']
    },
    'Thekkady (Periyar)': {
      types: ['heavy-rain', 'thunderstorm', 'landslide'],
      season: ['monsoon']
    },
    'Wayanad': {
      types: ['heavy-rain', 'landslide', 'fog'],
      season: ['monsoon', 'winter']
    },
    'Kovalam': {
      types: ['coastal-warning', 'strong-winds', 'heatwave'],
      season: ['pre-monsoon', 'summer']
    },
    'Varkala': {
      types: ['coastal-warning', 'strong-winds', 'heatwave'],
      season: ['pre-monsoon', 'summer']
    },
    'Kochi (Cochin)': {
      types: ['heavy-rain', 'flooding', 'strong-winds'],
      season: ['monsoon']
    },
    'Thrissur': {
      types: ['heatwave', 'thunderstorm'],
      season: ['summer', 'pre-monsoon']
    },
    'Kozhikode (Calicut)': {
      types: ['heavy-rain', 'coastal-warning', 'heatwave'],
      season: ['monsoon', 'summer']
    },
    'Kannur': {
      types: ['heavy-rain', 'coastal-warning'],
      season: ['monsoon']
    },
    'Kasaragod': {
      types: ['heavy-rain', 'coastal-warning'],
      season: ['monsoon']
    },
    'Idukki': {
      types: ['heavy-rain', 'landslide', 'fog'],
      season: ['monsoon']
    },
    'Palakkad': {
      types: ['heatwave', 'thunderstorm'],
      season: ['summer']
    },
    'Kottayam': {
      types: ['heavy-rain', 'flooding'],
      season: ['monsoon']
    }
  };

  // Check if destination has known risks
  const destinationRisk = destinationRisks[destination];
  if (!destinationRisk) return alerts;

  // Simulate current weather conditions based on season and destination
  const currentMonth = now.getMonth();
  const isMonsoontSeason = currentMonth >= 5 && currentMonth <= 9; // June to October
  const isSummerSeason = currentMonth >= 2 && currentMonth <= 4; // March to May
  const isWinterSeason = currentMonth >= 11 || currentMonth <= 1; // December to February

  // Generate alerts based on current conditions and destination
  if (isMonsoontSeason && destinationRisk.season.includes('monsoon')) {
    // Monsoon-related alerts
    if (destinationRisk.types.includes('heavy-rain') || destinationRisk.types.includes('flooding')) {
      alerts.push({
        id: `monsoon-${destination}-${Date.now()}`,
        type: 'heavy-rain',
        severity: 'warning',
        title: 'Monsoon Rain Advisory',
        message: `Heavy monsoon rains expected in ${destination}. Plan indoor activities and carry rain gear.`,
        location: destination,
        validUntil: addHours(now, 12),
        actionAdvice: [
          'Carry waterproof clothing and umbrella',
          'Plan indoor sightseeing activities',
          'Check road conditions before travel',
          'Avoid low-lying areas prone to flooding',
          'Keep emergency supplies in accommodation'
        ],
        emergencyContacts: {
          police: '100',
          medical: '108',
          touristHelpline: '0471-2321132'
        },
        isActive: true
      });
    }

    if (destinationRisk.types.includes('landslide') && ['Munnar', 'Wayanad', 'Thekkady (Periyar)', 'Idukki'].includes(destination)) {
      alerts.push({
        id: `landslide-${destination}-${Date.now()}`,
        type: 'landslide',
        severity: 'critical',
        title: 'Landslide Risk Alert',
        message: `High landslide risk in hilly areas of ${destination} due to continuous rainfall. Avoid steep terrain.`,
        location: `${destination} - Hilly regions`,
        validUntil: addHours(now, 24),
        actionAdvice: [
          'Avoid trekking on steep slopes',
          'Stay away from unstable hillsides',
          'Use only well-maintained roads',
          'Follow local authority warnings',
          'Report any ground movement immediately'
        ],
        emergencyContacts: {
          police: '100',
          medical: '108',
          touristHelpline: '0471-2321132'
        },
        affectedAreas: ['Hill stations', 'Trekking routes', 'Mountain roads'],
        isActive: true
      });
    }
  }

  if (isSummerSeason && destinationRisk.season.includes('summer')) {
    // Summer heat alerts
    if (destinationRisk.types.includes('heatwave')) {
      alerts.push({
        id: `heatwave-${destination}-${Date.now()}`,
        type: 'heatwave',
        severity: 'warning',
        title: 'High Temperature Advisory',
        message: `Extreme heat expected in ${destination} with temperatures reaching up to 38°C. Take precautions against heat exhaustion.`,
        location: destination,
        validUntil: addHours(now, 18),
        actionAdvice: [
          'Drink water frequently throughout the day',
          'Wear light-colored, loose-fitting clothes',
          'Apply sunscreen with high SPF regularly',
          'Avoid outdoor activities during 11 AM - 4 PM',
          'Seek air-conditioned spaces during peak hours',
          'Watch for signs of heat exhaustion or dehydration'
        ],
        emergencyContacts: {
          police: '100',
          medical: '108',
          touristHelpline: '0471-2321132'
        },
        isActive: true
      });
    }
  }

  // Coastal warnings for beach destinations
  if (['Kovalam', 'Varkala', 'Kozhikode (Calicut)', 'Kannur', 'Kasaragod'].includes(destination)) {
    const today = now.getDay();
    // Simulate high tide warnings on certain days
    if (today === 0 || today === 3 || today === 6) { // Sunday, Wednesday, Saturday
      alerts.push({
        id: `coastal-${destination}-${Date.now()}`,
        type: 'coastal-warning',
        severity: 'info',
        title: 'High Tide Advisory',
        message: `High tide and strong currents expected along ${destination} beaches. Exercise caution during water activities.`,
        location: `${destination} coastal areas`,
        validUntil: addHours(now, 8),
        actionAdvice: [
          'Follow lifeguard instructions at beaches',
          'Avoid swimming during high tide hours',
          'Stay within designated safe swimming areas',
          'Keep children under close supervision',
          'Check tide timings before beach activities'
        ],
        emergencyContacts: {
          police: '100',
          medical: '108',
          touristHelpline: '0471-2321132'
        },
        affectedAreas: ['Main beach', 'Swimming areas', 'Water sports zones'],
        isActive: true
      });
    }
  }

  // Travel date specific alerts
  if (startDate && endDate) {
    const isNearTravelDate = isAfter(startDate, now) && isBefore(addHours(now, 72), startDate);
    
    if (isNearTravelDate && isMonsoontSeason) {
      alerts.push({
        id: `travel-advisory-${destination}-${Date.now()}`,
        type: 'thunderstorm',
        severity: 'warning',
        title: 'Pre-Travel Weather Advisory',
        message: `Weather conditions may affect your upcoming trip to ${destination}. Monitor updates closely.`,
        location: destination,
        validUntil: startDate,
        actionAdvice: [
          'Monitor weather updates regularly',
          'Pack appropriate rain gear',
          'Have backup indoor activity plans',
          'Confirm transportation arrangements',
          'Keep emergency contacts accessible'
        ],
        emergencyContacts: {
          police: '100',
          medical: '108',
          touristHelpline: '0471-2321132'
        },
        isActive: true
      });
    }
  }

  return alerts;
}

export function WeatherAlertManager({ 
  travelData, 
  currentLocation,
  onAlertDismiss,
  onAlertViewDetails,
  className 
}: WeatherAlertManagerProps) {
  const [alerts, setAlerts] = React.useState<WeatherAlertData[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = React.useState<Set<string>>(new Set());

  // Generate alerts based on travel data
  React.useEffect(() => {
    const contextualAlerts = generateContextualAlerts(travelData, currentLocation);
    setAlerts(contextualAlerts);
  }, [travelData, currentLocation]);

  // Auto-refresh alerts every 30 minutes
  React.useEffect(() => {
    const interval = setInterval(() => {
      const contextualAlerts = generateContextualAlerts(travelData, currentLocation);
      setAlerts(contextualAlerts);
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [travelData, currentLocation]);

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
    onAlertDismiss?.(alertId);
  };

  const activeAlerts = alerts.filter(alert => 
    alert.isActive && 
    !dismissedAlerts.has(alert.id) &&
    isAfter(alert.validUntil, new Date())
  );

  if (activeAlerts.length === 0) {
    return null;
  }

  return (
    <WeatherAlertContainer
      alerts={activeAlerts}
      onDismiss={handleDismiss}
      onViewDetails={onAlertViewDetails}
      maxVisible={2}
      className={className}
    />
  );
}