import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CoreStrengthsService } from './core-strengths.service';

@Controller('core-strengths')
export class CoreStrengthsController {
    constructor(private readonly service: CoreStrengthsService) { }

    @Get()
    list() {
        return this.service.list();
    }

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.service.update(Number(id), body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(Number(id));
    }
}


