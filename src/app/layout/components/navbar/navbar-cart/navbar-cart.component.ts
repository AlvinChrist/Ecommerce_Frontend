import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'app/main/apps/authentication/service/user.service';
import { EcommerceService } from 'app/main/apps/ecommerce/service/ecommerce.service';
import { ProductService } from 'app/main/apps/products/service/product.service';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-navbar-cart',
  templateUrl: './navbar-cart.component.html'
})
export class NavbarCartComponent implements OnInit, OnDestroy {
  // Public
  public products = [];
  public cart = [];
  public cartLength;
  public env = environment
  public total = 0;
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
    this._productService.onBrandsChange.pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res) => {
      this.products = res
    });
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  get userId() {
    return this._userService.currentUserValue?.userId || null
  }
 
  /**
   * Remove From Cart
   *
   * @param product
   */
  removeFromCart(productId: number) {
    this._ecommerceService.removeFromCart(this.userId,productId)
  }

  sum() {
    const reducer = (prev, cur) => prev + ((cur.productQty || 1) * cur.product?.productPrice);
    this.total = this.cart.reduce(reducer,0)
  }

  qtyChanged(qty: number, productId: number){
    this._ecommerceService.setQty(qty,productId,this.userId)
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
    this._ecommerceService.getUserCart(this.userId)
    this._ecommerceService.onCartChange.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any[]) => {
      if(res) {
        let tmp = []
        if(this.products){
          res.forEach((item) => {
            const product_galleries = this._productService.productList?.find((x) => x.productId === item.productId).product_galleries
            if(item.product){
              item.product['product_galleries'] = product_galleries
              tmp.push(item)
            }
          })
        }
        this.cart = tmp;
        this.sum();
      }
      this.cartLength = this.cart.length
      // console.log(this.cart)
    });
  }
}
