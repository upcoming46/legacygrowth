import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Lock, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Download,
  Calendar,
  TrendingUp,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClientPortal() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo authentication - in production, use proper authentication
    if (email && password) {
      setIsAuthenticated(true);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged into your client portal.",
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter your email and password.",
        variant: "destructive",
      });
    }
  };

  // Demo project data
  const projectData = {
    name: "Sales Funnel Optimization Project",
    status: "In Progress",
    progress: 65,
    startDate: "Nov 1, 2025",
    expectedCompletion: "Dec 15, 2025",
    milestones: [
      { name: "Discovery & Strategy", status: "completed", date: "Nov 5" },
      { name: "Funnel Design", status: "completed", date: "Nov 12" },
      { name: "Copy & Content", status: "in-progress", date: "Nov 20" },
      { name: "Technical Setup", status: "pending", date: "Nov 27" },
      { name: "Testing & Launch", status: "pending", date: "Dec 10" }
    ],
    deliverables: [
      { name: "Funnel Strategy Document", status: "delivered", date: "Nov 6" },
      { name: "Wireframes & Mockups", status: "delivered", date: "Nov 13" },
      { name: "Sales Copy", status: "in-review", date: "Nov 20" },
      { name: "Email Sequences", status: "pending", date: "Nov 25" }
    ],
    metrics: [
      { label: "Current Conversion Rate", value: "2.3%", trend: "up" },
      { label: "Target Conversion Rate", value: "5.5%", trend: "neutral" },
      { label: "Projected Revenue Increase", value: "+$47K/mo", trend: "up" }
    ]
  };

  if (!isAuthenticated) {
    return (
      <>
        <SEOHead 
          title="Client Portal Login | Harper Harvey"
          description="Access your project dashboard, deliverables, and communicate with your dedicated funnel strategist."
        />
        
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4 py-20">
          <Card className="w-full max-w-md p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">Client Portal</h1>
              <p className="text-muted-foreground">
                Sign in to access your project dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need help accessing your account?{" "}
                <a href="mailto:harper@legacygrowth.site" className="text-primary hover:underline">
                  Contact Support
                </a>
              </p>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Project Dashboard | Client Portal"
        description="Track your project progress, access deliverables, and stay updated on your funnel optimization journey."
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="text-muted-foreground">Here's your project overview</p>
              </div>
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Project Overview */}
          <Card className="p-6 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{projectData.name}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Started {projectData.startDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    Due {projectData.expectedCompletion}
                  </span>
                </div>
              </div>
              <Badge className="text-base px-4 py-1">
                {projectData.status}
              </Badge>
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold text-primary">{projectData.progress}%</span>
              </div>
              <Progress value={projectData.progress} className="h-3" />
            </div>
          </Card>

          {/* Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {projectData.metrics.map((metric, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  {metric.trend === "up" && (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <p className="text-3xl font-bold text-primary">{metric.value}</p>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="milestones" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="milestones">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">Project Milestones</h3>
                <div className="space-y-4">
                  {projectData.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                      {milestone.status === "completed" ? (
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                      ) : milestone.status === "in-progress" ? (
                        <Clock className="h-6 w-6 text-primary flex-shrink-0" />
                      ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-muted-foreground flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold">{milestone.name}</h4>
                        <p className="text-sm text-muted-foreground">Target: {milestone.date}</p>
                      </div>
                      <Badge variant={
                        milestone.status === "completed" ? "default" : 
                        milestone.status === "in-progress" ? "secondary" : "outline"
                      }>
                        {milestone.status === "in-progress" ? "In Progress" : 
                         milestone.status === "completed" ? "Completed" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="deliverables">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6">Project Deliverables</h3>
                <div className="space-y-4">
                  {projectData.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <FileText className="h-6 w-6 text-primary" />
                        <div>
                          <h4 className="font-semibold">{deliverable.name}</h4>
                          <p className="text-sm text-muted-foreground">{deliverable.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={
                          deliverable.status === "delivered" ? "default" : 
                          deliverable.status === "in-review" ? "secondary" : "outline"
                        }>
                          {deliverable.status === "delivered" ? "Delivered" : 
                           deliverable.status === "in-review" ? "In Review" : "Pending"}
                        </Badge>
                        {deliverable.status === "delivered" && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="p-6">
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Direct Communication</h3>
                  <p className="text-muted-foreground mb-6">
                    Have questions or need updates? Reach out directly.
                  </p>
                  <Button>
                    Send Message
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
