
import React from 'react';
import { College } from '@/data/collegeData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CollegeSavedListProps {
  savedColleges: Array<{
    college: College;
    matchPercentage: number;
    matchReasons: string[];
    cautionPoints: string[];
    scores?: {
      academicScore: number;
      majorScore: number;
      locationScore: number;
      financialScore: number;
      lifestyleScore: number;
      extracurricularScore: number;
      internationalScore?: number;
    };
  }>;
  rejectedColleges: Array<{
    college: College;
    matchPercentage: number;
    matchReasons: string[];
    cautionPoints: string[];
    scores?: {
      academicScore: number;
      majorScore: number;
      locationScore: number;
      financialScore: number;
      lifestyleScore: number;
      extracurricularScore: number;
      internationalScore?: number;
    };
  }>;
  isInternational: boolean;
  onRemove: (collegeId: string, list: 'saved' | 'rejected') => void;
}

const CollegeSavedList: React.FC<CollegeSavedListProps> = ({
  savedColleges,
  rejectedColleges,
  isInternational,
  onRemove
}) => {
  const isMobile = useIsMobile();
  
  const SavedCollegeCard = ({ 
    college, 
    matchPercentage, 
    list 
  }: { 
    college: College; 
    matchPercentage: number;
    list: 'saved' | 'rejected';
  }) => (
    <Card className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 h-6 w-6 rounded-full" 
        onClick={() => onRemove(college.id, list)}
      >
        <X className="h-3 w-3" />
      </Button>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">{college.name}</h3>
            <p className="text-sm text-muted-foreground">{college.location}</p>
          </div>
          
          <div className="text-sm font-medium px-2 py-1 rounded-full bg-secondary">
            {Math.round(matchPercentage)}% Match
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs mt-3">
          <div>
            <span className="block text-muted-foreground">Tuition</span>
            <span className="font-medium">${college.tuition.toLocaleString()}</span>
          </div>
          <div>
            <span className="block text-muted-foreground">Acceptance</span>
            <span className="font-medium">{(college.acceptanceRate * 100).toFixed(1)}%</span>
          </div>
        </div>
        
        <div className="flex justify-between mt-3 pt-3 border-t border-border">
          <Button variant="ghost" size="sm" className="text-xs">
            <a 
              href={`https://${college.name.toLowerCase().replace(/\s+/g, '')}.edu/admissions`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit Site
            </a>
          </Button>
          
          <Button variant="outline" size="sm" className="text-xs">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div>
      <Tabs defaultValue="saved">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="saved" className="flex-1">
            Saved ({savedColleges.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex-1">
            Skipped ({rejectedColleges.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved">
          {savedColleges.length > 0 ? (
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'} gap-4`}>
              {savedColleges.map((match) => (
                <SavedCollegeCard 
                  key={match.college.id}
                  college={match.college}
                  matchPercentage={match.matchPercentage}
                  list="saved"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg mb-4">You haven't saved any colleges yet</p>
              <Button variant="outline" onClick={() => {
                document.querySelector('[data-value="discover"]')?.dispatchEvent(
                  new MouseEvent('click', { bubbles: true })
                );
              }}>
                Discover Colleges
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rejected">
          {rejectedColleges.length > 0 ? (
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'} gap-4`}>
              {rejectedColleges.map((match) => (
                <SavedCollegeCard
                  key={match.college.id}
                  college={match.college}
                  matchPercentage={match.matchPercentage}
                  list="rejected"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg mb-4">No skipped colleges</p>
              <Button variant="outline" onClick={() => {
                document.querySelector('[data-value="discover"]')?.dispatchEvent(
                  new MouseEvent('click', { bubbles: true })
                );
              }}>
                Discover Colleges
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollegeSavedList;
