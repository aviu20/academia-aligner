
import { UserProfile } from '../data/userData';
import { College } from '../data/collegeData';

interface CollegeMatch {
  college: College;
  matchPercentage: number;
  matchReasons: string[];
  cautionPoints: string[];
}

// Weights for different factors in the matching algorithm (total should be 1.0)
const WEIGHTS = {
  academics: 0.4,  // GPA, SAT/ACT scores
  major: 0.2,      // Alignment with intended major
  location: 0.1,   // Preferred location
  financials: 0.1, // Tuition considerations
  lifestyle: 0.2,  // Sports, research, dorm life
};

export function calculateCollegeMatches(userProfile: UserProfile, colleges: College[]): CollegeMatch[] {
  return colleges.map(college => {
    // Calculate academic score (GPA, SAT/ACT)
    const gpaScore = calculateGpaMatch(userProfile.gpa, college.averageGPA);
    const satScore = calculateSatMatch(userProfile.satScore, college.averageSAT);
    const actScore = calculateActMatch(userProfile.actScore, college.averageACT);
    
    // Use better of SAT or ACT score
    const testScore = Math.max(satScore, actScore);
    
    // Combined academic score
    const academicScore = (gpaScore + testScore) / 2;
    
    // Major match score
    const majorScore = calculateMajorMatch(userProfile.intendedMajor, college.strongMajors);
    
    // Location match
    const locationScore = userProfile.preferredLocation === college.location ? 1.0 : 0.5;
    
    // Financial match (is tuition within budget?)
    const financialScore = userProfile.maxTuition >= college.tuition ? 
      1.0 : 1.0 - ((college.tuition - userProfile.maxTuition) / college.tuition);
    
    // Lifestyle matches
    const sportsScore = calculatePreferenceMatch(
      userProfile.sportsImportance, 
      college.sportsRanking
    );
    
    const researchScore = calculatePreferenceMatch(
      userProfile.researchOpportunitiesImportance,
      college.researchOpportunities
    );
    
    const dormLifeScore = userProfile.interestsInDormLife ? 
      normalize(college.dormLifeQuality, 1, 5) : 0.5;
    
    const lifestyleScore = (sportsScore + researchScore + dormLifeScore) / 3;
    
    // Calculate weighted total score
    const totalScore = (
      academicScore * WEIGHTS.academics +
      majorScore * WEIGHTS.major +
      locationScore * WEIGHTS.location +
      financialScore * WEIGHTS.financials +
      lifestyleScore * WEIGHTS.lifestyle
    );
    
    // Convert to percentage
    const matchPercentage = Math.round(totalScore * 100);
    
    // Generate match reasons
    const matchReasons = generateMatchReasons(
      userProfile, 
      college, 
      {
        academicScore,
        majorScore,
        locationScore, 
        financialScore,
        lifestyleScore,
        sportsScore,
        researchScore,
        dormLifeScore
      }
    );
    
    // Generate caution points
    const cautionPoints = generateCautionPoints(
      userProfile,
      college,
      {
        academicScore,
        majorScore,
        locationScore,
        financialScore
      }
    );
    
    return {
      college,
      matchPercentage,
      matchReasons,
      cautionPoints
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}

// Helper functions for calculating individual match scores

function calculateGpaMatch(userGpa: number, collegeGpa: number): number {
  if (userGpa >= collegeGpa) return 1.0;
  // Calculate how close the user is to the college's average GPA
  const gap = collegeGpa - userGpa;
  return Math.max(0, 1.0 - gap/collegeGpa);
}

function calculateSatMatch(userSat: number, collegeSat: number): number {
  if (userSat >= collegeSat) return 1.0;
  // Calculate how close the user is to the college's average SAT
  const gap = collegeSat - userSat;
  return Math.max(0, 1.0 - gap/600); // Approximate reasonable SAT score gap
}

function calculateActMatch(userAct: number, collegeAct: number): number {
  if (userAct >= collegeAct) return 1.0;
  // Calculate how close the user is to the college's average ACT
  const gap = collegeAct - userAct;
  return Math.max(0, 1.0 - gap/12); // Approximate reasonable ACT score gap
}

function calculateMajorMatch(userMajor: string, collegeStrongMajors: string[]): number {
  if (collegeStrongMajors.includes(userMajor)) return 1.0;
  // If not a direct match, look for partial matches
  const partialMatches = collegeStrongMajors.some(major => 
    major.includes(userMajor) || userMajor.includes(major)
  );
  return partialMatches ? 0.7 : 0.4;
}

function calculatePreferenceMatch(importance: number, collegeFactor: number): number {
  if (importance <= 2) return 0.5; // User doesn't care much
  // The closer the college's rating is to 5, the better
  return normalize(collegeFactor, 1, 5) * (importance / 5);
}

function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

function generateMatchReasons(
  user: UserProfile, 
  college: College, 
  scores: {
    academicScore: number;
    majorScore: number;
    locationScore: number;
    financialScore: number;
    lifestyleScore: number;
    sportsScore: number;
    researchScore: number;
    dormLifeScore: number;
  }
): string[] {
  const reasons: string[] = [];
  
  // Academic fit
  if (scores.academicScore > 0.9) {
    reasons.push(`Strong academic match for your profile (GPA, test scores)`);
  } else if (scores.academicScore > 0.7) {
    reasons.push(`Good academic fit for your profile`);
  }
  
  // Major match
  if (scores.majorScore > 0.9) {
    reasons.push(`${college.name} is known for excellence in ${user.intendedMajor}`);
  } else if (scores.majorScore > 0.7) {
    reasons.push(`Offers solid programs related to your academic interests`);
  }
  
  // Location match
  if (scores.locationScore > 0.9) {
    reasons.push(`Located in your preferred region (${college.location})`);
  }
  
  // Financial match
  if (scores.financialScore > 0.9) {
    reasons.push(`Tuition is within your specified budget`);
  }
  
  // Sports importance
  if (user.sportsImportance >= 4 && scores.sportsScore > 0.8) {
    reasons.push(`Strong athletics program matching your interest in sports`);
  }
  
  // Research importance
  if (user.researchOpportunitiesImportance >= 4 && scores.researchScore > 0.8) {
    reasons.push(`Excellent research opportunities aligned with your priorities`);
  }
  
  // Dorm life
  if (user.interestsInDormLife && scores.dormLifeScore > 0.8) {
    reasons.push(`Well-regarded dorm life and campus community`);
  }
  
  // Acceptance rate context (if the user is a strong candidate)
  if (scores.academicScore > 0.9 && college.acceptanceRate < 0.1) {
    reasons.push(`Your academic profile aligns with their selective admissions standards`);
  }
  
  // Add a catch-all if we don't have many specific reasons
  if (reasons.length < 2) {
    reasons.push(`Overall good match based on your combined preferences`);
  }
  
  return reasons;
}

function generateCautionPoints(
  user: UserProfile,
  college: College,
  scores: {
    academicScore: number;
    majorScore: number;
    locationScore: number;
    financialScore: number;
  }
): string[] {
  const cautions: string[] = [];
  
  // Academic challenges
  if (scores.academicScore < 0.7) {
    cautions.push(`Your academic profile is below their typical admitted student`);
  }
  
  // Major concerns
  if (scores.majorScore < 0.5) {
    cautions.push(`${user.intendedMajor} is not listed among their strongest programs`);
  }
  
  // Location mismatch
  if (scores.locationScore < 0.7) {
    cautions.push(`Not in your preferred location (${user.preferredLocation})`);
  }
  
  // Financial concerns
  if (scores.financialScore < 0.8) {
    const gap = college.tuition - user.maxTuition;
    cautions.push(`Tuition exceeds your specified budget by $${gap.toLocaleString()}`);
  }
  
  // Highly competitive
  if (college.acceptanceRate < 0.1 && scores.academicScore < 0.9) {
    cautions.push(`Highly competitive admission process (${(college.acceptanceRate * 100).toFixed(1)}% acceptance rate)`);
  }
  
  return cautions;
}
