import React from 'react';
import { useParams } from 'react-router-dom';
import PropertyHero from './components/PropertyHero';
import PropertyStats from './components/PropertyStats';
import PropertyDescription from './components/PropertyDescription';
import PropertyGallery from './components/PropertyGallery';
import PropertyAmenities from './components/PropertyAmenities';
import PropertyLocation from './components/PropertyLocation';
import PropertyAgent from './components/PropertyAgent';

const PropertyDetails = () => {
    const { id } = useParams();

    // This would typically come from an API call using the ID
    const property = {
        id: 1,
        title: "Luxurious Beachfront Villa",
        price: "$5,750,000",
        address: "123 Ocean View Drive, Malibu, CA 90265",
        description: "Experience the epitome of luxury living in this stunning beachfront villa. This architectural masterpiece seamlessly blends indoor and outdoor living with floor-to-ceiling windows, offering breathtaking ocean views from every room.",
        details: {
            bedrooms: 6,
            bathrooms: 7.5,
            garage: 3,
            lotSize: "0.75 acres",
            livingArea: "8,500 sq ft",
            yearBuilt: 2022,
        },
        features: [
            "Private Beach Access",
            "Infinity Pool",
            "Wine Cellar",
            "Home Theater",
            "Smart Home System",
            "Gourmet Kitchen",
            "Elevator",
            "Solar Panels",
            "Security System",
            "Landscaped Gardens"
        ],
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
        ],
        amenities: {
            interior: [
                "Custom Italian Kitchen",
                "Marble Flooring",
                "Smart Home Technology",
                "Home Theater",
                "Wine Cellar",
                "Spa-like Bathrooms",
                "Walk-in Closets",
                "Floor-to-ceiling Windows"
            ],
            exterior: [
                "Infinity Pool",
                "Outdoor Kitchen",
                "Landscaped Gardens",
                "Private Beach Access",
                "Multiple Terraces",
                "3-Car Garage",
                "Security System",
                "Solar Panels"
            ]
        },
        agent: {
            name: "Sarah Johnson",
            phone: "+1 (310) 555-0123",
            email: "sarah.j@realestate.com",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        }
    };

    return (
        <div className="min-h-screen bg-[#122620] text-white">
            <PropertyHero property={property} />
            <PropertyStats details={property.details} />
            <PropertyDescription description={property.description} />
            <PropertyGallery images={property.images} />
            <PropertyAmenities amenities={property.amenities} />
            <PropertyLocation />
            <PropertyAgent agent={property.agent} />
        </div>
    );
};

export default PropertyDetails; 