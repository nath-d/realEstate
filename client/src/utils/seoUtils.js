// SEO utility functions for generating dynamic meta tags and structured data

export const generatePropertySEO = (property) => {
    if (!property) return {};

    const location = property.location ?
        `${property.location.city}, ${property.location.state}` :
        'Prime Location';

    const price = property.price ?
        `$${property.price.toLocaleString()}` :
        'Price on Request';

    const bedrooms = property.bedrooms || property.details?.bedrooms || 0;
    const bathrooms = property.bathrooms || property.details?.bathrooms || 0;

    const title = `${property.title} - ${price} | ${location} Real Estate`;

    const description = `${property.title} in ${location}. ${bedrooms} bed, ${bathrooms} bath luxury property. ${property.description?.substring(0, 120)}...`;

    const keywords = [
        'luxury real estate',
        location.toLowerCase(),
        `${bedrooms} bedroom home`,
        property.type || 'luxury property',
        'real estate for sale',
        property.location?.city?.toLowerCase(),
        property.location?.state?.toLowerCase()
    ].filter(Boolean).join(', ');

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": property.title,
        "description": property.description,
        "url": `${window.location.origin}/propertyDet?id=${property.id}`,
        "image": property.images?.[0]?.url || property.images?.[0] || "/propertyOne.jpg",
        "offers": {
            "@type": "Offer",
            "price": property.price || 0,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        },
        "address": property.location ? {
            "@type": "PostalAddress",
            "streetAddress": property.location.address,
            "addressLocality": property.location.city,
            "addressRegion": property.location.state,
            "postalCode": property.location.zipCode,
            "addressCountry": "US"
        } : undefined,
        "geo": property.location?.latitude && property.location?.longitude ? {
            "@type": "GeoCoordinates",
            "latitude": property.location.latitude,
            "longitude": property.location.longitude
        } : undefined,
        "numberOfRooms": bedrooms,
        "numberOfBathroomsTotal": bathrooms,
        "floorSize": {
            "@type": "QuantitativeValue",
            "value": property.livingArea || property.details?.livingArea || "N/A"
        },
        "yearBuilt": property.yearBuilt || property.details?.yearBuilt
    };

    return {
        title,
        description,
        keywords,
        structuredData,
        image: property.images?.[0]?.url || property.images?.[0] || "/propertyOne.jpg"
    };
};

export const generateBlogSEO = (blog) => {
    if (!blog) return {};

    const title = `${blog.title} | MG Constructions Blog`;
    const description = blog.excerpt || blog.metaDescription ||
        `${blog.content?.substring(0, 150)}...` ||
        'Expert insights on luxury real estate market trends and investment opportunities.';

    const keywords = [
        'real estate blog',
        'property investment',
        'luxury real estate',
        ...(blog.tags || [])
    ].join(', ');

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": description,
        "image": blog.featuredImage || "/hero1.jpg",
        "author": {
            "@type": "Person",
            "name": blog.author?.name || "MG Constructions Team"
        },
        "publisher": {
            "@type": "Organization",
            "name": "MG Constructions",
            "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/logoPng.png`
            }
        },
        "datePublished": blog.createdAt,
        "dateModified": blog.updatedAt || blog.createdAt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${window.location.origin}/blogs/${blog.id}`
        }
    };

    return {
        title,
        description,
        keywords,
        structuredData,
        image: blog.featuredImage || "/hero1.jpg"
    };
};

export const generateLocationSEO = (location, properties = []) => {
    const title = `Luxury Real Estate in ${location} | MG Constructions`;
    const description = `Discover premium properties and luxury homes in ${location}. Expert real estate services with ${properties.length}+ exclusive listings.`;

    const keywords = [
        `${location.toLowerCase()} real estate`,
        `luxury homes ${location.toLowerCase()}`,
        `properties for sale ${location.toLowerCase()}`,
        'premium real estate',
        'luxury property investment'
    ].join(', ');

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "MG Constructions",
        "description": `Luxury real estate services in ${location}`,
        "areaServed": location,
        "serviceType": "Real Estate Sales",
        "url": window.location.href,
        "logo": `${window.location.origin}/logoPng.png`,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-0123",
            "contactType": "Customer Service"
        }
    };

    return {
        title,
        description,
        keywords,
        structuredData
    };
};

export const generateHomepageSEO = () => {
    const title = "MG Constructions - Luxury Real Estate & Premium Properties";
    const description = "Discover exceptional luxury real estate with MG Constructions. Premium properties, expert market knowledge, and personalized service for discerning clients.";

    const keywords = [
        'luxury real estate',
        'premium properties',
        'real estate agent',
        'luxury homes for sale',
        'property investment',
        'real estate services',
        'MG Constructions'
    ].join(', ');

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "MG Constructions",
        "description": "Premier luxury real estate services specializing in high-end properties and exceptional client experiences.",
        "url": window.location.origin,
        "logo": `${window.location.origin}/logoPng.png`,
        "sameAs": [
            "https://facebook.com/mgpacificestates",
            "https://instagram.com/mgpacificestates",
            "https://linkedin.com/company/mgpacificestates"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-0123",
            "contactType": "Customer Service",
            "availableLanguage": "English"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Los Angeles",
            "addressRegion": "CA",
            "addressCountry": "US"
        }
    };

    return {
        title,
        description,
        keywords,
        structuredData
    };
};
