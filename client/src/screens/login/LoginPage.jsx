import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import config from '../../../config.js';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await authService.login(formData.email, formData.password);

            if (result.success) {
                // Redirect to dashboard or home page
                navigate('/');
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to the Google OAuth endpoint
        window.location.href = `${config.api.baseUrl}/auth/google`;
    };

    return (
        <div className="min-h-screen bg-[#122620] flex items-center justify-center px-4 sm:px-6 lg:px-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D6AD60]/20 via-transparent to-[#B68D40]/20"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10">
                {/* Logo and Header */}
                <div className="text-center">
                    <Link to="/" className="inline-block mb-8">
                        <img
                            src="/logoFinalSvg.svg"
                            alt="MG Constructions"
                            className="h-16 w-auto object-contain mx-auto"
                        />
                    </Link>
                    <h2 className="text-3xl font-source-serif text-[#D6AD60] tracking-wide mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-[#D6AD60]/80 font-montserrat text-sm tracking-wide">
                        Sign in to your account
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white/5 backdrop-blur-sm border border-[#D6AD60]/20 rounded-none p-8 shadow-2xl">
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-400/30 text-red-400 font-montserrat text-sm tracking-wide">
                            {error}
                        </div>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2 tracking-wide"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white/10 border border-[#D6AD60]/30 text-white placeholder-[#D6AD60]/50 font-montserrat text-sm tracking-wide focus:outline-none focus:border-[#D6AD60] focus:bg-white/15 transition-all duration-300"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2 tracking-wide"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-[#D6AD60]/30 text-white placeholder-[#D6AD60]/50 font-montserrat text-sm tracking-wide focus:outline-none focus:border-[#D6AD60] focus:bg-white/15 transition-all duration-300"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#D6AD60]/70 hover:text-[#D6AD60] transition-colors duration-200"
                                >
                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me and Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#D6AD60] bg-white/10 border-[#D6AD60]/30 rounded focus:ring-[#D6AD60] focus:ring-2"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm font-montserrat text-[#D6AD60]/80 tracking-wide"
                                >
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link
                                    to="/forgot-password"
                                    className="font-montserrat text-[#D6AD60] hover:text-[#B68D40] transition-colors duration-200 tracking-wide"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border-2 border-[#D6AD60] text-[#D6AD60] font-montserrat font-semibold tracking-widest text-sm uppercase hover:bg-[#D6AD60] hover:text-[#122620] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D6AD60] transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#D6AD60] mr-2"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#D6AD60]/30"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#122620] text-[#D6AD60]/60 font-montserrat tracking-wide">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full inline-flex justify-center py-2 px-4 border border-[#D6AD60]/30 text-[#D6AD60] bg-white/5 hover:bg-white/10 font-montserrat text-sm font-medium tracking-wide transition-all duration-300"
                            >
                                <span className="sr-only">Sign in with Google</span>
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </button>
                            {/* <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 border border-[#D6AD60]/30 text-[#D6AD60] bg-white/5 hover:bg-white/10 font-montserrat text-sm font-medium tracking-wide transition-all duration-300"
                            >
                                <span className="sr-only">Sign in with Facebook</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                                </svg>
                            </button> */}
                        </div>
                    </form>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                    <p className="text-[#D6AD60]/80 font-montserrat text-sm tracking-wide">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="font-medium text-[#D6AD60] hover:text-[#B68D40] transition-colors duration-200"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link
                        to="/"
                        className="text-[#D6AD60]/60 hover:text-[#D6AD60] font-montserrat text-sm tracking-wide transition-colors duration-200"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage; 