import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../../services/authService';
import config from '../../../config.js';

const AuthCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const handleCallback = async () => {
            const token = searchParams.get('token');
            const userDataParam = searchParams.get('user');
            const success = searchParams.get('success');
            const error = searchParams.get('error');

            if (success === 'true' && token) {
                try {
                    let userData = null;

                    // Try to get user data from URL parameter first
                    if (userDataParam) {
                        try {
                            userData = JSON.parse(decodeURIComponent(userDataParam));
                            console.log('User data from URL:', userData);
                        } catch (parseError) {
                            console.error('Failed to parse user data from URL:', parseError);
                        }
                    }

                    // If no user data from URL, fetch it from API
                    if (!userData) {
                        console.log('Fetching user profile from API...');
                        const response = await fetch(`${config.api.baseUrl}/auth/profile`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        });

                        if (response.ok) {
                            const profileData = await response.json();
                            userData = profileData.user;
                            console.log('User data from API:', userData);
                        } else {
                            console.error('Failed to fetch user profile');
                        }
                    }

                    // Store both token and user data
                    if (userData) {
                        authService.setAuth(token, userData);
                        console.log('Authentication successful:', userData);
                    } else {
                        // Fallback: just store the token
                        authService.setToken(token);
                        console.log('Token stored, but no user data available');
                    }

                    // Redirect to home page
                    navigate('/', { replace: true });
                } catch (error) {
                    console.error('Error during authentication callback:', error);
                    navigate('/login?error=profile_fetch_failed', { replace: true });
                }
            } else if (error) {
                // Handle error
                console.error('OAuth error:', error);
                navigate('/login?error=oauth_failed', { replace: true });
            } else {
                // No token or success parameter
                navigate('/login?error=invalid_callback', { replace: true });
            }
        };

        handleCallback();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-[#122620] flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D6AD60] mx-auto mb-4"></div>
                <p className="text-[#D6AD60] font-montserrat text-lg">
                    Completing authentication...
                </p>
            </div>
        </div>
    );
};

export default AuthCallback; 