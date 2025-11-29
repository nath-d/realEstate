const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedAboutUsData() {
  try {
    console.log('Seeding About Us data...');

    // Create About Us Info
    const aboutUsInfo = await prisma.aboutUsInfo.create({
      data: {
        heroTitle: "About Us",
        heroSubtitle: "Building dreams into reality, one home at a time...",
        heroBackgroundUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        storyTitle: "Our Story",
        storyParagraph1: "Founded with a vision to transform the real estate experience, we've grown from a small local agency to a trusted name in the industry. Our journey has been marked by countless success stories and satisfied clients who have found their perfect homes through our services.",
        storyParagraph2: "Today, we continue to innovate and evolve, bringing cutting-edge technology and personalized service to every client interaction. Our commitment to excellence remains unwavering as we help people find their dream properties and make informed real estate decisions.",
        valuesTitle: "Our Values",
        valuesSubtitle: "The principles that guide our work",
        teamTitle: "Our Team",
        teamDescription: "Meet the dedicated professionals who make it all possible. Our team combines years of experience with a passion for real estate to deliver exceptional results.",
        ctaTitle: "Ready to Start Your Journey?",
        ctaDescription: "Let us help you find your dream property or sell your current home. Our team is here to guide you every step of the way.",
        ctaButtonText: "Contact Us Today",
        ctaButtonLink: "/contact",
        isActive: true
      }
    });

    console.log('Created About Us Info with ID:', aboutUsInfo.id);

    // Create Values
    const values = [
      {
        title: "Excellence in Service",
        description: "We are committed to providing exceptional service to our clients, ensuring their real estate journey is smooth and successful.",
        icon: "FaHome",
        order: 1,
        aboutUsInfoId: aboutUsInfo.id
      },
      {
        title: "Client-Centric Approach",
        description: "Our clients are at the heart of everything we do. We listen, understand, and deliver solutions tailored to their unique needs.",
        icon: "FaUsers",
        order: 2,
        aboutUsInfoId: aboutUsInfo.id
      },
      {
        title: "Integrity & Trust",
        description: "We conduct our business with the highest standards of integrity, building lasting relationships based on trust and transparency.",
        icon: "FaHandshake",
        order: 3,
        aboutUsInfoId: aboutUsInfo.id
      },
      {
        title: "Market Expertise",
        description: "With years of experience and deep market knowledge, we provide valuable insights to help clients make informed decisions.",
        icon: "FaChartLine",
        order: 4,
        aboutUsInfoId: aboutUsInfo.id
      }
    ];

    for (const value of values) {
      const createdValue = await prisma.aboutUsValue.create({
        data: value
      });
      console.log('Created value:', createdValue.title);
    }

    // Create Team Members
    const teamMembers = [
      {
        name: "John Smith",
        role: "Founder & CEO",
        description: "With over 20 years of experience in real estate, John leads our company with vision and expertise.",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        linkedinUrl: "#",
        twitterUrl: "#",
        order: 1,
        aboutUsInfoId: aboutUsInfo.id
      },
      {
        name: "Sarah Johnson",
        role: "Head of Sales",
        description: "Sarah's dedication to client satisfaction has made her one of the most successful agents in the region.",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        linkedinUrl: "#",
        twitterUrl: "#",
        order: 2,
        aboutUsInfoId: aboutUsInfo.id
      },
      {
        name: "Michael Chen",
        role: "Property Specialist",
        description: "Michael's deep market knowledge and attention to detail ensure our clients find their perfect property.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        linkedinUrl: "#",
        twitterUrl: "#",
        order: 3,
        aboutUsInfoId: aboutUsInfo.id
      }
    ];

    for (const member of teamMembers) {
      const createdMember = await prisma.aboutUsTeamMember.create({
        data: member
      });
      console.log('Created team member:', createdMember.name);
    }

    console.log('About Us data seeded successfully!');
  } catch (error) {
    console.error('Error seeding About Us data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAboutUsData();


