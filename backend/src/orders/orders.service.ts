import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders, OrdersDocument } from '../Schemas/orders.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Orders.name) private ordersModel: Model<OrdersDocument>) {}

  async createOrder(orderData: any): Promise<Orders> {
    const newOrder = new this.ordersModel({
      fullName: orderData.fullName,
      address: orderData.address,
      phone: orderData.phone,
      email: orderData.email,
      specialInstructions: orderData.specialInstructions,
      status: orderData.status || 'Cooking Food',
      paymentType: orderData.paymentType,
      products: orderData.products.map((product: any) => ({
        product: product.product,
        quantity: product.quantity,
      })),
      totalPrice: orderData.totalPrice,
    });
    return await newOrder.save();
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

  async updateOrder(id: string, updateData: any): Promise<Orders> {
    const updatedOrder = await this.ordersModel
      .findByIdAndUpdate(id, updateData, { new: true })
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
