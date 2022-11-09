import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AttributesService } from 'src/common/modules/services/attributes/attributes.service';

import { ReqSaveAttribute } from 'src/dtos/modules/categories-attributes/req-save-attribute';
import { ReqIdCategory } from './dto/req-id-category';

@Controller('admin/categories/attributes')
export class AttributesController {
  constructor(private attributesService: AttributesService) {}

  @Post()
  @UseGuards(AuthGuard('basic'))
  async create(@Body() payload: ReqSaveAttribute) {
    const result = await this.attributesService.create(payload);

    return result;
  }

  @Put()
  @UseGuards(AuthGuard('basic'))
  async update(
    @Body() payload: ReqSaveAttribute,
    @Query() query: ReqIdCategory,
  ) {
    await this.attributesService.deleteValuesById(query.id);

    const result = await this.attributesService.update(query.id, payload);

    return result;
  }

  @Delete()
  @UseGuards(AuthGuard('basic'))
  async delete(@Query() query: ReqIdCategory) {
    return await this.attributesService.delete(query.id);
  }
}
