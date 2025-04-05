
import React, { useState } from 'react';
import ApplicationTimeline, { TimelineStep } from './ApplicationTimeline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { College } from '@/data/collegeData';

const defaultCollegeSteps: TimelineStep[] = [
  {
    id: 1,
    title: 'Research universities',
    description: 'Find universities that meet your academic, financial, and personal preferences.',
    completed: true
  },
  {
    id: 2,
    title: 'Write application essays',
    description: 'Prepare your personal statement and supplemental essays focusing on your strengths and aspirations.',
    deadline: '2024-11-01'
  },
  {
    id: 3,
    title: 'Submit application',
    description: 'Complete and submit your application through the appropriate platform.',
    deadline: '2024-12-01'
  },
  {
    id: 4,
    title: 'Prepare for interviews',
    description: 'Research common interview questions and practice your answers.',
    deadline: '2024-12-15'
  },
  {
    id: 5,
    title: 'Attend interview',
    description: 'Participate in any required interviews, whether in-person or virtual.',
    deadline: '2025-01-15'
  },
  {
    id: 6,
    title: 'Receive admission decision',
    description: 'Wait for the university to make their decision on your application.',
    deadline: '2025-03-31'
  }
];

// Platforms for different colleges
const applicationPlatforms: Record<string, { name: string, url: string }> = {
  commonApp: { 
    name: 'Common Application', 
    url: 'https://www.commonapp.org/' 
  },
  coalitionApp: { 
    name: 'Coalition Application', 
    url: 'https://www.coalitionforcollegeaccess.org/' 
  },
  ucApp: { 
    name: 'UC Application', 
    url: 'https://admission.universityofcalifornia.edu/apply-now.html' 
  },
  direct: { 
    name: 'Direct Application', 
    url: '' // Will be filled with college's own application URL
  }
};

// Helper function to determine application platform based on college
const getApplicationPlatform = (college: College) => {
  // This is a simplified example - in a real app, this information would come from your database
  if (college.name.includes('UC') || college.name.includes('University of California')) {
    return applicationPlatforms.ucApp;
  } else if (['Harvard', 'Yale', 'Princeton', 'Stanford'].some(name => college.name.includes(name))) {
    return applicationPlatforms.commonApp;
  } else {
    const directApp = { ...applicationPlatforms.direct };
    directApp.url = `https://${college.name.toLowerCase().replace(/\s+/g, '')}.edu/admissions`;
    return directApp;
  }
};

// Get application deadlines based on college
const getApplicationDeadlines = (college: College): { regular: string, early?: string } => {
  // Again, this is simplified - real data would come from your database
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  
  // Default deadlines
  const deadlines = {
    regular: `${nextYear}-01-01`,
    early: `${currentYear}-11-01`
  };
  
  // Some colleges have different deadlines
  if (college.name.includes('Ivy League')) {
    deadlines.regular = `${currentYear}-12-15`;
    deadlines.early = `${currentYear}-11-01`;
  } else if (college.name.includes('UC')) {
    deadlines.regular = `${currentYear}-11-30`;
    deadlines.early = undefined;
  }
  
  return deadlines;
};

interface CollegeJourneyProps {
  college: College;
}

const CollegeJourney: React.FC<CollegeJourneyProps> = ({ college }) => {
  const platform = getApplicationPlatform(college);
  const deadlines = getApplicationDeadlines(college);
  
  // Initialize steps with college-specific information
  const [steps, setSteps] = useState<TimelineStep[]>(() => {
    return defaultCollegeSteps.map(step => {
      const updatedStep = { ...step };
      
      // Set college-specific deadlines
      if (step.id === 2 || step.id === 3) {
        updatedStep.deadline = deadlines.early || deadlines.regular;
      } else if (step.id === 6) {
        // Decision date is typically a few months after the application deadline
        const decisionDate = new Date(deadlines.regular);
        decisionDate.setMonth(decisionDate.getMonth() + 3);
        updatedStep.deadline = decisionDate.toISOString().split('T')[0];
      }
      
      // Add application platform link
      if (step.id === 3) {
        updatedStep.link = {
          url: platform.url,
          label: `Apply via ${platform.name}`
        };
      }
      
      return updatedStep;
    });
  });
  
  const handleStepComplete = (stepId: number) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    );
  };
  
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="px-0">
        <CardTitle>Application Journey for {college.name}</CardTitle>
        <CardDescription>
          Track your application progress and upcoming deadlines
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ApplicationTimeline 
          steps={steps} 
          onStepComplete={handleStepComplete} 
        />
        <div className="mt-6">
          <Button asChild className="w-full">
            <a 
              href={`https://${college.name.toLowerCase().replace(/\s+/g, '')}.edu/admissions`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit {college.name} Admissions Page
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollegeJourney;
