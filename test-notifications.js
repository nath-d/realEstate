const BASE_URL = 'http://localhost:3000';

async function testNotifications() {
    console.log('\n🔔 Testing Video Chat Notifications...\n');

    try {
        // Test notification counts endpoint
        console.log('Testing notification counts...');
        const countsResponse = await fetch(`${BASE_URL}/schedule-video-chat/stats`);
        if (countsResponse.ok) {
            const stats = await countsResponse.json();
            console.log('✅ Video chat stats:', stats);
        } else {
            const error = await countsResponse.text();
            console.log('❌ Failed to get video chat stats:', countsResponse.status, error);
        }

        // Test fetching video chats for notifications
        console.log('\nTesting video chat list for notifications...');
        const listResponse = await fetch(`${BASE_URL}/schedule-video-chat`);
        if (listResponse.ok) {
            const videoChats = await listResponse.json();
            console.log('✅ Video chats retrieved:', videoChats.length, 'records');
            
            const pendingChats = videoChats.filter(chat => chat.status === 'pending');
            console.log('📋 Pending video chats for notifications:', pendingChats.length);
            
            if (pendingChats.length > 0) {
                console.log('📝 Sample pending video chat:');
                console.log(JSON.stringify(pendingChats[0], null, 2));
            }
        } else {
            const error = await listResponse.text();
            console.log('❌ Failed to get video chats:', listResponse.status, error);
        }

        // Create a test video chat to generate notifications
        console.log('\nCreating test video chat for notifications...');
        const testData = {
            name: 'Test User for Notifications',
            email: 'test@example.com',
            phone: '+1234567890',
            preferredDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
            preferredTime: '10:00 AM',
            platform: 'zoom',
            message: 'Test video chat for notification system',
            preferredContact: 'email',
            propertyTitle: 'Test Property for Notifications'
        };

        const createResponse = await fetch(`${BASE_URL}/schedule-video-chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testData),
        });

        if (createResponse.ok) {
            const result = await createResponse.json();
            console.log('✅ Test video chat created for notifications:', result.id);
        } else {
            const error = await createResponse.text();
            console.log('❌ Failed to create test video chat:', createResponse.status, error);
        }

    } catch (error) {
        console.error('❌ Error testing notifications:', error);
    }
}

testNotifications();
