import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ContactService, CreateContactFormData, UpdateContactFormData } from './contact.service';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Post()
    async createContactForm(@Body() data: CreateContactFormData) {
        return this.contactService.createContactForm(data);
    }

    @Get()
    async getAllContactForms() {
        return this.contactService.getAllContactForms();
    }

    @Get('stats')
    async getContactFormStats() {
        return this.contactService.getContactFormStats();
    }

    @Get(':id')
    async getContactFormById(@Param('id', ParseIntPipe) id: number) {
        return this.contactService.getContactFormById(id);
    }

    @Put(':id')
    async updateContactForm(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateContactFormData,
    ) {
        return this.contactService.updateContactForm(id, data);
    }

    @Delete(':id')
    async deleteContactForm(@Param('id', ParseIntPipe) id: number) {
        return this.contactService.deleteContactForm(id);
    }
} 