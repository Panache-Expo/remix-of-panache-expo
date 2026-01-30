import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const RegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [newsletterSubscription, setNewsletterSubscription] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedWorkshop) {
      toast({
        title: "Please select a workshop",
        variant: "destructive",
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        title: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      first_name: formData.get('firstName') as string,
      last_name: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      workshop: selectedWorkshop,
      experience_level: selectedExperience || null,
      agreed_to_terms: agreedToTerms,
      newsletter_subscription: newsletterSubscription,
    };

    try {
      const { data: result, error } = await supabase
        .from('workshop_registrations')
        .insert([data])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message || 'Failed to submit registration');
      }

      if (result && result.length > 0) {
        toast({
          title: "Registration successful!",
          description: "You're registered for the workshop. We'll send you details soon.",
        });

        if (e.currentTarget instanceof HTMLFormElement) {
          e.currentTarget.reset();
        }
        setSelectedWorkshop("");
        setSelectedExperience("");
        setAgreedToTerms(false);
        setNewsletterSubscription(false);
      } else {
        throw new Error('No confirmation received from database');
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      const errorMsg = error instanceof Error ? error.message : 'Please try again later';
      toast({
        title: "Registration failed",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-24 pb-16 px-6 bg-gradient-card">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              Register for <span className="text-rose-gold">Workshops</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join our exclusive beauty workshops and elevate your skills with industry experts.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 shadow-elegant">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" name="firstName" className="mt-2" placeholder="Your first name" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" name="lastName" className="mt-2" placeholder="Your last name" required />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" className="mt-2" placeholder="your.email@example.com" required />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" className="mt-2" placeholder="+1 (555) 123-4567" required />
              </div>
              
              <div>
                <Label htmlFor="workshop">Select Workshop *</Label>
                <Select value={selectedWorkshop} onValueChange={setSelectedWorkshop}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose your workshop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="barber">Professional Barber Techniques</SelectItem>
                    <SelectItem value="nails">Advanced Nail Technology</SelectItem>
                    <SelectItem value="wigs">Wig Installation & Styling</SelectItem>
                    <SelectItem value="lashes">Lash Extension Mastery</SelectItem>
                    <SelectItem value="makeup">Professional Makeup Artistry</SelectItem>
                    <SelectItem value="braiding">Creative Braiding Techniques</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms} 
                  onCheckedChange={(checked) => setAgreedToTerms(checked === true)} 
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions and privacy policy
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="newsletter" 
                  checked={newsletterSubscription} 
                  onCheckedChange={(checked) => setNewsletterSubscription(checked === true)} 
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Subscribe to our newsletter for updates and exclusive offers
                </Label>
              </div>
              
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register for Workshop"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};