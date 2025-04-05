
import { College } from './collegeData';

export interface Scholarship {
  id: string;
  name: string;
  description: string;
  amount: string;
  deadline: string;
  eligibilityRequirements: string[];
  applicationLink: string;
  colleges: string[]; // College IDs that this scholarship applies to
  fieldOfStudy: string[];
  scholarshipType: 'merit' | 'need' | 'research' | 'diversity';
  minimumGPA?: number;
  minimumSAT?: number;
  minimumACT?: number;
  country?: string; // For country-specific scholarships
  isFullRide: boolean;
}

export const scholarships: Scholarship[] = [
  {
    id: "1",
    name: "Merit Excellence Scholarship",
    description: "Awarded to students with exceptional academic performance",
    amount: "$25,000 per year",
    deadline: "December 15, 2025",
    eligibilityRequirements: ["3.8+ GPA", "1400+ SAT", "30+ ACT", "Top 10% of class"],
    applicationLink: "https://example.com/merit-scholarship",
    colleges: ["1", "2", "3"],
    fieldOfStudy: ["Computer Science", "Engineering", "Mathematics", "Physics"],
    scholarshipType: "merit",
    minimumGPA: 3.8,
    minimumSAT: 1400,
    minimumACT: 30,
    isFullRide: false
  },
  {
    id: "2",
    name: "Global Diversity Scholarship",
    description: "Supporting international students bringing diverse perspectives to campus",
    amount: "$30,000 per year",
    deadline: "January 10, 2026",
    eligibilityRequirements: ["International student", "Demonstrated financial need", "Essay required"],
    applicationLink: "https://example.com/diversity-scholarship",
    colleges: ["1", "4", "5"],
    fieldOfStudy: ["Any"],
    scholarshipType: "diversity",
    isFullRide: false
  },
  {
    id: "3",
    name: "Research Innovation Grant",
    description: "For students interested in pursuing research projects during their undergraduate studies",
    amount: "$15,000 per year",
    deadline: "February 28, 2026",
    eligibilityRequirements: ["Research proposal required", "Faculty recommendation", "3.5+ GPA"],
    applicationLink: "https://example.com/research-grant",
    colleges: ["2", "3", "6"],
    fieldOfStudy: ["Biology", "Chemistry", "Computer Science", "Engineering", "Physics"],
    scholarshipType: "research",
    minimumGPA: 3.5,
    isFullRide: false
  },
  {
    id: "4",
    name: "Financial Need Support Scholarship",
    description: "Assisting students with demonstrated financial need to pursue their education",
    amount: "$20,000 per year",
    deadline: "March 15, 2026",
    eligibilityRequirements: ["Demonstrated financial need", "FAFSA completion required"],
    applicationLink: "https://example.com/need-scholarship",
    colleges: ["1", "2", "3", "4", "5", "6", "7"],
    fieldOfStudy: ["Any"],
    scholarshipType: "need",
    isFullRide: false
  },
  {
    id: "5",
    name: "Presidential Full Ride Scholarship",
    description: "Comprehensive scholarship covering all educational expenses for exceptional students",
    amount: "Full tuition, room & board, books",
    deadline: "November 30, 2025",
    eligibilityRequirements: ["4.0+ GPA", "1500+ SAT", "34+ ACT", "Leadership experience", "Interview required"],
    applicationLink: "https://example.com/presidential-scholarship",
    colleges: ["1", "3"],
    fieldOfStudy: ["Any"],
    scholarshipType: "merit",
    minimumGPA: 4.0,
    minimumSAT: 1500,
    minimumACT: 34,
    isFullRide: true
  },
  {
    id: "6",
    name: "International STEM Excellence Award",
    description: "Supporting international students pursuing STEM fields",
    amount: "$35,000 per year",
    deadline: "January 5, 2026",
    eligibilityRequirements: ["International student", "3.7+ GPA", "1350+ SAT", "Pursuing STEM degree"],
    applicationLink: "https://example.com/international-stem-award",
    colleges: ["2", "4", "6"],
    fieldOfStudy: ["Computer Science", "Engineering", "Mathematics", "Biology", "Chemistry", "Physics"],
    scholarshipType: "merit",
    minimumGPA: 3.7,
    minimumSAT: 1350,
    country: "International",
    isFullRide: false
  },
  {
    id: "7",
    name: "First Generation Scholar Program",
    description: "Supporting students who are the first in their family to attend college",
    amount: "$22,000 per year",
    deadline: "February 1, 2026",
    eligibilityRequirements: ["First-generation college student", "3.0+ GPA", "Essay required"],
    applicationLink: "https://example.com/first-gen-scholarship",
    colleges: ["1", "3", "5", "7"],
    fieldOfStudy: ["Any"],
    scholarshipType: "diversity",
    minimumGPA: 3.0,
    isFullRide: false
  },
  {
    id: "8",
    name: "Undergraduate Research Fellowship",
    description: "Intensive research opportunity with faculty mentorship and funding",
    amount: "$10,000 + $5,000 research budget",
    deadline: "March 31, 2026",
    eligibilityRequirements: ["Research proposal", "Faculty endorsement", "3.6+ GPA", "Interview required"],
    applicationLink: "https://example.com/research-fellowship",
    colleges: ["1", "2", "6"],
    fieldOfStudy: ["Any"],
    scholarshipType: "research",
    minimumGPA: 3.6,
    isFullRide: false
  }
];

export const scholarshipTypes = [
  { value: "merit", label: "Merit-Based" },
  { value: "need", label: "Need-Based" },
  { value: "research", label: "Research/Project-Based" },
  { value: "diversity", label: "Diversity & Inclusion" }
];

export const degreeTypes = [
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "phd", label: "PhD" }
];

export const fieldsOfStudy = [
  { value: "Any", label: "Any Field" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Engineering", label: "Engineering" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Biology", label: "Biology" },
  { value: "Business", label: "Business" },
  { value: "Economics", label: "Economics" },
  { value: "Arts", label: "Arts" },
  { value: "Humanities", label: "Humanities" },
  { value: "Social Sciences", label: "Social Sciences" },
  { value: "Medicine", label: "Medicine" },
  { value: "Law", label: "Law" }
];
