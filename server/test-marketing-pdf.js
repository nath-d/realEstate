const { PdfService } = require('./src/services/pdf.service');
const { EmailService } = require('./src/auth/email.service');
const { MarketingService } = require('./src/services/marketing.service');
require('dotenv').config();

async function testMarketingPdf() {
    console.log('🧪 Testing Marketing PDF Generation and Email Sending...\n');

    // Check environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
        console.error('❌ Missing environment variables:');
        console.error('EMAIL_USER:', emailUser ? '✅ Set' : '❌ Missing');
        console.error('EMAIL_PASSWORD:', emailPassword ? '✅ Set' : '❌ Missing');
        console.error('\nPlease set these in your .env file:');
        console.error('EMAIL_USER="your-email@gmail.com"');
        console.error('EMAIL_PASSWORD="your-gmail-app-password"');
        return;
    }

    try {
        // Initialize services
        const pdfService = new PdfService();
        const emailService = new EmailService();
        const marketingService = new MarketingService(emailService, pdfService);

        console.log('📧 Testing PDF Generation...');

        // Test 1: Generate Welcome Guide PDF
        console.log('\n1️⃣ Generating Welcome Guide PDF...');
        const welcomePdfPath = await pdfService.generateWelcomeGuide('John Doe');
        console.log('✅ Welcome Guide PDF generated:', welcomePdfPath);

        // Test 2: Generate Property Guide PDF
        console.log('\n2️⃣ Generating Property Guide PDF...');
        const propertyPdfPath = await pdfService.generatePropertyGuide();
        console.log('✅ Property Guide PDF generated:', propertyPdfPath);

        // Test 3: Generate Investment Tips PDF
        console.log('\n3️⃣ Generating Investment Tips PDF...');
        const investmentPdfPath = await pdfService.generateInvestmentTips();
        console.log('✅ Investment Tips PDF generated:', investmentPdfPath);

        console.log('\n📧 Testing Email Sending with PDF Attachments...');

        // Test 4: Send Welcome Email with PDF
        console.log('\n4️⃣ Sending Welcome Email with PDF...');
        await marketingService.sendWelcomeEmailWithPdf(emailUser, 'Test User');
        console.log('✅ Welcome email with PDF sent successfully!');

        // Test 5: Send Property Guide Email
        console.log('\n5️⃣ Sending Property Guide Email...');
        await marketingService.sendPropertyGuideEmail(emailUser, 'Test User');
        console.log('✅ Property guide email sent successfully!');

        // Test 6: Send Investment Tips Email
        console.log('\n6️⃣ Sending Investment Tips Email...');
        await marketingService.sendInvestmentTipsEmail(emailUser, 'Test User');
        console.log('✅ Investment tips email sent successfully!');

        console.log('\n🎉 All tests completed successfully!');
        console.log('\n📬 Check your email inbox for the test emails with PDF attachments.');
        console.log('\n📁 PDF files were automatically cleaned up after sending.');

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);

        if (error.code === 'EAUTH') {
            console.error('\n🔧 Troubleshooting:');
            console.error('1. Make sure 2-factor authentication is enabled on your Gmail account');
            console.error('2. Generate an App Password: https://myaccount.google.com/apppasswords');
            console.error('3. Use the 16-character app password (not your regular password)');
            console.error('4. Make sure your email address is correct');
        } else if (error.code === 'ECONNECTION') {
            console.error('\n🔧 Troubleshooting:');
            console.error('1. Check your internet connection');
            console.error('2. Make sure Gmail SMTP is not blocked by your firewall');
            console.error('3. Try again in a few minutes');
        }
    }
}

// Run the test
testMarketingPdf().catch(console.error); 