
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalyticsDataPoint {
  name: string;
  pageViews?: number;
  uniqueVisitors?: number;
  engagement?: number;
  [key: string]: any;
}

interface AnalyticsChartProps {
  title: string;
  data: AnalyticsDataPoint[];
  period: 'day' | 'week' | 'month' | 'year';
  height?: number;
}

const chartConfig = {
  pageViews: {
    label: "Visualizações",
    theme: {
      light: "#4338ca",
      dark: "#818cf8"
    }
  },
  uniqueVisitors: {
    label: "Visitantes Únicos",
    theme: {
      light: "#0891b2",
      dark: "#22d3ee"
    }
  },
  engagement: {
    label: "Engajamento",
    theme: {
      light: "#9333ea",
      dark: "#c084fc"
    }
  }
};

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ 
  title, 
  data, 
  period,
  height = 300
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: height, width: '100%' }}>
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} verticalAlign="top" />
              <Area
                type="monotone"
                dataKey="pageViews"
                fill="url(#pageViews)"
                stroke="var(--color-pageViews)"
                fillOpacity={0.2}
                name="pageViews"
              />
              {data.some(item => 'uniqueVisitors' in item) && (
                <Area
                  type="monotone"
                  dataKey="uniqueVisitors"
                  fill="url(#uniqueVisitors)"
                  stroke="var(--color-uniqueVisitors)"
                  fillOpacity={0.2}
                  name="uniqueVisitors"
                />
              )}
              {data.some(item => 'engagement' in item) && (
                <Area
                  type="monotone"
                  dataKey="engagement"
                  fill="url(#engagement)"
                  stroke="var(--color-engagement)"
                  fillOpacity={0.2}
                  name="engagement"
                />
              )}
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
