
import React, { useState, useEffect } from 'react';
import { scholarships, scholarshipTypes, fieldsOfStudy } from '@/data/scholarshipData';
import { useUserProfile } from '@/data/userData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CalendarClock, ExternalLink, Search, Filter, Award, DollarSign, GraduationCap, Globe } from 'lucide-react';

const ScholarshipFinder: React.FC = () => {
  const { profile } = useUserProfile();
  const [searchTerm, setSearchTerm] = useState('');
  const [scholarshipType, setScholarshipType] = useState('all');
  const [fieldOfStudy, setFieldOfStudy] = useState('all');
  const [isFullRide, setIsFullRide] = useState<'all' | 'yes' | 'no'>('all');
  
  // Filter scholarships based on user inputs
  const filteredScholarships = scholarships.filter(scholarship => {
    // Search term filter
    const matchesSearch = 
      scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Scholarship type filter
    const matchesType = scholarshipType === 'all' || scholarship.scholarshipType === scholarshipType;
    
    // Field of study filter
    const matchesField = fieldOfStudy === 'all' || 
      scholarship.fieldOfStudy.includes(fieldOfStudy) || 
      scholarship.fieldOfStudy.includes('Any');
    
    // Full ride filter
    const matchesFullRide = 
      isFullRide === 'all' || 
      (isFullRide === 'yes' && scholarship.isFullRide) ||
      (isFullRide === 'no' && !scholarship.isFullRide);
    
    return matchesSearch && matchesType && matchesField && matchesFullRide;
  });
  
  // Filter for recommended scholarships based on user profile
  const recommendedScholarships = scholarships.filter(scholarship => {
    // Check if the student meets GPA requirements
    const meetsGPA = !scholarship.minimumGPA || profile.gpa >= scholarship.minimumGPA;
    
    // Check if the student meets SAT requirements
    const meetsSAT = !scholarship.minimumSAT || profile.satScore >= scholarship.minimumSAT;
    
    // Check if the student meets ACT requirements
    const meetsACT = !scholarship.minimumACT || profile.actScore >= scholarship.minimumACT;
    
    // Check if the scholarship is for international students
    const matchesInternational = 
      !scholarship.country || 
      (scholarship.country === 'International' && profile.isInternationalStudent) ||
      (scholarship.country !== 'International');
    
    // Check if the field of study matches
    const matchesField = 
      scholarship.fieldOfStudy.includes(profile.intendedMajor) || 
      scholarship.fieldOfStudy.includes('Any');
    
    // Check if the scholarship type matches user needs
    const matchesNeedBased = 
      scholarship.scholarshipType !== 'need' || 
      (scholarship.scholarshipType === 'need' && profile.needsScholarship);
    
    return meetsGPA && meetsSAT && meetsACT && matchesInternational && matchesField && matchesNeedBased;
  });
  
  const clearFilters = () => {
    setSearchTerm('');
    setScholarshipType('all');
    setFieldOfStudy('all');
    setIsFullRide('all');
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Scholarship Finder</h1>
        <p className="text-muted-foreground">
          Search and filter scholarships to help fund your education
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search and Filter
          </CardTitle>
          <CardDescription>
            Find scholarships that match your qualifications and interests
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Scholarship Type</label>
                <Select value={scholarshipType} onValueChange={setScholarshipType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {scholarshipTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Field of Study</label>
                <Select value={fieldOfStudy} onValueChange={setFieldOfStudy}>
                  <SelectTrigger>
                    <SelectValue placeholder="All fields" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fields</SelectItem>
                    {fieldsOfStudy.map((field) => (
                      <SelectItem key={field.value} value={field.value}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Full Ride</label>
                <Select value={isFullRide} onValueChange={(value) => setIsFullRide(value as 'all' | 'yes' | 'no')}>
                  <SelectTrigger>
                    <SelectValue placeholder="All scholarships" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scholarships</SelectItem>
                    <SelectItem value="yes">Full Ride Only</SelectItem>
                    <SelectItem value="no">Partial Scholarships</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="all" className="flex-1">All Scholarships</TabsTrigger>
          <TabsTrigger value="recommended" className="flex-1">Recommended for You</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {filteredScholarships.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg mb-4">No scholarships match your current filters</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredScholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recommended">
          {recommendedScholarships.length === 0 ? (
            <Alert className="mb-4">
              <AlertTitle>No recommended scholarships found</AlertTitle>
              <AlertDescription>
                We couldn't find any scholarships that match your profile. Try updating your profile 
                with more information or browse all available scholarships.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {recommendedScholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ScholarshipCardProps {
  scholarship: typeof scholarships[0];
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  const getScholarshipTypeIcon = (type: typeof scholarship.scholarshipType) => {
    switch (type) {
      case 'merit': return <Award className="h-4 w-4" />;
      case 'need': return <DollarSign className="h-4 w-4" />;
      case 'research': return <GraduationCap className="h-4 w-4" />;
      case 'diversity': return <Globe className="h-4 w-4" />;
    }
  };
  
  const getScholarshipTypeLabel = (type: typeof scholarship.scholarshipType) => {
    switch (type) {
      case 'merit': return 'Merit-Based';
      case 'need': return 'Need-Based';
      case 'research': return 'Research-Based';
      case 'diversity': return 'Diversity';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{scholarship.name}</CardTitle>
            <CardDescription className="mt-1">
              {scholarship.description}
            </CardDescription>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge variant={scholarship.isFullRide ? 'default' : 'outline'}>
              {scholarship.isFullRide ? 'Full Ride' : 'Partial Scholarship'}
            </Badge>
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5" />
              Deadline: {scholarship.deadline}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Eligibility Requirements</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {scholarship.eligibilityRequirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge className="flex items-center gap-1" variant="secondary">
              {getScholarshipTypeIcon(scholarship.scholarshipType)}
              {getScholarshipTypeLabel(scholarship.scholarshipType)}
            </Badge>
            
            <Badge variant="secondary">{scholarship.amount}</Badge>
            
            {scholarship.fieldOfStudy.map((field) => (
              field !== 'Any' && (
                <Badge key={field} variant="outline">
                  {field}
                </Badge>
              )
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <a href={scholarship.applicationLink} target="_blank" rel="noopener noreferrer">
          <Button className="w-full sm:w-auto">
            Apply Now <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default ScholarshipFinder;
