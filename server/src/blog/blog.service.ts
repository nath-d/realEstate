import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService) { }

    // Blog CRUD
    async createBlog(data: any) {
        return this.prisma.blog.create({
            data,
            include: {
                author: true,
                views: true
            }
        });
    }

    async getAllBlogs(params: any = {}) {
        return this.prisma.blog.findMany({
            ...params,
            include: {
                author: true,
                views: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    async getBlogById(id: number) {
        const blog = await this.prisma.blog.findUnique({
            where: { id },
            include: {
                author: true,
                views: true
            }
        });
        if (!blog) throw new NotFoundException('Blog not found');
        return blog;
    }

    async updateBlog(id: number, data: any) {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog) throw new NotFoundException('Blog not found');

        return this.prisma.blog.update({
            where: { id },
            data,
            include: {
                author: true,
                views: true
            }
        });
    }

    async deleteBlog(id: number) {
        const blog = await this.prisma.blog.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        views: true
                    }
                }
            }
        });

        if (!blog) throw new NotFoundException('Blog not found');

        // Check if blog has associated views
        if (blog._count.views > 0) {
            console.log(`Deleting blog with ${blog._count.views} associated views (will be cascaded)`);
        }

        return this.prisma.blog.delete({ where: { id } });
    }

    // Author CRUD
    async createAuthor(data: any) {
        return this.prisma.blogAuthor.create({ data });
    }

    async getAllAuthors() {
        return this.prisma.blogAuthor.findMany({
            include: {
                _count: {
                    select: {
                        blogs: true
                    }
                }
            }
        });
    }

    async getAuthorById(id: number) {
        const author = await this.prisma.blogAuthor.findUnique({
            where: { id },
            include: {
                blogs: true,
                _count: {
                    select: {
                        blogs: true
                    }
                }
            }
        });
        if (!author) throw new NotFoundException('Author not found');
        return author;
    }

    async updateAuthor(id: number, data: any) {
        const author = await this.prisma.blogAuthor.findUnique({ where: { id } });
        if (!author) throw new NotFoundException('Author not found');

        return this.prisma.blogAuthor.update({ where: { id }, data });
    }

    async deleteAuthor(id: number) {
        const author = await this.prisma.blogAuthor.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        blogs: true
                    }
                }
            }
        });

        if (!author) throw new NotFoundException('Author not found');

        // Check if author has associated blogs
        if (author._count.blogs > 0) {
            // With cascade delete, this will now work, but we can provide a warning
            console.log(`Deleting author with ${author._count.blogs} associated blogs (will be cascaded)`);
        }

        return this.prisma.blogAuthor.delete({ where: { id } });
    }

    // Blog Views
    async addView(blogId: number, ip: string) {
        return this.prisma.blogView.create({ data: { blogId, ip } });
    }

    async getBlogStats() {
        const total = await this.prisma.blog.count();
        const views = await this.prisma.blogView.count();
        const authors = await this.prisma.blogAuthor.count();
        const published = await this.prisma.blog.count({
            where: { status: 'published' }
        });
        const drafts = await this.prisma.blog.count({
            where: { status: 'draft' }
        });

        return {
            total,
            views,
            authors,
            published,
            drafts
        };
    }
} 