import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from '../Schemas/product.schema';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Products.name, schema: ProductsSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CloudinaryService],
})
export class ProductsModule {}