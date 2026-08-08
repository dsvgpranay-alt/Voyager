import React from 'react';
import { Plane, Heart, LogOut, MapPin, ShoppingCart, Shield, Compass, Menu, Eye, UtensilsCrossed } from 'lucide-react';
import { TravelForm, TravelData } from './components/TravelForm';
import { TravelerDetails, TravelerDetailsData } from './components/TravelerDetails';
import { BudgetCalculator } from './components/BudgetCalculator';
import { TravelSummary } from './components/TravelSummary';
import { TravelChatbot } from './components/TravelChatbot';
import { SignIn } from './components/SignIn';
import { ExploreMap } from './components/ExploreMap';
import { MobileNotificationBar } from './components/MobileNotificationBar';
import { ECommerce } from './components/ECommerce';
import { TravelInsurance } from './components/TravelInsurance';
import { EnhancedTourism } from './components/EnhancedTourism';
import { Virtual360View } from './components/Virtual360View';
import { KeralaFoods } from './components/KeralaFoods';
import { WeatherAlertDemo } from './components/WeatherAlertDemo';

import { AppSidebar } from './components/AppSidebar';
import { SidebarToggle, FloatingSidebarToggle } from './components/SidebarToggle';


import { SafetyAlertDemo } from './components/SafetyAlertDemo';
import { SafeRoutes } from './components/SafeRoutes';
import { SafetyAdvisor } from './components/SafetyAdvisor';
import { SafetyChecklist } from './components/SafetyChecklist';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { CartProvider, useCart } from './hooks/useCart';
import { ThemeProvider } from './hooks/useTheme';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import { HeaderLanguageToggle } from './components/HeaderLanguageToggle';

type Step = 'travel' | 'travelers' | 'budget' | 'routes' | 'safety-checklist' | 'summary' | 'explore' | 'ecommerce' | 'insurance' | 'tourism' | 'virtual360' | 'foods';

interface AuthData {
  username: string;
  password: string;
  name?: string;
}

function AppContent() {
  const { getTotalItems } = useCart();
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [authError, setAuthError] = React.useState<string>('');
  const [userData, setUserData] = React.useState<AuthData | null>(null);
  const [currentStep, setCurrentStep] = React.useState<Step>('travel');
  const [travelData, setTravelData] = React.useState<TravelData | null>(null);
  const [travelerData, setTravelerData] = React.useState<TravelerDetailsData | null>(null);
  const [totalBudget, setTotalBudget] = React.useState<number>(0);
  const [showMobileNotification, setShowMobileNotification] = React.useState(true);
  const [isInitializing, setIsInitializing] = React.useState(true);

  React.useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('voyager-auth');
      const storedUserData = localStorage.getItem('voyager-user');
      if (storedAuth === 'true' && storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        if (parsedUserData && parsedUserData.username) {
          // Ensure name field exists, migrate old data if needed
          if (!parsedUserData.name) {
            parsedUserData.name = 'User';
            localStorage.setItem('voyager-user', JSON.stringify(parsedUserData));
          }
          setIsAuthenticated(true);
          setUserData(parsedUserData);
        } else {
          // Clear invalid stored data
          localStorage.removeItem('voyager-auth');
          localStorage.removeItem('voyager-user');
        }
      }
    } catch (error) {
      console.error('Error loading stored authentication:', error);
      localStorage.removeItem('voyager-auth');
      localStorage.removeItem('voyager-user');
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const handleTravelSubmit = React.useCallback((data: TravelData) => {
    setTravelData(data);
    setCurrentStep('travelers');
  }, []);

  const handleTravelerSubmit = React.useCallback((data: TravelerDetailsData) => {
    setTravelerData(data);
    setCurrentStep('budget');
  }, []);

  const handleBudgetComplete = React.useCallback(() => {
    setCurrentStep('routes');
  }, []);

  const handleRoutesComplete = React.useCallback(() => {
    setCurrentStep('safety-checklist');
  }, []);

  const handleSafetyChecklistComplete = React.useCallback(() => {
    setCurrentStep('summary');
  }, []);

  const validateEmail = React.useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePhone = React.useCallback((phone: string) => {
    // Remove all spaces, dashes, and parentheses
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    // Allow optional + at start, then exactly 10 digits (for Indian phone numbers)
    const phoneRegex = /^[\+]?[1-9][\d]{9}$/;
    return phoneRegex.test(cleanPhone) && cleanPhone.length <= 11; // +91xxxxxxxxxx = 11 chars max
  }, []);

  const handleSignIn = React.useCallback((authData: AuthData) => {
    // Simple validation - in a real app, you'd validate against a backend
    if (authData.password.length < 6) {
      setAuthError('Password must be at least 6 characters long');
      return;
    }

    if (!validateEmail(authData.username) && !validatePhone(authData.username)) {
      setAuthError('Please enter a valid email address or phone number');
      return;
    }

    // Check if user exists (simulate database check)
    try {
      const existingUsers = JSON.parse(localStorage.getItem('voyager-users') || '[]');
      const existingUser = existingUsers.find((user: AuthData) => user.username === authData.username);

      if (existingUser) {
        // Sign in existing user
        if (existingUser.password === authData.password) {
          // Store authentication with existing user's name
          const userDataWithName = {
            username: existingUser.username,
            password: existingUser.password,
            name: existingUser.name || 'User'
          };
          localStorage.setItem('voyager-auth', 'true');
          localStorage.setItem('voyager-user', JSON.stringify(userDataWithName));
          setUserData(userDataWithName);
          setIsAuthenticated(true);
          setAuthError('');
        } else {
          setAuthError('Incorrect password. Please try again.');
        }
      } else {
        // Create new user account
        const newUserData = {
          username: authData.username,
          password: authData.password,
          name: authData.name || 'User'
        };
        const newUsers = [...existingUsers, newUserData];
        localStorage.setItem('voyager-users', JSON.stringify(newUsers));
        localStorage.setItem('voyager-auth', 'true');
        localStorage.setItem('voyager-user', JSON.stringify(newUserData));
        setUserData(newUserData);
        setIsAuthenticated(true);
        setAuthError('');
      }
    } catch (error) {
      console.error('Error handling sign in:', error);
      setAuthError('An error occurred. Please try again.');
    }
  }, [validateEmail, validatePhone]);

  const handleSignOut = React.useCallback(() => {
    localStorage.removeItem('voyager-auth');
    localStorage.removeItem('voyager-user');
    setIsAuthenticated(false);
    setUserData(null);
    setCurrentStep('travel');
    setTravelData(null);
    setTravelerData(null);
    setTotalBudget(0);
  }, []);

  const handleStartNew = React.useCallback(() => {
    setCurrentStep('travel');
    setTravelData(null);
    setTravelerData(null);
    setTotalBudget(0);
    setShowMobileNotification(true);
  }, []);

  const handleViewNotification = React.useCallback(() => {
    // Navigate to summary if trip is complete, otherwise to current step
    if (travelData && travelerData && totalBudget > 0) {
      setCurrentStep('summary');
    } else if (travelData && travelerData) {
      setCurrentStep('safety-checklist');
    } else if (travelData) {
      setCurrentStep('travelers');
    } else {
      setCurrentStep('travel');
    }
    setShowMobileNotification(false);
  }, [travelData, travelerData, totalBudget]);

  const handleDismissNotification = React.useCallback(() => {
    setShowMobileNotification(false);
  }, []);

  const handleToggleNotification = React.useCallback((show: boolean) => {
    setShowMobileNotification(show);
  }, []);



  const calculateTotalBudget = React.useCallback((travelData: TravelData, travelerData: TravelerDetailsData): number => {
    const { duration } = travelData;
    const { travelers, accommodationType, transportPreference } = travelerData;
    const numTravelers = travelers.length;

    const accommodationRates = {
      budget: 2250,
      'mid-range': 4500,
      luxury: 10500,
      resort: 22500,
      homestay: 1750,
      houseboat: 8500
    };

    const transportCosts = {
      taxi: numTravelers * 3000,
      bus: numTravelers * 800,
      train: numTravelers * 1500,
      'self-drive': 4500,
      bike: numTravelers * 1200,
      flight: numTravelers * 6000
    };

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
    const food = 800 * numTravelers * duration;
    const sightseeing = (sightseeingCosts[travelData.destination as keyof typeof sightseeingCosts] || 2000) * numTravelers;
    const shopping = 1500 * numTravelers;
    const miscellaneous = 1000 * numTravelers;

    return accommodation + transport + food + sightseeing + shopping + miscellaneous;
  }, []);

  React.useEffect(() => {
    if (travelData && travelerData && currentStep === 'budget') {
      const budget = calculateTotalBudget(travelData, travelerData);
      setTotalBudget(budget);
    }
  }, [travelData, travelerData, currentStep, calculateTotalBudget]);

  // Show loading while initializing
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="relative">
            <Plane className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-4 bg-green-400 rounded-full animate-ping" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">VOYAGER</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show sign-in page if not authenticated
  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <SignIn onSignIn={handleSignIn} error={authError} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          {/* Sidebar */}
          <AppSidebar
            currentStep={currentStep}
            onNavigate={setCurrentStep}
            onSignOut={handleSignOut}
            userName={userData?.name}
            travelData={travelData}
            travelerData={travelerData}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col relative">
            {/* Floating Sidebar Toggle - Shows when sidebar is collapsed */}
            <FloatingSidebarToggle />
            {/* Mobile Notification Bar - Show based on toggle */}
            <MobileNotificationBar 
              showNotification={showMobileNotification}
              onViewNotification={handleViewNotification}
              onDismissNotification={handleDismissNotification}
            />

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Enhanced Menu Toggle Button */}
                    <div className="flex items-center gap-1 sm:gap-2">
                      <SidebarToggle />
                      <div className="hidden sm:block h-6 w-px bg-border" />
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="relative">
                        <Plane className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                        <div className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 bg-green-500 rounded-full animate-pulse" />
                      </div>
                      <div className="hidden sm:block">
                        <h1 className="text-xl sm:text-2xl font-bold text-primary">{t('app.title')}</h1>
                        <p className="text-xs text-muted-foreground hidden md:block">{t('app.subtitle')}</p>
                      </div>
                      {/* Mobile title */}
                      <div className="block sm:hidden">
                        <h1 className="text-lg font-bold text-primary">{t('app.title')}</h1>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-4">
                    <HeaderLanguageToggle />
                    
                    <SafetyAdvisor 
                      travelData={travelData}
                      travelerData={travelerData}
                      currentStep={currentStep}
                    />
                    
                    <div className="hidden lg:flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{t('app.made_with')}</span>
                      <Heart className="h-4 w-4 text-red-500 fill-current" />
                      <span className="text-sm text-muted-foreground">{t('app.for_kerala')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Hero Section */}
            {currentStep === 'travel' && (
              <div className="hidden sm:block relative py-12 sm:py-16 md:py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1654530050931-3b02b28570c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZXJhbGElMjBiYWNrd2F0ZXJzJTIwdHJhdmVsfGVufDF8fHx8MTc1NzMyNTQxNnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Kerala Backwaters"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                    {t('hero.title')}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                    {t('hero.subtitle')}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm mb-6 sm:mb-8 px-4">
                    <span className="bg-white/20 backdrop-blur px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                      {t('hero.feature.backwaters')}
                    </span>
                    <span className="bg-white/20 backdrop-blur px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                      {t('hero.feature.hills')}
                    </span>
                    <span className="bg-white/20 backdrop-blur px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                      {t('hero.feature.beaches')}
                    </span>
                    <span className="bg-white/20 backdrop-blur px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                      {t('hero.feature.culture')}
                    </span>
                  </div>
                  
                  {/* Quick Access Features */}
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep('virtual360')}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs sm:text-sm"
                    >
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">{t('hero.virtual_tours')}</span>
                      <span className="sm:hidden">360°</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep('ecommerce')}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs sm:text-sm"
                    >
                      <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">{t('hero.shop_products')}</span>
                      <span className="sm:hidden">Shop</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep('insurance')}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs sm:text-sm"
                    >
                      <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">{t('hero.travel_insurance')}</span>
                      <span className="sm:hidden">Insurance</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep('tourism')}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs sm:text-sm"
                    >
                      <Compass className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">{t('hero.explore_tourism')}</span>
                      <span className="sm:hidden">Explore</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStep('foods')}
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs sm:text-sm"
                    >
                      <UtensilsCrossed className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Kerala Foods</span>
                      <span className="sm:hidden">Foods</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step Indicator - Only show for planning flow */}
            {!['explore', 'ecommerce', 'insurance', 'tourism', 'virtual360', 'foods'].includes(currentStep) && (
              <div className="container mx-auto px-4 py-6 sm:py-8">
                <div className="w-full mb-6 sm:mb-8">
                  {/* Desktop step indicator */}
                  <div className="hidden md:flex items-center justify-center space-x-4">
                    {(['travel', 'travelers', 'budget', 'routes', 'safety-checklist', 'summary'] as Step[]).map((step, index) => (
                      <div key={step} className="flex items-center">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                          ${currentStep === step || (['travel', 'travelers', 'budget', 'routes', 'safety-checklist', 'summary'] as Step[]).indexOf(currentStep) > index
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                          }
                        `}>
                          {index + 1}
                        </div>
                        {index < 5 && (
                          <div className={`
                            w-16 h-1 mx-2
                            ${(['travel', 'travelers', 'budget', 'routes', 'safety-checklist', 'summary'] as Step[]).indexOf(currentStep) > index
                              ? 'bg-primary'
                              : 'bg-muted'
                            }
                          `} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile step indicator - progress bar */}
                  {(() => {
                    const steps = ['travel', 'travelers', 'budget', 'routes', 'safety-checklist', 'summary'] as Step[];
                    const stepNames = ['Travel', 'Travelers', 'Budget', 'Routes', 'Safety', 'Summary'];
                    const currentIndex = steps.indexOf(currentStep);
                    const progress = ((currentIndex + 1) / steps.length) * 100;
                    return (
                      <div className="flex md:hidden flex-col gap-2 w-full px-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-primary">
                            Step {currentIndex + 1} <span className="font-normal text-muted-foreground">of {steps.length}</span>
                          </span>
                          <span className="font-medium">{stepNames[currentIndex]}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex justify-center px-2 sm:px-4">
              {currentStep === 'travel' && (
                <div className="w-full max-w-6xl mx-auto space-y-8">
                  <TravelForm onSubmit={handleTravelSubmit} />
                  
                  {/* Weather Features Demo Section */}
                  <div className="px-4 space-y-8">
                    {/* Comprehensive Weather Alert System */}
                    <WeatherAlertDemo destination={travelData?.destination} />
                  </div>
                </div>
              )}
              
              {currentStep === 'travelers' && travelData && (
                <TravelerDetails
                  destination={travelData.destination}
                  onSubmit={handleTravelerSubmit}
                  onBack={() => setCurrentStep('travel')}
                />
              )}
              
              {currentStep === 'budget' && travelData && travelerData && (
                <BudgetCalculator
                  travelData={travelData}
                  travelerData={travelerData}
                  onBack={() => setCurrentStep('travelers')}
                  onComplete={handleBudgetComplete}
                />
              )}
              
              {currentStep === 'routes' && travelData && travelerData && (
                <SafeRoutes
                  from={travelData.source}
                  to={travelData.destination}
                  onBack={() => setCurrentStep('budget')}
                  onContinue={handleRoutesComplete}
                />
              )}
              
              {currentStep === 'safety-checklist' && travelData && travelerData && (
                <SafetyChecklist
                  travelData={travelData}
                  travelerData={travelerData}
                  onBack={() => setCurrentStep('routes')}
                  onComplete={handleSafetyChecklistComplete}
                />
              )}
              
              {currentStep === 'summary' && travelData && travelerData && (
                <TravelSummary
                  travelData={travelData}
                  travelerData={travelerData}
                  totalBudget={totalBudget}
                  onStartNew={handleStartNew}
                />
              )}

              {currentStep === 'explore' && (
                <div className="w-full max-w-6xl mx-auto space-y-8">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('travel')}
                      className="flex items-center gap-2"
                    >
                      {t('nav.back_to_planning')}
                    </Button>
                  </div>
                  
                  {/* Safety Alert Demo */}
                  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                    <SafetyAlertDemo 
                      currentDestination={travelData?.destination} 
                      travelData={travelData}
                    />
                  </div>

                  {/* Weather Alert System */}
                  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                    <WeatherAlertDemo destination={travelData?.destination} />
                  </div>
                  
                  {/* Google Maps */}
                  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                    <ExploreMap />
                  </div>
                </div>
              )}

              {currentStep === 'ecommerce' && (
                <ECommerce
                  destination={travelData?.destination}
                  onBack={() => setCurrentStep('travel')}
                />
              )}

              {currentStep === 'insurance' && (
                <TravelInsurance
                  travelData={travelData}
                  travelerData={travelerData}
                  onBack={() => setCurrentStep('travel')}
                  onContinue={() => setCurrentStep('summary')}
                />
              )}

              {currentStep === 'tourism' && travelData && (
                <EnhancedTourism
                  destination={travelData.destination}
                  travelData={travelData}
                  onBack={() => setCurrentStep('travel')}
                />
              )}

              {currentStep === 'virtual360' && (
                <div className="w-full max-w-7xl mx-auto space-y-8 px-4">
                  <Virtual360View
                    destination={travelData?.destination}
                    onClose={() => setCurrentStep('travel')}
                  />
                </div>
              )}

              {currentStep === 'foods' && (
                <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
                  <KeralaFoods onBack={() => setCurrentStep('travel')} />
                </div>
              )}
            </div>

            {/* Footer */}
            <footer className="bg-muted/50 border-t mt-20">
              <div className="container mx-auto px-4 py-8">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Plane className="h-5 w-5 text-primary" />
                    <span className="font-semibold">VOYAGER</span>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    {t('footer.description')}
                  </p>
                  <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                    <span>{t('footer.copyright')}</span>
                    <span>•</span>
                    <span>{t('footer.kerala_tourism')}</span>
                    <span>•</span>
                    <span>{t('footer.travel_responsibly')}</span>
                  </div>
                  
                  {/* Professional Footnotes */}
                  <div className="border-t pt-6 mt-8">
                    <div className="space-y-3 text-xs text-muted-foreground">
                      <div className="flex items-center justify-center gap-8 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{t('footer.visit_kerala')}</span>
                          <a 
                            href="https://www.keralatourism.org" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                          >
                            www.keralatourism.org
                          </a>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <span className="font-medium">{t('footer.emergency')}</span>
                            <span className="font-mono text-red-600">112</span>
                          </span>
                          <span className="text-muted-foreground">|</span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium">{t('footer.tourist_helpline')}</span>
                            <span className="font-mono text-blue-600">0471-2321132</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </footer>

            {/* Travel Chatbot */}
            <TravelChatbot 
              currentStep={currentStep}
              travelData={travelData}
              travelerData={travelerData}
            />

            {/* Toast Notifications */}
            <Toaster 
              position="top-right" 
              richColors 
              expand={true}
              visibleToasts={5}
            />
          </div>
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}