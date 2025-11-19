import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AboutService } from './about.service';

@Controller('about')
export class AboutController {
    constructor(private readonly aboutService: AboutService) { }

    @Get()
    getContent() {
        return this.aboutService.getContent();
    }

    @Put()
    upsertContent(@Body() body: any) {
        return this.aboutService.upsertContent(body);
    }

    @Get('timeline')
    getTimeline() {
        return this.aboutService.getTimeline();
    }

    @Post('timeline')
    addTimelineItem(@Body() body: any) {
        return this.aboutService.addTimelineItem(body);
    }

    @Put('timeline/:id')
    updateTimelineItem(@Param('id') id: string, @Body() body: any) {
        return this.aboutService.updateTimelineItem(Number(id), body);
    }

    @Delete('timeline/:id')
    deleteTimelineItem(@Param('id') id: string) {
        return this.aboutService.deleteTimelineItem(Number(id));
    }
}

