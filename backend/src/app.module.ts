import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SectionModule } from './section/section.module';
import { ProductsModule } from './products/products.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/broadway'),
    UserModule,
    SectionModule,
    ProductsModule,
    AdminsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
