import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admins, AdminsDocument } from '../Schemas/admins.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admins.name) private readonly adminModel: Model<AdminsDocument>) { }

  // ✅ Create a new admin with hashed password
  async createAdmin(adminData: Partial<Admins>): Promise<Admins> {
    if (!adminData.adminPassword) {
      throw new Error('Admin password is required');
    }

    // ✅ Check if email already exists
    const existingAdmin = await this.adminModel.findOne({ adminEmail: adminData.adminEmail });
    if (existingAdmin) {
      throw new Error('Admin with this email already exists');
    }

    const newAdmin = new this.adminModel(adminData);
    return newAdmin.save();
  }

  // ✅ Find admin by email
  async findAdminByEmail(email: string): Promise<Admins | null> {
    return this.adminModel.findOne({ adminEmail: email }).exec();
  }

  // ✅ Login admin and generate JWT token
  async login(email: string, password: string): Promise<{ token: string; roles: string[] }> {
    const admin = await this.adminModel.findOne({ adminEmail: email }).exec();
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.adminPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      { email: admin.adminEmail, roles: admin.adminRoles },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );

    return { token, roles: admin.adminRoles };
  }

  // ✅ Get all admins (with performance optimization)
  async getAllAdmins(): Promise<Admins[]> {
    return this.adminModel.find().lean().exec();
  }

  // ✅ Get an admin by ID
  async getAdminById(adminId: string): Promise<Admins> {
    const admin = await this.adminModel.findById(adminId).lean().exec();
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }
    return admin;
  }

  // ✅ Update an admin by ID
  async updateAdmin(adminId: string, updateData: Partial<Admins>): Promise<Admins> {
    const admin = await this.adminModel.findById(adminId);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }

    // Only hash password if it's updated
    if (updateData.adminPassword) {
      updateData.adminPassword = await bcrypt.hash(updateData.adminPassword, 10);
    }

    const updatedAdmin = await this.adminModel.findByIdAndUpdate(adminId, updateData, { new: true }).lean().exec();
    if (!updatedAdmin) {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }
    return updatedAdmin;
  }

  // ✅ Delete an admin by ID
  async deleteAdmin(adminId: string): Promise<void> {
    const result = await this.adminModel.findByIdAndDelete(adminId).exec();
    if (!result) {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }
  }
}
