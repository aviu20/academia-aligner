
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { College } from '@/data/collegeData';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import PercentageMatch from '../ui-custom/PercentageMatch';
import { useIsMobile } from '@/hooks/use-mobile';

interface CollegeSwipeCardProps {
  college: College;
  matchPercentage: number;
  matchReasons: string[];
  onViewDetails: () => void;
  className?: string;
}

const CollegeSwipeCard: React.FC<CollegeSwipeCardProps> = ({
  college,
  matchPercentage,
  matchReasons,
  onViewDetails,
  className
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className={`w-full max-w-sm mx-auto shadow-lg ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <PercentageMatch percentage={matchPercentage} size={isMobile ? 'sm' : 'md'} />
          <div>
            <h3 className="text-lg font-semibold truncate">{college.name}</h3>
            <p className="text-sm text-muted-foreground">{college.location}</p>
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-sm italic text-gold mb-1">"{college.motto}"</p>
          <p className="text-xs">
            <span className="font-medium">Tuition:</span> ${college.tuition.toLocaleString()} • 
            <span className="font-medium"> Acceptance:</span> {(college.acceptanceRate * 100).toFixed(1)}%
          </p>
        </div>
        
        <div className="border-t border-border pt-3 mb-3">
          <p className="text-xs uppercase font-medium mb-1 text-muted-foreground">Why it's a match</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            {matchReasons.slice(0, 2).map((reason, index) => (
              <li key={index} className="text-sm">{reason}</li>
            ))}
          </ul>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onViewDetails}
          className="w-full flex items-center justify-center text-xs"
        >
          View Details <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CollegeSwipeCard;
