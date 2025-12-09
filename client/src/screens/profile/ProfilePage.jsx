import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import config from '../../../config.js';
import { FaSignOutAlt } from 'react-icons/fa';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState('');
    const [showVerifyEmail, setShowVerifyEmail] = useState(false);
    const [otp, setOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            const token = authService.getToken();
            if (!token) {
                window.location.href = '/login';
                return;
            }

            const response = await fetch(`${config.api.baseUrl}/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setEditForm({
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    phone: data.user.phone || '',
                    address: data.user.address || '',
                    city: data.user.city || '',
                    state: data.user.state || '',
                    zipCode: data.user.zipCode || '',
                    country: data.user.country || '',
                });
            } else {
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            window.location.href = '/login';
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setMessage('');

        try {
            const token = authService.getToken();
            const response = await fetch(`${config.api.baseUrl}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editForm),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                setIsEditing(false);
                setMessage('Profile updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage(data.error || 'Failed to update profile');
            }
        } catch (error) {
            setMessage('An error occurred while updating profile');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleLogout = () => {
        authService.logout();
    };

    const handleSendVerificationOtp = async () => {
        setIsSendingOtp(true);
        try {
            const token = authService.getToken();
            const response = await fetch(`${config.api.baseUrl}/auth/send-verification-otp`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Verification code sent to your email!');
                setShowVerifyEmail(true);
                setTimeout(() => setMessage(''), 5000);
            } else {
                setMessage(data.message || 'Failed to send verification code');
            }
        } catch (error) {
            setMessage('An error occurred while sending verification code');
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setMessage('Please enter a valid 6-digit verification code.');
            return;
        }

        setIsVerifying(true);
        try {
            const response = await fetch(`${config.api.baseUrl}/auth/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Email verified successfully!');
                setShowVerifyEmail(false);
                setOtp('');
                // Reload user profile to update verification status
                loadUserProfile();
                setTimeout(() => setMessage(''), 5000);
            } else {
                setMessage(data.message || 'Email verification failed');
            }
        } catch (error) {
            setMessage('An error occurred during email verification');
        } finally {
            setIsVerifying(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#122620] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D6AD60]"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#122620]">
            {/* Header */}
            <div className="bg-white/5 backdrop-blur-sm border-b border-[#D6AD60]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center space-x-3">
                            <img src="/logoFinalSvg.svg" alt="MG Constructions" className="h-12 w-auto" />
                            <span className="text-[#D6AD60] font-source-serif text-xl">Home</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-4 py-2 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-300 font-montserrat text-sm tracking-wide"
                        >
                            <FaSignOutAlt className="inline mr-1" />Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* User Info Header */}
                <div className="bg-white/5 backdrop-blur-sm border border-[#D6AD60]/20 rounded-none p-6 mb-8">
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-[#D6AD60] rounded-full flex items-center justify-center text-[#122620] font-source-serif text-2xl font-bold">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                        </div>
                        <div>
                            <h1 className="text-2xl font-source-serif text-[#D6AD60] mb-2">
                                {user.firstName} {user.lastName}
                            </h1>
                            <p className="text-[#D6AD60]/80 font-montserrat text-sm">{user.email}</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <span className={`px-2 py-1 text-xs font-montserrat ${user.isEmailVerified
                                    ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                                    }`}>
                                    {user.isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
                                </span>
                                <span className="px-2 py-1 text-xs font-montserrat bg-[#D6AD60]/20 text-[#D6AD60] border border-[#D6AD60]/30">
                                    {user.role}
                                </span>
                                {!user.isEmailVerified && (
                                    <button
                                        onClick={handleSendVerificationOtp}
                                        disabled={isSendingOtp}
                                        className="px-3 py-1 text-xs font-montserrat bg-[#D6AD60] text-[#122620] hover:bg-[#B68D40] transition-all duration-300 disabled:opacity-50"
                                    >
                                        {isSendingOtp ? 'Sending...' : 'Verify Email'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message */}
                {message && (
                    <div className={`mb-6 p-4 border ${message.includes('successfully')
                        ? 'bg-green-500/10 border-green-400/30 text-green-400'
                        : 'bg-red-500/10 border-red-400/30 text-red-400'
                        } font-montserrat text-sm`}>
                        {message}
                    </div>
                )}

                {/* Navigation Tabs */}
                <div className="flex space-x-1 mb-8">
                    {[
                        { id: 'profile', label: 'Profile' },
                        { id: 'favorites', label: 'Favorite Properties' },
                        // { id: 'contacts', label: 'Contact Forms' },
                        // { id: 'visits', label: 'Scheduled Visits' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 font-montserrat text-sm tracking-wide transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-[#D6AD60] text-[#122620]'
                                : 'bg-white/5 text-[#D6AD60] hover:bg-white/10'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="bg-white/5 backdrop-blur-sm border border-[#D6AD60]/20 rounded-none p-8">
                    {activeTab === 'profile' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-source-serif text-[#D6AD60]">Profile Information</h2>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-4 py-2 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-300 font-montserrat text-sm tracking-wide"
                                >
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </button>
                            </div>

                            {isEditing ? (
                                <form onSubmit={handleUpdateProfile} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                value={editForm.firstName}
                                                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/10 border border-[#D6AD60]/30 text-white placeholder-[#D6AD60]/50 font-montserrat text-sm focus:outline-none focus:border-[#D6AD60] focus:bg-white/15 transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                value={editForm.lastName}
                                                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/10 border border-[#D6AD60]/30 text-white placeholder-[#D6AD60]/50 font-montserrat text-sm focus:outline-none focus:border-[#D6AD60] focus:bg-white/15 transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                value={editForm.phone}
                                                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/10 border border-[#D6AD60]/30 text-white placeholder-[#D6AD60]/50 font-montserrat text-sm focus:outline-none focus:border-[#D6AD60] focus:bg-white/15 transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                value={editForm.address}
                                                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/10 border border-[#D6AD60]/30 text-white placeholder-[#D6AD60]/50 font-montserrat text-sm focus:outline-none focus:border-[#D6AD60] focus:bg-white/15 transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                value={editForm.city}
                                                onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/10 border border-[#D6AD60]/30 text-white placeholder-[#D6AD60]/50 font-montserrat text-sm focus:outline-none focus:border-[#D6AD60] focus:bg-white/15 transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                value={editForm.state}
                                                onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/10 border border-[#D6AD60]/30 text-white placeholder-[#D6AD60]/50 font-montserrat text-sm focus:outline-none focus:border-[#D6AD60] focus:bg-white/15 transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                                ZIP Code
                                            </label>
                                            <input
                                                type="text"
                                                value={editForm.zipCode}
                                                onChange={(e) => setEditForm({ ...editForm, zipCode: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/10 border border-[#D6AD60]/30 text-white placeholder-[#D6AD60]/50 font-montserrat text-sm focus:outline-none focus:border-[#D6AD60] focus:bg-white/15 transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                value={editForm.country}
                                                onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/10 border border-[#D6AD60]/30 text-white placeholder-[#D6AD60]/50 font-montserrat text-sm focus:outline-none focus:border-[#D6AD60] focus:bg-white/15 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="bg-transparent border-2 border-[#D6AD60]/50 text-[#D6AD60]/50 px-6 py-2 rounded-none font-montserrat text-sm tracking-wide"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isUpdating}
                                            className="bg-[#D6AD60] text-[#122620] px-6 py-2 rounded-none hover:bg-[#B68D40] transition-all duration-300 font-montserrat text-sm tracking-wide disabled:opacity-50"
                                        >
                                            {isUpdating ? 'Updating...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                            First Name
                                        </label>
                                        <p className="text-white font-montserrat">{user.firstName}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                            Last Name
                                        </label>
                                        <p className="text-white font-montserrat">{user.lastName}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                            Email
                                        </label>
                                        <p className="text-white font-montserrat">{user.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                            Phone
                                        </label>
                                        <p className="text-white font-montserrat">{user.phone || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                            Address
                                        </label>
                                        <p className="text-white font-montserrat">{user.address || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                            City
                                        </label>
                                        <p className="text-white font-montserrat">{user.city || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                            State
                                        </label>
                                        <p className="text-white font-montserrat">{user.state || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                            ZIP Code
                                        </label>
                                        <p className="text-white font-montserrat">{user.zipCode || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                            Country
                                        </label>
                                        <p className="text-white font-montserrat">{user.country || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                            Member Since
                                        </label>
                                        <p className="text-white font-montserrat">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                            Last Login
                                        </label>
                                        <p className="text-white font-montserrat">
                                            {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'favorites' && (
                        <div>
                            <h2 className="text-xl font-source-serif text-[#D6AD60] mb-6">Favorite Properties</h2>
                            {user.favoriteProperties && user.favoriteProperties.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {user.favoriteProperties.map((property) => (
                                        <div key={property.id} className="bg-white/5 border border-[#D6AD60]/20 p-4">
                                            <div className="aspect-w-16 aspect-h-9 mb-4">
                                                {property.images && property.images.length > 0 ? (
                                                    <img
                                                        src={property.images[0].url}
                                                        alt={property.title}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-48 bg-[#D6AD60]/20 flex items-center justify-center">
                                                        <span className="text-[#D6AD60]/50">No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-lg font-source-serif text-[#D6AD60] mb-2">{property.title}</h3>
                                            <p className="text-white font-montserrat text-sm mb-2"> ₹ {property.price.toLocaleString()}</p>
                                            <p className="text-[#D6AD60]/80 font-montserrat text-sm mb-4">
                                                {property.bedrooms} beds • {property.bathrooms} baths • {property.type}
                                            </p>
                                            <Link
                                                to={`/propertyDet?id=${property.id}`}
                                                className="block w-full bg-[#D6AD60] text-[#122620] px-4 py-2 text-center rounded-none hover:bg-[#B68D40] transition-all duration-300 font-montserrat text-sm tracking-wide"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-[#D6AD60]/60 font-montserrat mb-4">No favorite properties yet</p>
                                    <Link
                                        to="/properties"
                                        className="bg-[#D6AD60] text-[#122620] px-6 py-3 rounded-none hover:bg-[#B68D40] transition-all duration-300 font-montserrat text-sm tracking-wide"
                                    >
                                        Browse Properties
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'contacts' && (
                        <div>
                            <h2 className="text-xl font-source-serif text-[#D6AD60] mb-6">Contact Forms</h2>
                            {user.contactForms && user.contactForms.length > 0 ? (
                                <div className="space-y-4">
                                    {user.contactForms.map((contact) => (
                                        <div key={contact.id} className="bg-white/5 border border-[#D6AD60]/20 p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-source-serif text-[#D6AD60]">{contact.subject}</h3>
                                                <span className={`px-2 py-1 text-xs font-montserrat ${contact.status === 'new' ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' :
                                                    contact.status === 'read' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30' :
                                                        contact.status === 'responded' ? 'bg-green-500/20 text-green-400 border border-green-400/30' :
                                                            'bg-gray-500/20 text-gray-400 border border-gray-400/30'
                                                    }`}>
                                                    {contact.status}
                                                </span>
                                            </div>
                                            <p className="text-white font-montserrat text-sm mb-2">{contact.message}</p>
                                            <p className="text-[#D6AD60]/60 font-montserrat text-xs">
                                                {new Date(contact.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-[#D6AD60]/60 font-montserrat">No contact forms submitted yet</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'visits' && (
                        <div>
                            <h2 className="text-xl font-source-serif text-[#D6AD60] mb-6">Scheduled Visits</h2>
                            {user.scheduleVisits && user.scheduleVisits.length > 0 ? (
                                <div className="space-y-4">
                                    {user.scheduleVisits.map((visit) => (
                                        <div key={visit.id} className="bg-white/5 border border-[#D6AD60]/20 p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-source-serif text-[#D6AD60]">
                                                    {visit.propertyTitle || 'Property Visit'}
                                                </h3>
                                                <span className={`px-2 py-1 text-xs font-montserrat ${visit.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30' :
                                                    visit.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border border-green-400/30' :
                                                        visit.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' :
                                                            'bg-red-500/20 text-red-400 border border-red-400/30'
                                                    }`}>
                                                    {visit.status}
                                                </span>
                                            </div>
                                            <p className="text-white font-montserrat text-sm mb-2">
                                                {new Date(visit.preferredDate).toLocaleDateString()} at {visit.preferredTime}
                                            </p>
                                            {visit.message && (
                                                <p className="text-[#D6AD60]/80 font-montserrat text-sm mb-2">{visit.message}</p>
                                            )}
                                            <p className="text-[#D6AD60]/60 font-montserrat text-xs">
                                                {new Date(visit.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-[#D6AD60]/60 font-montserrat">No scheduled visits yet</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Email Verification Modal */}
            {showVerifyEmail && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#122620] border border-[#D6AD60]/20 p-8 max-w-md w-full mx-4">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-source-serif text-[#D6AD60] mb-2">Verify Your Email</h3>
                            <p className="text-[#D6AD60]/80 font-montserrat text-sm">
                                Enter the 6-digit verification code sent to your email
                            </p>
                        </div>

                        <form onSubmit={handleVerifyEmail} className="space-y-6">
                            <div>
                                <label htmlFor="otp" className="block text-sm font-montserrat font-medium text-[#D6AD60] mb-2">
                                    Verification Code
                                </label>
                                <input
                                    id="otp"
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="Enter 6-digit code"
                                    maxLength={6}
                                    className="w-full px-4 py-3 bg-white/10 border border-[#D6AD60]/30 text-white placeholder-[#D6AD60]/50 font-montserrat text-sm focus:outline-none focus:border-[#D6AD60] focus:bg-white/15 transition-all duration-300"
                                    autoComplete="one-time-code"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowVerifyEmail(false);
                                        setOtp('');
                                    }}
                                    className="flex-1 bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-4 py-3 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-300 font-montserrat text-sm tracking-wide"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isVerifying || otp.length !== 6}
                                    className="flex-1 bg-[#D6AD60] text-[#122620] px-4 py-3 rounded-none hover:bg-[#B68D40] transition-all duration-300 font-montserrat text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isVerifying ? 'Verifying...' : 'Verify Email'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage; 