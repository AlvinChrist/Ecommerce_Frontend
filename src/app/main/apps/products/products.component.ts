import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { INgxFileUploadRequest, NgxFileUploadFactory, NgxFileUploadOptions, NgxFileUploadState, NgxFileUploadStorage } from "@ngx-file-upload/core";
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ProductService } from 'app/service/product/product.service';
import { Product, ProductSearch } from 'app/viewmodel/product.viewmodel';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  ProductForm: FormGroup
  public submitted: boolean = false;
  public ColumnMode = ColumnMode;
  public storage: NgxFileUploadStorage;
  public imagePath: any = '../../../../assets/images/illustration/Upload.jpg';
  
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  uploads: INgxFileUploadRequest[] = [];
  uploadStorage: NgxFileUploadStorage;
  states = NgxFileUploadState;

  /** upload options */
  private uploadOptions: NgxFileUploadOptions = {
    url: "http://localhost:5000/products",
    formData: {
      enabled: true,
      name: "picture"
    },
  };

  private destroy$: Subject<boolean> = new Subject();
  
  constructor(
    private _modalService: NgbModal,
    private _productService: ProductService,
    private _formBuilder: FormBuilder,
    @Inject(NgxFileUploadFactory) private uploadFactory: NgxFileUploadFactory
  ) { 
    this.ProductFilterForm = this._formBuilder.group(this.ProductSearchModel);
    this.ProductForm = this.createProductForm(this.ProductViewModel);
    this.uploadStorage = new NgxFileUploadStorage({
      concurrentUploads: 1
    });
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
        sources = droppedFile;
        reader.readAsDataURL(droppedFile)
        reader.onload = () => {
          this.imagePath = reader.result;
        };
      });
      console.log(this.uploadStorage)
    }

    // * upload all dropped files into one request
    const request = this.uploadFactory.createUploadRequest(sources, this.uploadOptions);
    /**
     * alternate push multiple requests at once, or add them later to storage
     *
     * @example
     * 
     * const requests: INgxFileUploadRequest[] = []
     * 
     * do {
     *   const toUpload = files.splice(0, 3)
     *   requests.push(this.uploadFactory.createUploadRequest(sources, this.uploadOptions))
     * } while (files.length)
     * 
     * storage.add(requests)
     */
    if (request) {
      this.stop();
      this.uploadStorage.add(request);
    }
  }

  ngOnInit(): void {
    this.loadProducts();
    this._productService.onProductListChange.subscribe((resp) => {
      this.productList = resp.products?.rows || [];
      // console.log(this.productList)
    })
    this.uploadStorage.change()
      .pipe(takeUntil(this.destroy$))
      .subscribe((uploads) => this.uploads = uploads);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.uploadStorage.destroy();
  }

  get f() {
    return this.ProductForm.controls;
  }

  createProductForm(data: Product): FormGroup {
    return this._formBuilder.group({
      productId: [data.productId],
      productName: [data.productName, Validators.required],
      productSummary: [data.productSummary, Validators.required],
      productDesc: [data.productDesc, Validators.required],
      productBrand: [data.productBrand, Validators.required],
      productPrice: [data.productPrice, Validators.min(0)],
      productStock: [data.productStock, Validators.min(0)]
    })
  }

  modalOpenForm(modalForm: any) {
    this._modalService.open(modalForm, {
      centered: true,
      backdrop: 'static',
      size: 'xl'
    });
  }

  loadProducts(): void {
    const data = this.ProductFilterForm.getRawValue()
    console.log(data)
    this._productService.productSearch = {...data}
    this._productService.getProducts();
  }

  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  search(e: any): void {
    console.log(e)
  }

  stop(): void {
    this.uploadStorage.stopAll()
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.ProductForm.invalid) {
      return;
    }
    this.storage.startAll();
    const data = this.ProductForm.getRawValue();
    this._productService.addProduct(data).subscribe((resp) => {
      if(resp){
        this.submitted = false;
      }
    },(err) => {
      console.log(err)
    })
  }
}
