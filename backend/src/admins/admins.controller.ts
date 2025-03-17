import {
  Controller, Post, Body, Get, Param, Put, Delete, UnauthorizedException
} from '@nestjs/common';
import { AdminService } from './admins.service';
import { Admins } from '../Schemas/admins.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ✅ Login Route
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const admin = await this.adminService.findAdminByEmail(email);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.adminPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      { email: admin.adminEmail, roles: admin.adminRoles }, // _id is removed
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );

    return { token, roles: admin.adminRoles };
  }

  // ✅ Create an Admin
  @Post('create')
  async createAdmin(@Body() adminData: Partial<Admins>) {
    return this.adminService.createAdmin(adminData);
  }

  // ✅ Get all admins
  @Get()
  async getAllAdmins(): Promise<Admins[]> {
    return this.adminService.getAllAdmins();
  }

  // ✅ Get admin by ID
  @Get(':id')
  async getAdminById(@Param('id') adminId: string): Promise<Admins> {
    return this.adminService.getAdminById(adminId);
  }

  // ✅ Update Admin
  @Put(':id')
  async updateAdmin(
    @Param('id') adminId: string,
    @Body() updateData: Partial<Admins>,
  ): Promise<Admins> {
    return this.adminService.updateAdmin(adminId, updateData);
  }

  // ✅ Delete Admin
  @Delete(':id')
  async deleteAdmin(@Param('id') adminId: string): Promise<void> {
    return this.adminService.deleteAdmin(adminId);
  }
}