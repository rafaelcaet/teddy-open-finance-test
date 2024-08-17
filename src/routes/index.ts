import { FastifyRequest, FastifyReply } from 'fastify';
// Routers
import { routes } from './routes';
import { IUser } from '../interfaces/IUser';

export async function router(app: any): Promise<any> {
    // Status check route
    app.get('/', (req: FastifyRequest, res: FastifyReply) => {
        res.code(204).send('Ok.');
    });

    return Promise.all(routes(app));
}
