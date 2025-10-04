import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AdmissionFitResult } from '@/utils/admissionStats';

interface AcademicMatchBreakdownProps {
  admissionFit: AdmissionFitResult;
}

const AcademicMatchBreakdown: React.FC<AcademicMatchBreakdownProps> = ({ admissionFit }) => {
  const getStatusColor = (status: 'strong' | 'competitive' | 'reach') => {
    switch (status) {
      case 'strong':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'competitive':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'reach':
        return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getStatusIcon = (status: 'strong' | 'competitive' | 'reach') => {
    switch (status) {
      case 'strong':
        return <TrendingUp className="h-4 w-4" />;
      case 'competitive':
        return <Minus className="h-4 w-4" />;
      case 'reach':
        return <TrendingDown className="h-4 w-4" />;
    }
  };

  const getPercentileDescription = (bucket: string) => {
    switch (bucket) {
      case '75+':
        return 'Top 25% of admitted students';
      case '50-75':
        return 'Middle-upper 25% of admitted students';
      case '25-50':
        return 'Middle-lower 25% of admitted students';
      case '<25':
        return 'Bottom 25% of admitted students';
      default:
        return '';
    }
  };

  const getPercentileProgress = (bucket: string) => {
    switch (bucket) {
      case '75+':
        return 100;
      case '50-75':
        return 75;
      case '25-50':
        return 50;
      case '<25':
        return 25;
      default:
        return 0;
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Academic Profile Match</CardTitle>
        <CardDescription>
          See how your scores compare to admitted students at this college
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* GPA Breakdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">GPA Comparison</p>
              <p className="text-xs text-muted-foreground">
                Your GPA: <span className="font-semibold">{admissionFit.gpa.userValue.toFixed(2)}</span> | 
                College Mid-50%: <span className="font-semibold">{admissionFit.gpa.collegeMid.toFixed(2)}</span>
              </p>
            </div>
            <Badge variant="outline" className={`${getStatusColor(admissionFit.gpa.status)} flex items-center gap-1`}>
              {getStatusIcon(admissionFit.gpa.status)}
              {admissionFit.gpa.status.charAt(0).toUpperCase() + admissionFit.gpa.status.slice(1)}
            </Badge>
          </div>
          
          <Progress value={getPercentileProgress(admissionFit.gpa.percentileBucket)} className="h-2" />
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {getPercentileDescription(admissionFit.gpa.percentileBucket)}
            </span>
            <span className="font-medium">
              {admissionFit.gpa.percentageAdmitted}% of admitted class
            </span>
          </div>
        </div>

        {/* Test Score Breakdown */}
        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{admissionFit.testScore.type} Comparison</p>
              <p className="text-xs text-muted-foreground">
                Your {admissionFit.testScore.type}: <span className="font-semibold">{admissionFit.testScore.userValue}</span> | 
                College Mid-50%: <span className="font-semibold">{admissionFit.testScore.collegeMid}</span>
              </p>
            </div>
            <Badge variant="outline" className={`${getStatusColor(admissionFit.testScore.status)} flex items-center gap-1`}>
              {getStatusIcon(admissionFit.testScore.status)}
              {admissionFit.testScore.status.charAt(0).toUpperCase() + admissionFit.testScore.status.slice(1)}
            </Badge>
          </div>
          
          <Progress value={getPercentileProgress(admissionFit.testScore.percentileBucket)} className="h-2" />
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {getPercentileDescription(admissionFit.testScore.percentileBucket)}
            </span>
            <span className="font-medium">
              {admissionFit.testScore.percentageAdmitted}% of admitted class
            </span>
          </div>
        </div>

        {/* Overall Assessment */}
        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            {admissionFit.gpa.status === 'strong' && admissionFit.testScore.status === 'strong' && (
              "Your academic credentials are very competitive for this institution. You're in the top tier of admitted students."
            )}
            {((admissionFit.gpa.status === 'strong' && admissionFit.testScore.status === 'competitive') ||
              (admissionFit.gpa.status === 'competitive' && admissionFit.testScore.status === 'strong')) && (
              "Your academic profile is competitive. You have strong credentials in one area that may compensate for the other."
            )}
            {admissionFit.gpa.status === 'competitive' && admissionFit.testScore.status === 'competitive' && (
              "Your academic profile is in the middle range of admitted students. Strong essays and extracurriculars will be important."
            )}
            {(admissionFit.gpa.status === 'reach' || admissionFit.testScore.status === 'reach') && (
              "This is a reach school for your academic profile. Consider highlighting exceptional achievements in other areas."
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicMatchBreakdown;
