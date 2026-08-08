import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { 
  Plane, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  MapPin, 
  Compass,
  Mountain,
  Waves,
  TreePine,
  Sun,
  AlertCircle,
  CheckCircle,
  Mail,
  Phone,
  UserPlus,
  LogIn
} from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AuthData {
  username: string;
  password: string;
  name?: string;
}

interface SignInProps {
  onSignIn: (authData: AuthData) => void;
  error?: string;
}

export function SignIn({ onSignIn, error }: SignInProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Remove all spaces, dashes, and parentheses
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    // Allow optional + at start, then exactly 10 digits (for Indian phone numbers)
    const phoneRegex = /^[\+]?[1-9][\d]{9}$/;
    return phoneRegex.test(cleanPhone) && cleanPhone.length <= 11; // +91xxxxxxxxxx = 11 chars max
  };

  const isValidUsername = (username: string) => {
    return validateEmail(username) || validatePhone(username);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    
    if (isSignUp && !name.trim()) return;
    
    if (!isValidUsername(username)) {
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      return;
    }
    
    setIsLoading(true);
    // Add a small delay to show loading state
    setTimeout(() => {
      onSignIn({ 
        username: username.trim(), 
        password,
        name: isSignUp ? name.trim() : undefined
      });
      setIsLoading(false);
    }, 800);
  };



  // Floating icons animation
  const floatingIcons = [
    { icon: Mountain, delay: 0, position: { top: '20%', left: '10%' } },
    { icon: Waves, delay: 0.5, position: { top: '30%', right: '15%' } },
    { icon: TreePine, delay: 1, position: { bottom: '25%', left: '8%' } },
    { icon: Sun, delay: 1.5, position: { bottom: '40%', right: '12%' } },
    { icon: Compass, delay: 2, position: { top: '50%', left: '5%' } },
    { icon: MapPin, delay: 2.5, position: { top: '70%', right: '8%' } }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZXJhbGElMjBiYWNrd2F0ZXJzJTIwbW9ybmluZ3xlbnwxfHx8fDE3NTczMjU0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Kerala Morning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-blue-900/60 to-emerald-900/70" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Floating Background Icons */}
      {floatingIcons.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={index}
            className="absolute opacity-10 text-white"
            style={item.position}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: 0.1, 
              scale: 1, 
              rotate: 0,
              y: [0, -20, 0]
            }}
            transition={{ 
              delay: item.delay,
              duration: 1.5,
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <IconComponent className="h-16 w-16" />
          </motion.div>
        );
      })}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <Plane className="h-16 w-16 text-white" />
                </motion.div>
                <div className="h-16 w-16 flex items-center justify-center">
                  <div className="absolute h-4 w-4 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
            <motion.h1 
              className="text-4xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              VOYAGER
            </motion.h1>
            <motion.p 
              className="text-green-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Kerala Travel Planner
            </motion.p>
            
            {/* Feature Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-2 mt-4"
            >
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                🌴 Backwater Cruises
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                🏔️ Hill Stations
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                🎭 Cultural Heritage
              </Badge>
            </motion.div>
          </motion.div>

          {/* Sign In Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isSignUp ? (
                    <UserPlus className="h-5 w-5 text-green-400" />
                  ) : (
                    <Shield className="h-5 w-5 text-green-400" />
                  )}
                  <CardTitle className="text-white">
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                  </CardTitle>
                </div>
                <CardDescription className="text-green-100">
                  {isSignUp 
                    ? 'Create your account to start planning amazing Kerala adventures'
                    : 'Sign in to access your Kerala travel planning dashboard'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field - Only for Sign Up */}
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        What can we call you?
                      </Label>
                      <div className="relative">
                        <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name or nickname"
                          className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-green-200 focus:border-green-400 focus:ring-green-400"
                          disabled={isLoading}
                          autoFocus={isSignUp}
                        />
                      </div>
                      {isSignUp && !name.trim() && (
                        <p className="text-yellow-300 text-sm">
                          Please enter what we can call you
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* Username Field */}
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">
                      Email or Phone Number
                    </Label>
                    <div className="relative">
                      {validateEmail(username) || !username ? (
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                      ) : (
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                      )}
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="your.email@example.com or +91 98765 43210"
                        className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-green-200 focus:border-green-400 focus:ring-green-400"
                        disabled={isLoading}
                        autoFocus={!isSignUp}
                      />
                    </div>
                    {username && !isValidUsername(username) && (
                      <p className="text-red-300 text-sm">
                        Please enter a valid email address or phone number
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      {isSignUp ? 'Create Password' : 'Password'}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={isSignUp ? "Create a secure password" : "Enter your password"}
                        className="pl-10 pr-12 bg-white/10 border-white/30 text-white placeholder:text-green-200 focus:border-green-400 focus:ring-green-400"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300 transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {isSignUp && password && password.length < 6 && (
                      <p className="text-yellow-300 text-sm">
                        Password should be at least 6 characters long
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Field - Only for Sign Up */}
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm your password"
                          className="pl-10 pr-12 bg-white/10 border-white/30 text-white placeholder:text-green-200 focus:border-green-400 focus:ring-green-400"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300 transition-colors"
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {confirmPassword && password !== confirmPassword && (
                        <p className="text-red-300 text-sm">
                          Passwords do not match
                        </p>
                      )}
                    </div>
                  )}

                  {error && (
                    <Alert className="bg-red-500/20 border-red-400/50 text-white">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-100">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg"
                    disabled={
                      !username.trim() || 
                      !password.trim() || 
                      !isValidUsername(username) ||
                      (isSignUp && (!name.trim() || password.length < 6 || password !== confirmPassword)) ||
                      isLoading
                    }
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {isSignUp ? 'Creating Account...' : 'Signing In...'}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {isSignUp ? (
                          <UserPlus className="h-4 w-4" />
                        ) : (
                          <LogIn className="h-4 w-4" />
                        )}
                        {isSignUp ? 'Create Account' : 'Sign In'}
                      </div>
                    )}
                  </Button>

                  {/* Toggle between Sign In and Sign Up */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setName('');
                        setPassword('');
                        setConfirmPassword('');
                        setShowPassword(false);
                        setShowConfirmPassword(false);
                      }}
                      className="text-green-300 hover:text-green-200 text-sm underline transition-colors"
                      disabled={isLoading}
                    >
                      {isSignUp 
                        ? 'Already have an account? Sign In' 
                        : 'New to Voyager? Create Account'
                      }
                    </button>
                  </div>
                </form>

                {/* Info Section */}
                <div className="text-center space-y-3 pt-4 border-t border-white/20">
                  <div className="text-green-200 text-sm">
                    🔒 Your credentials are secure and private
                  </div>
                  <div className="text-green-200 text-xs">
                    {isSignUp 
                      ? 'Join thousands of travelers exploring Kerala with personalized planning tools'
                      : 'Welcome back! Continue planning your Kerala adventure with AI-powered insights'
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bottom Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center mt-8 space-y-4"
          >
            <div className="text-white/80 text-sm">
              ✨ What's waiting for you inside
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <MapPin className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-white text-sm">Smart Planning</div>
                <div className="text-green-200 text-xs">AI-powered itineraries</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <Compass className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-white text-sm">Local Insights</div>
                <div className="text-green-200 text-xs">Insider recommendations</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}