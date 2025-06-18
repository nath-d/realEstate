import { Test, TestingModule } from '@nestjs/testing';
import { PropertyService } from './property.service';
import { PrismaService } from '../prisma/prisma.service';
import { Property, Prisma } from '@prisma/client';

describe('PropertyService', () => {
    let service: PropertyService;
    let prismaService: PrismaService;

    const mockPrismaService = {
        property: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PropertyService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        service = module.get<PropertyService>(PropertyService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a property with Prisma types', async () => {
            const createData: Prisma.PropertyCreateInput = {
                title: 'Test Property',
                description: 'Test Description',
                price: 500000,
                type: 'house',
                status: 'for sale',
                bedrooms: 3,
                bathrooms: 2,
                garage: 1,
                lotSize: '5000 sq ft',
                livingArea: '2500 sq ft',
                yearBuilt: 2020,
                images: {
                    create: [{ url: 'https://example.com/image.jpg' }],
                },
                location: {
                    create: {
                        latitude: 34.0522,
                        longitude: -118.2437,
                        address: '123 Test St',
                        city: 'Test City',
                        state: 'CA',
                        zipCode: '90210',
                    },
                },
            };

            const expectedProperty = { id: 1, ...createData } as Property;
            mockPrismaService.property.create.mockResolvedValue(expectedProperty);

            const result = await service.create(createData);

            expect(mockPrismaService.property.create).toHaveBeenCalledWith({
                data: createData,
                include: {
                    images: true,
                    location: true,
                    agent: true,
                },
            });
            expect(result).toEqual(expectedProperty);
        });
    });

    describe('findAll', () => {
        it('should return all properties', async () => {
            const expectedProperties = [{ id: 1, title: 'Test Property' }] as Property[];
            mockPrismaService.property.findMany.mockResolvedValue(expectedProperties);

            const result = await service.findAll();

            expect(mockPrismaService.property.findMany).toHaveBeenCalledWith({
                include: {
                    images: true,
                    location: true,
                    agent: true,
                },
            });
            expect(result).toEqual(expectedProperties);
        });
    });

    describe('findOne', () => {
        it('should return a property by id', async () => {
            const expectedProperty = { id: 1, title: 'Test Property' } as Property;
            mockPrismaService.property.findUnique.mockResolvedValue(expectedProperty);

            const result = await service.findOne(1);

            expect(mockPrismaService.property.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: {
                    images: true,
                    location: true,
                    agent: true,
                },
            });
            expect(result).toEqual(expectedProperty);
        });
    });
}); 