export interface University {
  id: string;
  name: string;
  location: string;
  state: string;
  tuition: number;
  roomBoard: number;
  books: number;
  requiredFees: number;
  cityIndex: number;
  indexBreakdown: {
    housing: number;
    food: number;
    transportation: number;
  };
  housingOptions: {
    onCampus: Array<{
      type: string;
      cost: number;
    }>;
    offCampus: {
      studio: number;
      oneBed: number;
      shared: number;
    };
  };
  mealPlans: Array<{
    name: string;
    cost: number;
  }>;
  financialAidUrl: string;
}

export interface CostBreakdown {
  tuition: number;
  fees: number;
  housing: number;
  mealPlan: number;
  books: number;
  insurance: number;
  food: number;
  transportation: number;
  phone: number;
  personal: number;
  entertainment: number;
  clothing: number;
  travelHome: number;
  emergency: number;
}

export interface FundingSources {
  familyContribution: number;
  scholarships: number;
  grants: number;
  workStudy: number;
  summerEarnings: number;
  partTimeJob: number;
  federalLoans: number;
}

export interface CalculatorState {
  selectedUniversities: string[];
  housingType: 'on-campus' | 'off-campus';
  dormType?: string;
  mealPlanIndex?: number;
  costs: CostBreakdown;
  funding: FundingSources;
}
