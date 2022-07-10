import { getCustomRepository } from 'typeorm';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import User from '../infra/typeorm/entities/User';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UserRepository);

    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
