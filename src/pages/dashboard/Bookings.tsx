import { useState, useEffect } from 'react'
import BookingDetailsModal from '../../components/dashboard/BookingDetailsModal'
import { useLanguage } from '../../contexts/LanguageContext'
import { SkeletonTableRow, SkeletonCard } from '../../components/dashboard/SkeletonLoader'

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

const Bookings = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'past'>('current')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()
  const itemsPerPage = 5

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const currentBookings = [
    {
      id: 1,
      destination: 'Paris, France',
      checkIn: '2026-02-15',
      checkOut: '2026-02-20',
      guests: 2,
      status: 'Confirmed',
      amount: '$1,200',
      bookingId: 'BK-2026-001',
    },
    {
      id: 2,
      destination: 'Tokyo, Japan',
      checkIn: '2026-03-20',
      checkOut: '2026-03-27',
      guests: 2,
      status: 'Pending',
      amount: '$2,100',
      bookingId: 'BK-2026-002',
    },
    {
      id: 3,
      destination: 'Rome, Italy',
      checkIn: '2026-04-10',
      checkOut: '2026-04-17',
      guests: 3,
      status: 'Confirmed',
      amount: '$1,350',
      bookingId: 'BK-2026-003',
    },
    {
      id: 4,
      destination: 'Dubai, UAE',
      checkIn: '2026-05-05',
      checkOut: '2026-05-12',
      guests: 2,
      status: 'Confirmed',
      amount: '$2,500',
      bookingId: 'BK-2026-004',
    },
    {
      id: 5,
      destination: 'Amsterdam, Netherlands',
      checkIn: '2026-06-01',
      checkOut: '2026-06-08',
      guests: 2,
      status: 'Confirmed',
      amount: '$1,400',
      bookingId: 'BK-2026-005',
    },
    {
      id: 6,
      destination: 'Prague, Czech Republic',
      checkIn: '2026-06-15',
      checkOut: '2026-06-22',
      guests: 3,
      status: 'Pending',
      amount: '$1,200',
      bookingId: 'BK-2026-006',
    },
    {
      id: 7,
      destination: 'Vienna, Austria',
      checkIn: '2026-07-10',
      checkOut: '2026-07-17',
      guests: 2,
      status: 'Confirmed',
      amount: '$1,550',
      bookingId: 'BK-2026-007',
    },
    {
      id: 8,
      destination: 'Istanbul, Turkey',
      checkIn: '2026-07-20',
      checkOut: '2026-07-27',
      guests: 2,
      status: 'Confirmed',
      amount: '$1,300',
      bookingId: 'BK-2026-008',
    },
    {
      id: 9,
      destination: 'Lisbon, Portugal',
      checkIn: '2026-08-05',
      checkOut: '2026-08-12',
      guests: 2,
      status: 'Pending',
      amount: '$1,100',
      bookingId: 'BK-2026-009',
    },
    {
      id: 10,
      destination: 'Athens, Greece',
      checkIn: '2026-08-15',
      checkOut: '2026-08-22',
      guests: 2,
      status: 'Confirmed',
      amount: '$1,250',
      bookingId: 'BK-2026-010',
    },
  ]

  const pastBookings = [
    {
      id: 5,
      destination: 'Barcelona, Spain',
      checkIn: '2025-12-10',
      checkOut: '2025-12-15',
      guests: 2,
      status: 'Completed',
      amount: '$950',
      bookingId: 'BK-2025-005',
    },
    {
      id: 6,
      destination: 'London, UK',
      checkIn: '2025-11-05',
      checkOut: '2025-11-10',
      guests: 1,
      status: 'Completed',
      amount: '$1,400',
      bookingId: 'BK-2025-006',
    },
    {
      id: 7,
      destination: 'New York, USA',
      checkIn: '2025-09-20',
      checkOut: '2025-09-27',
      guests: 2,
      status: 'Completed',
      amount: '$1,800',
      bookingId: 'BK-2025-007',
    },
    {
      id: 8,
      destination: 'Sydney, Australia',
      checkIn: '2025-09-10',
      checkOut: '2025-09-18',
      guests: 2,
      status: 'Completed',
      amount: '$2,300',
      bookingId: 'BK-2025-008',
    },
    {
      id: 9,
      destination: 'Bali, Indonesia',
      checkIn: '2025-08-25',
      checkOut: '2025-09-02',
      guests: 2,
      status: 'Completed',
      amount: '$1,100',
      bookingId: 'BK-2025-009',
    },
    {
      id: 10,
      destination: 'Santorini, Greece',
      checkIn: '2025-08-15',
      checkOut: '2025-08-22',
      guests: 2,
      status: 'Completed',
      amount: '$1,650',
      bookingId: 'BK-2025-010',
    },
    {
      id: 11,
      destination: 'Amsterdam, Netherlands',
      checkIn: '2025-07-20',
      checkOut: '2025-07-27',
      guests: 2,
      status: 'Completed',
      amount: '$1,400',
      bookingId: 'BK-2025-011',
    },
    {
      id: 12,
      destination: 'Prague, Czech Republic',
      checkIn: '2025-07-10',
      checkOut: '2025-07-17',
      guests: 2,
      status: 'Completed',
      amount: '$1,200',
      bookingId: 'BK-2025-012',
    },
    {
      id: 13,
      destination: 'Vienna, Austria',
      checkIn: '2025-06-25',
      checkOut: '2025-07-02',
      guests: 3,
      status: 'Completed',
      amount: '$1,550',
      bookingId: 'BK-2025-013',
    },
    {
      id: 14,
      destination: 'Istanbul, Turkey',
      checkIn: '2025-06-15',
      checkOut: '2025-06-22',
      guests: 2,
      status: 'Completed',
      amount: '$1,300',
      bookingId: 'BK-2025-014',
    },
    {
      id: 15,
      destination: 'Lisbon, Portugal',
      checkIn: '2025-05-30',
      checkOut: '2025-06-06',
      guests: 2,
      status: 'Completed',
      amount: '$1,100',
      bookingId: 'BK-2025-015',
    },
    {
      id: 16,
      destination: 'Athens, Greece',
      checkIn: '2025-05-20',
      checkOut: '2025-05-27',
      guests: 2,
      status: 'Completed',
      amount: '$1,250',
      bookingId: 'BK-2025-016',
    },
    {
      id: 17,
      destination: 'Paris, France',
      checkIn: '2025-04-25',
      checkOut: '2025-05-02',
      guests: 2,
      status: 'Completed',
      amount: '$1,200',
      bookingId: 'BK-2025-017',
    },
    {
      id: 18,
      destination: 'Barcelona, Spain',
      checkIn: '2025-04-15',
      checkOut: '2025-04-22',
      guests: 2,
      status: 'Completed',
      amount: '$950',
      bookingId: 'BK-2025-018',
    },
    {
      id: 19,
      destination: 'Rome, Italy',
      checkIn: '2025-03-30',
      checkOut: '2025-04-06',
      guests: 3,
      status: 'Completed',
      amount: '$1,350',
      bookingId: 'BK-2025-019',
    },
    {
      id: 20,
      destination: 'Santorini, Greece',
      checkIn: '2025-03-20',
      checkOut: '2025-03-27',
      guests: 2,
      status: 'Completed',
      amount: '$1,650',
      bookingId: 'BK-2025-020',
    },
    {
      id: 21,
      destination: 'Bali, Indonesia',
      checkIn: '2025-03-10',
      checkOut: '2025-03-17',
      guests: 2,
      status: 'Completed',
      amount: '$1,100',
      bookingId: 'BK-2025-021',
    },
  ]

  const bookings = activeTab === 'current' ? currentBookings : pastBookings
  
  // Pagination logic
  const totalPages = Math.ceil(bookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedBookings = bookings.slice(startIndex, endIndex)
  
  // Reset to page 1 when tab changes
  const handleTabChange = (tab: 'current' | 'past') => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Tabs Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex gap-2">
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <th key={i} className="px-6 py-3">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonTableRow key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.bookings.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('dashboard.bookings.subtitle')}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1 inline-flex">
        <button
          onClick={() => handleTabChange('current')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'current'
              ? 'bg-emerald-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {t('dashboard.bookings.tabs.current')} ({currentBookings.length})
        </button>
        <button
          onClick={() => handleTabChange('past')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'past'
              ? 'bg-emerald-500 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {t('dashboard.bookings.tabs.past')} ({pastBookings.length})
        </button>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {paginatedBookings.map((booking) => (
          <div
            key={booking.id}
            onClick={() => {
              setSelectedBooking(booking)
              setIsModalOpen(true)
            }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {booking.destination}
                  </h3>
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
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.checkIn')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{booking.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.checkOut')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{booking.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.guests')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{booking.guests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('dashboard.bookings.fields.bookingId')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{booking.bookingId}</p>
                  </div>
                </div>
              </div>
              <div className="ml-6 text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{booking.amount}</p>
                {activeTab === 'current' && booking.status === 'Confirmed' && (
                  <button className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg font-medium transition-colors">
                    {t('dashboard.bookings.cancel')}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {t('dashboard.bookings.pagination.showing')} {startIndex + 1} {t('dashboard.bookings.pagination.to')} {Math.min(endIndex, bookings.length)} {t('dashboard.bookings.pagination.of')} {bookings.length} {t('dashboard.bookings.pagination.results')}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 1
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {t('dashboard.bookings.pagination.previous')}
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === totalPages
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {t('dashboard.bookings.pagination.next')}
            </button>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      <BookingDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedBooking(null)
        }}
        booking={selectedBooking}
      />
    </div>
  )
}

export default Bookings
