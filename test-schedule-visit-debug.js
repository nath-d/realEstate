const fetch = require('node-fetch');

async function testScheduleVisit() {
    try {
        console.log('Testing schedule visit endpoint...');

        const testData = {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            preferredDate: new Date('2024-12-25T10:00:00Z'),
            preferredTime: '10:00 AM',
            message: 'Test visit request',
            preferredContact: 'email',
            propertyId: 1,
            propertyTitle: 'Test Property'
        };

        console.log('Sending data:', JSON.stringify(testData, null, 2));

        const response = await fetch('http://localhost:3000/schedule-visit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData),
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers.raw());

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
        } else {
            const result = await response.json();
            console.log('Success response:', result);
        }
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testScheduleVisit(); 