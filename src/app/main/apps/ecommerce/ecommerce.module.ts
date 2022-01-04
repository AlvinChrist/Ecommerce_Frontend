import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAuthGuard } from 'app/auth/helpers/user-auth.guard';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { EcommerceCheckoutItemComponent } from 'app/main/apps/ecommerce/ecommerce-checkout/ecommerce-checkout-item/ecommerce-checkout-item.component';
import { EcommerceCheckoutComponent } from 'app/main/apps/ecommerce/ecommerce-checkout/ecommerce-checkout.component';
import { EcommerceDetailsComponent } from 'app/main/apps/ecommerce/ecommerce-details/ecommerce-details.component';
import { EcommerceItemComponent } from 'app/main/apps/ecommerce/ecommerce-item/ecommerce-item.component';
import { EcommerceShopComponent } from 'app/main/apps/ecommerce/ecommerce-shop/ecommerce-shop.component';
import { EcommerceSidebarComponent } from 'app/main/apps/ecommerce/ecommerce-shop/sidebar/sidebar.component';
import { EcommerceWishlistComponent } from 'app/main/apps/ecommerce/ecommerce-wishlist/ecommerce-wishlist.component';
import { ProductService } from 'app/service/product/product.service';
import { NouisliderModule } from 'ng2-nouislider';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  observer: true
};

// routing
const routes: Routes = [
  {
    path: 'shop',
    canActivate: [ UserAuthGuard ],
    component: EcommerceShopComponent,
    resolve: {
      product: ProductService
    },
    data: { animation: 'EcommerceShopComponent' }
  },
  // {
  //   path: 'details/:id',
  //   component: EcommerceDetailsComponent,
  //   resolve: {
  //     product: ProductService
  //   },
  //   data: { animation: 'EcommerceDetailsComponent' }
  // },
  // {
  //   path: 'wishlist',
  //   component: EcommerceWishlistComponent,
  //   resolve: {
  //     product: ProductService
  //   },
  //   data: { animation: 'EcommerceWishlistComponent' }
  // },
  // {
  //   path: 'checkout',
  //   component: EcommerceCheckoutComponent,
  //   resolve: {
  //     product: ProductService
  //   },
  //   data: { animation: 'EcommerceCheckoutComponent' }
  // },
  // {
  //   path: 'details',
  //   redirectTo: '/details/27', //Redirection
  //   data: { animation: 'EcommerceDetailsComponent' }
  // }
];

@NgModule({
  declarations: [
    EcommerceShopComponent,
    EcommerceSidebarComponent,
    EcommerceDetailsComponent,
    EcommerceWishlistComponent,
    EcommerceCheckoutComponent,
    EcommerceItemComponent,
    EcommerceCheckoutItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule,
    FormsModule,
    CoreTouchspinModule,
    ContentHeaderModule,
    CoreSidebarModule,
    CoreCommonModule,
    NgbModule,
    NgbRatingModule,
    NouisliderModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
  ]
})
export class EcommerceModule {}
