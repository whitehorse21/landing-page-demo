import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useLanguage()
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const success = await login(email, password)
    setIsLoading(false)
    if (success) {
      onClose()
      navigate('/dashboard')
    } else {
      alert('Invalid credentials. Please try again.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blur Background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-100 dark:border-gray-700 transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('auth.login.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400">{t('auth.login.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('auth.login.email')}
            </label>
            <input
              id="modal-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="modal-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('auth.login.password')}
              </label>
              <Link
                to="#"
                className="text-sm text-primary dark:text-emerald-400 hover:text-primary-dark dark:hover:text-emerald-500 transition-colors"
              >
                {t('auth.login.forgotPassword')}
              </Link>
            </div>
            <input
              id="modal-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder={t('auth.login.password')}
            />
          </div>

          <div className="flex items-center">
            <input
              id="modal-remember"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary dark:text-emerald-500 focus:ring-primary dark:focus:ring-emerald-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="modal-remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              {t('auth.login.rememberMe')}
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-primary dark:bg-emerald-500 text-white rounded-lg font-semibold hover:bg-primary-dark dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : t('auth.login.submit')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('auth.login.noAccount')}{' '}
            <Link
              to="/signup"
              onClick={onClose}
              className="font-semibold text-primary dark:text-emerald-400 hover:text-primary-dark dark:hover:text-emerald-500 transition-colors"
            >
              {t('auth.login.signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
