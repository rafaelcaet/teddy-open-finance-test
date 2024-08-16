declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: { username: string };
        user: { username: string };
    }
}
