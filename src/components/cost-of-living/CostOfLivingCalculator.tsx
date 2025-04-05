
import React, { useState, useEffect } from 'react';
import { useUserProfile } from '@/data/userData';
import { 
  costOfLivingData, 
  getCityByLocation, 
  calculateConvertedCost,
  currencySymbols,
  CostBreakdown
} from '@/data/costOfLivingData';
import { colleges } from '@/data/collegeData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend,
  Tooltip as RechartTooltip
} from 'recharts';
import { Home, Lightbulb, ShoppingCart, Train, Heart, GraduationCap, MoreHorizontal } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface CostOfLivingCalculatorProps {
  collegeId?: string;
}

const CostOfLivingCalculator: React.FC<CostOfLivingCalculatorProps> = ({ collegeId }) => {
  const { profile } = useUserProfile();
  const [selectedCollegeId, setSelectedCollegeId] = useState(collegeId || '');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [currency, setCurrency] = useState('USD');
  const [costs, setCosts] = useState<CostBreakdown | null>(null);
  const [currencySymbol, setCurrencySymbol] = useState('$');
  
  // Set initial college if provided
  useEffect(() => {
    if (collegeId) {
      const college = colleges.find(c => c.id === collegeId);
      if (college) {
        setSelectedCollegeId(collegeId);
        // Extract city and state from college location
        const locationParts = college.location.split(', ');
        const state = locationParts[0]; // First part is the state (e.g., "West Coast")
        // For city, we'll use the state as a default since college doesn't have city
        const city = state;
        setSelectedState(state);
        setSelectedCity(city);
        loadCostData(city, state);
      }
    }
  }, [collegeId]);
  
  // Load cost data when city/state changes
  const loadCostData = (city: string, state: string) => {
    const cityData = getCityByLocation(city, state);
    
    if (cityData) {
      // Get costs in selected currency
      const convertedCosts = calculateConvertedCost(
        cityData.costs, 
        cityData.currencyCode, 
        currency
      );
      
      setCosts(convertedCosts);
      setSelectedCity(cityData.city);
      setSelectedState(cityData.state);
      setSelectedCountry(cityData.country);
    } else {
      // If no exact match, use approximate data from the same state
      const stateMatch = costOfLivingData.find(data => 
        data.state.toLowerCase() === state.toLowerCase()
      );
      
      if (stateMatch) {
        const convertedCosts = calculateConvertedCost(
          stateMatch.costs,
          stateMatch.currencyCode,
          currency
        );
        
        setCosts(convertedCosts);
        setSelectedCity(city); // Keep the requested city name
        setSelectedState(state);
        setSelectedCountry(stateMatch.country);
      } else {
        // Default to first entry if no match
        const defaultCity = costOfLivingData[0];
        const convertedCosts = calculateConvertedCost(
          defaultCity.costs,
          defaultCity.currencyCode,
          currency
        );
        
        setCosts(convertedCosts);
        setSelectedCity(defaultCity.city);
        setSelectedState(defaultCity.state);
        setSelectedCountry(defaultCity.country);
      }
    }
  };
  
  // Handle college selection change
  const handleCollegeChange = (collegeId: string) => {
    setSelectedCollegeId(collegeId);
    const college = colleges.find(c => c.id === collegeId);
    
    if (college) {
      // Extract state from college location and use it as city too
      const state = college.location.split(', ')[0];
      const city = state; // Using state as city since we don't have city
      setSelectedState(state);
      setSelectedCity(city);
      loadCostData(city, state);
    }
  };
  
  // Handle currency change
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    setCurrencySymbol(currencySymbols[newCurrency as keyof typeof currencySymbols] || '$');
    
    if (selectedCity && selectedState) {
      loadCostData(selectedCity, selectedState);
    }
  };
  
  // Prepare data for pie chart
  const getPieChartData = () => {
    if (!costs) return [];
    
    return [
      { name: 'Rent', value: costs.rent, fill: '#8884d8', icon: Home },
      { name: 'Utilities', value: costs.utilities, fill: '#83a6ed', icon: Lightbulb },
      { name: 'Food', value: costs.food, fill: '#8dd1e1', icon: ShoppingCart },
      { name: 'Transportation', value: costs.transportation, fill: '#82ca9d', icon: Train },
      { name: 'Health Insurance', value: costs.healthInsurance, fill: '#a4de6c', icon: Heart },
      { name: 'Tuition', value: costs.tuition, fill: '#d0ed57', icon: GraduationCap },
      { name: 'Miscellaneous', value: costs.misc, fill: '#ffc658', icon: MoreHorizontal }
    ];
  };
  
  // Calculate total monthly cost
  const getTotalMonthlyCost = () => {
    if (!costs) return 0;
    
    return (
      costs.rent +
      costs.utilities +
      costs.food +
      costs.transportation +
      costs.healthInsurance +
      costs.tuition +
      costs.misc
    );
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `${currencySymbol}${amount.toLocaleString()}`;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Cost of Living Calculator</h1>
        <p className="text-muted-foreground">
          Estimate your monthly expenses at different college locations
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Location Settings</CardTitle>
          <CardDescription>
            Select a college or specify a location to calculate costs
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-1 block">College</label>
              <Select value={selectedCollegeId} onValueChange={handleCollegeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a college" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map(college => (
                    <SelectItem key={college.id} value={college.id}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Currency</label>
              <Select value={currency} onValueChange={handleCurrencyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="CNY">CNY (¥)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                  <SelectItem value="AUD">AUD (A$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-2 lg:col-span-1">
              <label className="text-sm font-medium mb-1 block">Calculate</label>
              <Button 
                className="w-full transitions-all"
                onClick={() => loadCostData(selectedCity, selectedState)}
              >
                Calculate Costs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {costs && (
        <Card>
          <CardHeader>
            <CardTitle>
              Estimated Monthly Costs in {selectedCity}, {selectedState}
            </CardTitle>
            <CardDescription>
              Based on average costs for a student living in this area
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-80 w-full">
                <ChartContainer 
                  config={
                    getPieChartData().reduce((config, item) => {
                      config[item.name] = {
                        color: item.fill,
                        icon: item.icon
                      };
                      return config;
                    }, {} as any)
                  }
                >
                  <PieChart>
                    <Pie
                      data={getPieChartData()}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                        const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
                        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                        return percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : '';
                      }}
                    >
                      {getPieChartData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <h3 className="text-lg font-medium mb-1">Total Monthly Cost</h3>
                  <p className="text-3xl font-bold">{formatCurrency(getTotalMonthlyCost())}</p>
                </div>
                
                <div className="space-y-2">
                  {getPieChartData().map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-sm text-muted-foreground mt-4">
                  <p>* Costs are estimates based on average data for the area</p>
                  <p>* Tuition costs are shown as monthly averages</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CostOfLivingCalculator;
