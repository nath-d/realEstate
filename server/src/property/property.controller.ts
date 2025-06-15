import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('properties')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) { }

    @Post()
    create(@Body() createPropertyDto: CreatePropertyDto) {
        return this.propertyService.create(createPropertyDto);
    }

    @Get()
    findAll() {
        return this.propertyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.propertyService.findOne(id);
    }

    @Get(':id/similar')
    findSimilar(@Param('id', ParseIntPipe) id: number) {
        return this.propertyService.findSimilar(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePropertyDto: Partial<CreatePropertyDto>,
    ) {
        return this.propertyService.update(id, updatePropertyDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.propertyService.remove(id);
    }
} 