import React from 'react';
import { Languages, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../hooks/useLanguage';

interface LanguageSelectorProps {
  isCollapsed?: boolean;
}

export function LanguageSelector({ isCollapsed = false }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    {
      code: 'en' as const,
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'ml' as const,
      name: 'Malayalam',
      nativeName: 'മലയാളം',
      flag: '🇮🇳'
    }
  ];

  if (isCollapsed) {
    return (
      <div className="flex flex-col gap-2 p-2">
        {languages.map((lang) => {
          const isSelected = language === lang.code;
          
          return (
            <Button
              key={lang.code}
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(lang.code)}
              className={`h-10 w-10 p-0 relative ${
                isSelected 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'hover:bg-sidebar-accent/50'
              }`}
              title={lang.nativeName}
            >
              <div className="h-8 w-8 rounded-md flex items-center justify-center relative bg-muted">
                <span className="text-lg">{lang.flag}</span>
                {isSelected && (
                  <div className="absolute -top-1 -right-1">
                    <div className="h-3 w-3 bg-primary rounded-full flex items-center justify-center">
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
        <Languages className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{language === 'ml' ? 'ഭാഷ' : 'Language'}</span>
      </div>
      
      <div className="grid gap-3 px-2">
        {languages.map((lang) => {
          const isSelected = language === lang.code;
          
          return (
            <div
              key={lang.code}
              className={`
                relative overflow-hidden rounded-lg border-2 transition-all duration-200 cursor-pointer p-4
                ${isSelected 
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background border-primary bg-primary/5' 
                  : 'hover:shadow-md border-border bg-card hover:bg-accent/50'
                }
              `}
              onClick={() => setLanguage(lang.code)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-lg">{lang.flag}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{lang.name}</h3>
                    <p className="text-xs text-muted-foreground">{lang.nativeName}</p>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="h-5 w-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="px-2 pt-2">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {language === 'ml' 
            ? 'നിങ്ങളുടെ മുൻഗണനാ ഭാഷ തിരഞ്ഞെടുക്കുക. ഭാഷാ സജ്ജീകരണങ്ങൾ സ്വയമേവ സംരക്ഷിക്കപ്പെടും.'
            : 'Choose your preferred language. Language settings are automatically saved and will persist across sessions.'
          }
        </p>
      </div>
    </div>
  );
}