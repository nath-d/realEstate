import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { AdminKeyGuard } from '../auth/guards/admin-key.guard';

@Controller('newsletter')
export class NewsletterController {
    constructor(private readonly newsletterService: NewsletterService) { }

    @Post('subscribe')
    subscribe(@Body() body: { email: string; firstName?: string; lastName?: string }) {
        return this.newsletterService.subscribe(body);
    }

    @Get('confirm')
    confirm(@Query('token') token: string) {
        return this.newsletterService.confirm(token);
    }

    @Get('unsubscribe')
    unsubscribe(@Query('token') token: string) {
        return this.newsletterService.unsubscribe(token);
    }

    @UseGuards(AdminKeyGuard)
    @Get('subscribers')
    list() {
        return this.newsletterService.list();
    }

    @UseGuards(AdminKeyGuard)
    @Post('send')
    send(@Body() body: { subject: string; html: string; attachments?: { filename: string; bufferBase64: string; contentType?: string }[] }) {
        return this.newsletterService.send(body);
    }
}


