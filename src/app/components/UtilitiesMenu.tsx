import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useIsMobile } from './ui/use-mobile';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  Settings, 
  User, 
  Bell, 
  Palette, 
  Globe, 
  HelpCircle, 
  Download, 
  Share2, 
  Moon, 
  Sun, 
  Smartphone, 
  Monitor,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  MapPin,
  Clock,
  Calendar,
  Bookmark,
  History,
  X
} from 'lucide-react';

interface UtilitiesMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export const UtilitiesMenu = React.forwardRef<HTMLDivElement, UtilitiesMenuProps>(
  ({ isOpen, onClose, userName }, ref) => {
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [wifiEnabled, setWifiEnabled] = React.useState(true);
  
  const toggleSound = React.useCallback(() => {
    setSoundEnabled(!soundEnabled);
  }, [soundEnabled]);

  // Handle dark mode toggle
  React.useEffect(() => {
    try {
      const isDark = document.documentElement.classList.contains('dark');
      setDarkMode(isDark);
    } catch (error) {
      console.warn('Could not detect dark mode:', error);
    }
  }, []);

  const toggleDarkMode = React.useCallback(() => {
    try {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      document.documentElement.classList.toggle('dark', newDarkMode);
    } catch (error) {
      console.warn('Could not toggle dark mode:', error);
    }
  }, [darkMode]);

  // Mobile Full-Screen Drawer
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            
            {/* Mobile Drawer */}
            <motion.div
              className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-background border-r shadow-2xl z-50 overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 40
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Utilities</h2>
                    <p className="text-xs text-muted-foreground">Quick Settings</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* User Section */}
              <div className="p-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Welcome back!</p>
                    <p className="text-xs text-muted-foreground">{userName || 'User'}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Pro</Badge>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="px-4 pb-4">
                <h3 className="text-sm font-medium mb-3 text-muted-foreground">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="h-16 flex-col gap-1 hover:bg-green-50 dark:hover:bg-green-950">
                    <Download className="w-4 h-4" />
                    <span className="text-xs">Download</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-16 flex-col gap-1 hover:bg-blue-50 dark:hover:bg-blue-950">
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs">Share</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-16 flex-col gap-1 hover:bg-amber-50 dark:hover:bg-amber-950">
                    <Bookmark className="w-4 h-4" />
                    <span className="text-xs">Saved</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-16 flex-col gap-1 hover:bg-purple-50 dark:hover:bg-purple-950">
                    <History className="w-4 h-4" />
                    <span className="text-xs">History</span>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Settings */}
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Settings</h3>
                
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    <span className="text-sm">Dark Mode</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleDarkMode}
                    className="h-8 px-3"
                  >
                    {darkMode ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Sound Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    <span className="text-sm">Sound Effects</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSound}
                    className="h-8 px-3"
                  >
                    {soundEnabled ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Wifi Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {wifiEnabled ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                    <span className="text-sm">Connection</span>
                  </div>
                  <Badge variant={wifiEnabled ? "default" : "secondary"} className="text-xs">
                    {wifiEnabled ? 'Online' : 'Offline'}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* System Info */}
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">System</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Battery className="w-4 h-4" />
                    <span className="text-sm">Battery</span>
                  </div>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Kerala Time</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {(() => {
                      try {
                        return new Date().toLocaleTimeString('en-IN', { 
                          timeZone: 'Asia/Kolkata',
                          hour: '2-digit', 
                          minute: '2-digit' 
                        });
                      } catch (error) {
                        return new Date().toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        });
                      }
                    })()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Location</span>
                  </div>
                  <span className="text-sm text-muted-foreground">God's Own Country</span>
                </div>
              </div>

              <Separator />

              {/* Support */}
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Support</h3>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-3" />
                  Help & Support
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-3" />
                  Advanced Settings
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop Floating Popover
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Desktop Popover */}
          <motion.div
            className="fixed top-16 right-4 w-80 bg-background/95 backdrop-blur-xl border rounded-xl shadow-2xl z-50 overflow-hidden"
            initial={{ 
              opacity: 0, 
              scale: 0.9, 
              y: -20,
              x: 20
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              x: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              y: -20,
              x: 20
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30
            }}
          >
            {/* Header */}
            <div className="p-4 border-b bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Settings className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Utilities</h3>
                    <p className="text-xs text-muted-foreground">Quick access</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">Pro</Badge>
              </div>
            </div>

            {/* Quick Toggles */}
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={darkMode ? "default" : "outline"}
                  size="sm"
                  onClick={toggleDarkMode}
                  className="h-12 flex-col gap-1"
                >
                  {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span className="text-xs">Theme</span>
                </Button>
                
                <Button
                  variant={soundEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={toggleSound}
                  className="h-12 flex-col gap-1"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="text-xs">Sound</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="h-12 flex-col gap-1"
                >
                  <Bell className="w-4 h-4" />
                  <span className="text-xs">Alerts</span>
                </Button>
              </div>
            </div>

            <Separator />

            {/* Menu Items */}
            <div className="p-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <User className="w-4 h-4 mr-3" />
                Profile Settings
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Download className="w-4 h-4 mr-3" />
                Downloads
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Share2 className="w-4 h-4 mr-3" />
                Share App
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Bookmark className="w-4 h-4 mr-3" />
                Bookmarks
              </Button>
            </div>

            <Separator />

            {/* Status Info */}
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${wifiEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-muted-foreground">Status</span>
                </div>
                <span className="text-xs">{wifiEnabled ? 'Connected' : 'Offline'}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Kerala Time</span>
                <span className="text-xs">
                  {(() => {
                    try {
                      return new Date().toLocaleTimeString('en-IN', { 
                        timeZone: 'Asia/Kolkata',
                        hour: '2-digit', 
                        minute: '2-digit' 
                      });
                    } catch (error) {
                      return new Date().toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      });
                    }
                  })()}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t bg-muted/30">
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                <HelpCircle className="w-3 h-3 mr-2" />
                Help & Support
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

UtilitiesMenu.displayName = 'UtilitiesMenu';