import { FastifyRequest, FastifyReply } from 'fastify';
// Routers
import { routes } from './routes';
import { IUser } from '../interfaces/IUser';

export async function router(app: any): Promise<any> {
    // Status check route
    app.get('/', (req: FastifyRequest, res: FastifyReply) => {
        res.code(204).send('Ok.');
    });
    app.post('/auth', async (req: FastifyRequest, res: FastifyReply) => {
        try {
            const { email, password } = req.body as IUser;

            if (!email || !password) {
                return res.code(400).send({ error: 'Email e senha são necessários' });
            }

            if (email === 'user@example.com' && password === 'password') {
                return res.code(200).send({ message: 'Autenticação bem-sucedida' });
            } else {
                return res.code(401).send({ error: 'Credenciais inválidas' });
            }
        } catch (err) {
            console.error(err);
            return res.code(500).send({ error: 'Erro interno do servidor' });
        }
    });
    return Promise.all(routes(app));
}
