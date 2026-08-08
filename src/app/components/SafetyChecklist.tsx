import React from 'react';
import { CheckCircle, Circle, Shield, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { TravelData } from './TravelForm';
import { TravelerDetailsData } from './TravelerDetails';

interface SafetyChecklistProps {
  travelData: TravelData;
  travelerData: TravelerDetailsData;
  onComplete?: () => void;
  onBack?: () => void;
}

interface ChecklistItem {
  id: string;
  category: 'documents' | 'health' | 'packing' | 'booking' | 'communication';
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
}

export function SafetyChecklist({ travelData, travelerData, onComplete, onBack }: SafetyChecklistProps) {
  const [checkedItems, setCheckedItems] = React.useState<Set<string>>(new Set());

  const checklistItems: ChecklistItem[] = React.useMemo(() => [
    // Documents
    {
      id: 'passport-id',
      category: 'documents',
      title: 'Valid ID/Passport',
      description: 'Ensure all travelers have valid government-issued photo ID',
      required: true,
      completed: false
    },
    {
      id: 'travel-insurance',
      category: 'documents',
      title: 'Travel Insurance',
      description: 'Purchase comprehensive travel insurance covering medical emergencies',
      required: true,
      completed: false
    },
    {
      id: 'document-copies',
      category: 'documents',
      title: 'Document Copies',
      description: 'Make photocopies and digital copies of all important documents',
      required: true,
      completed: false
    },
    {
      id: 'emergency-contacts',
      category: 'documents',
      title: 'Emergency Contact List',
      description: 'Prepare a list of emergency contacts including local authorities',
      required: true,
      completed: false
    },

    // Health
    {
      id: 'medical-checkup',
      category: 'health',
      title: 'Medical Consultation',
      description: 'Consult doctor about vaccinations and health precautions for Kerala',
      required: true,
      completed: false
    },
    {
      id: 'medications',
      category: 'health',
      title: 'Essential Medications',
      description: 'Pack all regular medications plus basic first aid supplies',
      required: true,
      completed: false
    },
    {
      id: 'health-insurance',
      category: 'health',
      title: 'Health Insurance Verification',
      description: 'Verify health insurance coverage for the travel destination',
      required: true,
      completed: false
    },

    // Packing
    {
      id: 'weather-clothing',
      category: 'packing',
      title: 'Weather-Appropriate Clothing',
      description: 'Pack clothing suitable for Kerala\'s tropical climate and monsoons',
      required: true,
      completed: false
    },
    {
      id: 'safety-gear',
      category: 'packing',
      title: 'Safety Equipment',
      description: 'Pack mosquito repellent, sunscreen, water purification tablets',
      required: true,
      completed: false
    },
    {
      id: 'electronics-backup',
      category: 'packing',
      title: 'Electronics & Backup Power',
      description: 'Pack chargers, power banks, and backup devices',
      required: false,
      completed: false
    },

    // Booking
    {
      id: 'accommodation-confirmation',
      category: 'booking',
      title: 'Accommodation Confirmation',
      description: 'Confirm all hotel/accommodation bookings and save details',
      required: true,
      completed: false
    },
    {
      id: 'transport-booking',
      category: 'booking',
      title: 'Transportation Booking',
      description: 'Confirm flight/train/bus tickets and local transport arrangements',
      required: true,
      completed: false
    },
    {
      id: 'activity-reservations',
      category: 'booking',
      title: 'Activity Reservations',
      description: 'Book tours, houseboats, and popular attractions in advance',
      required: false,
      completed: false
    },

    // Communication
    {
      id: 'local-sim',
      category: 'communication',
      title: 'Local Connectivity',
      description: 'Plan for local SIM card or international roaming activation',
      required: true,
      completed: false
    },
    {
      id: 'offline-maps',
      category: 'communication',
      title: 'Offline Maps',
      description: 'Download offline maps and translation apps for Kerala',
      required: false,
      completed: false
    },
    {
      id: 'family-notification',
      category: 'communication',
      title: 'Family Notification',
      description: 'Share complete itinerary with family/friends back home',
      required: true,
      completed: false
    }
  ], []);

  const toggleItem = React.useCallback((itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  const getCompletionStats = React.useMemo(() => {
    const totalItems = checklistItems.length;
    const completedItems = checkedItems.size;
    const requiredItems = checklistItems.filter(item => item.required).length;
    const completedRequired = checklistItems.filter(item => item.required && checkedItems.has(item.id)).length;
    
    return {
      total: totalItems,
      completed: completedItems,
      required: requiredItems,
      completedRequired,
      percentage: Math.round((completedItems / totalItems) * 100),
      requiredPercentage: Math.round((completedRequired / requiredItems) * 100)
    };
  }, [checklistItems, checkedItems]);

  const getCategoryItems = React.useCallback((category: string) => {
    return checklistItems.filter(item => item.category === category);
  }, [checklistItems]);

  const getCategoryIcon = (category: string) => {
    const icons = {
      documents: '📄',
      health: '🏥',
      packing: '🎒',
      booking: '📅',
      communication: '📱'
    };
    return icons[category as keyof typeof icons] || '📋';
  };

  const getCategoryTitle = (category: string) => {
    const titles = {
      documents: 'Documents & Legal',
      health: 'Health & Medical',
      packing: 'Packing & Equipment',
      booking: 'Bookings & Reservations',
      communication: 'Communication & Technology'
    };
    return titles[category as keyof typeof titles] || category;
  };

  const canProceed = getCompletionStats.requiredPercentage >= 80;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Safety Checklist</h2>
        </div>
        <p className="text-muted-foreground">
          Complete your pre-travel safety checklist for {travelData.destination}
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Completion Progress</span>
            <Badge variant={canProceed ? "default" : "secondary"}>
              {getCompletionStats.percentage}% Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{getCompletionStats.completed}/{getCompletionStats.total} items</span>
            </div>
            <Progress value={getCompletionStats.percentage} className="w-full" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Required Items</span>
              <span>{getCompletionStats.completedRequired}/{getCompletionStats.required} items</span>
            </div>
            <Progress value={getCompletionStats.requiredPercentage} className="w-full" />
          </div>

          {!canProceed && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Complete at least 80% of required items to proceed safely with your trip.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Checklist by Category */}
      <div className="space-y-6">
        {['documents', 'health', 'packing', 'booking', 'communication'].map(category => {
          const categoryItems = getCategoryItems(category);
          const completedInCategory = categoryItems.filter(item => checkedItems.has(item.id)).length;
          
          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{getCategoryIcon(category)}</span>
                  <span>{getCategoryTitle(category)}</span>
                  <Badge variant="outline" className="ml-auto">
                    {completedInCategory}/{categoryItems.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryItems.map(item => {
                    const isChecked = checkedItems.has(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                          isChecked ? 'bg-green-50 border-green-200' : ''
                        }`}
                        onClick={() => toggleItem(item.id)}
                      >
                        <div className="mt-1">
                          {isChecked ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-medium ${isChecked ? 'text-green-700' : ''}`}>
                              {item.title}
                            </h4>
                            {item.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        )}
        <div className="flex gap-2 ml-auto">
          <Button
            variant="secondary"
            onClick={() => {
              // Mark all required items as checked
              const requiredItemIds = checklistItems.filter(item => item.required).map(item => item.id);
              setCheckedItems(new Set(requiredItemIds));
            }}
          >
            Quick Complete Required
          </Button>
          {onComplete && (
            <Button 
              onClick={onComplete}
              disabled={!canProceed}
              className={canProceed ? '' : 'opacity-50 cursor-not-allowed'}
            >
              {canProceed ? 'Continue →' : `Complete ${getCompletionStats.required - getCompletionStats.completedRequired} more required items`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}