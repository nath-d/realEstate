import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto, CreateImageDto } from './dto/create-property.dto';
import { Property, Prisma } from '@prisma/client';

@Injectable()
export class PropertyService {
    constructor(private prisma: PrismaService) { }

    async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
        const { images, amenities, specifications, location, ...propertyData } = createPropertyDto;

        return this.prisma.property.create({
            data: {
                ...propertyData,
                images: {
                    create: images.map((image: CreateImageDto) => ({ url: image.url })),
                },
                amenities: {
                    create: amenities,
                },
                specifications: {
                    create: specifications,
                },
                location: {
                    create: location,
                },
            },
            include: {
                images: true,
                amenities: true,
                specifications: true,
                location: true,
                agent: true,
            },
        });
    }

    async findAll(): Promise<Property[]> {
        return this.prisma.property.findMany({
            include: {
                images: true,
                amenities: true,
                specifications: true,
                location: true,
                agent: true,
            },
        });
    }

    async findOne(id: number): Promise<Property> {
        const property = await this.prisma.property.findUnique({
            where: { id },
            include: {
                images: true,
                amenities: true,
                specifications: true,
                location: true,
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
                            { bedrooms: property.bedrooms },
                        ],
                    },
                ],
            },
            include: {
                images: true,
                amenities: true,
                specifications: true,
                location: true,
                agent: true,
            },
            take: 3,
        });
    }

    async update(id: number, updatePropertyDto: Partial<CreatePropertyDto>) {
        const { images, amenities, specifications, location, agentId, ...propertyData } = updatePropertyDto;

        // First, get the existing property to check for location
        const existingProperty = await this.prisma.property.findUnique({
            where: { id },
            include: { location: true }
        });

        if (!existingProperty) {
            throw new NotFoundException(`Property with ID ${id} not found`);
        }

        // First delete all related records
        await this.prisma.property.update({
            where: { id },
            data: {
                images: { deleteMany: {} },
                amenities: { deleteMany: {} },
                specifications: { deleteMany: {} },
                location: { delete: true }
            }
        });

        // Then create new records
        const updateData = {
            ...propertyData,
            images: {
                create: images?.map(image => ({ url: image.url })) || []
            },
            amenities: {
                create: amenities?.map(amenity => ({
                    name: amenity.name,
                    category: amenity.category
                })) || []
            },
            specifications: {
                create: specifications?.map(spec => ({
                    category: spec.category,
                    details: spec.details
                })) || []
            },
            location: location ? {
                create: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address,
                    city: location.city,
                    state: location.state,
                    zipCode: location.zipCode
                }
            } : undefined
        };

        // Handle agent connection
        if (agentId !== undefined) {
            if (agentId === null) {
                (updateData as any).agent = { disconnect: true };
            } else {
                (updateData as any).agent = { connect: { id: agentId } };
            }
        }

        try {
            const updatedProperty = await this.prisma.property.update({
                where: { id },
                data: updateData,
                include: {
                    images: true,
                    amenities: true,
                    specifications: true,
                    location: true,
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
                amenities: true,
                specifications: true,
                location: true,
                agent: true,
            },
        });
    }
} 