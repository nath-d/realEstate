import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, BadRequestException } from '@nestjs/common';
import { PropertyService } from './property.service';
import { Prisma } from '@prisma/client';

@Controller('properties')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) { }

    @Post()
    create(@Body() createPropertyData: any) {
        // Handle specifications data - support both 'specification' and 'specifications' fields
        if (createPropertyData.specification) {
            createPropertyData.specifications = {
                create: [createPropertyData.specification]
            };
            delete createPropertyData.specification;
        } else if (createPropertyData.specifications && Array.isArray(createPropertyData.specifications)) {
            // If specifications is already an array, convert it to Prisma relation format
            createPropertyData.specifications = {
                create: createPropertyData.specifications
            };
        }

        // Handle materialCertifications data
        if (createPropertyData.materialCertifications && Array.isArray(createPropertyData.materialCertifications)) {
            createPropertyData.materialCertifications = {
                create: createPropertyData.materialCertifications
            };
        }

        // Handle POIs data
        if (createPropertyData.pois && Array.isArray(createPropertyData.pois)) {
            createPropertyData.pois = {
                create: createPropertyData.pois
            };
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
        // Handle specifications data - support both 'specification' and 'specifications' fields
        if (updatePropertyData.specification) {
            updatePropertyData.specifications = {
                deleteMany: {},
                create: [updatePropertyData.specification]
            };
            delete updatePropertyData.specification;
        } else if (updatePropertyData.specifications && Array.isArray(updatePropertyData.specifications)) {
            // If specifications is already an array, convert it to Prisma relation format
            updatePropertyData.specifications = {
                deleteMany: {},
                create: updatePropertyData.specifications
            };
        }

        // Handle materialCertifications data
        if (updatePropertyData.materialCertifications && Array.isArray(updatePropertyData.materialCertifications)) {
            updatePropertyData.materialCertifications = {
                deleteMany: {},
                create: updatePropertyData.materialCertifications
            };
        }

        // Handle POIs data
        if (updatePropertyData.pois && Array.isArray(updatePropertyData.pois)) {
            updatePropertyData.pois = {
                deleteMany: {},
                create: updatePropertyData.pois
            };
        }

        return this.propertyService.update(id, updatePropertyData as Prisma.PropertyUpdateInput);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.propertyService.remove(id);
    }

    // New endpoints for map functionality
    @Get('geocode/search/:query')
    async searchLocation(@Param('query') query: string) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
                {
                    headers: {
                        'User-Agent': 'RealEstateApp/1.0',
                        'Accept-Language': 'en-US,en;q=0.9',
                    },
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to search location');
        }
    }

    @Get('geocode/reverse/:lat/:lon')
    async reverseGeocode(@Param('lat') lat: string, @Param('lon') lon: string) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
                {
                    headers: {
                        'User-Agent': 'RealEstateApp/1.0',
                        'Accept-Language': 'en-US,en;q=0.9',
                    },
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to reverse geocode');
        }
    }

    @Post('pois/fetch')
    async fetchPOIs(@Body() body: { lat: number; lng: number; radius?: number }) {
        try {
            const { lat, lng, radius = 1000 } = body;
            const query = `
                [out:json][timeout:25];
                (
                    node["amenity"~"school|college|university|restaurant|cafe|hospital|pharmacy|police"](around:${radius},${lat},${lng});
                    node["leisure"="park"](around:${radius},${lat},${lng});
                    node["railway"~"station|metro|subway"](around:${radius},${lat},${lng});
                    node["shop"~"supermarket|mall|grocery"](around:${radius},${lat},${lng});
                );
                out body;
            `;

            const response = await fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'RealEstateApp/1.0',
                },
                body: `data=${encodeURIComponent(query)}`,
            });

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch POIs');
        }
    }
} 