
import React from 'react';
import { Calendar, Check, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface TimelineStep {
  id: number;
  title: string;
  description: string;
  deadline?: string; // ISO date string
  completed?: boolean;
  link?: {
    url: string;
    label: string;
  };
}

interface ApplicationTimelineProps {
  steps: TimelineStep[];
  onStepComplete?: (stepId: number) => void;
}

const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({
  steps,
  onStepComplete
}) => {
  // Check if deadline is approaching (within 14 days)
  const isDeadlineApproaching = (deadline?: string) => {
    if (!deadline) return false;
    
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const differenceInDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    return differenceInDays > 0 && differenceInDays <= 14;
  };
  
  // Check if deadline has passed
  const isDeadlinePassed = (deadline?: string) => {
    if (!deadline) return false;
    
    const deadlineDate = new Date(deadline);
    const today = new Date();
    
    return deadlineDate < today;
  };
  
  // Format date to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:h-full before:w-0.5 before:bg-border md:before:left-9">
      {steps.map((step, index) => {
        const isApproaching = isDeadlineApproaching(step.deadline);
        const isPassed = isDeadlinePassed(step.deadline);
        
        return (
          <div key={step.id} className="relative pl-12 md:pl-20">
            <div className={cn(
              "flex items-center justify-center absolute left-0 top-0 rounded-full w-10 h-10 md:w-18 md:h-18 text-white",
              step.completed ? "bg-green-500" : "bg-primary"
            )}>
              <span className="text-lg font-bold">{step.id}</span>
            </div>
            
            <div className="bg-card shadow-sm rounded-lg p-4 border">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">{step.title}</h3>
                {step.completed && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    <Check className="mr-1 h-3 w-3" /> Completed
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">{step.description}</p>
              
              {step.deadline && (
                <div className={cn(
                  "flex items-center mt-3 text-sm",
                  isApproaching && !step.completed ? "text-amber-600" : 
                  isPassed && !step.completed ? "text-red-600" : 
                  "text-muted-foreground"
                )}>
                  {isApproaching && !step.completed ? (
                    <Clock className="h-4 w-4 mr-1" />
                  ) : (
                    <Calendar className="h-4 w-4 mr-1" />
                  )}
                  <span>
                    Deadline: {formatDate(step.deadline)}
                    {isApproaching && !step.completed && " (Approaching)"}
                    {isPassed && !step.completed && " (Passed)"}
                  </span>
                </div>
              )}
              
              <div className="mt-4 flex flex-wrap gap-2">
                {step.link && (
                  <Button variant="outline" size="sm" className="text-xs h-8" asChild>
                    <a href={step.link.url} target="_blank" rel="noopener noreferrer">
                      {step.link.label} <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                )}
                
                {!step.completed && onStepComplete && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8 border-green-300 text-green-700 hover:bg-green-50"
                    onClick={() => onStepComplete(step.id)}
                  >
                    Mark as Complete
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationTimeline;
