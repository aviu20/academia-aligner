import { useState } from "react";
import { useCalculator } from "@/hooks/useCalculator";
import { getUniversityById } from "@/data/universityData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UniversitySelector } from "@/components/calculator/UniversitySelector";
import { HousingOptions } from "@/components/calculator/HousingOptions";
import { CostInputForm } from "@/components/calculator/CostInputForm";
import { FundingCalculator } from "@/components/calculator/FundingCalculator";
import { ResultsDashboard } from "@/components/calculator/ResultsDashboard";
import { ComparisonView } from "@/components/calculator/ComparisonView";
import { SavingsTips } from "@/components/calculator/SavingsTips";
import { Download, RotateCcw } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet";

export default function CostCalculator() {
  const {
    state,
    addUniversity,
    removeUniversity,
    updateCosts,
    updateFunding,
    setHousingType,
    setDormType,
    setMealPlan,
    resetCalculator
  } = useCalculator();

  const [currentStep, setCurrentStep] = useState(0);

  const primaryUniversity = state.selectedUniversities[0] 
    ? getUniversityById(state.selectedUniversities[0])
    : null;

  const handleHousingTypeChange = (type: 'on-campus' | 'off-campus') => {
    setHousingType(type);
    if (type === 'off-campus') {
      updateCosts({ mealPlan: 0 });
    }
  };

  const handleDormSelect = (cost: number, type: string) => {
    updateCosts({ housing: cost });
    setDormType(type);
  };

  const handleMealPlanSelect = (cost: number, index: number) => {
    updateCosts({ mealPlan: cost });
    setMealPlan(index);
  };

  return (
    <>
      <Helmet>
        <title>College Cost Calculator - Academia Aligner</title>
        <meta name="description" content="Calculate and compare the true cost of attending different universities. Get personalized estimates for tuition, housing, and living expenses." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">College Cost Calculator</h1>
              <p className="text-lg text-muted-foreground">
                Get a realistic estimate of your total college expenses and plan your budget
              </p>
            </div>

            {/* University Selection */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Select Universities</CardTitle>
                <CardDescription>Compare up to 3 universities side-by-side</CardDescription>
              </CardHeader>
              <CardContent>
                <UniversitySelector
                  selectedIds={state.selectedUniversities}
                  onAdd={addUniversity}
                  onRemove={removeUniversity}
                />
              </CardContent>
            </Card>

            {state.selectedUniversities.length > 0 && (
              <>
                {/* Housing Options */}
                {primaryUniversity && (
                  <div className="mb-6">
                    <HousingOptions
                      university={primaryUniversity}
                      housingType={state.housingType}
                      onHousingTypeChange={handleHousingTypeChange}
                      onDormSelect={handleDormSelect}
                      onMealPlanSelect={handleMealPlanSelect}
                    />
                  </div>
                )}

                {/* Main Tabbed Interface */}
                <Tabs defaultValue="costs" className="mb-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="costs">Costs</TabsTrigger>
                    <TabsTrigger value="funding">Funding</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                    <TabsTrigger value="compare">Compare</TabsTrigger>
                  </TabsList>

                  <TabsContent value="costs" className="mt-6">
                    <CostInputForm costs={state.costs} onUpdate={updateCosts} />
                  </TabsContent>

                  <TabsContent value="funding" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <FundingCalculator funding={state.funding} onUpdate={updateFunding} />
                      <SavingsTips costs={state.costs} funding={state.funding} />
                    </div>
                  </TabsContent>

                  <TabsContent value="results" className="mt-6">
                    <ResultsDashboard costs={state.costs} funding={state.funding} />
                  </TabsContent>

                  <TabsContent value="compare" className="mt-6">
                    <ComparisonView
                      universityIds={state.selectedUniversities}
                      costsMap={{ [state.selectedUniversities[0]]: state.costs }}
                    />
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-end">
                  <Button variant="outline" onClick={resetCalculator}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset Calculator
                  </Button>
                  <Button onClick={() => window.print()}>
                    <Download className="mr-2 h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </>
            )}

            {state.selectedUniversities.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    Select a university above to get started with your cost calculation
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
