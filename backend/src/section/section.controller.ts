import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get()
  async findAll() {
    return this.sectionService.findSection();
  }

  @Post()
  async create(@Body('title') title: string) {
    return this.sectionService.addSection(title);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body('title') title: string) {
    return this.sectionService.editSection(id, title);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sectionService.deleteSection(id);
  }
}