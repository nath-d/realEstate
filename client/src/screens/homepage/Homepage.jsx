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
import PropertyListingCard from '../propertyListings/components/PropertyListingCard'

const Homepage = () => {
    return (
        <div className="min-h-screen bg-[#122620]">
            <Navbar />
            <Hero />
            <FeaturedProperties />
            <AboutUs
                image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
                alt="Luxury real estate team in a modern office"
            />
            <Testimonials
                image="https://images.unsplash.com/photo-1560518883-b2a85beac7c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
                alt="Happy family in front of their new home"
            />
            <Achievements
                image="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
                alt="Award ceremony for real estate excellence"
            />
            <CoreStrengths
                image="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                alt="Modern real estate office with technology"
            />
            <WhyChooseUs
                image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80"
                alt="Luxury home interior showing quality and excellence"
            />
            <FutureVision
                image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
                alt="Futuristic real estate concept"
            />
            {/* Other sections will go here */}
        </div>
    )
}

export default Homepage