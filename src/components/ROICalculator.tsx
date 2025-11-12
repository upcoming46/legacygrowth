import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Target } from "lucide-react";

export function ROICalculator() {
  const [adSpend, setAdSpend] = useState<number>(5000);
  const [conversionRate, setConversionRate] = useState<number>(2);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(100);

  // Calculate current revenue
  const currentVisitors = (adSpend / 2); // Assuming $2 cost per visitor
  const currentConversions = (currentVisitors * conversionRate) / 100;
  const currentRevenue = currentConversions * avgOrderValue;

  // Calculate improved metrics (conservative estimates)
  const improvedConversionRate = conversionRate * 2.5; // 150% improvement
  const improvedConversions = (currentVisitors * improvedConversionRate) / 100;
  const improvedRevenue = improvedConversions * avgOrderValue;

  const revenueIncrease = improvedRevenue - currentRevenue;
  const roiPercentage = ((revenueIncrease / adSpend) * 100).toFixed(0);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Calculate Your Potential <span className="text-primary">ROI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much revenue you could be generating with optimized funnels and conversion strategies
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="p-8 backdrop-blur-sm bg-card/50 border-2 hover:border-primary/50 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Your Current Metrics
              </h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="adSpend" className="text-base mb-2 block">
                    Monthly Ad Spend ($)
                  </Label>
                  <Input
                    id="adSpend"
                    type="number"
                    value={adSpend}
                    onChange={(e) => setAdSpend(Number(e.target.value))}
                    className="text-lg h-12"
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="conversionRate" className="text-base mb-2 block">
                    Conversion Rate (%)
                  </Label>
                  <Input
                    id="conversionRate"
                    type="number"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="text-lg h-12"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

                <div>
                  <Label htmlFor="avgOrderValue" className="text-base mb-2 block">
                    Average Order Value ($)
                  </Label>
                  <Input
                    id="avgOrderValue"
                    type="number"
                    value={avgOrderValue}
                    onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                    className="text-lg h-12"
                    min="0"
                  />
                </div>
              </div>
            </Card>

            {/* Results Section */}
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Your Potential Results
              </h3>

              <div className="space-y-6">
                <div className="p-4 bg-background/80 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Current Monthly Revenue</p>
                  <p className="text-3xl font-bold text-foreground">
                    ${currentRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary/30">
                  <p className="text-sm text-muted-foreground mb-1">Projected Monthly Revenue</p>
                  <p className="text-3xl font-bold text-primary">
                    ${improvedRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="p-4 bg-background/80 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Additional Monthly Revenue</p>
                  <p className="text-3xl font-bold text-green-600">
                    +${revenueIncrease.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg border border-primary/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Potential ROI</p>
                      <p className="text-4xl font-bold text-primary">{roiPercentage}%</p>
                    </div>
                    <DollarSign className="h-12 w-12 text-primary opacity-50" />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  *Projections based on average 150% conversion rate improvement from optimized funnels and sales processes. 
                  Individual results may vary based on industry, offer, and implementation.
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Get Started - Turn This Into Reality
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
