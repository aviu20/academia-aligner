
import React from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserProfile } from '@/data/userData';

interface AcademicsTabProps {
  formState: UserProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSliderChange: (name: string, value: number[]) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const AcademicsTab: React.FC<AcademicsTabProps> = ({
  formState,
  handleChange,
  handleSliderChange,
  handleSelectChange
}) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default AcademicsTab;
