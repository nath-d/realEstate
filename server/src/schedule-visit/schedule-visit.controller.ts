import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ScheduleVisitService, CreateScheduleVisitData, UpdateScheduleVisitData } from './schedule-visit.service';

@Controller('schedule-visit')
export class ScheduleVisitController {
    constructor(private readonly scheduleVisitService: ScheduleVisitService) { }

    @Post()
    async createScheduleVisit(@Body() data: CreateScheduleVisitData) {
        return this.scheduleVisitService.createScheduleVisit(data);
    }

    @Get()
    async getAllScheduleVisits() {
        return this.scheduleVisitService.getAllScheduleVisits();
    }

    @Get('stats')
    async getScheduleVisitStats() {
        return this.scheduleVisitService.getScheduleVisitStats();
    }

    @Get(':id')
    async getScheduleVisitById(@Param('id', ParseIntPipe) id: number) {
        return this.scheduleVisitService.getScheduleVisitById(id);
    }

    @Put(':id')
    async updateScheduleVisit(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateScheduleVisitData,
    ) {
        return this.scheduleVisitService.updateScheduleVisit(id, data);
    }

    @Delete(':id')
    async deleteScheduleVisit(@Param('id', ParseIntPipe) id: number) {
        return this.scheduleVisitService.deleteScheduleVisit(id);
    }
} 