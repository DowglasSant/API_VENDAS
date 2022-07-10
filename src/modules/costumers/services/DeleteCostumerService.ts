import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CostumersRepository from '../infra/typeorm/reporitories/CustumersRepository';

interface IRequest {
  id: string;
}

class DeleteCostumerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CostumersRepository);

    const costumer = await customersRepository.findById(id);

    if (!costumer) {
      throw new AppError('User not found');
    }

    await customersRepository.remove(costumer);
  }
}

export default DeleteCostumerService;
