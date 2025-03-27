
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProfileForm from '@/components/profile/ProfileForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui-custom/GlassCard';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
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
              <span className="text-accent"> Perfect Colleges</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our sophisticated algorithm analyzes your academic strengths, preferences, 
              and goals to find your ideal college matches.
            </p>
          </div>
          
          <ProfileForm 
            onAuthRequired={() => setAuthModalOpen(true)}
          />
        </section>
        
        <section className="bg-secondary/50 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect College?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Enter your academic profile and preferences to receive personalized college matches tailored to your unique profile.
            </p>
            {isAuthenticated ? (
              <Link to="#top">
                <Button size="lg" className="transitions-all button-gold-shadow">
                  Start Matching Now
                </Button>
              </Link>
            ) : (
              <Button 
                size="lg" 
                className="transitions-all button-gold-shadow"
                onClick={() => setAuthModalOpen(true)}
              >
                Sign Up to Get Started
              </Button>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default Index;
