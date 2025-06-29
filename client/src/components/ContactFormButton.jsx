import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import ContactForm from './ContactForm';
import useContactForm from '../hooks/useContactForm';

const ContactFormButton = ({
    title = "Contact Us",
    subtitle = "Get in touch with our team",
    buttonText = "Contact Us",
    buttonVariant = "primary", // "primary", "secondary", "outline"
    className = "",
    icon = true
}) => {
    const { isOpen, title: formTitle, subtitle: formSubtitle, openContactForm, closeContactForm } = useContactForm(title, subtitle);

    const getButtonClasses = () => {
        const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2";

        switch (buttonVariant) {
            case "secondary":
                return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700 ${className}`;
            case "outline":
                return `${baseClasses} bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] hover:bg-[#D6AD60] hover:text-[#122620] ${className}`;
            default: // primary
                return `${baseClasses} bg-[#D6AD60] text-[#122620] hover:bg-[#E5BE90] shadow-lg ${className}`;
        }
    };

    return (
        <>
            <motion.button
                onClick={() => openContactForm()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={getButtonClasses()}
            >
                {icon && <FaEnvelope className="text-sm" />}
                {buttonText}
            </motion.button>

            <ContactForm
                isOpen={isOpen}
                onClose={closeContactForm}
                title={formTitle}
                subtitle={formSubtitle}
            />
        </>
    );
};

export default ContactFormButton; 