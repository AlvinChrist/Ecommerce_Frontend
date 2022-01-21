import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomBreakPointsProvider } from 'app/core/layout/custom-breakpoints';
import { VerticalLayoutModule } from 'app/core/layout/vertical/vertical-layout.module';
import { HorizontalLayoutModule } from 'app/core/layout/horizontal/horizontal-layout.module';

@NgModule({
  imports: [FlexLayoutModule.withConfig({ disableDefaultBps: true }), VerticalLayoutModule, HorizontalLayoutModule],
  providers: [CustomBreakPointsProvider],
  exports: [VerticalLayoutModule, HorizontalLayoutModule]
})
export class LayoutModule {}
