# Cloudinary Setup Guide

This guide will help you set up Cloudinary for image upload and management in your real estate website.

## Prerequisites

1. A Cloudinary account (sign up at [cloudinary.com](https://cloudinary.com))
2. Node.js and npm installed
3. The real estate project set up

## Step 1: Get Cloudinary Credentials

1. Log in to your Cloudinary dashboard
2. Go to the "Dashboard" section
3. Copy your:
   - Cloud Name
   - API Key
   - API Secret

## Step 2: Configure Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Replace the placeholder values with your actual Cloudinary credentials.

## Step 3: Install Dependencies

The required dependencies have already been installed:

### Server Dependencies
- `cloudinary` - Cloudinary SDK
- `multer` - File upload middleware
- `@types/multer` - TypeScript types for multer

### Admin Panel Dependencies
- `cloudinary` - Cloudinary SDK for client-side operations
- `axios` - HTTP client for API requests

## Step 4: Start the Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Start the development server:
   ```bash
   npm run start:dev
   ```

The server will now have the following new endpoints:
- `POST /upload/image` - Upload a single image
- `POST /upload/images` - Upload multiple images

## Step 5: Start the Admin Panel

1. Navigate to the admin panel directory:
   ```bash
   cd adminpanel
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Step 6: Test the Integration

1. Open the admin panel in your browser
2. Go to the Property Management section
3. Try adding a new property with images
4. The images should upload to Cloudinary and be stored in the database

## Features Implemented

### Server-Side Features
- **Cloudinary Service**: Handles image uploads, deletions, and URL optimization
- **Upload Controller**: RESTful endpoints for image uploads
- **File Validation**: Validates file types and sizes
- **Error Handling**: Comprehensive error handling for upload failures

### Admin Panel Features
- **Cloudinary Integration**: Direct upload to Cloudinary via server
- **Progress Indicators**: Shows upload progress and status
- **File Type Validation**: Only allows image files
- **Multiple Upload Support**: Can upload up to 8 images per property
- **Error Handling**: User-friendly error messages

### Client-Side Features
- **Optimized Image Loading**: Images are served from Cloudinary with optimization
- **Responsive Images**: Automatic resizing and format optimization
- **Fast Loading**: Cloudinary's CDN ensures fast image delivery

## Image Optimization

Cloudinary automatically optimizes uploaded images with:
- Automatic format selection (WebP, AVIF, etc.)
- Responsive sizing
- Quality optimization
- CDN delivery

## Usage Examples

### Uploading Images in Admin Panel
```typescript
// The PropertyForm component now handles Cloudinary uploads automatically
// Just select images and they'll be uploaded to Cloudinary
```

### Displaying Images in Client
```javascript
// Images are stored as URLs in the database
// They can be displayed directly in img tags
<img src={property.images[0].url} alt="Property" />
```

### Getting Optimized URLs
```typescript
// Use the cloudinaryService for optimized URLs
const optimizedUrl = cloudinaryService.getOptimizedUrl(imageUrl, {
  width: 800,
  height: 600,
  quality: 'auto'
});
```

## Troubleshooting

### Common Issues

1. **Upload Fails**: Check your Cloudinary credentials in the `.env` file
2. **CORS Errors**: Ensure the server is running and accessible
3. **File Size Errors**: Default limit is 10MB per file
4. **File Type Errors**: Only jpg, jpeg, png, and webp files are allowed

### Debug Steps

1. Check server logs for error messages
2. Verify Cloudinary credentials are correct
3. Ensure all dependencies are installed
4. Check network connectivity

## Security Considerations

- API keys are stored in environment variables
- File uploads are validated for type and size
- Images are stored in a dedicated Cloudinary folder
- HTTPS is used for all Cloudinary communications

## Performance Benefits

- **CDN Delivery**: Images are served from Cloudinary's global CDN
- **Automatic Optimization**: Images are optimized for web delivery
- **Responsive Images**: Automatic resizing based on device
- **Format Optimization**: Automatic selection of best image format

## Next Steps

1. Set up your Cloudinary account and get credentials
2. Update the `.env` file with your credentials
3. Start the servers and test the integration
4. Customize image transformations as needed
5. Monitor usage in your Cloudinary dashboard

For more information, visit the [Cloudinary documentation](https://cloudinary.com/documentation). 