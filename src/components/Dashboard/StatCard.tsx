// src/components/Dashboard/StatCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  style?: React.CSSProperties;
}

export function StatCard({ title, value, icon: Icon, description, trend, className, style }: StatCardProps) {
  return (
    <Card className={cn("bg-gradient-card text-white border-green-700/40 shadow-lg", className)} style={style}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">
          {title}
        </CardTitle>
        <Icon className="h-6 w-6 text-football-green" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {trend && (
            <span className={trend.isPositive ? "text-green-400" : "text-red-400"}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
          )}{" "}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}