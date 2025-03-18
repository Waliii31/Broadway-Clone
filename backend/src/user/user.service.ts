import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { Users, UsersDocument } from '../Schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private userModel: Model<UsersDocument>) {}

  async authenticate(userData: { name: string; email: string; phoneNumber: string }) {
    let user = await this.userModel.findOne({ email: userData.email });
  
    if (!user) {
      user = new this.userModel(userData);
      await user.save();
    }
  
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber }, // Include user ID
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );
  
    return { token, message: 'User logged in successfully', user };
  }

  async updateUser(userId: string, updateData: { name?: string; email?: string; phoneNumber?: string }) {
    console.log('Updating user with ID:', userId); // Debugging: Log the userId
    const user = await this.userModel.findById(userId);
  
    if (!user) {
      throw new Error('User not found');
    }
  
    // Update only the fields provided in the updateData
    if (updateData.name) user.name = updateData.name;
    if (updateData.email) user.email = updateData.email;
    if (updateData.phoneNumber) user.phoneNumber = updateData.phoneNumber;
  
    await user.save();
  
    return { message: 'User details updated successfully', user };
  }
}