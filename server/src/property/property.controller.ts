import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, BadRequestException } from '@nestjs/common';
import axios from 'axios';

// Simple in-memory cache for POI results (rounded to ~100m grid)
type CacheEntry = { data: any; expiresAt: number };
const poiCache: Map<string, CacheEntry> = new Map();
const POI_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
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

    @Get('random/:count')
    findRandom(@Param('count', ParseIntPipe) count: number) {
        return this.propertyService.findRandom(count);
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
        const { lat, lng } = body;
        // Keep radius modest for speed; cap at 800m to avoid heavy queries
        const radius = Math.min(Math.max(Number(body.radius) || 600, 300), 800);

        // Cache key by coarse grid (~100m) and radius
        const key = `${radius}:${lat.toFixed(3)},${lng.toFixed(3)}`;
        const cached = poiCache.get(key);
        if (cached && cached.expiresAt > Date.now()) {
            return cached.data;
        }

        // Build Overpass query (keep reasonably small to avoid rate limits/timeouts)
        // Nodes-only query for speed
        const query = `
            [out:json][timeout:20];
            (
                node["amenity"~"school|kindergarten|college|university|restaurant|cafe|bar|pub|hospital|clinic|pharmacy|police|bank|atm|library"](around:${radius},${lat},${lng});
                node["leisure"~"park|playground|sports_centre|stadium"](around:${radius},${lat},${lng});
                node["railway"~"station|subway|tram_stop|halt"](around:${radius},${lat},${lng});
                node["public_transport"~"stop_position|platform|station"](around:${radius},${lat},${lng});
                node["shop"~"supermarket|mall|grocery|convenience|department_store"](around:${radius},${lat},${lng});
                way["amenity"~"school|college|university|hospital|library|police|restaurant|cafe|bank"](around:${radius},${lat},${lng});
                way["leisure"~"park|playground|sports_centre|stadium"](around:${radius},${lat},${lng});
                way["railway"~"station|subway|tram_stop|halt"](around:${radius},${lat},${lng});
                way["shop"~"supermarket|mall|grocery|convenience|department_store"](around:${radius},${lat},${lng});
                relation["amenity"~"school|college|university|hospital|library|police|restaurant|cafe|bank"](around:${radius},${lat},${lng});
                relation["leisure"~"park|playground|sports_centre|stadium"](around:${radius},${lat},${lng});
                relation["railway"~"station|subway|tram_stop|halt"](around:${radius},${lat},${lng});
                relation["shop"~"supermarket|mall|grocery|convenience|department_store"](around:${radius},${lat},${lng});
            );
            out center;
        `;

        const endpoints = [
            'https://overpass-api.de/api/interpreter',
            'https://overpass.kumi.systems/api/interpreter',
            'https://lz4.overpass-api.de/api/interpreter'
        ];

        // Fire all mirrors simultaneously and take the first successful response
        const makeReq = (endpoint: string) => axios.post(
            endpoint,
            `data=${encodeURIComponent(query)}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'User-Agent': 'RealEstateApp/1.0 (contact: admin@example.com)'
                },
                timeout: 8000,
                transformRequest: [(data) => data],
                validateStatus: (s) => s >= 200 && s < 300,
            }
        ).then(r => r.data);

        const attempts = endpoints.map(ep => makeReq(ep).catch(() => Promise.reject()));

        let data: any;
        try {
            // First success wins
            data = await Promise.any(attempts);
        } catch {
            console.error('POI fetch failed on all mirrors (fast path)');
            data = { elements: [] };
        }

        // Trim to a sensible maximum for speed in UI
        if (Array.isArray(data?.elements) && data.elements.length > 120) {
            data.elements = data.elements.slice(0, 120);
        }

        // Cache the result
        poiCache.set(key, { data, expiresAt: Date.now() + POI_CACHE_TTL_MS });
        return data;
    }
} 