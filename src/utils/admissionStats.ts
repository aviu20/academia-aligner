import { College } from '@/data/collegeData';
import { UserProfile } from '@/data/userData';

export interface AdmissionPercentiles {
  gpa: {
    percentile25: number;
    percentile50: number;
    percentile75: number;
  };
  sat: {
    percentile25: number;
    percentile50: number;
    percentile75: number;
  };
  act: {
    percentile25: number;
    percentile50: number;
    percentile75: number;
  };
}

export interface AdmissionFitResult {
  gpa: {
    userValue: number;
    collegeMid: number;
    percentileBucket: '75+' | '50-75' | '25-50' | '<25';
    percentageAdmitted: number;
    status: 'strong' | 'competitive' | 'reach';
  };
  sat: {
    userValue: number;
    collegeMid: number;
    percentileBucket: '75+' | '50-75' | '25-50' | '<25';
    percentageAdmitted: number;
    status: 'strong' | 'competitive' | 'reach';
  };
  act: {
    userValue: number;
    collegeMid: number;
    percentileBucket: '75+' | '50-75' | '25-50' | '<25';
    percentageAdmitted: number;
    status: 'strong' | 'competitive' | 'reach';
  };
  weakestFactor: 'GPA' | 'SAT' | 'ACT';
  strongestFactor: 'GPA' | 'SAT' | 'ACT';
}

/**
 * Calculate admission percentiles based on average scores
 * This creates realistic distribution around the college's average
 */
export function calculateAdmissionPercentiles(college: College): AdmissionPercentiles {
  // GPA percentiles (typically narrow range for selective schools)
  const gpaRange = college.acceptanceRate < 0.1 ? 0.15 : 0.25;
  
  return {
    gpa: {
      percentile25: Math.max(2.0, college.averageGPA - gpaRange),
      percentile50: college.averageGPA,
      percentile75: Math.min(4.0, college.averageGPA + (gpaRange * 0.5))
    },
    sat: {
      percentile25: Math.max(800, college.averageSAT - 100),
      percentile50: college.averageSAT,
      percentile75: Math.min(1600, college.averageSAT + 80)
    },
    act: {
      percentile25: Math.max(10, college.averageACT - 3),
      percentile50: college.averageACT,
      percentile75: Math.min(36, college.averageACT + 2)
    }
  };
}

/**
 * Determine which percentile bucket a user falls into and what % of students
 * with similar scores get admitted
 */
export function calculateAdmissionFit(
  userProfile: UserProfile,
  college: College
): AdmissionFitResult {
  const percentiles = calculateAdmissionPercentiles(college);
  
  // Calculate GPA fit
  const gpaFit = calculateScoreFit(
    userProfile.gpa,
    percentiles.gpa.percentile25,
    percentiles.gpa.percentile50,
    percentiles.gpa.percentile75
  );
  
  // Calculate SAT fit
  const satFit = calculateScoreFit(
    userProfile.satScore,
    percentiles.sat.percentile25,
    percentiles.sat.percentile50,
    percentiles.sat.percentile75
  );
  
  // Calculate ACT fit
  const actFit = calculateScoreFit(
    userProfile.actScore,
    percentiles.act.percentile25,
    percentiles.act.percentile50,
    percentiles.act.percentile75
  );
  
  // Determine weakest and strongest factors
  const factors = [
    { name: 'GPA' as const, rank: gpaFit.rank },
    { name: 'SAT' as const, rank: satFit.rank },
    { name: 'ACT' as const, rank: actFit.rank }
  ];
  
  factors.sort((a, b) => a.rank - b.rank);
  const weakestFactor = factors[0].name;
  const strongestFactor = factors[2].name;
  
  return {
    gpa: {
      userValue: userProfile.gpa,
      collegeMid: percentiles.gpa.percentile50,
      percentileBucket: gpaFit.bucket,
      percentageAdmitted: gpaFit.percentageAdmitted,
      status: gpaFit.status
    },
    sat: {
      userValue: userProfile.satScore,
      collegeMid: percentiles.sat.percentile50,
      percentileBucket: satFit.bucket,
      percentageAdmitted: satFit.percentageAdmitted,
      status: satFit.status
    },
    act: {
      userValue: userProfile.actScore,
      collegeMid: percentiles.act.percentile50,
      percentileBucket: actFit.bucket,
      percentageAdmitted: actFit.percentageAdmitted,
      status: actFit.status
    },
    weakestFactor,
    strongestFactor
  };
}

interface ScoreFitResult {
  bucket: '75+' | '50-75' | '25-50' | '<25';
  percentageAdmitted: number;
  status: 'strong' | 'competitive' | 'reach';
  rank: number; // for comparison
}

function calculateScoreFit(
  userScore: number,
  p25: number,
  p50: number,
  p75: number
): ScoreFitResult {
  // 75th percentile or above (top 25% of admitted students)
  if (userScore >= p75) {
    return {
      bucket: '75+',
      percentageAdmitted: 25, // Top 25% of admitted students
      status: 'strong',
      rank: 4
    };
  }
  
  // Between 50th and 75th percentile (middle 25%)
  if (userScore >= p50) {
    return {
      bucket: '50-75',
      percentageAdmitted: 25, // Middle-upper 25%
      status: 'competitive',
      rank: 3
    };
  }
  
  // Between 25th and 50th percentile (middle-lower 25%)
  if (userScore >= p25) {
    return {
      bucket: '25-50',
      percentageAdmitted: 25, // Middle-lower 25%
      status: 'competitive',
      rank: 2
    };
  }
  
  // Below 25th percentile (bottom 25%)
  return {
    bucket: '<25',
    percentageAdmitted: 25, // Bottom 25%
    status: 'reach',
    rank: 1
  };
}
