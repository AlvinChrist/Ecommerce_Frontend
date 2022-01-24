import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import Stepper from 'bs-stepper';

import { EcommerceService } from 'app/main/ecommerce/service/ecommerce.service';
import { User } from 'app/main/user/model/user.viewmodel';
import { UserService } from 'app/main/user/service/user.service';
import { ProductService } from 'app/main/products/service/product.service';

@Component({
  selector: 'app-ecommerce-checkout',
  templateUrl: './ecommerce-checkout.component.html',
  styleUrls: ['./ecommerce-checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceCheckoutComponent implements OnInit {
  // Public
  public contentHeader: object;
  public user: User;
  public products;
  public cart;
  public wishlist;

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

  /**
   *  Constructor
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(
    private _ecommerceService: EcommerceService,
    private _userService: UserService,
    private _productService: ProductService
    ) {
    this.user = this._userService.currentUserValue
    this._ecommerceService.onCartChange.subscribe((res) => {
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
      }
    })
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

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  async ngOnInit() {
    // content header
    await this._ecommerceService.getUserCart(this.user.userId)
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
