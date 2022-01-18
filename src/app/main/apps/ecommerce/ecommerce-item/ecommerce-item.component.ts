import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from 'app/main/apps/products/model/product.viewmodel';
import { AlertService } from 'app/shared/service/alert/alert.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../authentication/service/user.service';
import { ProductService } from '../../products/service/product.service';
import { EcommerceShopComponent } from '../ecommerce-shop/ecommerce-shop.component';
import { EcommerceService } from '../service/ecommerce.service';

@Component({
  selector: 'app-ecommerce-item',
  templateUrl: './ecommerce-item.component.html',
  styleUrls: ['./ecommerce-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceItemComponent implements OnInit, OnDestroy {
  // Input Decorotor
  @Input() product: Product;
  @Input() isWishlistOpen: boolean = false;
  public wishlist: any;
  public image: string = '';
  // Public
  public isInCart = false;
  public isInWishlist: boolean = false;

  private _unsubscribeAll: Subject<any>
  /**
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(
    public _shopRef: EcommerceShopComponent,
    private _ecommerceService: EcommerceService,
    private _userService: UserService,
    private _productService: ProductService,
    private _alertService: AlertService
    ) {
      this._unsubscribeAll = new Subject();
  }

  get user() {
    return this._userService.currentUserValue
  }
  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  toggleWishlist(product){
    if(this.user?.userId){
      if(this.user.role !== 'Admin'){
        if(this.isInWishlist){
          this._ecommerceService.removeFromWishlist(this.user.userId,product.productId).then(() => {
            this.isInWishlist = !this.isInWishlist
          }).catch(() => {})
        }
        else{
          this._ecommerceService.addToWishlist(this.user.userId,product.productId).then(() => {
            this.isInWishlist = !this.isInWishlist
        }).catch((err) => {})
        }
      }
    }
    else{
      this._alertService.toastrError('Error','Please login to authenticate!',2000,'center');
    }
  }

  addToCart(product){
    if(this.user?.userId){
      if(this.user.role !== 'Admin') {
        // console.log(this.isInCart)
        if(this.isInCart){
          this._ecommerceService.removeFromCart(this.user.userId,product.productId).then((res) => {
            this.isInCart = !this.isInCart
          }).catch((err) => {
            this._alertService.toastrError('Error',err,2000,'center')
          })
        }
        else{
          this._ecommerceService.addToCart(this.user.userId,product.productId).then((res) => {
            this.isInCart = !this.isInCart
          }).catch((err) => {
            this._alertService.toastrError('Error',err,2000,'center')
          })
        }
      }
    }
    else{
      this._alertService.toastrError('Error','Please login to authenticate!',2000,'center');
    }
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this._ecommerceService.onWishlistChange.pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
      this.isInWishlist = this._ecommerceService.isInWishlist(this.product?.productId)
      if(res && this.isWishlistOpen){
        this.product = this._productService.productList?.find((x) => x.productId === this.product?.productId)
        this.image =  `http://localhost:5000/${this.product?.product_galleries[0]?.imagePath}` || ""
      }
    })
    
    this._ecommerceService.onCartChange.pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
      this.isInCart = this._ecommerceService.isInCart(this.product?.productId)
    })
    
    try{
      this.image =  `http://localhost:5000/${this.product?.product_galleries[0]?.imagePath}` || ""
    }
    catch(e){
      
    }
  }
}
