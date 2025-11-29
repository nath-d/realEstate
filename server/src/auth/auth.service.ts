import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from './email.service';
import { MarketingService } from '../services/marketing.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto, SignupDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto, UpdateProfileDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private emailService: EmailService,
        private marketingService: MarketingService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (user && user.password && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Update last login
        await this.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        const payload = { email: user.email, sub: user.id, role: user.role };
        const token = this.jwtService.sign(payload);

        return {
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
            },
        };
    }

    async signup(signupDto: SignupDto) {
        const { email, password, firstName, lastName, phone } = signupDto;

        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phone,
                isEmailVerified: false,
            },
        });

        // Don't send verification email automatically - user will request it from profile
        // Just create the user with email verification set to false
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerificationToken: null,
                passwordResetExpires: null,
            },
        });

        // Send welcome email with PDF attachment
        try {
            await this.marketingService.sendWelcomeEmailWithPdf(user.email, user.firstName);
        } catch (error) {
            // Don't fail signup if marketing email fails
            console.error('Failed to send welcome email:', error);
        }

        const payload = { email: user.email, sub: user.id, role: user.role };
        const token = this.jwtService.sign(payload);

        return {
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
            },
        };
    }

    async googleLogin(profile: any) {
        try {
            console.log('Google login profile received:', profile);

            // The Google strategy already extracts the email, so we don't need to access emails[0].value
            const { id, email, firstName, lastName, avatar } = profile;

            // Validate required fields
            if (!id) {
                throw new BadRequestException('Google ID is required');
            }

            if (!email) {
                throw new BadRequestException('Email is required for Google authentication');
            }

            if (!firstName) {
                throw new BadRequestException('First name is required for Google authentication');
            }

            let user = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { googleId: id },
                    ],
                },
            });

            if (!user) {
                // Create new user
                user = await this.prisma.user.create({
                    data: {
                        email,
                        googleId: id,
                        firstName,
                        lastName: lastName || '',
                        avatar: avatar || null,
                        isEmailVerified: true,
                    },
                });

                // Send welcome email with PDF attachment for new users/////////////////This was the email change
                try {
                    await this.marketingService.sendWelcomeEmailWithPdf(user.email, user.firstName);
                    console.log(`Welcome email with PDF sent to new Google user: ${user.email}`);
                } catch (error) {
                    // Don't fail OAuth if marketing email fails
                    console.error('Failed to send welcome email to new Google user:', error);
                }
                /////////////////Till here
            } else if (!user.googleId) {
                // Link existing user with Google
                user = await this.prisma.user.update({
                    where: { id: user.id },
                    data: {
                        googleId: id,
                        avatar: avatar || null,
                        isEmailVerified: true,
                    },
                });
            }

            // Update last login
            await this.prisma.user.update({
                where: { id: user.id },
                data: { lastLoginAt: new Date() },
            });

            const payload = { email: user.email, sub: user.id, role: user.role };
            const token = this.jwtService.sign(payload);

            return {
                success: true,
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar,
                    role: user.role,
                    isEmailVerified: user.isEmailVerified,
                },
            };
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        const { email } = forgotPasswordDto;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Don't reveal if user exists or not
            return {
                success: true,
                message: 'If an account with that email exists, a password reset link has been sent.',
            };
        }

        // Generate and send password reset OTP
        const resetOTP = await this.emailService.sendPasswordResetOTP(email);
        const otpExpires = new Date(Date.now() + 600000); // 10 minutes

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                passwordResetToken: resetOTP,
                passwordResetExpires: otpExpires,
            },
        });

        return {
            success: true,
            message: 'If an account with that email exists, a password reset link has been sent.',
        };
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        const { token, newPassword } = resetPasswordDto;

        const user = await this.prisma.user.findFirst({
            where: {
                passwordResetToken: token,
                passwordResetExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            throw new BadRequestException('Invalid or expired reset code');
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update user and clear reset token
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpires: null,
            },
        });

        return {
            success: true,
            message: 'Password has been reset successfully',
        };
    }

    async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
        const { currentPassword, newPassword } = changePasswordDto;

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Current password is incorrect');
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await this.prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return {
            success: true,
            message: 'Password changed successfully',
        };
    }

    async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: updateProfileDto,
        });

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                phone: user.phone,
                address: user.address,
                city: user.city,
                state: user.state,
                zipCode: user.zipCode,
                country: user.country,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
            },
        };
    }

    async getProfile(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                favoriteProperties: {
                    include: {
                        images: true,
                        location: true,
                    },
                },
                contactForms: true,
                scheduleVisits: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
                phone: user.phone,
                address: user.address,
                city: user.city,
                state: user.state,
                zipCode: user.zipCode,
                country: user.country,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
                createdAt: user.createdAt,
                lastLoginAt: user.lastLoginAt,
                favoriteProperties: user.favoriteProperties,
                contactForms: user.contactForms,
                scheduleVisits: user.scheduleVisits,
            },
        };
    }

    async verifyEmail(otp: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                emailVerificationToken: otp,
                passwordResetExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            throw new BadRequestException('Invalid or expired verification code');
        }

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                isEmailVerified: true,
                emailVerificationToken: null,
                passwordResetExpires: null,
            },
        });

        return {
            success: true,
            message: 'Email verified successfully',
        };
    }

    async sendVerificationOtp(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new BadRequestException('User not found');
        }

        if (user.isEmailVerified) {
            throw new BadRequestException('Email is already verified');
        }

        // Generate and send verification OTP
        const verificationOTP = await this.emailService.sendVerificationOTP(email);
        const otpExpires = new Date(Date.now() + 600000); // 10 minutes

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerificationToken: verificationOTP,
                passwordResetExpires: otpExpires, // Reusing this field for OTP expiry
            },
        });

        return {
            success: true,
            message: 'Verification code sent successfully',
        };
    }

    async addToFavorites(userId: number, propertyId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { favoriteProperties: true },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isAlreadyFavorite = user.favoriteProperties.some(
            (property) => property.id === propertyId,
        );

        if (isAlreadyFavorite) {
            throw new BadRequestException('Property is already in favorites');
        }

        await this.prisma.user.update({
            where: { id: userId },
            data: {
                favoriteProperties: {
                    connect: { id: propertyId },
                },
            },
        });

        return {
            success: true,
            message: 'Property added to favorites',
        };
    }

    async removeFromFavorites(userId: number, propertyId: number) {
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                favoriteProperties: {
                    disconnect: { id: propertyId },
                },
            },
        });

        return {
            success: true,
            message: 'Property removed from favorites',
        };
    }

    async getFavorites(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                favoriteProperties: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                        bedrooms: true,
                        bathrooms: true,
                        livingArea: true,
                        images: {
                            select: {
                                url: true
                            }
                        },
                        location: {
                            select: {
                                city: true,
                                state: true
                            }
                        }
                    }
                }
            }
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            success: true,
            properties: user.favoriteProperties,
        };
    }

    // Admin management methods
    async getAdmins() {
        const admins = await this.prisma.user.findMany({
            where: { role: 'admin' },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                isEmailVerified: true,
                createdAt: true,
                lastLoginAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return {
            success: true,
            admins,
        };
    }

    async createAdmin(createAdminDto: SignupDto) {
        const { email, password, firstName, lastName } = createAdminDto;

        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin user
        const admin = await this.prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: hashedPassword,
                role: 'admin',
                isEmailVerified: true, // Admin users are pre-verified
            },
        });

        return {
            success: true,
            message: 'Admin user created successfully',
            admin: {
                id: admin.id,
                email: admin.email,
                firstName: admin.firstName,
                lastName: admin.lastName,
                role: admin.role,
            },
        };
    }

    async deleteAdmin(adminId: number) {
        // Check if admin exists
        const admin = await this.prisma.user.findUnique({
            where: { id: adminId, role: 'admin' },
        });

        if (!admin) {
            throw new UnauthorizedException('Admin user not found');
        }

        // Delete the admin user
        await this.prisma.user.delete({
            where: { id: adminId },
        });

        return {
            success: true,
            message: 'Admin user deleted successfully',
        };
    }
} 