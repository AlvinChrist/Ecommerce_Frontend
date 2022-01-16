import { Component, Injectable, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { Product } from 'app/main/apps/products/model/product.viewmodel';
import { ProductService } from 'app/main/apps/products/service/product.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../authentication/service/user.service';
import { EcommerceService } from '../service/ecommerce.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-ecommerce-shop',
  templateUrl: './ecommerce-shop.component.html',
  styleUrls: ['./ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceShopComponent implements OnInit, OnDestroy {
  // public
  public contentHeader: object;
  public shopSidebarToggle = false;
  public shopSidebarReset = false;
  public gridViewRef = true;
  public products: Product[];
  public filterData = {
    brands: [],
    categories: []
  }
  public page = 1;
  public pageSize = 9;
  public searchText = '';
  public wishlist: any[]
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _coreSidebarService: CoreSidebarService,
    public _productService: ProductService,
    private _ecommerceService: EcommerceService,
    private _userService: UserService
     ) {
      this._unsubscribeAll = new Subject();
      this._ecommerceService.getWishList(this.userId);
      this._productService.getProducts();
      this._productService.onProductListChange.pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
        if(res) this.products = res 
      });
      this._ecommerceService.onWishlistChange.pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
        if(res) this.wishlist = res
      })
     }
  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  get userId() {
    return this._userService.currentUserValue.userId
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  listView() {
    this.gridViewRef = false;
  }

  gridView() {
    this.gridViewRef = true;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  
  ngOnInit(): void {
    // Subscribe to ProductList change
    
    // content header
    this.contentHeader = {
      headerTitle: 'Shop',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
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
          //   name: 'Shop',
          //   isLink: false
          // }
        ]
      }
    };
  }
}
