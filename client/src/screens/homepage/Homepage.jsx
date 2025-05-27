import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedProperties from './components/FeaturedProperties'
import AboutUs from './components/AboutUs'
import Testimonials from './components/Testimonials'
import Achievements from './components/Achievements'
import CoreStrengths from './components/CoreStrengths'
import FutureVision from './components/FutureVision'
import WhyChooseUs from './components/WhyChooseUs'
import Portfolio from './components/Portfolio'
import BlogSection from './components/BlogSection'
import Footer from './components/Footer'

const Homepage = () => {
    return (
        <div className="min-h-screen bg-[#122620]">
            <Navbar />
            <Hero />
            <FeaturedProperties />
            <Portfolio />
            <AboutUs
                image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
                alt="Luxury real estate team in a modern office"
            />
            <Achievements />
            <Testimonials
                image="https://images.unsplash.com/photo-1560518883-b2a85beac7c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
                alt="Happy family in front of their new home"
            />
            <WhyChooseUs
                image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
                alt="Luxury real estate showcase"
            />
            <CoreStrengths
                image="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                alt="Modern real estate office with technology"
            />
            <FutureVision />
            <BlogSection />
            <Footer />
        </div>
    )
}

export default Homepage