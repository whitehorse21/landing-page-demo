import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

interface City {
  id: number
  name: string
  country: string
  image: string
  price: string
  rating: number
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  city: City | null
}

const BookingModal = ({ isOpen, onClose, city }: BookingModalProps) => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { t } = useLanguage()

  // Additional photos for the city
  const cityPhotos: Record<number, string[]> = {
    1: [ // Paris
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    2: [ // Tokyo
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490806843957-31f4c9b91d65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    3: [ // Barcelona
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531592937781-344ad608fabf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555993538-4c2e0c0c4e8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    4: [ // New York
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    5: [ // London
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    6: [ // Dubai
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
  }

  const photos = city ? cityPhotos[city.id] || [city.image] : []

  // Handle render state for exit animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Set default dates (check-in: tomorrow, check-out: 3 days later)
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const checkOutDate = new Date(tomorrow)
      checkOutDate.setDate(checkOutDate.getDate() + 3)
      
      setCheckIn(tomorrow.toISOString().split('T')[0])
      setCheckOut(checkOutDate.toISOString().split('T')[0])
      setGuests(1)
      setPaymentMethod('credit')
      setSelectedImageIndex(0)
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
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

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    alert(t('dashboard.booking.modal.success'))
    onClose()
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const calculateTotal = () => {
    if (!city) return 0
    const basePrice = parseInt(city.price.replace(/[^0-9]/g, ''))
    const nights = calculateNights()
    return basePrice * nights * guests
  }

  if (!shouldRender || !city) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blur Background */}
      <div
        className={`absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col ${
          isOpen ? 'animate-bounce-in' : 'opacity-0 scale-95 pointer-events-none transition-all duration-300'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Gallery Section */}
          <div className="p-6 bg-gray-100 dark:bg-gray-900">
            {/* Main Image */}
            <div className="relative h-96 rounded-lg overflow-hidden mb-4 bg-gray-200 dark:bg-gray-800">
              <img
                src={photos[selectedImageIndex]}
                alt={`${city.name} ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = city.image
                }}
              />
              {/* Navigation Arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-800'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={photo}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-full h-full object-cover transition-transform ${
                        selectedImageIndex === index ? 'scale-105' : 'hover:scale-110'
                      }`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = city.image
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* City Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{city.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{city.country}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  ⭐ {city.rating}
                </span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {city.price} {t('dashboard.browseCities.perNight')}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('dashboard.booking.modal.checkIn')}
                  </label>
                  <input
                    id="check-in"
                    type="date"
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value)
                      // Auto-adjust check-out if it's before check-in
                      if (checkOut && e.target.value >= checkOut) {
                        const newCheckOut = new Date(e.target.value)
                        newCheckOut.setDate(newCheckOut.getDate() + 1)
                        setCheckOut(newCheckOut.toISOString().split('T')[0])
                      }
                    }}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('dashboard.booking.modal.checkOut')}
                  </label>
                  <input
                    id="check-out"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('dashboard.booking.modal.guests')}
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Decrease guests"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white w-12 text-center">
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests(guests + 1)}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Increase guests"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Payment Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('dashboard.booking.modal.paymentMethod')}
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'credit', labelKey: 'dashboard.booking.modal.creditCard', icon: '💳' },
                    { value: 'debit', labelKey: 'dashboard.booking.modal.debitCard', icon: '💳' },
                    { value: 'paypal', labelKey: 'dashboard.booking.modal.paypal', icon: '🅿️' },
                    { value: 'bank', labelKey: 'dashboard.booking.modal.bankTransfer', icon: '🏦' },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method.value
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="text-xl">{method.icon}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{t(method.labelKey)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{city.price} × {calculateNights()} {calculateNights() === 1 ? t('dashboard.bookings.details.nights').replace('{count}', '1') : t('dashboard.bookings.details.nights_plural').replace('{count}', calculateNights().toString())}</span>
                  <span>${(parseInt(city.price.replace(/[^0-9]/g, '')) * calculateNights()).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{guests} {guests === 1 ? t('dashboard.bookings.details.guest').replace('{count}', '1') : t('dashboard.bookings.details.guest_plural').replace('{count}', guests.toString())}</span>
                  <span>× {calculateNights()} {calculateNights() === 1 ? t('dashboard.bookings.details.nights').replace('{count}', '1') : t('dashboard.bookings.details.nights_plural').replace('{count}', calculateNights().toString())}</span>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>{t('dashboard.booking.modal.summary.total')}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ${calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !checkIn || !checkOut}
                className="w-full px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? t('dashboard.booking.modal.summary.processing') : t('dashboard.booking.modal.summary.confirm').replace('{amount}', calculateTotal().toLocaleString())}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingModal
