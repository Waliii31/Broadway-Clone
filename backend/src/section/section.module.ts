import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from '../Schemas/section.schemas'

@Module({
  imports: [MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }])],
  controllers: [SectionController],
  providers: [SectionService]
})
export class SectionModule {}
