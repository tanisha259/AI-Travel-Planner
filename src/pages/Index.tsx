import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { TravelForm } from "@/components/TravelForm";
import { ItineraryDisplay } from "@/components/ItineraryDisplay";
import { generateItinerary } from "@/utils/itineraryGenerator";
import { toast } from "sonner";

interface TravelFormData {
  name: string;
  email: string;
  destination: string;
  currentCity: string;
  startDate: string;
  duration: string;
  budget: string;
  transport: string;
  travelers: string;
  interests: string[];
}

interface ItineraryData {
  destination: string;
  duration: number;
  budget: string;
  totalCost: string;
  days: any[];
  tips: string[];
}

const Index = () => {
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (formData: TravelFormData) => {
    setIsLoading(true);
    try {
      toast.success("Generating your personalized itinerary...");
      
      // Send data to webhook
      try {
        await fetch('https://tanisha7890.app.n8n.cloud/webhook-test/dc9c24a8-a5a4-4a11-ad26-eb17c8b875bd', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } catch (webhookError) {
        console.error("Webhook error:", webhookError);
      }
      
      const generatedItinerary = await generateItinerary(formData);
      setItinerary(generatedItinerary);
      toast.success("Your travel plan is ready!");
      
      // Smooth scroll to itinerary
      setTimeout(() => {
        document.getElementById('itinerary')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (error) {
      toast.error("Failed to generate itinerary. Please try again.");
      console.error("Error generating itinerary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      <HeroSection />
      
      <main className="container mx-auto px-4 py-16 space-y-16">
        <TravelForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        
        {itinerary && (
          <div id="itinerary" className="scroll-mt-8">
            <ItineraryDisplay itinerary={itinerary} />
          </div>
        )}
      </main>
      
      <footer className="bg-foreground/5 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Made with ❤️ for travelers who dream big and explore the world
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
