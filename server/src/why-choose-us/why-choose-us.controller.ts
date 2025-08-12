import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WhyChooseUsService } from './why-choose-us.service';

@Controller('why-choose-us')
export class WhyChooseUsController {
    constructor(private readonly service: WhyChooseUsService) { }

    @Get()
    getActive() {
        return this.service.getAllActive();
    }

    @Get('all')
    getAll() {
        return this.service.getAll();
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
        return this.service.delete(Number(id));
    }
}


