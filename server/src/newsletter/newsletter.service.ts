import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../auth/email.service';
import { randomUUID } from 'crypto';

@Injectable()
export class NewsletterService {
    private readonly logger = new Logger(NewsletterService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService,
    ) { }

    async subscribe(input: { email: string; firstName?: string; lastName?: string }) {
        const { email, firstName, lastName } = input;

        const confirmToken = randomUUID();
        const unsubscribeToken = randomUUID();

        await this.prisma.newsletterSubscriber.upsert({
            where: { email },
            update: {
                firstName,
                lastName,
                isConfirmed: false,
                confirmToken,
                unsubscribeToken,
                unsubscribedAt: null,
            },
            create: {
                email,
                firstName,
                lastName,
                isConfirmed: false,
                confirmToken,
                unsubscribeToken,
            },
        });

        const confirmUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/newsletter/confirm?token=${confirmToken}`;
        await this.emailService.sendConfirmSubscription(email, confirmUrl);
        return { success: true, message: 'Confirmation email sent' };
    }

    async confirm(token: string) {
        const sub = await this.prisma.newsletterSubscriber.findUnique({ where: { confirmToken: token } });
        if (!sub) throw new NotFoundException('Invalid or expired token');

        await this.prisma.newsletterSubscriber.update({
            where: { id: sub.id },
            data: { isConfirmed: true, confirmToken: null },
        });

        await this.emailService.sendWelcomeEmail(sub.email, sub.firstName || undefined);
        return { success: true };
    }

    async unsubscribe(token: string) {
        const sub = await this.prisma.newsletterSubscriber.findFirst({ where: { unsubscribeToken: token } });
        if (!sub) throw new NotFoundException('Invalid token');
        await this.prisma.newsletterSubscriber.update({ where: { id: sub.id }, data: { unsubscribedAt: new Date() } });
        return { success: true };
    }

    async list() {
        return this.prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: 'desc' } });
    }

    async send(input: { subject: string; html: string; attachments?: { filename: string; bufferBase64: string; contentType?: string }[] }) {
        const { subject, html, attachments } = input;
        const recipients = await this.prisma.newsletterSubscriber.findMany({
            where: { isConfirmed: true, unsubscribedAt: null },
            select: { email: true, unsubscribeToken: true },
        });

        const chunkSize = 90;
        for (let i = 0; i < recipients.length; i += chunkSize) {
            const chunk = recipients.slice(i, i + chunkSize);
            await Promise.all(
                chunk.map(({ email, unsubscribeToken }) => {
                    const unsubscribeUrl = `${process.env.BACKEND_URL || 'http://localhost:3000'}/newsletter/unsubscribe?token=${unsubscribeToken}`;
                    const preparedAttachments = (attachments || []).map(a => ({
                        filename: a.filename,
                        content: Buffer.from(a.bufferBase64, 'base64'),
                        contentType: a.contentType,
                    }));
                    return this.emailService.sendNewsletterEmail(email, subject, html, unsubscribeUrl, preparedAttachments);
                }),
            );
            if (i + chunkSize < recipients.length) {
                await new Promise((r) => setTimeout(r, 60000));
            }
        }

        this.logger.log(`Newsletter sent to ${recipients.length} recipients`);
        return { success: true, count: recipients.length };
    }
}


