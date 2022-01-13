import { Component, Injectable, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ProductService } from 'app/main/apps/products/service/product.service';
import { Product } from 'app/main/apps/products/model/product.viewmodel';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  public coreConfig: any;
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _productService: ProductService,
     ) {
      this._unsubscribeAll = new Subject();
      this._productService.getProducts();
     }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Update to List View
   */
  listView() {
    this.gridViewRef = false;
  }

  /**
   * Update to Grid View
   */
  gridView() {
    this.gridViewRef = true;
  }

  /**
   * Sort Product
   */
  sortProduct(sortParam) {
    // this._ecommerceService.sortProduct(sortParam);
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
    // Subscribe to ProductList change
    this._productService.onProductListChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.products = res
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Shop',
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
            isLink: false
          }
        ]
      }
    };
  }
}
