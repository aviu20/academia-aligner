
export interface CostBreakdown {
  rent: number;
  utilities: number;
  food: number;
  transportation: number;
  healthInsurance: number;
  tuition: number;
  misc: number;
}

export interface CityLivingCost {
  id: string;
  city: string;
  state: string;
  country: string;
  costs: CostBreakdown;
  currencyCode: string;
  currencySymbol: string;
}

export const costOfLivingData: CityLivingCost[] = [
  {
    id: "1",
    city: "Palo Alto",
    state: "California",
    country: "United States",
    costs: {
      rent: 2500,
      utilities: 200,
      food: 600,
      transportation: 150,
      healthInsurance: 300,
      tuition: 4000,
      misc: 400
    },
    currencyCode: "USD",
    currencySymbol: "$"
  },
  {
    id: "2",
    city: "Cambridge",
    state: "Massachusetts",
    country: "United States",
    costs: {
      rent: 2200,
      utilities: 180,
      food: 550,
      transportation: 130,
      healthInsurance: 300,
      tuition: 4500,
      misc: 350
    },
    currencyCode: "USD",
    currencySymbol: "$"
  },
  {
    id: "3",
    city: "Ann Arbor",
    state: "Michigan",
    country: "United States",
    costs: {
      rent: 1500,
      utilities: 150,
      food: 450,
      transportation: 100,
      healthInsurance: 250,
      tuition: 3800,
      misc: 300
    },
    currencyCode: "USD",
    currencySymbol: "$"
  },
  {
    id: "4",
    city: "Ithaca",
    state: "New York",
    country: "United States",
    costs: {
      rent: 1600,
      utilities: 160,
      food: 500,
      transportation: 110,
      healthInsurance: 270,
      tuition: 4200,
      misc: 320
    },
    currencyCode: "USD",
    currencySymbol: "$"
  },
  {
    id: "5",
    city: "Berkeley",
    state: "California",
    country: "United States",
    costs: {
      rent: 2300,
      utilities: 190,
      food: 580,
      transportation: 140,
      healthInsurance: 290,
      tuition: 4100,
      misc: 380
    },
    currencyCode: "USD",
    currencySymbol: "$"
  },
  {
    id: "6",
    city: "Durham",
    state: "North Carolina",
    country: "United States",
    costs: {
      rent: 1400,
      utilities: 140,
      food: 400,
      transportation: 90,
      healthInsurance: 230,
      tuition: 3500,
      misc: 280
    },
    currencyCode: "USD",
    currencySymbol: "$"
  },
  {
    id: "7",
    city: "Nashville",
    state: "Tennessee",
    country: "United States",
    costs: {
      rent: 1500,
      utilities: 145,
      food: 420,
      transportation: 95,
      healthInsurance: 240,
      tuition: 3600,
      misc: 290
    },
    currencyCode: "USD",
    currencySymbol: "$"
  }
];

export const currencyConversion = {
  "USD": 1,
  "EUR": 0.91,
  "GBP": 0.78,
  "INR": 83.21,
  "CNY": 7.22,
  "JPY": 149.5,
  "CAD": 1.36,
  "AUD": 1.51
};

export const currencySymbols = {
  "USD": "$",
  "EUR": "€",
  "GBP": "£",
  "INR": "₹",
  "CNY": "¥",
  "JPY": "¥",
  "CAD": "C$",
  "AUD": "A$"
};

export function getCityById(id: string): CityLivingCost | undefined {
  return costOfLivingData.find(city => city.id === id);
}

export function getCityByLocation(city: string, state: string): CityLivingCost | undefined {
  return costOfLivingData.find(item => 
    item.city.toLowerCase() === city.toLowerCase() && 
    item.state.toLowerCase() === state.toLowerCase()
  );
}

export function calculateConvertedCost(
  costs: CostBreakdown, 
  fromCurrency: string, 
  toCurrency: string
): CostBreakdown {
  if (fromCurrency === toCurrency) return costs;
  
  const fromRate = currencyConversion[fromCurrency as keyof typeof currencyConversion] || 1;
  const toRate = currencyConversion[toCurrency as keyof typeof currencyConversion] || 1;
  const conversionRate = toRate / fromRate;
  
  return {
    rent: Math.round(costs.rent * conversionRate),
    utilities: Math.round(costs.utilities * conversionRate),
    food: Math.round(costs.food * conversionRate),
    transportation: Math.round(costs.transportation * conversionRate),
    healthInsurance: Math.round(costs.healthInsurance * conversionRate),
    tuition: Math.round(costs.tuition * conversionRate),
    misc: Math.round(costs.misc * conversionRate)
  };
}

// Map college IDs to cities
export const collegeIdToCityMap: Record<string, string> = {
  '1': '1',  // Stanford -> Palo Alto
  '2': '2',  // MIT -> Cambridge
  '3': '5',  // Berkeley -> Berkeley
  '4': '2',  // Harvard -> Cambridge
  '6': '3',  // Michigan -> Ann Arbor
  '15': '6', // Duke -> Durham
  // Add more mappings as needed
};

export function getCityByCollegeId(collegeId: string): CityLivingCost | undefined {
  const cityId = collegeIdToCityMap[collegeId];
  return cityId ? getCityById(cityId) : undefined;
}
