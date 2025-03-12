import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryConfig } from './cloudnary.config';
import { UserModule } from './user/user.module';
import { SectionModule } from './section/section.module';
import { ProductsModule } from './products/products.module';
import { AdminsModule } from './admins/admins.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/broadway'),
    ConfigModule.forRoot(),
    UserModule,
    SectionModule,
    ProductsModule,
    AdminsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryConfig, CloudinaryService],
})
export class AppModule {}
