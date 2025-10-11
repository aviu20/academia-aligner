import { CostBreakdown, FundingSources } from "@/types/calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, DollarSign, Book, Home, Utensils, Bus, Smartphone } from "lucide-react";
import { getSavingsTips } from "@/utils/calculatorHelpers";

interface SavingsTipsProps {
  costs: CostBreakdown;
  funding: FundingSources;
}

const tipIcons: Record<string, any> = {
  food: Utensils,
  entertainment: Lightbulb,
  transportation: Bus,
  housing: Home,
  books: Book,
  phone: Smartphone,
  default: DollarSign
};

export function SavingsTips({ costs, funding }: SavingsTipsProps) {
  const tips = getSavingsTips(costs, funding);

  const getIconForTip = (tip: string): any => {
    const lowerTip = tip.toLowerCase();
    if (lowerTip.includes('food') || lowerTip.includes('meal')) return tipIcons.food;
    if (lowerTip.includes('entertainment')) return tipIcons.entertainment;
    if (lowerTip.includes('transportation')) return tipIcons.transportation;
    if (lowerTip.includes('housing') || lowerTip.includes('apartment')) return tipIcons.housing;
    if (lowerTip.includes('book') || lowerTip.includes('textbook')) return tipIcons.books;
    if (lowerTip.includes('phone')) return tipIcons.phone;
    return tipIcons.default;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Money-Saving Tips
        </CardTitle>
        <CardDescription>
          Personalized suggestions based on your budget
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {tips.length === 0 ? (
          <Alert>
            <AlertDescription>
              Your budget looks well-balanced! Keep tracking your expenses and look for scholarship opportunities.
            </AlertDescription>
          </Alert>
        ) : (
          tips.map((tip, index) => {
            const Icon = getIconForTip(tip);
            return (
              <Alert key={index}>
                <Icon className="h-4 w-4" />
                <AlertDescription className="ml-2">{tip}</AlertDescription>
              </Alert>
            );
          })
        )}

        <div className="mt-6 pt-6 border-t space-y-3">
          <h4 className="font-semibold text-sm">General Money-Saving Strategies:</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Apply for multiple scholarships - even small ones add up</li>
            <li>• Buy used textbooks or use library copies when possible</li>
            <li>• Take advantage of student discounts everywhere</li>
            <li>• Cook meals in bulk and freeze portions</li>
            <li>• Use campus gym and facilities instead of paid memberships</li>
            <li>• Share streaming services with roommates</li>
            <li>• Apply for RA (Resident Assistant) positions for free housing</li>
            <li>• Look for on-campus jobs that offer tuition benefits</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
