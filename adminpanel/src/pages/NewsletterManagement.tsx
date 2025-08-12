import React, { useState, useEffect } from 'react';
import { cloudinaryService } from '../services/cloudinaryService';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function NewsletterManagement() {
    const [subject, setSubject] = useState('');
    const [html, setHtml] = useState('');
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [builder, setBuilder] = useState({
        brandName: 'MG Pacific Estates',
        logoUrl: '',
        preheader: 'Latest updates from our real estate team',
        headline: 'Your Monthly Property Update',
        heroUrl: '',
        intro: 'Discover the latest listings, market insights, and investment opportunities tailored for you.',
        bodyHtml: '<p>Write your newsletter content here. You can include <strong>bold text</strong>, <em>italics</em>, and links.</p>',
        ctaText: 'Browse Properties',
        ctaUrl: (import.meta.env.VITE_FRONTEND_URL as string) || 'http://localhost:5173/properties',
        footerAddress: '123 Luxury Avenue, Suite 100, New York, NY 10001',
        footerWebsite: (import.meta.env.VITE_FRONTEND_URL as string) || 'http://localhost:5173',
        primaryColor: '#122620',
        accentColor: '#D6AD60',
    });

    // Non-technical blocks (no HTML needed)
    const [propertyPickerOpen, setPropertyPickerOpen] = useState(false);
    const [allProperties, setAllProperties] = useState<any[]>([]);
    const [featuredProps, setFeaturedProps] = useState<Array<{
        id?: number;
        imageUrl: string;
        title: string;
        city: string;
        region: string;
        bedrooms: string;
        bathrooms: string;
        price: string;
        ctaText: string;
        ctaUrl: string;
    }>>([]);
    const [insightsText, setInsightsText] = useState('');
    const [tipText, setTipText] = useState('');
    const [openHouses, setOpenHouses] = useState<Array<{ dateLabel: string; title: string; time: string }>>([]);

    function loadMgPacificTemplate() {
        const frontend = (import.meta.env.VITE_FRONTEND_URL as string) || 'http://localhost:5173';
        const cfg = {
            brandName: 'MG Pacific Estates',
            logoUrl: 'https://your-domain.com/assets/logo.png',
            preheader: 'Handpicked homes, market insights, and open house events this month.',
            headline: 'August Featured Homes',
            heroUrl: 'https://your-domain.com/assets/hero-august.jpg',
            intro: 'Explore our curated selection of premium properties, market insights, and open house events this month.',
            bodyHtml: `
<div style="font:700 18px Arial, sans-serif; color:#122620; margin:20px 0 12px 0;">Featured Properties</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:16px;">
  <tr>
    <td width="200" valign="top">
      <img src="https://via.placeholder.com/200x150" alt="Property 1" width="200" style="display:block; width:200px; height:auto; border-radius:6px;" />
    </td>
    <td valign="top" style="padding-left:16px;">
      <div style="font:700 16px Arial, sans-serif; color:#122620; margin:0 0 6px 0;">Modern Family Villa in Greenview Estate</div>
      <div style="font:400 13px Arial, sans-serif; color:#666; line-height:1.6; margin:0 0 10px 0;">📍 Bangalore, India<br />4 Bedrooms • 3 Bathrooms • ₹1.85 Cr</div>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="background:#D6AD60; border-radius:4px;"><a href="${frontend}/properties" style="display:inline-block; padding:10px 16px; font:700 13px Arial, sans-serif; color:#122620; text-decoration:none;">View Details →</a></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr><td colspan="2" height="12"></td></tr>
  <tr>
    <td width="200" valign="top">
      <img src="https://via.placeholder.com/200x150" alt="Property 2" width="200" style="display:block; width:200px; height:auto; border-radius:6px;" />
    </td>
    <td valign="top" style="padding-left:16px;">
      <div style="font:700 16px Arial, sans-serif; color:#122620; margin:0 0 6px 0;">Chic City Apartment with Skyline Views</div>
      <div style="font:400 13px Arial, sans-serif; color:#666; line-height:1.6; margin:0 0 10px 0;">📍 Mumbai, India<br />2 Bedrooms • 2 Bathrooms • ₹85 Lakh</div>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="background:#D6AD60; border-radius:4px;"><a href="${frontend}/properties" style="display:inline-block; padding:10px 16px; font:700 13px Arial, sans-serif; color:#122620; text-decoration:none;">View Details →</a></td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<div style="font:700 18px Arial, sans-serif; color:#122620; margin:20px 0 8px 0;">Market Insights</div>
<div style="font:400 14px Arial, sans-serif; color:#444; line-height:1.6;">Demand for mid-range homes is trending up, while luxury properties remain strong with discerning buyers. Considering selling? It may be an ideal time to list in select neighborhoods.</div>

<div style="font:700 18px Arial, sans-serif; color:#122620; margin:20px 0 8px 0;">Tip of the Month</div>
<div style="font:400 14px Arial, sans-serif; color:#444; line-height:1.6;">Boost curb appeal with fresh paint and tasteful landscaping—first impressions can increase perceived value.</div>

<div style="font:700 18px Arial, sans-serif; color:#122620; margin:20px 0 8px 0;">Upcoming Open Houses</div>
<ul style="padding-left:18px; margin:0; font:400 14px Arial, sans-serif; color:#444; line-height:1.8;">
  <li>📅 Aug 20 — Greenview Estate Villa Tour (11 AM – 4 PM)</li>
  <li>📅 Aug 24 — Mumbai City Apartment Showcase (10 AM – 2 PM)</li>
  </ul>
  <div style="margin-top:12px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td style="background:#D6AD60; border-radius:4px;"><a href="${frontend}/schedule-visit" style="display:inline-block; padding:10px 16px; font:700 13px Arial, sans-serif; color:#122620; text-decoration:none;">Reserve Your Spot →</a></td>
      </tr>
    </table>
  </div>
`,
            ctaText: 'Browse Properties',
            ctaUrl: `${frontend}/properties`,
            footerAddress: '123 Luxury Avenue, Suite 100, New York, NY 10001',
            footerWebsite: frontend,
            primaryColor: '#122620',
            accentColor: '#D6AD60',
        };

        const generated = generateEmailHtml(cfg);
        setBuilder(cfg);
        setHtml(generated);
        setSubject('MG Pacific Estates — August Featured Homes');
        setMessage('Loaded MG Pacific template. You can tweak fields or send as is.');
    }

    async function uploadLogo(file: File) {
        const res = await cloudinaryService.uploadImage(file);
        if (res && res.success && res.data && res.data.url) setBuilder({ ...builder, logoUrl: res.data.url });
    }

    async function uploadHero(file: File) {
        const res = await cloudinaryService.uploadImage(file);
        if (res && res.success && res.data && res.data.url) setBuilder({ ...builder, heroUrl: res.data.url });
    }

    async function uploadPropertyImage(idx: number, file: File) {
        const res = await cloudinaryService.uploadImage(file);
        if (res && res.success && res.data && res.data.url) {
            const next = featuredProps.slice();
            const item = next[idx];
            if (item) {
                item.imageUrl = res.data.url;
                next[idx] = item;
                setFeaturedProps(next);
            }
        }
    }

    function addFeaturedProperty() {
        setPropertyPickerOpen(true);
    }

    function removeFeaturedProperty(i: number) {
        const next = featuredProps.slice();
        next.splice(i, 1);
        setFeaturedProps(next);
    }

    function updateFeaturedProperty(i: number, field: string, value: string) {
        const next = featuredProps.slice();
        // @ts-ignore
        next[i][field] = value;
        setFeaturedProps(next);
    }

    async function openPropertySelector() {
        setPropertyPickerOpen(true);
        try {
            const res = await fetch(`${API_BASE}/properties`);
            const data = await res.json();
            if (Array.isArray(data)) setAllProperties(data);
        } catch (e) {
            // silently ignore
        }
    }

    function selectProperty(p: any) {
        const frontend = (import.meta.env.VITE_FRONTEND_URL as string) || 'http://localhost:5173';
        const city = p?.location?.city || '';
        const region = p?.location?.state || '';
        const imageUrl = p?.images?.[0]?.url || '';
        const bedrooms = String(p?.bedrooms ?? '');
        const bathrooms = String(p?.bathrooms ?? '');
        const price = p?.price != null ? `₹${p.price}` : '';
        const newItem = {
            id: p.id,
            imageUrl,
            title: p.title || '',
            city,
            region,
            bedrooms,
            bathrooms,
            price,
            ctaText: 'View Details →',
            ctaUrl: `${frontend}/property/${p.id}`,
        };
        setFeaturedProps([...featuredProps, newItem]);
        setPropertyPickerOpen(false);
    }

    function addOpenHouse() {
        setOpenHouses([...openHouses, { dateLabel: '', title: '', time: '' }]);
    }

    function removeOpenHouse(i: number) {
        const next = openHouses.slice();
        next.splice(i, 1);
        setOpenHouses(next);
    }

    function updateOpenHouse(i: number, field: string, value: string) {
        const next = openHouses.slice();
        // @ts-ignore
        next[i][field] = value;
        setOpenHouses(next);
    }

    function buildBodyFromBlocks() {
        const rows: string[] = [];
        if (featuredProps.length > 0) {
            const items = featuredProps
                .map((p) => `
<table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"margin-bottom:16px;\">
  <tr>
    <td width=\"200\" valign=\"top\">
      ${p.imageUrl ? `<img src=\"${p.imageUrl}\" alt=\"${p.title}\" width=\"200\" style=\"display:block; width:200px; height:auto; border-radius:6px;\" />` : ''}
    </td>
    <td valign=\"top\" style=\"padding-left:16px;\">
      <div style=\"font:700 16px Arial, sans-serif; color:#122620; margin:0 0 6px 0;\">${p.title || ''}</div>
      <div style=\"font:400 13px Arial, sans-serif; color:#666; line-height:1.6; margin:0 0 10px 0;\">${p.city || ''}${p.region ? `, ${p.region}` : ''}<br />${p.bedrooms || ''} Bedrooms • ${p.bathrooms || ''} Bathrooms • ${p.price || ''}</div>
      <table role=\"presentation\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr><td style=\"background:#D6AD60; border-radius:4px;\"><a href=\"${p.ctaUrl || '#'}\" style=\"display:inline-block; padding:10px 16px; font:700 13px Arial, sans-serif; color:#122620; text-decoration:none;\">${p.ctaText || 'View Details →'}</a></td></tr></table>
    </td>
  </tr>
</table>`)
                .join('\n');

            rows.push(`
<div style=\"font:700 18px Arial, sans-serif; color:#122620; margin:20px 0 12px 0;\">Featured Properties</div>
${items}`);
        }

        if (insightsText.trim()) {
            rows.push(`
<div style=\"font:700 18px Arial, sans-serif; color:#122620; margin:20px 0 8px 0;\">Market Insights</div>
<div style=\"font:400 14px Arial, sans-serif; color:#444; line-height:1.6;\">${insightsText}</div>`);
        }

        if (tipText.trim()) {
            rows.push(`
<div style=\"font:700 18px Arial, sans-serif; color:#122620; margin:20px 0 8px 0;\">Tip of the Month</div>
<div style=\"font:400 14px Arial, sans-serif; color:#444; line-height:1.6;\">${tipText}</div>`);
        }

        if (openHouses.length > 0) {
            const list = openHouses
                .map((o) => `<li>${o.dateLabel || ''} — ${o.title || ''}${o.time ? ` (${o.time})` : ''}</li>`)
                .join('');
            rows.push(`
<div style=\"font:700 18px Arial, sans-serif; color:#122620; margin:20px 0 8px 0;\">Upcoming Open Houses</div>
<ul style=\"padding-left:18px; margin:0; font:400 14px Arial, sans-serif; color:#444; line-height:1.8;\">${list}</ul>`);
        }
        return rows.join('\n');
    }

    function getAdminKey() {
        return (import.meta.env.VITE_ADMIN_API_KEY as string) || '';
    }

    async function fetchSubscribers() {
        try {
            setLoading(true);
            setMessage(null);
            const adminKey = getAdminKey();
            const res = await fetch(`${API_BASE}/newsletter/subscribers`, {
                headers: { 'x-admin-key': adminKey },
            });
            const data = await res.json();
            if (res.status === 401) {
                setAuthError('Unauthorized. Please set VITE_ADMIN_API_KEY in adminpanel env.');
                setSubscribers([]);
                return;
            }
            if (res.ok && Array.isArray(data)) setSubscribers(data);
            else setMessage(data?.message || 'Failed to load subscribers');
        } catch (e) {
            setMessage('Network error');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchSubscribers(); }, []);

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const list = e.target.files ? Array.from(e.target.files) : [];
        setFiles(list);
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
        for (const f of files) {
            const base64 = await fileToBase64(f);
            out.push({ filename: f.name, bufferBase64: base64, contentType: f.type });
        }
        return out;
    }

    async function sendNewsletter(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const adminKey = getAdminKey();
            const res = await fetch(`${API_BASE}/newsletter/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
                body: JSON.stringify({ subject, html, attachments: await serializeFiles(files) }),
            });
            const data = await res.json();
            if (res.status === 401) {
                setAuthError('Unauthorized. Please set VITE_ADMIN_API_KEY in adminpanel env.');
                setMessage(null);
                return;
            }
            if (res.ok && data?.success) setMessage(`Sent to ${data.count} recipients`);
            else setMessage(data?.message || 'Failed to send');
        } catch (e) {
            setMessage('Network error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Newsletter</h1>
                <p className="text-gray-600">Create beautiful newsletters without any HTML.</p>
            </div>
            {authError && (
                <div className="mb-4 p-3 border border-red-300 bg-red-50 text-red-700">{authError}</div>
            )}
            <div className="mb-6 flex flex-wrap items-center gap-3 bg-white p-4 border rounded shadow-sm">
                <button
                    type="button"
                    className="px-4 py-2 rounded bg-[#122620] text-white hover:opacity-90"
                    onClick={loadMgPacificTemplate}
                >
                    Load MG Pacific Template
                </button>
                <button
                    type="button"
                    className="px-3 py-2 border rounded hover:bg-gray-50"
                    onClick={() => {
                        const generated = generateEmailHtml({ ...builder, bodyHtml: buildBodyFromBlocks() || builder.bodyHtml });
                        setHtml(generated);
                        setMessage('Generated HTML applied to editor.');
                    }}
                >
                    Apply to HTML
                </button>
                <button
                    type="button"
                    className="px-3 py-2 border rounded hover:bg-gray-50"
                    onClick={async () => {
                        const generated = generateEmailHtml({ ...builder, bodyHtml: buildBodyFromBlocks() || builder.bodyHtml });
                        await navigator.clipboard.writeText(generated);
                        setMessage('Copied ESP-ready HTML to clipboard.');
                    }}
                >
                    Copy HTML for ESP
                </button>
            </div>

            <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border rounded shadow-sm">
                    <div className="px-4 py-3 border-b">
                        <h3 className="font-semibold">Brand & Header</h3>
                        <p className="text-xs text-gray-500">Logo, preheader, headline, hero and intro.</p>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="p-3 bg-yellow-50 border text-sm rounded">Fill these fields. No HTML needed. We’ll build a professional email for you.</div>
                        <div>
                            <label className="block text-sm">Brand Name</label>
                            <input className="border p-2 w-full" value={builder.brandName} onChange={e => setBuilder({ ...builder, brandName: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm">Logo</label>
                            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadLogo(f); }} />
                            <input className="mt-2 border p-2 w-full" placeholder="or paste image URL" value={builder.logoUrl} onChange={e => setBuilder({ ...builder, logoUrl: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm">Preheader (appears in inbox preview)</label>
                            <input className="border p-2 w-full" value={builder.preheader} onChange={e => setBuilder({ ...builder, preheader: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm">Headline</label>
                            <input className="border p-2 w-full" value={builder.headline} onChange={e => setBuilder({ ...builder, headline: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm">Hero Image (optional)</label>
                            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadHero(f); }} />
                            <input className="mt-2 border p-2 w-full" placeholder="or paste image URL" value={builder.heroUrl} onChange={e => setBuilder({ ...builder, heroUrl: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm">Intro</label>
                            <textarea className="border p-2 w-full h-20" value={builder.intro} onChange={e => setBuilder({ ...builder, intro: e.target.value })} />
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    {/* Easy property builder */}
                    <div className="bg-white border rounded shadow-sm p-4">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-semibold">Featured Properties</label>
                            <div className="flex gap-2">
                                <button type="button" className="px-3 py-1.5 border text-xs rounded hover:bg-gray-50" onClick={openPropertySelector}>Pick from database</button>
                                <button type="button" className="px-3 py-1.5 border text-xs rounded hover:bg-gray-50" onClick={addFeaturedProperty}>Add custom</button>
                            </div>
                        </div>
                        <div className="space-y-3 mt-3">
                            {featuredProps.map((p, i) => (
                                <div key={i} className="border rounded p-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="text-xs text-gray-600">Property {i + 1}</div>
                                        <button type="button" className="text-xs underline" onClick={() => removeFeaturedProperty(i)}>Remove</button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        <div>
                                            <label className="block text-xs">Image</label>
                                            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPropertyImage(i, f); }} />
                                            <input className="mt-1 border p-1 w-full text-xs" placeholder="or paste image URL" value={p.imageUrl} onChange={e => updateFeaturedProperty(i, 'imageUrl', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-xs">Title</label>
                                            <input className="border p-1 w-full text-sm" value={p.title} onChange={e => updateFeaturedProperty(i, 'title', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-xs">City</label>
                                            <input className="border p-1 w-full text-sm" value={p.city} onChange={e => updateFeaturedProperty(i, 'city', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-xs">Region</label>
                                            <input className="border p-1 w-full text-sm" value={p.region} onChange={e => updateFeaturedProperty(i, 'region', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-xs">Bedrooms</label>
                                            <input className="border p-1 w-full text-sm" value={p.bedrooms} onChange={e => updateFeaturedProperty(i, 'bedrooms', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-xs">Bathrooms</label>
                                            <input className="border p-1 w-full text-sm" value={p.bathrooms} onChange={e => updateFeaturedProperty(i, 'bathrooms', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-xs">Price</label>
                                            <input className="border p-1 w-full text-sm" value={p.price} onChange={e => updateFeaturedProperty(i, 'price', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-xs">Button Text</label>
                                            <input className="border p-1 w-full text-sm" value={p.ctaText} onChange={e => updateFeaturedProperty(i, 'ctaText', e.target.value)} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs">Button URL</label>
                                            <input className="border p-1 w-full text-sm" value={p.ctaUrl} onChange={e => updateFeaturedProperty(i, 'ctaUrl', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border rounded shadow-sm p-4">
                        <label className="block text-sm font-semibold mb-2">Market Insights</label>
                        <textarea className="border p-2 w-full h-24" value={insightsText} onChange={e => setInsightsText(e.target.value)} placeholder="Write a short market update" />
                    </div>

                    <div className="bg-white border rounded shadow-sm p-4">
                        <label className="block text-sm font-semibold mb-2">Tip of the Month</label>
                        <textarea className="border p-2 w-full h-20" value={tipText} onChange={e => setTipText(e.target.value)} placeholder="Share a simple helpful tip" />
                    </div>

                    <div className="bg-white border rounded shadow-sm p-4">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-semibold">Upcoming Open Houses</label>
                            <button type="button" className="px-3 py-1.5 border text-xs rounded hover:bg-gray-50" onClick={addOpenHouse}>Add</button>
                        </div>
                        <div className="space-y-2 mt-2">
                            {openHouses.map((o, i) => (
                                <div key={i} className="grid grid-cols-3 gap-2 items-end">
                                    <div>
                                        <label className="block text-xs">Date label</label>
                                        <input className="border p-1 w-full text-sm" value={o.dateLabel} onChange={e => updateOpenHouse(i, 'dateLabel', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs">Title</label>
                                        <input className="border p-1 w-full text-sm" value={o.title} onChange={e => updateOpenHouse(i, 'title', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs">Time</label>
                                        <input className="border p-1 w-full text-sm" value={o.time} onChange={e => updateOpenHouse(i, 'time', e.target.value)} />
                                    </div>
                                    <div className="col-span-3 text-right">
                                        <button type="button" className="text-xs underline" onClick={() => removeOpenHouse(i)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <div className="bg-white border rounded shadow-sm">
                        <div className="px-4 py-3 border-b flex items-center justify-between">
                            <div>
                                <div className="font-semibold">Live Preview</div>
                                <div className="text-xs text-gray-500">Inline-styled, ESP-ready HTML</div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="px-3 py-1.5 border text-xs rounded hover:bg-gray-50"
                                    onClick={() => {
                                        const generated = generateEmailHtml({ ...builder, bodyHtml: buildBodyFromBlocks() || builder.bodyHtml });
                                        setHtml(generated);
                                        setMessage('Generated HTML applied to editor.');
                                    }}
                                >
                                    Apply to HTML
                                </button>
                                <button
                                    type="button"
                                    className="px-3 py-1.5 border text-xs rounded hover:bg-gray-50"
                                    onClick={async () => {
                                        const generated = generateEmailHtml({ ...builder, bodyHtml: buildBodyFromBlocks() || builder.bodyHtml });
                                        await navigator.clipboard.writeText(generated);
                                        setMessage('Copied ESP-ready HTML to clipboard.');
                                    }}
                                >
                                    Copy HTML
                                </button>
                            </div>
                        </div>
                        <div className="p-0">
                            <iframe title="preview" style={{ width: '100%', height: 600, border: '0' }} srcDoc={generateEmailHtml({ ...builder, bodyHtml: buildBodyFromBlocks() || builder.bodyHtml })} />
                        </div>
                    </div>
                </div>
            </div>

            {propertyPickerOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white w-[90vw] max-w-4xl max-h-[80vh] overflow-hidden rounded shadow">
                        <div className="p-3 border-b flex items-center justify-between">
                            <div className="font-semibold">Select a property</div>
                            <button className="text-sm underline" onClick={() => setPropertyPickerOpen(false)}>Close</button>
                        </div>
                        <div className="p-3 overflow-auto" style={{ maxHeight: '70vh' }}>
                            {allProperties.length === 0 ? (
                                <div className="text-sm text-gray-600">Loading properties…</div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {allProperties.map((p: any) => (
                                        <div key={p.id} className="border p-2 flex gap-2">
                                            <img src={(p && p.images && p.images[0] && p.images[0].url) ? p.images[0].url : ''} alt="" className="w-28 h-20 object-cover bg-gray-100" />
                                            <div className="flex-1">
                                                <div className="font-semibold text-sm">{p.title}</div>
                                                <div className="text-xs text-gray-600">{(p && p.location && p.location.city) ? p.location.city : ''}{(p && p.location && p.location.state) ? `, ${p.location.state}` : ''}</div>
                                                <div className="text-xs text-gray-600">{p.bedrooms} bd • {p.bathrooms} ba • ₹{p.price}</div>
                                                <div className="mt-2">
                                                    <button type="button" className="px-2 py-1 border text-xs" onClick={() => selectProperty(p)}>Select</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <form onSubmit={sendNewsletter} className="space-y-4 max-w-3xl bg-white p-4 border rounded">
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border p-3"
                    required
                />
                <textarea
                    placeholder="HTML content"
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    className="w-full border p-3 h-64 font-mono"
                    required
                />
                <div>
                    <label className="block text-sm mb-1">Attachments (images/PDFs)</label>
                    <input type="file" multiple accept="image/*,application/pdf" onChange={onFileChange} />
                    {files.length > 0 && (
                        <p className="text-xs text-gray-600 mt-1">{files.length} file(s) selected</p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-[#122620] text-white disabled:opacity-60 hover:opacity-90"
                >
                    {loading ? 'Sending…' : 'Send Newsletter'}
                </button>
                {message && <p className="text-sm mt-2">{message}</p>}
            </form>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-2">Subscribers</h2>
                <button onClick={fetchSubscribers} className="mb-3 px-4 py-2 border">Refresh</button>
                <div className="overflow-auto border">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-left">
                                <th className="p-2">Email</th>
                                <th className="p-2">Confirmed</th>
                                <th className="p-2">Unsubscribed</th>
                                <th className="p-2">Subscribed At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map((s) => (
                                <tr key={s.id} className="border-t">
                                    <td className="p-2">{s.email}</td>
                                    <td className="p-2">{s.isConfirmed ? 'Yes' : 'No'}</td>
                                    <td className="p-2">{s.unsubscribedAt ? 'Yes' : 'No'}</td>
                                    <td className="p-2">{new Date(s.subscribedAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}

function generateEmailHtml(cfg: {
    brandName: string;
    logoUrl: string;
    preheader: string;
    headline: string;
    heroUrl: string;
    intro: string;
    bodyHtml: string;
    ctaText: string;
    ctaUrl: string;
    footerAddress: string;
    footerWebsite: string;
    primaryColor: string;
    accentColor: string;
}) {
    // Email clients prefer tables + inline styles; keep max width 600px, fallback fonts, and absolute widths
    const safe = (s: string) => s || '';
    return `<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safe(cfg.headline)}</title>
    <style>
      /* Prevent iOS auto-link colors */
      a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f6f8;">
    <span style="display:none; font-size:1px; color:#f5f6f8; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">${safe(cfg.preheader)}</span>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f5f6f8;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff;">
            <tr>
              <td style="padding:20px 24px; text-align:left; border-bottom:1px solid #eee;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      ${cfg.logoUrl ? `<img src="${safe(cfg.logoUrl)}" alt="${safe(cfg.brandName)}" style="display:block; height:40px; max-width:200px;" />` : `<div style="font:700 20px Arial, sans-serif; color:${cfg.primaryColor};">${safe(cfg.brandName)}</div>`}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            ${cfg.heroUrl ? `
            <tr>
              <td style="padding:0;">
                <img src="${safe(cfg.heroUrl)}" alt="" width="600" style="display:block; width:600px; max-width:100%; height:auto;" />
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding:28px 24px 8px 24px;">
                <div style="font:700 24px Arial, sans-serif; color:${cfg.primaryColor}; line-height:1.3;">${safe(cfg.headline)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 16px 24px;">
                <div style="font:400 14px Arial, sans-serif; color:#444; line-height:1.6;">${safe(cfg.intro)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px 16px 24px;">
                <div style="font:400 14px Arial, sans-serif; color:#333; line-height:1.6;">${safe(cfg.bodyHtml)}</div>
              </td>
            </tr>
            ${cfg.ctaText && cfg.ctaUrl ? `
            <tr>
              <td style="padding:8px 24px 28px 24px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="background:${cfg.accentColor}; border-radius:4px;">
                      <a href="${safe(cfg.ctaUrl)}" style="display:inline-block; padding:12px 18px; font:700 14px Arial, sans-serif; color:#122620; text-decoration:none;">${safe(cfg.ctaText)}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>` : ''}
            <tr>
              <td style="padding:16px 24px 24px 24px; border-top:1px solid #eee;">
                <div style="font:400 12px Arial, sans-serif; color:#777; line-height:1.5;">
                  <div>${safe(cfg.footerAddress)}</div>
                  <div><a href="${safe(cfg.footerWebsite)}" style="color:${cfg.primaryColor}; text-decoration:none;">${safe(cfg.footerWebsite)}</a></div>
                  <div style="margin-top:6px;">You are receiving this email because you subscribed to updates.</div>
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


