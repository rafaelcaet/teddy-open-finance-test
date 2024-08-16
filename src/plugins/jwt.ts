import fp from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';

export default fp(async (server: FastifyInstance) => {
    server.register(fastifyJwt as any, {
        secret: process.env.JWT_SECRET,
    });

    server.decorate('authenticate', async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            await req.jwtVerify();
        } catch (err) {
            return rep.send(err.error);
        }
    });
});
