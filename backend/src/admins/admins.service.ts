import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admins, AdminsDocument } from '../Schemas/admins.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admins.name) private readonly adminModel: Model<AdminsDocument>,
  ) {}

  // Create a new admin
  async createAdmin(adminData: Partial<Admins>): Promise<Admins> {
    if (!adminData.adminPassword) {
      throw new Error('Admin password is required');
    }
    const hashedPassword = await bcrypt.hash(adminData.adminPassword, 10);
    const newAdmin = new this.adminModel({
      ...adminData,
      adminPassword: hashedPassword,
    });
    return newAdmin.save();
  }

  // Update an admin by ID
  async updateAdmin(adminId: string, updateData: Partial<Admins>): Promise<Admins> {
    const admin = await this.adminModel.findById(adminId).exec();
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }
  
    // Only hash and update the password if a new one is provided
    if (updateData.adminPassword) {
      updateData.adminPassword = await bcrypt.hash(updateData.adminPassword, 10);
    } else {
      // Keep the existing hashed password
      updateData.adminPassword = admin.adminPassword;
    }
  
    const updatedAdmin = await this.adminModel
      .findByIdAndUpdate(adminId, updateData, { new: true })
      .exec();
  
    if (!updatedAdmin) {
      throw new NotFoundException(`Admin with ID ${adminId} not found after update`);
    }
    return updatedAdmin;
  }

  // Get all admins
  async getAllAdmins(): Promise<Admins[]> {
    return this.adminModel.find().exec();
  }

  // Get a single admin by ID
  async getAdminById(adminId: string): Promise<Admins> {
    const admin = await this.adminModel.findById(adminId).exec();
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }
    return admin;
  }

  // Delete an admin by ID
  async deleteAdmin(adminId: string): Promise<void> {
    const result = await this.adminModel.findByIdAndDelete(adminId).exec();
    if (!result) {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }
  }
}