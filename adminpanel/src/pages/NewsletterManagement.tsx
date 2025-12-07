import React, { useState, useEffect } from 'react';
import config from '../../config';

const API_BASE = config.api.baseUrl;

interface Template {
    id: string;
    name: string;
    description: string;
    icon: string;
    subject: string;
    content: {
        headline: string;
        intro: string;
        mainMessage: string;
        ctaText: string;
        ctaUrl: string;
    };
}

const EMAIL_TEMPLATES: Template[] = [
    {
        id: 'monthly-update',
        name: 'Monthly Property Update',
        description: 'Share latest property listings and market insights with subscribers',
        icon: '📰',
        subject: 'Your Monthly Property Update from MG Constructions & Pacific Realty',
        content: {
            headline: 'New Properties This Month',
            intro: 'Discover amazing new properties and get the latest market insights.',
            mainMessage: 'We\'ve curated our best properties for you this month. From luxury apartments to family homes, find your perfect match below.',
            ctaText: 'Browse All Properties',
            ctaUrl: `${config.client.baseUrl}/properties`
        }
    },
    {
        id: 'new-listing',
        name: 'New Property Alert',
        description: 'Announce exciting new property listings to your subscribers',
        icon: '🏠',
        subject: 'New Property Just Listed - Don\'t Miss Out!',
        content: {
            headline: 'Exclusive New Listing Alert',
            intro: 'Be the first to explore this amazing new property in your area.',
            mainMessage: 'We\'re excited to share this exclusive new listing with you. Don\'t miss out on this opportunity - properties like this don\'t stay on the market long!',
            ctaText: 'View Property Details',
            ctaUrl: `${config.client.baseUrl}/properties`
        }
    },
    {
        id: 'market-report',
        name: 'Market Insights',
        description: 'Share market trends and investment opportunities',
        icon: '📊',
        subject: 'Real Estate Market Update & Investment Tips',
        content: {
            headline: 'Market Insights & Trends',
            intro: 'Stay informed with the latest real estate market analysis.',
            mainMessage: 'Market trends show strong growth in residential properties. Now might be the perfect time to invest or sell.',
            ctaText: 'Read Full Report',
            ctaUrl: `${config.client.baseUrl}/blog`
        }
    },
    {
        id: 'custom',
        name: 'Custom Newsletter',
        description: 'Create your own personalized newsletter content',
        icon: '✨',
        subject: 'Newsletter from MG Constructions & Pacific Realty',
        content: {
            headline: 'Your Custom Newsletter',
            intro: 'Share your personalized message with subscribers.',
            mainMessage: 'Write your custom message here...',
            ctaText: 'Learn More',
            ctaUrl: config.client.baseUrl
        }
    }
];

export default function NewsletterManagement() {
    // Navigation state
    const [activeTab, setActiveTab] = useState<'compose' | 'subscribers' | 'history'>('compose');

    // Newsletter composition
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [emailSubject, setEmailSubject] = useState('');
    const [emailContent, setEmailContent] = useState({
        headline: '',
        intro: '',
        mainMessage: '',
        ctaText: 'Learn More',
        ctaUrl: config.client.baseUrl
    });
    const [attachments, setAttachments] = useState<File[]>([]);

    // Property selection for newsletters
    const [selectedProperties, setSelectedProperties] = useState<any[]>([]);
    const [allProperties, setAllProperties] = useState<any[]>([]);
    const [showPropertySelector, setShowPropertySelector] = useState(false);
    const [propertyLoading, setPropertyLoading] = useState(false);

    // UI states
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [showPreview, setShowPreview] = useState(false);

    // Load subscribers on component mount
    useEffect(() => {
        fetchSubscribers();
    }, []);

    // Helper functions
    function getAdminKey() {
        return config.admin.apiKey;
    }

    async function fetchSubscribers() {
        try {
            setLoading(true);
            const adminKey = getAdminKey();
            const res = await fetch(`${API_BASE}/newsletter/subscribers`, {
                headers: { 'x-admin-key': adminKey },
            });
            const data = await res.json();
            if (res.ok && Array.isArray(data)) {
                setSubscribers(data);
            }
        } catch (error) {
            console.error('Error fetching subscribers:', error);
        } finally {
            setLoading(false);
        }
    }

    function selectTemplate(template: Template) {
        setSelectedTemplate(template);
        setEmailSubject(template.subject);
        setEmailContent(template.content);
        setMessage(`✅ "${template.name}" template loaded! Customize the content below and add specific properties to showcase.`);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setAttachments(files);
    }

    async function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve((reader.result as string).split(',')[1] || '');
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async function serializeFiles(files: File[]) {
        const out: { filename: string; bufferBase64: string; contentType?: string }[] = [];
        for (const file of files) {
            const base64 = await fileToBase64(file);
            out.push({ filename: file.name, bufferBase64: base64, contentType: file.type });
        }
        return out;
    }

    // Property selection functions
    async function loadProperties() {
        setPropertyLoading(true);
        try {
            const res = await fetch(`${API_BASE}/properties`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setAllProperties(data);
            }
        } catch (error) {
            console.error('Error loading properties:', error);
            setMessage('❌ Failed to load properties from database');
        } finally {
            setPropertyLoading(false);
        }
    }

    function addPropertyToNewsletter(property: any) {
        const clientUrl = config.client.baseUrl;
        const propertyData = {
            id: property.id,
            title: property.title || 'Untitled Property',
            location: `${property.location?.city || ''}, ${property.location?.state || ''}`,
            bedrooms: property.bedrooms || 0,
            bathrooms: property.bathrooms || 0,
            price: property.price ? `₹${property.price.toLocaleString()}` : 'Price on request',
            imageUrl: property.images?.[0]?.url || '',
            detailsUrl: `${clientUrl}/propertyDet?id=${property.id}`,
            description: property.description || ''
        };

        setSelectedProperties([...selectedProperties, propertyData]);
        setShowPropertySelector(false);
        setMessage(`✅ Added "${propertyData.title}" to newsletter`);
    }

    function removePropertyFromNewsletter(index: number) {
        const newProperties = selectedProperties.filter((_, i) => i !== index);
        setSelectedProperties(newProperties);
        setMessage('🗑️ Property removed from newsletter');
    }

    function openPropertySelector() {
        setShowPropertySelector(true);
        if (allProperties.length === 0) {
            loadProperties();
        }
    }

    function generateEmailHtml() {
        const brandName = 'MG Constructions & Pacific Realty';
        const primaryColor = '#122620';
        const accentColor = '#D6AD60';
        const footerAddress = '285, Gopal Misra Road, Behala, Kolkata 700034';

        // Generate property showcase section
        const propertyShowcase = selectedProperties.length > 0 ? `
                <!-- Featured Properties Section -->
                <div style="margin: 32px 0;">
                  <div style="font:700 20px Arial, sans-serif; color:${primaryColor}; margin-bottom: 20px; text-align: center;">🏠 Featured Properties</div>
                  ${selectedProperties.map(property => `
                    <div style="border: 1px solid #e0e0e0; border-radius: 12px; margin: 16px 0; padding: 20px; background: #ffffff;">
                      <div style="display: table; width: 100%;">
                        ${property.imageUrl ? `
                        <div style="display: table-cell; width: 200px; vertical-align: top; padding-right: 20px;">
                          <img src="${property.imageUrl}" alt="${property.title}" style="width: 200px; height: 150px; object-fit: cover; border-radius: 8px; display: block;" />
                        </div>` : ''}
                        <div style="display: table-cell; vertical-align: top;">
                          <div style="font:700 18px Arial, sans-serif; color:${primaryColor}; margin-bottom: 8px;">${property.title}</div>
                          <div style="font:400 14px Arial, sans-serif; color:#666; margin-bottom: 4px;">📍 ${property.location}</div>
                          <div style="font:400 14px Arial, sans-serif; color:#666; margin-bottom: 8px;">
                            🛏️ ${property.bedrooms} Bedrooms • 🚿 ${property.bathrooms} Bathrooms
                        </div>
                          <div style="font:700 16px Arial, sans-serif; color:${primaryColor}; margin-bottom: 12px;">${property.price}</div>
                          ${property.description ? `<div style="font:400 13px Arial, sans-serif; color:#555; line-height: 1.5; margin-bottom: 12px;">${property.description.substring(0, 150)}${property.description.length > 150 ? '...' : ''}</div>` : ''}
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="background:${accentColor}; border-radius:6px;">
                                <a href="${property.detailsUrl}" style="display:inline-block; padding:12px 20px; font:700 14px Arial, sans-serif; color:${primaryColor}; text-decoration:none;">View Details →</a>
                              </td>
                            </tr>
                          </table>
                        </div>
                        </div>
                    </div>
                  `).join('')}
                </div>
        ` : '';

        return `<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${emailContent.headline}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f6f8; font-family: Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f5f6f8;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td style="padding:24px 32px; text-align:center; background: linear-gradient(135deg, ${primaryColor} 0%, #1a3a2e 100%); border-radius: 8px 8px 0 0;">
                <div style="font:700 24px Arial, sans-serif; color:#ffffff; margin-bottom: 8px;">${brandName}</div>
                <div style="font:400 14px Arial, sans-serif; color:#ffffff; opacity: 0.9;">Real Estate Excellence</div>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="padding:32px;">
                <div style="font:700 28px Arial, sans-serif; color:${primaryColor}; line-height:1.3; margin-bottom: 16px; text-align: center;">${emailContent.headline}</div>
                
                <div style="font:400 16px Arial, sans-serif; color:#555; line-height:1.6; margin-bottom: 24px; text-align: center;">${emailContent.intro}</div>
                
                <div style="background: #f8f9fa; padding: 24px; border-radius: 8px; margin: 24px 0;">
                  <div style="font:400 16px Arial, sans-serif; color:#333; line-height:1.8;">${emailContent.mainMessage}</div>
                </div>

                ${propertyShowcase}

                <!-- Call to Action -->
                <div style="text-align: center; margin: 32px 0;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                    <tr>
                      <td style="background:${accentColor}; border-radius:8px; box-shadow: 0 4px 12px rgba(214, 173, 96, 0.3);">
                        <a href="${emailContent.ctaUrl}" style="display:inline-block; padding:16px 32px; font:700 16px Arial, sans-serif; color:${primaryColor}; text-decoration:none;">${emailContent.ctaText}</a>
                    </td>
                  </tr>
                </table>
                </div>

                <div style="border-top: 1px solid #eee; padding-top: 24px; margin-top: 32px;">
                  <div style="font:400 14px Arial, sans-serif; color:#777; text-align: center; line-height: 1.6;">
                    <div style="margin-bottom: 8px;">${footerAddress}</div>
                    <div style="margin-bottom: 8px;">
                      <a href="${config.client.baseUrl}" style="color:${primaryColor}; text-decoration:none;">${config.client.baseUrl}</a>
                    </div>
                    
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
    }

    async function sendNewsletter(e: React.FormEvent) {
        e.preventDefault();
        if (!emailSubject.trim() || !emailContent.headline.trim()) {
            setMessage('Please fill in the subject and headline fields.');
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const htmlContent = generateEmailHtml();
            const adminKey = getAdminKey();

            const res = await fetch(`${API_BASE}/newsletter/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-key': adminKey
                },
                body: JSON.stringify({
                    subject: emailSubject,
                    html: htmlContent,
                    attachments: await serializeFiles(attachments)
                }),
            });

            const data = await res.json();

            if (res.ok && data?.success) {
                setMessage(`✅ Newsletter sent successfully to ${data.count} subscribers!`);
                // Reset form
                setSelectedTemplate(null);
                setEmailSubject('');
                setEmailContent({
                    headline: '',
                    intro: '',
                    mainMessage: '',
                    ctaText: 'Learn More',
                    ctaUrl: config.client.baseUrl
                });
                setAttachments([]);
            } else {
                setMessage(`❌ Failed to send: ${data?.message || 'Unknown error'}`);
            }
        } catch (error) {
            setMessage('❌ Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    // Render the main interface
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">📧 Newsletter Manager</h1>
                    <p className="text-lg text-gray-600">Create and send beautiful newsletters to your subscribers with ease</p>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8">
                            <button
                                onClick={() => setActiveTab('compose')}
                                className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'compose'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                ✍️ Compose Newsletter
                            </button>
                            <button
                                onClick={() => setActiveTab('subscribers')}
                                className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'subscribers'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                👥 Subscribers ({subscribers.filter(s => s.isConfirmed && !s.unsubscribedAt).length})
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Message Display */}
                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.includes('✅') || message.includes('template loaded')
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                        }`}>
                        {message}
                    </div>
                )}

                {/* Content based on active tab */}
                {activeTab === 'compose' && (
                    <div className="space-y-8">
                        {/* Step 1: Choose Template */}
                        {!selectedTemplate && (
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h2 className="text-2xl font-semibold mb-4">📋 Step 1: Choose a Template</h2>
                                <p className="text-gray-600 mb-6">Select a pre-designed template to get started quickly:</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {EMAIL_TEMPLATES.map((template) => (
                                        <div
                                            key={template.id}
                                            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
                                            onClick={() => selectTemplate(template)}
                                        >
                                            <div className="text-3xl mb-2 text-center">{template.icon}</div>
                                            <h3 className="font-semibold text-center mb-2">{template.name}</h3>
                                            <p className="text-sm text-gray-600 text-center">{template.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Customize Content */}
                        {selectedTemplate && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column: Form */}
                                <div className="space-y-6">
                                    <div className="bg-white rounded-lg shadow-sm border p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-2xl font-semibold">✏️ Step 2: Customize Your Newsletter</h2>
                                            <button
                                                onClick={() => setSelectedTemplate(null)}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                Choose Different Template
                                            </button>
                                        </div>

                                        <form onSubmit={sendNewsletter} className="space-y-6">
                                            {/* Email Subject */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    📧 Email Subject Line
                                                </label>
                                                <input
                                                    type="text"
                                                    value={emailSubject}
                                                    onChange={(e) => setEmailSubject(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Enter a compelling subject line..."
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">This appears in subscribers' inbox</p>
                                            </div>

                                            {/* Headline */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    📰 Newsletter Headline
                                                </label>
                                                <input
                                                    type="text"
                                                    value={emailContent.headline}
                                                    onChange={(e) => setEmailContent({ ...emailContent, headline: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Main headline for your newsletter..."
                                                    required
                                                />
                                            </div>

                                            {/* Introduction */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    💬 Introduction Text
                                                </label>
                                                <textarea
                                                    value={emailContent.intro}
                                                    onChange={(e) => setEmailContent({ ...emailContent, intro: e.target.value })}
                                                    rows={2}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Brief introduction or summary..."
                                                />
                                            </div>

                                            {/* Main Message */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    📝 Main Message
                                                </label>
                                                <textarea
                                                    value={emailContent.mainMessage}
                                                    onChange={(e) => setEmailContent({ ...emailContent, mainMessage: e.target.value })}
                                                    rows={4}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Your main newsletter content..."
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">This is the main content of your newsletter</p>
                                            </div>

                                            {/* Property Selection Section */}
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        🏠 Featured Properties (Optional)
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={openPropertySelector}
                                                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 font-medium"
                                                    >
                                                        + Add Properties
                                                    </button>
                                                </div>

                                                {selectedProperties.length === 0 ? (
                                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                                        <div className="text-3xl mb-2">🏠</div>
                                                        <p className="text-gray-600 text-sm">No properties selected</p>
                                                        <p className="text-gray-500 text-xs">Click "Add Properties" to showcase specific listings in your newsletter</p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3">
                                                        {selectedProperties.map((property, index) => (
                                                            <div key={index} className="border rounded-lg p-4 bg-green-50">
                                                                <div className="flex items-start gap-3">
                                                                    {property.imageUrl && (
                                                                        <img
                                                                            src={property.imageUrl}
                                                                            alt={property.title}
                                                                            className="w-16 h-16 object-cover rounded-lg"
                                                                        />
                                                                    )}
                                                                    <div className="flex-1">
                                                                        <h4 className="font-semibold text-gray-900">{property.title}</h4>
                                                                        <p className="text-sm text-gray-600">📍 {property.location}</p>
                                                                        <p className="text-sm text-gray-600">
                                                                            🛏️ {property.bedrooms} bed • 🚿 {property.bathrooms} bath
                                                                        </p>
                                                                        <p className="text-sm font-semibold text-green-600">{property.price}</p>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removePropertyFromNewsletter(index)}
                                                                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                                    >
                                                                        ✕ Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <p className="text-xs text-gray-500 text-center">
                                                            {selectedProperties.length} propert{selectedProperties.length === 1 ? 'y' : 'ies'} will be featured in the newsletter
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Call to Action */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        🎯 Button Text
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={emailContent.ctaText}
                                                        onChange={(e) => setEmailContent({ ...emailContent, ctaText: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="e.g., View Properties"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        🔗 Button Link
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={emailContent.ctaUrl}
                                                        onChange={(e) => setEmailContent({ ...emailContent, ctaUrl: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="https://..."
                                                    />
                                                </div>
                                            </div>

                                            {/* Attachments */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    📎 Attachments (Optional)
                                                </label>
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*,application/pdf"
                                                    onChange={handleFileChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                {attachments.length > 0 && (
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        {attachments.length} file(s) selected: {attachments.map(f => f.name).join(', ')}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-4 pt-4 border-t">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPreview(!showPreview)}
                                                    className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
                                                >
                                                    {showPreview ? '👁️ Hide Preview' : '👁️ Show Preview'}
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
                                                >
                                                    {loading ? '📤 Sending...' : `📤 Send to ${subscribers.filter(s => s.isConfirmed && !s.unsubscribedAt).length} Subscribers`}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Right Column: Preview */}
                                <div className="lg:sticky lg:top-6">
                                    <div className="bg-white rounded-lg shadow-sm border p-6">
                                        <h3 className="text-xl font-semibold mb-4">👁️ Live Preview</h3>
                                        {showPreview ? (
                                            <div className="border rounded-md overflow-hidden">
                                                <iframe
                                                    title="Newsletter Preview"
                                                    srcDoc={generateEmailHtml()}
                                                    className="w-full h-96 border-0"
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 bg-gray-50 rounded-md">
                                                <div className="text-4xl mb-2">📧</div>
                                                <p className="text-gray-600">Click "Show Preview" to see how your newsletter will look</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Subscribers Tab */}
                {activeTab === 'subscribers' && (
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold">👥 Newsletter Subscribers</h2>
                                <button
                                    onClick={fetchSubscribers}
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
                                </button>
                            </div>
                            <p className="text-gray-600 mt-2">
                                Total: {subscribers.length} |
                                Active: {subscribers.filter(s => s.isConfirmed && !s.unsubscribedAt).length} |
                                Unsubscribed: {subscribers.filter(s => s.unsubscribedAt).length}
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {subscribers.map((subscriber, index) => (
                                        <tr key={subscriber.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {subscriber.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {subscriber.unsubscribedAt ? (
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                                        ❌ Unsubscribed
                                                    </span>
                                                ) : subscriber.isConfirmed ? (
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                        ✅ Active
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        ⏳ Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(subscriber.subscribedAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {subscribers.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-4xl mb-4">📭</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No subscribers yet</h3>
                                <p className="text-gray-600">Subscribers will appear here when people sign up for your newsletter</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Property Selector Modal */}
                {showPropertySelector && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
                            <div className="p-6 border-b">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold">🏠 Select Properties for Newsletter</h3>
                                    <button
                                        onClick={() => setShowPropertySelector(false)}
                                        className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <p className="text-gray-600 mt-2">Choose properties to feature in your newsletter</p>
                            </div>

                            <div className="p-6 overflow-y-auto max-h-96">
                                {propertyLoading ? (
                                    <div className="text-center py-8">
                                        <div className="text-2xl mb-2">🔄</div>
                                        <p className="text-gray-600">Loading properties...</p>
                                    </div>
                                ) : allProperties.length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-4">🏠</div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Properties Found</h3>
                                        <p className="text-gray-600">No properties are available in your database.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {allProperties.map((property) => {
                                            const isAlreadySelected = selectedProperties.some(sp => sp.id === property.id);
                                            return (
                                                <div key={property.id} className={`border rounded-lg p-4 ${isAlreadySelected ? 'bg-gray-100 border-gray-300' : 'hover:shadow-md cursor-pointer border-gray-200'}`}>
                                                    <div className="flex gap-3">
                                                        {property.images?.[0]?.url && (
                                                            <img
                                                                src={property.images[0].url}
                                                                alt={property.title}
                                                                className="w-20 h-16 object-cover rounded-lg"
                                                            />
                                                        )}
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-900 text-sm">{property.title || 'Untitled Property'}</h4>
                                                            <p className="text-xs text-gray-600 mb-1">
                                                                📍 {property.location?.city}, {property.location?.state}
                                                            </p>
                                                            <p className="text-xs text-gray-600 mb-2">
                                                                🛏️ {property.bedrooms || 0} bed • 🚿 {property.bathrooms || 0} bath
                                                            </p>
                                                            <p className="text-sm font-semibold text-blue-600">
                                                                {property.price ? `₹${property.price.toLocaleString()}` : 'Price on request'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 text-right">
                                                        {isAlreadySelected ? (
                                                            <span className="text-sm text-gray-500 font-medium">✅ Already Selected</span>
                                                        ) : (
                                                            <button
                                                                onClick={() => addPropertyToNewsletter(property)}
                                                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 font-medium"
                                                            >
                                                                + Add to Newsletter
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                        {selectedProperties.length} propert{selectedProperties.length === 1 ? 'y' : 'ies'} selected for newsletter
                                    </p>
                                    <button
                                        onClick={() => setShowPropertySelector(false)}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}