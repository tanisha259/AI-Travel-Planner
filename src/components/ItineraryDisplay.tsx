import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Utensils, Camera, Download, Share2, Bed } from "lucide-react";

interface Activity {
  time: string;
  title: string;
  description: string;
  type: "activity" | "dining" | "accommodation" | "transport";
  cost?: string;
  location?: string;
}

interface DayPlan {
  day: number;
  date: string;
  theme: string;
  activities: Activity[];
}

interface ItineraryData {
  destination: string;
  duration: number;
  budget: string;
  totalCost: string;
  days: DayPlan[];
  tips: string[];
}

interface ItineraryDisplayProps {
  itinerary: ItineraryData;
}

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "dining":
      return <Utensils className="w-4 h-4" />;
    case "accommodation":
      return <Bed className="w-4 h-4" />;
    case "transport":
      return <MapPin className="w-4 h-4" />;
    default:
      return <Camera className="w-4 h-4" />;
  }
};

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "dining":
      return "bg-accent/10 text-accent border-accent/20";
    case "accommodation":
      return "bg-secondary/10 text-secondary border-secondary/20";
    case "transport":
      return "bg-primary/10 text-primary border-primary/20";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  const handleDownload = () => {
    // Simulate PDF download
    alert("PDF download feature would be implemented here!");
  };

  const handleShare = () => {
    // Simulate sharing
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-hero shadow-elevated">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white mb-2">
            Your {itinerary.destination} Adventure
          </CardTitle>
          <p className="text-white/90 text-lg">
            {itinerary.duration} days of amazing experiences
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {itinerary.budget} Budget
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Est. Total: {itinerary.totalCost}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button 
          onClick={handleDownload}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button 
          onClick={handleShare}
          variant="outline"
          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Itinerary
        </Button>
      </div>

      {/* Daily Itinerary */}
      <div className="space-y-6">
        {itinerary.days.map((day) => (
          <Card key={day.day} className="bg-gradient-card shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-primary">
                    Day {day.day} - {day.theme}
                  </CardTitle>
                  <p className="text-muted-foreground">{day.date}</p>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary">
                  {day.activities.length} activities
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {day.activities.map((activity, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg border border-border bg-background/50">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">{activity.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {activity.time}
                            {activity.location && (
                              <>
                                <span>•</span>
                                <MapPin className="w-3 h-3" />
                                {activity.location}
                              </>
                            )}
                          </div>
                        </div>
                        {activity.cost && (
                          <Badge variant="outline" className="border-accent/30 text-accent">
                            {activity.cost}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Travel Tips */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Travel Tips & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {itinerary.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-muted-foreground leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}