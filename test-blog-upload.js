const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

// Test the blog image upload endpoint
async function testUpload() {
    try {
        console.log('Testing image upload...');

        // Check if the image file exists
        const imagePath = './client/public/hero1.jpg';
        if (!fs.existsSync(imagePath)) {
            console.error('Image file not found:', imagePath);
            return;
        }

        // Create form data
        const formData = new FormData();

        // Add the image file with the correct field name
        const imageStream = fs.createReadStream(imagePath);
        formData.append('image', imageStream, {
            filename: 'hero1.jpg',
            contentType: 'image/jpeg'
        });

        console.log('Sending upload request...');
        console.log('Form data headers:', formData.getHeaders());

        // Send the request
        const response = await axios.post('http://localhost:3000/upload/image', formData, {
            headers: {
                ...formData.getHeaders(),
            },
            timeout: 30000,
        });

        console.log('Upload successful!');
        console.log('Response:', response.data);

        // Test creating a blog with the uploaded image
        if (response.data.success && response.data.data.url) {
            console.log('\nTesting blog creation with uploaded image...');

            const blogData = {
                title: 'Test Blog with Image',
                content: 'This is a test blog post with an uploaded image.',
                excerpt: 'Test excerpt',
                featuredImage: response.data.data.url,
                status: 'published',
                authorId: 1,
                categoryId: 1,
                tags: ['test', 'image'],
                metaTitle: 'Test Blog',
                metaDescription: 'Test blog description'
            };

            const blogResponse = await axios.post('http://localhost:3000/blogs', blogData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Blog created successfully!');
            console.log('Blog response:', blogResponse.data);
        }

    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

// Run the test
testUpload(); 