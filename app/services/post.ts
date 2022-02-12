import { PrismaClient, articles } from '@prisma/client';

const prisma = new PrismaClient()

export async function getPost(slug: string) {
    let post = null;
    try {
        post = await prisma.articles.findFirst({
            where: { slug: slug, deleted: false }
        });
    } catch (err) {
        console.log(err)
    }
    const response = {
        count: post ? 1 : 0,
        data: post,
        total_pages: post ? 1 : 0,
        page: 1,
        limit: 1
    };
    return response;
}

export async function getPosts(page = 1, limit = 10) {
    const skip: number = (page - 1) * limit;
    const take: number = limit;
    let total = 0;
    let posts: articles[] = [];
    
    try {
        total = await prisma.articles.count({
            where: { deleted: false }
        });
        posts = await prisma.articles.findMany({
            skip: skip,
            take: take,
            where: { deleted: false },
            orderBy: {
                created_on: 'desc',
            }
        });
    } catch (err) {
        console.log(err);
    }
    const response = {
        count: total,
        data: posts,
        total_pages: total != 0 ? Math.ceil(total / limit) : 0,
        page: page,
        limit: limit
    };
    return response;
}