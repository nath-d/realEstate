import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Property, Prisma } from '@prisma/client';

@Injectable()
export class PropertyService {
    constructor(private prisma: PrismaService) { }

    async create(createPropertyData: Prisma.PropertyCreateInput): Promise<Property> {
        return this.prisma.property.create({
            data: createPropertyData,
            include: {
                images: true,
                location: true,
                specifications: true,
                materialCertifications: true,
                pois: true,
                agent: true,
            },
        });
    }

    async findAll(): Promise<Property[]> {
        return this.prisma.property.findMany({
            include: {
                images: true,
                location: true,
                specifications: true,
                materialCertifications: true,
                pois: true,
                agent: true,
            },
        });
    }

    async findOne(id: number): Promise<Property> {
        const property = await this.prisma.property.findUnique({
            where: { id },
            include: {
                images: true,
                location: true,
                specifications: true,
                materialCertifications: true,
                pois: true,
                agent: true,
            },
        });

        if (!property) {
            throw new NotFoundException(`Property with ID ${id} not found`);
        }

        return property;
    }

    async findSimilar(id: number): Promise<Property[]> {
        const property = await this.findOne(id);

        return this.prisma.property.findMany({
            where: {
                AND: [
                    { id: { not: id } },
                    {
                        OR: [
                            { type: property.type },
                            { status: property.status },
                            {
                                price: {
                                    gte: property.price * 0.8,
                                    lte: property.price * 1.2,
                                },
                            },
                        ],
                    },
                ],
            },
            include: {
                images: true,
                location: true,
                specifications: true,
                materialCertifications: true,
                pois: true,
                agent: true,
            },
            take: 6,
        });
    }

    async update(id: number, updatePropertyData: Prisma.PropertyUpdateInput) {
        // First, get the existing property to check if it exists
        const existingProperty = await this.prisma.property.findUnique({
            where: { id },
            include: { location: true, specifications: true, materialCertifications: true, pois: true }
        });

        if (!existingProperty) {
            throw new NotFoundException(`Property with ID ${id} not found`);
        }

        try {
            const updatedProperty = await this.prisma.property.update({
                where: { id },
                data: updatePropertyData,
                include: {
                    images: true,
                    location: true,
                    specifications: true,
                    materialCertifications: true,
                    pois: true,
                    agent: true
                }
            });

            return updatedProperty;
        } catch (error) {
            console.error('Error updating property:', error);
            throw new Error('Failed to update property');
        }
    }

    async remove(id: number): Promise<Property> {
        return this.prisma.property.delete({
            where: { id },
            include: {
                images: true,
                location: true,
                specifications: true,
                materialCertifications: true,
                pois: true,
                agent: true,
            },
        });
    }

    async findRandom(count: number = 3): Promise<Property[]> {
        // Alternative approach using database-level randomization for better performance
        // Note: This is more efficient for large datasets
        try {
            // Use raw SQL for true randomization at database level
            const randomProperties = await this.prisma.$queryRaw`
                SELECT * FROM "Property" 
                ORDER BY RANDOM() 
                LIMIT ${count}
            ` as any[];

            if (randomProperties.length === 0) {
                return [];
            }

            // Fetch complete property data with relations for each random property
            const propertyPromises = randomProperties.map(prop => 
                this.prisma.property.findUnique({
                    where: { id: prop.id },
                    include: {
                        images: true,
                        location: true,
                        specifications: true,
                        materialCertifications: true,
                        pois: true,
                        agent: true,
                    },
                })
            );
            
            const properties = await Promise.all(propertyPromises);
            return properties.filter(property => property !== null) as Property[];
            
        } catch (error) {
            // Fallback to Fisher-Yates shuffle if raw query fails
            console.warn('Database random query failed, using fallback method:', error);
            
            const allProperties = await this.prisma.property.findMany({
                select: { id: true }
            });
            
            if (allProperties.length === 0) {
                return [];
            }
            
            const availableIds = allProperties.map(p => p.id);
            
            // Fisher-Yates shuffle algorithm for proper randomization
            const shuffledIds = [...availableIds];
            for (let i = shuffledIds.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]];
            }
            
            // Take first N shuffled IDs
            const selectedIds = shuffledIds.slice(0, Math.min(count, shuffledIds.length));
            
            // Fetch all selected properties in parallel
            const propertyPromises = selectedIds.map(id => 
                this.prisma.property.findUnique({
                    where: { id },
                    include: {
                        images: true,
                        location: true,
                        specifications: true,
                        materialCertifications: true,
                        pois: true,
                        agent: true,
                    },
                })
            );
            
            const properties = await Promise.all(propertyPromises);
            return properties.filter(property => property !== null) as Property[];
        }
    }
} 