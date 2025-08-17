import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, Plane, Users, DollarSign, Clock } from "lucide-react";

interface TravelFormData {
  destination: string;
  currentCity: string;
  startDate: string;
  duration: string;
  budget: string;
  transport: string;
  travelers: string;
  interests: string[];
}

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  isLoading: boolean;
}

const interestOptions = [
  { id: "culture", label: "Culture & History" },
  { id: "food", label: "Food & Cuisine" },
  { id: "adventure", label: "Adventure & Sports" },
  { id: "relaxation", label: "Relaxation & Wellness" },
  { id: "nightlife", label: "Nightlife & Entertainment" },
  { id: "shopping", label: "Shopping & Markets" },
];

export function TravelForm({ onSubmit, isLoading }: TravelFormProps) {
  const [formData, setFormData] = useState<TravelFormData>({
    destination: "",
    currentCity: "",
    startDate: "",
    duration: "",
    budget: "",
    transport: "",
    travelers: "",
    interests: [],
  });

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interestId]
        : prev.interests.filter(id => id !== interestId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-card shadow-card">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-foreground">Plan Your Perfect Trip</CardTitle>
        <p className="text-muted-foreground">Tell us about your travel preferences and we'll create a personalized itinerary</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Destination
              </Label>
              <Input
                id="destination"
                placeholder="Where do you want to go?"
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                required
                className="bg-background border-border focus:ring-primary"
              />
            </div>

            {/* Current City */}
            <div className="space-y-2">
              <Label htmlFor="currentCity" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                Current City
              </Label>
              <Input
                id="currentCity"
                placeholder="Where are you traveling from?"
                value={formData.currentCity}
                onChange={(e) => setFormData(prev => ({ ...prev, currentCity: e.target.value }))}
                required
                className="bg-background border-border focus:ring-primary"
              />
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-accent" />
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
                className="bg-background border-border focus:ring-primary"
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Duration (days)
              </Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="30"
                placeholder="How many days?"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                required
                className="bg-background border-border focus:ring-primary"
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-accent" />
                Budget
              </Label>
              <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                <SelectTrigger className="bg-background border-border focus:ring-primary">
                  <SelectValue placeholder="Select your budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Budget (under $100/day)</SelectItem>
                  <SelectItem value="medium">Medium Budget ($100-300/day)</SelectItem>
                  <SelectItem value="luxury">Luxury ($300+/day)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transport */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-secondary" />
                Mode of Transport
              </Label>
              <Select value={formData.transport} onValueChange={(value) => setFormData(prev => ({ ...prev, transport: value }))}>
                <SelectTrigger className="bg-background border-border focus:ring-primary">
                  <SelectValue placeholder="How will you travel?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flight">Flight</SelectItem>
                  <SelectItem value="train">Train</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                  <SelectItem value="boat">Boat/Ferry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Travelers */}
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Number of Travelers
              </Label>
              <Select value={formData.travelers} onValueChange={(value) => setFormData(prev => ({ ...prev, travelers: value }))}>
                <SelectTrigger className="bg-background border-border focus:ring-primary">
                  <SelectValue placeholder="How many people are traveling?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Solo (1 person)</SelectItem>
                  <SelectItem value="2">Couple (2 people)</SelectItem>
                  <SelectItem value="3-4">Small Group (3-4 people)</SelectItem>
                  <SelectItem value="5+">Large Group (5+ people)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What are you interested in?</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <div key={interest.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest.id}
                    checked={formData.interests.includes(interest.id)}
                    onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor={interest.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {interest.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-ocean hover:bg-primary-hover text-primary-foreground shadow-soft transition-all duration-300 transform hover:scale-[1.02]"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? "Creating Your Itinerary..." : "Generate My Travel Plan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}