import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders, OrdersDocument } from '../Schemas/orders.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Orders.name) private ordersModel: Model<OrdersDocument>) { }

  async getOrderStatus(id: string): Promise<{ status: string }> {
    const order = await this.ordersModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return { status: order.status };
  }

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
        product: product.product, // Ensure this is the product ID
        quantity: product.quantity,
      })),
      totalPrice: orderData.totalPrice,
    });
    return await newOrder.save();
  }

  async getAllOrders(): Promise<Orders[]> {
    const orders = await this.ordersModel
      .find()
      .populate('products.product') // Populate the product details
      .exec();
    return orders;
  }

  async getOrdersByEmail(email: string): Promise<Orders[]> {
    const orders = await this.ordersModel
      .find({ email }) // Find orders with the provided email
      .populate('products.product') // Populate the product details
      .exec();

    if (!orders || orders.length === 0) {
      throw new NotFoundException(`No orders found for email: ${email}`);
    }

    return orders;
  }

  async getCookingOrders(): Promise<Orders[]> {
    const orders = await this.ordersModel
      .find({ status: 'Cooking Food' })
      .populate('products.product')
      .exec();
    return orders;
  }

  async getDeliveringOrders(): Promise<Orders[]> {
    const orders = await this.ordersModel
      .find({ status: 'Delivering' })
      .populate('products.product')
      .exec();
    return orders;
  }

  async getOrderById(id: string): Promise<Orders> {
    const order = await this.ordersModel
      .findById(id)
      .populate('products.product') // Populate the product details
      .exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async updateOrder(id: string, updateData: any): Promise<Orders> {
    const updatedOrder = await this.ordersModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('products.product') // Populate the product details
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