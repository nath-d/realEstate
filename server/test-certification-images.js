const axios = require('axios');

// Test the material certification image upload functionality
async function testCertificationImages() {
    try {
        console.log('Testing Material Certification Image Upload...\n');

        // Test creating a property with material certifications that include images
        const testProperty = {
            title: "Test Property with Certification Images",
            description: "A test property to verify material certification image uploads",
            price: 500000,
            type: "house",
            status: "for sale",
            featured: false,
            bedrooms: 3,
            bathrooms: 2,
            garage: 1,
            lotSize: "5000 sq ft",
            livingArea: "2500 sq ft",
            yearBuilt: 2020,
            images: {
                create: [
                    { url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" }
                ]
            },
            specifications: {
                create: [{
                    structure: ["RCC Frame"],
                    brickwork: ["Red Brick"],
                    windows: ["UPVC"],
                    externalFinish: ["Paint"],
                    interiorFinish: ["Wallpaper"],
                    doors: ["Wooden"],
                    flooring: ["Marble"],
                    kitchen: ["Modular"],
                    washroom: ["Modern Fittings"],
                    elevator: ["None"],
                    electricity: ["3 Phase"],
                    waterSupply: ["24/7"]
                }]
            },
            materialCertifications: {
                create: [
                    {
                        material: "Cement",
                        brand: "UltraTech Cement",
                        certificate: "ISO 9001:2015",
                        description: "Premium quality cement meeting international standards",
                        verified: true,
                        imageUrl: "https://images.unsplash.com/photo-1744132813635-128ed5004f65?w=800"
                    },
                    {
                        material: "Steel Rods",
                        brand: "TATA Tiscon",
                        certificate: "BIS 1786:2008",
                        description: "High-strength TMT bars ensuring structural integrity",
                        verified: true,
                        imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800"
                    }
                ]
            },
            pois: {
                create: [
                    {
                        name: "Central Park",
                        type: "park",
                        latitude: 22.4736,
                        longitude: 88.3607,
                        distance: 500
                    }
                ]
            },
            location: {
                create: {
                    latitude: 22.4736,
                    longitude: 88.3607,
                    address: "123 Test Street",
                    city: "Kolkata",
                    state: "West Bengal",
                    zipCode: "700001"
                }
            }
        };

        console.log('Creating test property with certification images...');
        const createResponse = await axios.post('http://localhost:3000/properties', testProperty);
        console.log('✅ Property created successfully!');
        console.log('Property ID:', createResponse.data.id);
        console.log('Material Certifications:', createResponse.data.materialCertifications.length);

        // Display certification details
        createResponse.data.materialCertifications.forEach((cert, index) => {
            console.log(`\nCertification ${index + 1}:`);
            console.log(`  Material: ${cert.material}`);
            console.log(`  Brand: ${cert.brand}`);
            console.log(`  Certificate: ${cert.certificate}`);
            console.log(`  Image URL: ${cert.imageUrl || 'No image'}`);
        });

        // Test fetching the property to verify images are saved
        console.log('\nFetching property to verify images are saved...');
        const fetchResponse = await axios.get(`http://localhost:3000/properties/${createResponse.data.id}`);
        console.log('✅ Property fetched successfully!');
        console.log('Certification images saved:', fetchResponse.data.materialCertifications.every(cert => cert.imageUrl));

        // Test updating a certification image
        console.log('\nTesting certification image update...');
        const updateData = {
            ...testProperty,
            materialCertifications: {
                deleteMany: {},
                create: [
                    {
                        material: "Cement",
                        brand: "UltraTech Cement",
                        certificate: "ISO 9001:2015",
                        description: "Premium quality cement meeting international standards",
                        verified: true,
                        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800" // Updated image
                    }
                ]
            }
        };

        const updateResponse = await axios.put(`http://localhost:3000/properties/${createResponse.data.id}`, updateData);
        console.log('✅ Property updated successfully!');
        console.log('Updated certification image:', updateResponse.data.materialCertifications[0].imageUrl);

        // Clean up - delete the test property
        console.log('\nCleaning up test property...');
        await axios.delete(`http://localhost:3000/properties/${createResponse.data.id}`);
        console.log('✅ Test property deleted successfully!');

        console.log('\n🎉 All tests passed! Material certification image upload is working correctly.');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Run the test
testCertificationImages(); 