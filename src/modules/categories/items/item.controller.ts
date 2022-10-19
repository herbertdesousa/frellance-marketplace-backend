import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  Categories,
  ItemAttributeValues,
  AttributeValues,
  Attributes,
  ItemPicture,
  Items,
  ItemPrice,
  AnalyticsRequestContact,
  UserRecentsView,
} from '@prisma/client';

import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';
import { SaveItemDto } from './dto/save-item';

import firebaseAdmin from 'src/config/firebase-config';

import { ItemService } from './item.service';

export interface FindAllPayload {
  limit?: number;
  order?: 'asc' | 'desc';
  selectMostView?: boolean;
  selectAddress?: boolean;
  byCategoryId?: string;
}

@Controller('/categories/items')
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
      }),
    );

    return await this.itemService.create(
      user.uid,
      data,
      itemAttributesValuesId,
    );
  }

  @Delete()
  async delete(@Query('id') id: string): Promise<void> {
    if (!id) throw new UnprocessableEntityException({ id: 'obrigatório' });

    try {
      const findedItem = await this.itemService.findById<{
        ItemPicture: ItemPicture[];
      }>(id, { ItemPicture: true });

      await Promise.all(
        findedItem.ItemPicture.map(async (item) => {
          await firebaseAdmin.storage.file('items/' + item.name).delete();
        }),
      );

      await this.itemService.delete(findedItem.id);
    } catch (err) {
      console.log(err);
      throw new NotFoundException({ error: 'não encontrado' });
    }
  }

  @Get()
  async findAll(@Query() payload: FindAllPayload) {
    const finded = await this.itemService.findAll(payload);

    return finded.map((item) => ({
      id: item.id,
      name: item.name,
      img: item.ItemPicture[0].url,
      description: item.description,
      price: item.itemPrice.value,
      address: item.ItemAttributeValues.map((address) => ({
        [address.attributeValue.attribute.path.replace('address/', '')]:
          address.attributeValue.name,
      })).reduce((preview, current) => ({ ...preview, ...current })),
    }));
  }

  @Get('/details')
  async findDetails(@Query('id') id: string) {
    if (!id) throw new UnprocessableEntityException({ id: 'obrigatório' });

    try {
      const finded = await this.itemService.findById<{
        ItemPicture: ItemPicture;
        category: Categories;
        itemPrice: ItemPrice;
        ItemAttributeValues: ItemAttributeValues &
          { attributeValue: AttributeValues & { attribute: Attributes } }[];
      }>(id, {
        ItemPicture: true,
        category: true,
        itemPrice: true,
        ItemAttributeValues: {
          include: { attributeValue: { include: { attribute: true } } },
        },
      });

      return {
        id: finded.id,
        name: finded.name,
        userId: finded.userId,
        price: { value: finded.itemPrice.value, type: finded.itemPrice.type },
        category: finded.category,
        pictures: finded.ItemPicture,
        attributes: finded.ItemAttributeValues.map((item) => ({
          id: item.attributeValue.attribute.id,
          name: item.attributeValue.attribute.name,
          path: item.attributeValue.attribute.path,
          description: item.attributeValue.attribute.description || '',
          class: item.attributeValue.attribute.refAttributeClassName,
          value: item.attributeValue.name,
        })),
        description: finded.description,
      };
    } catch (err) {
      throw new NotFoundException({ error: 'item não encontrado' });
    }
  }

  @Get('/details/analytics')
  async findDetailsAnalytics(
    @Body('user') user: FirebaseUserDto,
    @Query('id') id: string,
  ) {
    const finded = await this.itemService.findById<{
      AnalyticsRequestContact: AnalyticsRequestContact[];
      UserRecentsView: UserRecentsView[];
    }>(id, {
      AnalyticsRequestContact: { where: { userUid: user.uid } },
      UserRecentsView: { where: { userUid: user.uid } },
    });

    if (!finded) throw new NotFoundException({ erro: 'não encontrado' });

    if (finded.userId !== user.uid) return;

    return {
      requestContacts: finded.AnalyticsRequestContact.length,
      views: finded.UserRecentsView.length,
    };
  }

  @Get('user')
  async findAllFromUser(@Body('user') user: FirebaseUserDto) {
    const finded = await this.itemService.findAllByUserId<{
      ItemPicture: ItemPicture;
      category: Categories;
      AnalyticsRequestContact: AnalyticsRequestContact[];
      UserRecentsView: UserRecentsView[];
    }>(user.uid, {
      ItemPicture: true,
      category: true,
      AnalyticsRequestContact: { where: { userUid: user.uid } },
      UserRecentsView: { where: { userUid: user.uid } },
    });

    return finded.map((i) => ({
      id: i.id,
      name: i.name,
      pictures: i.ItemPicture,
      description: i.description,
      category: i.category,
      anayltics: {
        requestContacts: i.AnalyticsRequestContact.length,
        views: i.UserRecentsView.length,
      },
    }));
  }

  @Get('favorited')
  async findIsFavorited(
    @Body('user') user: FirebaseUserDto,
    @Query('id') id: string,
  ): Promise<{ value: boolean }> {
    return {
      value: !!(await this.itemService.findIsFavorited(user.uid, id)).length,
    };
  }
}
