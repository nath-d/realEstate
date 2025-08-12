import React from 'react';
import NewsletterForm from './NewsletterForm';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-b from-[#1a3329] to-[#122620] text-white pt-20 pb-8 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c9a66b] via-[#e6c48a] to-[#c9a66b]"></div>
            {/* <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#c9a66b] rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-[#c9a66b] rounded-full"></div>
            </div> */}

            <div className="container mx-auto px-4 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#c9a66b] to-[#e6c48a] bg-clip-text text-transparent font-source-serif">
                            MG Pacific Estates
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            Your trusted partner in finding the perfect property. We specialize in luxury real estate and provide exceptional service to our clients.
                        </p>
                        <div className="flex space-x-6 mt-6">
                            <a href="#" className="transform hover:scale-110 transition-all duration-300 hover:text-[#c9a66b]">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="transform hover:scale-110 transition-all duration-300 hover:text-[#c9a66b]">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="transform hover:scale-110 transition-all duration-300 hover:text-[#c9a66b]">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className="transform hover:scale-110 transition-all duration-300 hover:text-[#c9a66b]">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-3xl font-semibold mb-6 text-[#c9a66b] font-source-serif">Quick Links</h3>
                        <ul className="space-y-4">
                            {['Home', 'Properties', 'About Us', 'Services', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-[#c9a66b] transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 bg-[#c9a66b] rounded-full mr-3 transform group-hover:scale-150 transition-transform"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-3xl font-semibold mb-6 text-[#c9a66b] font-source-serif">Contact Us</h3>
                        <ul className="space-y-6">
                            <li className="flex items-center space-x-4 group">
                                <div className="p-3 bg-[#122620] rounded-full group-hover:bg-[#c9a66b] transition-colors">
                                    <FaPhone className="text-[#c9a66b] group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-gray-300">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-4 group">
                                <div className="p-3 bg-[#122620] rounded-full group-hover:bg-[#c9a66b] transition-colors">
                                    <FaEnvelope className="text-[#c9a66b] group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-gray-300">info@projectestate.com</span>
                            </li>
                            <li className="flex items-start space-x-4 group">
                                <div className="p-3 bg-[#122620] rounded-full group-hover:bg-[#c9a66b] transition-colors mt-1">
                                    <FaMapMarkerAlt className="text-[#c9a66b] group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-gray-300">123 Luxury Avenue, Suite 100<br />New York, NY 10001</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-3xl font-semibold mb-6 text-[#c9a66b] font-source-serif">Newsletter</h3>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Subscribe to our newsletter for the latest property updates and market insights.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-16 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Project Estate. All rights reserved.
                        </p>
                        <div className="flex space-x-8 mt-4 md:mt-0">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="text-gray-400 hover:text-[#c9a66b] text-sm transition-colors"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 