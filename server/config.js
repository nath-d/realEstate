/**
 * Application Configuration
 * 
 * This file contains all configuration values for the Real Estate application.
 * Previously these were stored in environment variables (.env file).
 */

const config = {
  // Database Configuration
  database: {
    url: "postgresql://estatedb_owner:npg_EeCVfBN2q0ht@ep-rough-feather-a1jp0s10-pooler.ap-southeast-1.aws.neon.tech/estatedb?sslmode=require",
    // Uncomment if using Prisma < 5.10
    // unpooledUrl: "postgresql://estatedb_owner:npg_EeCVfBN2q0ht@ep-rough-feather-a1jp0s10.ap-southeast-1.aws.neon.tech/estatedb?sslmode=require"
  },

  // Cloudinary Configuration
  cloudinary: {
    cloudName: "dfvqmlm0g",
    apiKey: "733726791335692",
    apiSecret: "SdJECabVYut8aCHv109BlxIhVjo"
  },

  // JWT Configuration
  jwt: {
    secret: "bvlk3jbt31lk5jtnb3kl45gn354g3524\\5]2[45\\]3245p\\4]p;\\]v34\\][534[5\\3]4[5345]p\\]"
  },

  // Google OAuth Configuration
  google: {
    clientId: "1089405619133-ttkuop80vujua43jq55sok7rmprrh5tu.apps.googleusercontent.com",
    clientSecret: "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",
    callbackUrl: "http://localhost:3000/auth/google/callback"
  },

  // Application URLs
  urls: {
    frontend: "http://localhost:5173",
    backend: "http://localhost:3000"
  },

  // Email Configuration (Gmail SMTP)
  email: {
    user: "rishicyka@gmail.com",
    password: "yhfh cnrg lpcx nhzr"
  },

  // Admin API Configuration
  admin: {
    apiKey: "sfdbvslfdkbn35tjkbflkjvbdfvk"
  },

  // Server Configuration
  server: {
    port: 3000
  },

  // Email Service Providers (Currently Commented Out)
  // Uncomment and configure if you want to use these services

  // Loops.so Configuration
  // loops: {
  //   apiKey: "052cb889778afb664bfdebde0573ff3b"
  // },

  // Resend.com Configuration  
  // resend: {
  //   apiKey: "re_We46AemK_PH4xxbFuKsDYvzq7kbN2XXH1"
  // }
};

module.exports = config;
