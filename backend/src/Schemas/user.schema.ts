import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';

export type UserDocument = User & Document & {
    comparePassword: (candidatePassword: string) => Promise<boolean>;
  };

@Schema({ timestamps: true }) // Adds createdAt and updatedAt fields
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // Store the hashed password here

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save hook to hash the password before saving
UserSchema.pre<UserDocument>('save', async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(12); // Generate a salt
    const hash = await bcrypt.hash(user.password, salt); // Hash the password
    user.password = hash; // Replace the plaintext password with the hashed one
    next();
  } catch (error) {
    next(error);
  }
});

// Add the comparePassword method
UserSchema.methods.comparePassword = async function (
    candidatePassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  };