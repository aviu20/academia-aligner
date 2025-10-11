import { University } from "@/types/calculator";

export const UNIVERSITIES: University[] = [
  {
    id: "stanford",
    name: "Stanford University",
    location: "Palo Alto, CA",
    state: "California",
    tuition: 62484,
    roomBoard: 19000,
    books: 1200,
    requiredFees: 750,
    cityIndex: 175,
    indexBreakdown: {
      housing: 180,
      food: 160,
      transportation: 150
    },
    housingOptions: {
      onCampus: [
        { type: "Standard Double", cost: 10500 },
        { type: "Standard Single", cost: 12800 },
        { type: "Suite Double", cost: 11200 },
        { type: "Suite Single", cost: 13500 }
      ],
      offCampus: {
        studio: 2800,
        oneBed: 3200,
        shared: 1600
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 8500 },
      { name: "14 Meals/Week", cost: 7200 },
      { name: "10 Meals/Week", cost: 6000 }
    ],
    financialAidUrl: "https://financialaid.stanford.edu"
  },
  {
    id: "mit",
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    state: "Massachusetts",
    tuition: 59750,
    roomBoard: 18730,
    books: 1000,
    requiredFees: 368,
    cityIndex: 165,
    indexBreakdown: {
      housing: 170,
      food: 155,
      transportation: 145
    },
    housingOptions: {
      onCampus: [
        { type: "Double Room", cost: 10430 },
        { type: "Single Room", cost: 12650 },
        { type: "Economy Double", cost: 9200 }
      ],
      offCampus: {
        studio: 2500,
        oneBed: 2900,
        shared: 1400
      }
    },
    mealPlans: [
      { name: "Unlimited Plus", cost: 8300 },
      { name: "14 Meals/Week", cost: 7000 },
      { name: "10 Meals/Week", cost: 5800 }
    ],
    financialAidUrl: "https://sfs.mit.edu"
  },
  {
    id: "harvard",
    name: "Harvard University",
    location: "Cambridge, MA",
    state: "Massachusetts",
    tuition: 57261,
    roomBoard: 19502,
    books: 1000,
    requiredFees: 4315,
    cityIndex: 165,
    indexBreakdown: {
      housing: 170,
      food: 155,
      transportation: 145
    },
    housingOptions: {
      onCampus: [
        { type: "Standard Double", cost: 11364 },
        { type: "Standard Single", cost: 13200 },
        { type: "Suite", cost: 12500 }
      ],
      offCampus: {
        studio: 2500,
        oneBed: 2900,
        shared: 1400
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 8138 },
      { name: "14 Meals/Week", cost: 6900 },
      { name: "10 Meals/Week", cost: 5700 }
    ],
    financialAidUrl: "https://college.harvard.edu/financial-aid"
  },
  {
    id: "usc",
    name: "University of Southern California",
    location: "Los Angeles, CA",
    state: "California",
    tuition: 66640,
    roomBoard: 17664,
    books: 1200,
    requiredFees: 1015,
    cityIndex: 155,
    indexBreakdown: {
      housing: 160,
      food: 145,
      transportation: 140
    },
    housingOptions: {
      onCampus: [
        { type: "Double Room", cost: 10080 },
        { type: "Single Room", cost: 12400 },
        { type: "Suite Double", cost: 11200 }
      ],
      offCampus: {
        studio: 2200,
        oneBed: 2700,
        shared: 1300
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 7584 },
      { name: "Cardinal (14 meals)", cost: 6500 },
      { name: "Gold (10 meals)", cost: 5400 }
    ],
    financialAidUrl: "https://financialaid.usc.edu"
  },
  {
    id: "nyu",
    name: "New York University",
    location: "New York, NY",
    state: "New York",
    tuition: 60438,
    roomBoard: 20776,
    books: 1070,
    requiredFees: 2984,
    cityIndex: 170,
    indexBreakdown: {
      housing: 185,
      food: 160,
      transportation: 150
    },
    housingOptions: {
      onCampus: [
        { type: "Low Cost Triple", cost: 11200 },
        { type: "Low Cost Double", cost: 13800 },
        { type: "Standard Double", cost: 15400 }
      ],
      offCampus: {
        studio: 2800,
        oneBed: 3400,
        shared: 1600
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 5376 },
      { name: "175 Block", cost: 4800 },
      { name: "125 Block", cost: 4200 }
    ],
    financialAidUrl: "https://www.nyu.edu/admissions/financial-aid-and-scholarships.html"
  },
  {
    id: "umich",
    name: "University of Michigan",
    location: "Ann Arbor, MI",
    state: "Michigan",
    tuition: 17786,
    roomBoard: 13720,
    books: 1048,
    requiredFees: 354,
    cityIndex: 105,
    indexBreakdown: {
      housing: 110,
      food: 105,
      transportation: 95
    },
    housingOptions: {
      onCampus: [
        { type: "Standard Double", cost: 7800 },
        { type: "Standard Single", cost: 9500 },
        { type: "Suite Style", cost: 8600 }
      ],
      offCampus: {
        studio: 1200,
        oneBed: 1500,
        shared: 700
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 5920 },
      { name: "150 Block", cost: 5200 },
      { name: "100 Block", cost: 4400 }
    ],
    financialAidUrl: "https://finaid.umich.edu"
  },
  {
    id: "unc",
    name: "University of North Carolina at Chapel Hill",
    location: "Chapel Hill, NC",
    state: "North Carolina",
    tuition: 9018,
    roomBoard: 12692,
    books: 1000,
    requiredFees: 1948,
    cityIndex: 95,
    indexBreakdown: {
      housing: 100,
      food: 95,
      transportation: 85
    },
    housingOptions: {
      onCampus: [
        { type: "Standard Double", cost: 7200 },
        { type: "Suite Double", cost: 8100 },
        { type: "Apartment Style", cost: 9000 }
      ],
      offCampus: {
        studio: 1000,
        oneBed: 1300,
        shared: 600
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 5492 },
      { name: "14 Meals/Week", cost: 4800 },
      { name: "10 Meals/Week", cost: 4000 }
    ],
    financialAidUrl: "https://financialaid.unc.edu"
  },
  {
    id: "utaustin",
    name: "University of Texas at Austin",
    location: "Austin, TX",
    state: "Texas",
    tuition: 11698,
    roomBoard: 13224,
    books: 750,
    requiredFees: 0,
    cityIndex: 110,
    indexBreakdown: {
      housing: 115,
      food: 105,
      transportation: 100
    },
    housingOptions: {
      onCampus: [
        { type: "Standard Double", cost: 7500 },
        { type: "Standard Single", cost: 9200 },
        { type: "Suite Style", cost: 8400 }
      ],
      offCampus: {
        studio: 1300,
        oneBed: 1600,
        shared: 750
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 5724 },
      { name: "14 Meals/Week", cost: 5000 },
      { name: "10 Meals/Week", cost: 4200 }
    ],
    financialAidUrl: "https://onestop.utexas.edu/managing-costs/cost-tuition-rates/"
  },
  {
    id: "uw",
    name: "University of Washington",
    location: "Seattle, WA",
    state: "Washington",
    tuition: 12242,
    roomBoard: 14742,
    books: 900,
    requiredFees: 1206,
    cityIndex: 140,
    indexBreakdown: {
      housing: 150,
      food: 135,
      transportation: 125
    },
    housingOptions: {
      onCampus: [
        { type: "Standard Double", cost: 8400 },
        { type: "Standard Single", cost: 10200 },
        { type: "Suite Double", cost: 9300 }
      ],
      offCampus: {
        studio: 1800,
        oneBed: 2200,
        shared: 1000
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 6342 },
      { name: "14 Meals/Week", cost: 5500 },
      { name: "10 Meals/Week", cost: 4600 }
    ],
    financialAidUrl: "https://www.washington.edu/financialaid/"
  },
  {
    id: "uf",
    name: "University of Florida",
    location: "Gainesville, FL",
    state: "Florida",
    tuition: 6381,
    roomBoard: 10860,
    books: 1000,
    requiredFees: 0,
    cityIndex: 90,
    indexBreakdown: {
      housing: 95,
      food: 90,
      transportation: 85
    },
    housingOptions: {
      onCampus: [
        { type: "Standard Double", cost: 6200 },
        { type: "Suite Double", cost: 7100 },
        { type: "Apartment Style", cost: 7800 }
      ],
      offCampus: {
        studio: 900,
        oneBed: 1200,
        shared: 550
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 4660 },
      { name: "14 Meals/Week", cost: 4100 },
      { name: "10 Meals/Week", cost: 3400 }
    ],
    financialAidUrl: "https://www.sfa.ufl.edu/"
  },
  {
    id: "asu",
    name: "Arizona State University",
    location: "Tempe, AZ",
    state: "Arizona",
    tuition: 11618,
    roomBoard: 14904,
    books: 1056,
    requiredFees: 828,
    cityIndex: 100,
    indexBreakdown: {
      housing: 105,
      food: 100,
      transportation: 95
    },
    housingOptions: {
      onCampus: [
        { type: "Standard Double", cost: 8100 },
        { type: "Suite Double", cost: 9000 },
        { type: "Apartment Style", cost: 9800 }
      ],
      offCampus: {
        studio: 1100,
        oneBed: 1400,
        shared: 650
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 6804 },
      { name: "14 Meals/Week", cost: 5900 },
      { name: "10 Meals/Week", cost: 4900 }
    ],
    financialAidUrl: "https://students.asu.edu/financialaid"
  },
  {
    id: "osu",
    name: "Ohio State University",
    location: "Columbus, OH",
    state: "Ohio",
    tuition: 12859,
    roomBoard: 13602,
    books: 1142,
    requiredFees: 0,
    cityIndex: 95,
    indexBreakdown: {
      housing: 100,
      food: 95,
      transportation: 90
    },
    housingOptions: {
      onCampus: [
        { type: "Standard Double", cost: 7800 },
        { type: "Standard Single", cost: 9400 },
        { type: "Suite Style", cost: 8600 }
      ],
      offCampus: {
        studio: 1000,
        oneBed: 1300,
        shared: 600
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 5802 },
      { name: "14 Meals/Week", cost: 5100 },
      { name: "10 Meals/Week", cost: 4200 }
    ],
    financialAidUrl: "https://sfa.osu.edu/"
  },
  {
    id: "uiowa",
    name: "University of Iowa",
    location: "Iowa City, IA",
    state: "Iowa",
    tuition: 10079,
    roomBoard: 11910,
    books: 970,
    requiredFees: 1561,
    cityIndex: 85,
    indexBreakdown: {
      housing: 90,
      food: 85,
      transportation: 80
    },
    housingOptions: {
      onCampus: [
        { type: "Standard Double", cost: 6800 },
        { type: "Standard Single", cost: 8200 },
        { type: "Suite Double", cost: 7600 }
      ],
      offCampus: {
        studio: 800,
        oneBed: 1000,
        shared: 500
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 5110 },
      { name: "14 Meals/Week", cost: 4500 },
      { name: "10 Meals/Week", cost: 3700 }
    ],
    financialAidUrl: "https://financialaid.uiowa.edu/"
  },
  {
    id: "berkeley",
    name: "UC Berkeley",
    location: "Berkeley, CA",
    state: "California",
    tuition: 14312,
    roomBoard: 20534,
    books: 1000,
    requiredFees: 1704,
    cityIndex: 170,
    indexBreakdown: {
      housing: 175,
      food: 160,
      transportation: 145
    },
    housingOptions: {
      onCampus: [
        { type: "Standard Double", cost: 11700 },
        { type: "Standard Single", cost: 14200 },
        { type: "Suite Double", cost: 12800 }
      ],
      offCampus: {
        studio: 2400,
        oneBed: 2900,
        shared: 1400
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 8834 },
      { name: "14 Meals/Week", cost: 7600 },
      { name: "10 Meals/Week", cost: 6300 }
    ],
    financialAidUrl: "https://financialaid.berkeley.edu/"
  },
  {
    id: "duke",
    name: "Duke University",
    location: "Durham, NC",
    state: "North Carolina",
    tuition: 63450,
    roomBoard: 18486,
    books: 1434,
    requiredFees: 2144,
    cityIndex: 100,
    indexBreakdown: {
      housing: 105,
      food: 100,
      transportation: 90
    },
    housingOptions: {
      onCampus: [
        { type: "Standard Double", cost: 10500 },
        { type: "Standard Single", cost: 12800 },
        { type: "Suite Double", cost: 11400 }
      ],
      offCampus: {
        studio: 1100,
        oneBed: 1400,
        shared: 650
      }
    },
    mealPlans: [
      { name: "Unlimited", cost: 7986 },
      { name: "14 Meals/Week", cost: 6900 },
      { name: "10 Meals/Week", cost: 5700 }
    ],
    financialAidUrl: "https://financialaid.duke.edu/"
  }
];

export function getUniversityById(id: string): University | undefined {
  return UNIVERSITIES.find(uni => uni.id === id);
}

export function getUniversitiesByState(state: string): University[] {
  return UNIVERSITIES.filter(uni => uni.state === state);
}

export function searchUniversities(query: string): University[] {
  const lowerQuery = query.toLowerCase();
  return UNIVERSITIES.filter(uni => 
    uni.name.toLowerCase().includes(lowerQuery) ||
    uni.location.toLowerCase().includes(lowerQuery) ||
    uni.state.toLowerCase().includes(lowerQuery)
  );
}
