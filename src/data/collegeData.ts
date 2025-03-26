export interface College {
  id: string;
  name: string;
  location: string;
  acceptanceRate: number;
  averageGPA: number;
  averageSAT: number;
  averageACT: number;
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
  visaSupport: number; // 1-5 scale, how much support is provided
  internationalScholarships: boolean;
  englishRequirements: {
    toefl: number; // Minimum TOEFL score
    ielts: number; // Minimum IELTS score
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
    alumniRelation: number;
    geographicResidence: number;
    stateResidency: number;
    religiousAffiliation: number;
    racialEthnicity: number;
    volunteerWork: number;
    workExperience: number;
  };
}

// Mock college dataset (in a real app, this would come from an API)
export const colleges: College[] = [
  {
    id: '1',
    name: 'Stanford University',
    location: 'West Coast',
    acceptanceRate: 0.04,
    averageGPA: 4.0,
    averageSAT: 1500,
    averageACT: 34,
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
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, alumniRelation: 1, geographicResidence: 1,
      stateResidency: 0, religiousAffiliation: 0, racialEthnicity: 0,
      volunteerWork: 3, workExperience: 3
    }
  },
  {
    id: '2',
    name: 'MIT',
    location: 'East Coast',
    acceptanceRate: 0.07,
    averageGPA: 4.0,
    averageSAT: 1520,
    averageACT: 35,
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
      academicRigor: 5, classRank: 5, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 5, characterPersonal: 3, alumniRelation: 1, geographicResidence: 1,
      stateResidency: 0, religiousAffiliation: 0, racialEthnicity: 0,
      volunteerWork: 3, workExperience: 3
    }
  },
  {
    id: '3',
    name: 'University of California, Berkeley',
    location: 'West Coast',
    acceptanceRate: 0.16,
    averageGPA: 3.9,
    averageSAT: 1430,
    averageACT: 32,
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
      academicRigor: 5, classRank: 5, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 0, extracurricular: 3,
      talentAbility: 3, characterPersonal: 3, alumniRelation: 0, geographicResidence: 1,
      stateResidency: 5, religiousAffiliation: 0, racialEthnicity: 0,
      volunteerWork: 1, workExperience: 1
    }
  },
  {
    id: '4',
    name: 'Harvard University',
    location: 'East Coast',
    acceptanceRate: 0.05,
    averageGPA: 4.0,
    averageSAT: 1510,
    averageACT: 34,
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
      academicRigor: 5, classRank: 5, academicGPA: 5, standardizedTests: 5,
      applicationEssay: 5, recommendation: 5, interview: 3, extracurricular: 5,
      talentAbility: 3, characterPersonal: 5, alumniRelation: 3, geographicResidence: 1,
      stateResidency: 0, religiousAffiliation: 0, racialEthnicity: 0,
      volunteerWork: 3, workExperience: 3
    }
  },
  {
    id: '5',
    name: 'New York University',
    location: 'East Coast',
    acceptanceRate: 0.16,
    averageGPA: 3.7,
    averageSAT: 1410,
    averageACT: 31,
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
      academicRigor: 5, classRank: 3, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 5, recommendation: 3, interview: 1, extracurricular: 3,
      talentAbility: 5, characterPersonal: 3, alumniRelation: 1, geographicResidence: 1,
      stateResidency: 0, religiousAffiliation: 0, racialEthnicity: 0,
      volunteerWork: 3, workExperience: 3
    }
  },
  {
    id: '6',
    name: 'University of Michigan',
    location: 'Midwest',
    acceptanceRate: 0.23,
    averageGPA: 3.8,
    averageSAT: 1400,
    averageACT: 32,
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
      talentAbility: 3, characterPersonal: 3, alumniRelation: 1, geographicResidence: 1,
      stateResidency: 3, religiousAffiliation: 0, racialEthnicity: 0,
      volunteerWork: 3, workExperience: 3
    }
  },
  {
    id: '7',
    name: 'Carnegie Mellon University',
    location: 'East Coast',
    acceptanceRate: 0.15,
    averageGPA: 3.8,
    averageSAT: 1470,
    averageACT: 33,
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
      applicationEssay: 3, recommendation: 5, interview: 1, extracurricular: 3,
      talentAbility: 5, characterPersonal: 3, alumniRelation: 0, geographicResidence: 0,
      stateResidency: 0, religiousAffiliation: 0, racialEthnicity: 0,
      volunteerWork: 1, workExperience: 3
    }
  },
  {
    id: '8',
    name: 'UCLA',
    location: 'West Coast',
    acceptanceRate: 0.14,
    averageGPA: 3.9,
    averageSAT: 1405,
    averageACT: 31,
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
      academicRigor: 5, classRank: 5, academicGPA: 5, standardizedTests: 3,
      applicationEssay: 3, recommendation: 3, interview: 0, extracurricular: 3,
      talentAbility: 3, characterPersonal: 3, alumniRelation: 0, geographicResidence: 1,
      stateResidency: 5, religiousAffiliation: 0, racialEthnicity: 0,
      volunteerWork: 1, workExperience: 1
    }
  },
  {
    id: '9',
    name: 'University of Texas at Austin',
    location: 'South',
    acceptanceRate: 0.32,
    averageGPA: 3.7,
    averageSAT: 1350,
    averageACT: 30,
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
      talentAbility: 1, characterPersonal: 3, alumniRelation: 0, geographicResidence: 0,
      stateResidency: 5, religiousAffiliation: 0, racialEthnicity: 0,
      volunteerWork: 1, workExperience: 1
    }
  },
  {
    id: '10',
    name: 'Georgia Institute of Technology',
    location: 'South',
    acceptanceRate: 0.23,
    averageGPA: 3.8,
    averageSAT: 1400,
    averageACT: 32,
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
      talentAbility: 3, characterPersonal: 3, alumniRelation: 0, geographicResidence: 0,
      stateResidency: 3, religiousAffiliation: 0, racialEthnicity: 0,
      volunteerWork: 1, workExperience: 3
    }
  }
];
