import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OrdersDocument = Orders & Document;

export enum OrderStatus {
  COOKING = "Cooking Food",
  DELIVERING = "Delivering",
  COMPLETED = "Completed",
}

export enum PaymentType {
  CASH = "Cash",
  CARD = "Credit/Debit Card",
}

@Schema({ timestamps: true }) 
export class Orders {
  @Prop({ type: [{ product: { type: MongooseSchema.Types.ObjectId, ref: 'Products' }, quantity: Number }] })
  products: { product: string; quantity: number }[];

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  specialInstructions?: string;

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.COOKING })
  status: OrderStatus;

  @Prop({ required: true, enum: PaymentType })
  paymentType: PaymentType;

  @Prop({ required: true })
  totalPrice: number;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
