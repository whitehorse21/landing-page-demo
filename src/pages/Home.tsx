import Header from '../components/Header'
import Hero from '../components/Hero'
import AboutUs from '../components/AboutUs'
import Services from '../components/Services'
import Blog from '../components/Blog'
import HowItWorks from '../components/HowItWorks'
import Experience from '../components/Experience'
import Testimonials from '../components/Testimonials'
import Subscribe from '../components/Subscribe'
import Footer from '../components/Footer'
import GoToTop from '../components/GoToTop'
import SectionSeparator from '../components/SectionSeparator'
import LoginModal from '../components/LoginModal'
import { useState } from 'react'

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      <Header onOpenLoginModal={() => setIsLoginModalOpen(true)} />
      <main className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 overflow-x-hidden w-full max-w-full">
        <Hero onOpenLoginModal={() => setIsLoginModalOpen(true)} />
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="space-y-2">
            <SectionSeparator variant="dots" />
            <AboutUs />
            <SectionSeparator variant="waves" />
            <Services />
            <SectionSeparator variant="particles" />
            <Blog />
            <SectionSeparator variant="lines" />
            <HowItWorks />
            <SectionSeparator variant="circles" />
            <Experience />
            <SectionSeparator variant="geometric" />
            <Testimonials />
            <SectionSeparator variant="flow" />
            <Subscribe />
          </div>
        </div>
      </main>
      <Footer />
      <GoToTop />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  )
}

export default Home
