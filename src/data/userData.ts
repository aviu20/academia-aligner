
import { create } from 'zustand';

export interface UserProfile {
  gpa: number;
  satScore: number;
  actScore: number;
  intendedMajor: string;
  academicRigorScore: number;
  classRank: number;
  preferredLocation: string;
  maxTuition: number;
  interestsInDormLife: boolean;
  hasSignificantExtracurriculars: boolean;
  hasSpecialTalent: boolean;
  hasVolunteerExperience: boolean;
  hasWorkExperience: boolean;
  hasRecommendationLetters: boolean;
  sportsImportance: number;
  researchOpportunitiesImportance: number;
  essayQuality: number;
  isInternationalStudent: boolean;
  country?: string;
  englishProficiency: {
    toefl?: number;
    ielts?: number;
  };
  needsScholarship: boolean;
}

interface UserProfileStore {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
}

// Default profile data
const initialProfile: UserProfile = {
  gpa: 3.7,
  satScore: 1350,
  actScore: 28,
  intendedMajor: 'Computer Science',
  academicRigorScore: 4,
  classRank: 90,
  preferredLocation: 'West Coast',
  maxTuition: 25000,
  interestsInDormLife: true,
  hasSignificantExtracurriculars: true,
  hasSpecialTalent: false,
  hasVolunteerExperience: true,
  hasWorkExperience: false,
  hasRecommendationLetters: true,
  sportsImportance: 3,
  researchOpportunitiesImportance: 4,
  essayQuality: 4,
  isInternationalStudent: false,
  country: undefined,
  englishProficiency: {
    toefl: undefined,
    ielts: undefined
  },
  needsScholarship: false
};

export const useUserProfile = create<UserProfileStore>((set) => ({
  profile: initialProfile,
  updateProfile: (profile) => set({ profile })
}));
