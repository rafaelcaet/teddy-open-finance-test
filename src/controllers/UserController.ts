import { HttpException } from '../helpers/HttpExceptions';
import { IUser } from '../interfaces/IUser';
import { HttpError } from 'http-errors';

export default class UserController {
  protected declare data: IUser;

  constructor(user?: IUser) {
    this.data = { ...user };
  }

  /**
   * create a user record on db
   * @param wallet:string
   */
  async create(name: string, email: string, password: string): Promise<void> {
    try {
      /**criar usuario no banco com sequelize */
    } catch (err: any) {
      throw HttpException.factory(err.parent?.errno, err.parent?.sqlMessage);
    }
  }

  /**
   * delete a user record on db
   * @param wallet:string
   */
  async delete(id: number): Promise<void> {
    try {
      /**deletar o usuario colocando data de delete no banco de dados */
    } catch (err: any) {
      throw HttpException.factory(err.parent?.errno, err.parent?.sqlMessage);
    }
  }

  /**
   * get a user record from db
   * @param wallet:string
   */
  async getLinksByEmail(email: string): Promise<void> {
    try {
      /**puxar o usuario do banco */
    } catch (err: any) {
      throw HttpException.userNotFound();
    }
  }



  /**
   * update user name and picture by wallet
   * @param wallet:string
   * @param name:string
   * @param picture:string
   */
  async update(
    id: number,
    newName: string,
    email?: string,
  ): Promise<void> {
    try {
      /**fazer a atualizacao do usuario */
      return;
    } catch (err: any) {
      throw HttpException.factory(err.parent?.errno, err.parent?.sqlMessage);
    }
  }

}
