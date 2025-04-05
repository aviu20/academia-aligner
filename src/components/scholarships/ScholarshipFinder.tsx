
import React, { useState, useEffect } from 'react';
import { useUserProfile } from '@/data/userData';
import { scholarships, scholarshipTypes, degreeTypes, fieldsOfStudy, Scholarship } from '@/data/scholarshipData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GraduationCap, BookOpen, DollarSign, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ScholarshipFinder: React.FC = () => {
  const { profile } = useUserProfile();
  const [searchTerm, setSearchTerm] = useState('');
  const [degreeType, setDegreeType] = useState('bachelors');
  const [fieldOfStudy, setFieldOfStudy] = useState(profile.intendedMajor || 'Any');
  const [scholarshipType, setScholarshipType] = useState<string>('');
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  
  useEffect(() => {
    filterScholarships();
  }, [searchTerm, degreeType, fieldOfStudy, scholarshipType]);
  
  const filterScholarships = () => {
    let filtered = [...scholarships];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(scholarship => 
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by field of study if not "Any"
    if (fieldOfStudy && fieldOfStudy !== 'Any') {
      filtered = filtered.filter(scholarship => 
        scholarship.fieldOfStudy.includes('Any') || 
        scholarship.fieldOfStudy.includes(fieldOfStudy)
      );
    }
    
    // Filter by scholarship type
    if (scholarshipType) {
      filtered = filtered.filter(scholarship => 
        scholarship.scholarshipType === scholarshipType
      );
    }
    
    // Apply profile-based filtering
    filtered = filtered.filter(scholarship => {
      // GPA check
      if (scholarship.minimumGPA && profile.gpa < scholarship.minimumGPA) {
        return false;
      }
      
      // SAT check
      if (scholarship.minimumSAT && profile.satScore < scholarship.minimumSAT) {
        return false;
      }
      
      // ACT check
      if (scholarship.minimumACT && profile.actScore < scholarship.minimumACT) {
        return false;
      }
      
      // International student check
      if (scholarship.country === 'International' && !profile.isInternationalStudent) {
        return false;
      }
      
      return true;
    });
    
    setFilteredScholarships(filtered);
  };

  const getScholarshipIcon = (type: string) => {
    switch(type) {
      case 'merit':
        return <GraduationCap className="w-4 h-4" />;
      case 'research':
        return <BookOpen className="w-4 h-4" />;
      case 'need':
        return <DollarSign className="w-4 h-4" />;
      case 'diversity':
        return <Users className="w-4 h-4" />;
      default:
        return <GraduationCap className="w-4 h-4" />;
    }
  };
  
  const getScholarshipTypeLabel = (type: string) => {
    const found = scholarshipTypes.find(t => t.value === type);
    return found ? found.label : type;
  };
  
  const getEligibilityMatchPercentage = (scholarship: Scholarship) => {
    let metCriteria = 0;
    let totalCriteria = 0;
    
    // GPA
    if (scholarship.minimumGPA) {
      totalCriteria++;
      if (profile.gpa >= scholarship.minimumGPA) metCriteria++;
    }
    
    // SAT
    if (scholarship.minimumSAT) {
      totalCriteria++;
      if (profile.satScore >= scholarship.minimumSAT) metCriteria++;
    }
    
    // ACT
    if (scholarship.minimumACT) {
      totalCriteria++;
      if (profile.actScore >= scholarship.minimumACT) metCriteria++;
    }
    
    // Field of Study
    totalCriteria++;
    if (scholarship.fieldOfStudy.includes('Any') || 
        scholarship.fieldOfStudy.includes(profile.intendedMajor)) {
      metCriteria++;
    }
    
    // International status match
    if (scholarship.country === 'International') {
      totalCriteria++;
      if (profile.isInternationalStudent) metCriteria++;
    }
    
    return totalCriteria > 0 ? Math.round((metCriteria / totalCriteria) * 100) : 100;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Find Scholarships</h1>
        <p className="text-muted-foreground">
          Discover scholarships that match your academic profile and interests
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Select value={degreeType} onValueChange={setDegreeType}>
            <SelectTrigger>
              <GraduationCap className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Degree Type" />
            </SelectTrigger>
            <SelectContent>
              {degreeTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={fieldOfStudy} onValueChange={setFieldOfStudy}>
            <SelectTrigger>
              <BookOpen className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Field of Study" />
            </SelectTrigger>
            <SelectContent>
              {fieldsOfStudy.map(field => (
                <SelectItem key={field.value} value={field.value}>{field.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-2">
          <Input
            placeholder="Search scholarships by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="" className="w-full" onValueChange={setScholarshipType}>
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="" className="flex-1">All Types</TabsTrigger>
          {scholarshipTypes.map(type => (
            <TabsTrigger key={type.value} value={type.value} className="flex-1">
              {getScholarshipIcon(type.value)}
              <span className="ml-2">{type.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div className="space-y-4">
        {filteredScholarships.length === 0 ? (
          <Alert>
            <AlertDescription>
              No scholarships match your current criteria. Try adjusting your filters.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Found {filteredScholarships.length} scholarships matching your criteria
            </p>
            
            {filteredScholarships.map(scholarship => (
              <Card key={scholarship.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-bold text-xl">
                        {scholarship.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {scholarship.description}
                      </CardDescription>
                    </div>
                    
                    <Badge className={
                      scholarship.isFullRide 
                        ? "bg-green-500 hover:bg-green-600" 
                        : scholarship.scholarshipType === 'merit' 
                          ? "bg-blue-500 hover:bg-blue-600" 
                          : scholarship.scholarshipType === 'need' 
                            ? "bg-purple-500 hover:bg-purple-600" 
                            : scholarship.scholarshipType === 'diversity'
                              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                              : "bg-indigo-500 hover:bg-indigo-600"
                    }>
                      {scholarship.isFullRide ? "Full Ride" : getScholarshipTypeLabel(scholarship.scholarshipType)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Amount</h4>
                      <p className="text-lg font-semibold">{scholarship.amount}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Deadline</h4>
                      <p className="text-lg font-semibold">{scholarship.deadline}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-1">Eligibility Match</h4>
                    <div className="flex items-center space-x-2">
                      <Progress value={getEligibilityMatchPercentage(scholarship)} className="h-2" />
                      <span className="text-sm">{getEligibilityMatchPercentage(scholarship)}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-1">Eligibility Requirements</h4>
                    <ul className="text-sm list-disc list-inside">
                      {scholarship.eligibilityRequirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full transitions-all"
                    onClick={() => window.open(scholarship.applicationLink, '_blank')}
                  >
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ScholarshipFinder;
