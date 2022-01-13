import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAuthGuard } from 'app/core';
import { EcommerceCheckoutItemComponent } from 'app/main/apps/ecommerce/ecommerce-checkout/ecommerce-checkout-item/ecommerce-checkout-item.component';
import { EcommerceCheckoutComponent } from 'app/main/apps/ecommerce/ecommerce-checkout/ecommerce-checkout.component';
import { EcommerceDetailsComponent } from 'app/main/apps/ecommerce/ecommerce-details/ecommerce-details.component';
import { EcommerceItemComponent } from 'app/main/apps/ecommerce/ecommerce-item/ecommerce-item.component';
import { EcommerceShopComponent } from 'app/main/apps/ecommerce/ecommerce-shop/ecommerce-shop.component';
import { EcommerceSidebarComponent } from 'app/main/apps/ecommerce/ecommerce-shop/sidebar/sidebar.component';
import { EcommerceWishlistComponent } from 'app/main/apps/ecommerce/ecommerce-wishlist/ecommerce-wishlist.component';
import { SharedModule } from 'app/shared/shared.module';
import { NouisliderModule } from 'ng2-nouislider';
import { NgxMaskModule } from 'ngx-mask';
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
    component: EcommerceShopComponent
  },
  {
    path: 'products/:id',
    component: EcommerceDetailsComponent
  }
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
    RouterModule.forChild(routes),
    SwiperModule,
    SharedModule,
    NgbRatingModule,
    NgxMaskModule,
    NouisliderModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    EcommerceShopComponent
  ]
})
export class EcommerceModule {}
