import { HttpException } from '../../helpers/HttpExceptions';
import { ILoginBody } from '../../interfaces/ILoginBody';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';


export async function auth(app: any) {
    app.post('/login', async (req: FastifyRequest, rep: FastifyReply) => {
        const { email, password } = req.body as ILoginBody;

        // Validação simplificada de credenciais
        if (email !== 'admin' || password !== 'admin') {
            return rep.status(401).send({ message: 'Credenciais inválidas' });
        }

        // Geração do token JWT
        const token = app.jwt.sign({ email });
        return rep.send({ token });
    });

    // Rota protegida
    app.get('/protected', { preValidation: [app.authenticate] }, async (request, reply) => {
        console.log("oi")
    });
}
