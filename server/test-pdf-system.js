const axios = require('axios');

async function testPDFSystem() {
    try {
        console.log('Testing PDF system...');

        // Test 1: List PDFs
        console.log('\n1. Testing PDF list...');
        const listResponse = await axios.get('http://localhost:3000/pdfs/list');
        console.log('PDFs in database:', listResponse.data.pdfs.length);
        listResponse.data.pdfs.forEach(pdf => {
            console.log(`- ${pdf.name} (${pdf.category})`);
        });

        // Test 2: Check if welcome-guide PDFs exist
        console.log('\n2. Checking for welcome-guide PDFs...');
        const welcomePDFs = listResponse.data.pdfs.filter(pdf => pdf.category === 'welcome-guide');
        console.log(`Found ${welcomePDFs.length} welcome-guide PDFs`);

        if (welcomePDFs.length === 0) {
            console.log('❌ No welcome-guide PDFs found! Upload one in the admin panel.');
            console.log('Expected: At least one PDF with category "welcome-guide"');
        } else {
            console.log('✅ Welcome-guide PDFs found!');
        }

        // Test 3: Test marketing service endpoint (if available)
        console.log('\n3. Testing marketing endpoints...');
        try {
            const marketingResponse = await axios.post('http://localhost:3000/auth/marketing/send-welcome', {
                email: 'test@example.com',
                firstName: 'Test'
            });
            console.log('Marketing endpoint response:', marketingResponse.data);
        } catch (error) {
            console.log('Marketing endpoint not available or error:', error.response?.data || error.message);
        }

    } catch (error) {
        console.error('Test failed:', error.response?.data || error.message);
    }
}

testPDFSystem(); 