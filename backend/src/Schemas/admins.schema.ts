import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type AdminsDocument = Admins & Document;

@Schema({ timestamps: true })
export class Admins {

  @Prop({ required: true })
  adminName: string;

  @Prop({ required: true, unique: true })
  adminEmail: string;

  @Prop({ required: true })
  adminPassword: string;

  @Prop({
    required: true,
    type: [String],
    enum: ['Admin', 'Orders Receiver', 'Rider'],
    validate: {
      validator: (roles: string[]) => roles.length >= 1 && roles.length <= 3,
      message: 'Roles must be between 1 and 3.',
    },
  })
  adminRoles: string[];
}

export const AdminsSchema = SchemaFactory.createForClass(Admins);

// ✅ Hash password before saving
AdminsSchema.pre<AdminsDocument>('save', async function (next) {
  if (this.isModified('adminPassword')) {
    this.adminPassword = await bcrypt.hash(this.adminPassword, 10);
  }
  next();
});
