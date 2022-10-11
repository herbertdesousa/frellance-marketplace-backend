import {
  Body,
  Controller,
  Get,
  NotFoundException,
  ParseUUIDPipe,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Categories, Items } from '@prisma/client';

import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';
import { SaveItemDto } from './dto/save-item';

import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  async create(
    @Body('user') user: FirebaseUserDto,
    @Body() data: SaveItemDto,
  ): Promise<Items> {
    const attributes = await this.itemService.findAttributesByCategoryId(
      data.category_id,
    );
    const currentAttributesIds = data.attributes.map((item) => item.id);
    const attributesId = attributes.map((item) => item.attributesId);

    // not belonging attributes verification
    currentAttributesIds.map((currAttrId) => {
      if (!attributesId.includes(currAttrId))
        throw new UnprocessableEntityException({
          attributes: 'atributo obrigatório não pertencente à categoria',
        });
    });
    // required attributes verification
    attributes.map((attr) => {
      if (attr.required && !currentAttributesIds.includes(attr.attributesId))
        throw new UnprocessableEntityException({
          attributes: 'atributo obrigatório não preenchido',
        });
    });

    const itemAttributesValuesId: string[] = [];
    await Promise.all(
      data.attributes.map(async (currAttr) => {
        const findedAttr = attributes.find(
          (i) => i.attributesId === currAttr.id,
        );

        if (!findedAttr)
          throw new UnprocessableEntityException({
            attributes: 'atributo não encontrado',
          });

        const createAttributeValue = async () => {
          const { id } = await this.itemService.createAttributeValue(
            currAttr.id,
            currAttr.value,
          );
          itemAttributesValuesId.push(id);
        };

        if (findedAttr.attribute.type === 'writable') {
          await createAttributeValue();
          return;
        }

        const findedAttrValue = findedAttr.attribute.AttributeValues.find(
          (i) => i.id === currAttr.value,
        );

        if (!findedAttrValue) {
          if (findedAttr.attribute.type === 'both') {
            await createAttributeValue();
            return;
          }
          throw new UnprocessableEntityException({
            attributes: 'valor do atributo não encontrado',
          });
        }
        itemAttributesValuesId.push(findedAttrValue.id);

        // if (currAttrId.attribute.type === 'writable') {
        //   this.itemService.createAttributeValue(attr.attributesId, )
        //   return;
        // }
      }),
    );

    return await this.itemService.create(
      user.uid,
      data,
      itemAttributesValuesId,
    );
  }

  @Get('category/attributes')
  async listCategoriesAttributes(@Query('id', ParseUUIDPipe) id: string) {
    if (!(await this.itemService.findCategoryById(id)))
      throw new NotFoundException({ message: 'categoria não encontrada' });

    const result = await this.itemService.findAttributesByCategoryId(id);

    return await Promise.all(
      result.map(async (item) => ({
        attributes_id: item.attribute.id,
        required: item.required,
        order: item.order,
        name: item.attribute.name,
        description: item.attribute.description || '',
        type: item.attribute.type,
        class: item.attribute.refAttributeClassName,
        values: item.attribute.AttributeValues,
      })),
    );
  }

  @Get('category')
  async listAllCategories(): Promise<Categories[]> {
    return await this.itemService.findAllCategories();
  }
}
