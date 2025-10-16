import { SEOHead } from "@/components/SEOHead";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Lock, Shield, CheckCircle2, ArrowRight, Upload, MessageCircle, CreditCard, DollarSign, Bitcoin, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

const paymentSchema = z.object({
  full_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  whatsapp: z.string().trim().max(20).optional(),
  amount: z.string().trim().min(1, "Amount is required").max(50),
  package_type: z.string().optional(),
});

export default function PaymentMethods() {
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("$20");
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    whatsapp: "",
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const uploadFormRef = useRef<HTMLDivElement>(null);

  const amounts = ["$20", "$50", "$100", "$250", "$500", "$1,000", "$2,000", "$5,000", "$10,000", "$20,000"];

  const scrollToUploadForm = () => {
    uploadFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi team Harper! I just paid via bank transfer. Here's my name + email + package: ${formData.full_name}, ${formData.email}, ${customAmount || selectedAmount}`
    );
    window.open(`https://wa.me/2348127297536?text=${message}`, "_blank");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        toast.error("Only PDF, JPG, and PNG files are allowed");
        return;
      }
      setReceiptFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const finalAmount = customAmount || selectedAmount;
      
      // Validate form data
      const validatedData = paymentSchema.parse({
        ...formData,
        amount: finalAmount,
        package_type: finalAmount,
      });

      let receiptUrl = null;

      // Upload receipt if provided
      if (receiptFile) {
        const fileName = `${Date.now()}_${receiptFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('receipts')
          .upload(fileName, receiptFile);

        if (uploadError) {
          throw new Error("Failed to upload receipt");
        }

        const { data: urlData } = supabase.storage
          .from('receipts')
          .getPublicUrl(fileName);
        
        receiptUrl = urlData.publicUrl;
      }

      // Insert submission
      const { data: submission, error: insertError } = await supabase
        .from('payment_submissions')
        .insert({
          full_name: validatedData.full_name,
          email: validatedData.email,
          whatsapp: validatedData.whatsapp,
          amount: validatedData.amount,
          package_type: validatedData.package_type,
          receipt_url: receiptUrl,
        })
        .select()
        .single();

      if (insertError) {
        throw new Error("Failed to submit payment");
      }

      // Trigger email sending
      const { error: emailError } = await supabase.functions.invoke('send-payment-email', {
        body: { submissionId: submission.id }
      });

      if (emailError) {
        console.error("Email error:", emailError);
      }

      toast.success("Receipt submitted successfully! Check your email for confirmation.");
      
      // Reset form
      setFormData({ full_name: "", email: "", whatsapp: "" });
      setReceiptFile(null);
      setCustomAmount("");
      
    } catch (error: any) {
      console.error("Submission error:", error);
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Failed to submit. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Secure Payment Methods | Choose Your Investment Package"
        description="Multiple secure payment options for your digital business setup. Bank transfer, card payments, PayPal, and crypto accepted. Fast processing with instant confirmation."
        keywords="secure payment, bank transfer, payment methods, business setup payment"
      />

      <div className="min-h-screen bg-gradient-to-br from-luxury-black via-luxury-purple to-luxury-black">
        {/* Trust Strip */}
        <div className="bg-luxury-gold/10 border-b border-luxury-gold/20 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-6 text-sm text-luxury-gold flex-wrap">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                SSL Secured
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Verified Business
              </span>
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Instant e-Receipt
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Secure Payment Gateway
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Choose Your Investment to Get Started
            </p>
            <p className="text-luxury-gold mt-4 text-lg">
              Once your payment is confirmed, we'll begin your setup immediately and keep you updated step-by-step.
            </p>
          </div>

          {/* Trust Note */}
          <Card className="bg-white/5 border-luxury-gold/20 mb-8 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-luxury-gold flex-shrink-0 mt-1" />
                <div className="text-white/90">
                  <p className="font-semibold mb-2">Secure Nigerian Business Account</p>
                  <p className="text-sm">
                    We process payments through our verified business account. This method is faster, 
                    fully traceable, and safer than PayPal for now. You'll receive a digital receipt 
                    and email confirmation immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount Selection */}
          <Card className="bg-white/5 border-luxury-gold/20 mb-8 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Select Your Amount (USD)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                {amounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={selectedAmount === amount ? "bg-luxury-gold text-luxury-black" : "border-luxury-gold/30 text-white hover:bg-luxury-gold/20"}
                  >
                    {amount}
                  </Button>
                ))}
              </div>
              <div>
                <Label htmlFor="custom-amount" className="text-white mb-2 block">
                  Or enter custom amount
                </Label>
                <Input
                  id="custom-amount"
                  placeholder="Enter amount (e.g., $150)"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount("");
                  }}
                  className="bg-white/10 border-luxury-gold/30 text-white placeholder:text-white/50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Bank Transfer - Recommended */}
            <Card className="bg-background border-luxury-gold shadow-luxury hover:shadow-luxury-glow transition-all">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🇳🇬</span>
                  <CardTitle className="text-foreground">Bank Transfer (Recommended)</CardTitle>
                </div>
                <CardDescription className="text-luxury-gold font-semibold">
                  Instant Start • Most Popular
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="text-foreground font-semibold">Bank Details:</p>
                  <p className="text-foreground text-sm">Account Name: <span className="font-semibold">Nosirudeen Adebayo</span></p>
                  <p className="text-foreground text-sm">Bank: <span className="font-semibold">Opay Bank</span></p>
                  <p className="text-foreground text-sm">Account Number: <span className="font-semibold">8027161624</span></p>
                </div>

                <div className="text-muted-foreground text-sm space-y-2">
                  <p className="font-semibold text-foreground">Why Bank Transfer?</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Instant verification</li>
                    <li>No international fees</li>
                    <li>Direct to business account</li>
                    <li>Full transaction history</li>
                  </ul>
                </div>

                <div className="text-muted-foreground text-sm space-y-2">
                  <p className="font-semibold text-foreground">How to Pay (4 Easy Steps):</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Open your banking app</li>
                    <li>Transfer to account above</li>
                    <li>Take screenshot of confirmation</li>
                    <li>Upload receipt below or send via WhatsApp</li>
                  </ol>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={scrollToUploadForm}
                    className="flex-1 bg-luxury-gold text-luxury-black hover:bg-luxury-gold/90"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Receipt
                  </Button>
                  <Button
                    onClick={handleWhatsAppClick}
                    variant="outline"
                    className="flex-1 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Other Payment Methods */}
            <div className="space-y-4">
              <Card className="bg-white/5 border-white/20 opacity-60">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-white/70" />
                    <CardTitle className="text-white/70">Card (Visa/MasterCard)</CardTitle>
                  </div>
                  <CardDescription className="text-white/50">Temporarily unavailable</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setShowUnavailableModal(true)}
                    disabled
                    className="w-full bg-white/10 text-white/50 cursor-not-allowed"
                  >
                    Pay by Card
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/20 opacity-60">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-white/70" />
                    <CardTitle className="text-white/70">PayPal</CardTitle>
                  </div>
                  <CardDescription className="text-white/50">Temporarily unavailable</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setShowUnavailableModal(true)}
                    disabled
                    className="w-full bg-white/10 text-white/50 cursor-not-allowed"
                  >
                    Pay with PayPal
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/20 opacity-60">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-5 h-5 text-white/70" />
                    <CardTitle className="text-white/70">Crypto</CardTitle>
                  </div>
                  <CardDescription className="text-white/50">Temporarily unavailable</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setShowUnavailableModal(true)}
                    disabled
                    className="w-full bg-white/10 text-white/50 cursor-not-allowed"
                  >
                    Pay with Crypto
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Remitly Section */}
          <Card className="bg-background border-blue-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-foreground">Prefer International Transfer?</CardTitle>
              <CardDescription className="text-muted-foreground">
                Use Remitly - Fast, Safe & Trusted by Our Global Clients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                You can send your payment safely using Remitly — it's the fastest and most reliable 
                global payment app for our clients.
              </p>
              
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-foreground font-semibold">How to Use Remitly:</p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm">
                  <li>If you have the app, open it and send to our account (shared on WhatsApp)</li>
                  <li>If you don't have it, download Remitly (takes 2 minutes)</li>
                  <li>Send your payment using the app</li>
                  <li>Screenshot the confirmation and send to WhatsApp: 0812 729 7536</li>
                </ol>
              </div>

              <Button
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.remitly', '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Download Remitly on Play Store
              </Button>

              {/* Testimonials */}
              <div className="space-y-3 mt-6">
                <p className="text-foreground font-semibold">What Our Clients Say:</p>
                {[
                  {
                    name: "Grace O.",
                    text: "I was honestly nervous at first because I had heard so many scam stories, especially in Nigeria. But when I used Remitly, everything went smooth. I got exactly what I paid for and the setup started immediately. Highly recommend it!"
                  },
                  {
                    name: "Michael A.",
                    text: "Remitly was super fast — sent my payment and got confirmation in less than 5 minutes. I now use this app for all my business transactions."
                  },
                  {
                    name: "Toyin B.",
                    text: "This is the best payment method I have used. I was scared at first, but I am glad I tried it. It is safe and simple!"
                  }
                ].map((testimonial, idx) => (
                  <div key={idx} className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm italic">"{testimonial.text}"</p>
                    <p className="text-luxury-gold text-xs mt-2">— {testimonial.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upload Receipt Form */}
          <div ref={uploadFormRef} className="scroll-mt-24">
            <Card className="bg-white/5 border-luxury-gold/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Upload Receipt</CardTitle>
                <CardDescription className="text-white/70">
                  Submit your payment receipt for verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-white">
                        Full Name <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="full_name"
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="bg-white/10 border-luxury-gold/30 text-white placeholder:text-white/50"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Best Email <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/10 border-luxury-gold/30 text-white placeholder:text-white/50"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="text-white">
                        WhatsApp Number
                      </Label>
                      <Input
                        id="whatsapp"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="bg-white/10 border-luxury-gold/30 text-white placeholder:text-white/50"
                        placeholder="+234 812 729 7536"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount_display" className="text-white">
                        Amount Paid
                      </Label>
                      <Input
                        id="amount_display"
                        disabled
                        value={customAmount || selectedAmount}
                        className="bg-white/10 border-luxury-gold/30 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="receipt" className="text-white">
                      Receipt Upload (PDF/JPG/PNG, max 10MB)
                    </Label>
                    <Input
                      id="receipt"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="bg-white/10 border-luxury-gold/30 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-luxury-gold file:text-luxury-black hover:file:bg-luxury-gold/90"
                    />
                    {receiptFile && (
                      <p className="text-luxury-gold text-sm">
                        Selected: {receiptFile.name}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-luxury-gold text-luxury-black hover:bg-luxury-gold/90 font-semibold text-lg py-6"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Send for Verification
                      </>
                    )}
                  </Button>

                  <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4 text-white/90 text-sm">
                    <p className="font-semibold mb-2">After Submission:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>You'll receive an email titled "Payment Received – Verifying"</li>
                      <li>Once verified, you'll get "Payment Confirmed"</li>
                      <li>Need a quick nudge? Chat on WhatsApp anytime</li>
                    </ul>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="bg-white/5 border-luxury-gold/20 backdrop-blur-sm mt-12">
            <CardHeader>
              <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Is my payment secure?</h3>
                <p className="text-white/80 text-sm">
                  Yes! We use verified business accounts and SSL encryption. Every transaction 
                  is traceable and you receive immediate confirmation.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">How long does verification take?</h3>
                <p className="text-white/80 text-sm">
                  Most payments are verified within 1-2 hours during business hours. You'll receive 
                  an email update immediately after confirmation.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">What if I don't get a confirmation email?</h3>
                <p className="text-white/80 text-sm">
                  Check your spam folder first. If still nothing, contact us via WhatsApp at 
                  0812 729 7536 with your payment details.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Can I get a refund?</h3>
                <p className="text-white/80 text-sm">
                  Refunds are handled case-by-case. Contact our support team to discuss your 
                  specific situation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Unavailable Modal */}
        <AlertDialog open={showUnavailableModal} onOpenChange={setShowUnavailableModal}>
          <AlertDialogContent className="bg-luxury-black border-luxury-gold/30">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Payment Method Unavailable</AlertDialogTitle>
              <AlertDialogDescription className="text-white/80">
                This payment method is temporarily unavailable. Please use Bank Transfer (recommended) 
                for the fastest and safest transaction.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Button
              onClick={() => setShowUnavailableModal(false)}
              className="bg-luxury-gold text-luxury-black hover:bg-luxury-gold/90"
            >
              Got it
            </Button>
          </AlertDialogContent>
        </AlertDialog>

        <StickyMobileCTA />
      </div>
    </>
  );
}
