import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError('');

        try {
            const result = await authService.forgotPassword(email);

            if (result.success) {
                setMessage(result.message || 'Password reset code sent successfully! Check your email for the 6-digit code.');
                // Redirect to reset password page after a short delay
                setTimeout(() => {
                    navigate('/reset-password');
                }, 2000);
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
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
                        Forgot Password
                    </h2>
                    <p className="text-[#D6AD60]/80 font-montserrat text-sm tracking-wide">
                        Enter your email to receive a reset code
                    </p>
                </div>

                {/* Forgot Password Form */}
                <div className="bg-white/5 backdrop-blur-sm border border-[#D6AD60]/20 rounded-none p-8 shadow-2xl">
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-400/30 text-red-400 font-montserrat text-sm tracking-wide">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="mb-4 p-3 bg-green-500/10 border border-green-400/30 text-green-400 font-montserrat text-sm tracking-wide">
                            {message}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-[#D6AD60]/30 text-white placeholder-[#D6AD60]/50 font-montserrat text-sm tracking-wide focus:outline-none focus:border-[#D6AD60] focus:bg-white/15 transition-all duration-300"
                                placeholder="Enter your email"
                            />
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
                                        Sending...
                                    </div>
                                ) : (
                                    'Send Reset Code'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Links */}
                <div className="text-center space-y-4">
                    <p className="text-[#D6AD60]/80 font-montserrat text-sm tracking-wide">
                        Remember your password?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-[#D6AD60] hover:text-[#B68D40] transition-colors duration-200"
                        >
                            Sign in
                        </Link>
                    </p>
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

export default ForgotPasswordPage; 