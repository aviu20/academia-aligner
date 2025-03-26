
import { UserProfile } from '../data/userData';
import { College } from '../data/collegeData';

interface CollegeMatch {
  college: College;
  matchPercentage: number;
  matchReasons: string[];
  cautionPoints: string[];
}

// Weights based on Common Data Set Section C7 importance ratings
// We adjust weights dynamically based on each college's admissionFactors
function getWeightsForCollege(college: College, isInternational: boolean) {
  // Base weights from Common Data Set priorities
  // Convert the 0-5 scale to decimal weights
  const totalImportance = Object.values(college.admissionFactors).reduce((sum, val) => sum + val, 0);
  
  const baseWeights = {
    academics: (college.admissionFactors.academicRigor + 
                college.admissionFactors.academicGPA + 
                college.admissionFactors.standardizedTests) / (totalImportance * 3),
    major: 0.1, // Standard weight for major match
    location: college.admissionFactors.geographicResidence / totalImportance,
    financials: 0.1, // Standard weight for financials
    lifestyle: 0.05, // Reduced weight for lifestyle factors
    extracurricular: college.admissionFactors.extracurricular / totalImportance,
    essay: college.admissionFactors.applicationEssay / totalImportance,
    recommendation: college.admissionFactors.recommendation / totalImportance,
    specialTalent: college.admissionFactors.talentAbility / totalImportance,
    volunteerWork: college.admissionFactors.volunteerWork / totalImportance,
    workExperience: college.admissionFactors.workExperience / totalImportance,
    character: college.admissionFactors.characterPersonal / totalImportance,
  };
  
  // Add international student specific weights if applicable
  if (isInternational) {
    return {
      ...baseWeights,
      // Add weight for international factors (visa support, scholarships)
      international: 0.15,
      // Slightly reduce other weights to make room for international factors
      academics: baseWeights.academics * 0.9,
      lifestyle: baseWeights.lifestyle * 0.8,
    };
  }
  
  return baseWeights;
}

export function calculateCollegeMatches(userProfile: UserProfile, colleges: College[]): CollegeMatch[] {
  return colleges.map(college => {
    // Get dynamic weights based on this college's priorities and user's international status
    const weights = getWeightsForCollege(college, userProfile.isInternationalStudent);
    
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
    
    // Common Data Set factor scores
    const academicRigorScore = normalize(userProfile.academicRigorScore, 1, 5) * 
                              normalize(college.admissionFactors.academicRigor, 0, 5);
    
    const classRankScore = userProfile.classRank ? 
                           (userProfile.classRank / 100) * normalize(college.admissionFactors.classRank, 0, 5) : 0.5;
    
    const essayScore = normalize(userProfile.essayQuality, 1, 5) * 
                       normalize(college.admissionFactors.applicationEssay, 0, 5);
    
    const recommendationScore = userProfile.hasRecommendationLetters ? 
                               normalize(college.admissionFactors.recommendation, 0, 5) : 0.3;
    
    const extracurricularScore = userProfile.hasSignificantExtracurriculars ? 
                                normalize(college.admissionFactors.extracurricular, 0, 5) : 0.3;
    
    const talentScore = userProfile.hasSpecialTalent ? 
                       normalize(college.admissionFactors.talentAbility, 0, 5) : 0.3;
    
    const volunteerScore = userProfile.hasVolunteerExperience ? 
                          normalize(college.admissionFactors.volunteerWork, 0, 5) : 0.3;
    
    const workExperienceScore = userProfile.hasWorkExperience ? 
                               normalize(college.admissionFactors.workExperience, 0, 5) : 0.3;
    
    // International student specific scores
    let internationalScore = 0.5; // Default value
    
    if (userProfile.isInternationalStudent) {
      const englishScore = calculateEnglishProficiencyMatch(
        userProfile.englishProficiency,
        college.englishRequirements
      );
      
      const visaSupportScore = normalize(college.visaSupport, 1, 5);
      
      const scholarshipScore = userProfile.needsScholarship && college.internationalScholarships ? 1.0 : 
                              (userProfile.needsScholarship ? 0.2 : 0.8);
      
      internationalScore = (englishScore + visaSupportScore + scholarshipScore) / 3;
    }
    
    // Calculate weighted total score
    let totalScore = (
      academicScore * weights.academics +
      majorScore * weights.major +
      locationScore * weights.location +
      financialScore * weights.financials +
      lifestyleScore * weights.lifestyle +
      academicRigorScore * weights.academics +
      classRankScore * weights.academics +
      essayScore * weights.essay +
      recommendationScore * weights.recommendation +
      extracurricularScore * weights.extracurricular +
      talentScore * weights.specialTalent +
      volunteerScore * weights.volunteerWork +
      workExperienceScore * weights.workExperience
    );
    
    // Add international score if user is international
    if (userProfile.isInternationalStudent && weights.international) {
      totalScore += internationalScore * weights.international;
    }
    
    // Convert to percentage
    const matchPercentage = Math.round(Math.min(totalScore * 100, 100));
    
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
        dormLifeScore,
        internationalScore,
        academicRigorScore,
        essayScore,
        extracurricularScore
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
        financialScore,
        internationalScore
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

function calculateEnglishProficiencyMatch(
  userScores: {toefl?: number, ielts?: number}, 
  collegeRequirements: {toefl: number, ielts: number}
): number {
  // If user has both scores, use the one that's a better match
  if (userScores.toefl && userScores.ielts) {
    const toeflMatch = userScores.toefl >= collegeRequirements.toefl ? 1.0 : 
                     Math.max(0, 1.0 - (collegeRequirements.toefl - userScores.toefl) / 30);
    
    const ieltsMatch = userScores.ielts >= collegeRequirements.ielts ? 1.0 : 
                     Math.max(0, 1.0 - (collegeRequirements.ielts - userScores.ielts) / 2);
    
    return Math.max(toeflMatch, ieltsMatch);
  }
  
  // If user only has TOEFL
  if (userScores.toefl) {
    return userScores.toefl >= collegeRequirements.toefl ? 1.0 : 
         Math.max(0, 1.0 - (collegeRequirements.toefl - userScores.toefl) / 30);
  }
  
  // If user only has IELTS
  if (userScores.ielts) {
    return userScores.ielts >= collegeRequirements.ielts ? 1.0 : 
         Math.max(0, 1.0 - (collegeRequirements.ielts - userScores.ielts) / 2);
  }
  
  // If user has no English scores, use a default value
  return 0.5;
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
    internationalScore?: number;
    academicRigorScore: number;
    essayScore: number;
    extracurricularScore: number;
  }
): string[] {
  const reasons: string[] = [];
  
  // Academic fit
  if (scores.academicScore > 0.9) {
    reasons.push(`Strong academic match for your profile (GPA, test scores)`);
  } else if (scores.academicScore > 0.7) {
    reasons.push(`Good academic fit for your profile`);
  }
  
  // Academic rigor appreciation
  if (scores.academicRigorScore > 0.9 && college.admissionFactors.academicRigor >= 4) {
    reasons.push(`Your rigorous academic background is highly valued here`);
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
  
  // Extracurricular appreciation
  if (user.hasSignificantExtracurriculars && scores.extracurricularScore > 0.8) {
    reasons.push(`Values your extracurricular involvement`);
  }
  
  // Essay quality match
  if (scores.essayScore > 0.9 && user.essayQuality >= 4) {
    reasons.push(`Your strong essays align with their admissions priorities`);
  }
  
  // International student specific reasons
  if (user.isInternationalStudent && scores.internationalScore && scores.internationalScore > 0.8) {
    reasons.push(`Strong support for international students (${college.internationalStudentPercentage}% international population)`);
    
    if (college.visaSupport >= 4) {
      reasons.push(`Excellent visa and immigration support services`);
    }
    
    if (user.needsScholarship && college.internationalScholarships) {
      reasons.push(`Offers scholarships for international students`);
    }
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
    internationalScore?: number;
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
  
  // International student concerns
  if (user.isInternationalStudent) {
    if (scores.internationalScore && scores.internationalScore < 0.6) {
      cautions.push(`Limited resources for international students`);
    }
    
    // English proficiency concerns
    if (user.englishProficiency.toefl && user.englishProficiency.toefl < college.englishRequirements.toefl) {
      cautions.push(`Your TOEFL score (${user.englishProficiency.toefl}) is below their requirement (${college.englishRequirements.toefl})`);
    }
    
    if (user.englishProficiency.ielts && user.englishProficiency.ielts < college.englishRequirements.ielts) {
      cautions.push(`Your IELTS score (${user.englishProficiency.ielts}) is below their requirement (${college.englishRequirements.ielts})`);
    }
    
    if (user.needsScholarship && !college.internationalScholarships) {
      cautions.push(`Limited scholarship opportunities for international students`);
    }
  }
  
  // Highly competitive
  if (college.acceptanceRate < 0.1 && scores.academicScore < 0.9) {
    cautions.push(`Highly competitive admission process (${(college.acceptanceRate * 100).toFixed(1)}% acceptance rate)`);
  }
  
  return cautions;
}
