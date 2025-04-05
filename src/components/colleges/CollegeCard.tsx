
import React, { useState } from 'react';
import GlassCard from '../ui-custom/GlassCard';
import PercentageMatch from '../ui-custom/PercentageMatch';
import { Button } from '@/components/ui/button';
import { College } from '@/data/collegeData';
import { ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface CollegeCardProps {
  college: College;
  matchPercentage: number;
  matchReasons: string[];
  cautionPoints: string[];
  isInternational?: boolean;
  matchBreakdown?: {
    academic: number;
    major: number;
    location: number;
    financials: number;
    lifestyle: number;
    extracurricular: number;
    international?: number;
  };
}

const CollegeCard: React.FC<CollegeCardProps> = ({
  college,
  matchPercentage,
  matchReasons,
  cautionPoints,
  isInternational = false,
  matchBreakdown = {
    academic: 75,
    major: 80,
    location: 90,
    financials: 60,
    lifestyle: 85,
    extracurricular: 70,
    international: isInternational ? 80 : undefined
  }
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Mock data for college culture and environment - would be replaced with real data
  const collegeEnvironment = {
    culture: `${college.name} is known for its ${college.sportsRanking >= 4 ? 'vibrant sports culture' : 'academic focus'} and ${college.researchOpportunities >= 4 ? 'strong research community' : 'collaborative learning environment'}. Students describe the campus atmosphere as ${college.dormLifeQuality >= 4 ? 'lively and engaging' : 'focused and determined'}.`,
    cityLife: `Located in the ${college.location} region, students enjoy ${college.location === 'West Coast' ? 'access to beaches, tech hubs, and mild weather' : college.location === 'East Coast' ? 'proximity to major cities, historical sites, and seasonal weather' : college.location === 'South' ? 'warm climate, rich cultural traditions, and southern hospitality' : 'affordable living, open spaces, and tight-knit communities'}. The area offers plenty of opportunities for ${college.dormLifeQuality >= 4 ? 'social activities' : 'quiet study'} and professional networking.`,
    clubs: `The university hosts over ${Math.floor(college.studentPopulation / 500)} student organizations, with particularly strong offerings in ${college.strongMajors.join(', ')} related activities. ${college.sportsRanking >= 4 ? 'Sports clubs and intramurals are very popular on campus.' : 'Academic and professional clubs are highly active.'}`,
    international: isInternational ? `With ${college.internationalStudentPercentage}% international students, the campus has a ${college.internationalStudentPercentage > 10 ? 'strong global community' : 'growing international presence'}. The International Student Association organizes cultural events throughout the year, and the university provides ${college.visaSupport >= 4 ? 'exceptional support services' : 'basic resources'} for international students.` : ''
  };
  
  return (
    <GlassCard className="overflow-hidden transitions-all">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Match score */}
        <div className="flex-shrink-0 flex justify-center">
          <PercentageMatch percentage={matchPercentage} />
        </div>
        
        {/* College info */}
        <div className="flex-grow">
          <h3 className="text-xl font-semibold">{college.name}</h3>
          <p className="text-sm text-muted-foreground mb-1">{college.location} • {(college.acceptanceRate * 100).toFixed(1)}% Acceptance</p>
          
          {/* Motto at the top in italics and gold */}
          <p className="text-sm italic text-gold mb-3">"{college.motto}"</p>
          
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {college.strongMajors.slice(0, 3).map((major, index) => (
                <span key={index} className="text-xs bg-secondary py-1 px-2 rounded-full">
                  {major}
                </span>
              ))}
            </div>
            
            <p className="text-sm mb-3">
              <span className="font-medium">Tuition:</span> ${college.tuition.toLocaleString()}/year • 
              <span className="font-medium"> Avg GPA:</span> {college.averageGPA} • 
              <span className="font-medium"> Avg SAT:</span> {college.averageSAT}
            </p>
            
            {isInternational && (
              <p className="text-sm mb-3">
                <span className="font-medium">International:</span> {college.internationalStudentPercentage}% • 
                <span className="font-medium"> TOEFL min:</span> {college.englishRequirements.toefl} • 
                <span className="font-medium"> IELTS min:</span> {college.englishRequirements.ielts}
              </p>
            )}
            
            <div className="mb-3">
              <p className="text-xs uppercase font-medium mb-1 text-muted-foreground">Match Highlights</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {matchReasons.slice(0, expanded ? undefined : 2).map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
            
            {cautionPoints.length > 0 && expanded && (
              <div>
                <p className="text-xs uppercase font-medium mb-1 text-amber-500 dark:text-amber-400">Considerations</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {cautionPoints.map((point, index) => (
                    <li key={index} className="text-amber-600 dark:text-amber-400">{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="text-xs transitions-all"
          >
            {expanded ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      </div>
      
      {/* Expanded details section */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-border">
          {/* Match percentage breakdown section */}
          <div className="mb-5">
            <h4 className="text-sm font-medium mb-3">Match Percentage Breakdown</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Academic Fit</span>
                  <span>{matchBreakdown.academic}%</span>
                </div>
                <Progress value={matchBreakdown.academic} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Major Alignment</span>
                  <span>{matchBreakdown.major}%</span>
                </div>
                <Progress value={matchBreakdown.major} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Location Preference</span>
                  <span>{matchBreakdown.location}%</span>
                </div>
                <Progress value={matchBreakdown.location} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Financial Fit</span>
                  <span>{matchBreakdown.financials}%</span>
                </div>
                <Progress value={matchBreakdown.financials} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Campus Lifestyle</span>
                  <span>{matchBreakdown.lifestyle}%</span>
                </div>
                <Progress value={matchBreakdown.lifestyle} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Extracurricular Match</span>
                  <span>{matchBreakdown.extracurricular}%</span>
                </div>
                <Progress value={matchBreakdown.extracurricular} className="h-2" />
              </div>
              {isInternational && matchBreakdown.international && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>International Support</span>
                    <span>{matchBreakdown.international}%</span>
                  </div>
                  <Progress value={matchBreakdown.international} className="h-2" />
                </div>
              )}
            </div>
          </div>
          
          <Separator className="my-4" />
          
          {/* Campus Culture & Environment section */}
          <div className="mb-5">
            <h4 className="text-sm font-medium mb-3">Campus Culture & Environment</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>{collegeEnvironment.culture}</p>
              <p>{collegeEnvironment.cityLife}</p>
              <p>{collegeEnvironment.clubs}</p>
              {isInternational && <p>{collegeEnvironment.international}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Notable Facilities</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {college.notableFacilities.map((facility, index) => (
                  <li key={index}>• {facility}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Key Facts</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Student Population: {college.studentPopulation.toLocaleString()}</li>
                <li>• Sports Rating: {Array(college.sportsRanking).fill('★').join('')}</li>
                <li>• Research Rating: {Array(college.researchOpportunities).fill('★').join('')}</li>
                <li>• Dorm Life: {Array(college.dormLifeQuality).fill('★').join('')}</li>
              </ul>
            </div>
          </div>
          
          {isInternational && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">International Student Support</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• International Population: {college.internationalStudentPercentage}%</li>
                <li>• Visa Support: {Array(college.visaSupport).fill('★').join('')}</li>
                <li>• International Scholarships: {college.internationalScholarships ? 'Available' : 'Limited'}</li>
                <li>• Min. TOEFL: {college.englishRequirements.toefl}</li>
                <li>• Min. IELTS: {college.englishRequirements.ielts}</li>
              </ul>
            </div>
          )}
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Admission Priorities</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(college.admissionFactors)
                .filter(([_, value]) => value > 0)
                .sort(([_, a], [__, b]) => b - a)
                .slice(0, 6)
                .map(([factor, value]) => {
                  const formatFactor = (key: string) => {
                    return key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase());
                  };
                  
                  const getImportanceText = (val: number) => {
                    if (val === 5) return 'Very Important';
                    if (val === 3) return 'Important';
                    if (val === 1) return 'Considered';
                    return 'Not Considered';
                  };
                  
                  return (
                    <div key={factor} className="text-xs p-2 border rounded">
                      <div className="font-medium">{formatFactor(factor)}</div>
                      <div className="text-muted-foreground">{getImportanceText(value)}</div>
                    </div>
                  );
              })}
            </div>
          </div>
          
          {/* Admissions page link */}
          <div className="mt-6 pt-4 border-t border-border">
            <a 
              href={`https://${college.name.toLowerCase().replace(/\s+/g, '')}.edu/admissions`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              Visit Admissions Page <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default CollegeCard;
