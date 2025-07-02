# Email Setup Guide - Loops.so

This guide will help you set up email functionality for the Real Estate Platform using Loops.so.

## Why Loops.so?

- ✅ **Simpler setup** - No domain configuration needed
- ✅ **Better UI/UX** - Beautiful dashboard and email builder
- ✅ **Built-in templates** - Drag-and-drop email editor
- ✅ **Transactional + Marketing** - Both in one platform
- ✅ **Free tier** - 2,500 emails/month
- ✅ **No sandbox restrictions** - Works with any email immediately
- ✅ **Better analytics** - Visual email performance tracking

## Loops.so Setup

### 1. Create Loops Account
1. Go to [loops.so](https://loops.so) and sign up
2. Choose the **Free plan** (2,500 emails/month)
3. Verify your email address

### 2. Create Workspace
1. After signing up, create a new workspace
2. Name it "Real Estate Platform" or similar
3. Choose your workspace settings

### 3. Get API Key
1. Go to **Settings > API Keys**
2. Copy your **API Key**
3. Note your **Workspace ID** (if needed)

### 4. Set Up Email Templates
1. Go to **Templates** in your Loops dashboard
2. Create the following templates:
   - **email-verification** - For signup verification
   - **password-reset** - For password reset emails
   - **property-alert** - For property notifications
   - **welcome-email** - For new subscribers
   - **newsletter** - For marketing emails

### 5. Configure Environment Variables
1. Copy `env.example` to `.env` if you haven't already
2. Add your Loops credentials:
   ```
   LOOPS_API_KEY="your-loops-api-key"
   ```

### 6. Test Email Functionality
1. Start the server: `npm run start:dev`
2. Try signing up with a new email address
3. Check your email for the verification link
4. Try the "Forgot Password" feature
5. Check your email for the password reset link

## Email Features Included

### ✅ Transactional Emails
- **Email verification** - Sent when users sign up
- **Password reset** - Sent when users request password reset
- **Professional templates** with your branding

### ✅ Marketing Emails (Ready to Use)
- **Property alerts** - Notify users of new matching properties
- **Newsletters** - Send marketing content to subscribers
- **Welcome emails** - For new subscribers
- **Promotional emails** - Special offers and announcements

### ✅ Email Templates
- **Drag-and-drop editor** in Loops dashboard
- **Professional branding** with your platform name
- **Clear call-to-action buttons**
- **Security notices** and expiration warnings

## Using Marketing Features

### Send Property Alerts
```typescript
// In your property service
await this.emailService.sendPropertyAlert(userEmail, matchingProperties);
```

### Subscribe to Newsletter
```typescript
// When user subscribes
await this.emailService.subscribeToNewsletter(email, firstName, lastName);
```

### Send Marketing Emails
```typescript
// In your marketing service
await this.emailService.sendMarketingEmail(
    userEmail,
    "New Properties in Your Area!",
    marketingHtmlContent
);
```

## Loops Dashboard Features

### 📧 Email Templates
- **Visual editor** - Drag and drop components
- **Variables** - Use {{verificationUrl}}, {{firstName}}, etc.
- **Responsive design** - Works on all devices
- **Preview mode** - Test emails before sending

### 📊 Analytics
- **Open rates** - Track email engagement
- **Click rates** - Monitor link clicks
- **Delivery rates** - Ensure emails reach inboxes
- **Bounce tracking** - Handle failed deliveries

### 👥 Contact Management
- **Subscriber lists** - Manage newsletter subscribers
- **Contact properties** - Store user data
- **Segmentation** - Target specific user groups
- **Unsubscribe handling** - Automatic compliance

## Troubleshooting

### Common Issues:
1. **"Invalid API key"**: Make sure you're using the correct API key from Loops dashboard
2. **"Event not found"**: Create the email templates in Loops dashboard first
3. **Emails not sending**: Check server logs for detailed error messages
4. **Template variables**: Make sure template variables match your Loops templates

### Testing in Development:
- **No sandbox restrictions** - Works with any email immediately
- **Template testing** - Use Loops dashboard to test templates
- **Real-time logs** - Check Loops dashboard for delivery status

## Production Setup

### For Production:
1. **Upgrade plan** if needed (free tier: 2,500 emails/month)
2. **Set up custom domain** for better deliverability
3. **Monitor email analytics** in Loops dashboard
4. **Set up webhooks** for delivery tracking

### Recommended Plan:
- **Free tier**: Good for development and small projects
- **Pro plan**: $29/month for 50,000 emails (recommended for production)
- **Enterprise**: Custom pricing for large volumes

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for all sensitive information
- Regularly rotate your API keys
- Monitor email delivery rates and bounces
- Comply with email regulations (CAN-SPAM, GDPR)

## Next Steps

1. **Set up Loops account** following the steps above
2. **Create email templates** in Loops dashboard
3. **Test email functionality** with signup and password reset
4. **Implement marketing features** like property alerts
5. **Monitor email performance** in Loops dashboard
6. **Scale up** as your user base grows

## Template Variables

Use these variables in your Loops templates:

### Email Verification
- `{{verificationUrl}}` - The verification link
- `{{platformName}}` - "Real Estate Platform"
- `{{frontendUrl}}` - Your frontend URL

### Password Reset
- `{{resetUrl}}` - The password reset link
- `{{platformName}}` - "Real Estate Platform"
- `{{frontendUrl}}` - Your frontend URL

### Property Alerts
- `{{properties}}` - Array of property objects
- `{{propertyCount}}` - Number of properties
- `{{platformName}}` - "Real Estate Platform"

### Welcome Email
- `{{firstName}}` - User's first name
- `{{platformName}}` - "Real Estate Platform"
- `{{frontendUrl}}` - Your frontend URL 