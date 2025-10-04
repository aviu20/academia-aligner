import { UserProfile } from '../data/userData';
import { College } from '../data/collegeData';
import { calculateAdmissionFit, calculateAdmissionPercentiles, type AdmissionFitResult, type AdmissionPercentiles } from './admissionStats';

interface CollegeMatch {
  college: College;
  matchPercentage: number;
  matchReasons: string[];
  cautionPoints: string[];
  admissionFit?: AdmissionFitResult;
  percentiles?: AdmissionPercentiles;
  scores?: {
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
    gpaScore?: number;
    testScore?: number;
  };
}

interface CollegeWeights {
  academics: number;
  major: number;
  location: number;
  financials: number;
  lifestyle: number;
  extracurricular: number;
  essay: number;
  recommendation: number;
  specialTalent: number;
  volunteerWork: number;
  workExperience: number;
  character: number;
  international?: number;
}

const IMPORTANCE_WEIGHTS = {
  veryImportant: 0.4,
  important: 0.3,
  considered: 0.2,
  notConsidered: 0
};

function getWeightsForCollege(college: College, isInternational: boolean): CollegeWeights {
  const totalImportance = Object.values(college.admissionFactors).reduce((sum, val) => sum + val, 0);
  
  const baseWeights: CollegeWeights = {
    academics: (college.admissionFactors.academicRigor + 
                college.admissionFactors.academicGPA + 
                college.admissionFactors.standardizedTests) / (totalImportance * 3),
    major: 0.1,
    location: college.admissionFactors.geographicResidence / totalImportance,
    financials: 0.1,
    lifestyle: 0.05,
    extracurricular: college.admissionFactors.extracurricular / totalImportance,
    essay: college.admissionFactors.applicationEssay / totalImportance,
    recommendation: college.admissionFactors.recommendation / totalImportance,
    specialTalent: college.admissionFactors.talentAbility / totalImportance,
    volunteerWork: college.admissionFactors.volunteerWork / totalImportance,
    workExperience: college.admissionFactors.workExperience / totalImportance,
    character: college.admissionFactors.characterPersonal / totalImportance,
  };
  
  if (isInternational) {
    return {
      ...baseWeights,
      international: 0.15,
      academics: baseWeights.academics * 0.9,
      lifestyle: baseWeights.lifestyle * 0.8,
    };
  }
  
  return baseWeights;
}

export function calculateCollegeMatches(userProfile: UserProfile, colleges: College[]): CollegeMatch[] {
  return colleges.map(college => {
    const weights = getWeightsForCollege(college, userProfile.isInternationalStudent);
    
    const gpaImportance = Math.min(college.admissionFactors.academicGPA / 5, 1) * IMPORTANCE_WEIGHTS.veryImportant;
    const testScoreImportance = Math.min(college.admissionFactors.standardizedTests / 5, 1) * IMPORTANCE_WEIGHTS.important;
    
    const gpaScore = calculateGpaMatch(userProfile.gpa, college.averageGPA) * gpaImportance;
    const satScore = calculateSatMatch(userProfile.satScore, college.averageSAT) * testScoreImportance;
    const actScore = calculateActMatch(userProfile.actScore, college.averageACT) * testScoreImportance;
    
    const testScore = Math.max(satScore, actScore);
    
    const academicScore = (
      gpaScore / gpaImportance + 
      testScore / testScoreImportance
    ) / (gpaImportance > 0 && testScoreImportance > 0 ? 2 : (gpaImportance > 0 || testScoreImportance > 0 ? 1 : 1));
    
    const majorScore = calculateMajorMatch(userProfile.intendedMajor, college.strongMajors);
    const locationScore = userProfile.preferredLocation === college.location ? 1.0 : 0.5;
    const financialScore = userProfile.maxTuition >= college.tuition ? 
      1.0 : 1.0 - ((college.tuition - userProfile.maxTuition) / college.tuition);
    
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
    
    let internationalScore = 0.5;
    
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
    
    let totalScore = (
      academicScore * weights.academics * 1.5 + 
      majorScore * weights.major +
      locationScore * weights.location +
      financialScore * weights.financials +
      lifestyleScore * weights.lifestyle +
      academicRigorScore * weights.academics * 0.5 +
      classRankScore * weights.academics * 0.5 +
      essayScore * weights.essay +
      recommendationScore * weights.recommendation +
      extracurricularScore * weights.extracurricular +
      talentScore * weights.specialTalent +
      volunteerScore * weights.volunteerWork +
      workExperienceScore * weights.workExperience
    );
    
    if (userProfile.isInternationalStudent && weights.international !== undefined) {
      totalScore += internationalScore * weights.international;
    }
    
    const matchPercentage = Math.round(Math.min(totalScore * 100, 100));
    
    const admissionFit = calculateAdmissionFit(userProfile, college);
    const percentiles = calculateAdmissionPercentiles(college);
    
    const scores = {
      gpaScore: gpaScore / gpaImportance,
      testScore: testScore / testScoreImportance,
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
    };
    
    const matchReasons = generateMatchReasons(
      userProfile, 
      college, 
      scores
    );
    
    const cautionPoints = generateCautionPoints(
      userProfile,
      college,
      scores
    );
    
    return {
      college,
      matchPercentage,
      matchReasons,
      cautionPoints,
      admissionFit,
      percentiles,
      scores
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}

function calculateGpaMatch(userGpa: number, collegeGpa: number): number {
  if (userGpa >= collegeGpa + 0.2) return 1.0;
  if (userGpa >= collegeGpa) return 0.9;
  const gap = collegeGpa - userGpa;
  if (gap <= 0.3) return 0.7;
  if (gap <= 0.5) return 0.5;
  return Math.max(0, 1.0 - gap/collegeGpa * 1.5);
}

function calculateSatMatch(userSat: number, collegeSat: number): number {
  if (!userSat || userSat === 0) return 0.5;
  if (userSat >= collegeSat + 100) return 1.0;
  if (userSat >= collegeSat) return 0.9;
  const gap = collegeSat - userSat;
  if (gap <= 50) return 0.8;
  if (gap <= 100) return 0.6;
  if (gap <= 200) return 0.4;
  return Math.max(0, 1.0 - gap/600);
}

function calculateActMatch(userAct: number, collegeAct: number): number {
  if (!userAct || userAct === 0) return 0.5;
  if (userAct >= collegeAct + 3) return 1.0;
  if (userAct >= collegeAct) return 0.9;
  const gap = collegeAct - userAct;
  if (gap <= 1) return 0.8;
  if (gap <= 2) return 0.6;
  if (gap <= 4) return 0.4;
  return Math.max(0, 1.0 - gap/12);
}

function calculateMajorMatch(userMajor: string, collegeStrongMajors: string[]): number {
  if (collegeStrongMajors.includes(userMajor)) return 1.0;
  const partialMatches = collegeStrongMajors.some(major => 
    major.includes(userMajor) || userMajor.includes(major)
  );
  return partialMatches ? 0.7 : 0.4;
}

function calculatePreferenceMatch(importance: number, collegeFactor: number): number {
  if (importance <= 2) return 0.5;
  return normalize(collegeFactor, 1, 5) * (importance / 5);
}

function calculateEnglishProficiencyMatch(
  userScores: {toefl?: number, ielts?: number}, 
  collegeRequirements: {toefl: number, ielts: number}
): number {
  if (userScores.toefl && userScores.ielts) {
    const toeflMatch = userScores.toefl >= collegeRequirements.toefl ? 1.0 : 
                     Math.max(0, 1.0 - (collegeRequirements.toefl - userScores.toefl) / 30);
    
    const ieltsMatch = userScores.ielts >= collegeRequirements.ielts ? 1.0 : 
                     Math.max(0, 1.0 - (collegeRequirements.ielts - userScores.ielts) / 2);
    
    return Math.max(toeflMatch, ieltsMatch);
  }
  
  if (userScores.toefl) {
    return userScores.toefl >= collegeRequirements.toefl ? 1.0 : 
         Math.max(0, 1.0 - (collegeRequirements.toefl - userScores.toefl) / 30);
  }
  
  if (userScores.ielts) {
    return userScores.ielts >= collegeRequirements.ielts ? 1.0 : 
         Math.max(0, 1.0 - (collegeRequirements.ielts - userScores.ielts) / 2);
  }
  
  return 0.5;
}

function normalize(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

function generateMatchReasons(
  user: UserProfile, 
  college: College, 
  scores: {
    gpaScore?: number;
    testScore?: number;
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
  
  if (scores.gpaScore && scores.gpaScore > 0.9) {
    reasons.push(`Your GPA (${user.gpa.toFixed(1)}) is well-matched with their average (${college.averageGPA.toFixed(1)})`);
  }
  
  if (scores.testScore && scores.testScore > 0.9) {
    if (user.satScore > user.actScore * 36) {
      reasons.push(`Your SAT score (${user.satScore}) aligns well with their admitted student profile`);
    } else {
      reasons.push(`Your ACT score (${user.actScore}) aligns well with their admitted student profile`);
    }
  }
  
  if (scores.academicScore > 0.9) {
    reasons.push(`Strong overall academic match for your profile`);
  } else if (scores.academicScore > 0.7) {
    reasons.push(`Good academic fit for your profile`);
  }
  
  if (scores.academicRigorScore > 0.9 && college.admissionFactors.academicRigor >= 4) {
    reasons.push(`Your rigorous academic background is highly valued here`);
  }
  
  if (scores.majorScore > 0.9) {
    reasons.push(`${college.name} is known for excellence in ${user.intendedMajor}`);
  } else if (scores.majorScore > 0.7) {
    reasons.push(`Offers solid programs related to your academic interests`);
  }
  
  if (scores.locationScore > 0.9) {
    reasons.push(`Located in your preferred region (${college.location})`);
  }
  
  if (scores.financialScore > 0.9) {
    reasons.push(`Tuition is within your specified budget`);
  }
  
  if (user.sportsImportance >= 4 && scores.sportsScore > 0.8) {
    reasons.push(`Strong athletics program matching your interest in sports`);
  }
  
  if (user.researchOpportunitiesImportance >= 4 && scores.researchScore > 0.8) {
    reasons.push(`Excellent research opportunities aligned with your priorities`);
  }
  
  if (user.interestsInDormLife && scores.dormLifeScore > 0.8) {
    reasons.push(`Well-regarded dorm life and campus community`);
  }
  
  if (user.hasSignificantExtracurriculars && scores.extracurricularScore > 0.8) {
    reasons.push(`Values your extracurricular involvement`);
  }
  
  if (scores.essayScore > 0.9 && user.essayQuality >= 4) {
    reasons.push(`Your strong essays align with their admissions priorities`);
  }
  
  if (user.isInternationalStudent && scores.internationalScore && scores.internationalScore > 0.8) {
    reasons.push(`Strong support for international students (${college.internationalStudentPercentage}% international population)`);
    
    if (college.visaSupport >= 4) {
      reasons.push(`Excellent visa and immigration support services`);
    }
    
    if (user.needsScholarship && college.internationalScholarships) {
      reasons.push(`Offers scholarships for international students`);
    }
  }
  
  if (scores.academicScore > 0.9 && college.acceptanceRate < 0.1) {
    reasons.push(`Your academic profile aligns with their selective admissions standards`);
  }
  
  if (reasons.length < 2) {
    reasons.push(`Overall good match based on your combined preferences`);
  }
  
  return reasons;
}

function generateCautionPoints(
  user: UserProfile,
  college: College,
  scores: {
    gpaScore?: number;
    testScore?: number;
    academicScore: number;
    majorScore: number;
    locationScore: number;
    financialScore: number;
    internationalScore?: number;
  }
): string[] {
  const cautions: string[] = [];
  
  if (scores.gpaScore && scores.gpaScore < 0.6) {
    cautions.push(`Your GPA (${user.gpa.toFixed(1)}) is below their typical admitted student (${college.averageGPA.toFixed(1)})`);
  }
  
  if (scores.testScore && scores.testScore < 0.6) {
    if (user.satScore > 0) {
      cautions.push(`Your SAT score (${user.satScore}) is below their average (${college.averageSAT})`);
    }
    if (user.actScore > 0) {
      cautions.push(`Your ACT score (${user.actScore}) is below their average (${college.averageACT})`);
    }
  }
  
  if (scores.academicScore < 0.7) {
    cautions.push(`Your overall academic profile is below their typical admitted student`);
  }
  
  if (scores.majorScore < 0.5) {
    cautions.push(`${user.intendedMajor} is not listed among their strongest programs`);
  }
  
  if (scores.locationScore < 0.7) {
    cautions.push(`Not in your preferred location (${user.preferredLocation})`);
  }
  
  if (scores.financialScore < 0.8) {
    const gap = college.tuition - user.maxTuition;
    cautions.push(`Tuition exceeds your specified budget by $${gap.toLocaleString()}`);
  }
  
  if (user.isInternationalStudent) {
    if (scores.internationalScore && scores.internationalScore < 0.6) {
      cautions.push(`Limited resources for international students`);
    }
    
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
  
  if (college.acceptanceRate < 0.1 && scores.academicScore < 0.9) {
    cautions.push(`Highly competitive admission process (${(college.acceptanceRate * 100).toFixed(1)}% acceptance rate)`);
  }
  
  return cautions;
}
