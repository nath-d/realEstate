import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, BadRequestException } from '@nestjs/common';
import { PropertyService } from './property.service';
import { Prisma } from '@prisma/client';

@Controller('properties')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) { }

    @Post()
    create(@Body() createPropertyData: any) {
        // Map 'specification' object to 'specifications' relation
        if (createPropertyData.specification) {
            createPropertyData.specifications = {
                create: [createPropertyData.specification]
            };
            delete createPropertyData.specification;
        }
        return this.propertyService.create(createPropertyData as Prisma.PropertyCreateInput);
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
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePropertyData: any,
    ) {
        // Map 'specification' object to 'specifications' relation (replace all)
        if (updatePropertyData.specification) {
            updatePropertyData.specifications = {
                deleteMany: {},
                create: [updatePropertyData.specification]
            };
            delete updatePropertyData.specification;
        }
        return this.propertyService.update(id, updatePropertyData as Prisma.PropertyUpdateInput);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.propertyService.remove(id);
    }

    private validatePrismaRelations(data: any) {
        const errors: string[] = [];

        // Check location relation
        if (data.location && typeof data.location === 'object') {
            if (!data.location.create && !data.location.connect && !data.location.connectOrCreate) {
                errors.push('Location must use Prisma relation syntax: { "location": { "create": { ... } } }');
            }
        }

        // Check images relation
        if (data.images && Array.isArray(data.images)) {
            errors.push('Images must use Prisma relation syntax: { "images": { "create": [{ "url": "..." }] } }');
        }

        if (errors.length > 0) {
            throw new BadRequestException({
                message: 'Invalid Prisma relation syntax',
                errors,
                example: {
                    location: { create: { latitude: 34.0522, longitude: -118.2437, address: "123 Main St", city: "LA", state: "CA", zipCode: "90210" } },
                    images: { create: [{ url: "https://example.com/image.jpg" }] }
                }
            });
        }
    }
} 