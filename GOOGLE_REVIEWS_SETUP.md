# Google Reviews Integration Setup Guide

## Overview

This guide will help you set up dynamic Google Reviews fetching for your testimonials section using the Google Places API.

## Important Notes

⚠️ **Legal Compliance**: This solution uses the official Google Places API, which is the only legal and reliable way to fetch Google Reviews. Direct scraping from Google search results violates Google's Terms of Service.

## Step 1: Get Google Places API Key

1. **Go to Google Cloud Console**: Visit [https://console.cloud.google.com/](https://console.cloud.google.com/)

2. **Create or Select Project**:
   - Create a new project or select an existing one
   - Name it something like "Real Estate Reviews"

3. **Enable Places API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Places API"
   - Click on "Places API" and click "Enable"

4. **Create API Key**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key

5. **Secure Your API Key** (Recommended):
   - Click on your API key to edit it
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain (e.g., `yourdomain.com/*`, `localhost:*` for development)
   - Under "API restrictions", select "Restrict key" and choose "Places API"

## Step 2: Find Your Business Place ID

### Method 1: Use the API Endpoint (Recommended)

1. **Start your server**: Make sure your backend is running on `http://localhost:3000`

2. **Use the find-place-id endpoint**:
   ```bash
   curl "http://localhost:3000/reviews/find-place-id?business=MG Construction & Pacific Realty&location=Your City, State"
   ```

3. **Copy the Place ID** from the response

### Method 2: Use Google's Place ID Finder

1. **Visit**: [https://developers.google.com/maps/documentation/places/web-service/place-id](https://developers.google.com/maps/documentation/places/web-service/place-id)

2. **Search for your business**: "MG Construction & Pacific Realty"

3. **Copy the Place ID** from the results

## Step 3: Configure Your Application

1. **Update server/config.js**:
   ```javascript
   // Google Places API Configuration
   googlePlaces: {
     apiKey: "YOUR_ACTUAL_API_KEY_HERE",
     placeId: "YOUR_ACTUAL_PLACE_ID_HERE"
   },
   ```

2. **Update server/src/reviews/reviews.service.ts**:
   - Replace the placeholder Place ID with your actual Place ID
   - Update the API key reference if needed

## Step 4: Test the Integration

1. **Start your servers**:
   ```bash
   # Backend
   cd server
   npm run start:dev

   # Frontend
   cd client
   npm run dev
   ```

2. **Test the API endpoint**:
   ```bash
   curl http://localhost:3000/reviews/google
   ```

3. **Check your website**: Visit your homepage and verify that the testimonials section loads

## API Pricing

- **Google Places API**: $17 per 1,000 requests for Place Details
- **Free Tier**: $200 credit per month (covers ~11,700 requests)
- **Recommendation**: Implement caching to reduce API calls

## Caching Recommendations

To reduce API costs, consider:

1. **Cache reviews for 24 hours** (reviews don't change frequently)
2. **Store reviews in your database** and refresh periodically
3. **Use Redis** or similar for caching

## Troubleshooting

### Common Issues:

1. **"API key not configured"**:
   - Ensure your API key is correctly set in `config.js`
   - Restart your server after making changes

2. **"CORS errors"**:
   - The API calls are made from your backend, not frontend, so CORS shouldn't be an issue
   - If you see CORS errors, check your server configuration

3. **"No reviews found"**:
   - Verify your Place ID is correct
   - Check if the business has public reviews on Google
   - Some businesses may have reviews disabled

4. **"API quota exceeded"**:
   - You've exceeded your free tier limit
   - Consider implementing caching or upgrading your Google Cloud plan

## Fallback System

The system automatically falls back to static testimonials if:
- API key is not configured
- Google Places API is unavailable
- Network errors occur
- Invalid Place ID

This ensures your website always displays testimonials, even if the Google integration fails.

## Security Best Practices

1. **Never expose your API key** in frontend code
2. **Use environment variables** for production
3. **Implement rate limiting** to prevent abuse
4. **Monitor your API usage** in Google Cloud Console

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key has the correct permissions
3. Ensure your Place ID is valid
4. Test the API endpoint directly using curl or Postman






