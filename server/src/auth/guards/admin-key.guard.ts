import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
const config = require('../../../config');

@Injectable()
export class AdminKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const provided = (req.headers['x-admin-key'] || req.headers['X-Admin-Key']) as string | undefined;
        const expected = config.admin.apiKey;

        if (!expected) {
            // If no key configured, deny by default
            throw new UnauthorizedException('Admin API key not configured');
        }
        if (!provided || provided !== expected) {
            throw new UnauthorizedException('Invalid admin key');
        }
        return true;
    }
}


