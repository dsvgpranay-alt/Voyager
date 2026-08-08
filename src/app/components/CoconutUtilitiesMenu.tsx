import React from 'react';
import { CoconutIcon } from './CoconutIcon';
import { UtilitiesMenu } from './UtilitiesMenu';

interface CoconutUtilitiesMenuProps {
  userName?: string;
  className?: string;
}

export const CoconutUtilitiesMenu = React.forwardRef<HTMLDivElement, CoconutUtilitiesMenuProps>(
  ({ userName, className }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  // Close menu when pressing Escape
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleClose]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <CoconutIcon
        isOpen={isOpen}
        onClick={handleToggle}
        className="transition-transform hover:scale-105"
      />
      
      <UtilitiesMenu
        isOpen={isOpen}
        onClose={handleClose}
        userName={userName}
      />
    </div>
  );
});

CoconutUtilitiesMenu.displayName = 'CoconutUtilitiesMenu';