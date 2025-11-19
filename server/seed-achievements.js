const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const achievements = [
    {
        title: "Premium Cement Certification",
        description: "ISO 9001:2015 certified cement from leading manufacturers",
        icon: "FaCertificate",
        category: "Materials",
        year: "2024",
        stats: "Grade 53 OPC",
        order: 0,
        isActive: true
    },
    {
        title: "Steel Quality Assurance",
        description: "TMT bars certified by Bureau of Indian Standards (BIS)",
        icon: "FaShieldAlt",
        category: "Structural",
        year: "2024",
        stats: "Fe 500D Grade",
        order: 1,
        isActive: true
    },
    {
        title: "Sand Quality Control",
        description: "IS 383 certified river sand and M-sand",
        icon: "FaCheckCircle",
        category: "Materials",
        year: "2024",
        stats: "Zone II",
        order: 2,
        isActive: true
    },
    {
        title: "Brick Standards",
        description: "IS 12894 certified fly ash bricks",
        icon: "FaMedal",
        category: "Materials",
        year: "2024",
        stats: "Class 1",
        order: 3,
        isActive: true
    },
    {
        title: "Paint Certification",
        description: "ISI marked premium quality paints",
        icon: "FaStar",
        category: "Finishing",
        year: "2024",
        stats: "IS 15489",
        order: 4,
        isActive: true
    },
    {
        title: "Electrical Standards",
        description: "ISI certified electrical fittings and wires",
        icon: "FaAward",
        category: "Electrical",
        year: "2024",
        stats: "IS 694",
        order: 5,
        isActive: true
    }
];

async function seedAchievements() {
    try {
        console.log('Starting to seed achievements...');

        // Clear existing achievements
        await prisma.achievement.deleteMany({});

        // Insert new achievements
        for (const achievement of achievements) {
            await prisma.achievement.create({
                data: achievement
            });
        }

        console.log('Achievements seeded successfully!');
    } catch (error) {
        console.error('Error seeding achievements:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedAchievements();
