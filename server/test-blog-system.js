const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Test data for blog system
const testBlogData = {
    title: "Test Blog Post",
    content: "This is a test blog post content with HTML formatting.",
    excerpt: "This is a test excerpt for the blog post.",
    featuredImage: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    status: "published",
    categoryId: 1,
    authorId: 1,
    tags: ["test", "real-estate"],
    metaTitle: "Test Blog Post - Real Estate",
    metaDescription: "A test blog post for the real estate blog system"
};

const testCategoryData = {
    name: "Test Category",
    description: "A test category for the blog system",
    slug: "test-category"
};

const testAuthorData = {
    name: "Test Author",
    email: "test@example.com",
    bio: "A test author for the blog system",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
};

async function testEndpoint(endpoint, method = 'GET', data = null) {
    try {
        const config = {
            method,
            url: `${BASE_URL}${endpoint}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            config.data = data;
        }

        const response = await axios(config);
        return {
            success: true,
            status: response.status,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            status: error.response?.status || 'Network Error',
            message: error.response?.data?.message || error.message
        };
    }
}

async function runTests() {
    console.log('🚀 Starting Blog System Tests...\n');

    // Test 1: Check if server is running
    console.log('1. Testing server connectivity...');
    const serverTest = await testEndpoint('/properties');
    if (serverTest.success) {
        console.log('✅ Server is running and responding');
    } else {
        console.log('❌ Server is not responding');
        return;
    }

    // Test 2: Check if blog endpoints exist
    console.log('\n2. Testing blog endpoints...');
    const blogEndpoints = [
        '/blogs',
        '/blogs/categories',
        '/blogs/authors',
        '/blogs/recent',
        '/blogs/featured',
        '/blogs/stats'
    ];

    for (const endpoint of blogEndpoints) {
        const result = await testEndpoint(endpoint);
        if (result.success) {
            console.log(`✅ ${endpoint} - Status: ${result.status}`);
        } else {
            console.log(`❌ ${endpoint} - ${result.message}`);
        }
    }

    // Test 3: Test blog CRUD operations (if endpoints exist)
    console.log('\n3. Testing blog CRUD operations...');

    // Test creating a blog post
    const createBlogResult = await testEndpoint('/blogs', 'POST', testBlogData);
    if (createBlogResult.success) {
        console.log('✅ Blog post created successfully');
        const blogId = createBlogResult.data.id;

        // Test getting the created blog post
        const getBlogResult = await testEndpoint(`/blogs/${blogId}`);
        if (getBlogResult.success) {
            console.log('✅ Blog post retrieved successfully');
        } else {
            console.log('❌ Failed to retrieve blog post');
        }

        // Test updating the blog post
        const updateData = { ...testBlogData, title: "Updated Test Blog Post" };
        const updateBlogResult = await testEndpoint(`/blogs/${blogId}`, 'PUT', updateData);
        if (updateBlogResult.success) {
            console.log('✅ Blog post updated successfully');
        } else {
            console.log('❌ Failed to update blog post');
        }

        // Test deleting the blog post
        const deleteBlogResult = await testEndpoint(`/blogs/${blogId}`, 'DELETE');
        if (deleteBlogResult.success) {
            console.log('✅ Blog post deleted successfully');
        } else {
            console.log('❌ Failed to delete blog post');
        }
    } else {
        console.log('❌ Blog creation failed - Blog system not implemented');
    }

    // Test 4: Test category CRUD operations
    console.log('\n4. Testing category CRUD operations...');
    const createCategoryResult = await testEndpoint('/blogs/categories', 'POST', testCategoryData);
    if (createCategoryResult.success) {
        console.log('✅ Category created successfully');
        const categoryId = createCategoryResult.data.id;

        // Test getting categories
        const getCategoriesResult = await testEndpoint('/blogs/categories');
        if (getCategoriesResult.success) {
            console.log('✅ Categories retrieved successfully');
        } else {
            console.log('❌ Failed to retrieve categories');
        }
    } else {
        console.log('❌ Category creation failed - Blog system not implemented');
    }

    // Test 5: Test author CRUD operations
    console.log('\n5. Testing author CRUD operations...');
    const createAuthorResult = await testEndpoint('/blogs/authors', 'POST', testAuthorData);
    if (createAuthorResult.success) {
        console.log('✅ Author created successfully');
        const authorId = createAuthorResult.data.id;

        // Test getting authors
        const getAuthorsResult = await testEndpoint('/blogs/authors');
        if (getAuthorsResult.success) {
            console.log('✅ Authors retrieved successfully');
        } else {
            console.log('❌ Failed to retrieve authors');
        }
    } else {
        console.log('❌ Author creation failed - Blog system not implemented');
    }

    // Test 6: Test blog statistics
    console.log('\n6. Testing blog statistics...');
    const statsResult = await testEndpoint('/blogs/stats');
    if (statsResult.success) {
        console.log('✅ Blog statistics retrieved successfully');
        console.log('📊 Blog Stats:', statsResult.data);
    } else {
        console.log('❌ Failed to retrieve blog statistics');
    }

    // Test 7: Test recent and featured blogs
    console.log('\n7. Testing recent and featured blogs...');
    const recentResult = await testEndpoint('/blogs/recent');
    if (recentResult.success) {
        console.log('✅ Recent blogs retrieved successfully');
        console.log(`📝 Found ${recentResult.data.length} recent blogs`);
    } else {
        console.log('❌ Failed to retrieve recent blogs');
    }

    const featuredResult = await testEndpoint('/blogs/featured');
    if (featuredResult.success) {
        console.log('✅ Featured blogs retrieved successfully');
        console.log(`⭐ Found ${featuredResult.data.length} featured blogs`);
    } else {
        console.log('❌ Failed to retrieve featured blogs');
    }

    console.log('\n🎯 Blog System Test Summary:');
    console.log('================================');
    console.log('The blog system appears to be missing from the backend.');
    console.log('To implement the blog system, you need to:');
    console.log('1. Add blog models to Prisma schema');
    console.log('2. Create blog module, service, and controller');
    console.log('3. Add blog routes to the app module');
    console.log('4. Run Prisma migrations');
    console.log('5. Test the endpoints again');
}

// Run the tests
runTests().catch(console.error); 