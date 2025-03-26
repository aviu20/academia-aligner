
import { create } from 'zustand';

export interface UserProfile {
  gpa: number;
  satScore: number;
  actScore: number;
  extracurriculars: string[];
  intendedMajor: string;
  preferredLocation: string;
  maxTuition: number;
  interestsInDormLife: boolean;
  sportsImportance: number; // 1-5 scale
  researchOpportunitiesImportance: number; // 1-5 scale
  // International student specific fields
  isInternationalStudent: boolean;
  englishProficiency: {
    toefl?: number;
    ielts?: number;
  };
  needsScholarship: boolean;
  // Common Data Set factors (aligned with Section C7)
  academicRigorScore: number; // 1-5 scale, how rigorous their high school curriculum was
  classRank?: number; // Percentile rank in class (0-100)
  hasRecommendationLetters: boolean;
  hasSignificantExtracurriculars: boolean;
  hasSpecialTalent: boolean; // Special ability (athletic, artistic, etc.)
  hasVolunteerExperience: boolean;
  hasWorkExperience: boolean;
  essayQuality: number; // 1-5 scale, self-assessment of application essay quality
}

const initialUserProfile: UserProfile = {
  gpa: 3.8,
  satScore: 1350,
  actScore: 29,
  extracurriculars: ['Student Government', 'Debate Club'],
  intendedMajor: 'Computer Science',
  preferredLocation: 'West Coast',
  maxTuition: 40000,
  interestsInDormLife: true,
  sportsImportance: 3,
  researchOpportunitiesImportance: 4,
  // International student default values
  isInternationalStudent: false,
  englishProficiency: {
    toefl: 100,
    ielts: 7.0
  },
  needsScholarship: false,
  // Common Data Set factors default values
  academicRigorScore: 4,
  classRank: 85,
  hasRecommendationLetters: true,
  hasSignificantExtracurriculars: true,
  hasSpecialTalent: false,
  hasVolunteerExperience: true,
  hasWorkExperience: false,
  essayQuality: 4
};

interface UserProfileState {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;
}

export const useUserProfile = create<UserProfileState>((set) => ({
  profile: initialUserProfile,
  updateProfile: (updates) => set((state) => ({ 
    profile: { ...state.profile, ...updates } 
  })),
  resetProfile: () => set({ profile: initialUserProfile })
}));
