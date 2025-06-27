import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Navbar from '../homepage/components/Navbar';
import Footer from '../homepage/components/Footer';
import ContactMap from './components/ContactMap';
import './styles/fonts.css';

const ContactUsPage = () => {
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

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });

            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 2000);
    };

    const contactInfo = [
        {
            icon: <FaPhone className="text-3xl" />,
            title: "Phone",
            details: [
                "+1 (555) 123-4567",
                "+1 (555) 987-6543"
            ],
            color: "bg-blue-500"
        },
        {
            icon: <FaEnvelope className="text-3xl" />,
            title: "Email",
            details: [
                "info@mgpacificestates.com",
                "support@mgpacificestates.com"
            ],
            color: "bg-green-500"
        },
        {
            icon: <FaMapMarkerAlt className="text-3xl" />,
            title: "Office",
            details: [
                "123 Luxury Avenue, Suite 100",
                "New York, NY 10001"
            ],
            color: "bg-red-500"
        },
        {
            icon: <FaClock className="text-3xl" />,
            title: "Business Hours",
            details: [
                "Mon - Fri: 9:00 AM - 6:00 PM",
                "Sat: 10:00 AM - 4:00 PM"
            ],
            color: "bg-purple-500"
        }
    ];

    const officeLocation = {
        city: "New York",
        address: "123 Luxury Avenue, Suite 100",
        state: "NY 10001",
        phone: "+1 (555) 123-4567",
        email: "info@mgpacificestates.com",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    };

    const socialLinks = [
        { icon: <FaFacebook />, href: "#", label: "Facebook" },
        { icon: <FaTwitter />, href: "#", label: "Twitter" },
        { icon: <FaInstagram />, href: "#", label: "Instagram" },
        { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
        { icon: <FaWhatsapp />, href: "#", label: "WhatsApp" }
    ];

    return (
        <div className="min-h-screen bg-[#F4EBD0]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[70vh] bg-[#122620] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
                        filter: "brightness(0.3)"
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
                <div className="container mx-auto px-4 h-full flex items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center relative z-10"
                    >
                        <h1 className="heading-primary text-6xl font-bold text-white mb-6">
                            Contact Us
                        </h1>
                        <p className="accent-text text-2xl text-[#D6AD60] max-w-2xl mx-auto">
                            Get in touch with our team of real estate experts
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Information Cards */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="heading-primary text-4xl font-bold text-[#122620] mb-4">
                            Get In Touch
                        </h2>
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                            <p className="text-[#122620]/80">Multiple ways to reach us</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {info.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#122620] mb-4">{info.title}</h3>
                                <div className="space-y-2">
                                    {info.details.map((detail, idx) => (
                                        <p key={idx} className="text-[#122620]/70">{detail}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form and Office Section */}
            <section className="py-20 bg-[#122620]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="heading-primary text-4xl font-bold text-white mb-4">
                            Get In Touch
                        </h2>
                        <div className="flex justify-center items-center gap-4">
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                            <p className="text-[#D6AD60]">We'd love to hear from you</p>
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: 120 }}
                                transition={{ duration: 0.8 }}
                                className="h-0.5 bg-[#D6AD60]"
                            ></motion.span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-[#1A332C] rounded-xl p-8 shadow-xl border border-[#D6AD60]/20"
                        >
                            <h3 className="heading-primary text-2xl font-bold text-white mb-6">
                                Send Us a Message
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white mb-2 font-medium">Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#122620] border border-[#D6AD60]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#D6AD60] focus:outline-none transition-colors"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white mb-2 font-medium">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#122620] border border-[#D6AD60]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#D6AD60] focus:outline-none transition-colors"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white mb-2 font-medium">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-[#122620] border border-[#D6AD60]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#D6AD60] focus:outline-none transition-colors"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white mb-2 font-medium">Subject *</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-[#122620] border border-[#D6AD60]/30 rounded-lg text-white focus:border-[#D6AD60] focus:outline-none transition-colors"
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
                                    <label className="block text-white mb-2 font-medium">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 bg-[#122620] border border-[#D6AD60]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#D6AD60] focus:outline-none transition-colors resize-none"
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

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-green-500 text-white p-4 rounded-lg text-center"
                                    >
                                        Thank you! Your message has been sent successfully. We'll get back to you soon.
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>

                        {/* Office Info with Map */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="bg-[#1A332C] rounded-xl p-8 shadow-xl border border-[#D6AD60]/20">
                                <h3 className="heading-primary text-2xl font-bold text-white mb-6">
                                    Visit Our Office
                                </h3>

                                {/* Office Details */}
                                <div className="space-y-6 mb-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-[#D6AD60]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FaMapMarkerAlt className="text-[#D6AD60] text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-1">Main Office</h4>
                                            <p className="text-gray-300">{officeLocation.address}<br />{officeLocation.state}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-[#D6AD60]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FaClock className="text-[#D6AD60] text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-1">Business Hours</h4>
                                            <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-[#D6AD60]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FaPhone className="text-[#D6AD60] text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-1">Contact</h4>
                                            <p className="text-gray-300">{officeLocation.phone}<br />{officeLocation.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="bg-[#1A332C] rounded-xl p-4 shadow-xl border border-[#D6AD60]/20">
                                <ContactMap officeLocations={[officeLocation]} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Social Media Section */}
            <section className="py-20 bg-[#122620]">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-primary text-4xl font-bold text-white mb-6">
                            Connect With Us
                        </h2>
                        <p className="text-[#D6AD60] mb-8 max-w-2xl mx-auto">
                            Follow us on social media for the latest property updates, market insights, and exclusive offers.
                        </p>
                        <div className="flex justify-center space-x-6">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 bg-[#D6AD60] text-[#122620] rounded-full flex items-center justify-center text-2xl hover:bg-[#E5BE90] transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactUsPage; 