/**
 * Client Configuration
 * 
 * This file contains all configuration values for the Real Estate client application.
 * This mirrors the server's config.js approach instead of using environment variables.
 */

const config = {
    // Backend API Configuration
    api: {
        baseUrl: "http://localhost:3000"
    },

    // Application Configuration
    app: {
        name: "MG Pacific Real Estate",
        version: "1.0.0"
    },

    // Cloudinary Configuration (for client-side optimizations)
    cloudinary: {
        // cloudName: "dfvqmlm0g"
        cloudName: "dw5hn6dyg"
        // Note: API keys are not included for security reasons
        // Client-side operations should use the server endpoints
    },

    // Google Configuration (for client-side OAuth)
    google: {
        // "1089405619133-ttkuop80vujua43jq55sok7rmprrh5tu.apps.googleusercontent.com"
        clientId: "700750813328-9iri9mafdprggli1nglgiep9dvp134h1.apps.googleusercontent.com"
        // Note: Client secret is not included as it should only be on server
    },

    // Feature Flags
    features: {
        enableCloudinaryOptimization: true,
        enableGoogleAuth: true,
        enableFavorites: true
    },

    // UI Configuration
    ui: {
        itemsPerPage: 12,
        maxImageUploads: 8,
        maxFileSize: 10 * 1024 * 1024 // 10MB
    }
};

export default config;
