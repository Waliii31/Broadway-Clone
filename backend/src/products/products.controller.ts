import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service'; // Import CloudinaryService

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService, // Inject CloudinaryService
  ) {}

  // Upload product image to Cloudinary
  @Post('image')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the field name for the image
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      // Upload the image to Cloudinary
      const imageUrl = await this.cloudinaryService.uploadImage(file);
      return { imageUrl }; // Return the Cloudinary image URL
    } catch (error) {
      return { error: 'Failed to upload image', details: error.message };
    }
  }

  // Create a new product
  @Post()
  async create(@Body() productDto: any) {
    console.log('Received product data:', productDto);
    return this.productsService.create(productDto);
  }

  // Fetch all products
  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  // Fetch a product by ID (GET)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findProductById(id);
  }

  // Fetch a product by ID (POST)
  @Post('find-product')
  async findProductById(@Body('productId') productId: string) {
    return this.productsService.findProductById(productId);
  }

  // Fetch products by section ID
  @Get('section/:sectionId')
  async findBySection(@Param('sectionId') sectionId: string) {
    return this.productsService.findBySection(sectionId);
  }

  // Update a product by ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() productDto: any) {
    return this.productsService.update(id, productDto);
  }

  // Delete a product by ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}