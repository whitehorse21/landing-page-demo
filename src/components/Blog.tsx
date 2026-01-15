import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import BlogPostImage from './BlogPostImage'
import BlogDetail from './BlogDetail'
import { useLanguage } from '../contexts/LanguageContext'

type BlogCategory = 'Guides' | 'Deals' | 'Stories' | 'Tips'

interface BlogPost {
  title: string
  category: BlogCategory
  excerpt: string
  fullDescription: string
  dateLabel: string
  readTime: string
  tags: string[]
}

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  
  const { elementRef: headerRef, isVisible: headerVisible } = useScrollAnimation({
    triggerOnce: false,
  })
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation({
    triggerOnce: false,
  })
  const { t } = useLanguage()

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
    setIsDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    // Delay clearing selectedPost to allow animation to complete
    setTimeout(() => setSelectedPost(null), 300)
  }

  // “AI-generated” demo content (curated copy + synthetic SVG cover art)
  const posts: BlogPost[] = [
    {
      title: '7-Day Japan Itinerary: Food, Temples & Scenic Trains',
      category: 'Guides',
      excerpt:
        'A balanced, day-by-day plan that mixes iconic sights with quiet neighborhoods—plus a simple packing checklist.',
      fullDescription: `Planning a week in Japan? This itinerary balances must-see attractions with authentic local experiences, perfect for first-time visitors who want to see the best of Tokyo, Kyoto, and the countryside.

Day 1-2: Tokyo Arrival & Exploration
Start your journey in Tokyo, where ancient traditions meet cutting-edge innovation. On your first day, explore the historic Asakusa district, home to the famous Senso-ji Temple. Wander through Nakamise Shopping Street, sampling traditional snacks like taiyaki and senbei crackers.

Day 2 takes you to Shibuya and Harajuku. Experience the world's busiest intersection at Shibuya Crossing, then explore the quirky fashion and culture of Harajuku's Takeshita Street. Don't miss a visit to Meiji Shrine, a peaceful oasis in the heart of the city.

Day 3: Scenic Train Journey to Kyoto
Take the Shinkansen (bullet train) to Kyoto, enjoying views of Mount Fuji along the way. The journey itself is an experience—grab an ekiben (station bento box) for an authentic Japanese meal on the go.

Day 4-5: Kyoto's Temples & Gardens
Kyoto is home to over 1,600 temples. Start with Fushimi Inari Shrine, famous for its thousands of vermillion torii gates. Then visit Kinkaku-ji (Golden Pavilion) and the serene Arashiyama Bamboo Grove.

On Day 5, explore the Gion district, where you might spot a geisha. Visit Kiyomizu-dera Temple for panoramic city views, then enjoy a traditional kaiseki dinner.

Day 6: Day Trip to Nara
Take a short train ride to Nara, Japan's first capital. Feed the friendly deer in Nara Park, visit Todai-ji Temple (home to the world's largest bronze Buddha), and explore the charming old town.

Day 7: Return to Tokyo & Departure
Return to Tokyo for last-minute shopping in Ginza or Akihabara, or visit the Tsukiji Outer Market for fresh sushi. End your trip with a relaxing soak in an onsen (hot spring) before heading to the airport.

Packing Essentials:
- Comfortable walking shoes (you'll walk a lot!)
- Lightweight layers for changing weather
- Cash (many places don't accept cards)
- Portable WiFi or SIM card
- JR Pass for unlimited train travel

This itinerary gives you a perfect taste of Japan's diverse culture, from bustling cities to peaceful temples, ensuring memories that will last a lifetime.`,
      dateLabel: 'Jan 2026',
      readTime: '6 min read',
      tags: ['Japan', 'Itinerary', 'Culture'],
    },
    {
      title: 'Smart Booking Hacks to Save 20% on Your Next Trip',
      category: 'Deals',
      excerpt:
        'Use flexible dates, fare alerts, and bundling to lower costs—without sacrificing comfort or safety.',
      fullDescription: `Travel doesn't have to break the bank. With the right strategies, you can save significant money on flights, hotels, and activities while still enjoying a comfortable and safe journey. Here are proven booking hacks that can save you 20% or more on your next trip.

Flexible Date Strategies
The biggest savings come from flexibility. Use tools like Google Flights' date grid to see prices across an entire month. Often, shifting your departure by just one or two days can save hundreds of dollars. Mid-week flights (Tuesday-Thursday) are typically 15-20% cheaper than weekend flights.

Consider flying during shoulder seasons—the periods between peak and off-peak travel times. For example, visiting Europe in late April or early October offers great weather and prices 30-40% lower than summer months.

Fare Alerts & Price Tracking
Set up fare alerts on multiple platforms: Google Flights, Skyscanner, and airline websites. Many airlines offer price drop guarantees and will notify you if fares decrease after booking.

Use incognito mode when searching flights, as some sites track your visits and may show higher prices on repeat visits. Clear your cookies or use a VPN for the best deals.

Bundling & Package Deals
Booking flights and hotels together can save 10-15% compared to booking separately. Look for package deals on sites like Expedia, Booking.com, or directly through airlines that offer hotel partnerships.

Consider all-inclusive resorts for destinations like the Caribbean or Mexico—they often provide better value when you factor in meals, drinks, and activities.

Loyalty Programs & Credit Cards
Join airline and hotel loyalty programs—they're free and offer immediate benefits like free checked bags, priority boarding, and room upgrades. Many credit cards offer travel rewards that can offset costs significantly.

Look for credit cards with sign-up bonuses that can cover entire flights or hotel stays. Just be sure to pay off balances monthly to avoid interest charges.

Alternative Accommodations
Beyond hotels, consider vacation rentals, hostels, or house-sitting opportunities. Platforms like Airbnb, Hostelworld, and TrustedHousesitters offer unique and often cheaper alternatives.

For longer stays, negotiate directly with hotels or rental owners—many offer discounts for extended bookings.

Last-Minute & Off-Peak Deals
If you're flexible, last-minute deals can offer incredible savings. Apps like HotelTonight specialize in same-day hotel bookings at discounted rates.

Travel during off-peak hours and seasons. Not only will you save money, but you'll also avoid crowds and have a more authentic experience.

By combining these strategies, you can easily save 20% or more on your travel expenses while maintaining comfort and safety. The key is flexibility, research, and timing.`,
      dateLabel: 'Jan 2026',
      readTime: '4 min read',
      tags: ['Flights', 'Budget', 'Tools'],
    },
    {
      title: 'From Solo to Social: How Travelers Find Their Crew',
      category: 'Stories',
      excerpt:
        'Real community stories on meeting people abroad, staying safe, and turning short chats into lifelong friends.',
      fullDescription: `Traveling solo doesn't mean traveling alone. Some of the most meaningful connections happen when you're exploring the world by yourself. Here are real stories from our community about how they found their travel crew and built lasting friendships on the road.

Sarah's Story: Hostel Common Rooms
Sarah, 28, from Canada, was nervous about her first solo trip to Europe. "I thought I'd be lonely, but hostels became my social hubs," she shares. "I met my now-best friend in a hostel common room in Barcelona. We were both reading the same travel guide, and that sparked a conversation that lasted hours."

Hostel common rooms, organized activities, and group tours are natural meeting places. Many hostels organize pub crawls, walking tours, and cooking classes specifically to help solo travelers connect.

Mike's Experience: Couchsurfing & Meetups
Mike, 35, from Australia, uses platforms like Couchsurfing and Meetup.com to find local connections. "I've stayed with locals in 15 countries, and many have become lifelong friends," he says. "One host in Tokyo even came to visit me in Sydney a year later."

These platforms allow you to meet locals and other travelers in a safe, structured environment. Always read reviews, verify profiles, and trust your instincts.

Emma's Adventure: Group Tours & Activities
Emma, 24, from the UK, joined a small group tour in Southeast Asia. "I was hesitant at first, but it was the best decision," she recalls. "Our group of eight became so close that we planned a reunion trip to Morocco six months later."

Group tours, especially those focused on specific interests (photography, hiking, food), attract like-minded travelers. Companies like Intrepid Travel and G Adventures specialize in small group experiences.

Staying Safe While Socializing
Safety is paramount when meeting new people. Always meet in public places first, let someone know your plans, and trust your instincts. If something feels off, don't hesitate to leave.

Use apps like WhatsApp or Telegram to stay in touch with new friends, and consider sharing your location with trusted contacts back home.

Building Long-Term Connections
Many travelers maintain friendships through social media, video calls, and planning future trips together. "I have friends in 12 countries now," says David, 31, from the US. "We have a group chat where we share travel tips and plan meetups around the world."

The key is being open, approachable, and genuine. A simple "hello" can lead to incredible adventures and friendships that span continents and decades.

Whether through hostels, apps, tours, or chance encounters, the travel community is welcoming and diverse. Your next best friend might be sitting at the next table in a café, waiting for you to say hello.`,
      dateLabel: 'Jan 2026',
      readTime: '5 min read',
      tags: ['Community', 'Solo', 'Confidence'],
    },
    {
      title: 'Carry-On Only: The Minimalist Packing Formula',
      category: 'Tips',
      excerpt:
        'A repeatable method for packing light—layering, capsule outfits, and a 3-step toiletry kit that works anywhere.',
      fullDescription: `Packing light is an art form that saves time, money, and stress. With this minimalist packing formula, you can travel anywhere with just a carry-on, regardless of trip length or destination. Here's the proven system that works for any traveler.

The Core Principle: Versatility Over Volume
Every item should serve multiple purposes. A sarong becomes a beach towel, scarf, blanket, or even a privacy screen. A lightweight jacket works for chilly evenings, light rain, and as an extra layer on flights.

Choose items in a cohesive color palette (neutrals work best) so everything mixes and matches. This allows you to create multiple outfits from fewer pieces.

The Capsule Wardrobe Formula
For a week-long trip, pack:
- 3-4 tops (mix of t-shirts and one nicer option)
- 2-3 bottoms (one pair of pants, one pair of shorts or skirt)
- 1-2 dresses (if applicable) that can be dressed up or down
- 1 lightweight jacket or cardigan
- 1 pair of comfortable walking shoes
- 1 pair of versatile sandals or flip-flops
- Underwear and socks (pack enough for your trip or plan to do laundry)

The key is layering. With the right combination, you can create 10+ different outfits from these basics.

The 3-Step Toiletry Kit
Step 1: Multi-purpose products
Choose products that do double duty: a 2-in-1 shampoo/conditioner, a tinted moisturizer with SPF, and a lip balm that can double as a highlighter.

Step 2: Solid over liquid
Solid toiletries (shampoo bars, solid deodorant, toothpaste tablets) aren't subject to TSA liquid restrictions and last longer. They're also more eco-friendly.

Step 3: Sample sizes & refillable containers
Use travel-sized containers and refill them from larger bottles at home. Many hotels provide toiletries, so you might not need to pack everything.

Packing Techniques That Maximize Space
The rolling method: Roll clothes instead of folding them. This reduces wrinkles and saves space.

Compression packing cubes: These help organize and compress clothing, maximizing your carry-on's capacity.

Wear your bulkiest items: On travel days, wear your heaviest shoes and jacket to save space in your bag.

The Digital Advantage
Instead of packing books, use an e-reader or tablet. Download maps, guides, and entertainment before you leave to avoid needing WiFi.

Take photos of important documents (passport, insurance, reservations) and store them securely in the cloud.

Destination-Specific Adjustments
For beach destinations: Swap pants for more shorts/swimwear, add a sun hat and reef-safe sunscreen.

For cold climates: Focus on quality over quantity. One good merino wool base layer is worth three cotton t-shirts.

For business travel: Add one versatile blazer that works with your casual pieces to create professional looks.

The Benefits of Minimalist Packing
- No checked bag fees
- Faster airport navigation
- Less to lose or have stolen
- More flexibility to move between destinations
- Less decision fatigue (fewer choices = easier mornings)

Start with this formula, then adjust based on your personal needs and destination. You'll be amazed at how little you actually need to travel comfortably and stylishly.`,
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
                onClick={() => handlePostClick(post)}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 cursor-pointer"
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
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePostClick(post)
                      }}
                      className="text-sm font-semibold text-primary dark:text-emerald-400 hover:text-primary-dark dark:hover:text-emerald-500 transition-colors"
                    >
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
      
      {/* Blog Detail Panel */}
      <BlogDetail post={selectedPost} isOpen={isDetailOpen} onClose={handleCloseDetail} />
    </section>
  )
}

export default Blog

