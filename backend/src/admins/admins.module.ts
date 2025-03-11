import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {Admins, AdminsSchema} from '../Schemas/admins.schema'
import { AdminService } from './admins.service';
import { AdminController } from './admins.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Admins.name, schema: AdminsSchema}])
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminsModule {}
