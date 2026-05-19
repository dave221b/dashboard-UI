import type { MouseEventHandler } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts"
  
  type Props = {
    data: any[]
    title: string
    lineColor?: string
    className?: string
    expanded?: boolean
    onMouseEnter?: MouseEventHandler<HTMLDivElement>
    onMouseLeave?: MouseEventHandler<HTMLDivElement>
  }
  
  const MetricsChart = ({
    data,
    title,
    lineColor = "#2563eb",
    className = "",
    expanded = false,
    onMouseEnter,
    onMouseLeave,
  }: Props) => {
    return (
      <div
        className={`bg-white/95 border border-slate-200 p-6 rounded-2xl shadow-sm transition-all duration-300 ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
  
        <h2 className="text-lg font-semibold text-slate-900 mb-5">
          {title}
        </h2>
  
        <ResponsiveContainer width="100%" height={expanded ? 340 : 260}>
          <LineChart data={data} margin={{ top: 10, right: 18, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
  
            <XAxis
              dataKey="timestamp"
              stroke="#64748b"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString()
              }
            />
  
            <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
  
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                backgroundColor: "#ffffff",
              }}
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString()
              }
            />
  
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={3}
              dot={{ r: 2.5, strokeWidth: 2, fill: "#ffffff" }}
              activeDot={{ r: 5 }}
            />
  
          </LineChart>
        </ResponsiveContainer>
  
      </div>
    )
  }
  
  export default MetricsChart