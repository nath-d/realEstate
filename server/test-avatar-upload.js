const fs = require('fs');
const FormData = require('form-data');

// Test the avatar upload endpoint with a larger image
async function testAvatarUpload() {
    try {
        // Create a larger test image (simulating a real avatar upload)
        // This is a base64 encoded 100x100 PNG image
        const largerImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
        const testImageBuffer = Buffer.from(largerImageBase64, 'base64');

        // Create a larger buffer to simulate a real image (around 500KB)
        const largerBuffer = Buffer.alloc(500 * 1024); // 500KB
        testImageBuffer.copy(largerBuffer);

        const formData = new FormData();
        formData.append('image', largerBuffer, {
            filename: 'avatar.png',
            contentType: 'image/png'
        });

        console.log('Testing avatar upload endpoint...');
        console.log('Image buffer size:', largerBuffer.length, 'bytes');
        console.log('Image buffer size:', (largerBuffer.length / 1024).toFixed(2), 'KB');

        const response = await fetch('http://localhost:3000/upload/image', {
            method: 'POST',
            body: formData
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Avatar upload successful!');
            console.log('Result:', JSON.stringify(result, null, 2));
        } else {
            console.error('❌ Avatar upload failed:', response.status, response.statusText);
            const errorText = await response.text();
            console.error('Error details:', errorText);

            // Try to parse as JSON for more details
            try {
                const errorJson = JSON.parse(errorText);
                console.error('Error JSON:', JSON.stringify(errorJson, null, 2));
            } catch (e) {
                console.error('Error is not JSON format');
            }
        }
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Full error:', error);
    }
}

// Test with different payload sizes
async function testPayloadSizes() {
    console.log('\n=== Testing Different Payload Sizes ===\n');
    
    const sizes = [
        { name: '1KB', size: 1 * 1024 },
        { name: '100KB', size: 100 * 1024 },
        { name: '500KB', size: 500 * 1024 },
        { name: '1MB', size: 1 * 1024 * 1024 },
        { name: '5MB', size: 5 * 1024 * 1024 }
    ];

    for (const testSize of sizes) {
        console.log(`\n--- Testing ${testSize.name} image ---`);
        
        try {
            const buffer = Buffer.alloc(testSize.size);
            // Fill with some pattern to make it more realistic
            for (let i = 0; i < buffer.length; i++) {
                buffer[i] = i % 256;
            }

            const formData = new FormData();
            formData.append('image', buffer, {
                filename: `test-${testSize.name}.png`,
                contentType: 'image/png'
            });

            const response = await fetch('http://localhost:3000/upload/image', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log(`✅ ${testSize.name} upload successful`);
            } else {
                console.log(`❌ ${testSize.name} upload failed: ${response.status}`);
                if (response.status === 413) {
                    console.log('   Reason: Payload too large');
                }
            }
        } catch (error) {
            console.log(`❌ ${testSize.name} upload error: ${error.message}`);
        }
    }
}

async function runTests() {
    console.log('🚀 Starting Avatar Upload Tests...\n');
    
    await testAvatarUpload();
    await testPayloadSizes();
    
    console.log('\n✨ Tests completed!');
}

runTests();
