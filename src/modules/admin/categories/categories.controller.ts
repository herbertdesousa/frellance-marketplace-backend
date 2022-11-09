import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

import { CategoriesService } from './categories.service';
import { CategoriesService as ClientCategoriesService } from 'src/modules/categories/categories.service';

import { UploadService } from 'src/common/modules/upload/upload.service';
import { ReqCreateCategory } from './dto/req-create-category';
import { ReqUpdateCategory } from './dto/req-update-category';

@Controller('admin/categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private clientCategoriesService: ClientCategoriesService,
    private uploadService: UploadService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('basic'))
  @FormDataRequest({ storage: FileSystemStoredFile })
  async create(@Body() payload: ReqCreateCategory) {
    const url = await this.uploadService.uploadPicture({
      picture: {
        localpath: payload.img.path,
        mimetype: payload.img.mimeType,
        uploadpath: `categories/${payload.slug}`,
      },
    });

    const category = await this.categoriesService.create({
      ...payload,
      img_url: url,
    });

    return category;
  }

  @Put()
  @UseGuards(AuthGuard('basic'))
  @FormDataRequest({ storage: FileSystemStoredFile })
  async update(@Query('id') id: string, @Body() payload: ReqUpdateCategory) {
    const findedCategory = await this.categoriesService.findOneById(id);
    if (!id || !findedCategory)
      throw new UnprocessableEntityException({ id: 'inválido' });

    let img_url = findedCategory.img_url;

    if (payload.img) {
      await this.uploadService.deletePicture(findedCategory.img_url);

      img_url = await this.uploadService.uploadPicture({
        picture: {
          localpath: payload.img.path,
          mimetype: payload.img.mimeType,
          uploadpath: `categories/${payload.slug}`,
        },
      });
    }

    const category = await this.categoriesService.update(id, {
      ...payload,
      img_url,
    });

    return category;
  }

  @Delete()
  @UseGuards(AuthGuard('basic'))
  async delete(@Query('id') id: string) {
    const findedCategory = await this.categoriesService.findOneById(id);
    if (!id || !findedCategory)
      throw new UnprocessableEntityException({ id: 'inválido' });

    await this.uploadService.deletePicture(findedCategory.img_url);

    return await this.categoriesService.delete(id);
  }

  @Get()
  async listAll() {
    const all = await this.clientCategoriesService.findAll();

    return await Promise.all(
      all.map(async (category) => {
        const items = await this.categoriesService.countItems(category.id);

        return { ...category, items: items };
      }),
    );
  }
}
