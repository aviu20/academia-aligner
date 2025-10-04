
import React, { useState, useEffect } from 'react';
import CollegeCard from './CollegeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserProfile } from '@/data/userData';
import { colleges } from '@/data/collegeData';
import { calculateCollegeMatches } from '@/utils/matchingAlgorithm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SwipeableCollegeStack from './SwipeableCollegeStack';
import CollegeSavedList from './CollegeSavedList';
import { useIsMobile } from '@/hooks/use-mobile';
import JourneyTabs from '../journey/JourneyTabs';
import ScholarshipFinder from '../scholarships/ScholarshipFinder';
import CostOfLivingCalculator from '../cost-of-living/CostOfLivingCalculator';

const CollegeList: React.FC = () => {
  const { profile } = useUserProfile();
  const [matches, setMatches] = useState(calculateCollegeMatches(profile, colleges));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterScholarship, setFilterScholarship] = useState('all');
  const [savedColleges, setSavedColleges] = useState<string[]>([]);
  const [rejectedColleges, setRejectedColleges] = useState<string[]>([]);
  const [selectedCollegeForCost, setSelectedCollegeForCost] = useState<string | undefined>(undefined);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setMatches(calculateCollegeMatches(profile, colleges));
  }, [profile]);
  
  const handleSwipe = (college: typeof colleges[0], direction: 'left' | 'right') => {
    if (direction === 'right') {
      setSavedColleges(prev => [...prev.filter(id => id !== college.id), college.id]);
      setRejectedColleges(prev => prev.filter(id => id !== college.id));
    } else {
      setRejectedColleges(prev => [...prev.filter(id => id !== college.id), college.id]);
      setSavedColleges(prev => prev.filter(id => id !== college.id));
    }
  };
  
  const filteredColleges = matches.filter(match => {
    const nameMatch = match.college.name.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = filterLocation === 'all' ? true : match.college.location === filterLocation;
    const scholarshipMatch = filterScholarship === 'all' ? true : 
                            (filterScholarship === 'yes' ? match.college.internationalScholarships : !match.college.internationalScholarships);
    
    return nameMatch && locationMatch && scholarshipMatch;
  });
  
  const getSavedCollegeMatches = () => {
    return matches
      .filter(match => savedColleges.includes(match.college.id))
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  };
  
  const getRejectedCollegeMatches = () => {
    return matches
      .filter(match => rejectedColleges.includes(match.college.id))
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  };
  
  const getRemainingColleges = () => {
    return matches.filter(match => 
      !savedColleges.includes(match.college.id) && 
      !rejectedColleges.includes(match.college.id)
    );
  };
  
  const handleViewCostOfLivingFromCollege = (collegeId: string) => {
    setSelectedCollegeForCost(collegeId);
    // Navigate to the cost of living tab
    const costOfLivingTabTrigger = document.querySelector('[data-value="cost-of-living"]');
    if (costOfLivingTabTrigger && costOfLivingTabTrigger instanceof HTMLElement) {
      costOfLivingTabTrigger.click();
    }
  };
  
  return (
    <div className="animate-fade-in">
      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="discover" className="flex-1">Discover</TabsTrigger>
          <TabsTrigger value="saved" className="flex-1">My Colleges</TabsTrigger>
          <TabsTrigger value="journey" className="flex-1">Application Journey</TabsTrigger>
          <TabsTrigger value="scholarships" className="flex-1">Scholarships</TabsTrigger>
          <TabsTrigger value="cost-of-living" className="flex-1">Cost of Living</TabsTrigger>
        </TabsList>
        
        <TabsContent value="discover" className="mt-0">
          {isMobile ? (
            <div>
              <div className="mb-4">
                <p className="text-sm text-center mb-2">
                  Swipe right to save a college, swipe left to skip
                </p>
                <SwipeableCollegeStack 
                  matches={getRemainingColleges()} 
                  onSwipe={handleSwipe}
                  isInternational={profile.isInternationalStudent}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input
                  placeholder="Search colleges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="md:max-w-xs transitions-all"
                />
                
                <Select
                  value={filterLocation}
                  onValueChange={setFilterLocation}
                >
                  <SelectTrigger className="md:w-[180px]">
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    <SelectItem value="West Coast">West Coast</SelectItem>
                    <SelectItem value="East Coast">East Coast</SelectItem>
                    <SelectItem value="Midwest">Midwest</SelectItem>
                    <SelectItem value="South">South</SelectItem>
                  </SelectContent>
                </Select>
                
                {profile.isInternationalStudent && (
                  <Select
                    value={filterScholarship}
                    onValueChange={setFilterScholarship}
                  >
                    <SelectTrigger className="md:w-[210px]">
                      <SelectValue placeholder="All scholarship options" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All scholarship options</SelectItem>
                      <SelectItem value="yes">Has international scholarships</SelectItem>
                      <SelectItem value="no">No international scholarships</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              <div className="space-y-4">
                {filteredColleges.length > 0 ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      Showing {filteredColleges.length} colleges matched to your profile
                    </p>
                    {filteredColleges.map((match) => (
                      <CollegeCard
                        key={match.college.id}
                        college={match.college}
                        matchPercentage={match.matchPercentage}
                        matchReasons={match.matchReasons}
                        cautionPoints={match.cautionPoints}
                        isInternational={profile.isInternationalStudent}
                        admissionFit={match.admissionFit}
                        percentiles={match.percentiles}
                        matchBreakdown={{
                          academic: Math.round(match.scores?.academicScore * 100) || 75,
                          major: Math.round(match.scores?.majorScore * 100) || 80,
                          location: Math.round(match.scores?.locationScore * 100) || 90,
                          financials: Math.round(match.scores?.financialScore * 100) || 60,
                          lifestyle: Math.round(match.scores?.lifestyleScore * 100) || 85,
                          extracurricular: Math.round(match.scores?.extracurricularScore * 100) || 70,
                          international: profile.isInternationalStudent ? 
                            (Math.round(match.scores?.internationalScore * 100) || 80) : undefined
                        }}
                        onViewCostOfLiving={() => handleViewCostOfLivingFromCollege(match.college.id)}
                      />
                    ))}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg mb-4">No colleges match your current filters</p>
                    <Button onClick={() => { 
                      setSearchTerm(''); 
                      setFilterLocation('all'); 
                      setFilterScholarship('all');
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="saved" className="mt-0">
          <CollegeSavedList 
            savedColleges={getSavedCollegeMatches()}
            rejectedColleges={getRejectedCollegeMatches()}
            isInternational={profile.isInternationalStudent}
            onRemove={(collegeId, list) => {
              if (list === 'saved') {
                setSavedColleges(prev => prev.filter(id => id !== collegeId));
              } else {
                setRejectedColleges(prev => prev.filter(id => id !== collegeId));
              }
            }}
            onViewCostOfLiving={handleViewCostOfLivingFromCollege}
          />
        </TabsContent>
        
        <TabsContent value="journey" className="mt-0">
          <JourneyTabs savedColleges={getSavedCollegeMatches()} />
        </TabsContent>
        
        <TabsContent value="scholarships" className="mt-0">
          <ScholarshipFinder />
        </TabsContent>
        
        <TabsContent value="cost-of-living" className="mt-0">
          <CostOfLivingCalculator collegeId={selectedCollegeForCost} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollegeList;
