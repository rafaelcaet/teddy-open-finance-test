import { FastifyReply, FastifyRequest } from "fastify";
import UserController from "../../controllers/UserController";
import { IUser } from "../../interfaces/IUser";
import * as jwt from 'jsonwebtoken'


/**
 * create one user
 * @param req
 * @param res
*/
export const createOne = async (req: FastifyRequest, res: FastifyReply) => {
    const { email, password } = req.body as IUser;
    const userController = new UserController()
    const result = await userController.create(email, password);
    res.send(result);
};

/**
 * get one user
 * @param req
 * @param res
*/
export const getByEmail = async (req: FastifyRequest, res: FastifyReply) => {
    const { email } = req.user as { email: string }
    const userController = new UserController()
    const result = await userController.getByEmail(email);
    res.send(result);
};

/**
 * delete one user
 * @param req
 * @param res
 */
export const deleteOne = async (req: FastifyRequest, res: FastifyReply) => {
    const { shortUrl } = req.body as { shortUrl: string };
    const userController = new UserController()
    const result = await userController.delete(shortUrl);
    res.send(result);
};

/**
 * get user links
 * @param req
 * @param res
 */
export const getLinks = async (req: FastifyRequest, res: FastifyReply) => {
    const { email } = req.user as { email: string };
    const userController = new UserController();
    const result = await userController.getLinksByEmail(email);
    res.send(result);
};

export const checkClicks = async (req: FastifyRequest, res: FastifyReply) => {
    const { code } = req.params as { code: string };
    const userController = new UserController();
    const result = await userController.checkClicks(code);

    if (!result) {
        return res.status(404).send({ message: 'Url not found' });
    }

    return res.redirect(result);
}

/**
 * add links to user
 * @param req
 * @param res
 */
export const addLink = async (req: FastifyRequest, res: FastifyReply) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    let email: string
    if (token) {
        const result = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
        email = result.email
    }
    const { url } = req.body as { url: string }
    const userController = new UserController();
    const result = await userController.addLink(url, email);
    res.send(result);
};

/**
 * update a user link
 * @param req
 * @param res
 */
export const update = async (req: FastifyRequest, res: FastifyReply) => {
    const { newUrl, shortUrl } = req.body as { newUrl: string, shortUrl: string };
    const userController = new UserController();
    const result = await userController.updateLink(newUrl, shortUrl);
    res.send(result);
};


