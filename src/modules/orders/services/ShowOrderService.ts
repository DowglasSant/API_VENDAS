import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Orders';
import { OrderRepository } from '../infra/typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const orderRepository = new OrderRepository();

    const order = await orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}

export default ShowOrderService;
