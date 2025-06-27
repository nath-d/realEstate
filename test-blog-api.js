const axios = require('axios');

const API_BASE = 'http://localhost:3000/blogs';

async function testBlogAPI() {
    console.log('🧪 Testing Blog API...\n');

    try {
        // Test 1: Get all blogs
        console.log('1. Testing GET /blogs');
        const blogsResponse = await axios.get(API_BASE);
        console.log(`✅ Found ${blogsResponse.data.length} blogs`);
        if (blogsResponse.data.length > 0) {
            console.log(`   First blog: "${blogsResponse.data[0].title}"`);
        }
        console.log('');

        // Test 2: Get blog statistics
        console.log('2. Testing GET /blogs/stats');
        const statsResponse = await axios.get(`${API_BASE}/stats`);
        console.log('✅ Blog statistics:');
        console.log(`   Total blogs: ${statsResponse.data.total}`);
        console.log(`   Total views: ${statsResponse.data.views}`);
        console.log(`   Categories: ${statsResponse.data.categories}`);
        console.log(`   Authors: ${statsResponse.data.authors}`);
        console.log(`   Published: ${statsResponse.data.published}`);
        console.log(`   Drafts: ${statsResponse.data.drafts}`);
        console.log('');

        // Test 3: Get categories
        console.log('3. Testing GET /blogs/categories');
        const categoriesResponse = await axios.get(`${API_BASE}/categories`);
        console.log(`✅ Found ${categoriesResponse.data.length} categories`);
        categoriesResponse.data.forEach(cat => {
            console.log(`   - ${cat.name} (${cat._count?.blogs || 0} blogs)`);
        });
        console.log('');

        // Test 4: Get authors
        console.log('4. Testing GET /blogs/authors');
        const authorsResponse = await axios.get(`${API_BASE}/authors`);
        console.log(`✅ Found ${authorsResponse.data.length} authors`);
        authorsResponse.data.forEach(author => {
            console.log(`   - ${author.name} (${author._count?.blogs || 0} blogs)`);
        });
        console.log('');

        // Test 5: Get specific blog by ID
        if (blogsResponse.data.length > 0) {
            console.log('5. Testing GET /blogs/:id');
            const blogId = blogsResponse.data[0].id;
            const blogResponse = await axios.get(`${API_BASE}/${blogId}`);
            console.log(`✅ Retrieved blog: "${blogResponse.data.title}"`);
            console.log(`   Author: ${blogResponse.data.author.name}`);
            console.log(`   Category: ${blogResponse.data.category.name}`);
            console.log(`   Status: ${blogResponse.data.status}`);
            console.log('');

            // Test 6: Get specific category
            console.log('6. Testing GET /blogs/categories/:id');
            const categoryId = blogResponse.data.category.id;
            const categoryResponse = await axios.get(`${API_BASE}/categories/${categoryId}`);
            console.log(`✅ Retrieved category: "${categoryResponse.data.name}"`);
            console.log(`   Description: ${categoryResponse.data.description || 'No description'}`);
            console.log('');

            // Test 7: Get specific author
            console.log('7. Testing GET /blogs/authors/:id');
            const authorId = blogResponse.data.author.id;
            const authorResponse = await axios.get(`${API_BASE}/authors/${authorId}`);
            console.log(`✅ Retrieved author: "${authorResponse.data.name}"`);
            console.log(`   Email: ${authorResponse.data.email}`);
            console.log(`   Bio: ${authorResponse.data.bio || 'No bio'}`);
            console.log('');
        }

        console.log('🎉 All API tests passed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - ${blogsResponse.data.length} blogs available`);
        console.log(`   - ${categoriesResponse.data.length} categories available`);
        console.log(`   - ${authorsResponse.data.length} authors available`);
        console.log(`   - ${statsResponse.data.total} total blog posts`);
        console.log(`   - ${statsResponse.data.views} total blog views`);

    } catch (error) {
        console.error('❌ API test failed:', error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', error.response.data);
        }
        process.exit(1);
    }
}

// Check if server is running
async function checkServer() {
    try {
        await axios.get('http://localhost:3000');
        return true;
    } catch (error) {
        return false;
    }
}

async function main() {
    console.log('🔍 Checking if server is running...');
    const serverRunning = await checkServer();

    if (!serverRunning) {
        console.error('❌ Server is not running on http://localhost:3000');
        console.log('💡 Please start the server first:');
        console.log('   cd server && npm run start:dev');
        process.exit(1);
    }

    console.log('✅ Server is running\n');
    await testBlogAPI();
}

main(); 