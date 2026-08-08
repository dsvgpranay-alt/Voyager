import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';
import { 
  Shield, 
  Heart, 
  Plane, 
  MapPin, 
  Clock, 
  Users, 
  Check, 
  X,
  AlertTriangle,
  FileText,
  Phone,
  Mail,
  CreditCard,
  Calendar,
  Star,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { TravelData } from './TravelForm';
import { TravelerDetailsData } from './TravelerDetails';

interface InsurancePlan {
  id: string;
  name: string;
  type: 'basic' | 'standard' | 'premium';
  price: number;
  pricePerDay: number;
  coverage: number;
  features: string[];
  exclusions: string[];
  popular?: boolean;
  recommended?: boolean;
}

interface TravelInsuranceProps {
  travelData?: TravelData;
  travelerData?: TravelerDetailsData;
  onBack: () => void;
  onContinue?: () => void;
}

export function TravelInsurance({ travelData, travelerData, onBack, onContinue }: TravelInsuranceProps) {
  const [selectedPlan, setSelectedPlan] = React.useState<string>('');
  const [agreeToTerms, setAgreeToTerms] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState<string>('');

  const numTravelers = travelerData?.travelers.length || 1;
  const duration = travelData?.duration || 1;

  const insurancePlans: InsurancePlan[] = [
    {
      id: 'basic',
      name: 'Basic Protection',
      type: 'basic',
      price: 299 * numTravelers,
      pricePerDay: Math.round(299 / duration),
      coverage: 100000,
      features: [
        'Emergency medical expenses up to ₹1 Lakh',
        'Trip cancellation coverage',
        'Lost baggage compensation (₹5,000)',
        '24/7 emergency assistance',
        'Accidental death coverage (₹2 Lakh)'
      ],
      exclusions: [
        'Pre-existing medical conditions',
        'Adventure sports coverage',
        'Flight delay compensation'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Protection',
      type: 'standard',
      price: 549 * numTravelers,
      pricePerDay: Math.round(549 / duration),
      coverage: 300000,
      popular: true,
      features: [
        'Emergency medical expenses up to ₹3 Lakh',
        'Trip cancellation & interruption',
        'Lost baggage compensation (₹15,000)',
        'Flight delay compensation (₹2,000)',
        '24/7 emergency assistance',
        'Accidental death coverage (₹5 Lakh)',
        'Emergency evacuation coverage',
        'Personal liability coverage'
      ],
      exclusions: [
        'Pre-existing conditions (not declared)',
        'High-risk adventure sports',
        'War and terrorism (limited coverage)'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Protection',
      type: 'premium',
      price: 899 * numTravelers,
      pricePerDay: Math.round(899 / duration),
      coverage: 500000,
      recommended: travelData?.destination === 'Thekkady (Periyar)' || travelData?.destination === 'Wayanad',
      features: [
        'Emergency medical expenses up to ₹5 Lakh',
        'Comprehensive trip cancellation',
        'Lost baggage compensation (₹25,000)',
        'Flight delay compensation (₹5,000)',
        '24/7 premium emergency assistance',
        'Accidental death coverage (₹10 Lakh)',
        'Emergency evacuation & repatriation',
        'Personal liability coverage (₹1 Lakh)',
        'Adventure sports coverage',
        'Pre-existing medical conditions (declared)',
        'Trip extension coverage',
        'Rental car coverage'
      ],
      exclusions: [
        'Undeclared pre-existing conditions',
        'Extreme sports (mountaineering, etc.)',
        'War and terrorism in conflict zones'
      ]
    }
  ];

  const getRecommendedPlan = () => {
    // Recommend premium for adventure destinations
    if (travelData?.destination?.includes('Thekkady') || 
        travelData?.destination?.includes('Wayanad') || 
        travelData?.destination?.includes('Munnar')) {
      return 'premium';
    }
    // Recommend standard for longer trips
    if (duration > 5) {
      return 'standard';
    }
    return 'standard'; // Default recommendation
  };

  const recommendedPlanId = getRecommendedPlan();

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePurchase = () => {
    if (!selectedPlan || !agreeToTerms) return;
    
    // Store insurance selection
    localStorage.setItem('voyager-insurance', JSON.stringify({
      planId: selectedPlan,
      planName: insurancePlans.find(p => p.id === selectedPlan)?.name,
      price: insurancePlans.find(p => p.id === selectedPlan)?.price,
      coverage: insurancePlans.find(p => p.id === selectedPlan)?.coverage,
      purchaseDate: new Date().toISOString(),
      travelData,
      travelerData
    }));

    if (onContinue) {
      onContinue();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Button variant="outline" onClick={onBack} className="mb-4">
          ← Back to Planning
        </Button>
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Travel Insurance</h1>
            <p className="text-muted-foreground">
              Protect your Kerala adventure with comprehensive travel insurance
            </p>
          </div>
        </div>

        {/* Trip Summary */}
        {travelData && travelerData && (
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="flex items-center justify-center gap-6 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {travelData.destination}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {duration} days
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {numTravelers} traveler{numTravelers > 1 ? 's' : ''}
                </span>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Insurance Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insurancePlans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`relative h-full ${
              selectedPlan === plan.id 
                ? 'ring-2 ring-primary' 
                : ''
            } ${
              plan.id === recommendedPlanId 
                ? 'border-green-300 bg-green-50/50' 
                : ''
            }`}>
              {/* Badges */}
              <div className="absolute top-4 right-4 space-y-2">
                {plan.popular && (
                  <Badge className="bg-orange-600 text-white">
                    Most Popular
                  </Badge>
                )}
                {plan.id === recommendedPlanId && (
                  <Badge className="bg-green-600 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Shield className={`h-5 w-5 ${
                    plan.type === 'basic' ? 'text-blue-500' :
                    plan.type === 'standard' ? 'text-green-500' :
                    'text-purple-500'
                  }`} />
                  {plan.name}
                </CardTitle>
                <CardDescription>
                  Coverage up to ₹{(plan.coverage / 100000).toFixed(1)} Lakh
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Price */}
                <div className="text-center py-4 border rounded-lg bg-muted/30">
                  <div className="text-3xl font-bold text-primary">
                    ₹{plan.price}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ₹{plan.pricePerDay}/day per person
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Total for {numTravelers} traveler{numTravelers > 1 ? 's' : ''}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-green-700">✓ What's Covered:</h4>
                  <ul className="space-y-1">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 4 && (
                      <li className="text-sm text-muted-foreground">
                        +{plan.features.length - 4} more benefits
                      </li>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4">
                  <Button
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    className="w-full"
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => setShowDetails(showDetails === plan.id ? '' : plan.id)}
                  >
                    {showDetails === plan.id ? 'Hide Details' : 'View Details'}
                  </Button>
                </div>

                {/* Detailed Coverage */}
                {showDetails === plan.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 pt-4 border-t"
                  >
                    {/* All Features */}
                    <div>
                      <h5 className="font-medium text-sm text-green-700 mb-2">All Benefits:</h5>
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs">
                            <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions */}
                    <div>
                      <h5 className="font-medium text-sm text-red-700 mb-2">Not Covered:</h5>
                      <ul className="space-y-1">
                        {plan.exclusions.map((exclusion, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs">
                            <X className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>{exclusion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Terms and Purchase */}
      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Important Information */}
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <div className="space-y-2">
                <p className="font-medium">Important Notes:</p>
                <ul className="text-sm space-y-1 ml-4 list-disc">
                  <li>Insurance must be purchased before travel begins</li>
                  <li>Pre-existing medical conditions must be declared</li>
                  <li>Read policy terms carefully before purchasing</li>
                  <li>Keep emergency contact numbers handy during travel</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">24/7 Emergency Assistance</h4>
                <p className="text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 inline mr-1" />
                  +91-1800-XXX-XXXX
                </p>
                <p className="text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 inline mr-1" />
                  emergency@voyagerinsurance.com
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Claims Department</h4>
                <p className="text-sm text-muted-foreground">
                  <FileText className="h-4 w-4 inline mr-1" />
                  File claims online 24/7
                </p>
                <p className="text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Average claim processing: 3-5 days
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Terms Agreement */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={setAgreeToTerms}
                />
                <div className="text-sm">
                  <label htmlFor="terms" className="cursor-pointer">
                    I agree to the{' '}
                    <button className="text-primary hover:underline">
                      Terms and Conditions
                    </button>{' '}
                    and{' '}
                    <button className="text-primary hover:underline">
                      Privacy Policy
                    </button>
                    . I understand the coverage details and exclusions of the selected plan.
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handlePurchase}
              disabled={!selectedPlan || !agreeToTerms}
              className="px-12"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Purchase Insurance - ₹{insurancePlans.find(p => p.id === selectedPlan)?.price}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Skip Option */}
      <div className="text-center pt-6 border-t">
        <p className="text-sm text-muted-foreground mb-4">
          Travel insurance is highly recommended for your safety and peace of mind.
        </p>
        <Button variant="ghost" onClick={onContinue}>
          Skip Insurance (Not Recommended)
        </Button>
      </div>
    </div>
  );
}