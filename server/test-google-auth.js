const axios = require('axios');

async function testGoogleAuth() {
    try {
        console.log('Testing Google OAuth endpoints...\n');

        // Test the Google auth initiation endpoint
        console.log('1. Testing Google auth initiation endpoint...');
        const authUrl = 'http://localhost:3000/auth/google';

        try {
            const response = await axios.get(authUrl, {
                maxRedirects: 0,
                validateStatus: function (status) {
                    return status >= 200 && status < 400; // Accept redirects
                }
            });
            console.log('✅ Google auth initiation successful');
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
        } catch (error) {
            if (error.response && error.response.status === 302) {
                console.log('✅ Google auth initiation successful (redirect detected)');
                console.log('Redirect location:', error.response.headers.location);
            } else {
                console.log('❌ Google auth initiation failed');
                console.log('Error:', error.message);
            }
        }

        console.log('\n2. Testing server health...');
        try {
            const healthResponse = await axios.get('http://localhost:3000');
            console.log('✅ Server is running and responding');
            console.log('Response status:', healthResponse.status);
        } catch (error) {
            console.log('❌ Server health check failed');
            console.log('Error:', error.message);
        }

        console.log('\n3. Environment check...');
        console.log('Make sure you have the following environment variables set:');
        console.log('- GOOGLE_CLIENT_ID');
        console.log('- GOOGLE_CLIENT_SECRET');
        console.log('- GOOGLE_CALLBACK_URL');
        console.log('- JWT_SECRET');
        console.log('- DATABASE_URL');

        console.log('\n4. To test the full flow:');
        console.log('1. Open your browser and go to: http://localhost:3000/auth/google');
        console.log('2. Complete the Google OAuth flow');
        console.log('3. Check the server logs for any errors');
        console.log('4. You should be redirected to: http://localhost:5173/auth/callback?token=...');

    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

testGoogleAuth(); 