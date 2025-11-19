// Test script for favorites functionality
const authService = require('./src/services/authService.js');

async function testFavoritesFunctionality() {
    console.log('🧪 Testing Favorites Functionality...\n');

    // Test 1: Check if user is authenticated
    console.log('1. Testing Authentication Check...');
    const token = authService.getToken();
    if (token) {
        console.log('✅ User is authenticated');
    } else {
        console.log('❌ User is not authenticated - please log in first');
        return;
    }

    // Test 2: Get favorite properties
    console.log('\n2. Testing Get Favorite Properties...');
    try {
        const result = await authService.getFavoriteProperties();
        if (result.success) {
            console.log(`✅ Successfully retrieved ${result.properties.length} favorite properties`);
            result.properties.forEach(prop => {
                console.log(`   - ${prop.title} (ID: ${prop.id})`);
            });
        } else {
            console.log(`❌ Failed to get favorites: ${result.error}`);
        }
    } catch (error) {
        console.log(`❌ Error getting favorites: ${error.message}`);
    }

    // Test 3: Check if a specific property is in favorites
    console.log('\n3. Testing Property Favorite Status Check...');
    const testPropertyId = 1; // Change this to a real property ID
    try {
        const isFavorite = await authService.isPropertyFavorite(testPropertyId);
        console.log(`✅ Property ${testPropertyId} favorite status: ${isFavorite ? 'Favorited' : 'Not favorited'}`);
    } catch (error) {
        console.log(`❌ Error checking favorite status: ${error.message}`);
    }

    // Test 4: Add property to favorites
    console.log('\n4. Testing Add to Favorites...');
    try {
        const addResult = await authService.addToFavorites(testPropertyId);
        if (addResult.success) {
            console.log('✅ Successfully added property to favorites');

            // Verify it was added
            const isNowFavorite = await authService.isPropertyFavorite(testPropertyId);
            console.log(`✅ Verification: Property is now ${isNowFavorite ? 'favorited' : 'not favorited'}`);
        } else {
            console.log(`❌ Failed to add to favorites: ${addResult.error}`);
        }
    } catch (error) {
        console.log(`❌ Error adding to favorites: ${error.message}`);
    }

    // Test 5: Remove property from favorites
    console.log('\n5. Testing Remove from Favorites...');
    try {
        const removeResult = await authService.removeFromFavorites(testPropertyId);
        if (removeResult.success) {
            console.log('✅ Successfully removed property from favorites');

            // Verify it was removed
            const isStillFavorite = await authService.isPropertyFavorite(testPropertyId);
            console.log(`✅ Verification: Property is now ${isStillFavorite ? 'still favorited' : 'not favorited'}`);
        } else {
            console.log(`❌ Failed to remove from favorites: ${removeResult.error}`);
        }
    } catch (error) {
        console.log(`❌ Error removing from favorites: ${error.message}`);
    }

    // Test 6: Test error handling for invalid property ID
    console.log('\n6. Testing Error Handling...');
    try {
        const invalidResult = await authService.addToFavorites(999999);
        if (invalidResult.success) {
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

// Run the test
testFavoritesFunctionality().catch(console.error); 