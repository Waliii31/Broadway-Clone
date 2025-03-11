import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from '../Schemas/section.schemas';

@Injectable()
export class SectionService {
  constructor(
    @InjectModel(Section.name) private readonly sectionModel: Model<SectionDocument>,
  ) {}

  async findSection() {
    // Find all sections
    return this.sectionModel.find().exec();
  }

  async addSection(title: string) {
    // Create a new section
    const newSection = new this.sectionModel({ title });
    return newSection.save();
  }

  async editSection(id: string, title: string) {
    // Find the section by ID and update it
    const updatedSection = await this.sectionModel
      .findByIdAndUpdate(id, { title }, { new: true })
      .exec();

    // If the section is not found, throw an error
    if (!updatedSection) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }

    return updatedSection;
  }

  async deleteSection(id: string) {
    // Find the section by ID and delete it
    const deletedSection = await this.sectionModel.findByIdAndDelete(id).exec();

    // If the section is not found, throw an error
    if (!deletedSection) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }

    return deletedSection;
  }
}