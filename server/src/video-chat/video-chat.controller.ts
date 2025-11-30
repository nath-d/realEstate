import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { VideoChatService, CreateVideoChatData, UpdateVideoChatData } from './video-chat.service';

@Controller('schedule-video-chat')
export class VideoChatController {
    constructor(private readonly videoChatService: VideoChatService) { }

    @Post()
    async createVideoChat(@Body() data: CreateVideoChatData) {
        return this.videoChatService.createVideoChat(data);
    }

    @Get()
    async getAllVideoChats() {
        return this.videoChatService.getAllVideoChats();
    }

    @Get('stats')
    async getVideoChatStats() {
        return this.videoChatService.getVideoChatStats();
    }

    @Get(':id')
    async getVideoChatById(@Param('id', ParseIntPipe) id: number) {
        return this.videoChatService.getVideoChatById(id);
    }

    @Put(':id')
    async updateVideoChat(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateVideoChatData,
    ) {
        return this.videoChatService.updateVideoChat(id, data);
    }

    @Delete(':id')
    async deleteVideoChat(@Param('id', ParseIntPipe) id: number) {
        return this.videoChatService.deleteVideoChat(id);
    }
}

