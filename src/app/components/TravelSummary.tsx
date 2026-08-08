import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Users, 
  IndianRupee,
  Download,
  Share,
  RotateCcw,
  FileText,
  FileImage,
  Printer,
  MessageCircle,
  Mail,
  Copy,
  Smartphone
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { WeatherInfo } from './WeatherInfo';
import { PlacesToVisit } from './PlacesToVisit';
import { FeedbackForm } from './FeedbackForm';
import { GoogleMaps } from './GoogleMaps';
import { TravelData } from './TravelForm';
import { TravelerDetailsData } from './TravelerDetails';
import { format } from 'date-fns';
import { downloadTripAsFile, printTrip, TripExportData } from '../utils/tripExport';
import { 
  shareViaWhatsApp, 
  shareViaEmail, 
  shareViaTelegram,
  shareViaTwitter,
  shareViaFacebook,
  copyToClipboard,
  shareViaNativeAPI
} from '../utils/tripShare';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from './ui/dropdown-menu';
import { SharePreview } from './SharePreview';
import { SafetyAlert, keralaSafetyAlerts } from './SafetyAlert';
import { toast } from 'sonner@2.0.3';

interface TravelSummaryProps {
  travelData: TravelData;
  travelerData: TravelerDetailsData;
  totalBudget: number;
  onStartNew: () => void;
}

const destinationImages = {
  'Kochi (Cochin)': 'https://images.unsplash.com/photo-1654530050931-3b02b28570c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZXJhbGElMjBiYWNrd2F0ZXJzJTIwdHJhdmVsfGVufDF8fHx8MTc1NzMyNTQxNnww&ixlib=rb-4.1.0&q=80&w=1080',
  'Munnar': 'https://images.unsplash.com/photo-1673118857471-34bedcb90ee7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZXJhbGElMjB0ZWElMjBwbGFudGF0aW9uJTIwbW91bnRhaW5zfGVufDF8fHx8MTc1NzMyNTQxNnww&ixlib=rb-4.1.0&q=80&w=1080',
  'Alleppey (Alappuzha)': 'https://images.unsplash.com/photo-1654530050931-3b02b28570c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZXJhbGElMjBiYWNrd2F0ZXJzJTIwdHJhdmVsfGVufDF8fHx8MTc1NzMyNTQxNnww&ixlib=rb-4.1.0&q=80&w=1080',
  'Kovalam': 'https://images.unsplash.com/photo-1615289139857-99b7eb0702dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZXJhbGElMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NTczMjU0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
};

export function TravelSummary({ travelData, travelerData, totalBudget, onStartNew }: TravelSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const tripExportData: TripExportData = {
    travelData,
    travelerData,
    totalBudget,
    generatedAt: new Date()
  };

  const handleDownloadTxt = () => {
    downloadTripAsFile(tripExportData, 'txt');
    toast.success('Trip details downloaded as text file!');
  };

  const handleDownloadHTML = () => {
    downloadTripAsFile(tripExportData, 'html');
    toast.success('Trip details downloaded as HTML file!');
  };

  const handlePrint = () => {
    printTrip(tripExportData);
    toast.success('Opening print dialog...');
  };

  const handleWhatsAppShare = () => {
    shareViaWhatsApp(tripExportData);
    toast.success('Opening WhatsApp to share your trip!');
  };

  const handleEmailShare = () => {
    shareViaEmail(tripExportData);
    toast.success('Opening email client to share your trip!');
  };

  const handleTelegramShare = () => {
    shareViaTelegram(tripExportData);
    toast.success('Opening Telegram to share your trip!');
  };

  const handleTwitterShare = () => {
    shareViaTwitter(tripExportData);
    toast.success('Opening Twitter to share your trip!');
  };

  const handleFacebookShare = () => {
    shareViaFacebook(tripExportData);
    toast.success('Opening Facebook to share your trip!');
  };

  const handleCopyToClipboard = async () => {
    const result = await copyToClipboard(tripExportData);
    if (result.success) {
      if (result.method === 'manual-popup') {
        toast.success('Text opened in new window for manual copying');
      } else {
        toast.success('Trip details copied to clipboard!');
      }
    } else {
      toast.error('Copy failed - please try downloading as text file instead', {
        action: {
          label: 'Download',
          onClick: handleDownloadTxt,
        },
      });
    }
  };

  const handleNativeShare = async () => {
    const success = await shareViaNativeAPI(tripExportData);
    if (!success) {
      // Fallback to copy to clipboard
      toast.info('Native sharing not available, copying to clipboard instead...');
      await handleCopyToClipboard();
    } else {
      toast.success('Trip shared successfully!');
    }
  };

  const handleSharePreview = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        handleWhatsAppShare();
        break;
      case 'email':
        handleEmailShare();
        break;
      case 'telegram':
        handleTelegramShare();
        break;
      case 'copy':
        handleCopyToClipboard();
        break;
      default:
        toast.error('Unknown sharing platform');
    }
  };

  // Generate safety alert based on destination
  const getSafetyAlert = () => {
    const riskAreas = ['Munnar', 'Wayanad', 'Idukki', 'Thekkady'];
    if (riskAreas.includes(travelData.destination)) {
      switch (travelData.destination) {
        case 'Munnar':
          return keralaSafetyAlerts.landslide('Munnar');
        case 'Wayanad':
          return keralaSafetyAlerts.wildlife('Wayanad');
        case 'Idukki':
          return keralaSafetyAlerts.weatherWarning('Idukki');
        case 'Thekkady':
          return keralaSafetyAlerts.wildlife('Thekkady');
        default:
          return null;
      }
    }
    return null;
  };

  const safetyAlert = getSafetyAlert();

  const handleViewSafeRoutes = () => {
    toast.success('Opening safe route recommendations...');
    // In a real app, this would navigate to safe routes or maps
  };

  const handleDismissSafetyAlert = () => {
    toast.info('Safety alert dismissed');
  };

  const getDestinationImage = (destination: string) => {
    return destinationImages[destination as keyof typeof destinationImages] || 
           'https://images.unsplash.com/photo-1654530050931-3b02b28570c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZXJhbGElMjBiYWNrd2F0ZXJzJTIwdHJhdmVsfGVufDF8fHx8MTc1NzMyNTQxNnww&ixlib=rb-4.1.0&q=80&w=1080';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Safety Alert - Show if destination has risks */}
      {safetyAlert && (
        <SafetyAlert
          location={safetyAlert.location}
          riskType={safetyAlert.riskType}
          description={safetyAlert.description}
          severity={safetyAlert.severity}
          timeInfo={safetyAlert.timeInfo}
          onViewRoutes={handleViewSafeRoutes}
          onDismiss={handleDismissSafetyAlert}
        />
      )}

      {/* Success Header */}
      <Card className="border-green-500/20 bg-green-50 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
                Your Kerala Trip is Planned!
              </h1>
              <p className="text-green-600 dark:text-green-300 mt-2">
                Your personalized travel itinerary and budget estimation is ready
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trip Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Trip Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Destination Image */}
          <div className="relative h-48 w-full rounded-lg overflow-hidden">
            <ImageWithFallback
              src={getDestinationImage(travelData.destination)}
              alt={travelData.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end">
              <div className="p-4 text-white">
                <h2 className="text-xl font-bold">{travelData.destination}</h2>
                <p>Kerala, God's Own Country</p>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Route</p>
                <p className="font-medium">{travelData.source} → {travelData.destination}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{travelData.duration} Days</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Travelers</p>
                <p className="font-medium">{travelerData.travelers.length} People</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <IndianRupee className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="font-medium">{formatCurrency(totalBudget)}</p>
              </div>
            </div>
          </div>

          {/* Travel Dates */}
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Travel Dates</p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium">Start Date</p>
                  <p className="text-sm text-muted-foreground">
                    {travelData.startDate ? format(travelData.startDate, 'PPP') : 'Not set'}
                  </p>
                </div>
                <div className="text-muted-foreground">→</div>
                <div>
                  <p className="font-medium">End Date</p>
                  <p className="text-sm text-muted-foreground">
                    {travelData.endDate ? format(travelData.endDate, 'PPP') : 'Not set'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Maps Integration */}
      <GoogleMaps 
        destination={travelData.destination}
        source={travelData.source}
        showRoute={true}
      />

      {/* Weather Information */}
      <WeatherInfo 
        destination={travelData.destination}
        startDate={travelData.startDate}
        endDate={travelData.endDate}
      />

      {/* Places to Visit */}
      <PlacesToVisit destination={travelData.destination} travelData={travelData} />

      {/* Traveler Information */}
      <Card>
        <CardHeader>
          <CardTitle>Traveler Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {travelerData.travelers.map((traveler, index) => (
              <div key={traveler.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium text-primary">{traveler.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-medium">{traveler.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Age: {traveler.age}</span>
                      <span>Contact: {traveler.contact}</span>
                    </div>
                  </div>
                </div>
                {index === 0 && <Badge variant="secondary">Primary</Badge>}
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="font-medium">Accommodation Preference</p>
              <Badge variant="outline" className="capitalize">
                {travelerData.accommodationType.replace('-', ' ')}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Transport Preference</p>
              <Badge variant="outline" className="capitalize">
                {travelerData.transportPreference.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Download Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Itinerary
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Download Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDownloadTxt}>
                  <FileText className="h-4 w-4 mr-2" />
                  Download as Text (.txt)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadHTML}>
                  <FileImage className="h-4 w-4 mr-2" />
                  Download as HTML (.html)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print Itinerary
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Share Options */}
            <SharePreview 
              tripData={tripExportData}
              onShare={handleSharePreview}
            />

            {/* Plan New Trip */}
            <Button onClick={onStartNew} className="w-full">
              <RotateCcw className="h-4 w-4 mr-2" />
              Plan New Trip
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Form */}
      <FeedbackForm />

      {/* Footer Note */}
      <Card className="border-amber-500/20 bg-amber-50 dark:bg-amber-950/20">
        <CardContent className="pt-6">
          <p className="text-sm text-amber-700 dark:text-amber-300 text-center">
            <strong>Note:</strong> Budget estimates are approximate and may vary based on season, availability, and personal preferences. 
            We recommend booking accommodations and transport in advance for better rates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}