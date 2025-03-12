import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from '../Schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private readonly productsModel: Model<ProductsDocument>,
  ) {}

  async create(productDto: any) {
    const newProduct = new this.productsModel(productDto);
    return newProduct.save();
  }

  async findProductById(productId: string): Promise<Products> {
    const product = await this.productsModel.findById(productId).exec();
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async findAll() {
    return this.productsModel.find().populate('section').exec(); // Populate section details
  }

  async findBySection(sectionId: string) {
    return this.productsModel.find({ section: sectionId }).populate('section').exec();
  }

  async update(id: string, productDto: any) {
    return this.productsModel.findByIdAndUpdate(id, productDto, { new: true }).exec();
  }

  async delete(id: string) {
    return this.productsModel.findByIdAndDelete(id).exec();
  }
}