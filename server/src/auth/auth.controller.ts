import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    UseGuards,
    Request,
    Param,
    Query,
    Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    LoginDto,
    SignupDto,
    ForgotPasswordDto,
    ResetPasswordDto,
    ChangePasswordDto,
    UpdateProfileDto,
} from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
const config = require('../../config');

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto);
    }

    @Post('reset-password')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('change-password')
    async changePassword(
        @Request() req,
        @Body() changePasswordDto: ChangePasswordDto,
    ) {
        return this.authService.changePassword(req.user.id, changePasswordDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return this.authService.getProfile(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('profile')
    async updateProfile(
        @Request() req,
        @Body() updateProfileDto: UpdateProfileDto,
    ) {
        return this.authService.updateProfile(req.user.id, updateProfileDto);
    }

    @Post('verify-email')
    async verifyEmail(@Body() body: { otp: string }) {
        return this.authService.verifyEmail(body.otp);
    }

    @UseGuards(JwtAuthGuard)
    @Post('send-verification-otp')
    async sendVerificationOtp(@Request() req) {
        return this.authService.sendVerificationOtp(req.user.email);
    }

    @UseGuards(JwtAuthGuard)
    @Get('favorites')
    async getFavorites(@Request() req) {
        return this.authService.getFavorites(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('favorites/:propertyId')
    async addToFavorites(@Request() req, @Param('propertyId') propertyId: string) {
        return this.authService.addToFavorites(req.user.id, parseInt(propertyId));
    }

    @UseGuards(JwtAuthGuard)
    @Post('favorites/:propertyId/remove')
    async removeFromFavorites(
        @Request() req,
        @Param('propertyId') propertyId: string,
    ) {
        return this.authService.removeFromFavorites(req.user.id, parseInt(propertyId));
    }

    // Google OAuth routes
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {
        // This will redirect to Google
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req, @Res() res) {
        try {
            console.log('Google auth callback - user profile:', req.user);

            if (!req.user) {
                console.error('No user data received from Google');
                const frontendUrl = config.urls.frontend;
                const redirectUrl = `${frontendUrl}/auth/callback?error=no_user_data`;
                return res.redirect(redirectUrl);
            }

            const result = await this.authService.googleLogin(req.user);

            // Encode user data to include in URL
            const userData = encodeURIComponent(JSON.stringify(result.user));

            // Redirect to frontend with token and user data
            const frontendUrl = config.urls.frontend;
            const redirectUrl = `${frontendUrl}/auth/callback?token=${result.token}&user=${userData}&success=true`;

            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Google auth callback error:', error);
            const frontendUrl = config.urls.frontend;
            const errorMessage = encodeURIComponent(error.message || 'Authentication failed');
            const redirectUrl = `${frontendUrl}/auth/callback?error=${errorMessage}`;
            res.redirect(redirectUrl);
        }
    }
} 