import { NgModule } from '@angular/core';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/core/layout/components/content-header/content-header.module';

@NgModule({
  imports: [
    CoreCommonModule, //CommonModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, CoreDirectivesModule, CorePipesModule
    ContentHeaderModule,
    CoreSidebarModule,
    CoreTouchspinModule,
    NgbModule
  ],
  exports: [
    CoreCommonModule,
    ContentHeaderModule,
    CoreSidebarModule,
    CoreTouchspinModule,
    NgbModule
  ]
})
export class SharedModule {}
