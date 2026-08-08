import React from 'react';
import { 
  Shield, 
  Heart, 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Umbrella,
  Thermometer,
  Users,
  Car,
  Home,
  Camera,
  Wallet,
  X,
  ChevronRight,
  Info,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { TravelData } from './TravelForm';
import { TravelerDetailsData } from './TravelerDetails';

interface SafetyAdvisorProps {
  travelData?: TravelData | null;
  travelerData?: TravelerDetailsData | null;
  currentStep?: string;
}

interface SafetyTip {
  id: string;
  category: 'health' | 'weather' | 'cultural' | 'emergency' | 'travel' | 'general';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  applicable: boolean;
}

interface EmergencyContact {
  service: string;
  number: string;
  description: string;
}

interface HealthRecommendation {
  item: string;
  description: string;
  required: boolean;
  season?: string;
}

export function SafetyAdvisor({ travelData, travelerData, currentStep }: SafetyAdvisorProps) {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [isOpen, setIsOpen] = React.useState(false);

  // Helper functions for date calculations
  const isMonSoon = React.useCallback((dateString: string): boolean => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 0-indexed
    return month >= 6 && month <= 9; // June to September
  }, []);

  const isSummer = React.useCallback((dateString: string): boolean => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    return month >= 3 && month <= 5; // March to May
  }, []);

  // Generate contextual safety tips based on travel data
  const safetyTips = React.useMemo((): SafetyTip[] => {
    const tips: SafetyTip[] = [
      {
        id: 'monsoon-travel',
        category: 'weather',
        title: 'Monsoon Season Precautions',
        description: 'Kerala experiences heavy rainfall during monsoon (June-September). Carry waterproof clothing and avoid coastal areas during rough weather.',
        priority: 'high',
        icon: <Umbrella className="h-4 w-4" />,
        applicable: travelData ? isMonSoon(travelData.startDate) : true
      },
      {
        id: 'heat-protection',
        category: 'health',
        title: 'Heat Protection',
        description: 'Stay hydrated, use sunscreen, and avoid direct sunlight during 11 AM - 3 PM. Carry electrolyte solutions.',
        priority: 'high',
        icon: <Thermometer className="h-4 w-4" />,
        applicable: travelData ? isSummer(travelData.startDate) : true
      },
      {
        id: 'cultural-respect',
        category: 'cultural',
        title: 'Cultural Sensitivity',
        description: 'Dress modestly when visiting temples and religious sites. Remove footwear before entering sacred spaces.',
        priority: 'medium',
        icon: <Users className="h-4 w-4" />,
        applicable: true
      },
      {
        id: 'water-safety',
        category: 'health',
        title: 'Water and Food Safety',
        description: 'Drink bottled or boiled water. Eat freshly cooked food from reputable establishments. Avoid street food if you have a sensitive stomach.',
        priority: 'high',
        icon: <Heart className="h-4 w-4" />,
        applicable: true
      },
      {
        id: 'backwater-safety',
        category: 'travel',
        title: 'Backwater Navigation',
        description: 'Always wear life jackets during houseboat trips. Choose licensed operators and check weather conditions.',
        priority: 'high',
        icon: <Car className="h-4 w-4" />,
        applicable: travelData?.destination?.toLowerCase().includes('alleppey') || 
                   travelData?.destination?.toLowerCase().includes('kumarakom') || false
      },
      {
        id: 'hill-station-safety',
        category: 'travel',
        title: 'Hill Station Precautions',
        description: 'Drive carefully on winding roads. Carry warm clothing as temperatures drop at night. Be cautious of wildlife.',
        priority: 'medium',
        icon: <MapPin className="h-4 w-4" />,
        applicable: travelData?.destination?.toLowerCase().includes('munnar') ||
                   travelData?.destination?.toLowerCase().includes('wayanad') ||
                   travelData?.destination?.toLowerCase().includes('thekkady') || false
      },
      {
        id: 'document-safety',
        category: 'general',
        title: 'Document Security',
        description: 'Keep photocopies of important documents. Store originals in hotel safe. Carry digital copies on phone.',
        priority: 'medium',
        icon: <Wallet className="h-4 w-4" />,
        applicable: true
      },
      {
        id: 'photography-ethics',
        category: 'cultural',
        title: 'Photography Guidelines',
        description: 'Ask permission before photographing people. Respect no-photography zones in temples and museums.',
        priority: 'low',
        icon: <Camera className="h-4 w-4" />,
        applicable: true
      }
    ];

    return tips.filter(tip => tip.applicable);
  }, [travelData, isMonSoon, isSummer]);

  const emergencyContacts: EmergencyContact[] = [
    { service: 'Police', number: '100', description: 'For emergencies and crimes' },
    { service: 'Ambulance', number: '108', description: 'Medical emergencies' },
    { service: 'Fire Service', number: '101', description: 'Fire and rescue' },
    { service: 'Tourist Helpline', number: '1363', description: 'Tourist assistance and complaints' },
    { service: 'Women Helpline', number: '1091', description: 'Women safety and assistance' },
    { service: 'Coastal Security', number: '1093', description: 'Maritime emergencies' },
    { service: 'KSTDC (Kerala Tourism)', number: '+91-471-2321132', description: 'Official tourism support' }
  ];

  const healthRecommendations: HealthRecommendation[] = [
    { item: 'First Aid Kit', description: 'Basic medicines, band-aids, antiseptic', required: true },
    { item: 'Mosquito Repellent', description: 'DEET-based repellent for tropical climate', required: true },
    { item: 'Sunscreen (SPF 30+)', description: 'Protection from strong UV rays', required: true },
    { item: 'Water Purification Tablets', description: 'Backup for water safety', required: false },
    { item: 'Anti-diarrheal Medicine', description: 'For stomach upsets from new food', required: true },
    { item: 'Pain Relievers', description: 'Paracetamol/Ibuprofen for headaches', required: true },
    { item: 'Antihistamine', description: 'For allergic reactions', required: false },
    { item: 'Thermometer', description: 'Digital thermometer for fever check', required: false },
    { item: 'Hand Sanitizer', description: 'Alcohol-based sanitizer', required: true },
    { item: 'Rehydration Salts', description: 'ORS packets for dehydration', required: true, season: 'summer' }
  ];



  const getHighPriorityCount = () => {
    return safetyTips.filter(tip => tip.priority === 'high').length;
  };

  const getSafetyScore = () => {
    const totalTips = safetyTips.length;
    const highPriorityTips = safetyTips.filter(tip => tip.priority === 'high').length;
    
    if (highPriorityTips === 0) return { score: 95, level: 'Excellent', color: 'text-green-600' };
    if (highPriorityTips <= 2) return { score: 85, level: 'Good', color: 'text-blue-600' };
    if (highPriorityTips <= 4) return { score: 70, level: 'Moderate', color: 'text-yellow-600' };
    return { score: 60, level: 'Needs Attention', color: 'text-orange-600' };
  };

  const safetyScore = getSafetyScore();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant={getHighPriorityCount() > 0 ? "default" : "ghost"} 
          size="sm" 
          className={`relative ${getHighPriorityCount() > 0 ? 'animate-pulse' : ''}`}
        >
          <Shield className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Safety Advisor</span>
          {getHighPriorityCount() > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white"
            >
              {getHighPriorityCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Safety Advisor
          </SheetTitle>
          <SheetDescription>
            Personalized safety recommendations for your Kerala journey
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="emergency">Emergency</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Safety Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Safety Score</span>
                    <span className={`text-2xl font-bold ${safetyScore.color}`}>
                      {safetyScore.score}%
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Current safety preparedness level: <strong>{safetyScore.level}</strong>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>High Priority Items</span>
                      <Badge variant={getHighPriorityCount() > 0 ? "destructive" : "secondary"}>
                        {getHighPriorityCount()} remaining
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Total Recommendations</span>
                      <span>{safetyTips.length} items</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('emergency')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency Contacts
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('health')}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Health Checklist
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('tips')}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Safety Tips
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                </CardContent>
              </Card>

              {/* Current Context */}
              {travelData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Trip Context</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{travelData.source} → {travelData.destination}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{travelData.duration} days</span>
                    </div>
                    {travelerData && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{travelerData.travelers.length} travelers</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {safetyTips.map((tip) => (
                    <Card key={tip.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {tip.icon}
                            <CardTitle className="text-base">{tip.title}</CardTitle>
                          </div>
                          <Badge 
                            variant={
                              tip.priority === 'high' ? 'destructive' :
                              tip.priority === 'medium' ? 'default' : 'secondary'
                            }
                            className="text-xs"
                          >
                            {tip.priority}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {tip.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="health" className="space-y-4">
              <Alert>
                <Heart className="h-4 w-4" />
                <AlertDescription>
                  Consult your doctor before traveling, especially if you have existing medical conditions.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>Health Checklist</CardTitle>
                  <CardDescription>
                    Essential items for a safe and healthy Kerala trip
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {healthRecommendations.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="mt-1">
                            {item.required ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Info className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{item.item}</h4>
                              {item.required && (
                                <Badge variant="secondary" className="text-xs">Required</Badge>
                              )}
                              {item.season && (
                                <Badge variant="outline" className="text-xs">{item.season}</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emergency" className="space-y-4">
              <Alert>
                <Phone className="h-4 w-4" />
                <AlertDescription>
                  Save these numbers in your phone before traveling. Add +91 prefix when calling from abroad.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                  <CardDescription>
                    Important numbers for emergencies in Kerala
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <h4 className="font-medium">{contact.service}</h4>
                          <p className="text-sm text-muted-foreground">{contact.description}</p>
                        </div>
                        <div className="text-right">
                          <Button variant="outline" size="sm" className="font-mono">
                            {contact.number}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Procedures</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">In case of Medical Emergency:</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Call 108 immediately</li>
                      <li>Provide your exact location</li>
                      <li>Stay calm and follow dispatcher instructions</li>
                      <li>Contact your hotel/travel agent</li>
                      <li>Notify family members</li>
                    </ol>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Lost Documents:</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Report to nearest police station</li>
                      <li>Get a copy of FIR (First Information Report)</li>
                      <li>Contact your embassy/consulate (if foreign tourist)</li>
                      <li>Apply for duplicate documents</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}