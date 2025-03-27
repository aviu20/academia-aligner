
import React from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserProfile } from '@/data/userData';

interface PreferencesTabProps {
  formState: UserProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSliderChange: (name: string, value: number[]) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const PreferencesTab: React.FC<PreferencesTabProps> = ({
  formState,
  handleChange,
  handleSliderChange,
  handleCheckboxChange,
  handleSelectChange
}) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default PreferencesTab;
