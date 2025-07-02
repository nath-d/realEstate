import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        try {
            const { name, emails, photos } = profile;

            // Validate that we have the required email information
            if (!emails || !emails[0] || !emails[0].value) {
                return done(new BadRequestException('Email is required for Google authentication'), false);
            }

            // Validate that we have name information
            if (!name || !name.givenName) {
                return done(new BadRequestException('Name information is required for Google authentication'), false);
            }

            const user = {
                id: profile.id,
                email: emails[0].value,
                firstName: name.givenName || '',
                lastName: name.familyName || '',
                avatar: photos && photos[0] ? photos[0].value : null,
                accessToken,
            };

            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
} 