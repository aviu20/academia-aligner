
import React from 'react';

interface PercentageMatchProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
}

const PercentageMatch: React.FC<PercentageMatchProps> = ({ percentage, size = 'md' }) => {
  const roundedPercentage = Math.round(percentage);
  
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-12 h-12 text-lg';
      case 'lg': return 'w-24 h-24 text-3xl';
      case 'md':
      default: return 'w-16 h-16 text-xl';
    }
  };
  
  // Color based on percentage
  const getColorClass = () => {
    if (percentage >= 80) return 'bg-green-100 text-green-700 border-green-300';
    else if (percentage >= 60) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    else return 'bg-red-100 text-red-700 border-red-300';
  };
  
  return (
    <div className={`flex items-center justify-center rounded-full border-2 ${getColorClass()} ${getSizeClass()}`}>
      <span className="font-bold">{roundedPercentage}%</span>
    </div>
  );
};

export default PercentageMatch;
