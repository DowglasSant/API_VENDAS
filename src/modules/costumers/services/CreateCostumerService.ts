import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Costumer from '../infra/typeorm/entities/Costumer';
import CostumersRepository from '../infra/typeorm/reporitories/CustumersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCostumerService {
  public async execute({ name, email }: IRequest): Promise<Costumer> {
    const costumerRepository = getCustomRepository(CostumersRepository);
    const emailExists = await costumerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const costumer = costumerRepository.create({
      name,
      email,
    });

    await costumerRepository.save(costumer);

    return costumer;
  }
}
export default CreateCostumerService;
