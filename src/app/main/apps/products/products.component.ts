import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ProductService } from 'app/service/product/product.service';
import { Product, ProductComment, ProductSearch } from 'app/viewmodel/product.viewmodel';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productList: Product[];
  ProductSearchModel = new ProductSearch()
  ProductForm: FormGroup
  public pageSize: number = 10;
  public ColumnMode = ColumnMode;
  
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  constructor(
    private _modalService: NgbModal,
    private _productService: ProductService,
    private _formBuilder: FormBuilder
  ) { 
    this.ProductForm = this._formBuilder.group(this.ProductSearchModel);
  }

  ngOnInit(): void {
    this._productService.onProductListChange.subscribe((resp: Product[]) => {
      this.productList = resp
    })

    this.loadProducts();
  }

  modalOpenForm(modalForm: any) {
    this._modalService.open(modalForm, {
      centered: true,
      backdrop: 'static'
    });
  }

  loadProducts(): void {
    this._productService.productSearch.pageSize = {...this.ProductForm.getRawValue()}
    this._productService.getProducts();
  }

  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  search(e: any): void {
    console.log(e)
  }
}
