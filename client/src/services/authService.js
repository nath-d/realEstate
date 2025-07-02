// Authentication service for handling login, signup, and user management

class AuthService {
    constructor() {
        this.baseURL = 'http://localhost:3000'; // Update with your actual API URL
        this.tokenKey = 'mg_pacific_token';
        this.userKey = 'mg_pacific_user';
    }

    // Get stored token
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    // Set token only (for OAuth callbacks)
    setToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    // Get stored user data
    getUser() {
        const user = localStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    }

    // Set token and user data
    setAuth(token, user) {
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.userKey, JSON.stringify(user));
        // Dispatch custom event for authentication change
        window.dispatchEvent(new CustomEvent('authStateChanged', {
            detail: { authenticated: true, user }
        }));
    }

    // Clear authentication data
    clearAuth() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        // Dispatch custom event for authentication change
        window.dispatchEvent(new CustomEvent('authStateChanged', {
            detail: { authenticated: false, user: null }
        }));
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.getToken();
    }

    // Login user
    async login(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store authentication data
            this.setAuth(data.token, data.user);

            return {
                success: true,
                user: data.user,
                token: data.token
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Signup user
    async signup(userData) {
        try {
            const response = await fetch(`${this.baseURL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            // Store authentication data
            this.setAuth(data.token, data.user);

            return {
                success: true,
                user: data.user,
                token: data.token
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Logout user
    logout() {
        this.clearAuth();
        // Redirect to home page
        window.location.href = '/';
    }

    // Forgot password
    async forgotPassword(email) {
        try {
            const response = await fetch(`${this.baseURL}/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send reset email');
            }

            return {
                success: true,
                message: data.message
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Reset password
    async resetPassword(token, newPassword) {
        try {
            const response = await fetch(`${this.baseURL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to reset password');
            }

            return {
                success: true,
                message: data.message
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Update user profile
    async updateProfile(profileData) {
        try {
            const token = this.getToken();
            if (!token) {
                throw new Error('No authentication token');
            }

            const response = await fetch(`${this.baseURL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(profileData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            // Update stored user data
            const currentUser = this.getUser();
            const updatedUser = { ...currentUser, ...data.user };
            localStorage.setItem(this.userKey, JSON.stringify(updatedUser));

            return {
                success: true,
                user: data.user
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Change password
    async changePassword(currentPassword, newPassword) {
        try {
            const token = this.getToken();
            if (!token) {
                throw new Error('No authentication token');
            }

            const response = await fetch(`${this.baseURL}/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to change password');
            }

            return {
                success: true,
                message: data.message
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Refresh user data from server
    async refreshUserData() {
        try {
            const token = this.getToken();
            if (!token) {
                throw new Error('No authentication token');
            }

            const response = await fetch(`${this.baseURL}/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const data = await response.json();

            // Update stored user data
            this.setAuth(token, data.user);

            return {
                success: true,
                user: data.user
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Add property to favorites
    async addToFavorites(propertyId) {
        try {
            const token = this.getToken();
            if (!token) {
                throw new Error('No authentication token');
            }

            const response = await fetch(`${this.baseURL}/auth/favorites/${propertyId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add property to favorites');
            }

            const data = await response.json();
            return {
                success: true,
                message: data.message
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Remove property from favorites
    async removeFromFavorites(propertyId) {
        try {
            const token = this.getToken();
            if (!token) {
                throw new Error('No authentication token');
            }

            const response = await fetch(`${this.baseURL}/auth/favorites/${propertyId}/remove`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to remove property from favorites');
            }

            const data = await response.json();
            return {
                success: true,
                message: data.message
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Get user's favorite properties
    async getFavoriteProperties() {
        try {
            const token = this.getToken();
            if (!token) {
                throw new Error('No authentication token');
            }

            const response = await fetch(`${this.baseURL}/auth/favorites`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch favorite properties');
            }

            const data = await response.json();
            return {
                success: true,
                properties: data.properties
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Check if a property is in favorites
    async isPropertyFavorite(propertyId) {
        try {
            const token = this.getToken();
            if (!token) {
                return false;
            }

            const result = await this.getFavoriteProperties();
            if (result.success) {
                return result.properties.some(property => property.id === parseInt(propertyId));
            }
            return false;
        } catch (error) {
            console.error('Error checking favorite status:', error);
            return false;
        }
    }

    // Get authentication headers for API requests
    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        };
    }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService; 