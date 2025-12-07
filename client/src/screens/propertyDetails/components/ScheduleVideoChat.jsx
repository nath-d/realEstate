import React, { useState } from 'react';
import { FaTimes, FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaVideo } from 'react-icons/fa';
import config from '../../../../config.js';

const ScheduleVideoChat = ({ property, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: '',
        preferredContact: 'email',
        platform: 'zoom'
    });

    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimeSlots] = useState([
        '09:00 AM', '10:00 AM', '11:00 AM',
        '01:00 PM', '02:00 PM', '03:00 PM',
        '04:00 PM', '05:00 PM'
    ]);

    const [platforms] = useState([
        { value: 'zoom', label: 'Zoom' },
        { value: 'google-meet', label: 'Google Meet' },
        { value: 'microsoft-teams', label: 'Microsoft Teams' },
        { value: 'whatsapp', label: 'WhatsApp Video Call' },
        { value: 'facetime', label: 'FaceTime' }
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert 12-hour time (e.g., "10:00 AM") to 24-hour format (e.g., "10:00")
        function to24Hour(time12h) {
            if (!time12h) return '';
            const [time, modifier] = time12h.split(' ');
            let [hours, minutes] = time.split(':');
            if (modifier === 'PM' && hours !== '12') hours = String(Number(hours) + 12);
            if (modifier === 'AM' && hours === '12') hours = '00';
            return `${hours.padStart(2, '0')}:${minutes}`;
        }

        // Build ISO string for preferredDate
        const isoDateTime = formData.date && formData.time
            ? `${formData.date}T${to24Hour(formData.time)}:00Z`
            : '';

        try {
            const scheduleData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                preferredDate: isoDateTime,
                preferredTime: formData.time,
                message: formData.message,
                preferredContact: formData.preferredContact,
                platform: formData.platform,
                propertyTitle: property.title,
                propertyId: property.id
            };

            // Debug: log the data being sent
            console.log('Submitting video chat scheduleData:', scheduleData);

            const response = await fetch(`${config.api.baseUrl}/schedule-video-chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scheduleData),
            });

            if (!response.ok) {
                // Try to log the error response body
                const errorText = await response.text();
                console.error('Backend error response:', errorText);
                throw new Error('Failed to schedule video chat');
            }

            // Show success message or handle success
            alert('Video chat scheduled successfully! We will contact you soon with meeting details.');
            onClose();
        } catch (error) {
            console.error('Error scheduling video chat:', error);
            alert('Failed to schedule video chat. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto">
            <div className="bg-[#122620] rounded-2xl p-4 sm:p-6 w-full max-w-2xl relative border border-[#D6AD60]/20 my-4 sm:my-auto max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <FaTimes size={24} />
                </button>

                <h2 className="font-source-serif tracking-wide text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#D6AD60] flex items-center">
                    <FaVideo className="mr-2 sm:mr-3 text-lg sm:text-xl" />
                    Schedule Video Chat
                </h2>
                <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                    Schedule a virtual tour and consultation for {property.title}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                                <FaUser className="inline mr-2" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 text-white text-sm sm:text-base"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                                <FaEnvelope className="inline mr-2" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 text-white text-sm sm:text-base"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                                <FaPhone className="inline mr-2" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 text-white text-sm sm:text-base"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                                Preferred Contact Method
                            </label>
                            <select
                                name="preferredContact"
                                value={formData.preferredContact}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 text-white text-sm sm:text-base"
                            >
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                            </select>
                        </div>
                    </div>

                    {/* Date and Time Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                                <FaCalendarAlt className="inline mr-2" />
                                Preferred Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 text-white text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                                <FaClock className="inline mr-2" />
                                Preferred Time
                            </label>
                            <select
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 text-white text-sm sm:text-base"
                            >
                                <option value="">Select a time</option>
                                {availableTimeSlots.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Video Platform Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            <FaVideo className="inline mr-2" />
                            Preferred Video Platform
                        </label>
                        <select
                            name="platform"
                            value={formData.platform}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                        >
                            {platforms.map(platform => (
                                <option key={platform.value} value={platform.value}>
                                    {platform.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Additional Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Additional Notes
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                            placeholder="What specific aspects of the property are you most interested in discussing?"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row sm:justify-end">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-[#D6AD60] text-[#122620] rounded-lg font-semibold hover:bg-[#C19B2E] transition-colors flex items-center justify-center text-sm sm:text-base"
                        >
                            <FaVideo className="mr-2" />
                            Schedule Video Chat
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleVideoChat;

