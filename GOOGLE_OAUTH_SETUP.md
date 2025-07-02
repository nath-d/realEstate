# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for the MG Pacific Estates application.

## Prerequisites

- Google Cloud Console account
- Access to create OAuth 2.0 credentials

## Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
   - Also enable "Google Identity" if available

## Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Set the following:
   - **Name**: MG Pacific Estates OAuth
   - **Authorized JavaScript origins**: 
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/auth/google/callback` (for development)
     - `https://yourdomain.com/auth/google/callback` (for production)

5. Click "Create"
6. Note down the **Client ID** and **Client Secret**

## Step 3: Environment Configuration

1. Create a `.env` file in the `server` directory
2. Add the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/realestate_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Google OAuth Configuration
GOOGLE_CLIENT_ID="your-google-client-id-from-step-2"
GOOGLE_CLIENT_SECRET="your-google-client-secret-from-step-2"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"

# Server Configuration
PORT=3000

# Frontend URL (for CORS and redirects)
FRONTEND_URL="http://localhost:5173"
```

## Step 4: Testing the Setup

1. Start the server:
   ```bash
   cd server
   npm run start:dev
   ```

2. Start the frontend:
   ```bash
   cd client
   npm run dev
   ```

3. Navigate to the login or signup page
4. Click the "Sign in with Google" button
5. You should be redirected to Google's authentication page
6. After successful authentication, you'll be redirected back to the application

## Step 5: Troubleshooting

### Common Issues:

1. **"Invalid redirect URI" error**:
   - Make sure the redirect URI in Google Cloud Console matches exactly: `http://localhost:3000/auth/google/callback`
   - Check that there are no trailing slashes or extra spaces

2. **"Client ID not found" error**:
   - Verify that the `GOOGLE_CLIENT_ID` in your `.env` file is correct
   - Make sure the `.env` file is in the correct location (server directory)

3. **CORS errors**:
   - Ensure the frontend URL is correctly set in the `FRONTEND_URL` environment variable
   - Check that the server CORS configuration allows your frontend domain

4. **Database connection issues**:
   - Make sure your PostgreSQL database is running
   - Verify the `DATABASE_URL` is correct
   - Run database migrations: `npm run prisma:migrate`

### Testing the OAuth Flow:

1. **Manual testing**:
   - Visit `http://localhost:3000/auth/google` directly
   - You should be redirected to Google's login page
   - After login, you should be redirected to the frontend callback page

2. **Frontend integration**:
   - Click the Google login button on the login/signup pages
   - The flow should work seamlessly

## Security Considerations

1. **Environment Variables**: Never commit your `.env` file to version control
2. **Client Secret**: Keep your Google Client Secret secure and never expose it in frontend code
3. **HTTPS**: Use HTTPS in production for secure OAuth communication
4. **Token Storage**: JWT tokens are stored in localStorage - consider using httpOnly cookies for better security in production

## Production Deployment

When deploying to production:

1. Update the Google Cloud Console redirect URIs to use your production domain
2. Set the `FRONTEND_URL` environment variable to your production frontend URL
3. Use a strong, unique `JWT_SECRET`
4. Enable HTTPS for both frontend and backend
5. Consider using environment-specific Google OAuth credentials

## Support

If you encounter issues:

1. Check the server logs for error messages
2. Verify all environment variables are set correctly
3. Ensure the Google Cloud Console configuration matches your setup
4. Test the OAuth flow step by step

## Files Modified

The following files were updated to support Google OAuth:

### Backend:
- `server/src/auth/strategies/google.strategy.ts` - Google OAuth strategy
- `server/src/auth/guards/google-auth.guard.ts` - Google OAuth guard
- `server/src/auth/auth.controller.ts` - OAuth endpoints
- `server/src/auth/auth.service.ts` - Google login logic
- `server/src/auth/auth.module.ts` - Module configuration

### Frontend:
- `client/src/screens/login/LoginPage.jsx` - Added Google login button
- `client/src/screens/signup/SignupPage.jsx` - Added Google signup button
- `client/src/screens/auth/AuthCallback.jsx` - OAuth callback handler
- `client/src/services/authService.js` - Added setToken method
- `client/src/App.jsx` - Added auth callback route 