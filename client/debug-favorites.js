// Debug script for favorites functionality
// Run this in the browser console after logging in

async function debugFavorites() {
    console.log('🔍 Debugging Favorites Functionality...\n');

    // Check 1: Authentication
    console.log('1. Checking Authentication...');
    const token = localStorage.getItem('mg_pacific_token');
    console.log('   Token exists:', !!token);
    if (token) {
        console.log('   Token length:', token.length);
    }

    // Check 2: Test API directly
    console.log('\n2. Testing API Directly...');
    if (token) {
        try {
            const response = await fetch(`${process.env.VITE_BACKEND_URL || 'http://localhost:3000'}/auth/favorites`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('   Response status:', response.status);
            if (response.ok) {
                const data = await response.json();
                console.log('   API Response:', data);
                console.log('   Properties count:', data.properties?.length || 0);
            } else {
                const errorData = await response.json();
                console.log('   API Error:', errorData);
            }
        } catch (error) {
            console.log('   API Error:', error.message);
        }
    }

    // Check 3: Test adding a property
    console.log('\n3. Testing Add to Favorites...');
    const testPropertyId = 1;
    if (token) {
        try {
            const response = await fetch(`${process.env.VITE_BACKEND_URL || 'http://localhost:3000'}/auth/favorites/${testPropertyId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('   Add response status:', response.status);
            const data = await response.json();
            console.log('   Add response:', data);
        } catch (error) {
            console.log('   Add error:', error.message);
        }
    }

    // Check 4: Check React Context
    console.log('\n4. Checking React Context...');
    if (window.React) {
        console.log('   React is available');
    } else {
        console.log('   React not available in global scope');
    }

    // Check 5: Look for FavoritesProvider
    console.log('\n5. Looking for FavoritesProvider...');
    const providers = document.querySelectorAll('[data-testid="favorites-provider"]');
    console.log('   FavoritesProvider elements found:', providers.length);

    // Check 6: Check if any heart buttons exist
    console.log('\n6. Checking Heart Buttons...');
    const heartButtons = document.querySelectorAll('button svg, .fa-heart');
    console.log('   Heart buttons found:', heartButtons.length);

    // Check 7: Test authService directly
    console.log('\n7. Testing authService...');
    if (window.authService) {
        console.log('   authService available globally');
        try {
            const result = await window.authService.getFavoriteProperties();
            console.log('   getFavoriteProperties result:', result);
        } catch (error) {
            console.log('   getFavoriteProperties error:', error);
        }
    } else {
        console.log('   authService not available globally');
    }

    console.log('\n🎯 Debug Summary:');
    console.log('- Check the console logs above for any errors');
    console.log('- Look for "FavoritesContext:" logs to see state changes');
    console.log('- Verify the API endpoints are responding correctly');
    console.log('- Check if the heart buttons are being clicked');
}

// Run the debug
console.log('🚀 Starting Favorites Debug...\n');
debugFavorites().catch(console.error);

// Export for manual testing
window.debugFavorites = debugFavorites; 