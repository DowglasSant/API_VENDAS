import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Costumer from '../infra/typeorm/entities/Costumer';
import CostumersRepository from '../infra/typeorm/reporitories/CustumersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCostumerService {
  public async execute({ id, name, email }: IRequest): Promise<Costumer> {
    const costumersRepository = getCustomRepository(CostumersRepository);

    const costumer = await costumersRepository.findById(id);

    if (!costumer) {
      throw new AppError('User not found');
    }

    const costumerExists = await costumersRepository.findByEmail(email);

    if (costumerExists && costumer.email !== email) {
      throw new AppError('There is already one costumer with this email.');
    }

    costumer.name = name;
    costumer.email = email;

    await costumersRepository.save(costumer);

    return costumer;
  }
}

export default UpdateCostumerService;
