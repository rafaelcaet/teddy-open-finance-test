import { FastifyReply, FastifyRequest } from "fastify";
import UserController from "../../controllers/UserController";
import { IUSerParams } from "../../interfaces/IUserParams";
import { IUser } from "../../interfaces/IUser";


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
 * @param req:DecoratedRequest
 * @param res:FastifyReply
 */
export const deleteOne = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as IUSerParams;
    const userController = new UserController();
    const result = await userController.delete(id);
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

/**
 * add links to user
 * @param req
 * @param res
 */
export const addLink = async (req: FastifyRequest, res: FastifyReply) => {
    const { email } = req.user as { email: string };
    const { url } = req.body as { url: string }
    const userController = new UserController();
    const result = await userController.addLink(email, url);
    res.send(result);
};
/**
 * update a user
 * @param req:IResquest
 * @param res:FastifyReply
 */
export const update = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as IUSerParams;
    const { newName, email } = req.body as { newName: string, email: string }
    const userController = new UserController();
    const result = await userController.update(id, newName, email);
    res.send(result);
};


