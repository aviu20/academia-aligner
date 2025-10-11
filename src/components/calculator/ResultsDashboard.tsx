import { CostBreakdown, FundingSources } from "@/types/calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { 
  calculateTotalCost, 
  calculateTotalFunding,
  calculateFundingGap,
  calculateMonthlyCost,
  calculateFourYearCost,
  formatCurrency,
  getCategoryLabel,
  calculateFixedCosts,
  calculateVariableCosts,
  getFundingCoveragePercentage
} from "@/utils/calculatorHelpers";
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ResultsDashboardProps {
  costs: CostBreakdown;
  funding: FundingSources;
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export function ResultsDashboard({ costs, funding }: ResultsDashboardProps) {
  const totalCost = calculateTotalCost(costs);
  const totalFunding = calculateTotalFunding(funding);
  const gap = calculateFundingGap(costs, funding);
  const coveragePercent = getFundingCoveragePercentage(costs, funding);
  const monthlyCost = calculateMonthlyCost(totalCost);
  const fourYearCost = calculateFourYearCost(totalCost);
  const fixedCosts = calculateFixedCosts(costs);
  const variableCosts = calculateVariableCosts(costs);

  const pieData = Object.entries(costs)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: getCategoryLabel(key),
      value: value
    }));

  const barData = [
    { name: 'Fixed Costs', amount: fixedCosts },
    { name: 'Variable Costs', amount: variableCosts }
  ];

  const getFundingStatus = () => {
    if (coveragePercent >= 100) {
      return {
        icon: <CheckCircle2 className="h-4 w-4" />,
        variant: "default" as const,
        title: "Fully Funded!",
        description: "Your funding sources cover all estimated costs."
      };
    } else if (coveragePercent >= 75) {
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        variant: "default" as const,
        title: "Mostly Funded",
        description: `You have a funding gap of ${formatCurrency(Math.abs(gap))}. Consider additional scholarships or part-time work.`
      };
    } else {
      return {
        icon: <AlertCircle className="h-4 w-4" />,
        variant: "destructive" as const,
        title: "Significant Funding Gap",
        description: `You need an additional ${formatCurrency(Math.abs(gap))} to cover estimated costs.`
      };
    }
  };

  const fundingStatus = getFundingStatus();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Annual Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(totalCost)}</div>
            <p className="text-sm text-muted-foreground mt-1">
              {formatCurrency(monthlyCost)}/month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">4-Year Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(fourYearCost)}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Estimated total investment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Funding Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{coveragePercent}%</div>
            <Progress value={coveragePercent} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Funding Status Alert */}
      <Alert variant={fundingStatus.variant}>
        {fundingStatus.icon}
        <AlertTitle>{fundingStatus.title}</AlertTitle>
        <AlertDescription>{fundingStatus.description}</AlertDescription>
      </Alert>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
            <CardDescription>Distribution of annual expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fixed vs Variable Costs</CardTitle>
            <CardDescription>Comparison of cost categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(costs)
              .filter(([_, value]) => value > 0)
              .map(([key, value]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b last:border-0">
                  <span className="text-sm">{getCategoryLabel(key)}</span>
                  <span className="font-medium">{formatCurrency(value)}</span>
                </div>
              ))}
            <div className="flex justify-between items-center pt-4 border-t-2">
              <span className="text-lg font-semibold">Total Annual Cost</span>
              <span className="text-xl font-bold text-primary">{formatCurrency(totalCost)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
