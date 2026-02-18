import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ImageWithSkeleton } from '@/components/ImageWithSkeleton';

import stellaTestimonial from '@/assets/testimonials/stella-testimonial.png';
import sodiTestimonial from '@/assets/testimonials/sodi-testimonial.png';
import florenceTestimonial from '@/assets/testimonials/florence-testimonial.png';
import roseTestimonial from '@/assets/testimonials/rose-testimonial.png';
import angelaTestimonial from '@/assets/testimonials/angela-testimonial.png';
import anneTestimonial from '@/assets/testimonials/anne-testimonial.png';
import lyndseyTestimonial from '@/assets/testimonials/lyndsey-testimonial.png';

const testimonials = [
  {
    name: "Stella Matins",
    highlight: "4 Sales in Two Weeks 💪",
    text: "When I joined Digital Wealth Academy, I made a decision to believe in myself and take action. What Harper built for me wasn't just a website it was a real business system. The funnel does the talking, and the marketing drives traffic daily. I've made sales even while sleeping...",
    image: stellaTestimonial,
    results: ["4 sales in 2 weeks", "Automated funnel", "Passive income"],
  },
  {
    name: "Sodi Gold",
    highlight: "Stay-At-Home Mom Turned Digital Earner",
    text: "I joined Harper's mentorship with no tech skills at all. Today, I'm running my own digital store, making weekly sales and even teaching others how to start. Harper made everything simple and gave me the confidence I never had before...",
    image: sodiTestimonial,
    results: ["Weekly sales", "No tech needed", "Now teaches others"],
  },
  {
    name: "Florence Lillin",
    highlight: "Over $7,000 Every Week",
    text: "When I joined Digital Wealthy Academy, I was full of excitement. I thought success would come quickly but it didn't. For months, I didn't make a single sale. But I kept going, and Harper's system finally clicked. Now I'm earning over $7,000 every week...",
    image: florenceTestimonial,
    results: ["$7,000+/week", "Persistence paid off", "Life-changing income"],
  },
  {
    name: "Rose Mandesna",
    highlight: "$100,000 in Just 70 Days",
    text: "I'm a young Haitian mom who was abandoned in the U.S. As a CNA making just $500 a week, I decided to use one check to pay the class. That decision changed my life forever. Harper's system works if you work it...",
    image: roseTestimonial,
    results: ["$100K in 70 days", "Life transformed", "Financial freedom"],
  },
  {
    name: "Angela Maria",
    highlight: "23 Sales in 7 Days",
    text: "A few weeks ago, I was ready to walk away. I had spent months showing up, posting, learning, doing 'everything right.' Still... nothing. Then Harper set everything up and the results were immediate. 23 sales in just one week...",
    image: angelaTestimonial,
    results: ["23 sales in 7 days", "Immediate results", "Complete turnaround"],
  },
  {
    name: "Anne St",
    highlight: "$1,640 in 3.5 Weeks",
    text: "$1640 in 3.5 weeks as a beginner on a new faceless account, starting with 0 followers. What is this life beyond grateful for this opportunity. Harper's system is the real deal...",
    image: anneTestimonial,
    results: ["$1,640 in 3.5 weeks", "Started from zero", "Faceless account"],
  },
  {
    name: "Lyndsey Hamer",
    highlight: "Goal Achieved This Month",
    text: "After I was struggling to get sales later I achieved my goal in this month with the amazing setup with Harper's built system. Everything just works when you have the right foundation...",
    image: lyndseyTestimonial,
    results: ["Monthly goal hit", "Proven system", "Sales on autopilot"],
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 600 : -600,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 600 : -600,
    opacity: 0,
    scale: 0.9,
  }),
};

export function PremiumTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Quote className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
            Real People, Real Results
          </h2>
          <p className="text-xl text-muted-foreground">
            Don't just take my word for it. Here's what real people are saying about their transformations.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative min-h-[480px] md:min-h-[420px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.23, 0.86, 0.39, 0.96] }}
              >
                <Card className="overflow-hidden border-2 hover:border-primary/50 bg-card shadow-xl">
                  <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
                    {/* Text Content */}
                    <div className="flex flex-col justify-center space-y-5">
                      <div className="flex items-start gap-3">
                        <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">
                            {current.name}
                          </h3>
                          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold text-base">
                            {current.highlight}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-lg leading-relaxed italic">
                        "{current.text}"
                      </p>

                      {/* Results Tags */}
                      <div className="flex flex-wrap gap-2">
                        {current.results.map((result, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="inline-flex items-center gap-1.5 bg-success/10 text-success px-3 py-1.5 rounded-full text-sm font-medium border border-success/20"
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {result}
                          </motion.span>
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Click image to read the full story →
                      </p>
                    </div>

                    {/* Image */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative group cursor-pointer touch-manipulation">
                          <ImageWithSkeleton
                            src={current.image}
                            alt={`${current.name} testimonial`}
                            className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.03] border border-border"
                            skeletonClassName="w-full aspect-[2/3] rounded-lg"
                            width={400}
                            height={600}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-opacity duration-300 flex items-center gap-2">
                              <Maximize2 className="w-4 h-4" />
                              View Full Size
                            </span>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] p-2">
                        <div className="overflow-auto max-h-[85vh]">
                          <img
                            src={current.image}
                            alt={`${current.name} full testimonial`}
                            className="w-full h-auto"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { number: "1000+", label: "Success Stories" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "$424+", label: "Avg. First Sale" },
            { number: "7-14", label: "Days to Results" },
          ].map((stat, index) => (
            <Card key={index} className="p-5 text-center bg-primary/5 border-primary/20">
              <p className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
