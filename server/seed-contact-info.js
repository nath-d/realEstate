const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedContactInfo() {
    try {
        console.log('🌱 Seeding contact information...');

        // Check if contact info already exists
        const existingContactInfo = await prisma.contactInfo.findFirst();
        
        if (existingContactInfo) {
            console.log('📋 Contact information already exists. Updating...');
            
            await prisma.contactInfo.update({
                where: { id: existingContactInfo.id },
                data: {
                    phoneNumbers: ["+91 9748853901", "+91 7449664398"],
                    emails: ["mgconstructions1995@gmail.com"],
                    officeAddress: "285, Gopal Misra Road, Behala",
                    officeCity: "Kolkata",
                    officeState: "West Bengal",
                    officeZipCode: "700034",
                    businessHours: [
                        "Mon - Thu: 9:30 am – 8:30 pm",
                        "Fri - Sun: Open 24 hours"
                    ],
                    locationCity: "Kolkata",
                    locationAddress: "285, Gopal Misra Road, Behala",
                    locationState: "Kolkata 700034",
                    locationPhone: "+91 9748853901",
                    locationEmail: "mgconstructions1995@gmail.com",
                    locationImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    latitude: 22.4707,
                    longitude: 88.3103,
                    facebookUrl: "https://facebook.com/mgpacificestates",
                    twitterUrl: "https://twitter.com/mgpacificestates",
                    instagramUrl: "https://instagram.com/mgpacificestates",
                    linkedinUrl: "https://linkedin.com/company/mgpacificestates",
                    whatsappUrl: "https://wa.me/919748853901",
                    heroTitle: "Contact Us",
                    heroSubtitle: "Get in touch with our team of real estate experts",
                    heroBackgroundUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
                    isActive: true
                }
            });
            
            console.log('✅ Contact information updated successfully!');
        } else {
            console.log('📋 Creating new contact information...');
            
            await prisma.contactInfo.create({
                data: {
                    phoneNumbers: ["+91 9748853901", "+91 7449664398"],
                    emails: ["mgconstructions1995@gmail.com"],
                    officeAddress: "285, Gopal Misra Road, Behala",
                    officeCity: "Kolkata",
                    officeState: "West Bengal",
                    officeZipCode: "700034",
                    businessHours: [
                        "Mon - Thu: 9:30 am – 8:30 pm",
                        "Fri - Sun: Open 24 hours"
                    ],
                    locationCity: "Kolkata",
                    locationAddress: "285, Gopal Misra Road, Behala",
                    locationState: "Kolkata 700034",
                    locationPhone: "+91 9748853901",
                    locationEmail: "mgconstructions1995@gmail.com",
                    locationImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                    latitude: 22.4707,
                    longitude: 88.3103,
                    facebookUrl: "https://facebook.com/mgpacificestates",
                    twitterUrl: "https://twitter.com/mgpacificestates",
                    instagramUrl: "https://instagram.com/mgpacificestates",
                    linkedinUrl: "https://linkedin.com/company/mgpacificestates",
                    whatsappUrl: "https://wa.me/919748853901",
                    heroTitle: "Contact Us",
                    heroSubtitle: "Get in touch with our team of real estate experts",
                    heroBackgroundUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
                    isActive: true
                }
            });
            
            console.log('✅ Contact information created successfully!');
        }

    } catch (error) {
        console.error('❌ Error seeding contact information:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run the seed function
if (require.main === module) {
    seedContactInfo()
        .then(() => {
            console.log('🎉 Contact information seeding completed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Contact information seeding failed:', error);
            process.exit(1);
        });
}

module.exports = seedContactInfo;






