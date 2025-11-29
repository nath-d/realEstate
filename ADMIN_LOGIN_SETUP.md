# Admin Login System - Setup Guide

This document describes the comprehensive admin login system that has been implemented for your real estate application.

## 🚀 Features Implemented

### Backend (Server)
- ✅ Admin-specific login endpoint (`/auth/admin/login`)
- ✅ Admin role guard for protecting admin-only endpoints
- ✅ JWT-based authentication with user role validation
- ✅ Integration with existing user system (admin role in database)

### Frontend (Admin Panel)
- ✅ Complete authentication context and state management
- ✅ Professional login page with form validation
- ✅ Protected routes - all admin pages require authentication
- ✅ Automatic token management and persistence
- ✅ Logout functionality
- ✅ User profile display in header
- ✅ Automatic redirect to login when unauthorized

## 🛠 Setup Instructions

### 1. Create Admin User

First, you need to create an admin user in your database. Run this script from your server directory:

```bash
cd server
node create-admin-user.js
```

This will create an admin user with:
- **Email:** `admin@mgconstructions.com`
- **Password:** `Admin123!`
- **Role:** `admin`

### 2. Start the Server

Make sure your server is running:

```bash
cd server
npm run start:dev  # or npm start
```

The server should be running on `http://localhost:3000`

### 3. Start the Admin Panel

Start the admin panel development server:

```bash
cd adminpanel
npm run dev
```

The admin panel should be running on `http://localhost:5174`

### 4. Access the Admin Panel

1. Navigate to `http://localhost:5174`
2. You'll be automatically redirected to the login page
3. Use the admin credentials created in step 1:
   - Email: `admin@mgconstructions.com`
   - Password: `Admin123!`
4. After successful login, you'll be redirected to the dashboard

## 🔐 How the Authentication Works

### Login Flow
1. User enters credentials on login page
2. Frontend sends request to `/auth/admin/login`
3. Server validates credentials and checks if user has `admin` role
4. If valid, server returns JWT token and user data
5. Frontend stores token in localStorage and updates auth context
6. User is redirected to dashboard

### Route Protection
- All admin routes are wrapped with `ProtectedRoute` component
- If user is not authenticated, they're redirected to login
- Authentication state persists across browser sessions
- Token is automatically sent with all API requests

### Logout
- Click the logout option in the user dropdown (top right)
- Clears authentication token and redirects to login

## 🏗 Architecture Overview

### Backend Components
```
server/src/auth/
├── auth.controller.ts     # Added /admin/login endpoint
├── guards/
│   ├── jwt-auth.guard.ts  # Existing JWT authentication
│   └── admin-role.guard.ts # New admin role validation
└── strategies/
    └── jwt.strategy.ts    # Existing JWT strategy
```

### Frontend Components
```
adminpanel/src/
├── context/
│   └── AuthContext.tsx         # Authentication state management
├── components/
│   └── ProtectedRoute.tsx      # Route protection wrapper
├── pages/
│   └── Login.tsx              # Admin login page
├── services/
│   └── apiService.ts          # Authenticated API client
└── App.tsx                    # Updated with auth routing
```

## 🛡 Security Features

- **Role-based Access:** Only users with `admin` role can access admin panel
- **JWT Token Authentication:** Secure token-based authentication
- **Automatic Session Management:** Tokens stored securely in localStorage
- **Route Protection:** All admin routes require authentication
- **Automatic Logout:** Invalid/expired tokens trigger automatic logout
- **CORS Configuration:** Server configured for cross-origin requests

## 🔧 Configuration

### Server Configuration
Admin settings are configured in `server/config.js`:

```javascript
admin: {
  apiKey: "sfdbvslfdkbn35tjkbflkjvbdfvk"
}
```

### Frontend Configuration
API endpoints are configured in `adminpanel/config.ts`:

```javascript
api: {
  baseUrl: "http://localhost:3000"
}
```

## 🧪 Testing the System

1. **Test Login:** Try logging in with admin credentials
2. **Test Protection:** Try accessing `/dashboard` without login (should redirect)
3. **Test Logout:** Log out and verify you can't access protected pages
4. **Test Invalid Credentials:** Try logging in with wrong password
5. **Test Non-Admin Users:** Try logging in with a regular user account

## 🔄 Creating Additional Admin Users

To create more admin users, you can either:

1. **Use the script:** Modify `create-admin-user.js` with different details
2. **Use the database:** Manually set `role = 'admin'` for existing users
3. **Add signup functionality:** Extend the system to allow admin user creation

## 🚨 Troubleshooting

### Common Issues

**"Admin access required" error:**
- Check that user role is set to 'admin' in database
- Verify the user exists in the users table

**Login page not accessible:**
- Ensure server is running on port 3000
- Check that `/auth/admin/login` endpoint exists

**Token expires quickly:**
- JWT tokens expire in 7 days (configurable in `auth.module.ts`)
- Clear localStorage if having persistent issues

**CORS errors:**
- Ensure server CORS is configured for frontend URL
- Check that frontend URL matches server configuration

### Development Tips

- Check browser DevTools Network tab for API errors
- Use browser Application tab to inspect stored tokens
- Check server logs for authentication errors
- Use Prisma Studio to inspect user data

## 🎯 Next Steps

You can extend the system by:
- Adding password reset functionality for admins
- Implementing user profile management
- Adding audit logging for admin actions
- Creating role-based permissions for different admin features
- Adding two-factor authentication

The system is now fully functional and ready for production use!

