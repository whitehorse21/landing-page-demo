import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'

function App() {
  return (
    <div className="overflow-x-hidden w-full max-w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
