// CDS importance levels: Very Important = 5, Important = 3, Considered = 2, Not Considered = 0
export interface College {
  id: string;
  name: string;
  location: string;
  acceptanceRate: number;
  averageGPA: number;
  testScores: {
    sat25: number;
    sat50: number;
    sat75: number;
    act25: number;
    act50: number;
    act75: number;
  };
  tuition: number;
  strongMajors: string[];
  notableFacilities: string[];
  sportsRanking: number; // 1-5 scale
  researchOpportunities: number; // 1-5 scale
  dormLifeQuality: number; // 1-5 scale
  studentPopulation: number;
  motto: string;
  image?: string;
  internationalStudentPercentage: number;
  visaSupport: number; // 1-5 scale
  internationalScholarships: boolean;
  englishRequirements: {
    toefl: number;
    ielts: number;
  };
  admissionFactors: {
    academicRigor: number;
    classRank: number;
    academicGPA: number;
    standardizedTests: number;
    applicationEssay: number;
    recommendation: number;
    interview: number;
    extracurricular: number;
    talentAbility: number;
    characterPersonal: number;
    firstGeneration: number;
    alumniRelation: number;
    geographicResidence: number;
    stateResidency: number;
    religiousAffiliation: number;
    demonstratedInterest: number;
    volunteerWork: number;
    workExperience: number;
  };
}

// Test score percentiles: MIT and NYU are from verified CDS 2024-25 data.
// All others are estimated from prior averages and need CDS backfill.
export const colleges: College[] = [
  {
    id: '1',
    name: 'Stanford University',
    location: 'West Coast',
    acceptanceRate: 0.04,
    averageGPA: 4.0,
    testScores: { sat25: 1470, sat50: 1500, sat75: 1530, act25: 33, act50: 34, act75: 35 },
    tuition: 55000,
    strongMajors: ['Computer Science', 'Engineering', 'Business'],
    notableFacilities: ['Advanced Research Lab', 'Innovation Center'],
    sportsRanking: 5,
    researchOpportunities: 5,
    dormLifeQuality: 4,
    studentPopulation: 17000,
    motto: 'The wind of freedom blows',
    internationalStudentPercentage: 12,
    visaSupport: 5,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 5, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 2, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 0,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    // Verified from MIT CDS 2024-25
    id: '2',
    name: 'MIT',
    location: 'East Coast',
    acceptanceRate: 0.045,
    averageGPA: 4.0,
    testScores: { sat25: 1520, sat50: 1550, sat75: 1570, act25: 34, act50: 35, act75: 36 },
    tuition: 57000,
    strongMajors: ['Computer Science', 'Engineering', 'Mathematics'],
    notableFacilities: ['Media Lab', 'Nuclear Reactor'],
    sportsRanking: 3,
    researchOpportunities: 5,
    dormLifeQuality: 3,
    studentPopulation: 11000,
    motto: 'Mind and Hand',
    internationalStudentPercentage: 10,
    visaSupport: 5,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 2, extracurricular: 5,
      talentAbility: 5, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 2,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '3',
    name: 'University of California, Berkeley',
    location: 'West Coast',
    acceptanceRate: 0.16,
    averageGPA: 3.9,
    testScores: { sat25: 1380, sat50: 1430, sat75: 1480, act25: 30, act50: 32, act75: 34 },
    tuition: 43000,
    strongMajors: ['Computer Science', 'Engineering', 'Economics'],
    notableFacilities: ['Lawrence Berkeley Lab', 'Berkeley Art Museum'],
    sportsRanking: 4,
    researchOpportunities: 5,
    dormLifeQuality: 3,
    studentPopulation: 42000,
    motto: 'Let there be light',
    internationalStudentPercentage: 14,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 90, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 2, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 0, interview: 0, extracurricular: 3,
      talentAbility: 3, characterPersonal: 3, firstGeneration: 2,
      alumniRelation: 0, geographicResidence: 2, stateResidency: 5,
      religiousAffiliation: 0, demonstratedInterest: 0,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '4',
    name: 'Harvard University',
    location: 'East Coast',
    acceptanceRate: 0.05,
    averageGPA: 4.0,
    testScores: { sat25: 1480, sat50: 1510, sat75: 1540, act25: 33, act50: 34, act75: 35 },
    tuition: 54000,
    strongMajors: ['Economics', 'Political Science', 'Biology'],
    notableFacilities: ['Harvard Library', 'Memorial Hall'],
    sportsRanking: 4,
    researchOpportunities: 5,
    dormLifeQuality: 4,
    studentPopulation: 20000,
    motto: 'Truth',
    internationalStudentPercentage: 13,
    visaSupport: 5,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.5 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 5, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 3, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 0,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    // Verified from NYU CDS 2024-25
    id: '5',
    name: 'New York University',
    location: 'East Coast',
    acceptanceRate: 0.092,
    averageGPA: 3.7,
    testScores: { sat25: 1480, sat50: 1520, sat75: 1550, act25: 34, act50: 34, act75: 35 },
    tuition: 53000,
    strongMajors: ['Business', 'Arts', 'Communications'],
    notableFacilities: ['Tisch School of the Arts', 'Stern School of Business'],
    sportsRanking: 2,
    researchOpportunities: 4,
    dormLifeQuality: 4,
    studentPopulation: 51000,
    motto: 'Perstare et praestare',
    internationalStudentPercentage: 22,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 0, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 5, recommendation: 5, interview: 0, extracurricular: 2,
      talentAbility: 2, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 0, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '6',
    name: 'University of Michigan',
    location: 'Midwest',
    acceptanceRate: 0.23,
    averageGPA: 3.8,
    testScores: { sat25: 1350, sat50: 1400, sat75: 1450, act25: 30, act50: 32, act75: 34 },
    tuition: 49000,
    strongMajors: ['Engineering', 'Business', 'Psychology'],
    notableFacilities: ['Michigan Stadium', 'Duderstadt Center'],
    sportsRanking: 5,
    researchOpportunities: 4,
    dormLifeQuality: 4,
    studentPopulation: 47000,
    motto: 'Arts, Knowledge, Truth',
    internationalStudentPercentage: 8,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 5, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 3, recommendation: 3, interview: 0, extracurricular: 3,
      talentAbility: 3, characterPersonal: 3, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 3,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '7',
    name: 'Carnegie Mellon University',
    location: 'East Coast',
    acceptanceRate: 0.15,
    averageGPA: 3.8,
    testScores: { sat25: 1420, sat50: 1470, sat75: 1520, act25: 31, act50: 33, act75: 35 },
    tuition: 57000,
    strongMajors: ['Computer Science', 'Engineering', 'Fine Arts'],
    notableFacilities: ['Robotics Institute', 'Software Engineering Institute'],
    sportsRanking: 2,
    researchOpportunities: 5,
    dormLifeQuality: 3,
    studentPopulation: 14000,
    motto: 'My heart is in the work',
    internationalStudentPercentage: 16,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 102, ielts: 7.5 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 3, recommendation: 5, interview: 2, extracurricular: 3,
      talentAbility: 5, characterPersonal: 3, firstGeneration: 2,
      alumniRelation: 0, geographicResidence: 0, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '8',
    name: 'UCLA',
    location: 'West Coast',
    acceptanceRate: 0.14,
    averageGPA: 3.9,
    testScores: { sat25: 1355, sat50: 1405, sat75: 1455, act25: 29, act50: 31, act75: 33 },
    tuition: 42000,
    strongMajors: ['Biology', 'Business Economics', 'Psychology'],
    notableFacilities: ['Pauley Pavilion', 'Fowler Museum'],
    sportsRanking: 5,
    researchOpportunities: 4,
    dormLifeQuality: 4,
    studentPopulation: 44000,
    motto: 'Let there be light',
    internationalStudentPercentage: 12,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 2, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 3, recommendation: 0, interview: 0, extracurricular: 3,
      talentAbility: 3, characterPersonal: 3, firstGeneration: 2,
      alumniRelation: 0, geographicResidence: 2, stateResidency: 5,
      religiousAffiliation: 0, demonstratedInterest: 0,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '9',
    name: 'University of Texas at Austin',
    location: 'South',
    acceptanceRate: 0.32,
    averageGPA: 3.7,
    testScores: { sat25: 1280, sat50: 1350, sat75: 1420, act25: 27, act50: 30, act75: 33 },
    tuition: 38000,
    strongMajors: ['Engineering', 'Business', 'Computer Science'],
    notableFacilities: ['Texas Memorial Stadium', 'LBJ Library'],
    sportsRanking: 5,
    researchOpportunities: 4,
    dormLifeQuality: 3,
    studentPopulation: 51000,
    motto: 'Disciplina praesidium civitatis',
    internationalStudentPercentage: 5,
    visaSupport: 3,
    internationalScholarships: true,
    englishRequirements: { toefl: 79, ielts: 6.5 },
    admissionFactors: {
      academicRigor: 5, classRank: 5, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 3, recommendation: 3, interview: 0, extracurricular: 3,
      talentAbility: 2, characterPersonal: 3, firstGeneration: 2,
      alumniRelation: 0, geographicResidence: 0, stateResidency: 5,
      religiousAffiliation: 0, demonstratedInterest: 0,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '10',
    name: 'Georgia Institute of Technology',
    location: 'South',
    acceptanceRate: 0.23,
    averageGPA: 3.8,
    testScores: { sat25: 1350, sat50: 1400, sat75: 1450, act25: 30, act50: 32, act75: 34 },
    tuition: 33000,
    strongMajors: ['Engineering', 'Computer Science', 'Architecture'],
    notableFacilities: ['Technology Square', 'Klaus Advanced Computing Building'],
    sportsRanking: 4,
    researchOpportunities: 5,
    dormLifeQuality: 3,
    studentPopulation: 36000,
    motto: 'Progress and Service',
    internationalStudentPercentage: 10,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 90, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 5, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 3, recommendation: 3, interview: 0, extracurricular: 3,
      talentAbility: 3, characterPersonal: 3, firstGeneration: 2,
      alumniRelation: 0, geographicResidence: 0, stateResidency: 3,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '11',
    name: 'Princeton University',
    location: 'East Coast',
    acceptanceRate: 0.06,
    averageGPA: 3.9,
    testScores: { sat25: 1480, sat50: 1505, sat75: 1540, act25: 33, act50: 34, act75: 35 },
    tuition: 52000,
    strongMajors: ['Engineering', 'Public Policy', 'Economics'],
    notableFacilities: ['Princeton University Art Museum', 'Frist Campus Center'],
    sportsRanking: 4,
    researchOpportunities: 5,
    dormLifeQuality: 5,
    studentPopulation: 8300,
    motto: 'Under God\'s Power She Flourishes',
    internationalStudentPercentage: 12,
    visaSupport: 5,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 0,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '12',
    name: 'Yale University',
    location: 'East Coast',
    acceptanceRate: 0.06,
    averageGPA: 4.0,
    testScores: { sat25: 1480, sat50: 1510, sat75: 1540, act25: 33, act50: 34, act75: 35 },
    tuition: 55500,
    strongMajors: ['Political Science', 'Economics', 'History'],
    notableFacilities: ['Yale University Art Gallery', 'Beinecke Rare Book Library'],
    sportsRanking: 4,
    researchOpportunities: 5,
    dormLifeQuality: 5,
    studentPopulation: 13000,
    motto: 'Light and truth',
    internationalStudentPercentage: 13,
    visaSupport: 5,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 5, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 0,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '13',
    name: 'Columbia University',
    location: 'East Coast',
    acceptanceRate: 0.05,
    averageGPA: 4.0,
    testScores: { sat25: 1480, sat50: 1505, sat75: 1540, act25: 33, act50: 34, act75: 35 },
    tuition: 58000,
    strongMajors: ['Economics', 'Political Science', 'English'],
    notableFacilities: ['Butler Library', 'Low Memorial Library'],
    sportsRanking: 3,
    researchOpportunities: 5,
    dormLifeQuality: 3,
    studentPopulation: 31000,
    motto: 'In Thy light shall we see light',
    internationalStudentPercentage: 17,
    visaSupport: 5,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 2, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 0,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '14',
    name: 'University of Chicago',
    location: 'Midwest',
    acceptanceRate: 0.07,
    averageGPA: 4.0,
    testScores: { sat25: 1490, sat50: 1520, sat75: 1550, act25: 33, act50: 34, act75: 35 },
    tuition: 57000,
    strongMajors: ['Economics', 'Mathematics', 'Physics'],
    notableFacilities: ['Joe and Rika Mansueto Library', 'David Rubenstein Forum'],
    sportsRanking: 2,
    researchOpportunities: 5,
    dormLifeQuality: 4,
    studentPopulation: 16000,
    motto: 'Let knowledge grow from more to more; and so be human life enriched',
    internationalStudentPercentage: 14,
    visaSupport: 5,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 2, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 2, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 5,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '15',
    name: 'Duke University',
    location: 'South',
    acceptanceRate: 0.08,
    averageGPA: 4.0,
    testScores: { sat25: 1480, sat50: 1510, sat75: 1540, act25: 33, act50: 34, act75: 35 },
    tuition: 55000,
    strongMajors: ['Public Policy', 'Economics', 'Biology'],
    notableFacilities: ['Cameron Indoor Stadium', 'Duke Chapel'],
    sportsRanking: 5,
    researchOpportunities: 5,
    dormLifeQuality: 4,
    studentPopulation: 16000,
    motto: 'Knowledge and Faith',
    internationalStudentPercentage: 10,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '16',
    name: 'Northwestern University',
    location: 'Midwest',
    acceptanceRate: 0.09,
    averageGPA: 3.9,
    testScores: { sat25: 1465, sat50: 1495, sat75: 1530, act25: 33, act50: 34, act75: 35 },
    tuition: 56000,
    strongMajors: ['Journalism', 'Performing Arts', 'Economics'],
    notableFacilities: ['Ryan Center for the Musical Arts', 'Kellogg Global Hub'],
    sportsRanking: 4,
    researchOpportunities: 4,
    dormLifeQuality: 4,
    studentPopulation: 22000,
    motto: 'Whatsoever things are true',
    internationalStudentPercentage: 10,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 2, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 5, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '17',
    name: 'Johns Hopkins University',
    location: 'East Coast',
    acceptanceRate: 0.11,
    averageGPA: 3.9,
    testScores: { sat25: 1455, sat50: 1505, sat75: 1555, act25: 32, act50: 34, act75: 35 },
    tuition: 55000,
    strongMajors: ['Medicine', 'International Relations', 'Biomedical Engineering'],
    notableFacilities: ['Milton S. Eisenhower Library', 'Bloomberg Center'],
    sportsRanking: 3,
    researchOpportunities: 5,
    dormLifeQuality: 3,
    studentPopulation: 24000,
    motto: 'The truth will set you free',
    internationalStudentPercentage: 10,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 2, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '18',
    name: 'Dartmouth College',
    location: 'East Coast',
    acceptanceRate: 0.08,
    averageGPA: 4.0,
    testScores: { sat25: 1470, sat50: 1500, sat75: 1530, act25: 33, act50: 34, act75: 35 },
    tuition: 57000,
    strongMajors: ['Economics', 'Government', 'Computer Science'],
    notableFacilities: ['Baker-Berry Library', 'Hood Museum of Art'],
    sportsRanking: 4,
    researchOpportunities: 4,
    dormLifeQuality: 4,
    studentPopulation: 6500,
    motto: 'Vox clamantis in deserto',
    internationalStudentPercentage: 9,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 3, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '19',
    name: 'Vanderbilt University',
    location: 'South',
    acceptanceRate: 0.12,
    averageGPA: 3.8,
    testScores: { sat25: 1455, sat50: 1505, sat75: 1555, act25: 32, act50: 34, act75: 35 },
    tuition: 52000,
    strongMajors: ['Economics', 'Education', 'Engineering'],
    notableFacilities: ['Wyatt Center', 'Jean and Alexander Heard Library'],
    sportsRanking: 4,
    researchOpportunities: 4,
    dormLifeQuality: 4,
    studentPopulation: 13000,
    motto: 'Light and Truth',
    internationalStudentPercentage: 9,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 2, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 2, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 3,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '20',
    name: 'Rice University',
    location: 'South',
    acceptanceRate: 0.11,
    averageGPA: 3.9,
    testScores: { sat25: 1455, sat50: 1505, sat75: 1555, act25: 32, act50: 34, act75: 35 },
    tuition: 49000,
    strongMajors: ['Architecture', 'Engineering', 'Natural Sciences'],
    notableFacilities: ['Moody Center for the Arts', 'BioScience Research Collaborative'],
    sportsRanking: 3,
    researchOpportunities: 5,
    dormLifeQuality: 5,
    studentPopulation: 7000,
    motto: 'Letters, Science, Art',
    internationalStudentPercentage: 12,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '21',
    name: 'University of Notre Dame',
    location: 'Midwest',
    acceptanceRate: 0.19,
    averageGPA: 3.9,
    testScores: { sat25: 1395, sat50: 1445, sat75: 1495, act25: 31, act50: 33, act75: 35 },
    tuition: 55000,
    strongMajors: ['Business', 'Architecture', 'Engineering'],
    notableFacilities: ['Hesburgh Library', 'Notre Dame Stadium'],
    sportsRanking: 5,
    researchOpportunities: 4,
    dormLifeQuality: 5,
    studentPopulation: 12000,
    motto: 'Life, Sweetness, Hope',
    internationalStudentPercentage: 8,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 3, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 3, demonstratedInterest: 2,
      volunteerWork: 3, workExperience: 2
    }
  },
  {
    id: '22',
    name: 'University of Virginia',
    location: 'East Coast',
    acceptanceRate: 0.24,
    averageGPA: 3.9,
    testScores: { sat25: 1380, sat50: 1430, sat75: 1480, act25: 30, act50: 32, act75: 34 },
    tuition: 50000,
    strongMajors: ['Business', 'Law', 'Liberal Arts'],
    notableFacilities: ['The Lawn', 'Alderman Library'],
    sportsRanking: 4,
    researchOpportunities: 4,
    dormLifeQuality: 4,
    studentPopulation: 24000,
    motto: 'And you shall know the truth and the truth shall set you free',
    internationalStudentPercentage: 7,
    visaSupport: 3,
    internationalScholarships: true,
    englishRequirements: { toefl: 90, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 5, recommendation: 3, interview: 2, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 3,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '23',
    name: 'Georgetown University',
    location: 'East Coast',
    acceptanceRate: 0.17,
    averageGPA: 3.9,
    testScores: { sat25: 1400, sat50: 1450, sat75: 1500, act25: 31, act50: 33, act75: 35 },
    tuition: 56000,
    strongMajors: ['International Relations', 'Political Science', 'Business'],
    notableFacilities: ['Lauinger Library', 'Healy Hall'],
    sportsRanking: 4,
    researchOpportunities: 4,
    dormLifeQuality: 3,
    studentPopulation: 19000,
    motto: 'Both into One',
    internationalStudentPercentage: 11,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 2, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 2, demonstratedInterest: 3,
      volunteerWork: 3, workExperience: 2
    }
  },
  {
    id: '24',
    name: 'University of California, Los Angeles',
    location: 'West Coast',
    acceptanceRate: 0.14,
    averageGPA: 3.9,
    testScores: { sat25: 1355, sat50: 1405, sat75: 1455, act25: 29, act50: 31, act75: 33 },
    tuition: 42000,
    strongMajors: ['Film', 'Business', 'Psychology'],
    notableFacilities: ['Royce Hall', 'Powell Library'],
    sportsRanking: 5,
    researchOpportunities: 5,
    dormLifeQuality: 4,
    studentPopulation: 44900,
    motto: 'Let there be light',
    internationalStudentPercentage: 12,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 2, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 5, recommendation: 0, interview: 0, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 0, geographicResidence: 2, stateResidency: 5,
      religiousAffiliation: 0, demonstratedInterest: 0,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '25',
    name: 'University of Southern California',
    location: 'West Coast',
    acceptanceRate: 0.16,
    averageGPA: 3.8,
    testScores: { sat25: 1390, sat50: 1440, sat75: 1490, act25: 30, act50: 32, act75: 34 },
    tuition: 58000,
    strongMajors: ['Film', 'Business', 'Communications'],
    notableFacilities: ['Doheny Library', 'Bing Theatre'],
    sportsRanking: 5,
    researchOpportunities: 4,
    dormLifeQuality: 4,
    studentPopulation: 46000,
    motto: 'Let whoever earns the palm bear it',
    internationalStudentPercentage: 14,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 2, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 5, recommendation: 5, interview: 2, extracurricular: 5,
      talentAbility: 5, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 3,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '26',
    name: 'University of Illinois at Urbana-Champaign',
    location: 'Midwest',
    acceptanceRate: 0.6,
    averageGPA: 3.8,
    testScores: { sat25: 1295, sat50: 1365, sat75: 1435, act25: 26, act50: 29, act75: 32 },
    tuition: 33000,
    strongMajors: ['Engineering', 'Computer Science', 'Business'],
    notableFacilities: ['Grainger Engineering Library', 'Krannert Center'],
    sportsRanking: 4,
    researchOpportunities: 5,
    dormLifeQuality: 3,
    studentPopulation: 52000,
    motto: 'Learning and Labor',
    internationalStudentPercentage: 16,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 103, ielts: 7.5 },
    admissionFactors: {
      academicRigor: 5, classRank: 2, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 3, recommendation: 2, interview: 0, extracurricular: 2,
      talentAbility: 2, characterPersonal: 2, firstGeneration: 2,
      alumniRelation: 0, geographicResidence: 2, stateResidency: 3,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '27',
    name: 'University of Washington',
    location: 'West Coast',
    acceptanceRate: 0.52,
    averageGPA: 3.8,
    testScores: { sat25: 1270, sat50: 1340, sat75: 1410, act25: 27, act50: 30, act75: 33 },
    tuition: 38000,
    strongMajors: ['Computer Science', 'Engineering', 'Business'],
    notableFacilities: ['Suzzallo Library', 'Husky Union Building'],
    sportsRanking: 4,
    researchOpportunities: 5,
    dormLifeQuality: 3,
    studentPopulation: 47000,
    motto: 'Let there be light',
    internationalStudentPercentage: 14,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 92, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 2, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 5, recommendation: 2, interview: 0, extracurricular: 3,
      talentAbility: 2, characterPersonal: 3, firstGeneration: 2,
      alumniRelation: 0, geographicResidence: 2, stateResidency: 3,
      religiousAffiliation: 0, demonstratedInterest: 0,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '28',
    name: 'University of Wisconsin-Madison',
    location: 'Midwest',
    acceptanceRate: 0.57,
    averageGPA: 3.8,
    testScores: { sat25: 1320, sat50: 1390, sat75: 1460, act25: 27, act50: 30, act75: 33 },
    tuition: 38000,
    strongMajors: ['Business', 'Engineering', 'Education'],
    notableFacilities: ['Memorial Union Terrace', 'College Library'],
    sportsRanking: 5,
    researchOpportunities: 5,
    dormLifeQuality: 4,
    studentPopulation: 44000,
    motto: 'Forward',
    internationalStudentPercentage: 9,
    visaSupport: 3,
    internationalScholarships: true,
    englishRequirements: { toefl: 95, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 3, recommendation: 2, interview: 0, extracurricular: 2,
      talentAbility: 2, characterPersonal: 2, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 3,
      religiousAffiliation: 0, demonstratedInterest: 2,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '29',
    name: 'Boston University',
    location: 'East Coast',
    acceptanceRate: 0.22,
    averageGPA: 3.7,
    testScores: { sat25: 1370, sat50: 1420, sat75: 1470, act25: 30, act50: 32, act75: 34 },
    tuition: 57000,
    strongMajors: ['Business', 'Communications', 'International Relations'],
    notableFacilities: ['Mugar Memorial Library', 'Photonics Center'],
    sportsRanking: 4,
    researchOpportunities: 4,
    dormLifeQuality: 3,
    studentPopulation: 33000,
    motto: 'Learning, Virtue, Piety',
    internationalStudentPercentage: 24,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 90, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 2, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 5, recommendation: 5, interview: 2, extracurricular: 3,
      talentAbility: 3, characterPersonal: 3, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 3,
      volunteerWork: 2, workExperience: 2
    }
  },
  {
    id: '30',
    name: 'Tufts University',
    location: 'East Coast',
    acceptanceRate: 0.16,
    averageGPA: 3.9,
    testScores: { sat25: 1395, sat50: 1445, sat75: 1495, act25: 31, act50: 33, act75: 35 },
    tuition: 58000,
    strongMajors: ['International Relations', 'Engineering', 'Medicine'],
    notableFacilities: ['Tisch Library', 'Granoff Music Center'],
    sportsRanking: 3,
    researchOpportunities: 4,
    dormLifeQuality: 4,
    studentPopulation: 11000,
    motto: 'Peace and Light',
    internationalStudentPercentage: 11,
    visaSupport: 4,
    internationalScholarships: true,
    englishRequirements: { toefl: 100, ielts: 7.0 },
    admissionFactors: {
      academicRigor: 5, classRank: 2, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, firstGeneration: 2,
      alumniRelation: 2, geographicResidence: 2, stateResidency: 0,
      religiousAffiliation: 0, demonstratedInterest: 3,
      volunteerWork: 2, workExperience: 2
    }
  }
];
