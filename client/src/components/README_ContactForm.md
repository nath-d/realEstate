# Reusable ContactForm Component

This document explains how to use the reusable ContactForm component that can be integrated anywhere in your real estate application.

## Overview

The ContactForm component is a modal-based form that allows users to submit contact inquiries. It's designed to be reusable across different pages and components.

## Components Available

1. **ContactForm** - The main modal form component
2. **ContactFormButton** - A pre-built button component that includes the form
3. **useContactForm** - A custom hook for managing form state

## Basic Usage

### Method 1: Direct Component Usage

```jsx
import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';

const MyPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsFormOpen(true)}>
                Open Contact Form
            </button>

            <ContactForm 
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title="Contact Us"
                subtitle="We'd love to hear from you"
            />
        </div>
    );
};
```

### Method 2: Using the Custom Hook

```jsx
import React from 'react';
import ContactForm from '../components/ContactForm';
import useContactForm from '../hooks/useContactForm';

const MyPage = () => {
    const { isOpen, title, subtitle, openContactForm, closeContactForm } = useContactForm();

    return (
        <div>
            <button onClick={() => openContactForm()}>
                Contact Us
            </button>

            <ContactForm 
                isOpen={isOpen}
                onClose={closeContactForm}
                title={title}
                subtitle={subtitle}
            />
        </div>
    );
};
```

### Method 3: Using the Pre-built Button Component

```jsx
import React from 'react';
import ContactFormButton from '../components/ContactFormButton';

const MyPage = () => {
    return (
        <div>
            {/* Basic usage */}
            <ContactFormButton />

            {/* Customized */}
            <ContactFormButton 
                title="Get Property Information"
                subtitle="Tell us about your dream home"
                buttonText="Get Info"
                buttonVariant="outline"
            />
        </div>
    );
};
```

## Props Reference

### ContactForm Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | - | Controls form visibility |
| `onClose` | function | - | Callback when form is closed |
| `title` | string | "Send Us a Message" | Form title |
| `subtitle` | string | "We'd love to hear from you" | Form subtitle |

### ContactFormButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "Contact Us" | Form title |
| `subtitle` | string | "Get in touch with our team" | Form subtitle |
| `buttonText` | string | "Contact Us" | Button text |
| `buttonVariant` | string | "primary" | Button style ("primary", "secondary", "outline") |
| `className` | string | "" | Additional CSS classes |
| `icon` | boolean | true | Show envelope icon |

### useContactForm Hook

Returns an object with:
- `isOpen`: boolean - Form visibility state
- `title`: string - Form title
- `subtitle`: string - Form subtitle
- `openContactForm(customTitle?, customSubtitle?)`: function - Opens the form
- `closeContactForm()`: function - Closes the form

## Examples

### Example 1: Property Details Page

```jsx
import React from 'react';
import ContactFormButton from '../components/ContactFormButton';

const PropertyDetails = ({ property }) => {
    return (
        <div>
            <h1>{property.title}</h1>
            <p>{property.description}</p>
            
            <ContactFormButton 
                title={`Inquire about ${property.title}`}
                subtitle="Get more information about this property"
                buttonText="Inquire Now"
                buttonVariant="primary"
            />
        </div>
    );
};
```

### Example 2: Navigation Bar

```jsx
import React from 'react';
import useContactForm from '../hooks/useContactForm';
import ContactForm from '../components/ContactForm';

const Navbar = () => {
    const { isOpen, openContactForm, closeContactForm } = useContactForm();

    return (
        <nav>
            <div className="nav-links">
                <a href="/">Home</a>
                <a href="/properties">Properties</a>
                <button onClick={() => openContactForm()}>
                    Contact
                </button>
            </div>

            <ContactForm 
                isOpen={isOpen}
                onClose={closeContactForm}
            />
        </nav>
    );
};
```

### Example 3: Footer Section

```jsx
import React from 'react';
import ContactFormButton from '../components/ContactFormButton';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="contact-section">
                    <h3>Ready to find your dream home?</h3>
                    <ContactFormButton 
                        title="Start Your Journey"
                        subtitle="Let's find the perfect property for you"
                        buttonText="Get Started"
                        buttonVariant="outline"
                        className="mt-4"
                    />
                </div>
            </div>
        </footer>
    );
};
```

## Form Fields

The ContactForm includes the following fields:

- **Name** (required) - User's full name
- **Email** (required) - User's email address
- **Phone** (optional) - User's phone number
- **Subject** (required) - Inquiry subject (dropdown with options)
- **Message** (required) - Detailed message

## Subject Options

The form includes these predefined subject options:
- General Inquiry
- Property Information
- Schedule Viewing
- Customer Support
- Partnership

## Styling

The component uses Tailwind CSS classes and follows the application's design system:
- Primary colors: `#122620` (dark green), `#D6AD60` (gold)
- Responsive design
- Smooth animations using Framer Motion
- Consistent with the real estate theme

## Backend Integration

The form submits to: `http://localhost:3000/contact`

The backend expects a POST request with the following JSON structure:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "general",
    "message": "I'm interested in learning more about your properties."
}
```

## Error Handling

The component includes:
- Form validation
- Loading states
- Success/error messages
- Automatic form reset after successful submission
- Graceful error handling with user feedback

## Accessibility

The component includes:
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast design

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Touch-friendly interface 