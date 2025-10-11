import { useState, useEffect } from 'react';
import { CalculatorState, CostBreakdown, FundingSources } from '@/types/calculator';
import { getUniversityById } from '@/data/universityData';

const STORAGE_KEY = 'calculator-data';

const initialCosts: CostBreakdown = {
  tuition: 0,
  fees: 0,
  housing: 0,
  mealPlan: 0,
  books: 0,
  insurance: 2500,
  food: 400,
  transportation: 150,
  phone: 80,
  personal: 100,
  entertainment: 150,
  clothing: 75,
  travelHome: 1000,
  emergency: 500
};

const initialFunding: FundingSources = {
  familyContribution: 0,
  scholarships: 0,
  grants: 0,
  workStudy: 0,
  summerEarnings: 0,
  partTimeJob: 0,
  federalLoans: 0
};

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          selectedUniversities: [],
          housingType: 'on-campus' as const,
          costs: initialCosts,
          funding: initialFunding
        };
      }
    }
    return {
      selectedUniversities: [],
      housingType: 'on-campus' as const,
      costs: initialCosts,
      funding: initialFunding
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addUniversity = (universityId: string) => {
    if (state.selectedUniversities.length < 3 && !state.selectedUniversities.includes(universityId)) {
      const university = getUniversityById(universityId);
      if (university) {
        const newCosts = { ...state.costs };
        
        if (state.selectedUniversities.length === 0) {
          newCosts.tuition = university.tuition;
          newCosts.fees = university.requiredFees;
          newCosts.books = university.books;
          
          if (state.housingType === 'on-campus') {
            newCosts.housing = university.housingOptions.onCampus[0]?.cost || 0;
            newCosts.mealPlan = university.mealPlans[0]?.cost || 0;
          }
        }
        
        setState(prev => ({
          ...prev,
          selectedUniversities: [...prev.selectedUniversities, universityId],
          costs: newCosts
        }));
      }
    }
  };

  const removeUniversity = (universityId: string) => {
    setState(prev => ({
      ...prev,
      selectedUniversities: prev.selectedUniversities.filter(id => id !== universityId)
    }));
  };

  const updateCosts = (costs: Partial<CostBreakdown>) => {
    setState(prev => ({
      ...prev,
      costs: { ...prev.costs, ...costs }
    }));
  };

  const updateFunding = (funding: Partial<FundingSources>) => {
    setState(prev => ({
      ...prev,
      funding: { ...prev.funding, ...funding }
    }));
  };

  const setHousingType = (housingType: 'on-campus' | 'off-campus') => {
    setState(prev => ({ ...prev, housingType }));
  };

  const setDormType = (dormType: string) => {
    setState(prev => ({ ...prev, dormType }));
  };

  const setMealPlan = (mealPlanIndex: number) => {
    setState(prev => ({ ...prev, mealPlanIndex }));
  };

  const resetCalculator = () => {
    setState({
      selectedUniversities: [],
      housingType: 'on-campus',
      costs: initialCosts,
      funding: initialFunding
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    state,
    addUniversity,
    removeUniversity,
    updateCosts,
    updateFunding,
    setHousingType,
    setDormType,
    setMealPlan,
    resetCalculator
  };
}
