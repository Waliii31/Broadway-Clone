import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AdminService } from './admins.service';
import { Admins } from '../Schemas/admins.schema';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createAdmin(@Body() adminData: Partial<Admins>): Promise<Admins> {
    return this.adminService.createAdmin(adminData);
  }

  @Get()
  async getAllAdmins(): Promise<Admins[]> {
    return this.adminService.getAllAdmins();
  }

  @Get(':id')
  async getAdminById(@Param('id') adminId: string): Promise<Admins> {
    return this.adminService.getAdminById(adminId);
  }

  @Put(':id')
  async updateAdmin(
    @Param('id') adminId: string,
    @Body() updateData: Partial<Admins>,
  ): Promise<Admins> {
    return this.adminService.updateAdmin(adminId, updateData);
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') adminId: string): Promise<void> {
    return this.adminService.deleteAdmin(adminId);
  }
}