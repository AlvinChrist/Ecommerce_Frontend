import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxFileUploadStorage } from "@ngx-file-upload/core";
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AlertService } from 'app/service/alert/alert.service';
import { ProductService } from 'app/service/product/product.service';
import { Product, ProductSearch } from 'app/viewmodel/product.viewmodel';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productList: Product[] = [];
  ProductSearchModel = new ProductSearch()
  ProductViewModel = new Product();
  ProductFilterForm: FormGroup
  image: any;

  public ProductForm: FormGroup
  public submitted: boolean = false;
  public ColumnMode = ColumnMode;
  public storage: NgxFileUploadStorage;
  path: string =  '../../../../assets/images/illustration/Upload.jpg';
  public imagePath: any = this.path;
  
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  
  constructor(
    private _modalService: NgbModal,
    private _productService: ProductService,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService
  ) { 
    this.ProductFilterForm = this._formBuilder.group(this.ProductSearchModel);
    this.ProductForm = this.createProductForm(this.ProductViewModel);
  }

  drop(file: NgxFileDropEntry[]) {
    let sources: File;
    const reader = new FileReader();
    if (file[0].fileEntry.isFile) {
      const dropped: any = file[0].fileEntry;
      dropped.file((droppedFile: File) => {
        if (droppedFile instanceof DataTransferItem) {
          return;
        }
        this.image = droppedFile
        reader.readAsDataURL(droppedFile)
        reader.onload = () => {
          this.imagePath = reader.result;
        };
      });
    }
  }

  ngOnInit(): void {
    this.loadProducts();
    this._productService.onProductListChange.subscribe((resp) => {
      this.productList = resp.products?.rows || [];
      // console.log(this.productList)
    })
  }

  ngOnDestroy() {
  }

  get f() {
    return this.ProductForm.controls;
  }

  createProductForm(data: Product): FormGroup {
    return this._formBuilder.group({
      productId: [data.productId],
      productName: [data.productName, [Validators.required]],
      productSummary: [data.productSummary, [Validators.required]],
      productCategory: [data.productCategory, [Validators.required]],
      productDesc: [data.productDesc, [Validators.required]],
      productBrand: [data.productBrand, [Validators.required]],
      productPrice: [data.productPrice, [Validators.min(0)]],
      productStock: [data.productStock, [Validators.min(0)]],
      product_gallery: []
    })
  }

  modalOpenForm(modalForm: any) {
    const ref = this._modalService.open(modalForm, {
      centered: true,
      backdrop: 'static',
      size: 'xl'
    });

    ref.dismissed.subscribe(() => {
      this.loadProducts()
    })
  }

  loadProducts(): void {
    const data = this.ProductFilterForm.getRawValue()
    // console.log(data)
    this._productService.productSearch = {...data}
    this._productService.getProducts();
  }

  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  search(e: any): void {
    console.log(e)
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.ProductForm.invalid) {
      return;
    }
    const form = new FormData;
    const raw_data: Product = this.ProductForm.getRawValue();
    Object.keys(raw_data).forEach((key) => {
      form.append(key,raw_data[key])
    })
    form.append('file',this.image)

    this._productService.addProduct(form).subscribe((resp) => {
      if(resp.message === "Product Added!"){
        this.submitted = false;
        this.ProductForm.reset();
        this.imagePath = this.path;
        this._alertService.toastrSuccess(resp.message,2000, { hr: 'center', vr: 'top'})
      }
    },(err) => {
      console.log(err)
    })
  }
}
