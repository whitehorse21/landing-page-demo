import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Home from './pages/Home'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import DashboardLayout from './components/dashboard/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
import BrowseCities from './pages/dashboard/BrowseCities'
import Bookings from './pages/dashboard/Bookings'
import Payments from './pages/dashboard/Payments'
import Messages from './pages/dashboard/Messages'
import Settings from './pages/dashboard/Settings'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <div className="overflow-x-hidden w-full max-w-full">
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="cities" element={<BrowseCities />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="payments" element={<Payments />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </Router>
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
