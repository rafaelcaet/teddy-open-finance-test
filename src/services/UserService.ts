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

    async getUserByEmail(id: number) {
        try {
            id = +id
            const { email, createdAt } = await prisma.users.findUnique({
                where: { id },
            });
            return { email: email, memberSince: createdAt }
        } catch (err) { throw HttpException.userNotFound() }
    }

    /**criar um end point para poder editar os links do usuario
     * o usuario deve ser capaz de editar os enderecos de destino
     * 
     * 
     */


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
