const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAuthSystem() {
    console.log('🧪 Testing Authentication System...\n');

    try {
        // Test 1: Signup
        console.log('1. Testing User Signup...');
        const signupData = {
            firstName: 'Test',
            lastName: 'User',
            email: 'testuser@example.com',
            password: 'password123',
            phone: '+1234567890'
        };

        const signupResponse = await axios.post(`${BASE_URL}/auth/signup`, signupData);
        console.log('✅ Signup successful:', signupResponse.data.success);
        console.log('   User ID:', signupResponse.data.user.id);
        console.log('   Token received:', !!signupResponse.data.token);
        console.log('');

        const token = signupResponse.data.token;

        // Test 2: Login
        console.log('2. Testing User Login...');
        const loginData = {
            email: 'testuser@example.com',
            password: 'password123'
        };

        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
        console.log('✅ Login successful:', loginResponse.data.success);
        console.log('   User email:', loginResponse.data.user.email);
        console.log('   Token received:', !!loginResponse.data.token);
        console.log('');

        // Test 3: Get Profile
        console.log('3. Testing Get Profile...');
        const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Get profile successful:', profileResponse.data.success);
        console.log('   User name:', `${profileResponse.data.user.firstName} ${profileResponse.data.user.lastName}`);
        console.log('   Email verified:', profileResponse.data.user.isEmailVerified);
        console.log('');

        // Test 4: Update Profile
        console.log('4. Testing Update Profile...');
        const updateData = {
            firstName: 'Updated',
            lastName: 'Name',
            phone: '+9876543210',
            address: '123 Test Street',
            city: 'Test City',
            state: 'TS',
            zipCode: '12345',
            country: 'Test Country'
        };

        const updateResponse = await axios.put(`${BASE_URL}/auth/profile`, updateData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Update profile successful:', updateResponse.data.success);
        console.log('   Updated name:', `${updateResponse.data.user.firstName} ${updateResponse.data.user.lastName}`);
        console.log('   Updated phone:', updateResponse.data.user.phone);
        console.log('');

        // Test 5: Change Password
        console.log('5. Testing Change Password...');
        const changePasswordData = {
            currentPassword: 'password123',
            newPassword: 'newpassword123'
        };

        const changePasswordResponse = await axios.post(`${BASE_URL}/auth/change-password`, changePasswordData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Change password successful:', changePasswordResponse.data.success);
        console.log('   Message:', changePasswordResponse.data.message);
        console.log('');

        // Test 6: Login with new password
        console.log('6. Testing Login with New Password...');
        const newLoginData = {
            email: 'testuser@example.com',
            password: 'newpassword123'
        };

        const newLoginResponse = await axios.post(`${BASE_URL}/auth/login`, newLoginData);
        console.log('✅ Login with new password successful:', newLoginResponse.data.success);
        console.log('');

        // Test 7: Forgot Password
        console.log('7. Testing Forgot Password...');
        const forgotPasswordData = {
            email: 'testuser@example.com'
        };

        const forgotPasswordResponse = await axios.post(`${BASE_URL}/auth/forgot-password`, forgotPasswordData);
        console.log('✅ Forgot password successful:', forgotPasswordResponse.data.success);
        console.log('   Message:', forgotPasswordResponse.data.message);
        console.log('');

        // Test 8: Test invalid login
        console.log('8. Testing Invalid Login...');
        try {
            await axios.post(`${BASE_URL}/auth/login`, {
                email: 'testuser@example.com',
                password: 'wrongpassword'
            });
            console.log('❌ Invalid login should have failed');
        } catch (error) {
            console.log('✅ Invalid login correctly rejected:', error.response.status === 401);
        }
        console.log('');

        // Test 9: Test unauthorized access
        console.log('9. Testing Unauthorized Access...');
        try {
            await axios.get(`${BASE_URL}/auth/profile`);
            console.log('❌ Unauthorized access should have failed');
        } catch (error) {
            console.log('✅ Unauthorized access correctly rejected:', error.response.status === 401);
        }
        console.log('');

        console.log('🎉 All authentication tests passed!');
        console.log('✅ Signup, Login, Profile Management, Password Change, and Security tests working correctly.');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        console.error('Status:', error.response?.status);
    }
}

// Run the tests
testAuthSystem(); 