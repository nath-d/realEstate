import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAboutUsInfoDto, UpdateAboutUsInfoDto, CreateAboutUsValueDto, UpdateAboutUsValueDto, CreateAboutUsTeamMemberDto, UpdateAboutUsTeamMemberDto } from './dto/about-us.dto';

@Injectable()
export class AboutUsService {
  constructor(private prisma: PrismaService) {}

  // About Us Info methods
  async getAboutUsInfo() {
    let aboutUsInfo = await this.prisma.aboutUsInfo.findFirst({
      where: { isActive: true },
      include: {
        values: {
          orderBy: { order: 'asc' }
        },
        teamMembers: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!aboutUsInfo) {
      // Create default AboutUsInfo if none exists
      aboutUsInfo = await this.prisma.aboutUsInfo.create({
        data: {
          heroTitle: "About Us",
          heroSubtitle: "Building dreams into reality, one home at a time...",
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
        },
        include: {
          values: {
            orderBy: { order: 'asc' }
          },
          teamMembers: {
            orderBy: { order: 'asc' }
          }
        }
      });
    }

    return aboutUsInfo;
  }

  async createAboutUsInfo(createAboutUsInfoDto: CreateAboutUsInfoDto) {
    // Check if there's already an active AboutUsInfo record
    const existingInfo = await this.prisma.aboutUsInfo.findFirst({
      where: { isActive: true }
    });

    if (existingInfo) {
      // Update the existing record instead of creating a new one
      return this.prisma.aboutUsInfo.update({
        where: { id: existingInfo.id },
        data: createAboutUsInfoDto,
        include: {
          values: {
            orderBy: { order: 'asc' }
          },
          teamMembers: {
            orderBy: { order: 'asc' }
          }
        }
      });
    }

    // Create new record only if none exists
    return this.prisma.aboutUsInfo.create({
      data: { ...createAboutUsInfoDto, isActive: true },
      include: {
        values: {
          orderBy: { order: 'asc' }
        },
        teamMembers: {
          orderBy: { order: 'asc' }
        }
      }
    });
  }

  async updateAboutUsInfo(id: number, updateAboutUsInfoDto: UpdateAboutUsInfoDto) {
    const aboutUsInfo = await this.prisma.aboutUsInfo.findUnique({
      where: { id }
    });

    if (!aboutUsInfo) {
      throw new NotFoundException('About Us info not found');
    }

    return this.prisma.aboutUsInfo.update({
      where: { id },
      data: updateAboutUsInfoDto,
      include: {
        values: {
          orderBy: { order: 'asc' }
        },
        teamMembers: {
          orderBy: { order: 'asc' }
        }
      }
    });
  }

  // Values methods
  async createValue(createAboutUsValueDto: CreateAboutUsValueDto) {
    return this.prisma.aboutUsValue.create({
      data: createAboutUsValueDto
    });
  }

  async updateValue(id: number, updateAboutUsValueDto: UpdateAboutUsValueDto) {
    const value = await this.prisma.aboutUsValue.findUnique({
      where: { id }
    });

    if (!value) {
      throw new NotFoundException('Value not found');
    }

    return this.prisma.aboutUsValue.update({
      where: { id },
      data: updateAboutUsValueDto
    });
  }

  async deleteValue(id: number) {
    const value = await this.prisma.aboutUsValue.findUnique({
      where: { id }
    });

    if (!value) {
      throw new NotFoundException('Value not found');
    }

    return this.prisma.aboutUsValue.delete({
      where: { id }
    });
  }

  // Team Member methods
  async createTeamMember(createAboutUsTeamMemberDto: CreateAboutUsTeamMemberDto) {
    return this.prisma.aboutUsTeamMember.create({
      data: createAboutUsTeamMemberDto
    });
  }

  async updateTeamMember(id: number, updateAboutUsTeamMemberDto: UpdateAboutUsTeamMemberDto) {
    const teamMember = await this.prisma.aboutUsTeamMember.findUnique({
      where: { id }
    });

    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }

    return this.prisma.aboutUsTeamMember.update({
      where: { id },
      data: updateAboutUsTeamMemberDto
    });
  }

  async deleteTeamMember(id: number) {
    const teamMember = await this.prisma.aboutUsTeamMember.findUnique({
      where: { id }
    });

    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }

    return this.prisma.aboutUsTeamMember.delete({
      where: { id }
    });
  }
}
