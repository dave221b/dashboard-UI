import { useQuery } from "@tanstack/react-query"
import { api } from "../api/axios"

export const fetchMetrics = async (type: string) => {
  const response = await api.get(`/metrics?type=${type}`)
  return response.data
}

export const useMetrics = (type: string) => {
  return useQuery({
    queryKey: ["metrics", type],
    queryFn: () => fetchMetrics(type),
  })
}