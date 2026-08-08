import React from 'react';
import { Button } from './ui/button';
import { useSidebar } from './ui/sidebar';
import { PanelLeftOpen, PanelLeftClose, Menu } from 'lucide-react';
import { cn } from './ui/utils';

interface SidebarToggleProps {
  className?: string;
}

export function SidebarToggle({ className }: SidebarToggleProps) {
  const { state, toggleSidebar, isMobile } = useSidebar();
  
  const isExpanded = state === 'expanded';
  
  // Add keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + B to toggle sidebar
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleSidebar}
      className={cn(
        "h-10 w-10 p-0 hover:bg-accent rounded-md transition-all duration-200",
        "hover:scale-105 active:scale-95",
        className
      )}
      title={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
    >
      {isMobile ? (
        <Menu className="h-5 w-5" />
      ) : isExpanded ? (
        <PanelLeftClose className="h-5 w-5" />
      ) : (
        <PanelLeftOpen className="h-5 w-5" />
      )}
      <span className="sr-only">
        {isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      </span>
    </Button>
  );
}

interface FloatingSidebarToggleProps {
  className?: string;
}

export function FloatingSidebarToggle({ className }: FloatingSidebarToggleProps) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';
  
  if (!isCollapsed) return null;
  
  return (
    <Button
      variant="default"
      size="sm"
      onClick={toggleSidebar}
      className={cn(
        "fixed top-4 left-4 z-50 h-10 w-10 p-0 rounded-full shadow-lg",
        "hover:scale-105 active:scale-95 transition-all duration-200",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
      title="Open sidebar"
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Open sidebar</span>
    </Button>
  );
}