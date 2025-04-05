
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { College } from '@/data/collegeData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CollegeJourney from './CollegeJourney';
import VisaJourney from './VisaJourney';
import ApplicationTracker from './ApplicationTracker';

interface JourneyTabsProps {
  savedColleges: Array<{
    college: College;
    matchPercentage: number;
  }>;
}

const JourneyTabs: React.FC<JourneyTabsProps> = ({ savedColleges }) => {
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(
    savedColleges.length > 0 ? savedColleges[0].college.id : null
  );

  const selectedCollege = savedColleges.find(item => item.college.id === selectedCollegeId)?.college;
  
  if (savedColleges.length === 0) {
    return (
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="px-0 py-6 text-center">
          <CardTitle className="mb-4">No Saved Colleges Yet</CardTitle>
          <CardDescription className="mb-6">
            Save colleges by swiping right or clicking "Save" to start tracking your application journey.
          </CardDescription>
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
    <div className="space-y-6">
      <Tabs defaultValue="college">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="college" className="flex-1">University Application</TabsTrigger>
          <TabsTrigger value="visa" className="flex-1">Visa Application</TabsTrigger>
          <TabsTrigger value="tracker" className="flex-1">Application Tracker</TabsTrigger>
        </TabsList>
        
        <TabsContent value="college" className="mt-0">
          {savedColleges.length > 1 && (
            <div className="mb-6">
              <Select
                value={selectedCollegeId || ''}
                onValueChange={setSelectedCollegeId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a college" />
                </SelectTrigger>
                <SelectContent>
                  {savedColleges.map(({ college, matchPercentage }) => (
                    <SelectItem key={college.id} value={college.id}>
                      {college.name} ({Math.round(matchPercentage)}% Match)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {selectedCollege ? (
            <CollegeJourney college={selectedCollege} />
          ) : (
            <div className="text-center p-8">
              <p>Select a college to view application journey.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="visa" className="mt-0">
          {selectedCollege ? (
            <VisaJourney countryLocation={selectedCollege.location} />
          ) : (
            <div className="text-center p-8">
              <p>Select a college to view visa journey.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="tracker" className="mt-0">
          <ApplicationTracker savedColleges={savedColleges} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JourneyTabs;
