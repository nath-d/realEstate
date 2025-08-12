import React from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function NewsletterForm() {
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState('idle'); // idle | loading | success | error
    const [message, setMessage] = React.useState('');

    async function onSubmit(e) {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        setMessage('');
        try {
            const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (data?.success) {
                setStatus('success');
                setMessage('Please check your email to confirm your subscription.');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data?.message || 'Subscription failed.');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Network error. Please try again later.');
        }
    }

    return (
        <form className="space-y-4" onSubmit={onSubmit}>
            <div className="relative">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-[#122620] text-white border-2 border-gray-700 focus:border-[#c9a66b] focus:outline-none transition-colors"
                />
            </div>
            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-block bg-transparent border-2 border-[#D6AD60] text-[#D6AD60] px-8 py-4 rounded-none hover:bg-[#D6AD60] hover:text-[#122620] transition-all duration-700 font-montserrat font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase disabled:opacity-60"
            >
                {status === 'loading' ? 'Submitting...' : 'Subscribe Now'}
            </button>
            {message && (
                <p className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>{message}</p>
            )}
        </form>
    );
}


