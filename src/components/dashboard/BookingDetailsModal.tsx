import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

interface Booking {
  id: number
  destination: string
  checkIn: string
  checkOut: string
  guests: number
  status: string
  amount: string
  bookingId: string
}

interface BookingDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  booking: Booking | null
}

const BookingDetailsModal = ({ isOpen, onClose, booking }: BookingDetailsModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [shouldRender, setShouldRender] = useState(false)
  const { t } = useLanguage()

  // Get city ID from destination name
  const getCityId = (destination: string): number => {
    const cityMap: Record<string, number> = {
      'Paris, France': 1,
      'Tokyo, Japan': 2,
      'Barcelona, Spain': 3,
      'New York, USA': 4,
      'London, UK': 5,
      'Dubai, UAE': 6,
    }
    return cityMap[destination] || 1
  }

  // Additional photos for each city
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

  const cityId = booking ? getCityId(booking.destination) : 1
  const photos = cityPhotos[cityId] || []

  // Handle render state for exit animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setSelectedImageIndex(0)
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
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

  // Calculate nights
  const calculateNights = () => {
    if (!booking) return 0
    const start = new Date(booking.checkIn)
    const end = new Date(booking.checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (!shouldRender || !booking) return null

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
                alt={`${booking.destination} ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  // Fallback to first photo or a placeholder
                  target.src = photos[0] || 'https://via.placeholder.com/800x600?text=Image+Not+Available'
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
                        // Fallback to first photo or a placeholder
                        target.src = photos[0] || 'https://via.placeholder.com/200x200?text=Image'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Booking Details */}
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{booking.destination}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.status === 'Confirmed'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : booking.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                >
                  {booking.status === 'Confirmed' 
                    ? t('dashboard.bookings.status.confirmed')
                    : booking.status === 'Pending'
                    ? t('dashboard.bookings.status.pending')
                    : t('dashboard.bookings.status.completed')}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.bookingId')}: {booking.bookingId}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.bookings.fields.checkIn')}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {new Date(booking.checkIn).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.bookings.fields.checkOut')}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {new Date(booking.checkOut).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.bookings.details.duration')}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {calculateNights()} {calculateNights() === 1 ? t('dashboard.bookings.details.nights').replace('{count}', '1') : t('dashboard.bookings.details.nights_plural').replace('{count}', calculateNights().toString())}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('dashboard.bookings.fields.guests')}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {booking.guests} {booking.guests === 1 ? t('dashboard.bookings.details.guest').replace('{count}', '1') : t('dashboard.bookings.details.guest_plural').replace('{count}', booking.guests.toString())}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('dashboard.bookings.details.priceSummary')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{t('dashboard.bookings.details.totalAmount')}</span>
                  <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    {booking.amount}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-300 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('dashboard.bookings.details.paymentCompleted').replace('{date}', new Date().toLocaleDateString())}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            {booking.status === 'Confirmed' && (
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors">
                  {t('dashboard.bookings.details.actions.downloadReceipt')}
                </button>
                <button className="flex-1 px-6 py-3 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg font-semibold transition-colors">
                  {t('dashboard.bookings.details.actions.cancelBooking')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetailsModal
