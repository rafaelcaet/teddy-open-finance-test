import { IUSerParams } from "../../interfaces/IUserParams";
import { FastifyReply, FastifyRequest } from "fastify";
import { IUser, IUserParams } from "../../interfaces/IUser";
import UserController from "../../controllers/UserController";


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
 * get a user
 * @param req
 * @param res
 */
export const getLinks = async (req: FastifyRequest, res: FastifyReply) => {
    const { email } = req.body as IUser;
    const userController = new UserController();
    const result = await userController.getLinksByEmail(email);
    res.send(result);
};

/**
 * update a user
 * @param req:IResquest
 * @param res:FastifyReply
 */
export const update = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as IUserParams;
    const { newName, email } = req.body as { newName: string, email: string }
    const userController = new UserController();
    const result = await userController.update(id, newName, email);
    res.send(result);
};


