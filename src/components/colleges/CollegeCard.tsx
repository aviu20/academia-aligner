
import React, { useState } from 'react';
import { College } from '@/data/collegeData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, AlertTriangle, ChevronDown, ChevronUp, DollarSign, GraduationCap, MapPin, Users, BookOpen, Award, Globe, Calculator } from 'lucide-react';
import PercentageMatch from '../ui-custom/PercentageMatch';

interface CollegeCardProps {
  college: College;
  matchPercentage: number;
  matchReasons: string[];
  cautionPoints: string[];
  isInternational: boolean;
  matchBreakdown: {
    academic: number;
    major: number;
    location: number;
    financials: number;
    lifestyle: number;
    extracurricular: number;
    international?: number;
  };
  onViewCostOfLiving?: (collegeId: string) => void;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ 
  college, 
  matchPercentage, 
  matchReasons, 
  cautionPoints, 
  isInternational,
  matchBreakdown,
  onViewCostOfLiving
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const progressColors = {
    high: 'var(--success, #10b981)',
    medium: 'var(--warning, #f59e0b)',
    low: 'var(--destructive, #ef4444)'
  };
  
  const getProgressColor = (value: number) => {
    if (value >= 80) return progressColors.high;
    if (value >= 50) return progressColors.medium;
    return progressColors.low;
  };
  
  return (
    <Card className={`transition-all duration-300 ${expanded ? 'shadow-lg' : 'hover:shadow-md'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{college.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              <span>{college.city}, {college.location}</span>
            </CardDescription>
          </div>
          <PercentageMatch value={matchPercentage} />
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="flex gap-1 items-center">
            <GraduationCap className="h-3 w-3" />
            {college.acceptance}% Acceptance
          </Badge>
          
          <Badge variant="outline" className="flex gap-1 items-center">
            <Users className="h-3 w-3" />
            {college.undergraduate.toLocaleString()} Students
          </Badge>
          
          <Badge variant="outline" className="flex gap-1 items-center">
            <DollarSign className="h-3 w-3" />
            ${Math.round(college.tuition / 1000)}k/yr
          </Badge>
          
          {isInternational && college.internationalScholarships && (
            <Badge className="bg-green-600 text-white hover:bg-green-700 flex gap-1 items-center">
              <Globe className="h-3 w-3" />
              Int'l Scholarships
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium">Match Highlights</h4>
          <ul className="text-sm space-y-1">
            {matchReasons.slice(0, expanded ? undefined : 3).map((reason, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {expanded && (
          <>
            {cautionPoints.length > 0 && (
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium">Points to Consider</h4>
                <ul className="text-sm space-y-1">
                  {cautionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="space-y-4 mt-6">
              <h4 className="text-sm font-medium">Match Breakdown</h4>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5" />
                      Academic Fit
                    </span>
                    <span>{matchBreakdown.academic}%</span>
                  </div>
                  <Progress value={matchBreakdown.academic} indicatorColor={getProgressColor(matchBreakdown.academic)} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      Major Alignment
                    </span>
                    <span>{matchBreakdown.major}%</span>
                  </div>
                  <Progress value={matchBreakdown.major} indicatorColor={getProgressColor(matchBreakdown.major)} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      Location
                    </span>
                    <span>{matchBreakdown.location}%</span>
                  </div>
                  <Progress value={matchBreakdown.location} indicatorColor={getProgressColor(matchBreakdown.location)} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      Financial Fit
                    </span>
                    <span>{matchBreakdown.financials}%</span>
                  </div>
                  <Progress value={matchBreakdown.financials} indicatorColor={getProgressColor(matchBreakdown.financials)} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      Campus Lifestyle
                    </span>
                    <span>{matchBreakdown.lifestyle}%</span>
                  </div>
                  <Progress value={matchBreakdown.lifestyle} indicatorColor={getProgressColor(matchBreakdown.lifestyle)} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Award className="h-3.5 w-3.5" />
                      Extracurriculars
                    </span>
                    <span>{matchBreakdown.extracurricular}%</span>
                  </div>
                  <Progress value={matchBreakdown.extracurricular} indicatorColor={getProgressColor(matchBreakdown.extracurricular)} />
                </div>
                
                {isInternational && matchBreakdown.international && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Globe className="h-3.5 w-3.5" />
                        International Support
                      </span>
                      <span>{matchBreakdown.international}%</span>
                    </div>
                    <Progress value={matchBreakdown.international} indicatorColor={getProgressColor(matchBreakdown.international)} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col md:flex-row gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full md:w-auto"
          onClick={toggleExpand}
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Show More
            </>
          )}
        </Button>
        
        {onViewCostOfLiving && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full md:w-auto"
            onClick={() => onViewCostOfLiving(college.id)}
          >
            <Calculator className="h-4 w-4 mr-1" />
            Cost of Living
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
