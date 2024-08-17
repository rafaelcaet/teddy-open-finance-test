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


  async create(email: string, pw: string): Promise<{ id: number }> {
    const hashedPassword = await hashPassword(pw)
    return this.userService.createUser({ email, password: hashedPassword })
  }

  async getByEmail(email: string): Promise<any> {

    return this.userService.getUserByEmail(email)

  }

  async checkClicks(code: string): Promise<string> {

    return this.userService.checkClicks(code)
  }

  async delete(shortUrl: string): Promise<string> {
    return this.userService.deleteLink(shortUrl)
  }


  async getLinksByEmail(email: string): Promise<any> {
    const userId = await this.userService.getUserId(email)
    return this.userService.getUserLinks(userId)
  }

  async addLink(email: string, url: string): Promise<any> {
    const userId = await this.userService.getUserId(email)
    return this.userService.addLinkToUser(userId, url)
  }

  async updateLink(newUrl: string, shortUrl: string): Promise<string> {
    return this.userService.updateLink(newUrl, shortUrl)
  }

}
