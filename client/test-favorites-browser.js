// Browser-based test script for favorites functionality
// Run this in the browser console after logging in

async function testFavoritesFunctionality() {
    console.log('🧪 Testing Favorites Functionality in Browser...\n');

    // Test 1: Check if user is authenticated
    console.log('1. Testing Authentication Check...');
    const token = localStorage.getItem('token');
    if (token) {
        console.log('✅ User is authenticated');
    } else {
        console.log('❌ User is not authenticated - please log in first');
        return;
    }

    // Test 2: Get favorite properties
    console.log('\n2. Testing Get Favorite Properties...');
    try {
        const response = await fetch('http://localhost:3001/api/auth/favorites', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            console.log(`✅ Successfully retrieved ${result.properties.length} favorite properties`);
            result.properties.forEach(prop => {
                console.log(`   - ${prop.title} (ID: ${prop.id})`);
            });
        } else {
            console.log(`❌ Failed to get favorites: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.log(`❌ Error getting favorites: ${error.message}`);
    }

    // Test 3: Check if a specific property is in favorites
    console.log('\n3. Testing Property Favorite Status Check...');
    const testPropertyId = 1; // Change this to a real property ID
    try {
        const response = await fetch(`http://localhost:3001/api/auth/favorites/check/${testPropertyId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            console.log(`✅ Property ${testPropertyId} favorite status: ${result.isFavorite ? 'Favorited' : 'Not favorited'}`);
        } else {
            console.log(`❌ Failed to check favorite status: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.log(`❌ Error checking favorite status: ${error.message}`);
    }

    // Test 4: Add property to favorites
    console.log('\n4. Testing Add to Favorites...');
    try {
        const response = await fetch('http://localhost:3001/api/auth/favorites', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ propertyId: testPropertyId })
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Successfully added property to favorites');

            // Verify it was added
            const checkResponse = await fetch(`http://localhost:3001/api/auth/favorites/check/${testPropertyId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (checkResponse.ok) {
                const checkResult = await checkResponse.json();
                console.log(`✅ Verification: Property is now ${checkResult.isFavorite ? 'favorited' : 'not favorited'}`);
            }
        } else {
            console.log(`❌ Failed to add to favorites: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.log(`❌ Error adding to favorites: ${error.message}`);
    }

    // Test 5: Remove property from favorites
    console.log('\n5. Testing Remove from Favorites...');
    try {
        const response = await fetch(`http://localhost:3001/api/auth/favorites/${testPropertyId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Successfully removed property from favorites');

            // Verify it was removed
            const checkResponse = await fetch(`http://localhost:3001/api/auth/favorites/check/${testPropertyId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (checkResponse.ok) {
                const checkResult = await checkResponse.json();
                console.log(`✅ Verification: Property is now ${checkResult.isFavorite ? 'still favorited' : 'not favorited'}`);
            }
        } else {
            console.log(`❌ Failed to remove from favorites: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.log(`❌ Error removing from favorites: ${error.message}`);
    }

    // Test 6: Test error handling for invalid property ID
    console.log('\n6. Testing Error Handling...');
    try {
        const response = await fetch('http://localhost:3001/api/auth/favorites', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ propertyId: 999999 })
        });

        if (response.ok) {
            console.log('⚠️  Unexpected success with invalid property ID');
        } else {
            console.log('✅ Properly handled invalid property ID');
        }
    } catch (error) {
        console.log('✅ Properly caught error for invalid property ID');
    }

    console.log('\n🎉 Favorites functionality test completed!');
    console.log('\n📋 Manual Testing Checklist:');
    console.log('1. Open the website and log in');
    console.log('2. Go to property listings page');
    console.log('3. Click heart icon on a property card');
    console.log('4. Verify heart turns red and fills');
    console.log('5. Go to property details page');
    console.log('6. Verify heart shows as favorited');
    console.log('7. Click heart to remove from favorites');
    console.log('8. Verify heart returns to normal state');
    console.log('9. Go to Favorites page from navbar');
    console.log('10. Verify property appears in favorites list');
    console.log('11. Click remove button on favorites page');
    console.log('12. Verify property is removed from list');
    console.log('13. Refresh page and verify state persists');
}

// Test React Context functionality
function testReactContext() {
    console.log('\n🔧 Testing React Context...');

    // Check if FavoritesContext is available
    if (window.React && window.React.useContext) {
        console.log('✅ React Context is available');
    } else {
        console.log('❌ React Context not available');
    }

    // Check if FavoritesProvider is mounted
    const favoritesElements = document.querySelectorAll('[data-testid="favorites-provider"]');
    if (favoritesElements.length > 0) {
        console.log('✅ FavoritesProvider is mounted');
    } else {
        console.log('⚠️  FavoritesProvider not found (this is normal if not using data-testid)');
    }
}

// Run all tests
console.log('🚀 Starting Favorites Functionality Tests...\n');
testFavoritesFunctionality();
testReactContext();

// Export for manual testing
window.testFavorites = testFavoritesFunctionality;
window.testReactContext = testReactContext; 