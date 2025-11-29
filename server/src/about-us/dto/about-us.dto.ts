import { IsString, IsOptional, IsNumber, IsBoolean, IsUrl } from 'class-validator';

export class CreateAboutUsInfoDto {
  @IsOptional()
  @IsString()
  heroTitle?: string;

  @IsOptional()
  @IsString()
  heroSubtitle?: string;

  @IsOptional()
  @IsUrl()
  heroBackgroundUrl?: string;

  @IsOptional()
  @IsString()
  storyTitle?: string;

  @IsOptional()
  @IsString()
  storyParagraph1?: string;

  @IsOptional()
  @IsString()
  storyParagraph2?: string;

  @IsOptional()
  @IsString()
  valuesTitle?: string;

  @IsOptional()
  @IsString()
  valuesSubtitle?: string;

  @IsOptional()
  @IsString()
  teamTitle?: string;

  @IsOptional()
  @IsString()
  teamDescription?: string;

  @IsOptional()
  @IsString()
  ctaTitle?: string;

  @IsOptional()
  @IsString()
  ctaDescription?: string;

  @IsOptional()
  @IsString()
  ctaButtonText?: string;

  @IsOptional()
  @IsString()
  ctaButtonLink?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateAboutUsInfoDto {
  @IsOptional()
  @IsString()
  heroTitle?: string;

  @IsOptional()
  @IsString()
  heroSubtitle?: string;

  @IsOptional()
  @IsUrl()
  heroBackgroundUrl?: string;

  @IsOptional()
  @IsString()
  storyTitle?: string;

  @IsOptional()
  @IsString()
  storyParagraph1?: string;

  @IsOptional()
  @IsString()
  storyParagraph2?: string;

  @IsOptional()
  @IsString()
  valuesTitle?: string;

  @IsOptional()
  @IsString()
  valuesSubtitle?: string;

  @IsOptional()
  @IsString()
  teamTitle?: string;

  @IsOptional()
  @IsString()
  teamDescription?: string;

  @IsOptional()
  @IsString()
  ctaTitle?: string;

  @IsOptional()
  @IsString()
  ctaDescription?: string;

  @IsOptional()
  @IsString()
  ctaButtonText?: string;

  @IsOptional()
  @IsString()
  ctaButtonLink?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateAboutUsValueDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  icon: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsNumber()
  aboutUsInfoId: number;
}

export class UpdateAboutUsValueDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}

export class CreateAboutUsTeamMemberDto {
  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsUrl({}, { message: 'LinkedIn URL must be a valid URL' })
  linkedinUrl?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Twitter URL must be a valid URL' })
  twitterUrl?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsNumber()
  aboutUsInfoId: number;
}

export class UpdateAboutUsTeamMemberDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @IsOptional()
  @IsUrl()
  twitterUrl?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}
