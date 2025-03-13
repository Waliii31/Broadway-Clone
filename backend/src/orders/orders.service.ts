import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders, OrdersDocument } from '../Schemas/orders.schema';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Orders.name) private ordersModel: Model<OrdersDocument>) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Orders> {
    const newOrder = new this.ordersModel(createOrderDto);
    return newOrder.save();
  }

  async getAllOrders(): Promise<Orders[]> {
    return this.ordersModel.find().populate('products.product').exec();
  }

  async getOrderById(id: string): Promise<Orders> {
    const order = await this.ordersModel.findById(id).populate('products.product').exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Orders> {
    const updatedOrder = await this.ordersModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .populate('products.product')
      .exec();
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<{ message: string }> {
    const deletedOrder = await this.ordersModel.findByIdAndDelete(id);
    if (!deletedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return { message: 'Order deleted successfully' };
  }
}
