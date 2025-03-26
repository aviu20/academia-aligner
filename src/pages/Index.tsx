
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProfileForm from '@/components/profile/ProfileForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui-custom/GlassCard';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 px-4">
        <section className="max-w-5xl mx-auto mb-24 animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-block mb-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Find Your Academic Match
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Match Your Profile with 
              <span className="text-primary"> Perfect Colleges</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our sophisticated algorithm analyzes your academic strengths, preferences, 
              and goals to find your ideal college matches.
            </p>
          </div>
          
          <ProfileForm />
        </section>
        
        <section className="max-w-5xl mx-auto py-12 mb-12" id="about">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard className="animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-muted-foreground">
                Our algorithm considers over 20 factors to find your best academic matches.
              </p>
            </GlassCard>
            
            <GlassCard className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">
                See how your chances change as you update your academic profile and preferences.
              </p>
            </GlassCard>
            
            <GlassCard className="animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Insights</h3>
              <p className="text-muted-foreground">
                Understand exactly why each college is a good match for your specific profile.
              </p>
            </GlassCard>
          </div>
        </section>
        
        <section className="bg-secondary/50 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect College?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Enter your academic profile and preferences to receive personalized college matches tailored to your unique profile.
            </p>
            <Link to="#top">
              <Button size="lg" className="transitions-all">
                Start Matching Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
