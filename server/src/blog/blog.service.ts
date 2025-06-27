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
                category: true,
                author: true,
                views: true
            }
        });
    }

    async getAllBlogs(params: any = {}) {
        return this.prisma.blog.findMany({
            ...params,
            include: {
                category: true,
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
                category: true,
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
                category: true,
                author: true,
                views: true
            }
        });
    }

    async deleteBlog(id: number) {
        const blog = await this.prisma.blog.findUnique({ where: { id } });
        if (!blog) throw new NotFoundException('Blog not found');

        return this.prisma.blog.delete({ where: { id } });
    }

    // Category CRUD
    async createCategory(data: any) {
        return this.prisma.blogCategory.create({ data });
    }

    async getAllCategories() {
        return this.prisma.blogCategory.findMany({
            include: {
                _count: {
                    select: {
                        blogs: true
                    }
                }
            }
        });
    }

    async getCategoryById(id: number) {
        const category = await this.prisma.blogCategory.findUnique({
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
        if (!category) throw new NotFoundException('Category not found');
        return category;
    }

    async updateCategory(id: number, data: any) {
        const category = await this.prisma.blogCategory.findUnique({ where: { id } });
        if (!category) throw new NotFoundException('Category not found');

        return this.prisma.blogCategory.update({ where: { id }, data });
    }

    async deleteCategory(id: number) {
        const category = await this.prisma.blogCategory.findUnique({ where: { id } });
        if (!category) throw new NotFoundException('Category not found');

        return this.prisma.blogCategory.delete({ where: { id } });
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
        const author = await this.prisma.blogAuthor.findUnique({ where: { id } });
        if (!author) throw new NotFoundException('Author not found');

        return this.prisma.blogAuthor.delete({ where: { id } });
    }

    // Blog Views
    async addView(blogId: number, ip: string) {
        return this.prisma.blogView.create({ data: { blogId, ip } });
    }

    async getBlogStats() {
        const total = await this.prisma.blog.count();
        const views = await this.prisma.blogView.count();
        const categories = await this.prisma.blogCategory.count();
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
            categories,
            authors,
            published,
            drafts
        };
    }
} 