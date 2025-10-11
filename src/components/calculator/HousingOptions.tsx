import { University } from "@/types/calculator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/calculatorHelpers";

interface HousingOptionsProps {
  university: University;
  housingType: 'on-campus' | 'off-campus';
  onHousingTypeChange: (type: 'on-campus' | 'off-campus') => void;
  onDormSelect: (cost: number, type: string) => void;
  onMealPlanSelect: (cost: number, index: number) => void;
}

export function HousingOptions({
  university,
  housingType,
  onHousingTypeChange,
  onDormSelect,
  onMealPlanSelect
}: HousingOptionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Housing & Dining Options</CardTitle>
        <CardDescription>Select your housing preference and meal plan</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Housing Type</Label>
          <RadioGroup value={housingType} onValueChange={(value) => onHousingTypeChange(value as 'on-campus' | 'off-campus')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="on-campus" id="on-campus" />
              <Label htmlFor="on-campus" className="font-normal cursor-pointer">On-Campus Housing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="off-campus" id="off-campus" />
              <Label htmlFor="off-campus" className="font-normal cursor-pointer">Off-Campus Housing</Label>
            </div>
          </RadioGroup>
        </div>

        {housingType === 'on-campus' ? (
          <>
            <div className="space-y-3">
              <Label htmlFor="dorm-type">Dorm Type</Label>
              <Select onValueChange={(value) => {
                const index = parseInt(value);
                const dorm = university.housingOptions.onCampus[index];
                onDormSelect(dorm.cost, dorm.type);
              }}>
                <SelectTrigger id="dorm-type">
                  <SelectValue placeholder="Select dorm type" />
                </SelectTrigger>
                <SelectContent>
                  {university.housingOptions.onCampus.map((dorm, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {dorm.type} - {formatCurrency(dorm.cost)}/year
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="meal-plan">Meal Plan</Label>
              <Select onValueChange={(value) => {
                const index = parseInt(value);
                const plan = university.mealPlans[index];
                onMealPlanSelect(plan.cost, index);
              }}>
                <SelectTrigger id="meal-plan">
                  <SelectValue placeholder="Select meal plan" />
                </SelectTrigger>
                <SelectContent>
                  {university.mealPlans.map((plan, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {plan.name} - {formatCurrency(plan.cost)}/year
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <Label htmlFor="off-campus-type">Apartment Type</Label>
            <Select onValueChange={(value) => {
              const costs = university.housingOptions.offCampus;
              const monthlyCost = value === 'studio' ? costs.studio : 
                                  value === 'oneBed' ? costs.oneBed : costs.shared;
              onDormSelect(monthlyCost * 12, value);
            }}>
              <SelectTrigger id="off-campus-type">
                <SelectValue placeholder="Select apartment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="studio">
                  Studio - {formatCurrency(university.housingOptions.offCampus.studio)}/month
                </SelectItem>
                <SelectItem value="oneBed">
                  1 Bedroom - {formatCurrency(university.housingOptions.offCampus.oneBed)}/month
                </SelectItem>
                <SelectItem value="shared">
                  Shared Room - {formatCurrency(university.housingOptions.offCampus.shared)}/month
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Off-campus: You'll need to budget separately for groceries and utilities
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
