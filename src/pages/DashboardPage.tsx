import { useState } from "react"
import DashboardLayout from "../components/DashboardLayout"
import MetricsChart from "../components/MetricsChart"
import { useMetrics } from "../hooks/useMetrics"

type MetricType = "ACTIVE_USERS" | "REVENUE" | "SIGNUPS"

type MetricConfig = {
  key: MetricType
  label: string
  color: string
}

const metricConfigs: MetricConfig[] = [
  { key: "ACTIVE_USERS", label: "Active Users", color: "#2563eb" },
  { key: "REVENUE", label: "Revenue", color: "#7c3aed" },
  { key: "SIGNUPS", label: "Signups", color: "#059669" },
]

const DashboardPage = () => {
  const [hoveredMetric, setHoveredMetric] = useState<MetricType | null>(null)
  const activeUsersQuery = useMetrics("ACTIVE_USERS")
  const revenueQuery = useMetrics("REVENUE")
  const signupsQuery = useMetrics("SIGNUPS")

  const metricQueries = {
    ACTIVE_USERS: activeUsersQuery,
    REVENUE: revenueQuery,
    SIGNUPS: signupsQuery,
  } as const

  const getChartCardClasses = (metric: MetricType) => {
    const isExpanded = hoveredMetric === metric
    const hasHoveredAny = hoveredMetric !== null

    if (isExpanded) {
      return "xl:order-first xl:col-span-3 scale-[1.015] shadow-lg shadow-slate-300/50 z-10"
    }

    return hasHoveredAny ? "opacity-80 scale-[0.99]" : ""
  }

  return (
    <DashboardLayout>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-2">
          Daily metrics overview and trend visibility
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {metricConfigs.map((metric) => {
          const query = metricQueries[metric.key]
          const value = query.data?.[query.data.length - 1]?.value

          return (
            <div
              key={metric.key}
              className="bg-white/90 backdrop-blur p-6 rounded-2xl border border-slate-200 shadow-sm"
            >
              <h2 className="text-slate-500 text-sm font-medium">{metric.label}</h2>
              {query.isLoading ? (
                <div className="h-9 mt-2 w-20 rounded bg-slate-200 animate-pulse" />
              ) : query.isError ? (
                <p className="text-base mt-3 text-red-600">--</p>
              ) : (
                <p className="text-3xl font-bold mt-2 text-slate-900">{value ?? "--"}</p>
              )}
            </div>
          )
        })}

      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-5">
        {metricConfigs.map((metric) => {
          const query = metricQueries[metric.key]
          const title = `${metric.label} (Last 30 Days)`

          if (query.isLoading) {
            return (
              <div
                key={`${metric.key}-loading`}
                className={`bg-white/95 border border-slate-200 p-6 rounded-2xl shadow-sm transition-all duration-300 ${getChartCardClasses(metric.key)}`}
                onMouseEnter={() => setHoveredMetric(metric.key)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                <h2 className="text-lg font-semibold text-slate-900 mb-5">{title}</h2>
                <div
                  className={`w-full rounded bg-slate-200 animate-pulse transition-all duration-300 ${
                    hoveredMetric === metric.key ? "h-[340px]" : "h-[260px]"
                  }`}
                />
              </div>
            )
          }

          if (query.isError) {
            return (
              <div
                key={`${metric.key}-error`}
                className={`bg-white/95 border border-red-200 p-6 rounded-2xl shadow-sm transition-all duration-300 ${getChartCardClasses(metric.key)}`}
                onMouseEnter={() => setHoveredMetric(metric.key)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                <h2 className="text-lg font-semibold text-slate-900 mb-3">{title}</h2>
                <p className="text-red-600">Failed to load this metric</p>
              </div>
            )
          }

          return (
            <MetricsChart
              key={metric.key}
              data={query.data ?? []}
              title={title}
              lineColor={metric.color}
              expanded={hoveredMetric === metric.key}
              className={getChartCardClasses(metric.key)}
              onMouseEnter={() => setHoveredMetric(metric.key)}
              onMouseLeave={() => setHoveredMetric(null)}
            />
          )
        })}
      </div>

    </DashboardLayout>
  )
}

export default DashboardPage