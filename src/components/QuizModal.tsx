import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, Star, Zap, Target, TrendingUp } from "lucide-react";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizAnswer {
  question: string;
  answer: string;
  score: number;
}

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", whatsapp: "" });
  const { toast } = useToast();

  const questions = [
    {
      question: "How much experience do you have with online business?",
      options: [
        { text: "Complete beginner", score: 1 },
        { text: "Some experience, no consistent income", score: 2 },
        { text: "Making some money, want to scale", score: 3 },
        { text: "Established business, looking to optimize", score: 4 }
      ]
    },
    {
      question: "What's your current monthly online income goal?",
      options: [
        { text: "$0 - $1,000", score: 1 },
        { text: "$1,000 - $5,000", score: 2 },
        { text: "$5,000 - $10,000", score: 3 },
        { text: "$10,000+", score: 4 }
      ]
    },
    {
      question: "How much time can you dedicate to building your business?",
      options: [
        { text: "Less than 5 hours/week", score: 1 },
        { text: "5-15 hours/week", score: 2 },
        { text: "15-30 hours/week", score: 3 },
        { text: "30+ hours/week (full-time)", score: 4 }
      ]
    },
    {
      question: "What's your biggest obstacle to making money online?",
      options: [
        { text: "Don't know what to sell", score: 1 },
        { text: "No technical skills", score: 2 },
        { text: "Getting traffic/customers", score: 3 },
        { text: "Scaling and systems", score: 4 }
      ]
    }
  ];

  const handleAnswerSelect = (answer: string, score: number) => {
    const newAnswer: QuizAnswer = {
      question: questions[currentQuestion].question,
      answer,
      score
    };
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = newAnswer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowLeadCapture(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleLeadSubmit = () => {
    setShowResults(true);
    toast({
      title: "Quiz Complete! 🎉",
      description: "Your personalized results are ready!",
    });
  };

  const getTotalScore = () => {
    return answers.reduce((total, answer) => total + answer.score, 0);
  };

  const getPersonalizedResult = () => {
    const score = getTotalScore();
    
    if (score <= 6) {
      return {
        level: "Foundation Builder",
        icon: Star,
        color: "text-blue-400",
        title: "You're at the perfect starting point!",
        description: "You have huge potential but need the right foundation. I'll show you exactly how to turn your ideas into income with my proven 3-stage system.",
        recommendation: "Start with my Beginner's Blueprint - a step-by-step system that takes you from zero to your first $1,000 online.",
        cta: "Get Your Beginner's Blueprint",
        urgency: "Perfect timing to start!"
      };
    } else if (score <= 12) {
      return {
        level: "Growth Accelerator",
        icon: Zap,
        color: "text-yellow-400",
        title: "You're ready to scale up fast!",
        description: "You have the basics but need optimization. I'll help you multiply your current income and create predictable revenue streams.",
        recommendation: "Focus on my Scaling System - advanced strategies to take you from inconsistent income to $5K+ monthly.",
        cta: "Unlock Scaling Strategies",
        urgency: "Don't leave money on the table!"
      };
    } else if (score <= 18) {
      return {
        level: "Profit Maximizer",
        icon: Target,
        color: "text-green-400",
        title: "You're positioned for big results!",
        description: "You understand the game but need advanced tactics. I'll show you how to optimize for maximum profitability and passive income.",
        recommendation: "You need my Advanced Profit System - sophisticated strategies for 6-figure businesses.",
        cta: "Access Premium Strategies",
        urgency: "Ready for the next level!"
      };
    } else {
      return {
        level: "Empire Builder",
        icon: TrendingUp,
        color: "text-purple-400",
        title: "You're ready to dominate!",
        description: "You're thinking big and have the dedication. I'll help you build systems that generate massive, scalable income.",
        recommendation: "You need my Empire Building Masterclass - exclusive strategies for creating multiple income streams and building lasting wealth.",
        cta: "Build Your Empire",
        urgency: "Time to maximize your potential!"
      };
    }
  };

  const currentAnswer = answers[currentQuestion]?.answer || "";
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const result = getPersonalizedResult();

  if (showResults) {
    const IconComponent = result.icon;
    
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl bg-gradient-luxury text-white border-luxury-gold max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-serif text-luxury-gold">
              Your Personalized Business Blueprint
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Result Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <IconComponent className={`w-16 h-16 ${result.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-luxury-gold">{result.level}</h3>
                <p className="text-lg font-semibold">{result.title}</p>
              </div>
            </div>

            {/* Score Summary */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-luxury-gold">{getTotalScore()}/16</div>
                <div className="text-sm text-white/80">Business Readiness Score</div>
              </div>
              <Progress value={(getTotalScore() / 16) * 100} className="h-2" />
            </div>

            {/* Personalized Analysis */}
            <div className="space-y-4">
              <h4 className="font-semibold text-luxury-gold">Your Analysis:</h4>
              <p className="text-white/90">{result.description}</p>
              <div className="bg-luxury-gold/10 border border-luxury-gold/20 rounded-lg p-4">
                <h5 className="font-semibold text-luxury-gold mb-2">Recommended Next Step:</h5>
                <p className="text-white/90 text-sm">{result.recommendation}</p>
              </div>
            </div>

            {/* Quiz Answers Summary */}
            <div className="space-y-3">
              <h4 className="font-semibold text-luxury-gold">Your Responses:</h4>
              {answers.map((answer, index) => (
                <div key={index} className="text-sm bg-white/5 rounded p-3 border border-white/10">
                  <div className="font-medium text-white/90 mb-1">{answer.question}</div>
                  <div className="text-luxury-gold">{answer.answer}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="text-center text-sm text-luxury-gold font-medium">
                ⚡ {result.urgency}
              </div>
              <Button
                onClick={() => {
                  const message = encodeURIComponent(
                    `Hi Harper! I just completed your quiz and got: ${result.level}

My responses:
${answers.map(a => `• ${a.question}: ${a.answer}`).join('\n')}

I'm ready for: ${result.recommendation}

Let's discuss how you can help me achieve my goals!

Contact: ${leadData.email} | ${leadData.whatsapp}`
                  );
                  window.open(`https://wa.me/2348127297536?text=${message}`, "_blank");
                }}
                className="w-full bg-luxury-gold text-luxury-black hover:bg-luxury-gold/90 font-semibold py-3"
              >
                {result.cta} - WhatsApp Harper Now →
              </Button>
              <p className="text-xs text-white/70 text-center">
                Get your personalized strategy session and start implementing immediately
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (showLeadCapture) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg bg-gradient-luxury text-white border-luxury-gold">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-serif text-luxury-gold">
              Get Your Personalized Results
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-white/90">
                You're one step away from your personalized business blueprint! 
                Enter your details to unlock your results.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name *</Label>
                <Input
                  id="name"
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                  placeholder="Your first name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-white">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={leadData.whatsapp}
                  onChange={(e) => setLeadData({ ...leadData, whatsapp: e.target.value })}
                  placeholder="+1234567890"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            </div>

            <Button
              onClick={handleLeadSubmit}
              disabled={!leadData.name || !leadData.email}
              className="w-full bg-luxury-gold text-luxury-black hover:bg-luxury-gold/90 font-semibold"
            >
              Unlock My Results →
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-luxury text-white border-luxury-gold">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-serif text-luxury-gold">
            Business Readiness Quiz
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/80">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">
              {questions[currentQuestion].question}
            </h3>

            <RadioGroup value={currentAnswer} onValueChange={(value) => {
              const option = questions[currentQuestion].options.find(opt => opt.text === value);
              if (option) {
                handleAnswerSelect(option.text, option.score);
              }
            }}>
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option.text} 
                    id={`option-${index}`}
                    className="border-white/20 text-luxury-gold"
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="text-white cursor-pointer flex-1"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div className="flex justify-between space-x-3">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="bg-luxury-gold text-luxury-black hover:bg-luxury-gold/90 font-semibold"
            >
              {currentQuestion === questions.length - 1 ? "Get Results" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}