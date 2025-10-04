
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import CollegeSwipeCard from './CollegeSwipeCard';
import { College } from '@/data/collegeData';
import CollegeCard from './CollegeCard';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface SwipeableCollegeStackProps {
  matches: Array<{
    college: College;
    matchPercentage: number;
    matchReasons: string[];
    cautionPoints: string[];
    admissionFit?: any;
    scores?: {
      academicScore: number;
      majorScore: number;
      locationScore: number;
      financialScore: number;
      lifestyleScore: number;
      extracurricularScore: number;
      internationalScore?: number;
    };
  }>;
  onSwipe: (college: College, direction: 'left' | 'right') => void;
  isInternational: boolean;
}

const SwipeableCollegeStack: React.FC<SwipeableCollegeStackProps> = ({
  matches,
  onSwipe,
  isInternational
}) => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState<number | null>(null);
  const [openDetailId, setOpenDetailId] = useState<string | null>(null);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const currentMatch = matches[currentIndex];
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      setExitX(info.offset.x);
      
      setTimeout(() => {
        if (currentMatch) {
          onSwipe(currentMatch.college, direction);
          toast(direction === 'right' ? 'College saved to your list!' : 'College skipped');
        }
        
        setCurrentIndex((prev) => {
          // If we've reached the end, loop back to the beginning
          if (prev >= matches.length - 1) {
            return 0;
          }
          return prev + 1;
        });
        
        setExitX(null);
        x.set(0);
      }, 200);
    } else {
      // Reset if not enough to trigger a swipe
      x.set(0);
    }
  };
  
  if (!currentMatch) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="mb-4">No more colleges to review right now.</p>
        <Button onClick={() => setCurrentIndex(0)}>
          Start over
        </Button>
      </div>
    );
  }
  
  return (
    <div className="relative flex justify-center items-center w-full overflow-hidden pt-4 pb-16">
      <motion.div
        style={{
          x,
          rotate,
          opacity,
          position: 'relative',
          width: '100%',
          maxWidth: '384px',
          margin: '0 auto',
        }}
        drag="x" // Enable drag for all devices, not just mobile
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={{ x: exitX || 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Dialog open={openDetailId === currentMatch.college.id} onOpenChange={(open) => {
          if (!open) setOpenDetailId(null);
        }}>
          <DialogTrigger asChild>
            <div>
              <CollegeSwipeCard
                college={currentMatch.college}
                matchPercentage={currentMatch.matchPercentage}
                matchReasons={currentMatch.matchReasons}
                onViewDetails={() => setOpenDetailId(currentMatch.college.id)}
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <CollegeCard
              college={currentMatch.college}
              matchPercentage={currentMatch.matchPercentage}
              matchReasons={currentMatch.matchReasons}
              cautionPoints={currentMatch.cautionPoints}
              isInternational={isInternational}
              initialExpanded={true} // Always initially expanded in the dialog
              admissionFit={currentMatch.admissionFit}
              matchBreakdown={{
                academic: Math.round(currentMatch.scores?.academicScore * 100) || 75,
                major: Math.round(currentMatch.scores?.majorScore * 100) || 80,
                location: Math.round(currentMatch.scores?.locationScore * 100) || 90,
                financials: Math.round(currentMatch.scores?.financialScore * 100) || 60,
                lifestyle: Math.round(currentMatch.scores?.lifestyleScore * 100) || 85,
                extracurricular: Math.round(currentMatch.scores?.extracurricularScore * 100) || 70,
                international: isInternational ? 
                  (Math.round(currentMatch.scores?.internationalScore * 100) || 80) : undefined
              }}
            />
          </DialogContent>
        </Dialog>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-8 py-6">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-red-100 hover:bg-red-200 border-red-300 text-red-500 h-12 w-12"
          onClick={() => {
            setExitX(-200);
            setTimeout(() => {
              if (currentMatch) {
                onSwipe(currentMatch.college, 'left');
                toast('College skipped');
              }
              setCurrentIndex((prev) => (prev >= matches.length - 1) ? 0 : prev + 1);
              setExitX(null);
              x.set(0);
            }, 200);
          }}
        >
          ✕
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full bg-green-100 hover:bg-green-200 border-green-300 text-green-500 h-12 w-12"
          onClick={() => {
            setExitX(200);
            setTimeout(() => {
              if (currentMatch) {
                onSwipe(currentMatch.college, 'right');
                toast('College saved to your list!');
              }
              setCurrentIndex((prev) => (prev >= matches.length - 1) ? 0 : prev + 1);
              setExitX(null);
              x.set(0);
            }, 200);
          }}
        >
          ❤
        </Button>
      </div>
    </div>
  );
};

export default SwipeableCollegeStack;
