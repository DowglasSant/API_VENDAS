import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../infra/typeorm/repositories/UserRepository';
import User from '../infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  userAuth: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userAuth = await usersRepository.findByEmail(email);

    if (!userAuth) {
      throw new AppError('Incorrect email/password.', 401);
    }

    const passwordConfirmed = await compare(password, userAuth.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: userAuth.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      userAuth,
      token,
    };
  }
}
export default CreateSessionService;
