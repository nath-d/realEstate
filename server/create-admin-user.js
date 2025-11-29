const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdminUser() {
    const email = 'admin@mgconstructions.com';
    const password = 'Admin123!';
    const firstName = 'Admin';
    const lastName = 'User';

    try {
        // Check if admin user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.log('Admin user already exists with email:', email);
            
            // Update role to admin if not already
            if (existingUser.role !== 'admin') {
                await prisma.user.update({
                    where: { email },
                    data: { role: 'admin' }
                });
                console.log('Updated user role to admin');
            }
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin user
        const adminUser = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                role: 'admin',
                isEmailVerified: true, // Admin is pre-verified
            }
        });

        console.log('Admin user created successfully:');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role:', adminUser.role);
        console.log('\nYou can now use these credentials to log into the admin panel.');

    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();

