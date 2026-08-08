import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Plus, Trash2, ShoppingBag, Star, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Traveler {
  id: string;
  name: string;
  age: number;
  contact: string;
}

export interface TravelerDetailsData {
  travelers: Traveler[];
  accommodationType: string;
  transportPreference: string;
}

interface TravelerDetailsProps {
  destination: string;
  onSubmit: (data: TravelerDetailsData) => void;
  onBack: () => void;
}

// Famous products data for each destination
const destinationProducts = {
  'Kochi (Cochin)': [
    { name: 'Kerala Spices', description: 'Black pepper, cardamom, cinnamon', price: '₹500-2000', image: 'spices spice market kerala' },
    { name: 'Coconut Products', description: 'Virgin coconut oil, coir items', price: '₹200-800', image: 'coconut oil kerala products' },
    { name: 'Cashew Nuts', description: 'Premium quality cashews', price: '₹800-1500', image: 'cashew nuts kerala' },
    { name: 'Marine Products', description: 'Fish pickle, prawn crackers', price: '₹300-600', image: 'kerala fish products' }
  ],
  'Munnar': [
    { name: 'Tea Varieties', description: 'Premium black tea, green tea', price: '₹300-1200', image: 'munnar tea plantation' },
    { name: 'Homemade Chocolates', description: 'Local chocolate varieties', price: '₹400-800', image: 'munnar chocolate homemade' },
    { name: 'Essential Oils', description: 'Eucalyptus, lemongrass oils', price: '₹600-1000', image: 'essential oils kerala' },
    { name: 'Honey Products', description: 'Wild forest honey', price: '₹500-900', image: 'kerala honey forest' }
  ],
  'Alleppey (Alappuzha)': [
    { name: 'Coir Products', description: 'Mats, ropes, decorative items', price: '₹200-1500', image: 'coir products alleppey' },
    { name: 'Backwater Rice', description: 'Special variety pokkali rice', price: '₹150-300', image: 'kerala pokkali rice' },
    { name: 'Coconut Shell Crafts', description: 'Bowls, decorative items', price: '₹100-500', image: 'coconut shell crafts kerala' },
    { name: 'Traditional Boats Models', description: 'Miniature houseboats', price: '₹800-2000', image: 'houseboat model kerala' }
  ],
  'Thekkady (Periyar)': [
    { name: 'Cardamom', description: 'Fresh green cardamom', price: '₹1500-2500', image: 'cardamom thekkady kerala' },
    { name: 'Black Pepper', description: 'Organic black pepper', price: '₹600-1200', image: 'black pepper kerala spice' },
    { name: 'Bamboo Products', description: 'Baskets, decorative items', price: '₹300-800', image: 'bamboo products kerala' },
    { name: 'Tribal Handicrafts', description: 'Traditional crafts', price: '₹400-1000', image: 'kerala tribal handicrafts' }
  ],
  'Wayanad': [
    { name: 'Coffee Beans', description: 'Arabica and robusta varieties', price: '₹400-1000', image: 'wayanad coffee beans' },
    { name: 'Vanilla', description: 'Fresh vanilla pods', price: '₹800-1500', image: 'vanilla pods wayanad' },
    { name: 'Honey Varieties', description: 'Multi-flower and single-flower honey', price: '₹400-800', image: 'wayanad honey varieties' },
    { name: 'Herbal Products', description: 'Ayurvedic medicines and oils', price: '₹300-1200', image: 'ayurvedic herbs wayanad' }
  ],
  'Kovalam': [
    { name: 'Seashell Crafts', description: 'Decorative items, jewelry', price: '₹200-800', image: 'seashell crafts kovalam' },
    { name: 'Ayurvedic Products', description: 'Oils, medicines, cosmetics', price: '₹500-2000', image: 'ayurvedic products kerala' },
    { name: 'Coconut Wood Items', description: 'Carved decorative pieces', price: '₹400-1500', image: 'coconut wood carvings kerala' },
    { name: 'Beach Apparel', description: 'Cotton clothing, sarongs', price: '₹300-1000', image: 'kerala cotton clothing beach' }
  ],
  'Kumarakom': [
    { name: 'Bird-themed Crafts', description: 'Wooden bird sculptures', price: '₹500-1200', image: 'bird crafts kumarakom' },
    { name: 'Backwater Paintings', description: 'Traditional art depicting backwaters', price: '₹800-3000', image: 'kerala backwater paintings' },
    { name: 'Local Fish Products', description: 'Fish curry powder, pickles', price: '₹200-600', image: 'kerala fish curry powder' },
    { name: 'Handwoven Mats', description: 'Traditional grass mats', price: '₹300-800', image: 'kerala handwoven mats' }
  ],
  'Thrissur': [
    { name: 'Gold Jewelry', description: 'Traditional Kerala designs', price: '₹5000-50000', image: 'kerala gold jewelry traditional' },
    { name: 'Bell Metal Items', description: 'Lamps, vessels, decorative pieces', price: '₹800-3000', image: 'kerala bell metal crafts' },
    { name: 'Silk Sarees', description: 'Kasavu sarees with gold borders', price: '₹2000-15000', image: 'kerala kasavu saree silk' },
    { name: 'Percussion Instruments', description: 'Chenda, mridangam', price: '₹5000-20000', image: 'kerala percussion instruments chenda' }
  ],
  'Kozhikode (Calicut)': [
    { name: 'Malabar Spices', description: 'Cloves, nutmeg, mace', price: '₹600-1500', image: 'malabar spices kozhikode' },
    { name: 'Halwa Varieties', description: 'Traditional sweet delicacies', price: '₹300-800', image: 'kozhikode halwa sweet' },
    { name: 'Handloom Textiles', description: 'Cotton fabrics, bed sheets', price: '₹500-2000', image: 'kerala handloom textiles' },
    { name: 'Brass Items', description: 'Traditional brass vessels', price: '₹400-2000', image: 'kerala brass vessels traditional' }
  ],
  'Varkala': [
    { name: 'Cliff-side Crafts', description: 'Stone carvings, sculptures', price: '₹600-2000', image: 'varkala stone crafts cliff' },
    { name: 'Ayurvedic Oils', description: 'Medicinal massage oils', price: '₹400-1000', image: 'varkala ayurvedic oils' },
    { name: 'Beach Accessories', description: 'Bags, hats, jewelry', price: '₹200-800', image: 'varkala beach accessories' },
    { name: 'Organic Soaps', description: 'Natural coconut oil soaps', price: '₹150-400', image: 'kerala organic coconut soap' }
  ],
  'Kottayam': [
    { name: 'Rubber Products', description: 'Latex items, rubber sheets', price: '₹300-1000', image: 'kerala rubber products latex' },
    { name: 'Spice Powders', description: 'Ground spice mixes', price: '₹200-600', image: 'kerala spice powders ground' },
    { name: 'Christian Artifacts', description: 'Religious items, crosses', price: '₹400-1500', image: 'kerala christian artifacts' },
    { name: 'Handmade Paper', description: 'Eco-friendly paper products', price: '₹200-800', image: 'kerala handmade paper products' }
  ],
  'Palakkad': [
    { name: 'Rice Varieties', description: 'Traditional Kerala rice', price: '₹100-300', image: 'palakkad rice varieties kerala' },
    { name: 'Jaggery Products', description: 'Palm jaggery, coconut jaggery', price: '₹200-500', image: 'kerala jaggery palm coconut' },
    { name: 'Handloom Dhoti', description: 'Traditional men\'s wear', price: '₹800-2000', image: 'kerala handloom dhoti traditional' },
    { name: 'Agricultural Tools', description: 'Traditional farming implements', price: '₹300-1200', image: 'kerala traditional farming tools' }
  ],
  'Kannur': [
    { name: 'Theyyam Masks', description: 'Traditional ritual masks', price: '₹1000-5000', image: 'theyyam masks kannur kerala' },
    { name: 'Handloom Products', description: 'Cooperative society textiles', price: '₹500-2000', image: 'kannur handloom textiles' },
    { name: 'Fishing Nets', description: 'Traditional fishing equipment', price: '₹800-2500', image: 'kerala traditional fishing nets' },
    { name: 'Coconut Craft Items', description: 'Shell and fiber products', price: '₹200-800', image: 'kannur coconut craft items' }
  ],
  'Idukki': [
    { name: 'Hill Station Tea', description: 'High-altitude tea varieties', price: '₹400-1200', image: 'idukki hill tea plantation' },
    { name: 'Wild Honey', description: 'Forest honey from hills', price: '₹600-1200', image: 'idukki wild forest honey' },
    { name: 'Cardamom Products', description: 'Fresh and processed cardamom', price: '₹1200-2500', image: 'idukki cardamom hills kerala' },
    { name: 'Tribal Jewelry', description: 'Traditional hill tribe ornaments', price: '₹500-2000', image: 'kerala tribal jewelry hills' }
  ],
  'Kasaragod': [
    { name: 'Beedi Leaves', description: 'Premium quality leaves', price: '₹400-800', image: 'kasaragod beedi leaves kerala' },
    { name: 'Cashew Feni', description: 'Traditional cashew liquor', price: '₹800-1500', image: 'cashew feni kasaragod kerala' },
    { name: 'Yakshagana Masks', description: 'Traditional art form masks', price: '₹1500-4000', image: 'yakshagana masks kasaragod' },
    { name: 'Coastal Handicrafts', description: 'Marine-themed crafts', price: '₹300-1000', image: 'kasaragod coastal handicrafts' }
  ]
};

export function TravelerDetails({ destination, onSubmit, onBack }: TravelerDetailsProps) {
  const [travelers, setTravelers] = React.useState<Traveler[]>([
    { id: '1', name: '', age: 0, contact: '' }
  ]);
  const [accommodationType, setAccommodationType] = React.useState('');
  const [transportPreference, setTransportPreference] = React.useState('');
  const [productImages, setProductImages] = React.useState<Record<string, string>>({});

  const addTraveler = React.useCallback(() => {
    const newTraveler: Traveler = {
      id: Date.now().toString(),
      name: '',
      age: 0,
      contact: ''
    };
    setTravelers(prevTravelers => [...prevTravelers, newTraveler]);
  }, []);

  const removeTraveler = React.useCallback((id: string) => {
    setTravelers(prevTravelers => {
      if (prevTravelers.length > 1) {
        return prevTravelers.filter(t => t.id !== id);
      }
      return prevTravelers;
    });
  }, []);

  const validatePhone = React.useCallback((phone: string) => {
    if (!phone || typeof phone !== 'string') return false;
    // Remove all spaces, dashes, and parentheses
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    // Allow optional + at start, then exactly 10 digits (for Indian phone numbers)
    const phoneRegex = /^[\+]?[1-9][\d]{9}$/;
    return phoneRegex.test(cleanPhone) && cleanPhone.length <= 11; // +91xxxxxxxxxx = 11 chars max
  }, []);

  const updateTraveler = React.useCallback((id: string, field: keyof Traveler, value: string | number) => {
    // Special handling for contact field to limit phone number length
    if (field === 'contact' && typeof value === 'string') {
      const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
      // Don't allow more than 11 characters (including country code)
      if (cleanPhone.length > 11) {
        return; // Don't update if too long
      }
    }
    
    setTravelers(prevTravelers => 
      prevTravelers.map(t => 
        t.id === id ? { ...t, [field]: value } : t
      )
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = travelers.every(t => t.name && t.age && t.contact && validatePhone(t.contact)) && 
                   accommodationType && transportPreference;
    
    if (!isValid) return;

    onSubmit({
      travelers,
      accommodationType,
      transportPreference
    });
  };

  // Get current destination products
  const currentProducts = destinationProducts[destination as keyof typeof destinationProducts] || [];

  // Fetch product images
  React.useEffect(() => {
    const fetchImages = async () => {
      const images: Record<string, string> = {};
      
      try {
        // Using unsplash for product images - we'll simulate the API call
        for (const product of currentProducts) {
          // For demo purposes, we'll use a placeholder pattern
          // In a real app, you would call the unsplash API
          const imageUrl = `https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400`;
          images[product.name] = imageUrl;
        }
        setProductImages(images);
      } catch (error) {
        console.error('Error fetching product images:', error);
      }
    };

    if (currentProducts.length > 0) {
      fetchImages();
    }
  }, [destination, currentProducts]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Traveler Details
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{travelers.length} Traveler(s)</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3>Add Travelers</h3>
              <Button
                type="button"
                variant="outline"
                onClick={addTraveler}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Traveler
              </Button>
            </div>

            {travelers.map((traveler, index) => (
              <Card key={traveler.id} className="relative">
                <CardContent className="pt-6">
                  {travelers.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTraveler(traveler.id)}
                      className="absolute top-2 right-2 text-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${traveler.id}`}>
                        Name {index === 0 && <span className="text-muted-foreground">(Primary)</span>}
                      </Label>
                      <Input
                        id={`name-${traveler.id}`}
                        placeholder="Full name"
                        value={traveler.name}
                        onChange={(e) => updateTraveler(traveler.id, 'name', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`age-${traveler.id}`}>Age</Label>
                      <Input
                        id={`age-${traveler.id}`}
                        type="number"
                        placeholder="Age"
                        min="1"
                        max="120"
                        value={traveler.age || ''}
                        onChange={(e) => updateTraveler(traveler.id, 'age', parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`contact-${traveler.id}`}>Contact Number</Label>
                      <Input
                        id={`contact-${traveler.id}`}
                        type="tel"
                        placeholder="e.g., 9876543210 or +91 9876543210"
                        value={traveler.contact}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Only allow numbers, +, spaces, hyphens, and parentheses
                          const filteredValue = value.replace(/[^0-9+\s\-\(\)]/g, '');
                          updateTraveler(traveler.id, 'contact', filteredValue);
                        }}
                        maxLength={11}
                        required
                        className={traveler.contact && !validatePhone(traveler.contact) ? 'border-red-500' : ''}
                      />
                      {traveler.contact && !validatePhone(traveler.contact) && (
                        <p className="text-red-500 text-sm">
                          Please enter a valid 10-digit phone number
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Accommodation Preference</Label>
              <Select value={accommodationType} onValueChange={setAccommodationType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select accommodation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget Hotels (₹1,500-3,000/night)</SelectItem>
                  <SelectItem value="mid-range">Mid-range Hotels (₹3,000-6,000/night)</SelectItem>
                  <SelectItem value="luxury">Luxury Hotels (₹6,000-15,000/night)</SelectItem>
                  <SelectItem value="resort">Premium Resorts (₹15,000+/night)</SelectItem>
                  <SelectItem value="homestay">Homestays (₹1,000-2,500/night)</SelectItem>
                  <SelectItem value="houseboat">Houseboat (₹5,000-12,000/night)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Transport Preference</Label>
              <Select value={transportPreference} onValueChange={setTransportPreference} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select transport mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="taxi">Private Taxi/Cab</SelectItem>
                  <SelectItem value="bus">Public Bus</SelectItem>
                  <SelectItem value="train">Train</SelectItem>
                  <SelectItem value="self-drive">Self-Drive Car</SelectItem>
                  <SelectItem value="bike">Bike/Scooter Rental</SelectItem>
                  <SelectItem value="flight">Domestic Flight</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Famous Products Section */}
          {currentProducts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pt-6 border-t">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Famous Products of {destination}</h3>
                <Badge variant="outline" className="ml-auto">
                  <MapPin className="h-3 w-3 mr-1" />
                  Local Specialties
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Don't miss these authentic local products that {destination} is famous for. 
                Perfect souvenirs to take home!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentProducts.map((product, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex h-32">
                      <div className="w-32 h-32 flex-shrink-0">
                        <ImageWithFallback
                          src={
                            index === 0 ? "https://images.unsplash.com/photo-1723158694712-d528f378577a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBzcGljZXMlMjBtYXJrZXR8ZW58MXx8fHwxNzU3NjkwMTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" :
                            index === 1 ? "https://images.unsplash.com/photo-1644061922452-64d0f8673fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NvbnV0JTIwb2lsJTIwa2VyYWxhfGVufDF8fHx8MTc1Nzc1NTY1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" :
                            index === 2 ? "https://images.unsplash.com/photo-1666891717987-7509e81db05a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBwbGFudGF0aW9uJTIwbXVubmFyfGVufDF8fHx8MTc1Nzc1NTY1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" :
                            "https://images.unsplash.com/photo-1722431612514-bf0073625df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2lyJTIwcHJvZHVjdHMlMjBrZXJhbGF8ZW58MXx8fHwxNzU3NzU1NjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-muted-foreground">Local</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {product.price}
                          </Badge>
                          <span className="text-xs text-green-600 font-medium">
                            Must Buy
                          </span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <ShoppingBag className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-blue-900 dark:text-blue-100 mb-1">
                      Shopping Tips for {destination}
                    </h4>
                    <ul className="text-xs text-blue-700 dark:text-blue-200 space-y-1">
                      <li>• Visit local markets for authentic products at better prices</li>
                      <li>• Check for quality certifications, especially for spices and food items</li>
                      <li>• Negotiate prices politely at local shops and markets</li>
                      <li>• Ask for proper packaging if you're traveling long distances</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Calculate Budget
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}