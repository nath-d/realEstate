import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FutureVisionService } from './future-vision.service';

@Controller('future-vision')
export class FutureVisionController {
    constructor(private readonly service: FutureVisionService) { }

    @Get('content')
    getContent() { return this.service.getContent(); }

    @Put('content')
    upsertContent(@Body() body: any) { return this.service.upsertContent(body); }

    @Get('goals')
    listGoals() { return this.service.listGoals(); }
    @Post('goals')
    createGoal(@Body() body: any) { return this.service.createGoal(body); }
    @Put('goals/:id')
    updateGoal(@Param('id') id: string, @Body() body: any) { return this.service.updateGoal(Number(id), body); }
    @Delete('goals/:id')
    removeGoal(@Param('id') id: string) { return this.service.removeGoal(Number(id)); }

    @Get('timeline')
    listTimeline() { return this.service.listTimeline(); }
    @Post('timeline')
    createTimeline(@Body() body: any) { return this.service.createTimelineItem(body); }
    @Put('timeline/:id')
    updateTimeline(@Param('id') id: string, @Body() body: any) { return this.service.updateTimelineItem(Number(id), body); }
    @Delete('timeline/:id')
    removeTimeline(@Param('id') id: string) { return this.service.removeTimelineItem(Number(id)); }
}


