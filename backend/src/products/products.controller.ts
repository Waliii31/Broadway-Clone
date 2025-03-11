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
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post('image')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        return { imageUrl: `http://localhost:3000/uploads/${file.filename}` };
    }

    @Post()
    async create(@Body() productDto: any) {
        console.log("Received product data:", productDto);
        return this.productsService.create(productDto);
    }

    @Get()
    async findAll() {
        return this.productsService.findAll();
    }

    @Get('section/:sectionId')
    async findBySection(@Param('sectionId') sectionId: string) {
        return this.productsService.findBySection(sectionId);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() productDto: any) {
        return this.productsService.update(id, productDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.productsService.delete(id);
    }
}