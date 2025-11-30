import { Controller, Get, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('google')
  async getGoogleReviews() {
    return this.reviewsService.getGoogleReviews();
  }

  @Get('find-place-id')
  async findPlaceId(
    @Query('business') businessName: string,
    @Query('location') location?: string
  ) {
    if (!businessName) {
      return { error: 'Business name is required' };
    }
    return this.reviewsService.findPlaceId(businessName, location);
  }
}






