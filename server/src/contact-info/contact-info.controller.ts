import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { ContactInfoService, CreateContactInfoData, UpdateContactInfoData } from './contact-info.service';

@Controller('contact-info')
export class ContactInfoController {
    constructor(private readonly contactInfoService: ContactInfoService) { }

    // Public endpoint to get contact information for the frontend
    @Get()
    async getContactInfo() {
        return this.contactInfoService.getContactInfo();
    }

    // Admin endpoints
    @Post()
    async createContactInfo(@Body() data: CreateContactInfoData) {
        return this.contactInfoService.createContactInfo(data);
    }

    @Put()
    async updateContactInfo(@Body() data: UpdateContactInfoData) {
        return this.contactInfoService.updateContactInfo(data);
    }
}
