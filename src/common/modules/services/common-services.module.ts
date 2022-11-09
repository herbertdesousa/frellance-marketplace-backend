import { Module } from '@nestjs/common';

import { AnalyticsModule } from './analytics/analytics.module';
import { CategoriesAttributesModule } from './categories-attributes/categories-attributes.module';
import { AdminContactModule } from './admin-contact/admin-contact.module';
import { CategoriesModule } from './categories/categories.module';
import { AttributesModule } from './attributes/attributes.module';

@Module({
  imports: [
    AnalyticsModule,
    CategoriesAttributesModule,
    AdminContactModule,
    CategoriesModule,
    AttributesModule,
  ],
  providers: [],
})
export class CommonServicesModule {}
