import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from './email.service';
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

        // Generate verification token
        const verificationToken = randomBytes(32).toString('hex');
        await this.prisma.user.update({
            where: { id: user.id },
            data: { emailVerificationToken: verificationToken },
        });

        // Send verification email
        await this.emailService.sendVerificationEmail(user.email, verificationToken);

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

        // Generate reset token
        const resetToken = randomBytes(32).toString('hex');
        const resetExpires = new Date(Date.now() + 3600000); // 1 hour

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                passwordResetToken: resetToken,
                passwordResetExpires: resetExpires,
            },
        });

        // Send reset email
        await this.emailService.sendPasswordResetEmail(email, resetToken);

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
            throw new BadRequestException('Invalid or expired reset token');
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

    async verifyEmail(token: string) {
        const user = await this.prisma.user.findFirst({
            where: { emailVerificationToken: token },
        });

        if (!user) {
            throw new BadRequestException('Invalid verification token');
        }

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                isEmailVerified: true,
                emailVerificationToken: null,
            },
        });

        return {
            success: true,
            message: 'Email verified successfully',
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
} 