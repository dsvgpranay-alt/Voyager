import React from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useLanguage } from '../hooks/useLanguage';

export function HeaderLanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en' as const, name: t('language.english'), flag: '🇺🇸', display: 'En' },
    { code: 'hi' as const, name: t('language.hindi'), flag: '🇮🇳', display: 'हि' },
    { code: 'ml' as const, name: t('language.malayalam'), flag: '🇮🇳', display: 'മല' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative flex items-center gap-1 px-2 sm:px-3 hover:bg-accent"
        >
          <Languages className="hidden sm:block h-4 w-4" />
          <span className="hidden sm:inline text-sm">
            {currentLanguage.display}
          </span>
          <Badge variant="secondary" className="px-1 py-0.5 text-xs">
            {currentLanguage.flag}
          </Badge>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-3 cursor-pointer ${
              language === lang.code ? 'bg-accent' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <div className="flex-1">
              <div className="font-medium">{lang.name}</div>
              <div className="text-xs text-muted-foreground">{lang.display}</div>
            </div>
            {language === lang.code && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}