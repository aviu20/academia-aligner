
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CollegeList from '@/components/colleges/CollegeList';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserProfile } from '@/data/userData';

const Results: React.FC = () => {
  const { profile } = useUserProfile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 px-4 pb-12">
        <div className="max-w-5xl mx-auto">
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
          </div>
          
          <CollegeList />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
