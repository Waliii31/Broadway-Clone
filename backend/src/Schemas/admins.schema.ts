import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt'; // For password hashing

export type AdminsDocument = Admins & Document;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt fields
export class Admins {
  @Prop({ required: true })
  adminName: string;

  @Prop({ required: true, unique: true }) // Ensure email is unique
  adminEmail: string;

  @Prop({ required: true })
  adminPassword: string;

  @Prop({
    required: true,
    type: [String],
    validate: {
      validator: (roles: string[]) => roles.length >= 1 && roles.length <= 3, // Min 1, Max 3 roles
      message: 'Roles must be between 1 and 3.',
    },
    enum: ['Admin', 'Orders Receiver', 'Rider'], // Allowed roles
  })
  adminRoles: string[];
}

export const AdminsSchema = SchemaFactory.createForClass(Admins);

// Password hashing middleware
AdminsSchema.pre<AdminsDocument>('save', async function (next) {
  if (this.isModified('adminPassword') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10); // Generate a salt
      const hashedPassword = await bcrypt.hash(this.adminPassword, salt); // Hash the password
      this.adminPassword = hashedPassword; // Replace the plain password with the hashed one
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});