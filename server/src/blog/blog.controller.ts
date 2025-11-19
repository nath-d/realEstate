import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    // Blog CRUD
    @Post()
    async createBlog(@Body() data: any) {
        try {
            return await this.blogService.createBlog(data);
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to create blog',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Get()
    async getAllBlogs(@Query() query: any) {
        try {
            return await this.blogService.getAllBlogs({ where: query });
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to fetch blogs',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Blog Stats - must come before :id route
    @Get('stats')
    async getStats() {
        try {
            return await this.blogService.getBlogStats();
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to fetch blog stats',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Author CRUD - must come before :id route
    @Post('authors')
    async createAuthor(@Body() data: any) {
        try {
            return await this.blogService.createAuthor(data);
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to create author',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Get('authors')
    async getAllAuthors() {
        try {
            return await this.blogService.getAllAuthors();
        } catch (error) {
            throw new HttpException(
                error.message || 'Failed to fetch authors',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get('authors/:id')
    async getAuthorById(@Param('id') id: string) {
        try {
            return await this.blogService.getAuthorById(Number(id));
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                error.message || 'Failed to fetch author',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Put('authors/:id')
    async updateAuthor(@Param('id') id: string, @Body() data: any) {
        try {
            return await this.blogService.updateAuthor(Number(id), data);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                error.message || 'Failed to update author',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Delete('authors/:id')
    async deleteAuthor(@Param('id') id: string) {
        try {
            return await this.blogService.deleteAuthor(Number(id));
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                error.message || 'Failed to delete author',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    // Blog by ID - must come after all specific routes
    @Get(':id')
    async getBlogById(@Param('id') id: string) {
        try {
            return await this.blogService.getBlogById(Number(id));
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                error.message || 'Failed to fetch blog',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Put(':id')
    async updateBlog(@Param('id') id: string, @Body() data: any) {
        try {
            return await this.blogService.updateBlog(Number(id), data);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                error.message || 'Failed to update blog',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Delete(':id')
    async deleteBlog(@Param('id') id: string) {
        try {
            return await this.blogService.deleteBlog(Number(id));
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                error.message || 'Failed to delete blog',
                HttpStatus.BAD_REQUEST
            );
        }
    }
} 