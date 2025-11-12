import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "10 Proven Strategies to Double Your Funnel Conversion Rate",
      excerpt: "Learn the exact tactics that helped our clients achieve 150%+ conversion rate improvements in just 30 days.",
      category: "Conversion Optimization",
      readTime: "8 min read",
      date: "Nov 10, 2025",
      featured: true
    },
    {
      id: 2,
      title: "The Psychology Behind High-Converting Sales Pages",
      excerpt: "Discover the cognitive triggers and design principles that make visitors take action and become customers.",
      category: "Sales Psychology",
      readTime: "6 min read",
      date: "Nov 8, 2025",
      featured: true
    },
    {
      id: 3,
      title: "Email Sequences That Generated $2M+ in Revenue",
      excerpt: "A complete breakdown of the email automation strategies that drive consistent revenue for online businesses.",
      category: "Email Marketing",
      readTime: "10 min read",
      date: "Nov 5, 2025",
      featured: false
    },
    {
      id: 4,
      title: "How to Build a Sales Funnel That Runs on Autopilot",
      excerpt: "Step-by-step guide to creating automated sales systems that work 24/7 without constant oversight.",
      category: "Funnel Strategy",
      readTime: "12 min read",
      date: "Nov 1, 2025",
      featured: false
    },
    {
      id: 5,
      title: "Landing Page Optimization: Before & After Case Study",
      excerpt: "Real examples of landing page transformations that increased conversions by 300%+.",
      category: "Case Studies",
      readTime: "7 min read",
      date: "Oct 28, 2025",
      featured: false
    },
    {
      id: 6,
      title: "The Ultimate Guide to A/B Testing Your Sales Funnel",
      excerpt: "Learn how to run profitable split tests and make data-driven decisions that boost revenue.",
      category: "Testing & Analytics",
      readTime: "9 min read",
      date: "Oct 25, 2025",
      featured: false
    }
  ];

  const categories = ["All", "Conversion Optimization", "Sales Psychology", "Email Marketing", "Funnel Strategy", "Case Studies", "Testing & Analytics"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead 
        title="Free Digital Marketing Resources & Funnel Optimization Blog | Harper Harvey"
        description="Expert insights on sales funnels, conversion optimization, email marketing, and digital strategy. Learn proven tactics to grow your online business."
      />

      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Free Resources & <span className="text-primary">Insights</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Proven strategies, case studies, and actionable tips to help you build profitable sales funnels
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-12 h-14 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Featured Articles</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {filteredPosts.filter(post => post.featured).map((post) => (
              <Card 
                key={post.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary/50"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <TrendingUp className="h-16 w-16 text-primary opacity-50" />
                </div>
                <div className="p-6">
                  <Badge className="mb-3">{post.category}</Badge>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">All Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.filter(post => !post.featured).map((post) => (
              <Card 
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-primary/50"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <TrendingUp className="h-12 w-12 text-primary opacity-30" />
                </div>
                <div className="p-6">
                  <Badge variant="outline" className="mb-3">{post.category}</Badge>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No articles found. Try adjusting your search or category filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stop reading about success and start creating it. Let's build your high-converting funnel together.
          </p>
          <Button size="lg" onClick={() => navigate("/")}>
            Get Started Today
          </Button>
        </div>
      </section>
    </>
  );
}
