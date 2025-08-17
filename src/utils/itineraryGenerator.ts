// Simulated AI itinerary generation
// In a real app, this would call an AI service like OpenAI or Claude

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

const sampleActivities = {
  cultural: [
    {
      title: "Historic City Center Walking Tour",
      description: "Explore the rich history and architecture of the old town with a local guide. Discover hidden stories and cultural treasures.",
      type: "activity" as const,
      cost: "$25"
    },
    {
      title: "Local Museum Visit",
      description: "Immerse yourself in the local art and history at the city's premier cultural institution.",
      type: "activity" as const,
      cost: "$15"
    }
  ],
  food: [
    {
      title: "Traditional Cooking Class",
      description: "Learn to prepare authentic local dishes with a professional chef and enjoy the meal you create.",
      type: "activity" as const,
      cost: "$60"
    },
    {
      title: "Food Market Tour",
      description: "Sample local delicacies and fresh ingredients while learning about culinary traditions.",
      type: "activity" as const,
      cost: "$35"
    }
  ],
  adventure: [
    {
      title: "Hiking Adventure",
      description: "Challenge yourself with breathtaking trails and stunning panoramic views of the landscape.",
      type: "activity" as const,
      cost: "$40"
    },
    {
      title: "Water Sports Experience",
      description: "Try exciting water activities like kayaking, paddleboarding, or snorkeling in crystal-clear waters.",
      type: "activity" as const,
      cost: "$55"
    }
  ],
  relaxation: [
    {
      title: "Spa & Wellness Treatment",
      description: "Unwind with traditional massage and wellness treatments using local natural ingredients.",
      type: "activity" as const,
      cost: "$80"
    },
    {
      title: "Sunset Beach Relaxation",
      description: "Enjoy a peaceful evening watching the sunset with refreshing drinks and gentle ocean breezes.",
      type: "activity" as const,
      cost: "$20"
    }
  ]
};

const generateTimeSlots = (day: number): string[] => {
  const slots = ["9:00 AM", "11:30 AM", "2:00 PM", "5:00 PM", "7:30 PM"];
  return slots;
};

const generateDayThemes = (interests: string[], days: number): string[] => {
  const themes = [
    "Arrival & First Impressions",
    "Cultural Discovery",
    "Adventure & Exploration", 
    "Local Flavors & Cuisine",
    "Hidden Gems & Relaxation",
    "Nature & Outdoor Activities",
    "Shopping & Local Markets",
    "Final Adventures & Departure"
  ];
  
  return themes.slice(0, days);
};

const getBudgetMultiplier = (budget: string): number => {
  switch (budget) {
    case "low": return 0.7;
    case "luxury": return 1.8;
    default: return 1.0;
  }
};

export const generateItinerary = async (formData: TravelFormData): Promise<ItineraryData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const duration = parseInt(formData.duration);
  const startDate = new Date(formData.startDate);
  const budgetMultiplier = getBudgetMultiplier(formData.budget);
  
  const themes = generateDayThemes(formData.interests, duration);
  const days: DayPlan[] = [];
  
  for (let i = 0; i < duration; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const timeSlots = generateTimeSlots(i + 1);
    const activities: Activity[] = [];
    
    // Add accommodation for first day
    if (i === 0) {
      activities.push({
        time: timeSlots[0],
        title: "Check-in to Accommodation",
        description: `Settle into your ${formData.budget} budget accommodation with excellent reviews and perfect location.`,
        type: "accommodation",
        cost: `$${Math.round(120 * budgetMultiplier)}`,
        location: `${formData.destination} City Center`
      });
    }
    
    // Add activities based on interests
    formData.interests.forEach((interest, index) => {
      if (index < timeSlots.length - 1) {
        const activityPool = sampleActivities[interest as keyof typeof sampleActivities] || sampleActivities.cultural;
        const activity = activityPool[Math.floor(Math.random() * activityPool.length)];
        
        activities.push({
          ...activity,
          time: timeSlots[index + 1],
          cost: activity.cost ? `$${Math.round(parseInt(activity.cost.replace('$', '')) * budgetMultiplier)}` : undefined,
          location: `${formData.destination}`
        });
      }
    });
    
    // Add dining
    activities.push({
      time: timeSlots[timeSlots.length - 1],
      title: "Dinner at Local Restaurant",
      description: "Enjoy authentic local cuisine at a highly-rated restaurant recommended by locals.",
      type: "dining",
      cost: `$${Math.round(45 * budgetMultiplier)}`,
      location: `${formData.destination} Downtown`
    });
    
    days.push({
      day: i + 1,
      date: currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      theme: themes[i],
      activities
    });
  }
  
  const totalCost = `$${Math.round(duration * 200 * budgetMultiplier)}`;
  
  const tips = [
    `Best time to visit ${formData.destination} is during shoulder season for fewer crowds and better prices.`,
    `Download offline maps and translation apps before your trip for easier navigation.`,
    `Try to learn a few basic phrases in the local language - locals appreciate the effort!`,
    `Book popular attractions in advance to avoid disappointment and long queues.`,
    `Pack layers as weather can change quickly, especially in mountainous or coastal areas.`,
    `Keep copies of important documents in separate locations and consider digital backups.`,
    `Research local customs and etiquette to show respect for the culture you're visiting.`
  ];
  
  return {
    destination: formData.destination,
    duration,
    budget: formData.budget,
    totalCost,
    days,
    tips: tips.slice(0, 5)
  };
};