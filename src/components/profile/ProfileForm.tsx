
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../ui-custom/GlassCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserProfile, UserProfile } from '@/data/userData';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

// Import tab components
import AcademicsTab from './AcademicsTab';
import PreferencesTab from './PreferencesTab';
import InternationalTab from './InternationalTab';

interface ProfileFormProps {
  onAuthRequired: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onAuthRequired }) => {
  const { profile, updateProfile } = useUserProfile();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState<UserProfile>(profile);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("academics");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormState({
        ...formState,
        [name]: parseFloat(value)
      });
    } else {
      setFormState({
        ...formState,
        [name]: value
      });
    }
  };
  
  const handleNestedChange = (parent: keyof UserProfile, field: string, value: any) => {
    if (parent === 'englishProficiency') {
      setFormState({
        ...formState,
        englishProficiency: {
          ...formState.englishProficiency,
          [field]: value
        }
      });
    }
  };
  
  const handleSliderChange = (name: string, value: number[]) => {
    setFormState({
      ...formState,
      [name]: value[0]
    });
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormState({
      ...formState,
      [name]: checked
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormState({
      ...formState,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please login or signup to find your college matches.",
      });
      onAuthRequired();
      return;
    }
    
    setSubmitting(true);
    
    // Update the global state
    updateProfile(formState);
    
    // Simulate loading
    setTimeout(() => {
      setSubmitting(false);
      navigate('/results');
    }, 1000);
  };
  
  return (
    <GlassCard className="w-full max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Your Academic Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs 
          defaultValue="academics" 
          className="w-full tabs-highlighted"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger 
              value="academics" 
              className={activeTab === "academics" ? "active-tab" : ""}
            >
              Academics
            </TabsTrigger>
            <TabsTrigger 
              value="preferences" 
              className={activeTab === "preferences" ? "active-tab" : ""}
            >
              Preferences
            </TabsTrigger>
            <TabsTrigger 
              value="international" 
              className={activeTab === "international" ? "active-tab" : ""}
            >
              International
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="academics">
            <AcademicsTab 
              formState={formState} 
              handleChange={handleChange}
              handleSliderChange={handleSliderChange}
              handleSelectChange={handleSelectChange}
            />
          </TabsContent>
          
          <TabsContent value="preferences">
            <PreferencesTab 
              formState={formState}
              handleChange={handleChange}
              handleSliderChange={handleSliderChange}
              handleCheckboxChange={handleCheckboxChange}
              handleSelectChange={handleSelectChange}
            />
          </TabsContent>
          
          <TabsContent value="international">
            <InternationalTab 
              formState={formState}
              handleNestedChange={handleNestedChange}
              handleCheckboxChange={handleCheckboxChange}
              handleSelectChange={handleSelectChange}
            />
          </TabsContent>
        </Tabs>
        
        <Button 
          type="submit" 
          className="w-full transitions-all button-gold-shadow" 
          disabled={submitting}
        >
          {submitting ? 'Processing...' : 'Find My College Matches'}
        </Button>
      </form>
    </GlassCard>
  );
};

export default ProfileForm;
