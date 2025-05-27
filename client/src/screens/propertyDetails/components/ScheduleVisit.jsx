import React, { useState } from 'react';
import { FaTimes, FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

const ScheduleVisit = ({ property, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: '',
        preferredContact: 'email'
    });

    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimeSlots] = useState([
        '09:00 AM', '10:00 AM', '11:00 AM',
        '01:00 PM', '02:00 PM', '03:00 PM',
        '04:00 PM', '05:00 PM'
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Scheduling visit:', formData);
        onClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#122620] rounded-2xl p-6 w-full max-w-2xl relative border border-[#D6AD60]/20">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <FaTimes size={24} />
                </button>

                <h2 className="font-source-serif tracking-wide text-3xl font-bold mb-6 text-[#D6AD60]">Contact Us</h2>
                <p className="text-gray-400 mb-6">
                    Schedule a private viewing of {property.title}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                <FaUser className="inline mr-2" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                <FaPhone className="inline mr-2" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                <FaEnvelope className="inline mr-2" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Preferred Contact Method
                            </label>
                            <select
                                name="preferredContact"
                                value={formData.preferredContact}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                            >
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                            </select>
                        </div>
                    </div>

                    {/* Date and Time Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
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
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                <FaClock className="inline mr-2" />
                                Preferred Time
                            </label>
                            <select
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                            >
                                <option value="">Select a time</option>
                                {availableTimeSlots.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
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
                            placeholder="Any specific areas you'd like to focus on during the visit?"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-[#D6AD60] text-[#122620] rounded-lg font-semibold hover:bg-[#C19B2E] transition-colors"
                        >
                            Schedule Visit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleVisit; 