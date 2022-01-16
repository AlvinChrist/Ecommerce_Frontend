import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EcommerceService } from 'app/main/apps/ecommerce/service/ecommerce.service';
import { UserService } from 'app/main/apps/authentication/service/user.service';
import { ProductService } from 'app/main/apps/products/service/product.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-navbar-wishlist',
  templateUrl: './navbar-wishlist.component.html'
})
export class NavbarWishlistComponent implements OnInit, OnDestroy {
  // Public
  public products = [];
  public wishList = [];
  public wishListLength;
  public env = environment
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(
    public _ecommerceService: EcommerceService,
    private _userService: UserService,
    private _productService: ProductService
    ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  get userId() {
    return this._userService.currentUserValue.userId
  }
  /**
   * Remove From Cart
   *
   * @param product
   */
  removeFromCart(productId: number) {
    this._ecommerceService.removeFromWishlist(this.userId,productId)
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to Cart List
    setTimeout(() => {
      this._ecommerceService.getWishList(this.userId)
    },250)
    
    this._ecommerceService.onWishlistChange.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any[]) => {
      if(res){
        let tmp = []
        if(this._productService.productList){
          res.forEach((product) => {
            tmp.push(this._productService.productList?.find((x) => x.productId === product.productId))
          })
        }
        this.wishList = tmp
      } 
      
      this.wishListLength = this.wishList.length
      console.log(this.wishList)
    });
  }
}
