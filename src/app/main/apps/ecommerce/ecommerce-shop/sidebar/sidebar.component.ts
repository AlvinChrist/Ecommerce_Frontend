import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'app/main/apps/products/service/product.service';
import { combineLatest, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ecommerce-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceSidebarComponent implements OnInit, OnDestroy {
  // Public
  FilterForm: FormGroup;
  public sliderPriceValue = [1, 100];
  public categoryList: Array<Object>
  public brandList: Array<Object>
  public currentCategory: string;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService
  ) {
    this._unsubscribeAll = new Subject();
    this.FilterForm = this._formBuilder.group({
      category: [''],
      brand:  []
    })
    this.currentCategory = this._productService.productSearch.filterCategory
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
}
