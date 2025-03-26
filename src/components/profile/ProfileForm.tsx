import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../ui-custom/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserProfile, UserProfile } from '@/data/userData';

const ProfileForm: React.FC = () => {
  const { profile, updateProfile } = useUserProfile();
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
          
          <TabsContent value="academics" className="space-y-6">
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
              <Label htmlFor="academicRigorScore">Academic Rigor (1-5)</Label>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Standard</span>
                <Slider
                  id="academicRigorScore"
                  min={1}
                  max={5}
                  step={1}
                  value={[formState.academicRigorScore]}
                  onValueChange={(values) => handleSliderChange('academicRigorScore', values)}
                  className="mx-4 transitions-all w-2/3"
                />
                <span className="text-sm text-muted-foreground">Very Rigorous</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="classRank">Class Rank Percentile (0-100)</Label>
              <Input
                id="classRank"
                name="classRank"
                type="number"
                min="0"
                max="100"
                value={formState.classRank || ''}
                onChange={handleChange}
                className="transitions-all"
                placeholder="Your percentile rank in class"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
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
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasSignificantExtracurriculars" 
                  checked={formState.hasSignificantExtracurriculars}
                  onCheckedChange={(checked) => handleCheckboxChange('hasSignificantExtracurriculars', checked as boolean)}
                />
                <Label htmlFor="hasSignificantExtracurriculars">I Have Significant Extracurricular Activities</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasSpecialTalent" 
                  checked={formState.hasSpecialTalent}
                  onCheckedChange={(checked) => handleCheckboxChange('hasSpecialTalent', checked as boolean)}
                />
                <Label htmlFor="hasSpecialTalent">I Have Special Talents (Athletic, Artistic, etc.)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasVolunteerExperience" 
                  checked={formState.hasVolunteerExperience}
                  onCheckedChange={(checked) => handleCheckboxChange('hasVolunteerExperience', checked as boolean)}
                />
                <Label htmlFor="hasVolunteerExperience">I Have Volunteer Experience</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasWorkExperience" 
                  checked={formState.hasWorkExperience}
                  onCheckedChange={(checked) => handleCheckboxChange('hasWorkExperience', checked as boolean)}
                />
                <Label htmlFor="hasWorkExperience">I Have Work Experience</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasRecommendationLetters" 
                  checked={formState.hasRecommendationLetters}
                  onCheckedChange={(checked) => handleCheckboxChange('hasRecommendationLetters', checked as boolean)}
                />
                <Label htmlFor="hasRecommendationLetters">I Have Strong Recommendation Letters</Label>
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
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Quality of Application Essay</Label>
                  <span className="text-muted-foreground">{formState.essayQuality}/5</span>
                </div>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[formState.essayQuality]}
                  onValueChange={(values) => handleSliderChange('essayQuality', values)}
                  className="transitions-all"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="international" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isInternationalStudent" 
                  checked={formState.isInternationalStudent}
                  onCheckedChange={(checked) => handleCheckboxChange('isInternationalStudent', checked as boolean)}
                />
                <Label htmlFor="isInternationalStudent">I am an International Student</Label>
              </div>
              
              {formState.isInternationalStudent && (
                <>
                  <div className="space-y-3 mt-4">
                    <Label htmlFor="toefl">TOEFL Score (0-120)</Label>
                    <Input
                      id="toefl"
                      type="number"
                      min="0"
                      max="120"
                      value={formState.englishProficiency.toefl || ''}
                      onChange={(e) => handleNestedChange('englishProficiency', 'toefl', parseInt(e.target.value))}
                      className="transitions-all"
                      placeholder="Your TOEFL score"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="ielts">IELTS Score (0-9.0)</Label>
                    <Input
                      id="ielts"
                      type="number"
                      min="0"
                      max="9"
                      step="0.5"
                      value={formState.englishProficiency.ielts || ''}
                      onChange={(e) => handleNestedChange('englishProficiency', 'ielts', parseFloat(e.target.value))}
                      className="transitions-all"
                      placeholder="Your IELTS score"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox 
                      id="needsScholarship" 
                      checked={formState.needsScholarship}
                      onCheckedChange={(checked) => handleCheckboxChange('needsScholarship', checked as boolean)}
                    />
                    <Label htmlFor="needsScholarship">I Need a Scholarship or Financial Aid</Label>
                  </div>
                </>
              )}
            </div>
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
