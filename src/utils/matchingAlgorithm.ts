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
  firstGeneration: number;
  demonstratedInterest: number;
  international?: number;
}

/**
 * Sigmoid-based academic fit score.
 * Returns ~0.75 when the student matches the college average, higher when above,
 * lower when below. The scale parameter controls how quickly the score drops off
 * — it represents a "one standard deviation equivalent" gap for that metric.
 */
function sigmoidFit(userValue: number, collegeAvg: number, scale: number): number {
  const gap = (collegeAvg - userValue) / scale;
  return 1 / (1 + Math.exp(gap - 1.1));
}

function getWeightsForCollege(college: College, isInternational: boolean): CollegeWeights {
  const af = college.admissionFactors;

  // Raw weights derived directly from the college's stated admission factor
  // importance (0-5 scale). Factors not in the admissionFactors schema get a
  // reasonable fixed base. We normalize to sum to 1 at the end.
  const raw: CollegeWeights = {
    academics: af.academicGPA + af.standardizedTests + af.academicRigor + af.classRank,
    major: 3,
    location: Math.max(af.geographicResidence, 1),
    financials: 3,
    lifestyle: 2,
    extracurricular: af.extracurricular,
    essay: af.applicationEssay,
    recommendation: af.recommendation,
    specialTalent: af.talentAbility,
    volunteerWork: af.volunteerWork,
    workExperience: af.workExperience,
    character: af.characterPersonal,
    firstGeneration: af.firstGeneration,
    demonstratedInterest: af.demonstratedInterest,
  };

  if (isInternational) {
    raw.international = 4;
  }

  // Normalize so all weights sum to 1
  const sum = Object.values(raw).reduce((s, v) => s + (v ?? 0), 0);
  const normalized: CollegeWeights = {} as CollegeWeights;
  for (const [key, value] of Object.entries(raw)) {
    (normalized as Record<string, number>)[key] = (value ?? 0) / sum;
  }

  return normalized;
}

export function calculateCollegeMatches(userProfile: UserProfile, colleges: College[]): CollegeMatch[] {
  return colleges.map(college => {
    const weights = getWeightsForCollege(college, userProfile.isInternationalStudent);

    // --- Academic scores using sigmoid fit ---
    // Scale parameters represent "one meaningful gap" for each metric
    const af = college.admissionFactors;
    const gpaScore = sigmoidFit(userProfile.gpa, college.averageGPA, 0.3);
    const satScore = userProfile.satScore > 0
      ? sigmoidFit(userProfile.satScore, college.testScores.sat50, 100)
      : 0.5;
    const actScore = userProfile.actScore > 0
      ? sigmoidFit(userProfile.actScore, college.testScores.act50, 3)
      : 0.5;
    const testScore = Math.max(satScore, actScore);

    const academicRigorScore = normalize(userProfile.academicRigorScore, 1, 5) *
                               normalize(af.academicRigor, 0, 5);

    const classRankScore = userProfile.classRank > 0
      ? userProfile.classRank / 100
      : 0.5;

    // Combined academic score: sub-weighted average of GPA, tests, rigor, rank
    // using the college's own importance ratings as sub-weights
    const acadSubTotal = af.academicGPA + af.standardizedTests + af.academicRigor + af.classRank;
    const academicScore = acadSubTotal > 0
      ? (gpaScore * af.academicGPA +
         testScore * af.standardizedTests +
         academicRigorScore * af.academicRigor +
         classRankScore * af.classRank) / acadSubTotal
      : (gpaScore + testScore) / 2;

    // --- Non-academic dimension scores (all in [0, 1]) ---
    const majorScore = calculateMajorMatch(userProfile.intendedMajor, college.strongMajors);

    const locationScore = userProfile.preferredLocation === college.location ? 1.0 : 0.5;

    // Financial fit: sigmoid around the tuition so it degrades smoothly
    const financialScore = userProfile.maxTuition >= college.tuition
      ? 1.0
      : Math.max(0, sigmoidFit(userProfile.maxTuition, college.tuition, college.tuition * 0.3));

    const sportsScore = calculatePreferenceMatch(
      userProfile.sportsImportance,
      college.sportsRanking
    );
    const researchScore = calculatePreferenceMatch(
      userProfile.researchOpportunitiesImportance,
      college.researchOpportunities
    );
    const dormLifeScore = userProfile.interestsInDormLife
      ? normalize(college.dormLifeQuality, 1, 5)
      : 0.5;
    const lifestyleScore = (sportsScore + researchScore + dormLifeScore) / 3;

    const essayScore = normalize(userProfile.essayQuality, 1, 5) *
                       normalize(af.applicationEssay, 0, 5);

    const recommendationScore = userProfile.hasRecommendationLetters
      ? normalize(college.admissionFactors.recommendation, 0, 5)
      : 0.3;

    const extracurricularScore = userProfile.hasSignificantExtracurriculars
      ? normalize(college.admissionFactors.extracurricular, 0, 5)
      : 0.3;

    const talentScore = userProfile.hasSpecialTalent
      ? normalize(college.admissionFactors.talentAbility, 0, 5)
      : 0.3;

    const volunteerScore = userProfile.hasVolunteerExperience
      ? normalize(college.admissionFactors.volunteerWork, 0, 5)
      : 0.3;

    const workExperienceScore = userProfile.hasWorkExperience
      ? normalize(college.admissionFactors.workExperience, 0, 5)
      : 0.3;

    const characterScore = normalize(af.characterPersonal, 0, 5);

    const firstGenScore = userProfile.isFirstGeneration
      ? normalize(af.firstGeneration, 0, 5)
      : 0.5;

    const interestScore = af.demonstratedInterest > 0
      ? normalize(userProfile.demonstratedInterest, 1, 5) * normalize(af.demonstratedInterest, 0, 5)
      : 0.5;

    let internationalScore = 0.5;
    if (userProfile.isInternationalStudent) {
      const englishScore = calculateEnglishProficiencyMatch(
        userProfile.englishProficiency,
        college.englishRequirements
      );
      const visaSupportScore = normalize(college.visaSupport, 1, 5);
      const scholarshipScore = userProfile.needsScholarship && college.internationalScholarships
        ? 1.0
        : (userProfile.needsScholarship ? 0.2 : 0.8);
      internationalScore = (englishScore + visaSupportScore + scholarshipScore) / 3;
    }

    // --- Weighted average: each score * its normalized weight ---
    // Every term contributes proportionally, and the sum is guaranteed in [0, 1]
    // because weights sum to 1 and every score is in [0, 1].
    let totalScore =
      academicScore        * weights.academics +
      majorScore           * weights.major +
      locationScore        * weights.location +
      financialScore       * weights.financials +
      lifestyleScore       * weights.lifestyle +
      essayScore           * weights.essay +
      recommendationScore  * weights.recommendation +
      extracurricularScore * weights.extracurricular +
      talentScore          * weights.specialTalent +
      volunteerScore       * weights.volunteerWork +
      workExperienceScore  * weights.workExperience +
      characterScore       * weights.character +
      firstGenScore        * weights.firstGeneration +
      interestScore        * weights.demonstratedInterest;

    if (userProfile.isInternationalStudent && weights.international !== undefined) {
      totalScore += internationalScore * weights.international;
    }

    const matchPercentage = Math.round(totalScore * 100);

    const admissionFit = calculateAdmissionFit(userProfile, college);
    const percentiles = calculateAdmissionPercentiles(college);

    const scores = {
      gpaScore,
      testScore,
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

    const matchReasons = generateMatchReasons(userProfile, college, scores);
    const cautionPoints = generateCautionPoints(userProfile, college, scores);

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
      cautions.push(`Your SAT score (${user.satScore}) is below their median (${college.testScores.sat50})`);
    }
    if (user.actScore > 0) {
      cautions.push(`Your ACT score (${user.actScore}) is below their median (${college.testScores.act50})`);
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
