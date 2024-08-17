import { FastifyRequest, FastifyReply } from 'fastify';
// Routers
import { routes } from './routes';
import { checkClicks } from './user/user';

export async function router(app: any): Promise<any> {
    // Status check route
    app.get('/', (req: FastifyRequest, res: FastifyReply) => {
        res.code(204).send('Ok.');
    });
    app.get('/:code', checkClicks);
    return Promise.all(routes(app));
}
