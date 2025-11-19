// Test script to verify favorites fixes
// Run this in the browser console after logging in

async function testFavoritesFixes() {
    console.log('🧪 Testing Favorites Fixes...\n');

    // Test 1: Check if user is authenticated
    console.log('1. Testing Authentication Check...');
    const token = localStorage.getItem('mg_pacific_token');
    if (token) {
        console.log('✅ User is authenticated');
    } else {
        console.log('❌ User is not authenticated - please log in first');
        return;
    }

    // Test 2: Test the new GET favorites endpoint
    console.log('\n2. Testing GET Favorites Endpoint...');
    try {
        const response = await fetch('http://localhost:3001/auth/favorites', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            console.log(`✅ Successfully retrieved ${result.properties.length} favorite properties`);
            result.properties.forEach(prop => {
                console.log(`   - ${prop.title || 'No title'} (ID: ${prop.id})`);
            });
        } else {
            console.log(`❌ Failed to get favorites: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.log(`❌ Error getting favorites: ${error.message}`);
    }

    // Test 3: Test adding a property to favorites
    console.log('\n3. Testing Add to Favorites...');
    const testPropertyId = 1; // Change this to a real property ID
    try {
        const response = await fetch(`http://localhost:3001/auth/favorites/${testPropertyId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Successfully added property to favorites');
            console.log(`   Message: ${result.message}`);
        } else {
            const errorData = await response.json();
            console.log(`❌ Failed to add to favorites: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.log(`❌ Error adding to favorites: ${error.message}`);
    }

    // Test 4: Test removing a property from favorites
    console.log('\n4. Testing Remove from Favorites...');
    try {
        const response = await fetch(`http://localhost:3001/auth/favorites/${testPropertyId}/remove`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Successfully removed property from favorites');
            console.log(`   Message: ${result.message}`);
        } else {
            const errorData = await response.json();
            console.log(`❌ Failed to remove from favorites: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.log(`❌ Error removing from favorites: ${error.message}`);
    }

    console.log('\n🎉 Favorites fixes test completed!');
    console.log('\n📋 Manual Testing Checklist:');
    console.log('1. Open the website and log in');
    console.log('2. Go to property listings page');
    console.log('3. Click heart icon on a property card');
    console.log('4. Verify heart turns red and fills (no "not allowed" cursor)');
    console.log('5. Navigate to property details page');
    console.log('6. Verify heart shows as favorited');
    console.log('7. Click heart to remove from favorites');
    console.log('8. Verify heart returns to normal state');
    console.log('9. Go to Favorites page from navbar');
    console.log('10. Verify property appears in favorites list');
    console.log('11. Click remove button on favorites page');
    console.log('12. Verify property is removed from list');
    console.log('13. Refresh page and verify state persists');
}

// Run the test
console.log('🚀 Starting Favorites Fixes Test...\n');
testFavoritesFixes().catch(console.error);

// Export for manual testing
window.testFavoritesFixes = testFavoritesFixes; 