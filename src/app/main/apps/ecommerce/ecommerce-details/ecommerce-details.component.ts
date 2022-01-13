import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/main/apps/authentication/model/user.viewmodel';
import { EcommerceService } from 'app/main/apps/ecommerce/ecommerce.service';
import { Product } from 'app/main/apps/products/model/product.viewmodel';
import { ProductService } from 'app/main/apps/products/service/product.service';
import { AlertService } from 'app/shared/service/alert/alert.service';
import { environment } from 'environments/environment';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { forkJoin } from 'rxjs';
import { UserService } from '../../authentication/service/user.service';

@Component({
  selector: 'app-ecommerce-details',
  templateUrl: './ecommerce-details.component.html',
  styleUrls: ['./ecommerce-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceDetailsComponent implements OnInit {
  // public
  public contentHeader: object;
  public product: Product;
  public wishlist;
  public cartList;
  public relatedProducts;
  public env = environment
  productId: number;
  user: User;
  userRating: number = 0;

  // Swiper
  public swiperResponsive1: SwiperConfigInterface = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    },
    pagination: {
      el: '.swiper-pagination'
    }
  };

  /**
   * Constructor
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(
    private _ecommerceService: EcommerceService,
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _alertService: AlertService
    ) {
      this.productId = this._activatedRoute.snapshot.params['id'];
      this._userService.currentUser.subscribe((x) => this.user = x)
      forkJoin({
        product: this._productService.getProductById(this.productId),
        productRating: this._productService.getProductRating(this.productId),
        userRating: this._productService.getUserProductRating(this.productId, this.user.userId),
        product_galleries: this._productService.getProductGalleries(this.productId)
      }).subscribe((resp) => {
        console.log(resp)
        this.product = resp.product.product;
        this.product.finalRating = resp.productRating.rating || 0;
        this.userRating = resp.userRating.response[0]?.productRating || 0;
        resp.product_galleries.gallery.rows.forEach((data: any) => {
          this.product.product_galleries.push(data)
        })
      },(err) => {
        console.log(err)
      })
    }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  ratingChanged(call: boolean = false): void {
    if(call){
      this._productService.rateProduct(this.productId,this.user.userId,this.userRating)
      .subscribe((resp) => {
        if(resp?.message){
          this._alertService.toastrSuccess(resp.message,2000,{hr: 'center', vr: 'top'})
        }
      },(err) => {
        console.log(err)
      })
    }
  }
  /**
   * Toggle Wishlist
   *
   * @param product
   */
  toggleWishlist(product) {
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

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to Selected Product change
    this._ecommerceService.onSelectedProductChange.subscribe(res => {
      this.product = res[0];
    });

    // Subscribe to Wishlist change
    // this._ecommerceService.onWishlistChange.subscribe(res => (this.wishlist = res));

    // // Subscribe to Cartlist change
    // this._ecommerceService.onCartListChange.subscribe(res => (this.cartList = res));

    // // Get Related Products
    // this._ecommerceService.getRelatedProducts().then(response => {
    //   this.relatedProducts = response;
    // });

    // this.product.isInWishlist = this.wishlist.findIndex(p => p.productId === this.product.id) > -1;
    // this.product.isInCart = this.cartList.findIndex(p => p.productId === this.product.id) > -1;

    // content header
    this.contentHeader = {
      headerTitle: 'Product Details',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'eCommerce',
            isLink: true,
            link: '/'
          },
          {
            name: 'Shop',
            isLink: true,
            link: '/'
          },
          {
            name: 'Details',
            isLink: false
          }
        ]
      }
    };
  }
}
