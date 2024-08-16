import { FastifyInstance } from 'fastify';
import { AuthService } from '../../services/AuthService';

export default async function authRoutes(server: FastifyInstance) {
    const authService = new AuthService(server);

    // Rota para login
    server.post('/login', async (request, reply) => {
        const credentials = request.body as { username: string; password: string };
        try {
            const token = await authService.login(credentials);
            return reply.send({ token });
        } catch (err) {
            return reply.status(401).send({ message: err.message });
        }
    });

    // Rota protegida
    server.get('/protected', { preValidation: [server.authenticate] }, async (request, reply) => {
        return reply.send({ message: 'You are authenticated!', user: request.user });
    });
}
