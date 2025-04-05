
import React, { useState, useEffect } from 'react';
import CollegeCard from './CollegeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserProfile } from '@/data/userData';
import { colleges } from '@/data/collegeData';
import { calculateCollegeMatches } from '@/utils/matchingAlgorithm';

const CollegeList: React.FC = () => {
  const { profile } = useUserProfile();
  const [matches, setMatches] = useState(calculateCollegeMatches(profile, colleges));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterScholarship, setFilterScholarship] = useState('all');
  
  // Recalculate matches whenever the profile changes
  useEffect(() => {
    setMatches(calculateCollegeMatches(profile, colleges));
  }, [profile]);
  
  // Filtered colleges based on search, location, and international scholarships
  const filteredColleges = matches.filter(match => {
    const nameMatch = match.college.name.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = filterLocation === 'all' ? true : match.college.location === filterLocation;
    const scholarshipMatch = filterScholarship === 'all' ? true : 
                           (filterScholarship === 'yes' ? match.college.internationalScholarships : !match.college.internationalScholarships);
    
    return nameMatch && locationMatch && scholarshipMatch;
  });
  
  return (
    <div className="animate-fade-in">
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
    </div>
  );
};

export default CollegeList;
