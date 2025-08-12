import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AchievementService, CreateAchievementDto, UpdateAchievementDto } from './achievement.service';

@Controller('achievements')
export class AchievementController {
    constructor(private readonly achievementService: AchievementService) { }

    @Get()
    async findAll() {
        return this.achievementService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.achievementService.findOne(+id);
    }

    @Post()
    async create(@Body() createAchievementDto: CreateAchievementDto) {
        return this.achievementService.create(createAchievementDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAchievementDto: UpdateAchievementDto) {
        return this.achievementService.update(+id, updateAchievementDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.achievementService.delete(+id);
    }

    @Post('reorder')
    async reorder(@Body() body: { ids: number[] }) {
        return this.achievementService.reorder(body.ids);
    }
}
