const axios = require('axios');
require('dotenv').config();

// Configuration
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';
const ADMIN_EMAIL = 'admin@mgconstructions.in'; // Update with your admin email
const ADMIN_PASSWORD = 'your_admin_password'; // Update with your admin password

async function testBulkEmailSystem() {
    console.log('🧪 Testing Bulk Email System for PDF Categories...\n');

    try {
        // Step 1: Login as admin to get JWT token
        console.log('1️⃣ Logging in as admin...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/signin`, {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        });

        if (!loginResponse.data.success) {
            throw new Error('Failed to login as admin');
        }

        const authToken = loginResponse.data.token;
        const authHeaders = { Authorization: `Bearer ${authToken}` };

        console.log('✅ Admin login successful\n');

        // Step 2: Check user count
        console.log('2️⃣ Checking user count for bulk email...');
        const userCountResponse = await axios.get(`${BASE_URL}/marketing/user-count`, { headers: authHeaders });
        
        if (userCountResponse.data.success) {
            console.log(`✅ ${userCountResponse.data.count} users available for bulk email`);
            console.log(`   ${userCountResponse.data.message}\n`);
        } else {
            console.log('❌ Failed to get user count\n');
        }

        // Step 3: Test Property Guide bulk email
        console.log('3️⃣ Testing Property Guide bulk email to all users...');
        try {
            const propertyGuideResponse = await axios.post(
                `${BASE_URL}/marketing/send-property-guide-all`, 
                {}, 
                { headers: authHeaders }
            );
            
            if (propertyGuideResponse.data.success) {
                console.log('✅ Property Guide emails sent successfully');
            } else {
                console.log('❌ Property Guide email failed:', propertyGuideResponse.data.message);
            }
        } catch (error) {
            console.log('❌ Property Guide email error:', error.response?.data?.message || error.message);
        }

        // Step 4: Test Investment Tips bulk email
        console.log('\n4️⃣ Testing Investment Tips bulk email to all users...');
        try {
            const investmentTipsResponse = await axios.post(
                `${BASE_URL}/marketing/send-investment-tips-all`, 
                {}, 
                { headers: authHeaders }
            );
            
            if (investmentTipsResponse.data.success) {
                console.log('✅ Investment Tips emails sent successfully');
            } else {
                console.log('❌ Investment Tips email failed:', investmentTipsResponse.data.message);
            }
        } catch (error) {
            console.log('❌ Investment Tips email error:', error.response?.data?.message || error.message);
        }

        // Step 5: Test Other category bulk email
        console.log('\n5️⃣ Testing Other category bulk email to all users...');
        try {
            const otherCategoryResponse = await axios.post(
                `${BASE_URL}/marketing/send-other-all`, 
                {}, 
                { headers: authHeaders }
            );
            
            if (otherCategoryResponse.data.success) {
                console.log('✅ Other category emails sent successfully');
            } else {
                console.log('❌ Other category email failed:', otherCategoryResponse.data.message);
            }
        } catch (error) {
            console.log('❌ Other category email error:', error.response?.data?.message || error.message);
        }

        console.log('\n📧 Bulk Email System Test Completed!');
        console.log('\n🔍 To verify emails were sent:');
        console.log('   - Check email server logs');
        console.log('   - Check recipient inboxes');
        console.log('   - Verify PDF attachments are included');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data?.message || error.message);
        console.error('\n💡 Make sure:');
        console.error('   - Server is running on the correct port');
        console.error('   - Admin credentials are correct');
        console.error('   - Database has users to send emails to (including unverified)');
        console.error('   - Email configuration is set up properly');
    }
}

// Run the test
console.log('Starting Bulk Email System Test...');
console.log('=====================================');
testBulkEmailSystem();
