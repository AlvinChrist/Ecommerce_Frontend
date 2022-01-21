import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';

import { CoreCommonModule } from '@core/common.module';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';

import { NavbarComponent } from 'app/layout/components/navbar/navbar.component';
import { NavbarBookmarkComponent } from 'app/layout/components/navbar/navbar-bookmark/navbar-bookmark.component';
import { NavbarSearchComponent } from 'app/layout/components/navbar/navbar-search/navbar-search.component';

import { NavbarNotificationComponent } from 'app/layout/components/navbar/navbar-notification/navbar-notification.component';
import { NavbarWishlistComponent } from './navbar-wishlist/navbar-wishlist.component';
import { NgxMaskModule } from 'ngx-mask';
import { NavbarCartComponent } from './navbar-cart/navbar-cart.component';
import { UserModule } from 'app/main/user/user.module';
import { UserEditComponent } from 'app/main/user/pages/user-edit/user-edit.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

@NgModule({
  declarations: [NavbarComponent, 
    NavbarSearchComponent, 
    NavbarBookmarkComponent, 
    NavbarNotificationComponent, 
    NavbarWishlistComponent, 
    NavbarCartComponent,
    UserEditComponent
  ],
  imports: [
    RouterModule,
     NgbModule,
     NgbModalModule,
     CoreCommonModule, 
     PerfectScrollbarModule, 
     CoreTouchspinModule, 
     NgxMaskModule,
     UserModule
    ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [NavbarComponent]
})
export class NavbarModule {}
