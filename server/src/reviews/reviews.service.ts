import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  private readonly GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  private readonly PLACE_ID = 'ChIJN1t_tDeuEmsRUsoyG83frY4'; // This needs to be replaced with actual Place ID for MG Construction & Pacific Realty

  async getGoogleReviews(): Promise<any> {
    if (!this.GOOGLE_PLACES_API_KEY) {
      throw new HttpException(
        'Google Places API key not configured',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${this.GOOGLE_PLACES_API_KEY}`
      );

      if (!response.ok) {
        throw new HttpException(
          'Failed to fetch reviews from Google Places API',
          HttpStatus.BAD_GATEWAY
        );
      }

      const data = await response.json();

      if (data.status !== 'OK') {
        throw new HttpException(
          `Google Places API error: ${data.status}`,
          HttpStatus.BAD_GATEWAY
        );
      }

      // Transform Google Reviews to match your testimonials format
      const transformedReviews = data.result.reviews?.map((review: any, index: number) => ({
        id: index + 1,
        name: review.author_name,
        role: "Google Reviewer",
        image: review.profile_photo_url || "/person1.jpeg",
        quote: review.text,
        rating: review.rating,
        location: "Verified Google Review",
        time: review.time,
        relative_time_description: review.relative_time_description
      })) || [];

      return {
        reviews: transformedReviews,
        overall_rating: data.result.rating,
        total_ratings: data.result.user_ratings_total,
        source: 'Google Places API'
      };

    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      
      // Return fallback static testimonials if API fails
      return this.getFallbackTestimonials();
    }
  }

  private getFallbackTestimonials() {
    return {
      reviews: [
        {
          id: 1,
          name: "Rajesh Kumar",
          role: "Homeowner",
          image: "/person1.jpeg",
          quote: "Finding our dream home was a breeze with MG Construction & Pacific Realty. The team's dedication and attention to detail made the entire process smooth and enjoyable. We couldn't be happier with our new home!",
          rating: 5,
          location: "Mumbai, Maharashtra"
        },
        {
          id: 2,
          name: "Priya Sharma",
          role: "Property Investor",
          image: "/person2.jpeg",
          quote: "As an investor, I need a platform I can trust. MG Construction & Pacific Realty has consistently delivered quality properties and excellent service. Their market insights have been invaluable for my investment decisions.",
          rating: 5,
          location: "Delhi, NCR"
        },
        {
          id: 3,
          name: "Amit Patel",
          role: "First-time Buyer",
          image: "/person1.jpeg",
          quote: "Being a first-time homebuyer, I was nervous about the process. The team at MG Construction & Pacific Realty guided me through every step, making it less daunting. Their expertise and patience were truly appreciated.",
          rating: 5,
          location: "Bangalore, Karnataka"
        },
        {
          id: 4,
          name: "Neha Gupta",
          role: "Property Seller",
          image: "/person3.jpeg",
          quote: "Selling my property through MG Construction & Pacific Realty was the best decision. They handled everything professionally and got me a great deal in record time. Highly recommend their services!",
          rating: 5,
          location: "Pune, Maharashtra"
        },
        {
          id: 5,
          name: "Vikram Singh",
          role: "Real Estate Developer",
          image: "/person1.jpeg",
          quote: "Working with MG Construction & Pacific Realty has been a game-changer for our projects. Their platform has helped us reach the right buyers and streamline our sales process significantly.",
          rating: 5,
          location: "Hyderabad, Telangana"
        }
      ],
      overall_rating: 4.9,
      total_ratings: 150,
      source: 'Static Fallback'
    };
  }

  // Method to find Place ID for a business (for setup purposes)
  async findPlaceId(businessName: string, location?: string): Promise<any> {
    if (!this.GOOGLE_PLACES_API_KEY) {
      throw new HttpException(
        'Google Places API key not configured',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    try {
      const query = encodeURIComponent(`${businessName} ${location || ''}`);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=place_id,name,formatted_address&key=${this.GOOGLE_PLACES_API_KEY}`
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error finding place ID:', error);
      throw new HttpException(
        'Failed to find place ID',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}









