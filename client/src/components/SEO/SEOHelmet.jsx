import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHelmet = ({
    title = "MG Constructions - Luxury Real Estate",
    description = "Discover luxury real estate properties with MG Constructions. Premium homes, expert service, and unmatched market knowledge.",
    keywords = "luxury real estate, premium properties, homes for sale, real estate agent, property investment",
    image = "/logoPng.png",
    url = window.location.href,
    type = "website",
    author = "MG Constructions",
    siteName = "MG Constructions",
    twitterHandle = "@mgpacificestates",
    structuredData = null,
    canonical = null
}) => {
    const fullTitle = title.includes('MG Constructions') ? title : `${title} | MG Constructions`;
    const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* Canonical URL */}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:creator" content={twitterHandle} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />

            {/* Additional Meta Tags */}
            <meta name="theme-color" content="#122620" />
            <meta name="msapplication-TileColor" content="#122620" />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHelmet;
