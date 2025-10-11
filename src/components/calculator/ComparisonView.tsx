import { CostBreakdown } from "@/types/calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getUniversityById } from "@/data/universityData";
import { calculateTotalCost, formatCurrency, getCategoryLabel } from "@/utils/calculatorHelpers";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ComparisonViewProps {
  universityIds: string[];
  costsMap: Record<string, CostBreakdown>;
}

export function ComparisonView({ universityIds, costsMap }: ComparisonViewProps) {
  if (universityIds.length < 2) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Select at least 2 universities to compare
        </CardContent>
      </Card>
    );
  }

  const universities = universityIds.map(id => getUniversityById(id)).filter(Boolean);
  const totals = universityIds.map(id => ({
    id,
    name: getUniversityById(id)?.name || '',
    total: calculateTotalCost(costsMap[id] || {} as CostBreakdown)
  }));

  const lowestCost = Math.min(...totals.map(t => t.total));
  const lowestCostUni = totals.find(t => t.total === lowestCost);

  // Prepare data for chart
  const chartData = Object.keys(costsMap[universityIds[0]] || {}).map(key => {
    const dataPoint: any = { category: getCategoryLabel(key) };
    universityIds.forEach(id => {
      const uni = getUniversityById(id);
      if (uni && costsMap[id]) {
        dataPoint[uni.name] = costsMap[id][key as keyof CostBreakdown];
      }
    });
    return dataPoint;
  });

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cost Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">Lowest Cost Option:</p>
            <p className="text-2xl font-bold text-primary mt-1">
              {lowestCostUni?.name} - {formatCurrency(lowestCost)}
            </p>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              {universities.map((uni, index) => (
                <Bar key={uni?.id} dataKey={uni?.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Side-by-Side Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  {universities.map(uni => (
                    <TableHead key={uni?.id} className="text-right">
                      {uni?.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(costsMap[universityIds[0]] || {}).map(key => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{getCategoryLabel(key)}</TableCell>
                    {universityIds.map(id => {
                      const value = costsMap[id]?.[key as keyof CostBreakdown] || 0;
                      const values = universityIds.map(uid => costsMap[uid]?.[key as keyof CostBreakdown] || 0);
                      const isLowest = value === Math.min(...values) && value > 0;
                      
                      return (
                        <TableCell key={id} className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {formatCurrency(value)}
                            {isLowest && <Badge variant="secondary" className="text-xs">Lowest</Badge>}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
                <TableRow className="font-bold bg-muted">
                  <TableCell>Total Annual Cost</TableCell>
                  {totals.map(({ id, total }) => (
                    <TableCell key={id} className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {formatCurrency(total)}
                        {total === lowestCost && <Badge className="text-xs">Best Value</Badge>}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>Savings vs. Lowest</TableCell>
                  {totals.map(({ id, total }) => (
                    <TableCell key={id} className="text-right">
                      {total === lowestCost ? '-' : formatCurrency(total - lowestCost)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
