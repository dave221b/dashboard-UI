import Sidebar from "../components/Sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8 md:p-10">
        {children}
      </main>

    </div>
  )
}

export default DashboardLayout