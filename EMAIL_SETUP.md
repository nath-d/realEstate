# Email Setup Guide - Nodemailer with Gmail SMTP

This guide explains how to set up email functionality using Nodemailer with Gmail SMTP for sending OTP verification codes and password reset emails.

## Features

- ✅ **Email Verification**: 6-digit OTP sent during signup
- ✅ **Password Reset**: 6-digit OTP for secure password reset
- ✅ **Welcome Emails**: Sent to new newsletter subscribers
- ✅ **Marketing Emails**: Property alerts and newsletters
- ✅ **Completely Free**: No third-party service costs
- ✅ **Self-Contained**: No external dependencies

## Setup Instructions

### 1. Gmail Account Setup

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Navigate to Security → 2-Step Verification
   - Enable 2-factor authentication

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Generate a 16-character app password
   - Copy this password (you'll need it for the environment variables)

### 2. Environment Variables

Add these variables to your `.env` file:

```env
# Email Configuration (Gmail SMTP)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-gmail-app-password"
```

**Important**: 
- Use your actual Gmail address for `EMAIL_USER`
- Use the 16-character app password (not your regular Gmail password) for `EMAIL_PASSWORD`
- Never commit your actual credentials to version control

### 3. Email Addresses Used

The system uses your Gmail address for all email types:
- **From Address**: Your Gmail address (e.g., `your-email@gmail.com`)
- **Verification Emails**: Sent to new users during signup
- **Password Reset**: Sent when users request password reset
- **Welcome Emails**: Sent to newsletter subscribers
- **Marketing Emails**: Property alerts and newsletters

## How It Works

### Email Verification Flow
1. User signs up with email and password
2. System generates a 6-digit OTP
3. OTP is sent via email with 10-minute expiry
4. User enters OTP on verification page
5. Email is marked as verified

### Password Reset Flow
1. User requests password reset
2. System generates a 6-digit OTP
3. OTP is sent via email with 10-minute expiry
4. User enters OTP and new password
5. Password is updated

### OTP Security Features
- **6-digit codes**: Easy to enter, hard to guess
- **10-minute expiry**: Short window for security
- **One-time use**: Each OTP can only be used once
- **Rate limiting**: Built into the email service

## Email Templates

All emails use professional HTML templates with:
- 🏠 Real Estate Platform branding
- Responsive design
- Clear call-to-action buttons
- Security notices and expiry information
- Professional styling and colors

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**
   - Ensure 2-factor authentication is enabled
   - Use the app password, not your regular password
   - Check that the email address is correct

2. **Emails not sending**
   - Verify Gmail SMTP settings
   - Check firewall/network restrictions
   - Ensure app password is correctly generated

3. **OTP not working**
   - Check if OTP has expired (10 minutes)
   - Verify the OTP was entered correctly
   - Check server logs for email sending errors

### Gmail Limitations

- **Daily sending limit**: 500 emails per day for regular Gmail accounts
- **Rate limiting**: Gmail may throttle if sending too many emails quickly
- **Spam filters**: Ensure proper email content to avoid spam folder

## Production Considerations

For production use, consider:
- **Domain verification**: Verify your domain with Gmail for better deliverability
- **Email service upgrade**: Consider Gmail Workspace for higher limits
- **Monitoring**: Set up email delivery monitoring
- **Backup service**: Consider having a backup email service

## API Endpoints

### Email Verification
- `POST /auth/signup` - Sends verification OTP
- `POST /auth/verify-email` - Verifies OTP and marks email as verified

### Password Reset
- `POST /auth/forgot-password` - Sends password reset OTP
- `POST /auth/reset-password` - Resets password using OTP

### Marketing
- `POST /marketing/subscribe` - Sends welcome email
- `POST /marketing/property-alert` - Sends property alerts
- `POST /marketing/newsletter` - Sends newsletters

## Security Notes

- OTPs expire after 10 minutes
- Each OTP can only be used once
- Failed attempts are logged
- Email addresses are validated before sending
- No sensitive information is stored in emails

## Migration from Third-Party Services

This implementation replaces:
- ❌ Resend.com
- ❌ Mailgun
- ❌ Loops.so
- ❌ AWS SES

With a simple, free, and self-contained Nodemailer solution. 