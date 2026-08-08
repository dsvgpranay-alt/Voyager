import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { 
  Presentation, 
  Smartphone, 
  Bell, 
  Eye,
  Settings
} from 'lucide-react';
import { motion } from 'motion/react';

interface PresentationModeProps {
  showMobileNotification: boolean;
  onToggleNotification: (show: boolean) => void;
  onShowNotification: () => void;
}

export function PresentationMode({ 
  showMobileNotification, 
  onToggleNotification, 
  onShowNotification 
}: PresentationModeProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed top-20 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {!isOpen ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 shadow-lg"
          >
            <Presentation className="h-4 w-4 mr-2" />
            Demo Mode
          </Button>
        ) : (
          <Card className="w-72 shadow-xl border-blue-200 bg-blue-50/90 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Presentation className="h-5 w-5" />
                  Presentation Demo
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
                >
                  ×
                </Button>
              </div>
              <Badge variant="secondary" className="w-fit bg-blue-100 text-blue-700">
                Hackathon Mode
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-blue-600" />
                    <Label htmlFor="mobile-notification" className="text-sm text-blue-800">
                      Mobile Notification
                    </Label>
                  </div>
                  <Switch
                    id="mobile-notification"
                    checked={showMobileNotification}
                    onCheckedChange={onToggleNotification}
                  />
                </div>
                
                <div className="text-xs text-blue-600/80 bg-blue-100/50 p-2 rounded">
                  Toggle to show/hide the mobile notification bar at the top
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={onShowNotification}
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Show Notification
                </Button>
                
                <p className="text-xs text-blue-600/80 text-center">
                  Perfect for demonstrating the mobile UI
                </p>
              </div>

              <div className="pt-2 border-t border-blue-200">
                <div className="flex items-center gap-2 text-xs text-blue-600/80">
                  <Eye className="h-3 w-3" />
                  <span>Best viewed on mobile/tablet size</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}