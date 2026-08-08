import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Share, 
  Eye, 
  MessageCircle,
  Mail,
  Copy,
  X
} from 'lucide-react';
import { TripExportData } from '../utils/tripExport';
import { generateShareText } from '../utils/tripShare';
import { motion } from 'motion/react';

interface SharePreviewProps {
  tripData: TripExportData;
  onShare: (platform: string) => void;
}

export function SharePreview({ tripData, onShare }: SharePreviewProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const shareText = generateShareText(tripData, 'generic');

  const shareOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Share with friends and family'
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Send detailed itinerary'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: MessageCircle,
      color: 'bg-sky-500 hover:bg-sky-600',
      description: 'Share in groups or chats'
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: Copy,
      color: 'bg-gray-500 hover:bg-gray-600',
      description: 'Copy to clipboard'
    }
  ];

  const handleShare = (platform: string) => {
    onShare(platform);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Share className="h-4 w-4 mr-2" />
          Share Trip Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="h-5 w-5" />
            Share Your Kerala Trip
          </DialogTitle>
          <DialogDescription>
            Choose how you'd like to share your trip itinerary with others
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Preview</span>
            </div>
            <Card className="border-dashed">
              <CardContent className="p-4">
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-mono bg-muted/30 p-3 rounded-md max-h-40 overflow-y-auto">
                  {shareText}
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* Share Options */}
          <div>
            <h4 className="text-sm font-medium mb-3">Share via:</h4>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => handleShare(option.id)}
                    className="w-full h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
                  >
                    <div className={`p-2 rounded-full ${option.color} text-white`}>
                      <option.icon className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{option.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trip Summary Badge */}
          <div className="flex items-center justify-center">
            <Badge variant="secondary" className="gap-2">
              <span>Trip to {tripData.travelData.destination}</span>
              <span>•</span>
              <span>{tripData.travelData.duration} days</span>
              <span>•</span>
              <span>{tripData.travelerData.travelers.length} travelers</span>
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}