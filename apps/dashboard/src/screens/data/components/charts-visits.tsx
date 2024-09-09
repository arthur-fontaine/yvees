import React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../shared/components/ui/card'
import type {
  ChartConfig,
} from '../../../shared/components/ui/chart'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../../../shared/components/ui/chart'
import { useData } from '../hooks/use-data'

export const description = 'A stacked area chart'

const chartConfig = {
  visits: {
    color: 'hsl(var(--chart-2))',
    label: 'Visite(s)',
  },
} satisfies ChartConfig

/**
 * ChartVisits component.
 */
export function ChartVisits() {
  const { chartData, loading } = useData()
    if (loading) {
    return <p>Loading...</p>
  }
  return (

      <Card>
          <CardHeader>
              <CardTitle>Visites</CardTitle>
              <CardDescription>
                  Nombre de visite par mois
              </CardDescription>
          </CardHeader>
          <CardContent>
              <ChartContainer config={chartConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
              left: 12,
              right: 12,
            }}
                  >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        axisLine={false}
                        dataKey="month"
                        tickFormatter={value => value.slice(0, 3)}
                        tickLine={false}
                        tickMargin={8}
                      />
                      <ChartTooltip
                        content={<ChartTooltipContent indicator="dot" />}
                        cursor={false}
                      />
                      <Area
                        dataKey="visits"
                        fill="var(--color-visits)"
                        fillOpacity={0.4}
                        stackId="a"
                        stroke="var(--color-visits)"
                        type="natural"
                      />
                  </AreaChart>
              </ChartContainer>
          </CardContent>
      </Card>
  )
}
