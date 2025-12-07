/**
 * Admin Panel Configuration
 * 
 * This file contains all configuration values for the Real Estate admin panel application.
 * This mirrors the server's config.js approach instead of using environment variables.
 */

export interface Config {
  // API Configuration
  api: {
    baseUrl: string;
  };

  // Frontend Configuration
  frontend: {
    baseUrl: string;
  };

  // Client Website Configuration (customer-facing site)
  client: {
    baseUrl: string;
  };

  // Admin Configuration
  admin: {
    apiKey: string;
  };

  // Application Configuration
  app: {
    name: string;
    version: string;
  };

  // Cloudinary Configuration (for admin uploads)
  cloudinary: {
    cloudName: string;
    // Note: API keys are handled server-side for security
  };

  // Feature Flags
  features: {
    enableCloudinaryUploads: boolean;
    enablePDFManagement: boolean;
    enableNotifications: boolean;
    enableGeocoding: boolean;
  };

  // UI Configuration
  ui: {
    itemsPerPage: number;
    maxFileSize: number; // in MB
    supportedImageFormats: string[];
    supportedDocumentFormats: string[];
  };

  // Development Configuration
  development: {
    enableDebugMode: boolean;
    showPerformanceMetrics: boolean;
  };
}

const config: Config = {
  // API Configuration
  api: {
    baseUrl: "http://localhost:3000"
  },

  // Frontend Configuration
  frontend: {
    baseUrl: "http://localhost:5174"
  },

  // Client Website Configuration (customer-facing site)
  client: {
    baseUrl: "http://localhost:5173"
  },

  // Admin Configuration
  admin: {
    apiKey: "sfdbvslfdkbn35tjkbflkjvbdfvk" // Should be set via environment or secure method
  },

  // Application Configuration
  app: {
    name: "Real Estate Admin Panel",
    version: "1.0.0"
  },

  // Cloudinary Configuration
  cloudinary: {
    cloudName: "dfvqmlm0g" // Public cloud name, safe for client-side
  },

  // Feature Flags
  features: {
    enableCloudinaryUploads: true,
    enablePDFManagement: true,
    enableNotifications: true,
    enableGeocoding: true
  },

  // UI Configuration
  ui: {
    itemsPerPage: 10,
    maxFileSize: 10, // 10MB
    supportedImageFormats: ['jpg', 'jpeg', 'png', 'webp'],
    supportedDocumentFormats: ['pdf', 'doc', 'docx']
  },

  // Development Configuration
  development: {
    // enableDebugMode: process.env.NODE_ENV === 'development',
    // showPerformanceMetrics: process.env.NODE_ENV === 'development'
    enableDebugMode: true,
    showPerformanceMetrics: true
  }
};

export default config;