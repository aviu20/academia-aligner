
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hover = true,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "glass dark:glass-dark rounded-xl p-6 transitions-all",
        hover && "hover:shadow-lg hover:translate-y-[-2px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
