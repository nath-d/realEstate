const API_BASE = 'http://localhost:3000';

async function testAchievementsAPI() {
    console.log('Testing Achievements API...\n');

    try {
        // Test GET /achievements
        console.log('1. Testing GET /achievements');
        const response = await fetch(`${API_BASE}/achievements`);
        const achievements = await response.json();
        console.log(`Status: ${response.status}`);
        console.log(`Found ${achievements.length} achievements`);
        console.log('First achievement:', achievements[0]);
        console.log('');

        // Test GET /achievements/:id
        if (achievements.length > 0) {
            console.log('2. Testing GET /achievements/:id');
            const firstId = achievements[0].id;
            const singleResponse = await fetch(`${API_BASE}/achievements/${firstId}`);
            const singleAchievement = await singleResponse.json();
            console.log(`Status: ${singleResponse.status}`);
            console.log('Single achievement:', singleAchievement);
            console.log('');
        }

        // Test POST /achievements
        console.log('3. Testing POST /achievements');
        const newAchievement = {
            title: "Test Achievement",
            description: "This is a test achievement",
            icon: "FaTrophy",
            category: "Test",
            year: "2024",
            stats: "Test Stats",
            order: 999,
            isActive: true
        };

        const createResponse = await fetch(`${API_BASE}/achievements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAchievement),
        });

        if (createResponse.ok) {
            const createdAchievement = await createResponse.json();
            console.log(`Status: ${createResponse.status}`);
            console.log('Created achievement:', createdAchievement);
            console.log('');

            // Test PUT /achievements/:id
            console.log('4. Testing PUT /achievements/:id');
            const updateData = {
                title: "Updated Test Achievement",
                stats: "Updated Stats"
            };

            const updateResponse = await fetch(`${API_BASE}/achievements/${createdAchievement.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (updateResponse.ok) {
                const updatedAchievement = await updateResponse.json();
                console.log(`Status: ${updateResponse.status}`);
                console.log('Updated achievement:', updatedAchievement);
                console.log('');

                // Test DELETE /achievements/:id
                console.log('5. Testing DELETE /achievements/:id');
                const deleteResponse = await fetch(`${API_BASE}/achievements/${createdAchievement.id}`, {
                    method: 'DELETE',
                });

                console.log(`Status: ${deleteResponse.status}`);
                console.log('Achievement deleted successfully');
            }
        }

    } catch (error) {
        console.error('Error testing API:', error);
    }
}

testAchievementsAPI();
