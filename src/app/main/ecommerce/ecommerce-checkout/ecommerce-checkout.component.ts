import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from 'app/main/ecommerce/service/ecommerce.service';
import { GalleryService } from 'app/main/products/service/gallery/gallery.service';
import { ProductService } from 'app/main/products/service/product.service';
import { User } from 'app/main/user/model/user.viewmodel';
import { UserService } from 'app/main/user/service/user.service';
import { Cart } from 'app/viewmodel/cart.viewmodel';
import Stepper from 'bs-stepper';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ecommerce-checkout',
  templateUrl: './ecommerce-checkout.component.html',
  styleUrls: ['./ecommerce-checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceCheckoutComponent implements OnInit, OnDestroy {
  // Public
  public contentHeader: object;
  public user: User;
  public gallery = [];
  public products;
  public cart = [];
  public wishlist;
  public total = 0;
  public tax = 0.02;
  public taxedTotal = 0;

  public address = {
    fullNameVar: '',
    numberVar: '',
    flatVar: '',
    landmarkVar: '',
    cityVar: '',
    pincodeVar: '',
    stateVar: ''
  };

  // Private
  private checkoutStepper: Stepper;

  private _unsubscribeAll: Subject<any>;

  /**
   *  Constructor
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(
    private _ecommerceService: EcommerceService,
    private _userService: UserService,
    private _productService: ProductService,
    private _galleryService: GalleryService
    ) {
    this.user = this._userService.currentUserValue
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Stepper Next
   */
  nextStep() {
    this.checkoutStepper.next();
  }
  /**
   * Stepper Previous
   */
  previousStep() {
    this.checkoutStepper.previous();
  }

  /**
   * Validate Next Step
   *
   * @param addressForm
   */
  validateNextStep(addressForm) {
    if (addressForm.valid) {
      this.nextStep();
    }
  }

  sum() {
    const reducer = (prev, cur) => prev + ((cur.productQty || 1) * cur.product?.productPrice);
    this.total = this.cart.reduce(reducer,0)
    this.taxedTotal = this.total + (this.total * this.tax)
  }

  smoothUpdate(d1: Cart[], d2: Cart[]): void {
    d1.forEach((data,index) => {
      data.productQty = d2[index].productQty
    })
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
  async ngOnInit() {
    // content header
    await this._productService.getProducts();
    await this._ecommerceService.getUserCart(this.user.userId)
    this.gallery = await this._galleryService.getAllImage()
    this._ecommerceService.onCartChange.pipe(distinctUntilChanged(),takeUntil(this._unsubscribeAll)).subscribe((res) => {
      //@ts-ignore
      if (res.length !== this.cart.length) this.cart = [...res]
      else this.smoothUpdate(this.cart,res);
      this.sum();
      this.cart.forEach((product) => {
        const product_galleries = this.gallery.find(image => (image.productId === product.productId && image.used === "True"))
        product.product['product_galleries'] = product_galleries
      })
    })

    this.checkoutStepper = new Stepper(document.querySelector('#checkoutStepper'), {
      linear: false,
      animation: true
    });

    console.log(this.cart)
    this.contentHeader = {
      headerTitle: 'Checkout',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Shop',
            isLink: false,
          },
          {
            name: 'Checkout',
            isLink: false,
          }
          // {
          //   name: 'Home',
          //   isLink: true,
          //   link: '/'
          // },
          // {
          //   name: 'eCommerce',
          //   isLink: true,
          //   link: '/'
          // },
          // {
          //   name: 'Checkout',
          //   isLink: false
          // }
        ]
      }
    };
  }
}
