import { LineChart } from "@mui/x-charts/LineChart";
import type { LoanChartPoint, LoanComputedDto } from "./Loan.model";
import { orange } from "@mui/material/colors";

interface LoanLineChartProps {
  loans: LoanComputedDto[];
  chartData: LoanChartPoint[];
}
export default function LoanLineChart(props: LoanLineChartProps) {
  // const { axis, data } = generateLoansGraphData(props.loans);

  const dataset = props.chartData.map((d) => ({ ...d, x: new Date(d.x) }));

  return (
    <LineChart
      height={400}
      dataset={dataset}
      xAxis={[
        {
          // data: axis,
          dataKey: "x",
          scaleType: "time",
          valueFormatter: (value: string, ctx) =>
            ctx.location == "tick"
              ? new Date(value).toLocaleDateString("fr-FR", {
                  month: "2-digit",
                  year: "2-digit",
                })
              : new Date(value).toLocaleDateString(),
        },
      ]}
      series={[
        {
          // data: data.map((d) => d.totalRemainingCapital),
          dataKey: "y",
          showMark: false,
          type: "line",
          area: true,
          color: "url(#Gradient)",
        },
      ]}
    >
      <linearGradient id="Gradient" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0" stopColor={orange[500]} stopOpacity={0.1} />
        <stop offset="1" stopColor={orange[500]} />
      </linearGradient>
    </LineChart>
  );
}
