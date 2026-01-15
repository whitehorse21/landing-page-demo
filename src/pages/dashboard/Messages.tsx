import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { SkeletonMessageItem } from '../../components/dashboard/SkeletonLoader'

const Messages = () => {
  const { t } = useLanguage()
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const chats = [
    {
      id: 1,
      name: 'Travel Support',
      lastMessage: 'Your booking has been confirmed!',
      time: '2 hours ago',
      unread: 2,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Support',
    },
    {
      id: 2,
      name: 'Paris Hotel',
      lastMessage: 'Check-in instructions sent',
      time: '1 day ago',
      unread: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hotel',
    },
    {
      id: 3,
      name: 'Flight Updates',
      lastMessage: 'Your flight is on time',
      time: '2 days ago',
      unread: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Flight',
    },
  ]

  const messages = [
    { id: 1, sender: 'Travel Support', text: 'Hello! How can I help you today?', time: '10:00 AM', isUser: false },
    { id: 2, sender: 'You', text: 'I have a question about my Paris booking', time: '10:05 AM', isUser: true },
    { id: 3, sender: 'Travel Support', text: 'Sure! What would you like to know?', time: '10:06 AM', isUser: false },
    { id: 4, sender: 'Travel Support', text: 'Your booking has been confirmed!', time: '2 hours ago', isUser: false },
  ]

  const selectedChatData = chats.find(chat => chat.id === selectedChat)

  if (isLoading) {
    return (
      <div className="flex flex-col h-full min-h-0">
        <div className="mb-6 flex-shrink-0">
          <div className="h-9 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex-1 flex min-h-0 max-h-full">
          {/* Chat List Skeleton */}
          <div className="w-full md:w-80 border-r border-gray-200 dark:border-gray-700 flex-col min-h-0 flex">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {[1, 2, 3].map((i) => (
                <SkeletonMessageItem key={i} />
              ))}
            </div>
          </div>

          {/* Messages Skeleton */}
          <div className="flex-1 flex flex-col min-h-0 hidden md:flex">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                    <div className="h-16 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('dashboard.messages.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('dashboard.messages.subtitle')}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex-1 flex min-h-0 max-h-full">
        {/* Chat List */}
        <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 border-r border-gray-200 dark:border-gray-700 flex-col min-h-0`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <input
              type="text"
                  placeholder={t('dashboard.messages.searchPlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat, index) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors border-b border-gray-200 dark:border-gray-700 ${
                  selectedChat === chat.id ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''
                } ${index === chats.length - 1 ? '' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {chat.name}
                      </h3>
                      {chat.unread > 0 && (
                        <span className="ml-2 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{chat.time}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col min-h-0`}>
          {selectedChatData ? (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <img
                    src={selectedChatData.avatar}
                    alt={selectedChatData.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {selectedChatData.name}
                    </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.messages.online')}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isUser
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isUser ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={t('dashboard.messages.typeMessage')}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                  <button className="px-4 sm:px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors text-sm whitespace-nowrap">
                    {t('dashboard.messages.send')}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  {t('dashboard.messages.selectConversation')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
