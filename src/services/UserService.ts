import { HttpException } from '../helpers/HttpExceptions';
import { IUser } from '@/interfaces/IUser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
    async createUser(data: { email: string; password: string }): Promise<{ id: number }> {
        try {
            const { id } = await prisma.users.create({
                data,
            });
            return { id }
        } catch (err) {
            throw HttpException.userAlreadyExists()
        }
    }

    async getUserByEmail(userId: number) {
        try {
            const { email, createdAt } = await prisma.users.findUnique({
                where: { id: +userId },
            });
            return { email: email, memberSince: createdAt }
        } catch (err) { throw HttpException.userNotFound() }
    }

    async getUserLinks(userId: number) {
        try {

            const links = await prisma.users.findUnique({
                where: {
                    id: +userId,
                },
                select: {
                    links: {
                        select: {
                            url: true
                        }
                    },
                },
            })
            if (!links)
                throw HttpException.userNotFound()
            return links
        } catch (err) { throw HttpException.userNotFound() }
    }

    async addLinkToUser(userId: number, url: string) {
        try {
            if (!url)
                throw HttpException.forbidden("invalid uRL")
            console.log('````', url, userId)
            await prisma.links.create({
                data: {
                    url,
                    user: {
                        connect: { id: +userId },
                    },
                },
            });
            return "uRL was created at"
        } catch (err) {
            throw HttpException.userNotFound()
        }
    }

    async updateUser(id: number, data: { name?: string; email?: string }) {
        return prisma.users.update({
            where: { id },
            data,
        });
    }

    async deleteUser(id: number) {
        return prisma.users.delete({
            where: { id },
        });
    }
}
