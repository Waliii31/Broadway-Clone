import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders, OrdersSchema } from '../Schemas/orders.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
