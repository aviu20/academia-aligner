
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
  
  // Recalculate matches whenever the profile changes
  useEffect(() => {
    setMatches(calculateCollegeMatches(profile, colleges));
  }, [profile]);
  
  // Filtered colleges based on search and location
  const filteredColleges = matches.filter(match => {
    const nameMatch = match.college.name.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = filterLocation === 'all' ? true : match.college.location === filterLocation;
    return nameMatch && locationMatch;
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
              />
            ))}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg mb-4">No colleges match your current filters</p>
            <Button onClick={() => { setSearchTerm(''); setFilterLocation('all'); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeList;
