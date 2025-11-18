import { useEffect } from 'react';

const SEOAnalytics = ({
    googleAnalyticsId = 'G-XXXXXXXXXX',
    googleTagManagerId = 'GTM-XXXXXXX',
    facebookPixelId = null
}) => {
    useEffect(() => {
        // Google Analytics 4
        if (googleAnalyticsId && googleAnalyticsId !== 'G-XXXXXXXXXX') {
            const script1 = document.createElement('script');
            script1.async = true;
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
            document.head.appendChild(script1);

            const script2 = document.createElement('script');
            script2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
            `;
            document.head.appendChild(script2);
        }

        // Google Tag Manager
        if (googleTagManagerId && googleTagManagerId !== 'GTM-XXXXXXX') {
            const script = document.createElement('script');
            script.innerHTML = `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${googleTagManagerId}');
            `;
            document.head.appendChild(script);

            // GTM noscript fallback
            const noscript = document.createElement('noscript');
            noscript.innerHTML = `
                <iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `;
            document.body.appendChild(noscript);
        }

        // Facebook Pixel
        if (facebookPixelId) {
            const script = document.createElement('script');
            script.innerHTML = `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${facebookPixelId}');
                fbq('track', 'PageView');
            `;
            document.head.appendChild(script);

            const noscript = document.createElement('noscript');
            noscript.innerHTML = `
                <img height="1" width="1" style="display:none"
                src="https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1"/>
            `;
            document.body.appendChild(noscript);
        }
    }, [googleAnalyticsId, googleTagManagerId, facebookPixelId]);

    return null;
};

// Custom hook for tracking events
export const useAnalytics = () => {
    const trackEvent = (eventName, parameters = {}) => {
        // Google Analytics 4
        if (window.gtag) {
            window.gtag('event', eventName, parameters);
        }

        // Facebook Pixel
        if (window.fbq) {
            window.fbq('track', eventName, parameters);
        }

        // Google Tag Manager
        if (window.dataLayer) {
            window.dataLayer.push({
                event: eventName,
                ...parameters
            });
        }
    };

    const trackPageView = (pagePath, pageTitle) => {
        // Google Analytics 4
        if (window.gtag) {
            window.gtag('config', 'GA_MEASUREMENT_ID', {
                page_path: pagePath,
                page_title: pageTitle
            });
        }

        // Google Tag Manager
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'page_view',
                page_path: pagePath,
                page_title: pageTitle
            });
        }
    };

    return { trackEvent, trackPageView };
};

export default SEOAnalytics;
