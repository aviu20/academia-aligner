import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { AdmissionFitResult, AdmissionPercentiles } from '@/utils/admissionStats';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface AcademicMatchBreakdownProps {
  admissionFit: AdmissionFitResult;
  percentiles: AdmissionPercentiles;
}

const AcademicMatchBreakdown: React.FC<AcademicMatchBreakdownProps> = ({ admissionFit, percentiles }) => {
  const [showRanges, setShowRanges] = useState(false);
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

        {/* SAT Breakdown */}
        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">SAT Comparison</p>
              <p className="text-xs text-muted-foreground">
                Your SAT: <span className="font-semibold">{admissionFit.sat.userValue}</span> | 
                College Mid-50%: <span className="font-semibold">{admissionFit.sat.collegeMid}</span>
              </p>
            </div>
            <Badge variant="outline" className={`${getStatusColor(admissionFit.sat.status)} flex items-center gap-1`}>
              {getStatusIcon(admissionFit.sat.status)}
              {admissionFit.sat.status.charAt(0).toUpperCase() + admissionFit.sat.status.slice(1)}
            </Badge>
          </div>
          
          <Progress value={getPercentileProgress(admissionFit.sat.percentileBucket)} className="h-2" />
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {getPercentileDescription(admissionFit.sat.percentileBucket)}
            </span>
            <span className="font-medium">
              {admissionFit.sat.percentageAdmitted}% of admitted class
            </span>
          </div>
        </div>

        {/* ACT Breakdown */}
        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">ACT Comparison</p>
              <p className="text-xs text-muted-foreground">
                Your ACT: <span className="font-semibold">{admissionFit.act.userValue}</span> | 
                College Mid-50%: <span className="font-semibold">{admissionFit.act.collegeMid}</span>
              </p>
            </div>
            <Badge variant="outline" className={`${getStatusColor(admissionFit.act.status)} flex items-center gap-1`}>
              {getStatusIcon(admissionFit.act.status)}
              {admissionFit.act.status.charAt(0).toUpperCase() + admissionFit.act.status.slice(1)}
            </Badge>
          </div>
          
          <Progress value={getPercentileProgress(admissionFit.act.percentileBucket)} className="h-2" />
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {getPercentileDescription(admissionFit.act.percentileBucket)}
            </span>
            <span className="font-medium">
              {admissionFit.act.percentageAdmitted}% of admitted class
            </span>
          </div>
        </div>

        {/* Score Ranges Dropdown */}
        <div className="pt-2 border-t border-border/50">
          <Collapsible open={showRanges} onOpenChange={setShowRanges}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full flex items-center justify-between p-2 h-auto">
                <span className="text-xs font-medium">View Admission Score Ranges</span>
                {showRanges ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 space-y-3">
              <div className="text-xs space-y-1 bg-secondary/30 rounded p-2">
                <p className="font-medium">GPA Ranges</p>
                <div className="grid grid-cols-2 gap-1 text-muted-foreground">
                  <span>75th percentile:</span><span className="font-semibold">{percentiles.gpa.percentile75.toFixed(2)}</span>
                  <span>50th percentile:</span><span className="font-semibold">{percentiles.gpa.percentile50.toFixed(2)}</span>
                  <span>25th percentile:</span><span className="font-semibold">{percentiles.gpa.percentile25.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="text-xs space-y-1 bg-secondary/30 rounded p-2">
                <p className="font-medium">SAT Ranges</p>
                <div className="grid grid-cols-2 gap-1 text-muted-foreground">
                  <span>75th percentile:</span><span className="font-semibold">{percentiles.sat.percentile75}</span>
                  <span>50th percentile:</span><span className="font-semibold">{percentiles.sat.percentile50}</span>
                  <span>25th percentile:</span><span className="font-semibold">{percentiles.sat.percentile25}</span>
                </div>
              </div>
              
              <div className="text-xs space-y-1 bg-secondary/30 rounded p-2">
                <p className="font-medium">ACT Ranges</p>
                <div className="grid grid-cols-2 gap-1 text-muted-foreground">
                  <span>75th percentile:</span><span className="font-semibold">{percentiles.act.percentile75}</span>
                  <span>50th percentile:</span><span className="font-semibold">{percentiles.act.percentile50}</span>
                  <span>25th percentile:</span><span className="font-semibold">{percentiles.act.percentile25}</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Overall Assessment */}
        <div className="pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            {(admissionFit.gpa.status === 'strong' && admissionFit.sat.status === 'strong' && admissionFit.act.status === 'strong') && (
              "Your academic credentials are very competitive for this institution. You're in the top tier of admitted students."
            )}
            {((admissionFit.gpa.status === 'strong' || admissionFit.sat.status === 'strong' || admissionFit.act.status === 'strong') &&
              (admissionFit.gpa.status === 'competitive' || admissionFit.sat.status === 'competitive' || admissionFit.act.status === 'competitive')) && (
              "Your academic profile is competitive. You have strong credentials in some areas that may compensate for others."
            )}
            {(admissionFit.gpa.status === 'competitive' && admissionFit.sat.status === 'competitive' && admissionFit.act.status === 'competitive') && (
              "Your academic profile is in the middle range of admitted students. Strong essays and extracurriculars will be important."
            )}
            {(admissionFit.gpa.status === 'reach' || admissionFit.sat.status === 'reach' || admissionFit.act.status === 'reach') && (
              "This is a reach school for your academic profile. Consider highlighting exceptional achievements in other areas."
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicMatchBreakdown;
