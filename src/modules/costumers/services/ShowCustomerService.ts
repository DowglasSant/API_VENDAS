import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Costumer from '../infra/typeorm/entities/Costumer';
import CostumersRepository from '../infra/typeorm/reporitories/CustumersRepository';

interface IRequest {
  id: string;
}

class ShowCostumerService {
  public async execute({ id }: IRequest): Promise<Costumer> {
    const customersRepository = getCustomRepository(CostumersRepository);

    const costumer = await customersRepository.findById(id);

    if (!costumer) {
      throw new AppError('User not found');
    }

    return costumer;
  }
}

export default ShowCostumerService;
