import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      question: "What if I'm not tech-savvy?",
      answer: "That's exactly why I created this service! I handle all the technical setup for you. You don't need to know coding, design, or any complex tech stuff. I'll build everything and show you exactly how to use it in simple terms."
    },
    {
      question: "How long until I see results?",
      answer: "Most clients start seeing their first sales within 7-14 days after setup. However, this depends on factors like your chosen niche, traffic sources, and how actively you promote. I'll give you realistic timelines based on your specific situation."
    },
    {
      question: "Is this legitimate? I've been scammed before.",
      answer: "I completely understand your concern. That's why I provide: verified client testimonials with real results, transparent pricing with no hidden fees, and ongoing support after your setup. You can also check out my previous work and speak to current clients before committing."
    },
    {
      question: "Do you offer refunds or guarantees?",
      answer: "I stand behind my work 100%. If I set up your store and you're not satisfied with the quality of the setup itself, I'll make it right or provide a full refund within 7 days. However, I cannot guarantee specific sales results as that depends on multiple factors including your effort in promoting the store."
    },
    {
      question: "What if I already have a store that's not working?",
      answer: "Perfect! I specialize in fixing and optimizing existing stores. I'll audit your current setup, identify what's not working, and implement proven strategies to get you sales. Many of my best success stories are from rescuing 'dead' stores."
    },
    {
      question: "How much does it cost?",
      answer: "My services range from $97 for basic setups to $497 for complete done-for-you systems with automation. The exact investment depends on what you need. Message me on WhatsApp for a personalized quote based on your situation."
    },
    {
      question: "What support do I get after setup?",
      answer: "You get 30 days of direct WhatsApp support after your setup is complete. I'll help you troubleshoot issues, optimize your store, and answer any questions. After that, ongoing support packages are available if you want continued guidance."
    },
    {
      question: "Can you guarantee I'll make money?",
      answer: "I can guarantee I'll build you a professional, conversion-optimized setup using proven strategies. However, your actual earnings depend on factors outside my control like your niche choice, traffic quality, and promotional efforts. What I can promise is that you'll have a setup that's been proven to work for hundreds of others."
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Common Questions Answered
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know before taking the next step
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Guarantee Section */}
        <Card className="max-w-2xl mx-auto p-8 bg-primary text-primary-foreground">
          <div className="flex items-start gap-4">
            <Shield className="h-12 w-12 flex-shrink-0 text-accent" />
            <div>
              <h3 className="text-2xl font-bold mb-3">100% Satisfaction Guarantee</h3>
              <p className="text-lg opacity-90 mb-4">
                I'm committed to your success. If you're not satisfied with the quality of your setup, I'll make it right or provide a full refund within 7 days of delivery.
              </p>
              <p className="text-sm opacity-80">
                No questions asked. No hidden terms. Just straightforward service you can trust.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}