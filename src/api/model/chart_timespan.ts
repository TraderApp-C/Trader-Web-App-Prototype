export const chartTimespans = ['minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'] as const;
export type ChartTimespan = typeof chartTimespans[number];

export const chartMultipliers = [1, 5, 7, 15, 30, 40, 60] as const;
export type ChartMultiplier =typeof chartMultipliers[number];