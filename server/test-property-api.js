// Simple test script to verify the property API
const testProperty = {
    title: "Test Property",
    description: "A test property for API verification",
    price: 500000,
    type: "house",
    status: "for sale",
    bedrooms: 3,
    bathrooms: 2.5,
    garage: 1,
    lotSize: "5000 sq ft",
    livingArea: "2500 sq ft",
    yearBuilt: 2020,
    featured: true,
    images: {
        create: [
            { url: "https://example.com/test-image1.jpg" },
            { url: "https://example.com/test-image2.jpg" }
        ]
    },
    location: {
        create: {
            latitude: 34.0522,
            longitude: -118.2437,
            address: "123 Test Street",
            city: "Test City",
            state: "CA",
            zipCode: "90210"
        }
    }
};

async function testPropertyAPI() {
    try {
        console.log('Testing Property API...');

        // Test creating a property
        console.log('\n1. Creating a property...');
        const createResponse = await fetch('http://localhost:3000/properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testProperty),
        });

        if (!createResponse.ok) {
            const errorData = await createResponse.json();
            console.error('Create failed:', errorData);
            return;
        }

        const createdProperty = await createResponse.json();
        console.log('✅ Property created successfully:', createdProperty.id);

        // Test fetching all properties
        console.log('\n2. Fetching all properties...');
        const fetchResponse = await fetch('http://localhost:3000/properties');
        const properties = await fetchResponse.json();
        console.log(`✅ Found ${properties.length} properties`);

        // Test fetching the specific property
        console.log('\n3. Fetching specific property...');
        const getResponse = await fetch(`http://localhost:3000/properties/${createdProperty.id}`);
        const property = await getResponse.json();
        console.log('✅ Property fetched:', property.title);

        // Test updating the property
        console.log('\n4. Updating property...');
        const updateData = {
            price: 550000,
            status: "for rent",
            images: {
                deleteMany: {},
                create: [{ url: "https://example.com/updated-image.jpg" }]
            }
        };

        const updateResponse = await fetch(`http://localhost:3000/properties/${createdProperty.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (!updateResponse.ok) {
            const errorData = await updateResponse.json();
            console.error('Update failed:', errorData);
            return;
        }

        const updatedProperty = await updateResponse.json();
        console.log('✅ Property updated successfully:', updatedProperty.price);

        // Test deleting the property
        console.log('\n5. Deleting property...');
        const deleteResponse = await fetch(`http://localhost:3000/properties/${createdProperty.id}`, {
            method: 'DELETE',
        });

        if (deleteResponse.ok) {
            console.log('✅ Property deleted successfully');
        } else {
            console.error('❌ Delete failed');
        }

        console.log('\n🎉 All tests passed!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test if this script is executed directly
if (typeof window === 'undefined') {
    testPropertyAPI();
}

module.exports = { testPropertyAPI }; 