import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../hooks/useAuthStore"

const Sidebar = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <aside className="w-72 bg-slate-900 text-slate-100 shadow-2xl shadow-slate-900/20 flex flex-col">

      <div className="p-8 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight">
          InsightHub
        </h1>
        <p className="text-sm text-slate-400 mt-2">Analytics workspace</p>
      </div>

      <nav className="flex-1 p-5 space-y-2">

        <button
          onClick={() => navigate("/dashboard")}
          className="block w-full text-left px-4 py-3 rounded-lg bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
        >
          <span className="font-medium">Dashboard</span>
        </button>

      </nav>

      <div className="p-5 border-t border-slate-800">

        <button
          onClick={handleLogout}
          className="w-full bg-slate-800 text-slate-100 py-2.5 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
        >
          Logout
        </button>

      </div>

    </aside>
  )
}

export default Sidebar