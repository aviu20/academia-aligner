
import React, { useState } from 'react';
import { College } from '@/data/collegeData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, GraduationCap, DollarSign, MapPin, Users, Globe, Calculator } from 'lucide-react';
import PercentageMatch from '../ui-custom/PercentageMatch';
import { useIsMobile } from '@/hooks/use-mobile';

interface CollegeSavedListProps {
  savedColleges: Array<{
    college: College;
    matchPercentage: number;
  }>;
  rejectedColleges: Array<{
    college: College;
    matchPercentage: number;
  }>;
  isInternational: boolean;
  onRemove: (collegeId: string, list: 'saved' | 'rejected') => void;
  onViewCostOfLiving?: (collegeId: string) => void;
}

const CollegeSavedList: React.FC<CollegeSavedListProps> = ({ 
  savedColleges, 
  rejectedColleges, 
  isInternational, 
  onRemove,
  onViewCostOfLiving
}) => {
  const [activeTab, setActiveTab] = useState('saved');
  const isMobile = useIsMobile();
  
  if (savedColleges.length === 0 && rejectedColleges.length === 0) {
    return (
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="px-0 py-6 text-center">
          <CardTitle className="mb-4">No Saved Colleges Yet</CardTitle>
          <p className="mb-6 text-muted-foreground">
            Save colleges by swiping right or clicking "Save" on the Discover tab.
          </p>
          <Button onClick={() => {
            document.querySelector('[data-value="discover"]')?.dispatchEvent(
              new MouseEvent('click', { bubbles: true })
            );
          }}>
            Discover Colleges
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <Tabs defaultValue="saved" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-6">
          <TabsTrigger value="saved" className="flex-1">
            Saved Colleges ({savedColleges.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex-1">
            Not Interested ({rejectedColleges.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="saved">
          {savedColleges.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg mb-4">You haven't saved any colleges yet</p>
              <Button onClick={() => {
                document.querySelector('[data-value="discover"]')?.dispatchEvent(
                  new MouseEvent('click', { bubbles: true })
                );
              }}>
                Discover Colleges
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedColleges.map(({ college, matchPercentage }) => {
                // Extract city from location
                const city = college.location.split(', ')[0] || '';
                
                return (
                  <Card key={college.id} className="relative">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 h-7 w-7 rounded-full"
                      onClick={() => onRemove(college.id, 'saved')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    <CardHeader className={`pb-2 ${isMobile ? 'pr-8' : ''}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl">{college.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{city}, {college.location}</span>
                          </p>
                        </div>
                        
                        <PercentageMatch value={matchPercentage} />
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="flex gap-1 items-center">
                          <GraduationCap className="h-3 w-3" />
                          {college.acceptanceRate * 100}% Acceptance
                        </Badge>
                        
                        <Badge variant="outline" className="flex gap-1 items-center">
                          <Users className="h-3 w-3" />
                          {college.studentPopulation.toLocaleString()} Students
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
                      
                      <div className="flex flex-wrap gap-2">
                        <Button
                          onClick={() => {
                            document.querySelector('[data-value="journey"]')?.dispatchEvent(
                              new MouseEvent('click', { bubbles: true })
                            );
                          }}
                          variant="outline"
                          size="sm"
                        >
                          View Application Steps
                        </Button>
                        
                        {onViewCostOfLiving && (
                          <Button 
                            onClick={() => onViewCostOfLiving(college.id)}
                            variant="outline" 
                            size="sm"
                          >
                            <Calculator className="h-4 w-4 mr-1" />
                            Cost of Living
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rejected">
          {rejectedColleges.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg">You haven't rejected any colleges yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rejectedColleges.map(({ college, matchPercentage }) => {
                // Extract city from location
                const city = college.location.split(', ')[0] || '';
                
                return (
                  <Card key={college.id} className="relative">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 h-7 w-7 rounded-full"
                      onClick={() => onRemove(college.id, 'rejected')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    <CardHeader className={`pb-2 ${isMobile ? 'pr-8' : ''}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl">{college.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{city}, {college.location}</span>
                          </p>
                        </div>
                        
                        <PercentageMatch value={matchPercentage} />
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="flex gap-1 items-center">
                          <GraduationCap className="h-3 w-3" />
                          {college.acceptanceRate * 100}% Acceptance
                        </Badge>
                        
                        <Badge variant="outline" className="flex gap-1 items-center">
                          <DollarSign className="h-3 w-3" />
                          ${Math.round(college.tuition / 1000)}k/yr
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollegeSavedList;
