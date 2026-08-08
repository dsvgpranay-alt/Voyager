import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import {
  ShoppingCart,
  Star,
  Heart,
  Plus,
  Minus,
  Search,
  Filter,
  MapPin,
  Truck,
  Shield,
  Gift,
  CalendarCheck,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../hooks/useCart';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  category: string;
  destination: string;
  inStock: boolean;
  isAuthentic: boolean;
  freeShipping: boolean;
  tags: string[];
  isService?: boolean;
  duration?: string;
}

interface ECommerceProps {
  destination?: string;
  onBack: () => void;
}

export function ECommerce({ destination, onBack }: ECommerceProps) {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const { cart, addToCart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();

  // Kerala destination-specific products
  const getProductsByDestination = (_dest: string): Product[] => {
    const baseProducts: Product[] = [

      // ── TEXTILES ──────────────────────────────────────────────────────────
      {
        id: 'textile-1',
        name: 'Kasavu Saree – Pure Gold Border',
        price: 4500,
        originalPrice: 5800,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
        rating: 4.9,
        reviews: 312,
        description: 'Traditional Kerala kasavu saree in off-white handloom cotton with a rich zari gold border. The quintessential Kerala festive attire worn during Onam and weddings.',
        category: 'textiles',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['traditional', 'gold-border', 'festive']
      },
      {
        id: 'textile-2',
        name: 'Kerala Silk Saree – Kanchipuram Weave',
        price: 6800,
        originalPrice: 8500,
        image: 'https://images.unsplash.com/photo-1726431531818-5dea4833d523?w=600&q=80',
        rating: 4.8,
        reviews: 187,
        description: 'Luxurious silk saree with Kanchipuram-style weave and intricate temple-border motifs. Hand-woven by master weavers in Balaramapuram.',
        category: 'textiles',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['silk', 'hand-woven', 'luxury']
      },
      {
        id: 'textile-3',
        name: 'Kerala Cotton Saree – Handloom Checks',
        price: 1800,
        originalPrice: 2400,
        image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80',
        rating: 4.6,
        reviews: 254,
        description: 'Lightweight handloom cotton saree with traditional Kerala check patterns. Comfortable for daily wear in warm coastal climates.',
        category: 'textiles',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['cotton', 'daily-wear', 'breathable']
      },
      {
        id: 'textile-4',
        name: 'Set Mundu – Double Dhoti White',
        price: 1250,
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
        rating: 4.7,
        reviews: 198,
        description: 'Classic Kerala set mundu in pristine white with fine gold kasavu border. Worn by men during festivals and temple visits. Soft, pure cotton weave.',
        category: 'textiles',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['traditional', 'men\'s-wear', 'festival']
      },
      {
        id: 'textile-5',
        name: 'Kasavu Dhoti – Men\'s Ceremonial',
        price: 980,
        originalPrice: 1300,
        image: 'https://images.unsplash.com/photo-1583391733956-62e79e6f7b18?w=600&q=80',
        rating: 4.5,
        reviews: 143,
        description: 'Single kasavu dhoti with gold zari border. Soft handloom cotton, ideal for weddings and religious ceremonies across Kerala.',
        category: 'textiles',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['men\'s', 'ceremonial', 'handloom']
      },
      {
        id: 'textile-6',
        name: 'Mundum Neriyathum – Two-Piece Set',
        price: 2200,
        originalPrice: 2900,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
        rating: 4.8,
        reviews: 167,
        description: 'Classic Kerala two-piece set comprising mundu and neriyathu with gold kasavu border. The traditional dress of Kerala women for formal and festive occasions.',
        category: 'textiles',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['women\'s', 'two-piece', 'traditional']
      },
      {
        id: 'textile-7',
        name: 'Handloom Cotton Fabric – Per Metre',
        price: 380,
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80',
        rating: 4.4,
        reviews: 88,
        description: 'Premium handloom cotton fabric from Chendamangalam weavers. Available in natural white; ideal for stitching traditional Kerala garments.',
        category: 'textiles',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['fabric', 'by-metre', 'natural-white']
      },
      {
        id: 'textile-8',
        name: 'Kerala Handwoven Towel Set – 3 Pcs',
        price: 680,
        originalPrice: 900,
        image: 'https://images.unsplash.com/photo-1556909172-8c2f041fca1e?w=600&q=80',
        rating: 4.5,
        reviews: 112,
        description: 'Set of 3 soft handloom cotton towels with traditional Kerala check and stripe patterns in muted earth tones. Highly absorbent and durable.',
        category: 'textiles',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: false,
        freeShipping: false,
        tags: ['towels', 'set-of-3', 'cotton']
      },

      // ── HANDICRAFTS ───────────────────────────────────────────────────────
      {
        id: 'craft-1',
        name: 'Natural Coir Door Mat',
        price: 450,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
        rating: 4.5,
        reviews: 203,
        description: 'Handwoven natural coir door mat with traditional rope twist pattern. Anti-slip, eco-friendly, and long-lasting.',
        category: 'handicrafts',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['eco-friendly', 'natural', 'handwoven']
      },
      {
        id: 'craft-2',
        name: 'Kathakali Face Mask – Handpainted',
        price: 2500,
        originalPrice: 3200,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
        rating: 4.9,
        reviews: 145,
        description: 'Authentic Kathakali face mask hand-crafted and painted by traditional artisans in Thrissur. Each piece is unique — a stunning conversation-starter for any room.',
        category: 'handicrafts',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['authentic', 'hand-painted', 'cultural']
      },
      {
        id: 'craft-3',
        name: 'Wooden Rosewood Elephant – Large',
        price: 3500,
        originalPrice: 4500,
        image: 'https://images.unsplash.com/photo-1739281468485-dfb4231a004d?w=600&q=80',
        rating: 4.8,
        reviews: 98,
        description: 'Hand-carved rosewood elephant sculpture with fine detailing. A beloved Kerala souvenir symbolising strength and good luck, crafted in Thrissur.',
        category: 'handicrafts',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['rosewood', 'hand-carved', 'decor']
      },
      {
        id: 'craft-4',
        name: 'Coir Floor Carpet – 4×6 ft',
        price: 1800,
        originalPrice: 2200,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
        rating: 4.6,
        reviews: 176,
        description: 'Large handwoven coir carpet with geometric patterns in natural and earthy tones. Perfect for living rooms and entrance halls.',
        category: 'handicrafts',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['carpet', 'large', 'geometric']
      },
      {
        id: 'craft-5',
        name: 'Banana Fibre Shoulder Bag',
        price: 890,
        image: 'https://images.unsplash.com/photo-1578678809626-a3741782f0b8?w=600&q=80',
        rating: 4.6,
        reviews: 134,
        description: 'Handcrafted shoulder bag made from sustainable banana plant fibre. Unique texture, sturdy handles, and a natural golden-brown finish.',
        category: 'handicrafts',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['sustainable', 'banana-fibre', 'handcrafted']
      },
      {
        id: 'craft-6',
        name: 'Jute & Coir Tote Handbag',
        price: 720,
        originalPrice: 980,
        image: 'https://images.unsplash.com/photo-1578678809626-a3741782f0b8?w=600&q=80',
        rating: 4.4,
        reviews: 89,
        description: 'Stylish tote handbag combining jute and coir weaving with cotton lining. Spacious, reusable, and a fashionable eco-friendly everyday bag.',
        category: 'handicrafts',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: false,
        freeShipping: false,
        tags: ['tote', 'jute', 'eco-fashion']
      },
      {
        id: 'craft-7',
        name: 'Coconut Shell Bowl Set – 4 Pcs',
        price: 580,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
        rating: 4.5,
        reviews: 112,
        description: 'Hand-polished coconut shell bowls finished with natural lacquer. Food-safe and each piece has unique natural grain patterns. Ideal for serving nuts and condiments.',
        category: 'handicrafts',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['coconut-shell', 'food-safe', 'natural']
      },
      {
        id: 'craft-8',
        name: 'Nettipattam Caparison Souvenir',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
        rating: 4.7,
        reviews: 76,
        description: 'Decorative replica of the traditional Nettipattam elephant caparison. Handmade with metal work and colourful inlays — a proud symbol of Kerala\'s temple art.',
        category: 'handicrafts',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['temple-art', 'metal-work', 'souvenir']
      },
      {
        id: 'craft-9',
        name: 'Aranmula Metal Mirror',
        price: 8500,
        originalPrice: 10000,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
        rating: 5.0,
        reviews: 42,
        description: 'One-of-a-kind Aranmula kannadi, a sacred metal mirror cast from a secret alloy by a single family in Aranmula village. GI-tagged and coveted as a bridal gift.',
        category: 'handicrafts',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['GI-tagged', 'heirloom', 'sacred']
      },
      {
        id: 'craft-10',
        name: 'Sandalwood Ganesha Carving',
        price: 4200,
        originalPrice: 5500,
        image: 'https://images.unsplash.com/photo-1739281468485-dfb4231a004d?w=600&q=80',
        rating: 4.8,
        reviews: 67,
        description: 'Intricately carved Ganesha idol in pure sandalwood. Fragrant for years and richly detailed. Crafted by artisans from Guruvayur.',
        category: 'handicrafts',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['sandalwood', 'religious', 'fragrant']
      },

      // ── TEA & COFFEE – BEVERAGES ──────────────────────────────────────────
      {
        id: 'bev-1',
        name: 'Munnar Cardamom Tea – 250 g',
        price: 380,
        originalPrice: 480,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80',
        rating: 4.9,
        reviews: 512,
        description: 'First-flush Munnar tea blended with crushed green cardamom from Idukki. A fragrant, lightly spiced cup that defines Kerala mornings.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['cardamom', 'first-flush', 'aromatic']
      },
      {
        id: 'bev-2',
        name: 'Premium Nilgiri Black Tea – 500 g',
        price: 520,
        originalPrice: 680,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80',
        rating: 4.8,
        reviews: 389,
        description: 'High-grown Nilgiri black tea with a bright, brisk liquor and floral notes. Ideal for a classic South Indian cup or chai.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['black-tea', 'high-grown', 'Nilgiri']
      },
      {
        id: 'bev-3',
        name: 'Organic Green Tea – 200 g',
        price: 460,
        image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80',
        rating: 4.7,
        reviews: 267,
        description: 'Certified organic green tea from the Munnar high ranges. Light vegetal taste with grassy notes; rich in antioxidants and polyphenols.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['organic', 'antioxidant', 'green-tea']
      },
      {
        id: 'bev-4',
        name: 'Rare White Tea Pearls – 100 g',
        price: 1200,
        originalPrice: 1600,
        image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80',
        rating: 4.9,
        reviews: 98,
        description: 'Handpicked silver needle white tea, minimally processed to preserve delicate floral and honey notes. One of the most prized teas from the Western Ghats.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['white-tea', 'silver-needle', 'rare']
      },
      {
        id: 'bev-5',
        name: 'Masala Chai Blend – 200 g',
        price: 340,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80',
        rating: 4.8,
        reviews: 445,
        description: 'Kerala-style masala chai blend with hand-ground cardamom, ginger, clove, cinnamon and black pepper. Brew with milk for a rich, warming cup.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['masala', 'spiced', 'chai']
      },
      {
        id: 'bev-6',
        name: 'Ginger Lemon Herbal Tea – 150 g',
        price: 280,
        image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&q=80',
        rating: 4.6,
        reviews: 213,
        description: 'Caffeine-free herbal infusion of dried Kerala ginger, lemon zest and tulsi. Soothing after meals and great for digestion and immunity.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: false,
        freeShipping: false,
        tags: ['herbal', 'caffeine-free', 'immunity']
      },
      {
        id: 'bev-7',
        name: 'Organic CTC Tea – 1 kg',
        price: 720,
        originalPrice: 950,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80',
        rating: 4.5,
        reviews: 334,
        description: 'Robust CTC-grade black tea from Munnar estates. Strong, full-bodied liquor that holds up beautifully to milk. Economical bulk pack for large households.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['CTC', 'bulk', 'strong']
      },
      {
        id: 'bev-8',
        name: 'Darjeeling-style Nilgiri Tea – 300 g',
        price: 580,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80',
        rating: 4.7,
        reviews: 156,
        description: 'Premium whole-leaf Nilgiri tea with a muscatel character reminiscent of Darjeeling second-flush. Excellent brewed long and served black.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['whole-leaf', 'muscatel', 'premium']
      },
      {
        id: 'bev-9',
        name: 'Coorg Arabica Coffee – 250 g',
        price: 620,
        originalPrice: 780,
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
        rating: 4.8,
        reviews: 298,
        description: 'Shade-grown Arabica beans from the Coorg-Wayanad belt. Medium roast with bright acidity, notes of dark chocolate and citrus. Ground to order.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['arabica', 'shade-grown', 'medium-roast']
      },
      {
        id: 'bev-10',
        name: 'Robusta Blend Coffee – 500 g',
        price: 480,
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
        rating: 4.6,
        reviews: 234,
        description: 'Bold Robusta-dominant blend from Wayanad. Strong crema, woody and earthy undertones. The backbone of authentic Kerala kaapi.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['robusta', 'bold', 'Wayanad']
      },
      {
        id: 'bev-11',
        name: 'Plantation Fresh Coffee – 250 g',
        price: 540,
        originalPrice: 700,
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
        rating: 4.7,
        reviews: 178,
        description: 'Single-origin coffee roasted within 24 hours of dispatch from a family estate in Vagamon. Smooth, balanced, and extraordinarily fresh.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['single-origin', 'fresh-roast', 'family-estate']
      },
      {
        id: 'bev-12',
        name: 'South Indian Filter Coffee Powder – 500 g',
        price: 390,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
        rating: 4.9,
        reviews: 567,
        description: 'Traditional 80:20 coffee-chicory blend, perfect for the South Indian stainless steel filter. Produces a thick decoction that blends perfectly with hot milk.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['filter-coffee', 'chicory-blend', 'traditional']
      },
      {
        id: 'bev-13',
        name: 'Cardamom Coffee Powder – 200 g',
        price: 520,
        originalPrice: 640,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
        rating: 4.8,
        reviews: 203,
        description: 'Premium coffee powder infused with Idukki cardamom for an aromatic twist on the classic brew. Pairs beautifully with jaggery.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['cardamom', 'aromatic', 'artisan']
      },
      {
        id: 'bev-14',
        name: 'Vanilla Flavoured Coffee – 150 g',
        price: 480,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
        rating: 4.5,
        reviews: 132,
        description: 'Medium-roast coffee flavoured with natural vanilla from Wayanad. Sweet, smooth and indulgent — wonderful as a cold brew or iced latte.',
        category: 'beverages',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: false,
        freeShipping: false,
        tags: ['vanilla', 'flavoured', 'cold-brew']
      },

      // ── SPICES ────────────────────────────────────────────────────────────
      {
        id: 'spice-1',
        name: 'Idukki Cardamom Pods – 100 g',
        price: 850,
        originalPrice: 1200,
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
        rating: 4.9,
        reviews: 412,
        description: 'Queen of Spices from the high-altitude cardamom hills of Idukki. Plump green pods with intense eucalyptol aroma. Direct from certified growers.',
        category: 'spices',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['GI-certified', 'Idukki', 'premium']
      },
      {
        id: 'spice-2',
        name: 'Malabar Black Pepper – 200 g',
        price: 680,
        originalPrice: 900,
        image: 'https://images.unsplash.com/photo-1599819177583-9adde0db2862?w=600&q=80',
        rating: 4.8,
        reviews: 345,
        description: 'King of Spices — bold, pungent Malabar pepper sourced from Wayanad and Kozhikode. Rich in piperine, celebrated globally for centuries.',
        category: 'spices',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['king-of-spices', 'Malabar', 'medicinal']
      },
      {
        id: 'spice-3',
        name: 'True Ceylon Cinnamon – 100 g',
        price: 420,
        originalPrice: 560,
        image: 'https://images.unsplash.com/photo-1553499944-e4297a0af1bd?w=600&q=80',
        rating: 4.7,
        reviews: 234,
        description: 'Authentic Cinnamomum verum (true cinnamon) sticks, not cassia. Delicate, sweet and mildly spicy. Hand-rolled quills from Kerala\'s spice gardens.',
        category: 'spices',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['true-cinnamon', 'non-cassia', 'sweet']
      },
      {
        id: 'spice-4',
        name: 'Whole Cloves – 50 g',
        price: 380,
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
        rating: 4.6,
        reviews: 178,
        description: 'Plump, oil-rich whole cloves from Thrissur spice farms. Intense eugenol aroma — essential for biryani, chai masala, and traditional pickles.',
        category: 'spices',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['whole-cloves', 'oil-rich', 'aromatic']
      },
      {
        id: 'spice-5',
        name: 'Nutmeg & Mace Set – 50 g each',
        price: 560,
        originalPrice: 720,
        image: 'https://images.unsplash.com/photo-1599819177583-9adde0db2862?w=600&q=80',
        rating: 4.7,
        reviews: 134,
        description: 'Whole dried nutmeg and its lacy mace aril in a twin-pack. Kerala grows 95% of India\'s nutmeg — warm, woody and intensely aromatic.',
        category: 'spices',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['twin-pack', 'nutmeg', 'mace']
      },
      {
        id: 'spice-6',
        name: 'Organic Turmeric Powder – 200 g',
        price: 280,
        image: 'https://images.unsplash.com/photo-1606951444141-e5533feb55be?w=600&q=80',
        rating: 4.8,
        reviews: 398,
        description: 'Lacatan variety turmeric from Ernakulam, known for exceptionally high curcumin content (>5%). Stone-ground, unbleached, certified organic.',
        category: 'spices',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['high-curcumin', 'organic', 'stone-ground']
      },

      // ── AYURVEDA PRODUCTS ─────────────────────────────────────────────────
      {
        id: 'ayur-1',
        name: 'Chyawanprash Classic – 500 g',
        price: 450,
        originalPrice: 580,
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
        rating: 4.7,
        reviews: 312,
        description: 'Traditional Ayurvedic rasayana made with 49 herbs including amla, ashwagandha and pippali. Boosts immunity, vitality and respiratory health.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['immunity', 'rasayana', 'classical']
      },
      {
        id: 'ayur-2',
        name: 'Ashwagandha Capsules – 60 caps',
        price: 380,
        originalPrice: 480,
        image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80',
        rating: 4.8,
        reviews: 445,
        description: 'Standardised KSM-66® ashwagandha root extract in vegetarian capsules. Clinically studied adaptogen for stress relief, energy and hormonal balance.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['adaptogen', 'KSM-66', 'stress-relief']
      },
      {
        id: 'ayur-3',
        name: 'Triphala Churna – 200 g',
        price: 280,
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
        rating: 4.6,
        reviews: 267,
        description: 'Equal-parts blend of amalaki, bibhitaki and haritaki. The foundational Ayurvedic trifruit formula for gentle detox, digestion and eye health.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['triphala', 'detox', 'digestion']
      },
      {
        id: 'ayur-4',
        name: 'Brahmi Oil – 100 ml',
        price: 320,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
        rating: 4.7,
        reviews: 198,
        description: 'Cold-pressed sesame oil infused with brahmi, bhringraj and amalaki. Traditional scalp massage oil that promotes hair growth and calms the nervous system.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['hair-growth', 'scalp', 'brahmi']
      },
      {
        id: 'ayur-5',
        name: 'Kumkumadi Facial Oil – 30 ml',
        price: 980,
        originalPrice: 1200,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 4.9,
        reviews: 234,
        description: 'Luxurious face oil with saffron, sandalwood and 16 other botanicals. The legendary Ayurvedic skin brightening elixir, made using classical taila method.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['saffron', 'skin-brightening', 'luxury']
      },
      {
        id: 'ayur-6',
        name: 'Neelibhringadi Hair Oil – 200 ml',
        price: 480,
        originalPrice: 620,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
        rating: 4.8,
        reviews: 312,
        description: 'The iconic Kerala hair oil formulated with indigo leaves (neeli), bhringraj and amla in a sesame base. Fights premature greying and deeply conditions the scalp.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['anti-greying', 'bhringraj', 'scalp-care']
      },
      {
        id: 'ayur-7',
        name: 'Dhanwantharam Thailam – 200 ml',
        price: 620,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
        rating: 4.8,
        reviews: 167,
        description: 'Classical Ayurvedic oil prepared with over 28 herbs in a sesame-milk base. Traditional Vata-pacifying massage oil for joint, muscle and neurological support.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: true,
        tags: ['classical-formula', 'vata', 'joint-care']
      },
      {
        id: 'ayur-8',
        name: 'Herbal Shampoo – 200 ml',
        price: 280,
        image: 'https://images.unsplash.com/photo-1571781565036-d3f759be73e4?w=600&q=80',
        rating: 4.5,
        reviews: 189,
        description: 'Sulphate-free herbal shampoo with shikakai, reetha and hibiscus. Gently cleanses without stripping natural oils. Suitable for all hair types.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: false,
        freeShipping: false,
        tags: ['sulphate-free', 'shikakai', 'natural']
      },
      {
        id: 'ayur-9',
        name: 'Herbal Soap Set – 3 Bars',
        price: 360,
        originalPrice: 450,
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80',
        rating: 4.6,
        reviews: 223,
        description: 'Set of 3 cold-process soaps — neem-tulsi, turmeric-sandalwood and rose-aloe. Handmade, palm-oil free and skin-nourishing for all skin types.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: false,
        freeShipping: false,
        tags: ['cold-process', 'handmade', 'set-of-3']
      },
      {
        id: 'ayur-10',
        name: 'Multani Mitti Herbal Face Pack – 100 g',
        price: 220,
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
        rating: 4.5,
        reviews: 156,
        description: 'Full-clay face pack blending multani mitti with neem, rose and sandalwood powders. Deeply cleanses pores, controls oil and brightens dull skin.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: false,
        freeShipping: false,
        tags: ['face-pack', 'pore-cleanse', 'clay']
      },
      {
        id: 'ayur-11',
        name: 'Herbal Skin Cream – 50 g',
        price: 380,
        image: 'https://images.unsplash.com/photo-1614682283241-26b7fd9a01e5?w=600&q=80',
        rating: 4.6,
        reviews: 134,
        description: 'Lightweight Ayurvedic day cream with manjistha, vetiver and coconut. Moisturises, evens skin tone and provides gentle UV protection for Kerala\'s tropical climate.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: false,
        freeShipping: false,
        tags: ['moisturiser', 'manjistha', 'skin-tone']
      },
      {
        id: 'ayur-12',
        name: 'Herbal Tooth Powder – 100 g',
        price: 180,
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
        rating: 4.7,
        reviews: 289,
        description: 'Traditional dantmajan-style tooth powder with neem, clove, rock salt and triphala. Whitens teeth, strengthens gums and leaves breath fresh for hours.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['neem', 'teeth-whitening', 'gum-care']
      },

      // ── AYURVEDA TREATMENTS (BOOKABLE SERVICES) ──────────────────────────
      {
        id: 'treat-1',
        name: 'Panchakarma Detox Program',
        price: 12500,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 4.9,
        reviews: 78,
        description: 'Complete 5-day Panchakarma cleanse with personalised Vata-Pitta-Kapha assessment, Abhyanga, Virechana and Basti treatments supervised by a qualified Ayurvedic physician.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['5-day', 'full-detox', 'physician-supervised'],
        isService: true,
        duration: '5 Days'
      },
      {
        id: 'treat-2',
        name: 'Abhyanga Full Body Massage',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 4.8,
        reviews: 312,
        description: 'Two-therapist synchronised warm herbal oil massage following traditional Abhyanga strokes. Deeply relaxes muscles, stimulates lymphatic flow and nourishes the skin.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['two-therapist', 'warm-oil', 'lymphatic'],
        isService: true,
        duration: '60 min'
      },
      {
        id: 'treat-3',
        name: 'Shirodhara Scalp Therapy',
        price: 2200,
        originalPrice: 2800,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 4.9,
        reviews: 198,
        description: 'Continuous warm medicated oil stream poured on the forehead (third eye). Profoundly calming — relieves migraines, insomnia, anxiety and mental fatigue.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['stress-relief', 'migraine', 'insomnia'],
        isService: true,
        duration: '45 min'
      },
      {
        id: 'treat-4',
        name: 'Pizhichil – Royal Oil Bath',
        price: 2800,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 4.9,
        reviews: 87,
        description: 'Four therapists pour continuous streams of warm medicated oil over the body — a treatment historically reserved for Kerala royalty. Rejuvenates, lubricates joints and restores vitality.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['royal', 'four-therapist', 'joint-care'],
        isService: true,
        duration: '60 min'
      },
      {
        id: 'treat-5',
        name: 'Elakizhi Herbal Pouch Massage',
        price: 2000,
        originalPrice: 2500,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 4.7,
        reviews: 134,
        description: 'Warm linen pouches filled with fresh herbs (leaves of calotropis, tamarind, coconut) are used to massage the body in rhythmic strokes. Relieves joint pain and stiffness.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['herbal-pouch', 'joint-pain', 'rhythmic'],
        isService: true,
        duration: '60 min'
      },
      {
        id: 'treat-6',
        name: 'Njavarakizhi Rice Therapy',
        price: 2400,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 4.8,
        reviews: 112,
        description: 'Boluses of medicated Njavara rice cooked in milk and decoctions are massaged onto the body. Nourishes tissues, tones muscles and is excellent for neurological conditions.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['Njavara-rice', 'muscle-tone', 'neurological'],
        isService: true,
        duration: '75 min'
      },
      {
        id: 'treat-7',
        name: 'Swedanam Steam Bath',
        price: 800,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 4.5,
        reviews: 178,
        description: 'Medicated herbal steam bath to induce therapeutic sweating. Opens pores, eliminates toxins and relieves muscle tension. Often combined with Abhyanga.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['detox', 'steam', 'pore-cleanse'],
        isService: true,
        duration: '30 min'
      },
      {
        id: 'treat-8',
        name: 'Stress Relief Signature Package',
        price: 3500,
        originalPrice: 4500,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 4.9,
        reviews: 156,
        description: 'Curated 2-hour package: Abhyanga + Shirodhara + Swedanam + aromatherapy foot massage. The ultimate Kerala wellness escape to reset mind and body.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['signature', 'combo', 'stress-reset'],
        isService: true,
        duration: '2 hrs'
      },
      {
        id: 'treat-9',
        name: 'Panchakarma Wellness Retreat',
        price: 18000,
        originalPrice: 22000,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 5.0,
        reviews: 43,
        description: 'Immersive 7-day residential retreat combining Panchakarma treatments, Sattvic meals, morning yoga and Ayurvedic consultations. Accommodation at heritage Ayurvedic resort included.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['7-day', 'residential', 'all-inclusive'],
        isService: true,
        duration: '7 Days'
      },
      {
        id: 'treat-10',
        name: 'Rasayana Rejuvenation Therapy',
        price: 2600,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 4.8,
        reviews: 98,
        description: 'Anti-ageing treatment combining Abhyanga with rasayana herbal preparations. Promotes cell renewal, improves skin lustre and supports longevity according to classical Ayurveda.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['anti-ageing', 'rejuvenation', 'longevity'],
        isService: true,
        duration: '90 min'
      },
      {
        id: 'treat-11',
        name: 'Arthritis Relief Program',
        price: 8500,
        originalPrice: 10500,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 4.8,
        reviews: 67,
        description: '3-day intensive Ayurvedic program for osteoarthritis and rheumatoid arthritis. Includes Elakizhi, Kati Basti, Janu Basti and prescribed internal medications.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['arthritis', '3-day', 'joint-intensive'],
        isService: true,
        duration: '3 Days'
      },
      {
        id: 'treat-12',
        name: 'Back Pain Relief – 5 Sessions',
        price: 6500,
        originalPrice: 8000,
        image: 'https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=600&q=80',
        rating: 4.7,
        reviews: 89,
        description: 'Five-session Ayurvedic back care program with Kati Basti (warm medicated oil pool on lumbar), Pinda Sweda and therapeutic yoga postures for lasting relief.',
        category: 'wellness',
        destination: 'All Kerala',
        inStock: true,
        isAuthentic: true,
        freeShipping: false,
        tags: ['back-pain', 'Kati-Basti', '5-sessions'],
        isService: true,
        duration: '5 Sessions'
      }
    ];

    return baseProducts;
  };

  const products = getProductsByDestination(destination || 'All Kerala');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'spices', name: 'Spices', count: products.filter(p => p.category === 'spices').length },
    { id: 'handicrafts', name: 'Handicrafts', count: products.filter(p => p.category === 'handicrafts').length },
    { id: 'textiles', name: 'Textiles', count: products.filter(p => p.category === 'textiles').length },
    { id: 'beverages', name: 'Tea & Coffee', count: products.filter(p => p.category === 'beverages').length },
    { id: 'wellness', name: 'Ayurveda', count: products.filter(p => p.category === 'wellness').length }
  ];

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4">
            ← Back to Planning
          </Button>
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Kerala Marketplace</h1>
              <p className="text-muted-foreground">
                Authentic products from {destination || 'Kerala'} • Free shipping on orders above ₹1000
              </p>
            </div>
          </div>
        </div>
        
        {/* Cart Summary */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-primary text-primary-foreground p-4 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <div className="text-right">
              <div className="font-semibold">{getTotalItems()} items</div>
              <div className="text-sm opacity-90">₹{getTotalPrice()}</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span>{category.name}</span>
                  <Badge variant="secondary">{category.count}</Badge>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Destination Info */}
          {destination && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  From {destination}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover authentic products and specialties from {destination}.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full">
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 space-y-1">
                      {product.isAuthentic && (
                        <Badge className="bg-green-600 text-white">
                          <Shield className="h-3 w-3 mr-1" />
                          Authentic
                        </Badge>
                      )}
                      {product.freeShipping && (
                        <Badge className="bg-blue-600 text-white">
                          <Truck className="h-3 w-3 mr-1" />
                          Free Shipping
                        </Badge>
                      )}
                    </div>

                    {/* Wishlist */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          wishlist.includes(product.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-500'
                        }`} 
                      />
                    </Button>

                    {/* Discount */}
                    {product.originalPrice && (
                      <Badge className="absolute bottom-2 right-2 bg-red-600 text-white">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        {product.duration && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground ml-1">
                            <Clock className="h-3 w-3" />
                            {product.duration}
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Add to Cart / Book Now */}
                    <div className="flex items-center justify-between">
                      {product.isService ? (
                        <Button
                          className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white"
                          disabled={!product.inStock}
                        >
                          <CalendarCheck className="h-4 w-4 mr-2" />
                          Book Now
                        </Button>
                      ) : cart[product.id] ? (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, Math.max(0, cart[product.id] - 1))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 py-1 bg-muted rounded">
                            {cart[product.id]}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(product.id, cart[product.id] + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => addToCart(product.id, product.name, product.price)}
                          className="flex-1"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Gift className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}