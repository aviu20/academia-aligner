
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CollegeList from '@/components/colleges/CollegeList';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserProfile } from '@/data/userData';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

const Results: React.FC = () => {
  const { profile } = useUserProfile();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className={`flex-grow ${isMobile ? 'pt-16 px-2' : 'pt-24 px-4'} pb-12`}>
        <div className="max-w-5xl mx-auto">
          {!isMobile && (
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Your College Matches</h1>
                <Link to="/">
                  <Button variant="outline" size="sm" className="transitions-all">
                    Update Profile
                  </Button>
                </Link>
              </div>
              
              <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                <h2 className="text-sm font-medium mb-2">Profile Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="block text-muted-foreground">GPA</span>
                    <span className="font-medium">{profile.gpa}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground">SAT / ACT</span>
                    <span className="font-medium">{profile.satScore} / {profile.actScore}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground">Major</span>
                    <span className="font-medium">{profile.intendedMajor}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground">Location</span>
                    <span className="font-medium">{profile.preferredLocation}</span>
                  </div>
                </div>
                
                {profile.isInternationalStudent && (
                  <div className="mt-3 pt-3 border-t border-border/30">
                    <Badge variant="outline" className="mb-2">International Student</Badge>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {profile.englishProficiency.toefl && (
                        <div>
                          <span className="block text-muted-foreground">TOEFL</span>
                          <span className="font-medium">{profile.englishProficiency.toefl}</span>
                        </div>
                      )}
                      {profile.englishProficiency.ielts && (
                        <div>
                          <span className="block text-muted-foreground">IELTS</span>
                          <span className="font-medium">{profile.englishProficiency.ielts}</span>
                        </div>
                      )}
                      <div>
                        <span className="block text-muted-foreground">Needs Scholarship</span>
                        <span className="font-medium">{profile.needsScholarship ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                <span>Match Percentage Explanation</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm p-4">
                      <p className="mb-2">The match percentage is calculated based on several factors:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Academic Fit: How your GPA and test scores align with the college's averages</li>
                        <li>Major Alignment: Whether the college is strong in your chosen field</li>
                        <li>Location: Match with your preferred geographic region</li>
                        <li>Financial Fit: How the tuition aligns with your budget</li>
                        <li>Campus Lifestyle: Sports, research, and dorm life preferences</li>
                        <li>Extracurriculars: How your activities match their priorities</li>
                        {profile.isInternationalStudent && <li>International Support: Resources and scholarships for international students</li>}
                      </ul>
                      <p className="mt-2">Click "Show More" on any college card to see a detailed breakdown.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
          
          {isMobile && (
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">College Matches</h1>
              <Link to="/">
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  Update Profile
                </Button>
              </Link>
            </div>
          )}
          
          <CollegeList />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
