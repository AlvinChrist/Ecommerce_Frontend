import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';

import { NavbarModule } from 'app/core/layout/components/navbar/navbar.module';
import { ContentModule } from 'app/core/layout/components/content/content.module';
import { MenuModule } from 'app/core/layout/components/menu/menu.module';
import { FooterModule } from 'app/core/layout/components/footer/footer.module';

import { VerticalLayoutComponent } from 'app/core/layout/vertical/vertical-layout.component';

@NgModule({
  declarations: [VerticalLayoutComponent],
  imports: [RouterModule, CoreCommonModule, CoreSidebarModule, NavbarModule, MenuModule, ContentModule, FooterModule],
  exports: [VerticalLayoutComponent]
})
export class VerticalLayoutModule {}
