import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  gradient?: 'primary' | 'secondary' | 'medical' | 'success';
}
export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  gradient = 'primary'
}: MetricCardProps) {
  const gradientClass = {
    primary: 'veterinary-gradient',
    secondary: 'data-gradient',
    medical: 'medical-gradient',
    success: 'bg-success'
  }[gradient];
  return <div className="metric-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2 mt-1">
            <h3 className="text-2xl font-bold text-foreground">{value}</h3>
            {change && <span className={`text-sm font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change.value}
              </span>}
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg ${gradientClass} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>;
}