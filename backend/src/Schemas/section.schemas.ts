import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SectionDocument = Section & Document;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt fields
export class Section {
  @Prop({ required: true })
  title: string;
}

export const SectionSchema = SchemaFactory.createForClass(Section);