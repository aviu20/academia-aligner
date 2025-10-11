import { CostBreakdown } from "@/types/calculator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/calculatorHelpers";

interface CostInputFormProps {
  costs: CostBreakdown;
  onUpdate: (costs: Partial<CostBreakdown>) => void;
}

export function CostInputForm({ costs, onUpdate }: CostInputFormProps) {
  return (
    <Tabs defaultValue="fixed" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="fixed">Fixed Costs</TabsTrigger>
        <TabsTrigger value="variable">Variable Costs</TabsTrigger>
        <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
      </TabsList>

      <TabsContent value="fixed" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Fixed Annual Costs</CardTitle>
            <CardDescription>These costs are typically set by the university</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tuition">Tuition</Label>
              <Input
                id="tuition"
                type="number"
                value={costs.tuition}
                onChange={(e) => onUpdate({ tuition: Number(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fees">Required Fees</Label>
              <Input
                id="fees"
                type="number"
                value={costs.fees}
                onChange={(e) => onUpdate({ fees: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="housing">Housing (Annual)</Label>
              <Input
                id="housing"
                type="number"
                value={costs.housing}
                onChange={(e) => onUpdate({ housing: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mealPlan">Meal Plan (Annual)</Label>
              <Input
                id="mealPlan"
                type="number"
                value={costs.mealPlan}
                onChange={(e) => onUpdate({ mealPlan: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="books">Books & Supplies (Annual)</Label>
              <Input
                id="books"
                type="number"
                value={costs.books}
                onChange={(e) => onUpdate({ books: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="insurance">Health Insurance (Annual)</Label>
              <Input
                id="insurance"
                type="number"
                value={costs.insurance}
                onChange={(e) => onUpdate({ insurance: Number(e.target.value) })}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="variable" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Variable Costs</CardTitle>
            <CardDescription>Adjust these based on your spending habits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="food">Food & Groceries</Label>
                <span className="text-sm font-medium">{formatCurrency(costs.food * 12)}/year</span>
              </div>
              <Slider
                id="food"
                min={200}
                max={800}
                step={50}
                value={[costs.food]}
                onValueChange={([value]) => onUpdate({ food: value })}
                aria-label="Monthly food budget"
              />
              <p className="text-sm text-muted-foreground">{formatCurrency(costs.food)}/month</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="transportation">Transportation</Label>
                <span className="text-sm font-medium">{formatCurrency(costs.transportation * 12)}/year</span>
              </div>
              <Slider
                id="transportation"
                min={0}
                max={500}
                step={25}
                value={[costs.transportation]}
                onValueChange={([value]) => onUpdate({ transportation: value })}
                aria-label="Monthly transportation budget"
              />
              <p className="text-sm text-muted-foreground">{formatCurrency(costs.transportation)}/month</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="phone">Phone & Internet</Label>
                <span className="text-sm font-medium">{formatCurrency(costs.phone * 12)}/year</span>
              </div>
              <Slider
                id="phone"
                min={50}
                max={200}
                step={10}
                value={[costs.phone]}
                onValueChange={([value]) => onUpdate({ phone: value })}
                aria-label="Monthly phone and internet budget"
              />
              <p className="text-sm text-muted-foreground">{formatCurrency(costs.phone)}/month</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="personal">Personal Care</Label>
                <span className="text-sm font-medium">{formatCurrency(costs.personal * 12)}/year</span>
              </div>
              <Slider
                id="personal"
                min={50}
                max={200}
                step={10}
                value={[costs.personal]}
                onValueChange={([value]) => onUpdate({ personal: value })}
                aria-label="Monthly personal care budget"
              />
              <p className="text-sm text-muted-foreground">{formatCurrency(costs.personal)}/month</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="lifestyle" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Lifestyle & Other Costs</CardTitle>
            <CardDescription>Entertainment, travel, and emergency expenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="entertainment">Entertainment</Label>
                <span className="text-sm font-medium">{formatCurrency(costs.entertainment * 12)}/year</span>
              </div>
              <Slider
                id="entertainment"
                min={50}
                max={500}
                step={25}
                value={[costs.entertainment]}
                onValueChange={([value]) => onUpdate({ entertainment: value })}
                aria-label="Monthly entertainment budget"
              />
              <p className="text-sm text-muted-foreground">{formatCurrency(costs.entertainment)}/month</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="clothing">Clothing</Label>
                <span className="text-sm font-medium">{formatCurrency(costs.clothing * 12)}/year</span>
              </div>
              <Slider
                id="clothing"
                min={50}
                max={300}
                step={25}
                value={[costs.clothing]}
                onValueChange={([value]) => onUpdate({ clothing: value })}
                aria-label="Monthly clothing budget"
              />
              <p className="text-sm text-muted-foreground">{formatCurrency(costs.clothing)}/month</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelHome">Travel Home (Annual)</Label>
              <Input
                id="travelHome"
                type="number"
                value={costs.travelHome}
                onChange={(e) => onUpdate({ travelHome: Number(e.target.value) })}
              />
              <p className="text-sm text-muted-foreground">Estimate for trips home during breaks</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency">Emergency Fund (Annual)</Label>
              <Input
                id="emergency"
                type="number"
                value={costs.emergency}
                onChange={(e) => onUpdate({ emergency: Number(e.target.value) })}
              />
              <p className="text-sm text-muted-foreground">Recommended: $500-1000/year</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
