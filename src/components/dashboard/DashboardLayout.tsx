import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import DashboardHeader from './DashboardHeader'
import DashboardSidebar from './DashboardSidebar'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated && location.pathname.startsWith('/dashboard')) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate, location.pathname])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 min-h-0 relative">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <DashboardSidebar sidebarOpen={sidebarOpen} />
        <main className={`flex-1 pt-16 transition-all duration-300 ${
          sidebarOpen 
            ? 'lg:ml-64' 
            : 'lg:ml-20'
        } flex flex-col min-h-0 w-full`}>
          <div className="p-4 lg:p-8 flex-1 flex flex-col min-h-0 overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
