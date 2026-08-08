import React from 'react';
import { Palette, Check, Sun, Moon, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTheme } from '../hooks/useTheme';

interface ThemeSelectorProps {
  isCollapsed?: boolean;
}

export function ThemeSelector({ isCollapsed = false }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      id: 'light' as const,
      name: 'Light Mode',
      description: 'Fresh & Clean',
      icon: Sun,
      preview: {
        background: '#ffffff',
        surface: '#f8fafc', 
        primary: '#059669',
        accent: '#0ea5e9',
        text: '#0f172a'
      }
    },
    {
      id: 'dark' as const,
      name: 'Dark Mode',
      description: 'Sleek & Modern',
      icon: Moon,
      preview: {
        background: '#0f172a',
        surface: '#1e293b',
        primary: '#10b981',
        accent: '#38bdf8',
        text: '#f8fafc'
      }
    }
  ];

  if (isCollapsed) {
    return (
      <div className="flex flex-col gap-2 p-2">
        {themes.map((themeOption) => {
          const IconComponent = themeOption.icon;
          const isSelected = theme === themeOption.id;
          
          return (
            <Button
              key={themeOption.id}
              variant="ghost"
              size="sm"
              onClick={() => setTheme(themeOption.id)}
              className={`h-10 w-10 p-0 relative ${
                isSelected 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'hover:bg-sidebar-accent/50'
              }`}
              title={themeOption.name}
            >
              <div 
                className="h-8 w-8 rounded-md flex items-center justify-center relative"
                style={{ backgroundColor: themeOption.preview.surface }}
              >
                <IconComponent 
                  className="h-4 w-4" 
                  style={{ color: themeOption.preview.primary }}
                />
                {isSelected && (
                  <div className="absolute -top-1 -right-1">
                    <div 
                      className="h-3 w-3 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: themeOption.preview.accent }}
                    >
                      <Check className="h-2 w-2 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-2">
        <Palette className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Theme</span>
      </div>
      
      <div className="grid gap-3 px-2">
        {themes.map((themeOption) => {
          const IconComponent = themeOption.icon;
          const isSelected = theme === themeOption.id;
          
          return (
            <div
              key={themeOption.id}
              className={`
                relative overflow-hidden rounded-lg border-2 transition-all duration-200 cursor-pointer
                ${isSelected 
                  ? 'ring-2 ring-offset-2 ring-offset-background' 
                  : 'hover:shadow-md'
                }
              `}
              style={{ 
                borderColor: isSelected ? themeOption.preview.accent : 'transparent',
                backgroundColor: themeOption.preview.background 
              }}
              onClick={() => setTheme(themeOption.id)}
            >
              {/* Theme Preview Area */}
              <div className="p-4 space-y-3">
                {/* Header simulation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-6 w-6 rounded flex items-center justify-center"
                      style={{ backgroundColor: themeOption.preview.surface }}
                    >
                      <IconComponent 
                        className="h-3 w-3" 
                        style={{ color: themeOption.preview.primary }}
                      />
                    </div>
                    <div className="space-y-1">
                      <div 
                        className="h-2 w-16 rounded"
                        style={{ backgroundColor: themeOption.preview.surface }}
                      />
                      <div 
                        className="h-1.5 w-12 rounded"
                        style={{ backgroundColor: themeOption.preview.surface, opacity: 0.6 }}
                      />
                    </div>
                  </div>
                  
                  {/* Selection indicator */}
                  {isSelected && (
                    <div 
                      className="h-5 w-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: themeOption.preview.accent }}
                    >
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Button simulation */}
                <div className="flex gap-2">
                  <div 
                    className="h-6 w-16 rounded text-center flex items-center justify-center"
                    style={{ 
                      backgroundColor: themeOption.preview.primary,
                      color: 'white'
                    }}
                  >
                    <div className="h-1 w-8 bg-white/80 rounded" />
                  </div>
                  <div 
                    className="h-6 w-12 rounded border"
                    style={{ 
                      borderColor: themeOption.preview.surface,
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
                
                {/* Card simulation */}
                <div 
                  className="h-8 rounded p-2 flex items-center gap-2"
                  style={{ backgroundColor: themeOption.preview.surface }}
                >
                  <div 
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: themeOption.preview.accent }}
                  />
                  <div 
                    className="h-1.5 w-12 rounded"
                    style={{ backgroundColor: themeOption.preview.primary, opacity: 0.7 }}
                  />
                </div>
              </div>
              
              {/* Theme Info */}
              <div 
                className="px-4 py-3 border-t"
                style={{ 
                  borderColor: themeOption.preview.surface,
                  backgroundColor: themeOption.preview.surface,
                  color: themeOption.preview.text
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm">{themeOption.name}</h3>
                    <p className="text-xs opacity-70">{themeOption.description}</p>
                  </div>
                  <IconComponent className="h-4 w-4 opacity-60" />
                </div>
              </div>
              
              {/* Selected overlay */}
              {isSelected && (
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-opacity-10 pointer-events-none"
                  style={{ 
                    background: `linear-gradient(135deg, transparent, ${themeOption.preview.accent}15)`
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="px-2 pt-2">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Choose your preferred theme to customize the Voyager experience. 
          Themes are automatically saved and will persist across sessions.
        </p>
      </div>
    </div>
  );
}