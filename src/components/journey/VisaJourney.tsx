
import React, { useState } from 'react';
import { useUserProfile } from '@/data/userData';
import ApplicationTimeline, { TimelineStep } from './ApplicationTimeline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

// Visa requirements by country
const visaRequirements: Record<string, {
  steps: TimelineStep[],
  website: string,
  visaType: string
}> = {
  'United States': {
    visaType: 'F-1 Student Visa',
    website: 'https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html',
    steps: [
      {
        id: 1,
        title: 'Obtain university admission',
        description: 'Receive an acceptance letter from a SEVP-approved school in the United States.',
      },
      {
        id: 2,
        title: 'Pay the SEVIS fee',
        description: 'Pay the I-901 SEVIS Fee after receiving your Form I-20 from the university.',
        link: {
          url: 'https://www.fmjfee.com/',
          label: 'Pay SEVIS Fee'
        }
      },
      {
        id: 3,
        title: 'Complete visa application',
        description: 'Complete the online DS-160 form, Non-immigrant Visa Application.',
        link: {
          url: 'https://ceac.state.gov/genniv/',
          label: 'Complete DS-160'
        }
      },
      {
        id: 4,
        title: 'Schedule visa interview',
        description: 'Schedule an appointment for your visa interview at the U.S. Embassy or Consulate.',
        link: {
          url: 'https://ais.usvisa-info.com/',
          label: 'Schedule Interview'
        }
      },
      {
        id: 5,
        title: 'Attend visa interview',
        description: 'Attend your interview with all required documents and be prepared to answer questions about your study plans.',
      },
      {
        id: 6,
        title: 'Receive visa approval',
        description: 'If approved, you will receive your F-1 student visa stamp in your passport.',
      }
    ]
  },
  'United Kingdom': {
    visaType: 'Student Visa (formerly Tier 4)',
    website: 'https://www.gov.uk/student-visa',
    steps: [
      {
        id: 1,
        title: 'Obtain university admission',
        description: 'Receive a Confirmation of Acceptance for Studies (CAS) from a licensed student sponsor.',
      },
      {
        id: 2,
        title: 'Prepare financial documents',
        description: 'Prepare proof of finances showing you can support yourself and pay for your course.',
      },
      {
        id: 3,
        title: 'Complete visa application',
        description: 'Apply online for a Student visa and pay the application fee and immigration health surcharge.',
        link: {
          url: 'https://www.gov.uk/student-visa/apply',
          label: 'Apply for Student Visa'
        }
      },
      {
        id: 4,
        title: 'Book biometric appointment',
        description: 'Schedule and attend an appointment at a visa application center to provide your fingerprints and photo.',
      },
      {
        id: 5,
        title: 'Submit supporting documents',
        description: 'Submit all required documents, including passport, CAS statement, and financial evidence.',
      },
      {
        id: 6,
        title: 'Receive visa decision',
        description: 'Wait for a decision on your visa application (usually within 3 weeks).',
      }
    ]
  },
  'Canada': {
    visaType: 'Study Permit',
    website: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html',
    steps: [
      {
        id: 1,
        title: 'Obtain university admission',
        description: 'Receive an acceptance letter from a designated learning institution (DLI) in Canada.',
      },
      {
        id: 2,
        title: 'Check visa requirements',
        description: 'Determine if you need a temporary resident visa or electronic travel authorization (eTA) in addition to your study permit.',
        link: {
          url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/eligibility.html',
          label: 'Check Eligibility'
        }
      },
      {
        id: 3,
        title: 'Complete application',
        description: 'Apply online for a study permit and pay the application fees.',
        link: {
          url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/apply.html',
          label: 'Apply for Study Permit'
        }
      },
      {
        id: 4,
        title: 'Submit biometrics',
        description: 'Provide your fingerprints and photo at a biometric collection service point if required.',
      },
      {
        id: 5,
        title: 'Attend interview',
        description: 'Attend an interview at the visa office if requested.',
      },
      {
        id: 6,
        title: 'Receive permit decision',
        description: 'Wait for a decision on your study permit application.',
      }
    ]
  },
  'Australia': {
    visaType: 'Student Visa (Subclass 500)',
    website: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500',
    steps: [
      {
        id: 1,
        title: 'Obtain university admission',
        description: 'Receive a Confirmation of Enrollment (CoE) from an Australian educational institution.',
      },
      {
        id: 2,
        title: 'Prepare for GTE requirement',
        description: 'Prepare documentation for the Genuine Temporary Entrant (GTE) requirement.',
      },
      {
        id: 3,
        title: 'Complete visa application',
        description: 'Apply online for a Student Visa (Subclass 500) and pay the visa application charge.',
        link: {
          url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500',
          label: 'Apply for Student Visa'
        }
      },
      {
        id: 4,
        title: 'Arrange health examination',
        description: 'Undergo a health examination if required for your visa application.',
      },
      {
        id: 5,
        title: 'Provide biometrics',
        description: 'Provide your biometrics at an Australian Visa Application Centre if required.',
      },
      {
        id: 6,
        title: 'Receive visa decision',
        description: 'Wait for a decision on your student visa application.',
      }
    ]
  },
  // Add more countries as needed
};

// Default steps if country-specific steps aren't available
const defaultVisaSteps: TimelineStep[] = [
  {
    id: 1,
    title: 'Obtain university admission',
    description: 'Receive an official acceptance letter from your chosen university.',
  },
  {
    id: 2,
    title: 'Check visa requirements',
    description: 'Research the specific student visa requirements for your destination country.',
  },
  {
    id: 3,
    title: 'Complete visa application',
    description: 'Fill out the visa application form and gather all required documents.',
  },
  {
    id: 4,
    title: 'Pay visa application fee',
    description: 'Pay the required visa application fee through the specified payment method.',
  },
  {
    id: 5,
    title: 'Attend visa interview',
    description: 'Attend your visa interview with all required documents.',
  },
  {
    id: 6,
    title: 'Receive visa approval',
    description: 'If approved, you will receive your student visa.',
  }
];

// Helper to get visa requirements based on college location
const getVisaRequirements = (countryLocation: string) => {
  // Map college location to country for visa requirements
  let country = '';
  
  if (countryLocation === 'West Coast' || countryLocation === 'East Coast' || 
      countryLocation === 'Midwest' || countryLocation === 'South') {
    country = 'United States';
  } else if (countryLocation === 'United Kingdom') {
    country = 'United Kingdom';
  } else if (countryLocation === 'Canada') {
    country = 'Canada';
  } else if (countryLocation === 'Australia') {
    country = 'Australia';
  } else {
    return {
      visaType: 'Student Visa',
      website: '',
      steps: defaultVisaSteps
    };
  }
  
  return visaRequirements[country] || {
    visaType: 'Student Visa',
    website: '',
    steps: defaultVisaSteps
  };
};

interface VisaJourneyProps {
  countryLocation: string;
}

const VisaJourney: React.FC<VisaJourneyProps> = ({ countryLocation }) => {
  const { profile } = useUserProfile();
  const visaInfo = getVisaRequirements(countryLocation);
  
  // Only show visa journey for international students
  if (!profile.isInternationalStudent) {
    return (
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="px-0">
          <CardTitle>Visa Information</CardTitle>
          <CardDescription>
            Information about visa requirements for studying abroad
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Not applicable</AlertTitle>
            <AlertDescription>
              You are listed as a domestic student, so visa information is not applicable. 
              If you are an international student, please update your profile.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  const [steps, setSteps] = useState<TimelineStep[]>(visaInfo.steps);
  
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
        <CardTitle>Visa Application Journey</CardTitle>
        <CardDescription>
          {visaInfo.visaType} for studying in {countryLocation}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {visaInfo.website && (
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Official Visa Information</AlertTitle>
            <AlertDescription>
              For the most up-to-date and accurate information, please visit the{' '}
              <a 
                href={visaInfo.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium underline hover:text-primary"
              >
                official {countryLocation} visa website
              </a>.
            </AlertDescription>
          </Alert>
        )}
        
        <ApplicationTimeline 
          steps={steps} 
          onStepComplete={handleStepComplete} 
        />
      </CardContent>
    </Card>
  );
};

export default VisaJourney;
