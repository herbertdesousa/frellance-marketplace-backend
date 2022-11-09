import { Module } from '@nestjs/common';

import { AnalyticsModule } from './analytics/analytics.module';
import { AttributesModule } from './attributes/attributes.module';
import { CategoriesAttributesModule } from './categories-attributes/categories-attributes.module';
import { AdminContactModule } from './admin-contact/admin-contact.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    AnalyticsModule,
    AttributesModule,
    CategoriesAttributesModule,
    AdminContactModule,
    CategoriesModule,
  ],
  providers: [],
})
export class CommonServicesModule {}
