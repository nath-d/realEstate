const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testContactForm() {
    console.log('Testing Contact Form Endpoint...');

    try {
        // Test creating a contact form
        const contactData = {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            subject: 'General Inquiry',
            message: 'This is a test message from the contact form.'
        };

        const response = await fetch(`${BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Contact form created successfully:', result);
        } else {
            console.log('❌ Failed to create contact form:', response.status);
        }

        // Test getting contact form stats
        const statsResponse = await fetch(`${BASE_URL}/contact/stats`);
        if (statsResponse.ok) {
            const stats = await statsResponse.json();
            console.log('✅ Contact form stats:', stats);
        } else {
            console.log('❌ Failed to get contact form stats:', statsResponse.status);
        }

    } catch (error) {
        console.error('❌ Error testing contact form:', error);
    }
}

async function testScheduleVisit() {
    console.log('\nTesting Schedule Visit Endpoint...');

    try {
        // Test creating a schedule visit
        const scheduleData = {
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+0987654321',
            preferredDate: new Date('2024-12-30T10:00:00Z'),
            preferredTime: '10:00 AM',
            message: 'I would like to schedule a viewing of the property.',
            preferredContact: 'email',
            propertyId: 1,
            propertyTitle: 'Luxury Villa'
        };

        const response = await fetch(`${BASE_URL}/schedule-visit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(scheduleData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Schedule visit created successfully:', result);
        } else {
            console.log('❌ Failed to create schedule visit:', response.status);
        }

        // Test getting schedule visit stats
        const statsResponse = await fetch(`${BASE_URL}/schedule-visit/stats`);
        if (statsResponse.ok) {
            const stats = await statsResponse.json();
            console.log('✅ Schedule visit stats:', stats);
        } else {
            console.log('❌ Failed to get schedule visit stats:', statsResponse.status);
        }

    } catch (error) {
        console.error('❌ Error testing schedule visit:', error);
    }
}

async function runTests() {
    console.log('🚀 Starting Form Endpoint Tests...\n');

    await testContactForm();
    await testScheduleVisit();

    console.log('\n✨ Tests completed!');
}

runTests(); 