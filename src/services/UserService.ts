import { verifyPassword } from '../utils/unhashPassword';
import { HttpException } from '../helpers/HttpExceptions';
import { PrismaClient } from '@prisma/client';
import { generateCode } from '../utils/generateCode'
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

    async checkClicks(code: string): Promise<string> {
        const shortUrl = `http://localhost:${process.env.PORT}/` + code
        try {
            const { url } = await prisma.links.findFirst({
                where: {
                    shortUrl
                }, select: {
                    url: true
                }
            })
            if (!url)
                return ''
            await prisma.links.update({
                where: {
                    shortUrl
                }, data: {
                    clicks: {
                        increment: 1,
                    },
                },
            })

            return url
        } catch (err) {
            throw HttpException.forbidden()
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
                where: {
                    email: userEmail
                }, select: {
                    email: true,
                    links: {
                        where: {
                            deletedAt: null,
                        },
                    },
                },

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
                        where: {
                            deletedAt: null
                        },
                        select: {
                            url: true,
                            shortUrl: true,
                            clicks: true,
                        },
                    },
                },
            });

            if (!links)
                throw HttpException.userNotFound()
            return links
        } catch (err) { throw HttpException.userNotFound() }
    }

    async addLinkToUser(url: string, email?: string,) {
        try {
            if (!url)
                throw HttpException.forbidden("invalid uRL")

            const code = generateCode(6);
            const shortUrl = `http://localhost:${process.env.PORT}/` + code

            if (!email) {
                await prisma.links.create({
                    data: {
                        url,
                        shortUrl,
                    },
                })
                return { original: url, shorted: shortUrl }
            }
            await prisma.links.create({
                data: {
                    url,
                    shortUrl,
                    user: {
                        connect: { email },
                    },
                },
            })
            return { original: url, shorted: shortUrl }
        } catch (err) {
            throw HttpException.userNotFound()
        }
    }
    async generateLink(url: string) {
        try {
            if (!url)
                throw HttpException.forbidden("invalid uRL")

            const code = generateCode(6);
            const shortUrl = `http://localhost:${process.env.PORT}/` + code
            await prisma.links.create({
                data: {
                    url,
                    shortUrl,
                },
            })
            return { original: url, shorted: shortUrl }
        } catch (err) {
            throw HttpException.userNotFound()
        }
    }

    async updateLink(newUrl: string, shortUrl: string) {
        try {
            await prisma.links.update({
                where: {
                    shortUrl,
                    deletedAt: null,
                },
                data: {
                    url: newUrl,
                },
            });
            return `${shortUrl} was updated to ${newUrl}`;
        }
        catch (err) {
            throw HttpException.unprocessableEntity("Url not found")
        }
    }

    async deleteLink(shortUrl: string) {
        try {
            await prisma.links.update({
                where: {
                    shortUrl
                }, data: {
                    deletedAt: new Date(),
                },
            })
            return (`${shortUrl} was deleted`)
        } catch (err) {
            throw HttpException.unprocessableEntity("Url not found")
        }
    }
}
