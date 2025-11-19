const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testBasicAuth() {
    console.log('🧪 Testing Basic Authentication...\n');

    try {
        // Test 1: Signup
        console.log('1. Testing User Signup...');
        const signupData = {
            firstName: 'Test',
            lastName: 'User',
            email: 'testuser@example.com',
            password: 'password123'
        };

        const signupResponse = await axios.post(`${BASE_URL}/auth/signup`, signupData);
        console.log('✅ Signup successful!');
        console.log('   User ID:', signupResponse.data.user.id);
        console.log('   Token:', signupResponse.data.token ? 'Received' : 'Missing');
        console.log('');

        const token = signupResponse.data.token;

        // Test 2: Login
        console.log('2. Testing User Login...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'testuser@example.com',
            password: 'password123'
        });
        console.log('✅ Login successful!');
        console.log('   User email:', loginResponse.data.user.email);
        console.log('');

        // Test 3: Get Profile
        console.log('3. Testing Get Profile...');
        const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Get profile successful!');
        console.log('   User name:', `${profileResponse.data.user.firstName} ${profileResponse.data.user.lastName}`);
        console.log('');

        console.log('🎉 Basic authentication tests passed!');
        console.log('✅ Signup, Login, and Profile retrieval working correctly.');

    } catch (error) {
        console.error('❌ Test failed:');
        console.error('   Error:', error.response?.data || error.message);
        console.error('   Status:', error.response?.status);
    }
}

testBasicAuth(); 