import React from 'react';
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  borderColor?: 'green' | 'yellow' | 'blue' | 'red';
  linkText?: string;
  linkUrl?: string;
  icon?: React.ReactNode;
}

const borderColorMap = {
  green: 'border-l-4 border-green-500',
  yellow: 'border-l-4 border-yellow-500',
  blue: 'border-l-4 border-blue-500',
  red: 'border-l-4 border-red-500',
  default: 'border-l-4 border-gray-200',
};

const trendIcon = (trend?: number) => {
  if (trend === undefined) return null;
  if (trend > 0) {
    return <svg className="inline ml-1 text-green-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 15 12 9 18 15"/></svg>;
  } else if (trend < 0) {
    return <svg className="inline ml-1 text-red-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
  }
  return null;
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  borderColor = 'default',
  linkText,
  linkUrl,
  icon
}) => {
  return (
    <div className={cn(
      "bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between min-h-[120px] border border-gray-100 ",
      borderColorMap[borderColor] || borderColorMap.default,
      "w-full max-w-full sm:max-w-xs mx-auto"
    )}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-base font-medium text-gray-700 mb-1">{title}</div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        </div>
        {icon && (
          <div className="text-app-blue ml-2">{icon}</div>
        )}
        {linkText && (
          <a href={linkUrl || '#'} className="text-sm text-blue-600 font-medium hover:underline whitespace-nowrap ml-2">{linkText}</a>
        )}
      </div>
      <div className="flex items-center mt-2 text-sm">
        {trend !== undefined && (
          <>
            {trendIcon(trend)}
            <span className="ml-1 font-semibold text-gray-900">{trend > 0 ? '+' : ''}{trend}%</span>
          </>
        )}
        {trendLabel && <span className="ml-2 text-gray-500">{trendLabel}</span>}
        {subtitle && <span className="ml-2 text-gray-500">{subtitle}</span>}
      </div>
    </div>
  );
};

export default MetricCard;
