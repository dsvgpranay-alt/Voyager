import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { MessageSquare, Send, Star, ThumbsUp, CheckCircle2 } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit?: (feedback: FeedbackData) => void;
}

interface FeedbackData {
  rating: number;
  experience: string;
  recommendation: string;
  improvements: string;
  wouldRecommend: boolean;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = React.useState<number>(0);
  const [experience, setExperience] = React.useState<string>('');
  const [recommendation, setRecommendation] = React.useState<string>('');
  const [improvements, setImprovements] = React.useState<string>('');
  const [wouldRecommend, setWouldRecommend] = React.useState<string>('');
  const [submitted, setSubmitted] = React.useState(false);
  const [hoveredStar, setHoveredStar] = React.useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const feedbackData: FeedbackData = {
      rating,
      experience,
      recommendation,
      improvements,
      wouldRecommend: wouldRecommend === 'yes'
    };

    // Save to localStorage (in a real app, this would go to a backend)
    const existingFeedback = JSON.parse(localStorage.getItem('voyager-feedback') || '[]');
    existingFeedback.push({
      ...feedbackData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('voyager-feedback', JSON.stringify(existingFeedback));

    onSubmit?.(feedbackData);
    setSubmitted(true);
  };

  const isValid = rating > 0 && experience.trim().length > 0 && wouldRecommend;

  if (submitted) {
    return (
      <Card className="border-green-500/20 bg-green-50 dark:bg-green-950/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
            <div>
              <h3 className="font-semibold text-green-700 dark:text-green-400">
                Thank You for Your Feedback!
              </h3>
              <p className="text-green-600 dark:text-green-300 text-sm mt-2">
                Your feedback helps us improve VOYAGER and provide better travel planning experiences.
              </p>
            </div>
            <div className="flex justify-center">
              <Badge variant="secondary" className="text-green-700 bg-green-100">
                Feedback Submitted Successfully
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Share Your Experience
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Help us improve VOYAGER by sharing your feedback about the travel planning experience
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-3">
            <Label>How would you rate your overall experience?</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="p-1 transition-colors"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredStar || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 && (
                  <>
                    {rating === 1 && 'Poor'}
                    {rating === 2 && 'Fair'}
                    {rating === 3 && 'Good'}
                    {rating === 4 && 'Very Good'}
                    {rating === 5 && 'Excellent'}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <Label htmlFor="experience">
              Tell us about your experience with VOYAGER *
            </Label>
            <Textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="What did you like about the travel planning process? Was it easy to use?"
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Recommendation */}
          <div className="space-y-3">
            <Label>Would you recommend VOYAGER to others?</Label>
            <RadioGroup value={wouldRecommend} onValueChange={setWouldRecommend}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-green-600" />
                  Yes, definitely!
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maybe" id="maybe" />
                <Label htmlFor="maybe">Maybe, with some improvements</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No, needs significant improvements</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Improvements */}
          <div className="space-y-3">
            <Label htmlFor="improvements">
              What improvements would you like to see?
            </Label>
            <Textarea
              id="improvements"
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              placeholder="Any features you'd like to add or improve? UI/UX suggestions?"
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Additional feedback */}
          <div className="space-y-3">
            <Label htmlFor="recommendation">
              Any other feedback or suggestions?
            </Label>
            <Textarea
              id="recommendation"
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              placeholder="Additional comments, suggestions, or specific features you'd like to see..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={!isValid}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Submit Feedback
            </Button>
          </div>

          {!isValid && (
            <p className="text-sm text-muted-foreground text-center">
              Please provide a rating and share your experience to submit feedback
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}