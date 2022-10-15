import { UserModel } from '../../database';

class UserService {
  createUser(user: Partial<UserModel>): Promise<UserModel> | null {
    return UserModel.create(user)
      .then(data => data.get({plain: true}));
  }

  findOneByParams(findObject: any): Promise<UserModel> | null {
    return UserModel.findOne({where: findObject});
  }
}

export const userService = new UserService();
