import { useState } from 'react';

const useContactForm = (defaultTitle = "Send Us a Message", defaultSubtitle = "We'd love to hear from you") => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(defaultTitle);
    const [subtitle, setSubtitle] = useState(defaultSubtitle);

    const openContactForm = (customTitle, customSubtitle) => {
        if (customTitle) setTitle(customTitle);
        if (customSubtitle) setSubtitle(customSubtitle);
        setIsOpen(true);
    };

    const closeContactForm = () => {
        setIsOpen(false);
        // Reset to defaults after closing
        setTitle(defaultTitle);
        setSubtitle(defaultSubtitle);
    };

    return {
        isOpen,
        title,
        subtitle,
        openContactForm,
        closeContactForm
    };
};

export default useContactForm; 