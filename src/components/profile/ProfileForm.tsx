
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../ui-custom/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserProfile } from '@/data/userData';

const ProfileForm: React.FC = () => {
  const { profile, updateProfile } = useUserProfile();
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState(profile);
  const [submitting, setSubmitting] = useState(false);
  
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="gpa">GPA (0.0 - 4.0)</Label>
            <Input
              id="gpa"
              name="gpa"
              type="number"
              step="0.1"
              min="0"
              max="4.0"
              value={formState.gpa}
              onChange={handleChange}
              className="transitions-all"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="intendedMajor">Intended Major</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('intendedMajor', value)}
              value={formState.intendedMajor}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a major" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="Psychology">Psychology</SelectItem>
                <SelectItem value="Economics">Economics</SelectItem>
                <SelectItem value="Political Science">Political Science</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Communications">Communications</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="satScore">SAT Score (400 - 1600)</Label>
            <Input
              id="satScore"
              name="satScore"
              type="number"
              min="400"
              max="1600"
              step="10"
              value={formState.satScore}
              onChange={handleChange}
              className="transitions-all"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="actScore">ACT Score (1 - 36)</Label>
            <Input
              id="actScore"
              name="actScore"
              type="number"
              min="1"
              max="36"
              value={formState.actScore}
              onChange={handleChange}
              className="transitions-all"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="preferredLocation">Preferred Location</Label>
          <Select 
            onValueChange={(value) => handleSelectChange('preferredLocation', value)}
            value={formState.preferredLocation}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select preferred location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="West Coast">West Coast</SelectItem>
              <SelectItem value="East Coast">East Coast</SelectItem>
              <SelectItem value="Midwest">Midwest</SelectItem>
              <SelectItem value="South">South</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="maxTuition">Maximum Annual Tuition ($)</Label>
          <Input
            id="maxTuition"
            name="maxTuition"
            type="number"
            min="0"
            step="1000"
            value={formState.maxTuition}
            onChange={handleChange}
            className="transitions-all"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="interestsInDormLife" 
              checked={formState.interestsInDormLife}
              onCheckedChange={(checked) => handleCheckboxChange('interestsInDormLife', checked as boolean)}
            />
            <Label htmlFor="interestsInDormLife">Campus & Dorm Life Important to Me</Label>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Importance of Sports Programs</Label>
              <span className="text-muted-foreground">{formState.sportsImportance}/5</span>
            </div>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[formState.sportsImportance]}
              onValueChange={(values) => handleSliderChange('sportsImportance', values)}
              className="transitions-all"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Importance of Research Opportunities</Label>
              <span className="text-muted-foreground">{formState.researchOpportunitiesImportance}/5</span>
            </div>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[formState.researchOpportunitiesImportance]}
              onValueChange={(values) => handleSliderChange('researchOpportunitiesImportance', values)}
              className="transitions-all"
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full transitions-all" 
          disabled={submitting}
        >
          {submitting ? 'Processing...' : 'Find My College Matches'}
        </Button>
      </form>
    </GlassCard>
  );
};

export default ProfileForm;
