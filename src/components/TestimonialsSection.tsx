import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import florenceTestimonial from "@/assets/testimonials/florence-testimonial.png";
import lyndseyTestimonial from "@/assets/testimonials/lyndsey-testimonial.png";
import anneTestimonial from "@/assets/testimonials/anne-testimonial.png";
import angelaTestimonial from "@/assets/testimonials/angela-testimonial.png";
import roseTestimonial from "@/assets/testimonials/rose-testimonial.png";

export function TestimonialsSection() {
  const testimonials = [
    {
      image: florenceTestimonial,
      name: "Florence Lillin",
      highlight: "Over $7,000 Every Week",
      preview: "When I joined Digital Wealthy Academy, I was full of excitement. I thought success would come quickly but it didn't. For months, I didn't make a single sale..."
    },
    {
      image: roseTestimonial,
      name: "Rose Mandesna",
      highlight: "$100,000 in Just 70 Days",
      preview: "I'm a young Haitian mom who was abandoned in the U.S. As a CNA making just $500 a week, I decided to use one check to pay the class..."
    },
    {
      image: angelaTestimonial,
      name: "Angela Maria",
      highlight: "23 Sales in 7 Days",
      preview: "A few weeks ago, I was ready to walk away. I had spent months showing up, posting, learning, doing 'everything right.' Still... nothing..."
    },
    {
      image: anneTestimonial,
      name: "Anne St",
      highlight: "$1,640 in 3.5 Weeks",
      preview: "$1640 in 3,5 weeks as a beginner on a new faceless account, starting with 0 followers. What is this life beyond grateful for this opportunity..."
    },
    {
      image: lyndseyTestimonial,
      name: "Lyndsey Hamer",
      highlight: "Goal Achieved This Month",
      preview: "After I was struggling to get sales later I archive my goal in this month with the amazing setup with harper built system..."
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Quote className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
            Real People, Real Results
          </h2>
          <p className="text-xl text-muted-foreground">
            Don't just take my word for it. Here's what real people are saying about their transformations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card border-2 hover:border-primary/50"
            >
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Text Preview */}
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-start space-x-2">
                    <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {testimonial.name}
                      </h3>
                      <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold text-lg mb-4">
                        {testimonial.highlight}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed italic">
                    "{testimonial.preview}"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Click image to read the full story →
                  </p>
                </div>

                {/* Full Screenshot - Clickable */}
                <div className="relative group cursor-pointer">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name} testimonial`}
                    className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 border border-border"
                    onClick={() => window.open(testimonial.image, '_blank')}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-lg flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-opacity duration-300">
                      View Full Size
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-8">
            <p className="text-2xl font-bold text-foreground mb-2">
              Join 1000+ Success Stories
            </p>
            <p className="text-muted-foreground text-lg">
              These are just a few of the many people who transformed their lives with our proven system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
