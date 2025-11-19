const nodemailer = require('nodemailer');
require('dotenv').config();

async function testNodemailer() {
    console.log('Testing Nodemailer setup...');

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

    console.log('✅ Environment variables found');
    console.log('📧 Email User:', emailUser);
    console.log('🔑 Email Password:', emailPassword ? '***' + emailPassword.slice(-4) : 'Not set');

    // Create transporter
    const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: emailUser,
            pass: emailPassword,
        },
    });

    // Verify connection
    try {
        console.log('\n🔍 Verifying Gmail connection...');
        await transporter.verify();
        console.log('✅ Gmail connection verified successfully!');

        // Send test email
        console.log('\n📤 Sending test email...');
        const testEmail = {
            from: emailUser,
            to: emailUser, // Send to yourself for testing
            subject: 'Test Email - Real Estate Platform',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">🏠 Real Estate Platform</h1>
                            <p style="color: #7f8c8d; margin: 10px 0 0 0;">Nodemailer Test</p>
                        </div>
                        
                        <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">Test Email</h2>
                        
                        <p style="color: #34495e; line-height: 1.6; margin-bottom: 25px;">
                            This is a test email to verify that Nodemailer is working correctly with Gmail SMTP.
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; display: inline-block; font-size: 24px; font-weight: bold;">
                                ✅ SUCCESS
                            </div>
                        </div>
                        
                        <p style="color: #7f8c8d; font-size: 14px; text-align: center; margin: 20px 0;">
                            If you received this email, your Nodemailer setup is working perfectly!
                        </p>
                        
                        <hr style="border: none; border-top: 1px solid #ecf0f1; margin: 30px 0;">
                        
                        <p style="color: #7f8c8d; font-size: 12px; text-align: center; margin: 0;">
                            Sent at: ${new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            `,
        };

        const info = await transporter.sendMail(testEmail);
        console.log('✅ Test email sent successfully!');
        console.log('📧 Message ID:', info.messageId);
        console.log('📬 Check your inbox for the test email');

    } catch (error) {
        console.error('❌ Error:', error.message);

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
testNodemailer().catch(console.error); 