import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { EcommerceService } from 'app/main/apps/ecommerce/ecommerce.service';
import { ProductService } from 'app/main/apps/products/service/product.service';
import { Product } from 'app/main/apps/products/model/product.viewmodel';
import { EcommerceShopComponent } from '../ecommerce-shop/ecommerce-shop.component';

@Component({
  selector: 'app-ecommerce-item',
  templateUrl: './ecommerce-item.component.html',
  styleUrls: ['./ecommerce-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceItemComponent implements OnInit {
  // Input Decorotor
  @Input() product: Product;
  @Input() isWishlistOpen = false;

  public image: string;
  // Public
  public isInCart = false;

  /**
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(
    private _productService: ProductService,
    public _shopRef: EcommerceShopComponent
    ) {
    this.image =  `http://localhost:5000/${this.product?.product_galleries[0].imagePath}`
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Wishlist
   *
   * @param product
   */
  toggleWishlist(product) {
    if (product.isInWishlist === true) {
      // this._ecommerceService.removeFromWishlist(product.id).then(res => {
      //   product.isInWishlist = false;
      // });
    } else {
      // this._ecommerceService.addToWishlist(product.id).then(res => {
      //   product.isInWishlist = true;
      // });
    }
  }

  /**
   * Add To Cart
   *
   * @param product
   */
  addToCart(product) {
    // this._ecommerceService.addToCart(product.id).then(res => {
    //   product.isInCart = true;
    // });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    // console.log(this.product)
    this.image =  `http://localhost:5000/${this.product?.product_galleries[0].imagePath}`
  }
}
