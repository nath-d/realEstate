/**
 * Environment Setup from Config
 * 
 * This module sets up environment variables from the centralized config.js file
 * instead of using a traditional .env file.
 */

const config = require('../../config.js');

// Set up environment variables from config
export function setupEnvironmentFromConfig(): void {
  // Database
  process.env.DATABASE_URL = config.database.url;

  // JWT
  process.env.JWT_SECRET = config.jwt.secret;

  // Google OAuth
  process.env.GOOGLE_CLIENT_ID = config.google.clientId;
  process.env.GOOGLE_CLIENT_SECRET = config.google.clientSecret;
  process.env.GOOGLE_CALLBACK_URL = config.google.callbackUrl;

  // Cloudinary
  process.env.CLOUDINARY_CLOUD_NAME = config.cloudinary.cloudName;
  process.env.CLOUDINARY_API_KEY = config.cloudinary.apiKey;
  process.env.CLOUDINARY_API_SECRET = config.cloudinary.apiSecret;

  // Email
  process.env.EMAIL_USER = config.email.user;
  process.env.EMAIL_PASSWORD = config.email.password;

  // URLs
  process.env.FRONTEND_URL = config.urls.frontend;
  process.env.BACKEND_URL = config.urls.backend;

  // Admin
  process.env.ADMIN_API_KEY = config.admin.apiKey;

  // Server
  process.env.PORT = config.server.port.toString();

  console.log('✅ Environment variables loaded from config.js');
}

// Auto-setup when this module is imported
setupEnvironmentFromConfig();
