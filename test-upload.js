const fs = require('fs');
const FormData = require('form-data');

// Test the upload endpoint
async function testUpload() {
    try {
        // Create a simple test image (1x1 pixel PNG)
        const testImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

        const formData = new FormData();
        formData.append('image', testImageBuffer, {
            filename: 'test.png',
            contentType: 'image/png'
        });

        console.log('Testing upload endpoint...');
        console.log('FormData created with image buffer of size:', testImageBuffer.length);

        const response = await fetch('http://localhost:3000/upload/image', {
            method: 'POST',
            body: formData
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (response.ok) {
            const result = await response.json();
            console.log('Upload successful:', JSON.stringify(result, null, 2));
        } else {
            console.error('Upload failed:', response.status, response.statusText);
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
        console.error('Test failed:', error.message);
        console.error('Full error:', error);
    }
}

testUpload(); 