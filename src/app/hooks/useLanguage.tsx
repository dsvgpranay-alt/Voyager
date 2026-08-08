import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ml' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations = {
  en: {
    // App Header
    'app.title': 'VOYAGER',
    'app.subtitle': 'Kerala Travel Planner',
    'app.made_with': 'Made with',
    'app.for_kerala': 'for Kerala',
    'language.english': 'English',
    'language.malayalam': 'മലയാളം',
    'language.hindi': 'हिंदी',
    
    // Hero Section
    'hero.title': 'Discover Kerala\'s Magic',
    'hero.subtitle': 'Plan your perfect Kerala adventure with personalized itineraries, budget estimation, and insider local knowledge.',
    'hero.feature.backwaters': '🌴 Backwaters & Houseboats',
    'hero.feature.hills': '🏔️ Hill Stations & Tea Gardens',
    'hero.feature.beaches': '🏖️ Pristine Beaches',
    'hero.feature.culture': '🎭 Rich Culture & Heritage',
    'hero.virtual_tours': '360° Virtual Tours',
    'hero.shop_products': 'Shop Kerala Products',
    'hero.travel_insurance': 'Travel Insurance',
    'hero.explore_tourism': 'Explore Tourism',
    
    // Navigation
    'nav.back_to_planning': '← Back to Planning',
    'nav.travel_details': 'Travel Details',
    'nav.traveler_info': 'Traveler Info',
    'nav.budget': 'Budget',
    'nav.routes': 'Safe Routes',
    'nav.safety': 'Safety Checklist',
    'nav.summary': 'Summary',
    'nav.explore': 'Explore',
    'nav.ecommerce': 'Shop',
    'nav.insurance': 'Insurance',
    'nav.tourism': 'Tourism',
    'nav.virtual360': '360° View',
    
    // Common Actions
    'common.continue': 'Continue',
    'common.back': 'Back',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.loading': 'Loading...',
    'common.sign_out': 'Sign Out',
    'common.sign_in': 'Sign In',
    
    // Travel Form
    'travel.from': 'From',
    'travel.to': 'To (Kerala Destination)',
    'travel.start_date': 'Start Date',
    'travel.duration': 'Duration (Days)',
    'travel.plan_trip': 'Plan Your Kerala Trip',
    'travel.trip_details': 'Trip Details',
    
    // Footer
    'footer.description': 'Your trusted companion for exploring Kerala\'s enchanting landscapes, rich culture, and unforgettable experiences.',
    'footer.visit_kerala': 'Visit Kerala Tourism:',
    'footer.emergency': 'Emergency:',
    'footer.tourist_helpline': 'Tourist Helpline:',
    'footer.copyright': '© 2025 Voyager',
    'footer.kerala_tourism': 'Kerala Tourism',
    'footer.travel_responsibly': 'Travel Responsibly',
    
    // Safety
    'safety.advisor': 'Safety Advisor',
    'safety.high_priority': 'High Priority',
    'safety.medium_priority': 'Medium Priority',
    'safety.low_priority': 'Low Priority',
    
    // Authentication
    'auth.sign_in': 'Sign In',
    'auth.sign_up': 'Sign Up',
    'auth.email_phone': 'Email or Phone',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.welcome': 'Welcome to VOYAGER',
    'auth.create_account': 'Create Account',
    'auth.existing_user': 'Existing User?',
    'auth.new_user': 'New User?',
    
    // Travel Planning
    'planning.step_indicator': 'Step {current} of {total}',
    'planning.complete': 'Complete',
    'planning.in_progress': 'In Progress',
    
    // Budget
    'budget.total': 'Total Budget',
    'budget.accommodation': 'Accommodation',
    'budget.transport': 'Transport',
    'budget.food': 'Food & Dining',
    'budget.sightseeing': 'Sightseeing',
    'budget.shopping': 'Shopping',
    'budget.miscellaneous': 'Miscellaneous',
    'budget.per_person': 'Per Person',
    'budget.per_day': 'Per Day',
    
    // Destinations
    'destinations.kochi': 'Kochi (Cochin)',
    'destinations.munnar': 'Munnar',
    'destinations.alleppey': 'Alleppey (Alappuzha)',
    'destinations.thekkady': 'Thekkady (Periyar)',
    'destinations.wayanad': 'Wayanad',
    'destinations.kovalam': 'Kovalam',
    'destinations.kumarakom': 'Kumarakom',

    // Nav additions
    'nav.foods': 'Foods',

    // Hero additions
    'hero.kerala_foods': 'Kerala Foods',

    // Sidebar groups & welcome
    'sidebar.group.trip_planning': 'Trip Planning',
    'sidebar.group.services': 'Services & Features',
    'sidebar.group.quick_actions': 'Quick Actions',
    'sidebar.welcome': 'Welcome back',
    'sidebar.adventure_ready': 'Ready for your Kerala adventure?',

    // Sidebar planning steps
    'sidebar.travel.title': 'Travel Details',
    'sidebar.travel.desc': 'Destination & dates',
    'sidebar.travelers.title': 'Travelers',
    'sidebar.travelers.desc': 'Group details',
    'sidebar.budget.title': 'Budget Calculator',
    'sidebar.budget.desc': 'Cost estimation',
    'sidebar.routes.title': 'Safe Routes',
    'sidebar.routes.desc': 'Travel paths',
    'sidebar.safety.title': 'Safety Checklist',
    'sidebar.safety.desc': 'Travel safety',
    'sidebar.summary.title': 'Trip Summary',
    'sidebar.summary.desc': 'Final details',

    // Sidebar service features
    'sidebar.ecommerce.title': 'Shop Kerala',
    'sidebar.ecommerce.desc': 'Authentic products',
    'sidebar.insurance.title': 'Travel Insurance',
    'sidebar.insurance.desc': 'Protect your trip',
    'sidebar.tourism.title': 'Tourism Guide',
    'sidebar.tourism.desc': 'Attractions & experiences',
    'sidebar.virtual360.title': '360° Virtual Tours',
    'sidebar.virtual360.desc': 'Immersive destination previews',
    'sidebar.explore.title': 'Explore Maps',
    'sidebar.explore.desc': 'Interactive maps',
    'sidebar.foods.title': 'Famous Foods',
    'sidebar.foods.desc': "Kerala's iconic dishes",

    // Sidebar quick actions & footer
    'sidebar.photo_gallery': 'Photo Gallery',
    'sidebar.trip_memories': 'Trip memories',
    'sidebar.notifications': 'Notifications',
    'sidebar.trip_alerts': 'Trip alerts',
    'sidebar.offline_maps': 'Offline Maps',
    'sidebar.download_maps': 'Download maps',
    'sidebar.settings': 'Settings',
    'sidebar.help_support': 'Help & Support',
    'sidebar.keyboard_toggle': 'to toggle menu',

    // Foods section
    'foods.badge': "Flavours of God's Own Country",
    'foods.title': 'Famous Foods of Kerala',
    'foods.subtitle': "From grand banana-leaf feasts to crispy coconut-oil street snacks — explore the iconic dishes that make Kerala's cuisine one of India's most celebrated.",
    'foods.stat.dishes': 'Iconic Dishes',
    'foods.stat.districts': 'Districts',
    'foods.stat.rating': 'Avg Rating',
    'foods.search': 'Search dishes, regions...',
    'foods.cat.all': 'All Dishes',
    'foods.cat.breakfast': 'Breakfast',
    'foods.cat.main': 'Main Course',
    'foods.cat.seafood': 'Seafood',
    'foods.cat.snack': 'Snacks',
    'foods.cat.dessert': 'Desserts',
    'foods.empty.title': 'No dishes found',
    'foods.empty.subtitle': 'Try a different category or search term',
    'foods.empty.clear': 'Clear filters',
    'foods.veg': 'Veg',
    'foods.non_veg': 'Non-Veg',
    'foods.vegetarian': 'Vegetarian',
    'foods.non_vegetarian': 'Non-Vegetarian',
    'foods.view_details': 'View Details',
    'foods.best_with': 'Best with:',
    'foods.rating': 'Rating',
    'foods.spice_level': 'Spice Level',
    'foods.region_label': 'Region',
    'foods.about_dish': 'About this dish',
    'foods.did_you_know': '💡 Did you know?',
    'foods.best_paired_with': 'Best paired with',
    'foods.popular_in': 'Most popular in',
    'foods.spice.mild': 'Mild',
    'foods.spice.medium': 'Medium',
    'foods.spice.spicy': 'Spicy',
    'foods.spice.very_spicy': 'Very Spicy',
    'foods.tip1.title': 'Coconut is Life',
    'foods.tip1.body': 'Nearly every Kerala dish uses coconut in some form — oil, milk, grated, or toddy. It defines the cuisine.',
    'foods.tip2.title': 'Curry Leaves & Mustard',
    'foods.tip2.body': 'The two-second sizzle of mustard seeds and curry leaves in coconut oil is the soul of any Kerala kitchen.',
    'foods.tip3.title': 'Eat with Hands',
    'foods.tip3.body': "Eating Sadya with your right hand is not just tradition — it's believed to enhance the flavour of each dish.",
  },
  ml: {
    // App Header
    'app.title': 'വോയേജർ',
    'app.subtitle': 'കേരള യാത്രാ പ്ലാനർ',
    'app.made_with': 'നിർമ്മിച്ചത്',
    'app.for_kerala': 'കേരളത്തിനായി',
    'language.english': 'English',
    'language.malayalam': 'മലയാളം',
    'language.hindi': 'हिंदी',
    
    // Hero Section
    'hero.title': 'കേരളത്തിന്റെ മാന്ത്രികത കണ്ടെത്തുക',
    'hero.subtitle': 'വ്യക്തിഗത യാത്രാ പദ്ധതികൾ, ബജറ്റ് എസ്റ്റിമേഷൻ, പ്രാദേശിക അറിവുകൾ എന്നിവയോടെ നിങ്ങളുടെ മികച്ച കേരള സാഹസികത ആസൂത്രണം ചെയ്യുക.',
    'hero.feature.backwaters': '🌴 കായൽ & ഹൗസ്ബോട്ടുകൾ',
    'hero.feature.hills': '🏔️ മലനിരകൾ & ചായത്തോട്ടങ്ങൾ',
    'hero.feature.beaches': '🏖️ മനോഹര കടൽത്തീരങ്ങൾ',
    'hero.feature.culture': '🎭 സമ്പന്ന സംസ്കാരം & പൈതൃകം',
    'hero.virtual_tours': '360° വിർച്വൽ ടൂറുകൾ',
    'hero.shop_products': 'കേരള ഉൽപ്പന്നങ്ങൾ വാങ്ങുക',
    'hero.travel_insurance': 'യാത്രാ ഇൻഷുറൻസ്',
    'hero.explore_tourism': 'ടൂറിസം പര്യവേക്ഷണം',
    
    // Navigation
    'nav.back_to_planning': '← ആസൂത്രണത്തിലേക്ക് മടങ്ങുക',
    'nav.travel_details': 'യാത്രാ വിവരങ്ങൾ',
    'nav.traveler_info': 'യാത്രികരുടെ വിവരം',
    'nav.budget': 'ബജറ്റ്',
    'nav.routes': 'സുരക്ഷിത വഴികൾ',
    'nav.safety': 'സുരക്ഷാ ചെക്ക്‌ലിസ്റ്റ്',
    'nav.summary': 'സംഗ്രഹം',
    'nav.explore': 'പര്യവേക്ഷണം',
    'nav.ecommerce': 'ഷോപ്പിംഗ്',
    'nav.insurance': 'ഇൻഷുറൻസ്',
    'nav.tourism': 'ടൂറിസം',
    'nav.virtual360': '360° കാഴ്ച',
    
    // Common Actions
    'common.continue': 'തുടരുക',
    'common.back': 'മടങ്ങുക',
    'common.submit': 'സമർപ്പിക്കുക',
    'common.cancel': 'റദ്ദാക്കുക',
    'common.save': 'സേവ് ചെയ്യുക',
    'common.loading': 'ലോഡ് ചെയ്യുന്നു...',
    'common.sign_out': 'സൈൻ ഔട്ട്',
    'common.sign_in': 'സൈൻ ഇൻ',
    
    // Travel Form
    'travel.from': 'എവിടെ നിന്ന്',
    'travel.to': 'എവിടേക്ക് (കേരള ലക്ഷ്യസ്ഥാനം)',
    'travel.start_date': 'ആരംഭ തീയതി',
    'travel.duration': 'കാലാവധി (ദിവസങ്ങൾ)',
    'travel.plan_trip': 'നിങ്ങളുടെ കേരള യാത്ര ആസൂത്രണം ചെയ്യുക',
    'travel.trip_details': 'യാത്രാ വിവരങ്ങൾ',
    
    // Footer
    'footer.description': 'കേരളത്തിന്റെ മോഹിപ്പിക്കുന്ന പ്രകൃതിദൃശ്യങ്ങൾ, സമ്പന്ന സംസ്കാരം, അവിസ്മരണീയ അനുഭവങ്ങൾ എന്നിവ പര്യവേക്ഷണം ചെയ്യുന്നതിനുള്ള നിങ്ങളുടെ വിശ്വസ്ത സഹയാത്രികൻ.',
    'footer.visit_kerala': 'കേരള ടൂറിസം സന്ദർശിക്കുക:',
    'footer.emergency': 'അടിയന്തിര സഹായം:',
    'footer.tourist_helpline': 'ടൂറിസ്റ്റ് ഹെൽപ്പ്‌ലൈൻ:',
    'footer.copyright': '© 2025 വോയേജർ',
    'footer.kerala_tourism': 'കേരള ടൂറിസം',
    'footer.travel_responsibly': 'ഉത്തരവാദിത്തത്തോടെ യാത്ര ചെയ്യുക',
    
    // Safety
    'safety.advisor': 'സുരക്ഷാ ഉപദേശകൻ',
    'safety.high_priority': 'ഉയർന്ന മുൻഗണന',
    'safety.medium_priority': 'ഇടത്തരം മുൻഗണന',
    'safety.low_priority': 'കുറഞ്ഞ മുൻഗണന',
    
    // Authentication
    'auth.sign_in': 'സൈൻ ഇൻ',
    'auth.sign_up': 'സൈൻ അപ്പ്',
    'auth.email_phone': 'ഇമെയിൽ അല്ലെങ്കിൽ ഫോൺ',
    'auth.password': 'പാസ്‌വേർഡ്',
    'auth.name': 'പൂർണ്ണ നാമം',
    'auth.welcome': 'വോയേജറിലേക്ക് സ്വാഗതം',
    'auth.create_account': 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
    'auth.existing_user': 'നിലവിലുള്ള ഉപയോക്താവാണോ?',
    'auth.new_user': 'പുതിയ ഉപയോക്താവാണോ?',
    
    // Travel Planning
    'planning.step_indicator': 'ഘട്ടം {current} / {total}',
    'planning.complete': 'പൂർത്തിയായി',
    'planning.in_progress': 'പുരോഗതിയിൽ',
    
    // Budget
    'budget.total': 'മൊത്തം ബജറ്റ്',
    'budget.accommodation': 'താമസം',
    'budget.transport': 'ഗതാഗതം',
    'budget.food': 'ഭക്ഷണം & ഡൈനിംഗ്',
    'budget.sightseeing': 'കാഴ്ചകൾ',
    'budget.shopping': 'ഷോപ്പിംഗ്',
    'budget.miscellaneous': 'മറ്റുള്ളവ',
    'budget.per_person': 'ഒരാൾക്ക്',
    'budget.per_day': 'ഒരു ദിവസത്തേക്ക്',
    
    // Destinations
    'destinations.kochi': 'കൊച്ചി (കോച്ചിൻ)',
    'destinations.munnar': 'മുന്നാർ',
    'destinations.alleppey': 'ആലപ്പുഴ',
    'destinations.thekkady': 'തേക്കടി (പെരിയാർ)',
    'destinations.wayanad': 'വയനാട്',
    'destinations.kovalam': 'കോവളം',
    'destinations.kumarakom': 'കുമരകം',

    // Nav additions
    'nav.foods': 'ഭക്ഷണം',

    // Hero additions
    'hero.kerala_foods': 'കേരള ഭക്ഷണം',

    // Sidebar groups & welcome
    'sidebar.group.trip_planning': 'യാത്രാ ആസൂത്രണം',
    'sidebar.group.services': 'സേവനങ്ങൾ & സവിശേഷതകൾ',
    'sidebar.group.quick_actions': 'ദ്രുത പ്രവർത്തനങ്ങൾ',
    'sidebar.welcome': 'സ്വാഗതം',
    'sidebar.adventure_ready': 'കേരള സാഹസിക യാത്രയ്ക്ക് തയ്യാറോ?',

    // Sidebar planning steps
    'sidebar.travel.title': 'യാത്രാ വിവരങ്ങൾ',
    'sidebar.travel.desc': 'ലക്ഷ്യസ്ഥാനം & തീയതികൾ',
    'sidebar.travelers.title': 'യാത്രക്കാർ',
    'sidebar.travelers.desc': 'ഗ്രൂപ്പ് വിവരങ്ങൾ',
    'sidebar.budget.title': 'ബജറ്റ് കാൽക്കുലേറ്റർ',
    'sidebar.budget.desc': 'ചെലവ് കണക്കാക്കൽ',
    'sidebar.routes.title': 'സുരക്ഷിത വഴികൾ',
    'sidebar.routes.desc': 'യാത്രാ പാതകൾ',
    'sidebar.safety.title': 'സുരക്ഷാ ചെക്ക്‌ലിസ്റ്റ്',
    'sidebar.safety.desc': 'യാത്രാ സുരക്ഷ',
    'sidebar.summary.title': 'യാത്രാ സംഗ്രഹം',
    'sidebar.summary.desc': 'അന്തിമ വിവരങ്ങൾ',

    // Sidebar service features
    'sidebar.ecommerce.title': 'കേരള ഷോപ്പ്',
    'sidebar.ecommerce.desc': 'ആധികാരിക ഉൽപ്പന്നങ്ങൾ',
    'sidebar.insurance.title': 'യാത്രാ ഇൻഷുറൻസ്',
    'sidebar.insurance.desc': 'യാത്ര സംരക്ഷിക്കുക',
    'sidebar.tourism.title': 'ടൂറിസം ഗൈഡ്',
    'sidebar.tourism.desc': 'ആകർഷണങ്ങൾ & അനുഭവങ്ങൾ',
    'sidebar.virtual360.title': '360° വിർച്വൽ ടൂറുകൾ',
    'sidebar.virtual360.desc': 'ഇമ്മേഴ്സീവ് ഡെസ്റ്റിനേഷൻ പ്രിവ്യൂ',
    'sidebar.explore.title': 'മാപ്പ് പര്യവേക്ഷണം',
    'sidebar.explore.desc': 'ഇന്ററാക്ടീവ് മാപ്പുകൾ',
    'sidebar.foods.title': 'പ്രസിദ്ധ ഭക്ഷണങ്ങൾ',
    'sidebar.foods.desc': 'കേരളത്തിന്റെ ഐതിഹ്യ വിഭവങ്ങൾ',

    // Sidebar quick actions & footer
    'sidebar.photo_gallery': 'ഫോട്ടോ ഗ്യാലറി',
    'sidebar.trip_memories': 'യാത്രാ ഓർമ്മകൾ',
    'sidebar.notifications': 'അറിയിപ്പുകൾ',
    'sidebar.trip_alerts': 'യാത്രാ അലേർട്ടുകൾ',
    'sidebar.offline_maps': 'ഓഫ്‌ലൈൻ മാപ്പുകൾ',
    'sidebar.download_maps': 'മാപ്പ് ഡൗൺലോഡ് ചെയ്യുക',
    'sidebar.settings': 'ക്രമീകരണങ്ങൾ',
    'sidebar.help_support': 'സഹായം & പിന്തുണ',
    'sidebar.keyboard_toggle': 'മെനു ടോഗിൾ ചെയ്യാൻ',

    // Foods section
    'foods.badge': 'ദൈവത്തിന്റെ സ്വന്തം നാടിന്റെ രുചികൾ',
    'foods.title': 'കേരളത്തിന്റെ പ്രസിദ്ധ ഭക്ഷണങ്ങൾ',
    'foods.subtitle': 'വലിയ വാഴയില സദ്യ മുതൽ കൊക്കനട്ട് ഓയിൽ സ്ട്രീറ്റ് സ്നാക്ക്സ് വരെ — കേരളത്തിന്റെ ഐതിഹ്യ വിഭവങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക.',
    'foods.stat.dishes': 'ഐതിഹ്യ വിഭവങ്ങൾ',
    'foods.stat.districts': 'ജില്ലകൾ',
    'foods.stat.rating': 'ശരാശരി റേറ്റിംഗ്',
    'foods.search': 'വിഭവങ്ങൾ, പ്രദേശങ്ങൾ തിരയുക...',
    'foods.cat.all': 'എല്ലാ വിഭവങ്ങൾ',
    'foods.cat.breakfast': 'പ്രഭാതഭക്ഷണം',
    'foods.cat.main': 'മുഖ്യ കോഴ്സ്',
    'foods.cat.seafood': 'കടൽ ഭക്ഷണം',
    'foods.cat.snack': 'സ്നാക്ക്സ്',
    'foods.cat.dessert': 'മധുരങ്ങൾ',
    'foods.empty.title': 'വിഭവങ്ങൾ കണ്ടെത്തിയില്ല',
    'foods.empty.subtitle': 'വ്യത്യസ്ത കാറ്റഗറി അല്ലെങ്കിൽ തിരയൽ വാക്ക് ഉപയോഗിക്കുക',
    'foods.empty.clear': 'ഫിൽട്ടറുകൾ മായ്‌ക്കുക',
    'foods.veg': 'സസ്യം',
    'foods.non_veg': 'മാംസം',
    'foods.vegetarian': 'സസ്യഭക്ഷണം',
    'foods.non_vegetarian': 'മാംസഭക്ഷണം',
    'foods.view_details': 'വിശദാംശങ്ങൾ കാണുക',
    'foods.best_with': 'ഏറ്റവും നല്ലത്:',
    'foods.rating': 'റേറ്റിംഗ്',
    'foods.spice_level': 'എരിവ് നില',
    'foods.region_label': 'പ്രദേശം',
    'foods.about_dish': 'ഈ വിഭവത്തെ കുറിച്ച്',
    'foods.did_you_know': '💡 നിങ്ങൾക്ക് അറിയാമോ?',
    'foods.best_paired_with': 'ഇതിനൊപ്പം നന്ന്',
    'foods.popular_in': 'ഏറ്റവും പ്രചാരം',
    'foods.spice.mild': 'സൗമ്യം',
    'foods.spice.medium': 'മധ്യ',
    'foods.spice.spicy': 'എരിവ്',
    'foods.spice.very_spicy': 'വളരെ എരിവ്',
    'foods.tip1.title': 'തേങ്ങ ജീവിതം',
    'foods.tip1.body': 'ഏതാണ്ട് എല്ലാ കേരള വിഭവങ്ങളിലും ഒരു രൂപത്തിൽ — എണ്ണ, പാൽ, ഉലർത്തിയത് — ഉൾക്കൊള്ളുന്നു.',
    'foods.tip2.title': 'കറിവേപ്പ് & കടുക്',
    'foods.tip2.body': 'തേങ്ങ എണ്ണയിൽ കടുക് & കറിവേപ്പ് വറുക്കുന്ന ആ രണ്ടു നിമിഷം ഏതൊരു കേരള അടുക്കളയുടെയും ആത്മാവ്.',
    'foods.tip3.title': 'കൈ കൊണ്ട് ഭക്ഷണം',
    'foods.tip3.body': 'വലത്തെ കൈ ഉപയോഗിച്ച് സദ്യ കഴിക്കൽ — ഓരോ വിഭവത്തിന്റെ രുചി കൂടുതലായി അനുഭവിക്കാൻ ഇത് സഹായകമെന്ന് വിശ്വസിക്കപ്പെടുന്നു.',
  },
  hi: {
    // App Header
    'app.title': 'वॉयेजर',
    'app.subtitle': 'केरल यात्रा योजनाकार',
    'app.made_with': 'के साथ बनाया गया',
    'app.for_kerala': 'केरल के लिए',
    'language.english': 'English',
    'language.malayalam': 'മലയാളം',
    'language.hindi': 'हिंदी',
    
    // Hero Section
    'hero.title': 'केरल का जादू खोजें',
    'hero.subtitle': 'व्यक्तिगत यात्रा योजना, बजट अनुमान और स्थानीय जानकारी के साथ अपना सही केरल साहसिक अनुभव की योजना बनाएं।',
    'hero.feature.backwaters': '🌴 बैकवाटर और हाउसबोट',
    'hero.feature.hills': '🏔️ पहाड़ी स्टेशन और चाय बागान',
    'hero.feature.beaches': '🏖️ प्राचीन समुद्र तट',
    'hero.feature.culture': '🎭 समृद्ध संस्कृति और विरासत',
    'hero.virtual_tours': '360° वर्चुअल टूर',
    'hero.shop_products': 'केरल उत्पाद खरीदें',
    'hero.travel_insurance': 'यात्रा बीमा',
    'hero.explore_tourism': 'पर्यटन का अन्वेषण करें',
    
    // Navigation
    'nav.back_to_planning': '← योजना पर वापस जाएं',
    'nav.travel_details': 'यात्रा विवरण',
    'nav.traveler_info': 'यात्री जानकारी',
    'nav.budget': 'बजट',
    'nav.routes': 'सुरक्षित मार्ग',
    'nav.safety': 'सुरक्षा चेकलिस्ट',
    'nav.summary': 'सारांश',
    'nav.explore': 'अन्वेषण',
    'nav.ecommerce': 'खरीदारी',
    'nav.insurance': 'बीमा',
    'nav.tourism': 'पर्यटन',
    'nav.virtual360': '360° दृश्य',
    
    // Common Actions
    'common.continue': 'जारी रखें',
    'common.back': 'वापस',
    'common.submit': 'जमा करें',
    'common.cancel': 'रद्द करें',
    'common.save': 'सेव करें',
    'common.loading': 'लोड हो रहा है...',
    'common.sign_out': 'साइन आउट',
    'common.sign_in': 'साइन इन',
    
    // Travel Form
    'travel.from': 'कहाँ से',
    'travel.to': 'कहाँ (केरल गंतव्य)',
    'travel.start_date': 'प्रारंभ तिथि',
    'travel.duration': 'अवधि (दिन)',
    'travel.plan_trip': 'अपनी केरल यात्रा की योजना बनाएं',
    'travel.trip_details': 'यात्रा विवरण',
    
    // Footer
    'footer.description': 'केरल के मंत्रमुग्ध करने वाले दृश्यों, समृद्ध संस्कृति और अविस्मरणीय अनुभवों की खोज के लिए आपका विश्वसनीय साथी।',
    'footer.visit_kerala': 'केरल पर्यटन पर जाएं:',
    'footer.emergency': 'आपातकाल:',
    'footer.tourist_helpline': 'पर्यटक हेल्पलाइन:',
    'footer.copyright': '© 2025 वॉयेजर',
    'footer.kerala_tourism': 'केरल पर्यटन',
    'footer.travel_responsibly': 'जिम्मेदारी से यात्रा करें',
    
    // Safety
    'safety.advisor': 'सुरक्षा सलाहकार',
    'safety.high_priority': 'उच्च प्राथमिकता',
    'safety.medium_priority': 'मध्यम प्राथमिकता',
    'safety.low_priority': 'कम प्राथमिकता',
    
    // Authentication
    'auth.sign_in': 'साइन इन',
    'auth.sign_up': 'साइन अप',
    'auth.email_phone': 'ईमेल या फोन',
    'auth.password': 'पासवर्ड',
    'auth.name': 'पूरा नाम',
    'auth.welcome': 'वॉयेजर में आपका स्वागत है',
    'auth.create_account': 'खाता बनाएं',
    'auth.existing_user': 'मौजूदा उपयोगकर्ता?',
    'auth.new_user': 'नया उपयोगकर्ता?',
    
    // Travel Planning
    'planning.step_indicator': 'चरण {current} का {total}',
    'planning.complete': 'पूर्ण',
    'planning.in_progress': 'प्रगति में',
    
    // Budget
    'budget.total': 'कुल बजट',
    'budget.accommodation': 'आवास',
    'budget.transport': 'परिवहन',
    'budget.food': 'भोजन और डाइनिंग',
    'budget.sightseeing': 'दर्शनीय स्थल',
    'budget.shopping': 'खरीदारी',
    'budget.miscellaneous': 'विविध',
    'budget.per_person': 'प्रति व्यक्ति',
    'budget.per_day': 'प्रति दिन',
    
    // Destinations
    'destinations.kochi': 'कोच्चि (कोचीन)',
    'destinations.munnar': 'मुन्नार',
    'destinations.alleppey': 'अल्लेप्पी (अलाप्पुझा)',
    'destinations.thekkady': 'थेक्कडी (पेरियार)',
    'destinations.wayanad': 'वायनाड',
    'destinations.kovalam': 'कोवलम',
    'destinations.kumarakom': 'कुमारकोम',

    // Nav additions
    'nav.foods': 'व्यंजन',

    // Hero additions
    'hero.kerala_foods': 'केरल व्यंजन',

    // Sidebar groups & welcome
    'sidebar.group.trip_planning': 'यात्रा योजना',
    'sidebar.group.services': 'सेवाएं और विशेषताएं',
    'sidebar.group.quick_actions': 'त्वरित क्रियाएं',
    'sidebar.welcome': 'वापस स्वागत है',
    'sidebar.adventure_ready': 'केरल साहसिक यात्रा के लिए तैयार हैं?',

    // Sidebar planning steps
    'sidebar.travel.title': 'यात्रा विवरण',
    'sidebar.travel.desc': 'गंतव्य और तारीखें',
    'sidebar.travelers.title': 'यात्री',
    'sidebar.travelers.desc': 'समूह विवरण',
    'sidebar.budget.title': 'बजट कैलकुलेटर',
    'sidebar.budget.desc': 'लागत अनुमान',
    'sidebar.routes.title': 'सुरक्षित मार्ग',
    'sidebar.routes.desc': 'यात्रा पथ',
    'sidebar.safety.title': 'सुरक्षा चेकलिस्ट',
    'sidebar.safety.desc': 'यात्रा सुरक्षा',
    'sidebar.summary.title': 'यात्रा सारांश',
    'sidebar.summary.desc': 'अंतिम विवरण',

    // Sidebar service features
    'sidebar.ecommerce.title': 'केरल शॉप',
    'sidebar.ecommerce.desc': 'प्रामाणिक उत्पाद',
    'sidebar.insurance.title': 'यात्रा बीमा',
    'sidebar.insurance.desc': 'अपनी यात्रा सुरक्षित करें',
    'sidebar.tourism.title': 'पर्यटन गाइड',
    'sidebar.tourism.desc': 'आकर्षण और अनुभव',
    'sidebar.virtual360.title': '360° वर्चुअल टूर',
    'sidebar.virtual360.desc': 'इमर्सिव डेस्टिनेशन प्रीव्यू',
    'sidebar.explore.title': 'मैप्स एक्सप्लोर',
    'sidebar.explore.desc': 'इंटरेक्टिव मैप्स',
    'sidebar.foods.title': 'प्रसिद्ध व्यंजन',
    'sidebar.foods.desc': 'केरल के प्रतिष्ठित व्यंजन',

    // Sidebar quick actions & footer
    'sidebar.photo_gallery': 'फोटो गैलरी',
    'sidebar.trip_memories': 'यात्रा यादें',
    'sidebar.notifications': 'सूचनाएं',
    'sidebar.trip_alerts': 'यात्रा अलर्ट',
    'sidebar.offline_maps': 'ऑफलाइन मैप्स',
    'sidebar.download_maps': 'मैप्स डाउनलोड करें',
    'sidebar.settings': 'सेटिंग्स',
    'sidebar.help_support': 'सहायता और समर्थन',
    'sidebar.keyboard_toggle': 'मेनू टॉगल करने के लिए',

    // Foods section
    'foods.badge': 'भगवान के अपने देश का स्वाद',
    'foods.title': 'केरल के प्रसिद्ध व्यंजन',
    'foods.subtitle': 'केले के पत्ते पर भव्य सद्या से लेकर कुरकुरे नारियल तेल के स्ट्रीट स्नैक्स तक — केरल के प्रतिष्ठित व्यंजनों का अन्वेषण करें।',
    'foods.stat.dishes': 'प्रतिष्ठित व्यंजन',
    'foods.stat.districts': 'जिले',
    'foods.stat.rating': 'औसत रेटिंग',
    'foods.search': 'व्यंजन, क्षेत्र खोजें...',
    'foods.cat.all': 'सभी व्यंजन',
    'foods.cat.breakfast': 'नाश्ता',
    'foods.cat.main': 'मुख्य कोर्स',
    'foods.cat.seafood': 'समुद्री भोजन',
    'foods.cat.snack': 'स्नैक्स',
    'foods.cat.dessert': 'मिठाई',
    'foods.empty.title': 'कोई व्यंजन नहीं मिला',
    'foods.empty.subtitle': 'अलग श्रेणी या खोज शब्द आज़माएं',
    'foods.empty.clear': 'फ़िल्टर साफ़ करें',
    'foods.veg': 'शाकाहारी',
    'foods.non_veg': 'मांसाहारी',
    'foods.vegetarian': 'शाकाहारी',
    'foods.non_vegetarian': 'मांसाहारी',
    'foods.view_details': 'विवरण देखें',
    'foods.best_with': 'सबसे अच्छा:',
    'foods.rating': 'रेटिंग',
    'foods.spice_level': 'मसाला स्तर',
    'foods.region_label': 'क्षेत्र',
    'foods.about_dish': 'इस व्यंजन के बारे में',
    'foods.did_you_know': '💡 क्या आप जानते हैं?',
    'foods.best_paired_with': 'इसके साथ सबसे अच्छा',
    'foods.popular_in': 'सबसे लोकप्रिय में',
    'foods.spice.mild': 'हल्का',
    'foods.spice.medium': 'मध्यम',
    'foods.spice.spicy': 'तीखा',
    'foods.spice.very_spicy': 'बहुत तीखा',
    'foods.tip1.title': 'नारियल ही जीवन है',
    'foods.tip1.body': 'लगभग हर केरल व्यंजन में किसी न किसी रूप में नारियल होता है — तेल, दूध, कद्दूकस। यह व्यंजन की परिभाषा है।',
    'foods.tip2.title': 'करी पत्ता और सरसों',
    'foods.tip2.body': 'नारियल तेल में सरसों और करी पत्ता का तड़का किसी भी केरल रसोई की आत्मा है।',
    'foods.tip3.title': 'हाथ से खाएं',
    'foods.tip3.body': 'दाहिने हाथ से सद्या खाना सिर्फ परंपरा नहीं है — ऐसा माना जाता है कि इससे प्रत्येक व्यंजन का स्वाद बढ़ता है।',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('voyager-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ml' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('voyager-language', lang);
    
    // Update document direction and language
    document.documentElement.setAttribute('dir', 'ltr'); // All supported languages are LTR
    if (lang === 'ml') {
      document.documentElement.setAttribute('lang', 'ml');
    } else if (lang === 'hi') {
      document.documentElement.setAttribute('lang', 'hi');
    } else {
      document.documentElement.setAttribute('lang', 'en');
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

const FALLBACK_CONTEXT: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => translations.en[key as keyof typeof translations.en] || key,
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context ?? FALLBACK_CONTEXT;
}