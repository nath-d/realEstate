const BASE_URL = 'http://localhost:3000';

async function testVideoChat() {
    console.log('\nTesting Video Chat Endpoint...');

    try {
        // Test creating a video chat
        const videoChatData = {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            preferredDate: new Date('2024-12-30T14:00:00Z'),
            preferredTime: '2:00 PM',
            message: 'I would like to schedule a virtual tour of the property.',
            preferredContact: 'email',
            platform: 'zoom',
            propertyId: 1,
            propertyTitle: 'Luxury Villa'
        };

        console.log('Testing POST /schedule-video-chat...');
        const response = await fetch(`${BASE_URL}/schedule-video-chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(videoChatData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Video chat created successfully:', result);
        } else {
            const error = await response.text();
            console.log('❌ Failed to create video chat:', response.status, error);
        }

        // Test getting video chat stats
        console.log('\nTesting GET /schedule-video-chat/stats...');
        const statsResponse = await fetch(`${BASE_URL}/schedule-video-chat/stats`);
        if (statsResponse.ok) {
            const stats = await statsResponse.json();
            console.log('✅ Video chat stats:', stats);
        } else {
            const error = await statsResponse.text();
            console.log('❌ Failed to get video chat stats:', statsResponse.status, error);
        }

        // Test getting all video chats
        console.log('\nTesting GET /schedule-video-chat...');
        const listResponse = await fetch(`${BASE_URL}/schedule-video-chat`);
        if (listResponse.ok) {
            const videoChats = await listResponse.json();
            console.log('✅ Video chats retrieved:', videoChats.length, 'records');
        } else {
            const error = await listResponse.text();
            console.log('❌ Failed to get video chats:', listResponse.status, error);
        }

    } catch (error) {
        console.error('❌ Error testing video chat:', error);
    }
}

async function runTests() {
    console.log('🚀 Starting Video Chat Endpoint Tests...\n');
    await testVideoChat();
    console.log('\n✨ Tests completed!');
}

runTests();

