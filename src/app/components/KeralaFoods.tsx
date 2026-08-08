import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Star, Clock, ChefHat, X, Flame, Leaf, Search } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import { useLanguage } from '../hooks/useLanguage';

// ─── Types ────────────────────────────────────────────────────────────────────

type FoodCategory = 'all' | 'breakfast' | 'main' | 'seafood' | 'snack' | 'dessert';

interface FoodItem {
  id: string;
  name: string;
  malayalamName: string;
  emoji: string;
  category: Exclude<FoodCategory, 'all'>;
  region: string;
  description: string;
  funFact: string;
  pairedWith: string;
  spiceLevel: 0 | 1 | 2 | 3;
  isVeg: boolean;
  image: string;
  rating: number;
  featured?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOODS: FoodItem[] = [
  {
    id: 'sadya',
    name: 'Kerala Sadya',
    malayalamName: 'കേരള സദ്യ',
    emoji: '🍽️',
    category: 'main',
    region: 'All of Kerala',
    description: 'A grand vegetarian feast served on a fresh banana leaf with 26+ dishes — the ultimate expression of Kerala\'s culinary heritage, served at every celebration.',
    funFact: 'A traditional Sadya can have up to 64 different dishes, all served in a strict positional order on the banana leaf.',
    pairedWith: 'Papadam & Pickle',
    spiceLevel: 1,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1722698030083-75d1d50cabe4?w=800&q=85',
    rating: 4.9,
    featured: true,
  },
  {
    id: 'appam',
    name: 'Appam with Stew',
    malayalamName: 'അപ്പം',
    emoji: '🥞',
    category: 'breakfast',
    region: 'Central Kerala',
    description: 'Lacy, bowl-shaped rice pancakes with a crispy edge and pillowy centre, best paired with a fragrant coconut milk vegetable or chicken stew.',
    funFact: 'The fermentation of appam batter with toddy (palm wine) gives it its characteristic slight tang and airy texture.',
    pairedWith: 'Coconut Stew',
    spiceLevel: 0,
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1542367592-8849eb950fd8?w=800&q=85',
    rating: 4.8,
  },
  {
    id: 'puttu',
    name: 'Puttu & Kadala Curry',
    malayalamName: 'പുട്ടും കടലക്കറിയും',
    emoji: '🫙',
    category: 'breakfast',
    region: 'Northern Kerala',
    description: 'Cylindrical steamed rice flour cakes layered with coconut, served alongside a robust black chickpea curry — the quintessential Kerala morning meal.',
    funFact: 'Puttu gets its shape from a special bamboo or metal steamer called a "puttu kutti" that every Kerala household owns.',
    pairedWith: 'Banana or Papaya',
    spiceLevel: 1,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1620894580123-466ad3a0ca06?w=800&q=85',
    rating: 4.7,
  },
  {
    id: 'biryani',
    name: 'Malabar Biryani',
    malayalamName: 'മലബാർ ബിരിയാണി',
    emoji: '🍚',
    category: 'main',
    region: 'Kozhikode (Malabar)',
    description: 'Aromatic Khyma rice layered with slow-cooked meat, caramelized onions, and warming spices — lighter and more fragrant than its North Indian counterpart.',
    funFact: 'Malabar Biryani uses Kaima rice (also called Jeerakasala), a short-grain variety grown exclusively in Kerala\'s Wayanad district.',
    pairedWith: 'Raita & Pickle',
    spiceLevel: 2,
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1588644525273-f37b60d78512?w=800&q=85',
    rating: 4.9,
  },
  {
    id: 'parotta',
    name: 'Parotta & Beef Fry',
    malayalamName: 'പൊറോട്ടയും ബീഫ് ഫ്രൈയും',
    emoji: '🥩',
    category: 'main',
    region: 'Thrissur & Kochi',
    description: 'Flaky, layered maida flatbread with hundreds of gossamer layers, served with a fiery dry-fried beef cooked in pepper, coconut slivers, and curry leaves.',
    funFact: 'A skilled Parotta maker can stretch and fold a dough ball into over 100 layers through a mesmerizing rhythmic slapping technique.',
    pairedWith: 'Egg Roast or Chicken Curry',
    spiceLevel: 3,
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1636375584142-23b44ef2fb4c?w=800&q=85',
    rating: 4.8,
  },
  {
    id: 'karimeen',
    name: 'Karimeen Pollichathu',
    malayalamName: 'കരിമീൻ പൊള്ളിച്ചത്',
    emoji: '🐟',
    category: 'seafood',
    region: 'Alleppey Backwaters',
    description: 'Pearl spot fish marinated in a fiery red masala of shallots, tomatoes and kokum, wrapped in a banana leaf and grilled until the leaf chars and perfumes the fish.',
    funFact: 'Karimeen (Pearl Spot) is Kerala\'s official state fish and thrives only in the unique brackish waters of the Kuttanad backwaters.',
    pairedWith: 'Kappa (Tapioca) or Rice',
    spiceLevel: 3,
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1661939252817-ebb73304f4c7?w=800&q=85',
    rating: 4.9,
  },
  {
    id: 'idiyappam',
    name: 'Idiyappam',
    malayalamName: 'ഇടിയപ്പം',
    emoji: '🕸️',
    category: 'breakfast',
    region: 'Southern Kerala',
    description: 'Delicate rice flour pressed through a mould into fine, lacy string noodles, steamed to a silky perfection — light, gluten-free, and endlessly versatile.',
    funFact: 'Idiyappam is virtually identical to Sri Lanka\'s "String Hoppers," reflecting centuries of culinary exchange across the Palk Strait.',
    pairedWith: 'Coconut Milk or Egg Curry',
    spiceLevel: 0,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1542367592-8849eb950fd8?w=800&q=85',
    rating: 4.6,
  },
  {
    id: 'pazham-pori',
    name: 'Pazham Pori',
    malayalamName: 'പഴം പൊരി',
    emoji: '🍌',
    category: 'snack',
    region: 'All of Kerala',
    description: 'Sweet, ripe Nendran bananas dipped in a spiced rice-flour batter and deep-fried until golden — Kerala\'s beloved street-side evening snack, best eaten hot.',
    funFact: 'Pazham Pori is so central to Kerala culture that it features prominently in films, literature, and is the go-to snack at every tea shop (chaya kada).',
    pairedWith: 'Masala Tea (Chai)',
    spiceLevel: 0,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1566361892779-6afb6bca7052?w=800&q=85',
    rating: 4.7,
  },
  {
    id: 'payasam',
    name: 'Payasam',
    malayalamName: 'പായസം',
    emoji: '🍮',
    category: 'dessert',
    region: 'Palakkad & Thrissur',
    description: 'Kerala\'s crowning dessert — a silky-smooth pudding of rice, vermicelli, or lentils simmered in coconut milk with jaggery, cardamom, ghee, and dry fruits.',
    funFact: 'The Guruvayur temple\'s Aravana Payasam is so famous that it holds a Geographical Indication (GI) tag, unique among Indian temple offerings.',
    pairedWith: 'Pappadam (as is traditional at Sadya)',
    spiceLevel: 0,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1777613112969-d7511ddfbe15?w=800&q=85',
    rating: 4.8,
  },
  {
    id: 'banana-chips',
    name: 'Banana Chips',
    malayalamName: 'കേള വറുത്തത്',
    emoji: '🍟',
    category: 'snack',
    region: 'Thrissur (GI Tagged)',
    description: 'Razor-thin slices of raw Nendran banana fried in pure coconut oil with a pinch of turmeric — shattering, golden, and absurdly addictive. Kerala\'s most famous export snack.',
    funFact: 'Thrissur\'s banana chips hold a GI (Geographical Indication) tag, protecting their identity much like Champagne or Darjeeling tea.',
    pairedWith: 'Hot Black Tea or Coffee',
    spiceLevel: 0,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1762884601729-0eeeafbdfb8a?w=800&q=85',
    rating: 4.7,
  },
];

const CATEGORY_IDS: { id: FoodCategory; key: string; emoji: string }[] = [
  { id: 'all',       key: 'foods.cat.all',       emoji: '🍽️' },
  { id: 'breakfast', key: 'foods.cat.breakfast',  emoji: '🌅' },
  { id: 'main',      key: 'foods.cat.main',       emoji: '🍛' },
  { id: 'seafood',   key: 'foods.cat.seafood',    emoji: '🐟' },
  { id: 'snack',     key: 'foods.cat.snack',      emoji: '🥨' },
  { id: 'dessert',   key: 'foods.cat.dessert',    emoji: '🍮' },
];

const CATEGORY_COLORS: Record<Exclude<FoodCategory, 'all'>, string> = {
  breakfast: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
  main:      'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
  seafood:   'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
  snack:     'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200',
  dessert:   'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200',
};

type TFn = (key: string) => string;

// ─── Spice indicator ──────────────────────────────────────────────────────────

function SpiceLevel({ level, t }: { level: 0 | 1 | 2 | 3; t: TFn }) {
  const labels = [t('foods.spice.mild'), t('foods.spice.medium'), t('foods.spice.spicy'), t('foods.spice.very_spicy')];
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <Flame
          key={i}
          className={cn('h-3.5 w-3.5 transition-colors', i < level ? 'text-red-500 fill-red-500' : 'text-muted-foreground/30')}
        />
      ))}
      <span className="text-[10px] text-muted-foreground ml-0.5">{labels[level]}</span>
    </div>
  );
}

// ─── Food Card ────────────────────────────────────────────────────────────────

function FoodCard({ food, onSelect, featured = false, t, categories }: { food: FoodItem; onSelect: (f: FoodItem) => void; featured?: boolean; t: TFn; categories: { id: FoodCategory; label: string; emoji: string }[] }) {
  return (
    <motion.div
      layoutId={`food-card-${food.id}`}
      className={cn(
        'group relative rounded-2xl overflow-hidden cursor-pointer bg-card shadow-sm border border-border',
        'hover:shadow-xl transition-shadow duration-300',
        featured ? 'md:col-span-2 md:row-span-1' : ''
      )}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      onClick={() => onSelect(food)}
    >
      {/* Image */}
      <div className={cn('relative overflow-hidden', featured ? 'h-56 sm:h-64' : 'h-48')}>
        <ImageWithFallback
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <Badge className={cn('text-[11px] font-semibold border-0 shadow-sm backdrop-blur-sm', CATEGORY_COLORS[food.category])}>
            {categories.find(c => c.id === food.category)?.emoji} {categories.find(c => c.id === food.category)?.label}
          </Badge>
          <div className="flex gap-1.5 flex-shrink-0">
            {food.isVeg ? (
              <span className="flex items-center gap-1 bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                <Leaf className="h-2.5 w-2.5" /> {t('foods.veg')}
              </span>
            ) : (
              <span className="flex items-center gap-1 bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                ● {t('foods.non_veg')}
              </span>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-semibold">{food.rating}</span>
          </div>
        </div>

        {/* Bottom: name + region */}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white font-bold text-lg leading-tight mb-0.5">{food.name}</p>
          <p className="text-white/70 text-xs font-medium">{food.malayalamName}</p>
          <p className="text-white/60 text-[11px] flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3 flex-shrink-0" />{food.region}
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-semibold text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
            {t('foods.view_details')}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{food.description}</p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <SpiceLevel level={food.spiceLevel} t={t} />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <ChefHat className="h-3.5 w-3.5" />
            <span>{t('foods.best_with')} <span className="text-foreground font-medium">{food.pairedWith}</span></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function FoodDetailModal({ food, onClose, t, categories }: { food: FoodItem; onClose: () => void; t: TFn; categories: { id: FoodCategory; label: string; emoji: string }[] }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        layoutId={`food-card-${food.id}`}
        className="relative w-full sm:max-w-lg bg-background rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-56 sm:h-64 flex-shrink-0">
          <ImageWithFallback
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge className={cn('text-xs border-0', CATEGORY_COLORS[food.category])}>
                {categories.find(c => c.id === food.category)?.emoji} {categories.find(c => c.id === food.category)?.label}
              </Badge>
              {food.isVeg ? (
                <span className="flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <Leaf className="h-2.5 w-2.5" /> {t('foods.vegetarian')}
                </span>
              ) : (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {t('foods.non_vegetarian')}
                </span>
              )}
            </div>
            <h2 className="text-white font-bold text-2xl">{food.name}</h2>
            <p className="text-white/60 text-sm">{food.malayalamName}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-muted/50 rounded-xl p-3">
              <div className="flex items-center justify-center mb-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-lg font-bold">{food.rating}</p>
              <p className="text-[10px] text-muted-foreground">{t('foods.rating')}</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3">
              <SpiceLevel level={food.spiceLevel} t={t} />
              <p className="text-[10px] text-muted-foreground mt-1">{t('foods.spice_level')}</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-[10px] text-muted-foreground mb-1 mt-0.5">{t('foods.region_label')}</p>
              <p className="text-xs font-semibold leading-tight">{food.region.split('(')[0].trim()}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <span className="text-2xl">{food.emoji}</span> {t('foods.about_dish')}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{food.description}</p>
          </div>

          {/* Fun fact */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
              {t('foods.did_you_know')}
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">{food.funFact}</p>
          </div>

          {/* Pairing */}
          <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl">
            <ChefHat className="h-5 w-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">{t('foods.best_paired_with')}</p>
              <p className="text-sm font-semibold">{food.pairedWith}</p>
            </div>
          </div>

          {/* Region */}
          <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">{t('foods.popular_in')}</p>
              <p className="text-sm font-semibold">{food.region}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

interface KeralaFoodsProps {
  onBack?: () => void;
}

export function KeralaFoods({ onBack }: KeralaFoodsProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<FoodCategory>('all');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [search, setSearch] = useState('');

  const CATEGORIES = CATEGORY_IDS.map(c => ({ ...c, label: t(c.key) }));

  const filtered = FOODS.filter(f => {
    const matchCat = activeCategory === 'all' || f.category === activeCategory;
    const matchSearch = search === '' ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.region.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find(f => f.featured);
  const rest = filtered.filter(f => !f.featured);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 space-y-8 pb-12">

        {/* ── Header ── */}
        <div className="text-center space-y-4">
          {/* Decorative banner */}
          <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/50 rounded-full px-5 py-2 text-sm font-semibold">
            <span className="text-xl">🌶️</span> {t('foods.badge')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            {t('foods.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t('foods.subtitle')}
          </p>
          {/* Stats strip */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 text-center mt-2">
            {[
              { icon: '🍛', value: '10+', label: t('foods.stat.dishes') },
              { icon: '🌴', value: '14', label: t('foods.stat.districts') },
              { icon: '⭐', value: '4.7', label: t('foods.stat.rating') },
            ].map(s => (
              <div key={s.label}>
                <p className="text-xl sm:text-2xl font-bold">{s.icon} {s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Search + filters ── */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative max-w-sm mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('foods.search')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar justify-start sm:justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border',
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                )}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Food grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-muted-foreground"
            >
              <span className="text-5xl block mb-4">🍽️</span>
              <p className="text-lg font-medium">{t('foods.empty.title')}</p>
              <p className="text-sm mt-1">{t('foods.empty.subtitle')}</p>
              <Button variant="outline" className="mt-4" onClick={() => { setActiveCategory('all'); setSearch(''); }}>
                {t('foods.empty.clear')}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {featured && <FoodCard food={featured} onSelect={setSelectedFood} featured t={t} categories={CATEGORIES} />}
              {rest.map(food => (
                <FoodCard key={food.id} food={food} onSelect={setSelectedFood} t={t} categories={CATEGORIES} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Culinary tips banner ── */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 p-6 sm:p-8 text-white">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)'
          }} />
          <div className="relative grid sm:grid-cols-3 gap-5 sm:gap-8">
            {[
              { emoji: '🥥', title: t('foods.tip1.title'), body: t('foods.tip1.body') },
              { emoji: '🌿', title: t('foods.tip2.title'), body: t('foods.tip2.body') },
              { emoji: '🎋', title: t('foods.tip3.title'), body: t('foods.tip3.body') },
            ].map(tip => (
              <div key={tip.title} className="flex flex-col gap-2">
                <div className="text-3xl">{tip.emoji}</div>
                <h4 className="font-bold text-base">{tip.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>

        {onBack && (
          <div className="text-center">
            <Button variant="outline" onClick={onBack}>{t('nav.back_to_planning')}</Button>
          </div>
        )}
      </div>

      {/* ── Detail modal ── */}
      <AnimatePresence>
        {selectedFood && (
          <FoodDetailModal food={selectedFood} onClose={() => setSelectedFood(null)} t={t} categories={CATEGORIES} />
        )}
      </AnimatePresence>
    </>
  );
}
