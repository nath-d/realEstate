const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedBlogData() {
    try {
        console.log('🌱 Seeding blog data...');

        // Create categories
        const categories = await Promise.all([
            prisma.blogCategory.upsert({
                where: { slug: 'real-estate-tips' },
                update: {},
                create: {
                    name: 'Real Estate Tips',
                    slug: 'real-estate-tips',
                    description: 'Tips and advice for buying, selling, and investing in real estate'
                }
            }),
            prisma.blogCategory.upsert({
                where: { slug: 'market-insights' },
                update: {},
                create: {
                    name: 'Market Insights',
                    slug: 'market-insights',
                    description: 'Analysis and insights into real estate market trends'
                }
            }),
            prisma.blogCategory.upsert({
                where: { slug: 'property-investment' },
                update: {},
                create: {
                    name: 'Property Investment',
                    slug: 'property-investment',
                    description: 'Guides and strategies for real estate investment'
                }
            }),
            prisma.blogCategory.upsert({
                where: { slug: 'home-improvement' },
                update: {},
                create: {
                    name: 'Home Improvement',
                    slug: 'home-improvement',
                    description: 'Tips for improving and maintaining your property'
                }
            })
        ]);

        console.log('✅ Categories created:', categories.length);

        // Create authors
        const authors = await Promise.all([
            prisma.blogAuthor.upsert({
                where: { email: 'john.doe@realestate.com' },
                update: {},
                create: {
                    name: 'John Doe',
                    email: 'john.doe@realestate.com',
                    bio: 'Experienced real estate agent with over 10 years in the industry',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                }
            }),
            prisma.blogAuthor.upsert({
                where: { email: 'jane.smith@realestate.com' },
                update: {},
                create: {
                    name: 'Jane Smith',
                    email: 'jane.smith@realestate.com',
                    bio: 'Real estate investment specialist and market analyst',
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
                }
            }),
            prisma.blogAuthor.upsert({
                where: { email: 'mike.johnson@realestate.com' },
                update: {},
                create: {
                    name: 'Mike Johnson',
                    email: 'mike.johnson@realestate.com',
                    bio: 'Property developer and construction expert',
                    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
                }
            })
        ]);

        console.log('✅ Authors created:', authors.length);

        // Create sample blogs
        const blogs = await Promise.all([
            prisma.blog.upsert({
                where: { id: 1 },
                update: {},
                create: {
                    title: '10 Essential Tips for First-Time Home Buyers',
                    content: `
                        <h2>Introduction</h2>
                        <p>Buying your first home is one of the most significant financial decisions you'll ever make. Here are 10 essential tips to help you navigate the process successfully.</p>
                        
                        <h3>1. Assess Your Financial Situation</h3>
                        <p>Before you start house hunting, take a comprehensive look at your finances. Calculate your debt-to-income ratio, check your credit score, and determine how much you can afford for a down payment.</p>
                        
                        <h3>2. Get Pre-Approved for a Mortgage</h3>
                        <p>Getting pre-approved for a mortgage gives you a clear understanding of your budget and shows sellers that you're a serious buyer.</p>
                        
                        <h3>3. Research Neighborhoods</h3>
                        <p>Don't just focus on the house itself. Research the neighborhood, school districts, crime rates, and future development plans.</p>
                        
                        <h3>4. Work with a Real Estate Agent</h3>
                        <p>A good real estate agent can guide you through the process, negotiate on your behalf, and help you avoid common pitfalls.</p>
                        
                        <h3>5. Don't Skip the Home Inspection</h3>
                        <p>A professional home inspection can reveal hidden issues that could cost you thousands of dollars in repairs.</p>
                        
                        <h3>6. Consider Additional Costs</h3>
                        <p>Remember to factor in property taxes, insurance, utilities, and maintenance costs when calculating your monthly expenses.</p>
                        
                        <h3>7. Be Patient</h3>
                        <p>Finding the right home takes time. Don't rush into a decision you might regret later.</p>
                        
                        <h3>8. Negotiate Wisely</h3>
                        <p>Don't be afraid to negotiate on price, closing costs, or repairs. Your agent can help you determine what's reasonable.</p>
                        
                        <h3>9. Understand the Closing Process</h3>
                        <p>Familiarize yourself with the closing process and what documents you'll need to sign.</p>
                        
                        <h3>10. Plan for the Future</h3>
                        <p>Consider how your needs might change over the next 5-10 years when choosing a home.</p>
                        
                        <h2>Conclusion</h2>
                        <p>Buying your first home can be overwhelming, but with proper preparation and guidance, it can also be one of the most rewarding experiences of your life.</p>
                    `,
                    excerpt: 'Essential tips and advice for first-time home buyers to navigate the complex process of purchasing their first property.',
                    featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
                    status: 'published',
                    categoryId: categories[0].id,
                    authorId: authors[0].id,
                    tags: ['first-time buyer', 'home buying', 'mortgage', 'real estate tips'],
                    metaTitle: '10 Essential Tips for First-Time Home Buyers - Real Estate Guide',
                    metaDescription: 'Comprehensive guide with 10 essential tips for first-time home buyers. Learn about mortgages, inspections, negotiations, and more.'
                }
            }),
            prisma.blog.upsert({
                where: { id: 2 },
                update: {},
                create: {
                    title: '2024 Real Estate Market Trends: What to Expect',
                    content: `
                        <h2>Market Overview</h2>
                        <p>As we move into 2024, the real estate market continues to evolve with new trends and challenges. Here's what buyers and sellers can expect.</p>
                        
                        <h3>Interest Rate Impact</h3>
                        <p>Interest rates remain a significant factor affecting buyer behavior and market dynamics. While rates have stabilized, they continue to influence affordability.</p>
                        
                        <h3>Technology Integration</h3>
                        <p>Virtual tours, AI-powered pricing tools, and digital transaction platforms are becoming standard in the industry.</p>
                        
                        <h3>Sustainability Focus</h3>
                        <p>Energy-efficient homes and sustainable building practices are increasingly important to buyers.</p>
                        
                        <h3>Remote Work Influence</h3>
                        <p>The continued prevalence of remote work is reshaping housing preferences and location choices.</p>
                        
                        <h2>Conclusion</h2>
                        <p>Staying informed about market trends helps buyers and sellers make better decisions in an ever-changing landscape.</p>
                    `,
                    excerpt: 'Analysis of key trends shaping the 2024 real estate market, including technology, sustainability, and remote work impacts.',
                    featuredImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
                    status: 'published',
                    categoryId: categories[1].id,
                    authorId: authors[1].id,
                    tags: ['market trends', '2024', 'real estate market', 'investment'],
                    metaTitle: '2024 Real Estate Market Trends - Market Analysis',
                    metaDescription: 'Comprehensive analysis of 2024 real estate market trends including technology, sustainability, and remote work impacts.'
                }
            }),
            prisma.blog.upsert({
                where: { id: 3 },
                update: {},
                create: {
                    title: 'Investment Properties: A Beginner\'s Guide',
                    content: `
                        <h2>Getting Started with Real Estate Investment</h2>
                        <p>Real estate investment can be a lucrative way to build wealth, but it requires careful planning and understanding.</p>
                        
                        <h3>Types of Investment Properties</h3>
                        <ul>
                            <li>Residential rental properties</li>
                            <li>Commercial real estate</li>
                            <li>REITs (Real Estate Investment Trusts)</li>
                            <li>Fix and flip properties</li>
                        </ul>
                        
                        <h3>Key Considerations</h3>
                        <p>Location, market conditions, property condition, and financing options are crucial factors to consider.</p>
                        
                        <h3>Risk Management</h3>
                        <p>Diversification, proper insurance, and thorough due diligence are essential for managing investment risks.</p>
                        
                        <h2>Conclusion</h2>
                        <p>Real estate investment requires patience, research, and a long-term perspective for success.</p>
                    `,
                    excerpt: 'A comprehensive beginner\'s guide to real estate investment, covering different property types and key considerations.',
                    featuredImage: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=400&fit=crop',
                    status: 'published',
                    categoryId: categories[2].id,
                    authorId: authors[2].id,
                    tags: ['investment', 'real estate investment', 'rental properties', 'beginner guide'],
                    metaTitle: 'Real Estate Investment Guide for Beginners',
                    metaDescription: 'Complete beginner\'s guide to real estate investment covering property types, considerations, and risk management.'
                }
            })
        ]);

        console.log('✅ Blogs created:', blogs.length);

        // Add some blog views
        await Promise.all([
            prisma.blogView.createMany({
                data: [
                    { blogId: 1, ip: '192.168.1.1' },
                    { blogId: 1, ip: '192.168.1.2' },
                    { blogId: 1, ip: '192.168.1.3' },
                    { blogId: 2, ip: '192.168.1.4' },
                    { blogId: 2, ip: '192.168.1.5' },
                    { blogId: 3, ip: '192.168.1.6' },
                ],
                skipDuplicates: true
            })
        ]);

        console.log('✅ Blog views created');

        console.log('🎉 Blog data seeding completed successfully!');
    } catch (error) {
        console.error('❌ Error seeding blog data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedBlogData(); 