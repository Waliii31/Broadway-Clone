import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Section } from './section.schemas';

export type ProductsDocument = Products & Document;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt fields
export class Products {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }) // Reference to Section
  section: Section;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  oldPrice?: number;

  @Prop({ required: false })
  discount?: number;

  @Prop({ default: false })
  isNew: boolean;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);