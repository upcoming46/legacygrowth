import { Card } from "@/components/ui/card";
import { CheckCircle, Quote, PlayCircle } from "lucide-react";
import { YouTubeEmbed } from "./YouTubeEmbed";
import { useState, useEffect } from "react";

export function WhoIHelpSection() {
  const courses = [
    { name: "DWA", color: "text-blue-500" },
    { name: "UBC", color: "text-purple-500" },
    { name: "DBA", color: "text-pink-500" },
    { name: "SWC 2.0", color: "text-red-500" },
    { name: "LEGACY BUILDER PROGRAM", color: "text-orange-500" },
    { name: "DBC", color: "text-yellow-500" },
    { name: "PTP ELITE", color: "text-green-500" },
    { name: "ALIEN AI", color: "text-teal-500" },
    { name: "RBA", color: "text-cyan-500" },
    { name: "ROAD MAP", color: "text-indigo-500" },
    { name: "DIGITAL PRODUCT", color: "text-violet-500" },
    { name: "DIGITAL MARKETING", color: "text-fuchsia-500" },
    { name: "THREAD TO MILLIONS", color: "text-rose-500" }
  ];

  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCourseIndex((prevIndex) => (prevIndex + 1) % courses.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [courses.length]);
  const targetAudience = [
    "Side hustle moms ready to show their kids what freedom looks like",
    "9-5 workers tired of surviving paycheck to paycheck", 
    "Retirees looking to earn without tech stress",
    "New affiliates stuck at setup or with zero sales",
    "Digital course sellers who need systems that convert"
  ];

  const commonPhrases = [
    "I bought the course, but I'm stuck…",
    "I don't know how to build the store…",
    "I want this to work, but I've been burned before…"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Who Can I Help Get More Sales From Digital Products?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            If you have{" "}
            <span className={`${courses[currentCourseIndex].color} transition-all duration-500 font-extrabold`}>
              {courses[currentCourseIndex].name}
            </span>{" "}
            or any digital product but struggle with sales, here's how I help you get results in 72 hours
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Target Audience */}
          <div className="grid gap-6 mb-12">
            {targetAudience.map((audience, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-elegant transition-all duration-300 transform hover:scale-105 animate-fade-in flex items-start gap-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <p className="text-lg text-foreground font-medium">{audience}</p>
              </Card>
            ))}
          </div>

          {/* Common Phrases */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Are You Saying These Things About Your Digital Business?
            </h3>
          </div>

          <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto mb-12">
            {commonPhrases.map((phrase, index) => (
              <Card 
                key={index} 
                className="p-6 border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent hover:shadow-glow transition-all duration-300 flex items-start gap-4"
              >
                <Quote className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-lg text-foreground italic">"{phrase}"</p>
              </Card>
            ))}
          </div>

          <div className="text-center animate-fade-in">
            <Card className="p-8 bg-primary text-primary-foreground">
              <h3 className="text-2xl font-bold mb-4">
                You're exactly who I help.
              </h3>
              <p className="text-lg opacity-90">
                No more confusion. No more overwhelm. Just a clear path to digital success.
              </p>
            </Card>
          </div>

          {/* Video Section */}
          <div className="mt-12 animate-fade-in">
            <Card className="p-6 bg-muted/50">
              <div className="flex items-center justify-center gap-2 mb-6">
                <PlayCircle className="h-6 w-6 text-primary" />
                <p className="text-lg font-semibold text-foreground">
                  Watch These Videos First - See Real Results
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <YouTubeEmbed 
                    videoId="fRdLIwBhV9Q" 
                    title="Client Success Story 1"
                  />
                </div>
                <div>
                  <YouTubeEmbed 
                    videoId="MK_aw0MLazU" 
                    title="Client Success Story 2"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}