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
                location: true,
                specifications: true,
                agent: true,
            },
            take: 3,
        });
    }

    async update(id: number, updatePropertyData: Prisma.PropertyUpdateInput) {
        // First, get the existing property to check if it exists
        const existingProperty = await this.prisma.property.findUnique({
            where: { id },
            include: { location: true, specifications: true }
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
                agent: true,
            },
        });
    }
} 