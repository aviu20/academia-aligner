
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserProfile } from '@/data/userData';

interface InternationalTabProps {
  formState: UserProfile;
  handleNestedChange: (parent: keyof UserProfile, field: string, value: any) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const InternationalTab: React.FC<InternationalTabProps> = ({
  formState,
  handleNestedChange,
  handleCheckboxChange,
  handleSelectChange
}) => {
  return (
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
            <Label htmlFor="country">Country of Origin</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('country', value)}
              value={formState.country || ''}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="china">China</SelectItem>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="south_korea">South Korea</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="saudi_arabia">Saudi Arabia</SelectItem>
                <SelectItem value="vietnam">Vietnam</SelectItem>
                <SelectItem value="brazil">Brazil</SelectItem>
                <SelectItem value="mexico">Mexico</SelectItem>
                <SelectItem value="nigeria">Nigeria</SelectItem>
                <SelectItem value="turkey">Turkey</SelectItem>
                <SelectItem value="japan">Japan</SelectItem>
                <SelectItem value="indonesia">Indonesia</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
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
  );
};

export default InternationalTab;
