import { UserService } from '../../services/UserService';
import { HttpException } from '../../helpers/HttpExceptions';
import { ILoginBody } from '../../interfaces/ILoginBody';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';


export async function auth(app: any) {
    app.post('/login', async (req: FastifyRequest, rep: FastifyReply) => {
        const { email, password } = req.body as ILoginBody;
        const userService = new UserService()
        const userExist = await userService.getUserLogin(email, password)
        if (!userExist) {
            throw HttpException.unauthorized("invalid credentials");
        }

        const token = app.jwt.sign({ email });
        return rep.send({ token });
    });

    // Rota protegida
    // app.get('/protected', { preValidation: [app.authenticate] }, );
}
