import { UserService } from '../services/UserService';
import { HttpException } from '../helpers/HttpExceptions';
import { IUser } from '../interfaces/IUser';

export default class UserController {
  protected declare data: IUser;
  private userService = new UserService()
  constructor(user?: IUser) {
    this.data = { ...user };
  }

  /**
   * create a user record on db
   * @param email:string
   * @param password:string
   */
  async create(email: string, password: string): Promise<{ id: number }> {

    return this.userService.createUser({ email, password })
  }

  /**
   * get a user record from db
   * @param id:number
   */
  async getById(id: number): Promise<any> {

    return this.userService.getUserByEmail(id)

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
  async getLinksById(id: number): Promise<any> {
    return this.userService.getUserLinks(id)
  }

  async addLink(id: number, url: string): Promise<any> {
    return this.userService.addLinkToUser(id, url)
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