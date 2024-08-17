import { UserService } from '../services/UserService';
import { HttpException } from '../helpers/HttpExceptions';
import { IUser } from '../interfaces/IUser';
import { hashPassword } from '../utils/hashPassword';
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
  async create(email: string, pw: string): Promise<{ id: number }> {
    const hashedPassword = await hashPassword(pw)
    return this.userService.createUser({ email, password: hashedPassword })
  }

  /**
   * get a user record from db
   * @param email:number
   */
  async getByEmail(email: string): Promise<any> {

    return this.userService.getUserByEmail(email)

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
  async getLinksByEmail(email: string): Promise<any> {
    const userId = await this.userService.getUserId(email)
    return this.userService.getUserLinks(userId)
  }

  async addLink(email: string, url: string): Promise<any> {
    const userId = await this.userService.getUserId(email)
    return this.userService.addLinkToUser(userId, url)
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
