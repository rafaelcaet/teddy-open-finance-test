import { verifyPassword } from '../utils/unhashPassword';
import { HttpException } from '../helpers/HttpExceptions';
import { PrismaClient } from '@prisma/client';
import shortid from 'shortid'

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

    async getUserId(userEmail: string): Promise<number> {
        const userId = await prisma.users.findUnique({
            where: { email: userEmail }, select: { id: true }
        })
        return userId.id
    }

    async getUserByEmail(userEmail: string): Promise<{ email: string, links: any }> {
        try {

            const { email, links } = await prisma.users.findUnique({
                where: { email: userEmail }, select: { email: true, links: true }
            });
            return { email, links }
        } catch (err) { throw HttpException.userNotFound() }
    }

    async getUserLogin(email: string, password: string): Promise<{ id: number }> {
        try {
            const result = await prisma.users.findUnique({
                where: { email: email }, select: { password: true }
            })
            if (!await verifyPassword(password, result.password))
                return null
            const userId = await prisma.users.findUnique({
                where: { email: email }, select: { id: true }
            });
            return userId

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

    generateCode(size: number) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charsLength = chars.length;

        for (let i = 0; i < size; i++) {
            result += chars.charAt(Math.floor(Math.random() * charsLength));
        }

        return result;
    }

    async addLinkToUser(userId: number, url: string) {
        try {
            if (!url)
                throw HttpException.forbidden("invalid uRL")

            const code = this.generateCode(6);
            const shortUrl = 'http://localhost:3000/' + code
            await prisma.links.create({
                data: {
                    url,
                    shortUrl,
                    user: {
                        connect: { id: +userId },
                    },
                },
            })
            return { original: url, shorted: shortUrl }
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
