// Sitemap generation utility for SEO
export const generateSitemap = (properties = [], blogs = []) => {
    const baseUrl = window.location.origin;
    const currentDate = new Date().toISOString().split('T')[0];

    const staticPages = [
        {
            url: `${baseUrl}/`,
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: '1.0'
        },
        {
            url: `${baseUrl}/properties`,
            lastmod: currentDate,
            changefreq: 'daily',
            priority: '0.9'
        },
        {
            url: `${baseUrl}/about`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: '0.8'
        },
        {
            url: `${baseUrl}/contact`,
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: '0.8'
        },
        {
            url: `${baseUrl}/blogs`,
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: '0.8'
        }
    ];

    const propertyPages = properties.map(property => ({
        url: `${baseUrl}/propertyDet?id=${property.id}`,
        lastmod: property.updatedAt ? property.updatedAt.split('T')[0] : currentDate,
        changefreq: 'weekly',
        priority: '0.7'
    }));

    const blogPages = blogs.map(blog => ({
        url: `${baseUrl}/blogs/${blog.id}`,
        lastmod: blog.updatedAt ? blog.updatedAt.split('T')[0] : currentDate,
        changefreq: 'monthly',
        priority: '0.6'
    }));

    const allPages = [...staticPages, ...propertyPages, ...blogPages];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return sitemapXml;
};

// Function to download sitemap (for development/testing)
export const downloadSitemap = (properties = [], blogs = []) => {
    const sitemap = generateSitemap(properties, blogs);
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
