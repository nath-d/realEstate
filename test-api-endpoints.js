// Test script to verify API endpoints
const fetch = require('node-fetch');

async function testAPIEndpoints() {
    console.log('🧪 Testing API Endpoints...\n');

    // Test 1: Check if server is running
    console.log('1. Testing Server Connection...');
    try {
        const response = await fetch('http://localhost:3001/health');
        if (response.ok) {
            console.log('✅ Server is running on port 3001');
        } else {
            console.log('⚠️  Server responded but health endpoint not found');
        }
    } catch (error) {
        console.log('❌ Server not running on port 3001');
        console.log('   Error:', error.message);
        return;
    }

    // Test 2: Test auth endpoints (without authentication)
    console.log('\n2. Testing Auth Endpoints (without auth)...');
    try {
        const response = await fetch('http://localhost:3001/auth/favorites');
        if (response.status === 401) {
            console.log('✅ Auth endpoint exists and requires authentication');
        } else {
            console.log(`⚠️  Unexpected response: ${response.status}`);
        }
    } catch (error) {
        console.log('❌ Error testing auth endpoint:', error.message);
    }

    // Test 3: Test property endpoints
    console.log('\n3. Testing Property Endpoints...');
    try {
        const response = await fetch('http://localhost:3001/properties');
        if (response.ok) {
            const data = await response.json();
            console.log(`✅ Properties endpoint working - found ${data.length} properties`);
        } else {
            console.log(`⚠️  Properties endpoint returned: ${response.status}`);
        }
    } catch (error) {
        console.log('❌ Error testing properties endpoint:', error.message);
    }

    console.log('\n🎉 API endpoint test completed!');
    console.log('\n📋 Next Steps:');
    console.log('1. Make sure both server and client are running');
    console.log('2. Open browser and go to http://localhost:5173');
    console.log('3. Sign in with Google OAuth');
    console.log('4. Test favorites functionality');
}

// Run the test
testAPIEndpoints().catch(console.error); 