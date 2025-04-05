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

const CollegeList: React.FC = () => {
  const { profile } = useUserProfile();
  const [matches, setMatches] = useState(calculateCollegeMatches(profile, colleges));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterScholarship, setFilterScholarship] = useState('all');
  const [savedColleges, setSavedColleges] = useState<string[]>([]);
  const [rejectedColleges, setRejectedColleges] = useState<string[]>([]);
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
  
  return (
    <div className="animate-fade-in">
      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="discover" className="flex-1">Discover</TabsTrigger>
          <TabsTrigger value="saved" className="flex-1">My Colleges</TabsTrigger>
          <TabsTrigger value="tracker" className="flex-1">Application Tracker</TabsTrigger>
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
          />
        </TabsContent>
        
        <TabsContent value="tracker" className="mt-0">
          <div className="text-center py-8">
            <h3 className="text-xl font-medium mb-2">Application Tracker</h3>
            <p className="mb-4">Track your application progress for each college</p>
            
            {getSavedCollegeMatches().length > 0 ? (
              <div className="grid gap-4">
                {getSavedCollegeMatches().map(match => (
                  <ApplicationTrackerCard 
                    key={match.college.id} 
                    college={match.college} 
                    matchPercentage={match.matchPercentage}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border rounded-lg">
                <p className="mb-4">You haven't saved any colleges yet</p>
                <Button variant="outline" onClick={() => {
                  document.querySelector('[data-value="discover"]')?.dispatchEvent(
                    new MouseEvent('click', { bubbles: true })
                  );
                }}>
                  Go discover colleges
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ApplicationTrackerCard: React.FC<{
  college: typeof colleges[0];
  matchPercentage: number;
}> = ({ college, matchPercentage }) => {
  const [status, setStatus] = useState<'not-started' | 'in-progress' | 'submitted' | 'accepted' | 'rejected'>('not-started');
  
  const getStatusColor = () => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h4 className="font-medium">{college.name}</h4>
          <p className="text-sm text-muted-foreground">{college.location}</p>
        </div>
        <div className="text-sm font-medium">{Math.round(matchPercentage)}% Match</div>
      </div>
      
      <div className="flex gap-2 mt-3">
        <Select value={status} onValueChange={(value: any) => setStatus(value)}>
          <SelectTrigger className={`text-xs h-8 ${getStatusColor()}`}>
            <SelectValue placeholder="Set status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="not-started">Not Started</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="sm" className="h-8">
          <a 
            href={`https://${college.name.toLowerCase().replace(/\s+/g, '')}.edu/admissions`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs"
          >
            Apply
          </a>
        </Button>
      </div>
    </div>
  );
};

export default CollegeList;
