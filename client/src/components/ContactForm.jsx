import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaFileAlt, FaComments } from 'react-icons/fa';
import config from '../../config.js';

const ContactForm = ({ isOpen, onClose, title = "Send Us a Message", subtitle = "We'd love to hear from you" }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(`${config.api.baseUrl}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });

            // Reset status after 5 seconds
            setTimeout(() => {
                setSubmitStatus(null);
                if (onClose) onClose(); // Only call onClose if it exists
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting && onClose) {
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setSubmitStatus(null);
            onClose();
        }
    };

    // If isOpen is explicitly false, don't render (modal mode)
    if (isOpen === false) return null;

    // Form content
    const formContent = (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`bg-[#1A332C] rounded-xl p-8 shadow-xl border border-[#D6AD60]/20 ${isOpen ? 'w-full max-w-2xl max-h-[90vh] overflow-y-auto' : 'w-full'}`}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                        {title}
                    </h3>
                    <p className="text-[#D6AD60] text-sm">
                        {subtitle}
                    </p>
                </div>
                {isOpen && onClose && (
                    <button
                        onClick={handleClose}
                        disabled={isSubmitting}
                        className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <FaTimes size={24} />
                    </button>
                )}
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500 text-white p-4 rounded-lg text-center mb-6"
                >
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                </motion.div>
            )}

            {submitStatus === 'error' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500 text-white p-4 rounded-lg text-center mb-6"
                >
                    Sorry! There was an error sending your message. Please try again.
                </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-white mb-2 font-medium flex items-center">
                            <FaUser className="mr-2 text-[#D6AD60]" />
                            Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 bg-[#122620] border border-[#D6AD60]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#D6AD60] focus:outline-none transition-colors disabled:opacity-50"
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2 font-medium flex items-center">
                            <FaEnvelope className="mr-2 text-[#D6AD60]" />
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 bg-[#122620] border border-[#D6AD60]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#D6AD60] focus:outline-none transition-colors disabled:opacity-50"
                            placeholder="your.email@example.com"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-white mb-2 font-medium flex items-center">
                            <FaPhone className="mr-2 text-[#D6AD60]" />
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 bg-[#122620] border border-[#D6AD60]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#D6AD60] focus:outline-none transition-colors disabled:opacity-50"
                            placeholder="+91 9748853901"
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2 font-medium flex items-center">
                            <FaFileAlt className="mr-2 text-[#D6AD60]" />
                            Subject *
                        </label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 bg-[#122620] border border-[#D6AD60]/30 rounded-lg text-white focus:border-[#D6AD60] focus:outline-none transition-colors disabled:opacity-50"
                        >
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="property">Property Information</option>
                            <option value="viewing">Schedule Viewing</option>
                            <option value="support">Customer Support</option>
                            <option value="partnership">Partnership</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-white mb-2 font-medium flex items-center">
                        <FaComments className="mr-2 text-[#D6AD60]" />
                        Message *
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        rows="6"
                        className="w-full px-4 py-3 bg-[#122620] border border-[#D6AD60]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#D6AD60] focus:outline-none transition-colors resize-none disabled:opacity-50"
                        placeholder="Tell us how we can help you..."
                    ></textarea>
                </div>
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#D6AD60] text-[#122620] font-bold py-4 px-8 rounded-lg hover:bg-[#E5BE90] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
            </form>
        </motion.div>
    );

    // If isOpen is true, render as modal
    if (isOpen) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                {formContent}
            </div>
        );
    }

    // Otherwise render as inline form
    return formContent;
};

export default ContactForm; 