import { getCustomRepository } from 'typeorm';
import Costumer from '../infra/typeorm/entities/Costumer';
import CostumersRepository from '../infra/typeorm/reporitories/CustumersRepository';

class ListCostumerService {
  public async execute(): Promise<Costumer[]> {
    const costumersRepository = getCustomRepository(CostumersRepository);

    const costumers = await costumersRepository.find();

    return costumers;
  }
}
export default ListCostumerService;
