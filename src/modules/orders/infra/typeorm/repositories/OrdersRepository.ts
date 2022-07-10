import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Orders';
import Costumer from '@modules/costumers/infra/typeorm/entities/Costumer';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Costumer;
  products: IProduct[];
}

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.findOne(id, {
      relations: ['order_products', 'custumer'],
    });

    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}
