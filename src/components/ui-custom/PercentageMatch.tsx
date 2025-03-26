
import React from 'react';
import { cn } from '@/lib/utils';

interface PercentageMatchProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const PercentageMatch: React.FC<PercentageMatchProps> = ({
  percentage,
  size = 'md',
  showLabel = true,
  className
}) => {
  // Determine color based on percentage
  const getColor = (percent: number) => {
    if (percent >= 85) return 'bg-emerald-500';
    if (percent >= 70) return 'bg-blue-500';
    if (percent >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  // Determine size classes
  const sizeClasses = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-32 h-32 text-3xl'
  };

  const borderWidth = {
    sm: 'border-[3px]',
    md: 'border-4',
    lg: 'border-[5px]'
  };

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div 
        className={cn(
          "rounded-full flex items-center justify-center font-semibold text-white",
          sizeClasses[size],
          "border border-background",
          getColor(percentage)
        )}
      >
        <div className="animate-fade-in">
          {percentage}%
        </div>
      </div>
      
      {showLabel && (
        <div className="mt-2 text-sm font-medium text-muted-foreground">
          Match Score
        </div>
      )}
    </div>
  );
};

export default PercentageMatch;
