
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
  researchOpportunitiesImportance: 4
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
