import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users,
  Lightbulb,
  Info,
  Star,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface TravelChatbotProps {
  currentStep: string;
  travelData?: any;
  travelerData?: any;
}

export function TravelChatbot({ currentStep, travelData, travelerData }: TravelChatbotProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(getWelcomeMessage());
    }
  }, [isOpen]);

  const getWelcomeMessage = () => {
    const stepMessages = {
      'travel': "Hi! I'm your Kerala travel assistant 🌴 I can help you plan your perfect Kerala adventure. What would you like to know about Kerala destinations?",
      'travelers': "Great choice of destination! I can help you with traveler details, accommodation options, or transport preferences. What questions do you have?",
      'budget': "Let me help you understand your budget breakdown or suggest ways to optimize your travel costs. What would you like to know?",
      'summary': "Your Kerala trip looks amazing! I can provide additional tips, local recommendations, or help you plan activities. How can I assist?"
    };
    
    return stepMessages[currentStep as keyof typeof stepMessages] || 
           "Welcome to Voyager! I'm here to help you plan your Kerala adventure. Ask me anything!";
  };

  const addBotMessage = (content: string, suggestions?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date(),
        suggestions
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getBotResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();
    
    // Kerala destinations
    if (input.includes('munnar') || input.includes('hill station')) {
      return {
        content: "Munnar is perfect for cool weather and tea plantations! 🍃 Best time: Oct-Mar. Pack warm clothes (15-25°C). Must-visit: Tea Museum, Eravikulam National Park, Mattupetty Dam. Average cost: ₹8,000-12,000 for 2 days.",
        suggestions: ["Weather in Munnar", "Things to do in Munnar", "Munnar budget planning"]
      };
    }
    
    if (input.includes('alleppey') || input.includes('alappuzha') || input.includes('backwater')) {
      return {
        content: "Alleppey backwaters are magical! 🛶 Famous for houseboat cruises. Best time: Nov-Feb. Temperature: 24-30°C. Houseboat costs: ₹5,000-12,000/night. Don't miss the sunset cruise!",
        suggestions: ["Houseboat options", "Backwater activities", "Alleppey weather"]
      };
    }
    
    if (input.includes('kochi') || input.includes('cochin')) {
      return {
        content: "Kochi is Kerala's cultural hub! 🏛️ See Chinese fishing nets, Fort Kochi, Mattancherry Palace. Great seafood and spice markets. Modern amenities with historical charm. Budget: ₹3,000-6,000/day.",
        suggestions: ["Kochi attractions", "Best restaurants", "Fort Kochi history"]
      };
    }
    
    if (input.includes('kovalam') || input.includes('beach')) {
      return {
        content: "Kovalam offers pristine beaches! 🏖️ Perfect for surfing and sunbathing. Lighthouse Beach is most famous. Temperature: 26-32°C. Great seafood and Ayurvedic treatments. Budget: ₹4,000-8,000/day.",
        suggestions: ["Beach activities", "Ayurvedic spas", "Water sports"]
      };
    }
    
    // Budget-related queries
    if (input.includes('budget') || input.includes('cost') || input.includes('price')) {
      return {
        content: "Kerala travel costs vary by season and preferences: Budget: ₹2,000-4,000/day, Mid-range: ₹4,000-8,000/day, Luxury: ₹8,000+/day per person. Off-season (Jun-Sep) is 30% cheaper!",
        suggestions: ["Money saving tips", "Best travel season", "Accommodation types"]
      };
    }
    
    // Weather queries
    if (input.includes('weather') || input.includes('climate') || input.includes('temperature')) {
      return {
        content: "Kerala has tropical climate year-round! 🌴 Best time: Oct-Mar (dry season). Monsoon: Jun-Sep (cheaper but rainy). Hill stations are cooler (15-25°C). Beaches are warm (26-32°C).",
        suggestions: ["Monsoon travel", "Packing list", "Best time to visit"]
      };
    }
    
    // Food queries
    if (input.includes('food') || input.includes('cuisine') || input.includes('restaurant')) {
      return {
        content: "Kerala cuisine is amazing! 🍛 Must-try: Kerala fish curry, appam, puttu, banana chips, coconut-based dishes. Vegetarian options abundant. Average meal cost: ₹150-500 per person.",
        suggestions: ["Famous Kerala dishes", "Vegetarian options", "Street food safety"]
      };
    }
    
    // Transport queries
    if (input.includes('transport') || input.includes('travel') || input.includes('bus') || input.includes('taxi')) {
      return {
        content: "Kerala transport options: 🚌 State buses (cheapest), Private taxis (convenient), Auto-rickshaws (short distances), Trains (long distances), Rental cars (freedom). Book trains in advance!",
        suggestions: ["Train booking", "Taxi rates", "Bus routes"]
      };
    }
    
    // Activities queries
    if (input.includes('activity') || input.includes('things to do') || input.includes('attractions')) {
      return {
        content: "Kerala offers diverse activities! 🎭 Backwater cruises, spice plantation tours, Kathakali performances, Ayurvedic treatments, wildlife safaris, beach activities, trekking. Something for everyone!",
        suggestions: ["Cultural shows", "Adventure activities", "Spa treatments"]
      };
    }
    
    // Packing queries
    if (input.includes('pack') || input.includes('clothes') || input.includes('what to bring')) {
      return {
        content: "Kerala packing essentials: 👕 Light cotton clothes, rain jacket, comfortable shoes, sunscreen, mosquito repellent, hat, swimwear. For hill stations: add warm clothes!",
        suggestions: ["Hill station packing", "Monsoon gear", "Beach essentials"]
      };
    }
    
    // General help
    if (input.includes('help') || input.includes('how') || input.includes('guide')) {
      const stepHelp = {
        'travel': "I can help you choose the perfect Kerala destination based on your interests! Are you looking for beaches, hills, backwaters, or culture?",
        'travelers': "Need help with traveler details? I can explain accommodation types, transport options, or suggest group-friendly destinations.",
        'budget': "Let me break down your costs or suggest money-saving tips! Kerala offers great value across all budgets.",
        'summary': "Your trip is planned! I can suggest local experiences, provide packing tips, or recommend hidden gems in your destination."
      };
      
      return {
        content: stepHelp[currentStep as keyof typeof stepHelp] || "I'm here to help with Kerala travel planning! Ask about destinations, budget, weather, or activities.",
        suggestions: ["Popular destinations", "Budget breakdown", "Weather info", "Local tips"]
      };
    }
    
    // Default responses
    const defaultResponses = [
      {
        content: "That's a great question! Kerala has so much to offer. Could you be more specific about what you'd like to know? I can help with destinations, budget, weather, activities, or travel tips.",
        suggestions: ["Tell me about Munnar", "Budget planning help", "Best time to visit", "Things to do"]
      },
      {
        content: "I'd love to help you with that! Kerala is known as 'God's Own Country' for good reason. What aspect of travel planning interests you most?",
        suggestions: ["Popular destinations", "Kerala weather", "Local cuisine", "Transport options"]
      }
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    const response = getBotResponse(inputValue);
    addBotMessage(response.content, response.suggestions);
    setInputValue('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    addUserMessage(suggestion);
    const response = getBotResponse(suggestion);
    addBotMessage(response.content, response.suggestions);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border-2">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Kerala Travel Assistant
                  <Badge variant="secondary" className="ml-auto">
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Messages Area */}
                <ScrollArea className="h-80 px-4">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg px-3 py-2 ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {message.type === 'bot' && (
                              <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            )}
                            {message.type === 'user' && (
                              <User className="h-4 w-4 mt-0.5 flex-shrink-0 order-2" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3 opacity-60" />
                                <span className="text-xs opacity-60">
                                  {formatTime(message.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Suggestions */}
                          {message.suggestions && (
                            <div className="mt-3 space-y-1">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="block w-full text-left text-xs px-2 py-1 rounded bg-background/20 hover:bg-background/30 transition-colors"
                                >
                                  💡 {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 max-w-[85%]">
                          <div className="flex items-center gap-2">
                            <Bot className="h-4 w-4" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about Kerala destinations, budget, weather..."
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      size="icon"
                      disabled={!inputValue.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    <button
                      onClick={() => handleSuggestionClick("Popular destinations")}
                      className="text-xs px-2 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <MapPin className="h-3 w-3 inline mr-1" />
                      Destinations
                    </button>
                    <button
                      onClick={() => handleSuggestionClick("Budget planning help")}
                      className="text-xs px-2 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <DollarSign className="h-3 w-3 inline mr-1" />
                      Budget
                    </button>
                    <button
                      onClick={() => handleSuggestionClick("Weather info")}
                      className="text-xs px-2 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Info className="h-3 w-3 inline mr-1" />
                      Weather
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}