import { CostBreakdown, FundingSources } from "@/types/calculator";

export function calculateTotalCost(costs: CostBreakdown): number {
  return Object.values(costs).reduce((sum, cost) => sum + cost, 0);
}

export function calculateTotalFunding(funding: FundingSources): number {
  return Object.values(funding).reduce((sum, amount) => sum + amount, 0);
}

export function calculateFundingGap(costs: CostBreakdown, funding: FundingSources): number {
  return calculateTotalCost(costs) - calculateTotalFunding(funding);
}

export function calculateMonthlyCost(annualCost: number): number {
  return Math.round(annualCost / 12);
}

export function calculateFourYearCost(annualCost: number): number {
  return annualCost * 4;
}

export function getCostBreakdownPercentages(costs: CostBreakdown): Record<string, number> {
  const total = calculateTotalCost(costs);
  const percentages: Record<string, number> = {};
  
  Object.entries(costs).forEach(([key, value]) => {
    percentages[key] = total > 0 ? Math.round((value / total) * 100) : 0;
  });
  
  return percentages;
}

export function getFundingCoveragePercentage(costs: CostBreakdown, funding: FundingSources): number {
  const totalCost = calculateTotalCost(costs);
  const totalFunding = calculateTotalFunding(funding);
  return totalCost > 0 ? Math.round((totalFunding / totalCost) * 100) : 0;
}

export function getSavingsTips(costs: CostBreakdown, funding: FundingSources): string[] {
  const tips: string[] = [];
  const gap = calculateFundingGap(costs, funding);
  
  if (gap > 0) {
    if (costs.food > 500) {
      tips.push("Consider reducing food expenses by meal prepping and cooking at home. Potential savings: $200-300/month");
    }
    if (costs.entertainment > 200) {
      tips.push("Look for free campus events and student discounts. Potential savings: $100-150/month");
    }
    if (costs.transportation > 150) {
      tips.push("Use public transportation or bike instead of driving. Potential savings: $50-100/month");
    }
    if (costs.housing > 12000 && costs.housing < 15000) {
      tips.push("Consider sharing an apartment with roommates to reduce housing costs by 30-40%");
    }
    if (costs.books > 1000) {
      tips.push("Buy used textbooks or rent them. Use the library when possible. Potential savings: $400-600/year");
    }
  }
  
  if (funding.workStudy === 0) {
    tips.push("Apply for work-study positions on campus. Average earnings: $2,000-4,000/year");
  }
  
  if (funding.scholarships < 5000) {
    tips.push("Search for external scholarships. Even small scholarships add up!");
  }
  
  if (costs.phone > 100) {
    tips.push("Switch to a student phone plan or family plan. Potential savings: $30-50/month");
  }
  
  return tips;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function getCategoryLabel(key: string): string {
  const labels: Record<string, string> = {
    tuition: "Tuition",
    fees: "Fees",
    housing: "Housing",
    mealPlan: "Meal Plan",
    books: "Books & Supplies",
    insurance: "Health Insurance",
    food: "Food & Groceries",
    transportation: "Transportation",
    phone: "Phone & Internet",
    personal: "Personal Care",
    entertainment: "Entertainment",
    clothing: "Clothing",
    travelHome: "Travel Home",
    emergency: "Emergency Fund"
  };
  return labels[key] || key;
}

export function getFundingLabel(key: string): string {
  const labels: Record<string, string> = {
    familyContribution: "Family Contribution",
    scholarships: "Scholarships",
    grants: "Grants",
    workStudy: "Work-Study",
    summerEarnings: "Summer Earnings",
    partTimeJob: "Part-Time Job",
    federalLoans: "Federal Loans"
  };
  return labels[key] || key;
}

export function getCostCategory(key: string): 'fixed' | 'variable' {
  const fixedCosts = ['tuition', 'fees', 'housing', 'mealPlan', 'books', 'insurance'];
  return fixedCosts.includes(key) ? 'fixed' : 'variable';
}

export function calculateFixedCosts(costs: CostBreakdown): number {
  return costs.tuition + costs.fees + costs.housing + costs.mealPlan + costs.books + costs.insurance;
}

export function calculateVariableCosts(costs: CostBreakdown): number {
  return costs.food + costs.transportation + costs.phone + costs.personal + 
         costs.entertainment + costs.clothing + costs.travelHome + costs.emergency;
}
