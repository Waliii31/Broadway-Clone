import { Controller, Get, Post, Put, Delete, Body, Param, Patch, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id/status')
  async getOrderStatus(@Param('id') id: string) {
    return this.ordersService.getOrderStatus(id);
  }

  @Get('user-orders') 
  async getOrdersByEmail(@Query('email') email: string) {
    return this.ordersService.getOrdersByEmail(email);
  }

  @Post()
  async createOrder(@Body() orderData: any) {
    return this.ordersService.createOrder(orderData);
  }

  @Get()
  async getAllOrders(){
    return this.ordersService.getAllOrders();
  }

  @Get('cooking') // Unique path for cooking orders
  async getCookingOrders() {
    return this.ordersService.getCookingOrders();
  }

  @Get('delivering') // Unique path for delivering orders
  async getDeliveringOrders() {
    return this.ordersService.getDeliveringOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Patch(':id')
  async updateOrder(@Param('id') id: string, @Body() updateData: any) {
    return this.ordersService.updateOrder(id, updateData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}