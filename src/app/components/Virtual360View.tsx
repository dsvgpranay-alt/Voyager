import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye, X, ZoomIn, ZoomOut, Navigation, MapPin,
  Clock, Star, Play, Pause, ChevronLeft, ChevronRight,
  Heart, Info, Sun, Compass, Camera, Maximize2
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from './ui/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'beach' | 'backwater' | 'hill-station' | 'heritage' | 'temple' | 'accommodation';
type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';

interface Hotspot {
  id: string;
  label: string;
  emoji: string;
  xPercent: number;
  yPercent: number;
  fact: string;
}

interface Location {
  id: string;
  name: string;
  category: Category;
  image: string;
  panoramicImage: string;
  description: string;
  location: string;
  rating: number;
  visitDuration: string;
  highlights: string[];
  temperature: string;
  bestTime: string;
  hotspots: Hotspot[];
}

interface Virtual360ViewProps {
  destination?: string;
  onClose?: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TIME_CONFIGS: Record<TimeOfDay, { label: string; emoji: string; filter: string }> = {
  dawn:  { label: 'Dawn',  emoji: '🌅', filter: 'sepia(35%) hue-rotate(15deg) saturate(115%) brightness(72%)' },
  day:   { label: 'Day',   emoji: '☀️', filter: 'none' },
  dusk:  { label: 'Dusk',  emoji: '🌇', filter: 'sepia(55%) hue-rotate(-18deg) saturate(170%) brightness(80%)' },
  night: { label: 'Night', emoji: '🌙', filter: 'brightness(32%) saturate(55%) hue-rotate(220deg)' },
};

const CATEGORY_CONFIG: Record<Category, { emoji: string; color: string; label: string }> = {
  beach:         { emoji: '🏖️', color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200',      label: 'Beach' },
  backwater:     { emoji: '🛶', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200', label: 'Backwater' },
  'hill-station':{ emoji: '🏔️', color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-200', label: 'Hills' },
  heritage:      { emoji: '🏛️', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200', label: 'Heritage' },
  temple:        { emoji: '🕌', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-200', label: 'Temple' },
  accommodation: { emoji: '🏠', color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',  label: 'Stay' },
};

const LOCATIONS: Location[] = [
  {
    id: 'alleppey-backwaters',
    name: 'Alleppey Backwaters',
    category: 'backwater',
    image: 'https://images.unsplash.com/photo-1621305420187-6e41754c108e?w=600&q=80',
    panoramicImage: 'https://images.unsplash.com/photo-1621305420187-6e41754c108e?w=1920&q=90',
    description: 'Serene backwaters with traditional houseboats drifting through lush coconut groves and mirror-still waters.',
    location: 'Alleppey, Kerala',
    rating: 4.8,
    visitDuration: '4–6 hours',
    highlights: ['Houseboat cruises', 'Bird watching', 'Village tours', 'Sunset views'],
    temperature: '28°C',
    bestTime: 'Nov – Feb',
    hotspots: [
      { id: 'hs1', label: 'Houseboat Dock', emoji: '⛵', xPercent: 18, yPercent: 60, fact: 'Traditional Kerala kettuvallams converted into luxury houseboats.' },
      { id: 'hs2', label: 'Coconut Grove', emoji: '🌴', xPercent: 45, yPercent: 35, fact: 'Kerala has the highest coconut density in India — over 1 billion trees.' },
      { id: 'hs3', label: 'Bird Sanctuary', emoji: '🦜', xPercent: 72, yPercent: 45, fact: 'Home to 50+ migratory species including the purple moorhen.' },
    ],
  },
  {
    id: 'munnar-tea',
    name: 'Munnar Tea Plantations',
    category: 'hill-station',
    image: 'https://images.unsplash.com/photo-1693379372097-66b49603eb77?w=600&q=80',
    panoramicImage: 'https://images.unsplash.com/photo-1693379372097-66b49603eb77?w=1920&q=90',
    description: 'Rolling emerald hills blanketed in tea plantations at 1,600m altitude, wrapped in cool mountain mist.',
    location: 'Munnar, Kerala',
    rating: 4.9,
    visitDuration: '3–5 hours',
    highlights: ['Tea factory tours', 'Mountain trekking', 'Photography', 'Cool climate'],
    temperature: '15°C',
    bestTime: 'Sep – May',
    hotspots: [
      { id: 'hs1', label: 'Tea Factory', emoji: '🍵', xPercent: 22, yPercent: 55, fact: 'Munnar produces over 60 million kg of tea annually.' },
      { id: 'hs2', label: 'Misty Peak', emoji: '🌫️', xPercent: 50, yPercent: 25, fact: 'Anamudi Peak at 2,695m is the highest point in South India.' },
      { id: 'hs3', label: 'Tea Picker Trail', emoji: '👩‍🌾', xPercent: 78, yPercent: 60, fact: 'Skilled pickers harvest only the top two leaves and bud.' },
    ],
  },
  {
    id: 'kovalam-beach',
    name: 'Kovalam Beach',
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1566838345788-db81125cef85?w=600&q=80',
    panoramicImage: 'https://images.unsplash.com/photo-1566838345788-db81125cef85?w=1920&q=90',
    description: 'Three crescent-shaped beaches framed by rugged headlands, palm trees, and the Vizhinjam lighthouse.',
    location: 'Kovalam, Kerala',
    rating: 4.7,
    visitDuration: '2–4 hours',
    highlights: ['Beach activities', 'Ayurvedic massage', 'Lighthouse view', 'Water sports'],
    temperature: '31°C',
    bestTime: 'Oct – Mar',
    hotspots: [
      { id: 'hs1', label: 'Lighthouse', emoji: '🗼', xPercent: 25, yPercent: 30, fact: 'The iconic 1972 lighthouse offers panoramic views from 30m high.' },
      { id: 'hs2', label: 'Surf Spot', emoji: '🏄', xPercent: 52, yPercent: 65, fact: 'Kovalam is India\'s premier surfing destination with consistent waves.' },
      { id: 'hs3', label: 'Ayurveda Spa', emoji: '💆', xPercent: 80, yPercent: 50, fact: 'Kerala\'s Ayurveda tradition spans over 3,000 years.' },
    ],
  },
  {
    id: 'padmanabhaswamy',
    name: 'Padmanabhaswamy Temple',
    category: 'temple',
    image: 'https://images.unsplash.com/photo-1653279593874-d97da4522e76?w=600&q=80',
    panoramicImage: 'https://images.unsplash.com/photo-1653279593874-d97da4522e76?w=1920&q=90',
    description: 'Ancient Dravidian temple housing the world\'s largest treasure vault, dedicated to Lord Vishnu.',
    location: 'Thiruvananthapuram, Kerala',
    rating: 4.6,
    visitDuration: '1–2 hours',
    highlights: ['Ancient architecture', 'Spiritual experience', 'Cultural heritage', 'Photography'],
    temperature: '30°C',
    bestTime: 'Dec – Mar',
    hotspots: [
      { id: 'hs1', label: 'Gopuram Tower', emoji: '🏯', xPercent: 20, yPercent: 20, fact: 'The 7-story gopuram is elaborately carved with 400+ deities.' },
      { id: 'hs2', label: 'Sacred Pond', emoji: '💧', xPercent: 55, yPercent: 70, fact: 'The temple tank is believed to have healing properties.' },
      { id: 'hs3', label: 'Inner Sanctum', emoji: '✨', xPercent: 82, yPercent: 40, fact: 'The deity is only visible through three separate doorways.' },
    ],
  },
  {
    id: 'fort-kochi',
    name: 'Fort Kochi Heritage',
    category: 'heritage',
    image: 'https://images.unsplash.com/photo-1708508791621-d7f9b2713f30?w=600&q=80',
    panoramicImage: 'https://images.unsplash.com/photo-1708508791621-d7f9b2713f30?w=1920&q=90',
    description: 'A living canvas of colonial history — Portuguese, Dutch, and British layers woven into cobblestone streets.',
    location: 'Kochi, Kerala',
    rating: 4.5,
    visitDuration: '3–4 hours',
    highlights: ['Chinese fishing nets', 'Colonial architecture', 'Art galleries', 'Street food'],
    temperature: '29°C',
    bestTime: 'Oct – Feb',
    hotspots: [
      { id: 'hs1', label: 'Chinese Fishing Nets', emoji: '🎣', xPercent: 15, yPercent: 50, fact: 'These 14th-century nets were introduced by Chinese explorer Zheng He.' },
      { id: 'hs2', label: 'Dutch Palace', emoji: '🏰', xPercent: 48, yPercent: 38, fact: 'Built in 1555, it contains Kerala\'s finest mural paintings.' },
      { id: 'hs3', label: 'Spice Market', emoji: '🌶️', xPercent: 76, yPercent: 62, fact: 'Kochi was the world\'s spice capital for over 500 years.' },
    ],
  },
  {
    id: 'kumarakom',
    name: 'Kumarakom Houseboat',
    category: 'accommodation',
    image: 'https://images.unsplash.com/photo-1588068747940-76c095269f83?w=600&q=80',
    panoramicImage: 'https://images.unsplash.com/photo-1588068747940-76c095269f83?w=1920&q=90',
    description: 'Traditional kettuvallam houseboat with teak interiors, cane furniture, and a private deck over the backwaters.',
    location: 'Kumarakom, Kerala',
    rating: 4.7,
    visitDuration: 'Overnight stay',
    highlights: ['Luxury accommodation', 'Traditional design', 'Backwater cruising', 'Local cuisine'],
    temperature: '27°C',
    bestTime: 'Nov – Jan',
    hotspots: [
      { id: 'hs1', label: 'Sun Deck', emoji: '🛋️', xPercent: 20, yPercent: 40, fact: 'Each houseboat has a private sundeck for star-gazing at night.' },
      { id: 'hs2', label: 'Kitchen', emoji: '🍛', xPercent: 50, yPercent: 55, fact: 'On-board chefs prepare fresh Kerala seafood caught that morning.' },
      { id: 'hs3', label: 'Vembanad Lake', emoji: '🌊', xPercent: 78, yPercent: 45, fact: 'Vembanad is Kerala\'s largest lake, spanning 200 km².' },
    ],
  },
];

// ─── Location Card ─────────────────────────────────────────────────────────────

function LocationCard({
  location,
  onClick,
  isFeatured = false,
}: {
  location: Location;
  onClick: () => void;
  isFeatured?: boolean;
}) {
  const cat = CATEGORY_CONFIG[location.category];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        'group relative rounded-2xl overflow-hidden cursor-pointer shadow-md',
        isFeatured ? 'md:col-span-2 md:row-span-2' : ''
      )}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
      <ImageWithFallback
        src={location.image}
        alt={location.name}
        className={cn(
          'w-full object-cover transition-transform duration-700 group-hover:scale-110',
          isFeatured ? 'h-72 md:h-full md:min-h-[340px]' : 'h-52'
        )}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-bold text-blue-700 tracking-wide">360°</span>
        </div>
        <Badge className={cn('text-xs border-0 shadow-sm', cat.color)}>
          <span className="mr-1">{cat.emoji}</span>{cat.label}
        </Badge>
      </div>

      {/* Rating */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5">
        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
        <span className="text-xs text-white font-semibold">{location.rating}</span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-bold text-lg leading-tight mb-1">{location.name}</h3>
        <p className="text-white/70 text-xs flex items-center gap-1 mb-2">
          <MapPin className="h-3 w-3 flex-shrink-0" />{location.location}
        </p>
        {isFeatured && (
          <p className="text-white/60 text-xs line-clamp-2 mb-3">{location.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white/70 text-xs">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{location.visitDuration}</span>
            <span>{location.temperature}</span>
          </div>
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5 bg-white text-black rounded-full px-3 py-1.5 text-xs font-bold shadow-lg"
              >
                <Eye className="h-3.5 w-3.5" />
                Enter Tour
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hotspot Marker ────────────────────────────────────────────────────────────

function HotspotMarker({
  hotspot,
  screenX,
  isActive,
  onClick,
}: {
  hotspot: Hotspot;
  screenX: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
      style={{ left: `${screenX}%`, top: `${hotspot.yPercent}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-white/30 animate-ping" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-5 h-5 rounded-full bg-white/50 animate-ping" style={{ animationDelay: '0.3s' }} />
      </div>

      {/* Dot */}
      <div className={cn(
        'relative w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-all',
        isActive ? 'bg-white scale-110' : 'bg-white/20 backdrop-blur-sm'
      )}>
        <span className="text-sm">{hotspot.emoji}</span>
      </div>

      {/* Label */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 w-48 bg-black/90 backdrop-blur-md rounded-xl p-3 shadow-2xl border border-white/20"
          >
            <p className="text-white font-semibold text-xs mb-1">{hotspot.label}</p>
            <p className="text-white/70 text-[11px] leading-relaxed">{hotspot.fact}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Small label always visible */}
      {!isActive && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 whitespace-nowrap">
          <span className="text-white text-[10px] font-medium">{hotspot.label}</span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function Virtual360View({ destination, onClose }: Virtual360ViewProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [locationIndex, setLocationIndex] = useState(0);
  const [panX, setPanX] = useState(0);
  const [tiltY, setTiltY] = useState(50);
  const [zoom, setZoom] = useState(1);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);

  const dragRef = useRef({ startX: 0, startY: 0, lastX: 0, lastPanX: 0, lastPanY: 0, lastTime: 0, velocity: 0 });
  const pinchRef = useRef({ startDist: 0, startZoom: 1 });
  const autoRotateRef = useRef<ReturnType<typeof setInterval>>();
  const inertiaRef = useRef<ReturnType<typeof requestAnimationFrame>>();
  const viewerRef = useRef<HTMLDivElement>(null);

  const displayLocations = destination
    ? LOCATIONS.filter(l => l.location.toLowerCase().includes(destination.toLowerCase()))
    : LOCATIONS;

  const filtered = categoryFilter === 'all'
    ? displayLocations
    : displayLocations.filter(l => l.category === categoryFilter);

  const currentLocation = displayLocations[locationIndex] ?? displayLocations[0];

  // Auto-rotate
  useEffect(() => {
    if (isAutoRotating && viewerOpen) {
      autoRotateRef.current = setInterval(() => {
        setPanX(p => p + 1.5);
      }, 40);
    }
    return () => { if (autoRotateRef.current) clearInterval(autoRotateRef.current); };
  }, [isAutoRotating, viewerOpen]);

  // Inertia on drag end
  const applyInertia = useCallback((vel: number) => {
    if (inertiaRef.current) cancelAnimationFrame(inertiaRef.current);
    let v = vel;
    const tick = () => {
      if (Math.abs(v) < 0.3) return;
      v *= 0.93;
      setPanX(p => p + v);
      inertiaRef.current = requestAnimationFrame(tick);
    };
    inertiaRef.current = requestAnimationFrame(tick);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!viewerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setPanX(p => p - 20);
      if (e.key === 'ArrowRight') setPanX(p => p + 20);
      if (e.key === 'ArrowUp') setTiltY(t => Math.max(20, t - 5));
      if (e.key === 'ArrowDown') setTiltY(t => Math.min(80, t + 5));
      if (e.key === 'Escape') setViewerOpen(false);
      if (e.key === 'i') setShowInfo(s => !s);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewerOpen]);

  // Scroll to zoom
  useEffect(() => {
    if (!viewerOpen) return;
    const el = viewerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom(z => Math.max(1, Math.min(2.5, z - e.deltaY * 0.001)));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [viewerOpen]);

  // ── Drag handlers ──

  const startDrag = (x: number, y: number) => {
    if (inertiaRef.current) cancelAnimationFrame(inertiaRef.current);
    setIsAutoRotating(false);
    setIsDragging(true);
    dragRef.current = { startX: x, startY: y, lastX: x, lastPanX: panX, lastPanY: tiltY, lastTime: Date.now(), velocity: 0 };
  };

  const moveDrag = (x: number, y: number) => {
    if (!isDragging) return;
    const now = Date.now();
    const dt = now - dragRef.current.lastTime;
    const dx = x - dragRef.current.lastX;
    dragRef.current.velocity = dt > 0 ? dx / dt * 16 : 0;
    dragRef.current.lastX = x;
    dragRef.current.lastTime = now;

    const totalDX = x - dragRef.current.startX;
    const totalDY = y - dragRef.current.startY;
    setPanX(dragRef.current.lastPanX - totalDX * (1 / zoom));
    setTiltY(Math.max(20, Math.min(80, dragRef.current.lastPanY - totalDY * 0.05)));
  };

  const endDrag = () => {
    setIsDragging(false);
    applyInertia(-dragRef.current.velocity * (1 / zoom));
  };

  // Touch pinch
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      pinchRef.current = { startDist: d, startZoom: zoom };
    } else {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const ratio = d / pinchRef.current.startDist;
      setZoom(Math.max(1, Math.min(2.5, pinchRef.current.startZoom * ratio)));
    } else {
      moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const openLocation = (loc: Location) => {
    const idx = displayLocations.indexOf(loc);
    setLocationIndex(idx >= 0 ? idx : 0);
    setPanX(0);
    setTiltY(50);
    setZoom(1);
    setActiveHotspot(null);
    setShowInfo(false);
    setViewerOpen(true);
  };

  const navigate = (dir: -1 | 1) => {
    const next = (locationIndex + dir + displayLocations.length) % displayLocations.length;
    setLocationIndex(next);
    setPanX(0);
    setTiltY(50);
    setZoom(1);
    setActiveHotspot(null);
    setShowInfo(false);
  };

  // Hotspot visibility calculation
  const imageWidthPx = 1920;
  const panXWrapped = ((panX % imageWidthPx) + imageWidthPx) % imageWidthPx;
  const viewportWidthPercent = (100 / zoom) * 0.35; // ~35% of image visible

  const visibleHotspots = currentLocation.hotspots.filter(hs => {
    const hsPixel = (hs.xPercent / 100) * imageWidthPx;
    let diff = ((hsPixel - panXWrapped + imageWidthPx) % imageWidthPx);
    if (diff > imageWidthPx / 2) diff -= imageWidthPx;
    return Math.abs(diff) < (viewportWidthPercent / 100) * imageWidthPx * 0.8;
  });

  const hotspotScreenX = (hs: Hotspot) => {
    const hsPixel = (hs.xPercent / 100) * imageWidthPx;
    let diff = ((hsPixel - panXWrapped + imageWidthPx) % imageWidthPx);
    if (diff > imageWidthPx / 2) diff -= imageWidthPx;
    return 50 + (diff / imageWidthPx) * (100 / zoom) * 2.8;
  };

  // Compass heading
  const headingDeg = ((panX % 360) + 360) % 360;

  const categories = ['all', ...Array.from(new Set(displayLocations.map(l => l.category)))];

  return (
    <>
      {/* ── Grid View ── */}
      <div className="w-full max-w-7xl mx-auto space-y-6 px-2 sm:px-0">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-1">
            <Camera className="h-4 w-4" />
            Immersive Virtual Tours
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Explore Kerala in 360°</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Step inside Kerala's most iconic destinations. Drag, tilt, and discover hidden stories at every turn.
          </p>
          {destination && (
            <Badge variant="outline" className="px-4 py-1.5">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              Showing: {destination}
            </Badge>
          )}
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar justify-start sm:justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border',
                categoryFilter === cat
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
              )}
            >
              {cat === 'all' ? '🗺️ All' : `${CATEGORY_CONFIG[cat as Category].emoji} ${CATEGORY_CONFIG[cat as Category].label}`}
            </button>
          ))}
        </div>

        {/* Card grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Eye className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>No tours match your filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {filtered.map((loc, i) => (
              <LocationCard
                key={loc.id}
                location={loc}
                onClick={() => openLocation(loc)}
                isFeatured={i === 0 && filtered.length >= 3}
              />
            ))}
          </div>
        )}

        {onClose && (
          <div className="text-center pt-4">
            <Button variant="outline" onClick={onClose}>← Back to Planning</Button>
          </div>
        )}
      </div>

      {/* ── Fullscreen Viewer ── */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            key="viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col select-none"
          >
            {/* Panorama */}
            <div
              ref={viewerRef}
              className={cn(
                'relative flex-1 overflow-hidden',
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              )}
              onMouseDown={e => startDrag(e.clientX, e.clientY)}
              onMouseMove={e => moveDrag(e.clientX, e.clientY)}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={endDrag}
            >
              {/* Background panorama using background-position for seamless loop */}
              <div
                className="absolute inset-0 transition-[filter] duration-700"
                style={{
                  backgroundImage: `url(${currentLocation.panoramicImage})`,
                  backgroundSize: `auto ${100 * zoom}%`,
                  backgroundRepeat: 'repeat-x',
                  backgroundPositionX: `${-panX * zoom}px`,
                  backgroundPositionY: `${tiltY}%`,
                  filter: TIME_CONFIGS[timeOfDay].filter,
                }}
              />

              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)',
                }}
              />

              {/* Hotspots */}
              <AnimatePresence>
                {visibleHotspots.map(hs => (
                  <HotspotMarker
                    key={hs.id}
                    hotspot={hs}
                    screenX={hotspotScreenX(hs)}
                    isActive={activeHotspot === hs.id}
                    onClick={() => setActiveHotspot(activeHotspot === hs.id ? null : hs.id)}
                  />
                ))}
              </AnimatePresence>

              {/* ── Top HUD ── */}
              <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-3 sm:p-4 pointer-events-none">
                {/* Left: close + title */}
                <div className="flex items-center gap-3 pointer-events-auto">
                  <button
                    onClick={() => setViewerOpen(false)}
                    className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2">
                    <p className="text-white font-semibold text-sm leading-none">{currentLocation.name}</p>
                    <p className="text-white/60 text-xs mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />{currentLocation.location}
                    </p>
                  </div>
                </div>

                {/* Right: time of day + info + favorite */}
                <div className="flex items-center gap-2 pointer-events-auto">
                  {/* Time of day selector */}
                  <div className="hidden sm:flex items-center bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
                    {(Object.keys(TIME_CONFIGS) as TimeOfDay[]).map(t => (
                      <button
                        key={t}
                        onClick={() => setTimeOfDay(t)}
                        className={cn(
                          'px-2.5 py-2 text-sm transition-colors',
                          timeOfDay === t ? 'bg-white/25 text-white' : 'text-white/50 hover:text-white hover:bg-white/10'
                        )}
                        title={TIME_CONFIGS[t].label}
                      >
                        {TIME_CONFIGS[t].emoji}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowInfo(s => !s)}
                    className={cn(
                      'w-9 h-9 rounded-full backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-colors',
                      showInfo ? 'bg-white/30' : 'bg-black/60 hover:bg-black/80'
                    )}
                  >
                    <Info className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setFavorites(f => { const s = new Set(f); s.has(currentLocation.id) ? s.delete(currentLocation.id) : s.add(currentLocation.id); return s; })}
                    className={cn(
                      'w-9 h-9 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors',
                      favorites.has(currentLocation.id) ? 'bg-red-500 border-red-400 text-white' : 'bg-black/60 text-white hover:bg-black/80'
                    )}
                  >
                    <Heart className={cn('h-4 w-4', favorites.has(currentLocation.id) && 'fill-current')} />
                  </button>
                </div>
              </div>

              {/* Time of day mobile */}
              <div className="sm:hidden absolute top-16 right-3 flex flex-col gap-1 pointer-events-auto">
                {(Object.keys(TIME_CONFIGS) as TimeOfDay[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeOfDay(t)}
                    className={cn(
                      'w-8 h-8 rounded-full backdrop-blur-sm border border-white/20 text-sm flex items-center justify-center transition-colors',
                      timeOfDay === t ? 'bg-white/30 border-white/60' : 'bg-black/50 text-white/60'
                    )}
                  >
                    {TIME_CONFIGS[t].emoji}
                  </button>
                ))}
              </div>

              {/* Prev / Next arrows */}
              <button
                onClick={() => navigate(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors z-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/80 transition-colors z-10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* ── Bottom-left controls ── */}
              <div className="absolute bottom-28 sm:bottom-24 left-3 sm:left-4 flex flex-col gap-2 pointer-events-auto">
                {/* Auto-rotate */}
                <button
                  onClick={() => setIsAutoRotating(r => !r)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/20 text-white text-xs font-medium transition-colors',
                    isAutoRotating ? 'bg-white/25' : 'bg-black/60 hover:bg-black/80'
                  )}
                >
                  {isAutoRotating ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  <span className="hidden sm:inline">{isAutoRotating ? 'Pause' : 'Auto Tour'}</span>
                </button>

                {/* Zoom */}
                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-white/20 rounded-xl px-2 py-1.5">
                  <button onClick={() => setZoom(z => Math.max(1, z - 0.2))} className="text-white/80 hover:text-white p-0.5">
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-white text-[11px] font-mono w-8 text-center">{zoom.toFixed(1)}×</span>
                  <button onClick={() => setZoom(z => Math.min(2.5, z + 0.2))} className="text-white/80 hover:text-white p-0.5">
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* ── Compass ── */}
              <div className="absolute bottom-28 sm:bottom-24 right-3 sm:right-4 pointer-events-none">
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full bg-black/60 backdrop-blur-sm border border-white/20"
                    style={{ transform: `rotate(${-headingDeg}deg)` }}
                  >
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-3 rounded-full bg-red-500" />
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-3 rounded-full bg-white/60" />
                  </div>
                  <Compass className="h-4 w-4 text-white/80 relative z-10" />
                </div>
                <p className="text-white/50 text-[9px] text-center mt-1 font-mono">{Math.round(headingDeg)}°</p>
              </div>

              {/* Drag hint */}
              {!isDragging && (
                <div className="absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 pointer-events-none">
                  <p className="text-white/40 text-xs text-center">Drag to explore · Scroll to zoom · ↑↓ to tilt</p>
                </div>
              )}

              {/* ── Info slide-up panel ── */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="absolute bottom-20 left-3 right-3 sm:left-auto sm:right-4 sm:w-80 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 pointer-events-auto z-20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-bold text-base">{currentLocation.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                            <Star className="h-3 w-3 fill-current" />{currentLocation.rating}
                          </span>
                          <span className="text-white/50 text-xs flex items-center gap-1">
                            <Clock className="h-3 w-3" />{currentLocation.visitDuration}
                          </span>
                          <span className="text-white/50 text-xs">{currentLocation.temperature}</span>
                        </div>
                      </div>
                      <button onClick={() => setShowInfo(false)} className="text-white/50 hover:text-white">
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-white/70 text-xs leading-relaxed mb-3">{currentLocation.description}</p>

                    <div className="mb-3">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold mb-2">Highlights</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {currentLocation.highlights.map(h => (
                          <div key={h} className="flex items-center gap-1.5 text-white/70 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs border-t border-white/10 pt-3">
                      <span className="text-white/50">Best time: <span className="text-white/80">{currentLocation.bestTime}</span></span>
                      <span className="flex items-center gap-1 text-white/50">
                        <MapPin className="h-3 w-3" />{currentLocation.location}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Thumbnail strip ── */}
            <div className="flex-shrink-0 bg-black/95 border-t border-white/10 px-3 py-2">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {displayLocations.map((loc, i) => (
                  <button
                    key={loc.id}
                    onClick={() => { setLocationIndex(i); setPanX(0); setTiltY(50); setZoom(1); setActiveHotspot(null); setShowInfo(false); }}
                    className={cn(
                      'flex-shrink-0 relative rounded-lg overflow-hidden transition-all border-2',
                      i === locationIndex ? 'border-white scale-105' : 'border-transparent opacity-60 hover:opacity-90'
                    )}
                  >
                    <ImageWithFallback
                      src={loc.image}
                      alt={loc.name}
                      className="w-14 h-10 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <p className="absolute bottom-0.5 left-0 right-0 text-white text-[8px] text-center font-medium px-0.5 truncate">
                      {loc.name.split(' ')[0]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
