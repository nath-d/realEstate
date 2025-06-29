export interface BlogAuthor {
    id: number;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
    _count?: {
        blogs: number;
    };
}

export interface Blog {
    id: number;
    title: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    status: 'draft' | 'published';
    authorId: number;
    author: BlogAuthor;
    tags: string[];
    metaTitle?: string;
    metaDescription?: string;
    createdAt: string;
    updatedAt: string;
    _count?: {
        views: number;
    };
}

export interface CreateBlogData {
    title: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    status: 'draft' | 'published';
    authorId: number;
    tags?: string[];
    metaTitle?: string;
    metaDescription?: string;
}

export interface CreateAuthorData {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
} 