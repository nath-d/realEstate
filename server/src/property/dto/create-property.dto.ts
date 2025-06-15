import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateImageDto {
    @IsString()
    url: string;
}

export class CreateAmenityDto {
    @IsString()
    name: string;

    @IsString()
    category: string;
}

export class CreatePropertySpecificationDto {
    @IsString()
    category: string;

    @IsArray()
    @IsString({ each: true })
    details: string[];
}

export class CreateLocationDto {
    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsString()
    address: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    zipCode: string;
}

export enum PropertyType {
    VILLA = 'villa',
    APARTMENT = 'apartment',
    HOUSE = 'house',
    PENTHOUSE = 'penthouse',
}

export enum PropertyStatus {
    FOR_SALE = 'for sale',
    FOR_RENT = 'for rent',
    SOLD = 'sold',
}

export class CreatePropertyDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsBoolean()
    @IsOptional()
    featured?: boolean;

    @IsEnum(PropertyType)
    type: PropertyType;

    @IsEnum(PropertyStatus)
    status: PropertyStatus;

    @IsNumber()
    bedrooms: number;

    @IsNumber()
    bathrooms: number;

    @IsNumber()
    garage: number;

    @IsString()
    lotSize: string;

    @IsString()
    livingArea: string;

    @IsNumber()
    yearBuilt: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateImageDto)
    images: CreateImageDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAmenityDto)
    amenities: CreateAmenityDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePropertySpecificationDto)
    specifications: CreatePropertySpecificationDto[];

    @ValidateNested()
    @Type(() => CreateLocationDto)
    location: CreateLocationDto;

    @IsNumber()
    @IsOptional()
    agentId?: number;
} 