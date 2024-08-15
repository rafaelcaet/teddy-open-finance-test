import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
    async createUser(data: { email: string; password: string }) {
        return prisma.users.create({
            data,
        });
    }

    async getUserById(id: number) {
        return prisma.users.findUnique({
            where: { id },
        });
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
