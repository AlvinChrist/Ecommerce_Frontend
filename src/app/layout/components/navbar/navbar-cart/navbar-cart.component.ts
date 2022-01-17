import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'app/main/apps/authentication/service/user.service';
import { EcommerceService } from 'app/main/apps/ecommerce/service/ecommerce.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
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
  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(
    public _ecommerceService: EcommerceService,
    private _userService: UserService
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
    this._ecommerceService.removeFromCart(this.userId,productId)
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
      if(res) this.cart = res
      this.cartLength = this.cart.length
      // console.log(this.cart)
    });
  }
}
