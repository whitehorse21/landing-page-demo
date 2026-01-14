import { useScrollAnimation } from '../hooks/useScrollAnimation'
import BlogPostImage from './BlogPostImage'
import { useLanguage } from '../contexts/LanguageContext'

type BlogCategory = 'Guides' | 'Deals' | 'Stories' | 'Tips'

interface BlogPost {
  title: string
  category: BlogCategory
  excerpt: string
  dateLabel: string
  readTime: string
  tags: string[]
}

const Blog = () => {
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({
    triggerOnce: false,
  })
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation({
    triggerOnce: false,
  })
  const { t } = useLanguage()

  // “AI-generated” demo content (curated copy + synthetic SVG cover art)
  const posts: BlogPost[] = [
    {
      title: '7-Day Japan Itinerary: Food, Temples & Scenic Trains',
      category: 'Guides',
      excerpt:
        'A balanced, day-by-day plan that mixes iconic sights with quiet neighborhoods—plus a simple packing checklist.',
      dateLabel: 'Jan 2026',
      readTime: '6 min read',
      tags: ['Japan', 'Itinerary', 'Culture'],
    },
    {
      title: 'Smart Booking Hacks to Save 20% on Your Next Trip',
      category: 'Deals',
      excerpt:
        'Use flexible dates, fare alerts, and bundling to lower costs—without sacrificing comfort or safety.',
      dateLabel: 'Jan 2026',
      readTime: '4 min read',
      tags: ['Flights', 'Budget', 'Tools'],
    },
    {
      title: 'From Solo to Social: How Travelers Find Their Crew',
      category: 'Stories',
      excerpt:
        'Real community stories on meeting people abroad, staying safe, and turning short chats into lifelong friends.',
      dateLabel: 'Jan 2026',
      readTime: '5 min read',
      tags: ['Community', 'Solo', 'Confidence'],
    },
    {
      title: 'Carry-On Only: The Minimalist Packing Formula',
      category: 'Tips',
      excerpt:
        'A repeatable method for packing light—layering, capsule outfits, and a 3-step toiletry kit that works anywhere.',
      dateLabel: 'Jan 2026',
      readTime: '3 min read',
      tags: ['Packing', 'Minimal', 'Gear'],
    },
  ]

  return (
    <section id="blog" className="bg-transparent py-8 lg:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className={`text-center mb-12 scroll-slide-left-continuous ${headerVisible ? 'visible' : ''}`}
          >
            <p className="text-sm text-primary dark:text-emerald-400 font-semibold uppercase tracking-wide mb-2">
              Blog
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('blog.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('blog.description')}
            </p>
          </div>

          {/* Posts Grid */}
          <div
            ref={gridRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 scroll-slide-left-continuous ${gridVisible ? 'visible' : ''}`}
          >
            {posts.map((post) => (
              <article
                key={post.title}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className="relative">
                  <BlogPostImage
                    category={post.category}
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary dark:bg-emerald-500 text-white shadow">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span>{post.dateLabel}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span>{post.readTime}</span>
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div>
                    <button className="text-sm font-semibold text-primary dark:text-emerald-400 hover:text-primary-dark dark:hover:text-emerald-500 transition-colors">
                      {t('blog.readMore')} →
                    </button>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 dark:from-emerald-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </article>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-primary dark:bg-emerald-500 text-white rounded-lg text-lg font-semibold hover:bg-primary-dark dark:hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:scale-105">
              View all posts
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blog

