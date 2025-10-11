import { FundingSources } from "@/types/calculator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/calculatorHelpers";

interface FundingCalculatorProps {
  funding: FundingSources;
  onUpdate: (funding: Partial<FundingSources>) => void;
}

export function FundingCalculator({ funding, onUpdate }: FundingCalculatorProps) {
  const totalFunding = Object.values(funding).reduce((sum, amount) => sum + amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funding Sources</CardTitle>
        <CardDescription>Enter all sources of funding for the academic year</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="familyContribution">Family Contribution</Label>
          <Input
            id="familyContribution"
            type="number"
            value={funding.familyContribution}
            onChange={(e) => onUpdate({ familyContribution: Number(e.target.value) })}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="scholarships">Scholarships</Label>
          <Input
            id="scholarships"
            type="number"
            value={funding.scholarships}
            onChange={(e) => onUpdate({ scholarships: Number(e.target.value) })}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="grants">Grants (Need-Based Aid)</Label>
          <Input
            id="grants"
            type="number"
            value={funding.grants}
            onChange={(e) => onUpdate({ grants: Number(e.target.value) })}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workStudy">Federal Work-Study</Label>
          <Input
            id="workStudy"
            type="number"
            value={funding.workStudy}
            onChange={(e) => onUpdate({ workStudy: Number(e.target.value) })}
            placeholder="0"
          />
          <p className="text-sm text-muted-foreground">Typical range: $2,000-4,000/year</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summerEarnings">Summer Earnings</Label>
          <Input
            id="summerEarnings"
            type="number"
            value={funding.summerEarnings}
            onChange={(e) => onUpdate({ summerEarnings: Number(e.target.value) })}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="partTimeJob">Part-Time Job (During School Year)</Label>
          <Input
            id="partTimeJob"
            type="number"
            value={funding.partTimeJob}
            onChange={(e) => onUpdate({ partTimeJob: Number(e.target.value) })}
            placeholder="0"
          />
          <p className="text-sm text-muted-foreground">
            Example: 10 hrs/week × $15/hr × 30 weeks = $4,500
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="federalLoans">Federal Student Loans</Label>
          <Input
            id="federalLoans"
            type="number"
            value={funding.federalLoans}
            onChange={(e) => onUpdate({ federalLoans: Number(e.target.value) })}
            placeholder="0"
          />
          <p className="text-sm text-muted-foreground">
            Annual limit: $5,500 (freshman), $6,500 (sophomore), $7,500 (junior/senior)
          </p>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Funding:</span>
            <span className="text-2xl font-bold text-primary">{formatCurrency(totalFunding)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
