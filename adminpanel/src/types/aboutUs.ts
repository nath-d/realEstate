export interface AboutUsInfo {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundUrl?: string;
  storyTitle: string;
  storyParagraph1?: string;
  storyParagraph2?: string;
  valuesTitle: string;
  valuesSubtitle: string;
  teamTitle: string;
  teamDescription?: string;
  ctaTitle: string;
  ctaDescription?: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  values: AboutUsValue[];
  teamMembers: AboutUsTeamMember[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AboutUsValue {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  aboutUsInfoId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AboutUsTeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  order: number;
  aboutUsInfoId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAboutUsInfoDto {
  heroTitle?: string;
  heroSubtitle?: string;
  heroBackgroundUrl?: string;
  storyTitle?: string;
  storyParagraph1?: string;
  storyParagraph2?: string;
  valuesTitle?: string;
  valuesSubtitle?: string;
  teamTitle?: string;
  teamDescription?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  isActive?: boolean;
}

export interface CreateAboutUsValueDto {
  title: string;
  description: string;
  icon: string;
  order?: number;
  aboutUsInfoId: number;
}

export interface CreateAboutUsTeamMemberDto {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  order?: number;
  aboutUsInfoId: number;
}
