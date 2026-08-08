import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from './ui/sidebar';
import { 
  Plane,
  MapPin,
  Users,
  Calculator,
  Route,
  Shield,
  FileText,
  ShoppingCart,
  Compass,
  Map,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  CreditCard,
  Camera,
  Navigation,
  AlertTriangle,
  CheckCircle2,
  User,
  Bell,
  Home,
  Package,
  Briefcase,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  Eye,
  Palette,
  UtensilsCrossed
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useLanguage } from '../hooks/useLanguage';
import { ThemeSelector } from './ThemeSelector';
import { LanguageSelector } from './LanguageSelector';

type Step = 'travel' | 'travelers' | 'budget' | 'routes' | 'safety-checklist' | 'summary' | 'explore' | 'ecommerce' | 'insurance' | 'tourism' | 'virtual360' | 'foods';

interface AppSidebarProps {
  currentStep: Step;
  onNavigate: (step: Step) => void;
  onSignOut: () => void;
  userName?: string;
  travelData?: any;
  travelerData?: any;
}

export function AppSidebar({ 
  currentStep, 
  onNavigate, 
  onSignOut, 
  userName,
  travelData,
  travelerData 
}: AppSidebarProps) {
  const { getTotalItems } = useCart();
  const { t } = useLanguage();
  const { state, setOpen, isMobile } = useSidebar();

  const planningSteps = [
    {
      id: 'travel' as Step,
      title: t('sidebar.travel.title'),
      description: t('sidebar.travel.desc'),
      icon: MapPin,
      completed: !!travelData,
      current: currentStep === 'travel'
    },
    {
      id: 'travelers' as Step,
      title: t('sidebar.travelers.title'),
      description: t('sidebar.travelers.desc'),
      icon: Users,
      completed: !!travelerData,
      current: currentStep === 'travelers',
      disabled: !travelData
    },
    {
      id: 'budget' as Step,
      title: t('sidebar.budget.title'),
      description: t('sidebar.budget.desc'),
      icon: Calculator,
      completed: currentStep === 'budget' || ['routes', 'safety-checklist', 'summary'].includes(currentStep),
      current: currentStep === 'budget',
      disabled: !travelData || !travelerData
    },
    {
      id: 'routes' as Step,
      title: t('sidebar.routes.title'),
      description: t('sidebar.routes.desc'),
      icon: Route,
      completed: ['safety-checklist', 'summary'].includes(currentStep),
      current: currentStep === 'routes',
      disabled: !travelData || !travelerData
    },
    {
      id: 'safety-checklist' as Step,
      title: t('sidebar.safety.title'),
      description: t('sidebar.safety.desc'),
      icon: Shield,
      completed: currentStep === 'summary',
      current: currentStep === 'safety-checklist',
      disabled: !travelData || !travelerData
    },
    {
      id: 'summary' as Step,
      title: t('sidebar.summary.title'),
      description: t('sidebar.summary.desc'),
      icon: FileText,
      completed: false,
      current: currentStep === 'summary',
      disabled: !travelData || !travelerData
    }
  ];

  const serviceFeatures = [
    {
      id: 'ecommerce' as Step,
      title: t('sidebar.ecommerce.title'),
      description: t('sidebar.ecommerce.desc'),
      icon: ShoppingCart,
      badge: getTotalItems() > 0 ? getTotalItems().toString() : undefined,
      current: currentStep === 'ecommerce'
    },
    {
      id: 'insurance' as Step,
      title: t('sidebar.insurance.title'),
      description: t('sidebar.insurance.desc'),
      icon: CreditCard,
      current: currentStep === 'insurance'
    },
    {
      id: 'tourism' as Step,
      title: t('sidebar.tourism.title'),
      description: t('sidebar.tourism.desc'),
      icon: Compass,
      current: currentStep === 'tourism'
    },
    {
      id: 'virtual360' as Step,
      title: t('sidebar.virtual360.title'),
      description: t('sidebar.virtual360.desc'),
      icon: Eye,
      current: currentStep === 'virtual360'
    },
    {
      id: 'explore' as Step,
      title: t('sidebar.explore.title'),
      description: t('sidebar.explore.desc'),
      icon: Map,
      current: currentStep === 'explore'
    },
    {
      id: 'foods' as Step,
      title: t('sidebar.foods.title'),
      description: t('sidebar.foods.desc'),
      icon: UtensilsCrossed,
      current: currentStep === 'foods'
    }
  ];

  const renderMenuItem = (item: any, section: 'planning' | 'services') => {
    const IconComponent = item.icon;
    const isDisabled = item.disabled;
    const isCompleted = item.completed;
    const isCurrent = item.current;

    return (
      <SidebarMenuItem key={item.id}>
        <SidebarMenuButton
          onClick={() => !isDisabled && onNavigate(item.id)}
          disabled={isDisabled}
          className={`w-full !h-auto py-2.5 ${isCurrent ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
        >
          <div className="flex items-start w-full">
            <div className="flex items-start gap-3 flex-1">
              <div className={`
                mt-0.5 flex-shrink-0 p-1.5 rounded-md flex items-center justify-center
                ${isCurrent
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                  : isCompleted 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                  : isDisabled
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-sidebar-accent text-sidebar-accent-foreground'
                }
              `}>
                {isCompleted && section === 'planning' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <IconComponent className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium group-data-[collapsible=icon]:sr-only">{item.title}</span>
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="h-5 w-5 p-0 flex items-center justify-center text-xs group-data-[collapsible=icon]:sr-only"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground group-data-[collapsible=icon]:sr-only">{item.description}</p>
              </div>
            </div>
            {!isDisabled && <ChevronRight className="h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="border-r transition-all duration-300 ease-in-out" collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Plane className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <h1 className="text-xl font-bold text-primary">{t('app.title')}</h1>
              <p className="text-xs text-muted-foreground">{t('app.subtitle')}</p>
            </div>
          </div>
          
          {/* Close/Toggle Button */}
          <div className="group-data-[collapsible=icon]:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="h-8 w-8 p-0 hover:bg-sidebar-accent"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* User Info */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center gap-3 p-4 bg-sidebar-accent rounded-lg mx-3 transition-all duration-200">
              <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1 group-data-[collapsible=icon]:hidden">
                <p className="font-medium text-sm">
                  {t('sidebar.welcome')}{userName ? ` ${userName.length > 15 ? userName.substring(0, 15) + '...' : userName}` : ''}!
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('sidebar.adventure_ready')}
                </p>
              </div>
              
              {/* Status indicator for collapsed state */}
              <div className="group-data-[collapsible=icon]:block hidden">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Planning Steps */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:sr-only">{t('sidebar.group.trip_planning')}</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {planningSteps.map(step => renderMenuItem(step, 'planning'))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-3" />

        {/* Services & Features */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:sr-only">{t('sidebar.group.services')}</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {serviceFeatures.map(feature => renderMenuItem(feature, 'services'))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-3" />

        {/* Language & Theme Selection */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="space-y-4">
              {/* Language Selector */}
              <div className="group-data-[collapsible=icon]:hidden">
                <LanguageSelector />
              </div>
              <div className="group-data-[collapsible=icon]:block hidden">
                <LanguageSelector isCollapsed={true} />
              </div>
              
              <Separator />
              
              {/* Theme Selector */}
              <div className="group-data-[collapsible=icon]:hidden">
                <ThemeSelector />
              </div>
              <div className="group-data-[collapsible=icon]:block hidden">
                <ThemeSelector isCollapsed={true} />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-3" />

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:sr-only">{t('sidebar.group.quick_actions')}</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                      <Camera className="h-4 w-4" />
                    </div>
                    <div className="text-left group-data-[collapsible=icon]:hidden">
                      <span className="font-medium">{t('sidebar.photo_gallery')}</span>
                      <p className="text-xs text-muted-foreground">{t('sidebar.trip_memories')}</p>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="w-full">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="text-left group-data-[collapsible=icon]:hidden">
                      <span className="font-medium">{t('sidebar.notifications')}</span>
                      <p className="text-xs text-muted-foreground">{t('sidebar.trip_alerts')}</p>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton className="w-full">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                      <Navigation className="h-4 w-4" />
                    </div>
                    <div className="text-left group-data-[collapsible=icon]:hidden">
                      <span className="font-medium">{t('sidebar.offline_maps')}</span>
                      <p className="text-xs text-muted-foreground">{t('sidebar.download_maps')}</p>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full">
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:sr-only">{t('sidebar.settings')}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="w-full">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:sr-only">{t('sidebar.help_support')}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onSignOut}
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <div className="flex items-center gap-3">
                <LogOut className="h-4 w-4" />
                <span className="group-data-[collapsible=icon]:sr-only">{t('common.sign_out')}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Made with Love */}
        <div className="px-4 py-2 text-center group-data-[collapsible=icon]:hidden">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>{t('app.made_with')}</span>
            <Heart className="h-3 w-3 text-red-500 fill-current" />
            <span>{t('app.for_kerala')}</span>
          </div>
          
          {/* Keyboard shortcut hint */}
          <div className="mt-2 text-xs text-muted-foreground/60">
            <span>Press</span>
            <kbd className="mx-1 px-1.5 py-0.5 bg-muted text-muted-foreground rounded text-xs font-mono">
              Ctrl + B
            </kbd>
            <span>{t('sidebar.keyboard_toggle')}</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}