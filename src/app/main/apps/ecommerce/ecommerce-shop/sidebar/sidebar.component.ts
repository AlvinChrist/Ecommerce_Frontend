import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from 'app/main/apps/products/service/product.service';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ecommerce-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceSidebarComponent implements OnInit, OnDestroy {
  // Public
  public categoryList: Array<Object>
  public brandList: Array<Object>
  public currentCategory: string;
  public currentBrand: string[];
  public currentBrandMap: {}

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _productService: ProductService
  ) {
    this._unsubscribeAll = new Subject();
    this.currentCategory = this._productService.productSearch.filterCategory
    this.currentBrand = this._productService.productSearch.filterBrand || []
  }

  ngOnInit(): void {
    combineLatest([
      this._productService.onCategoriesChange,
      this._productService.onBrandsChange
    ]).pipe(takeUntil(this._unsubscribeAll))
    .subscribe(([categories,brands]) => {
      this.categoryList = categories
      this.brandList = brands
      console.log(categories,brands)
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  categoryFilter(e: string) {
    if(e === "All") e = ""
    this.currentCategory = e
    this._productService.productSearch.filterCategory = e
    this._productService.getProducts()
  }

  brandFilter(e: string){
    const pos = this.currentBrand.indexOf(e)
    if(pos === -1) this.currentBrand.push(e)
    else this.currentBrand.splice(pos,1)
    console.log(this.currentBrand,)
  }
}
