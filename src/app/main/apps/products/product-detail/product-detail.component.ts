import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INgxFileUploadRequest, NgxFileUploadFactory, NgxFileUploadStorage,NgxFileUploadState, NgxFileUploadOptions } from '@ngx-file-upload/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ProductService } from 'app/service/product/product.service';
import { Product } from 'app/viewmodel/product.viewmodel';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @Input() data: Product

  uploads: INgxFileUploadRequest[] = [];
  uploadStorage: NgxFileUploadStorage;
  states = NgxFileUploadState;
  
  ProductViewModel = new Product();
  ProductForm: FormGroup
  public submitted: boolean = false;
  public ColumnMode = ColumnMode;
  public storage: NgxFileUploadStorage;
  public imagePath: any = '../../../../assets/images/illustration/Upload.jpg';

  private uploadOptions: NgxFileUploadOptions = {
    url: "http://localhost:5000/products",
    formData: {
      enabled: true,
      name: "picture"
    },
  };
  private destroy$: Subject<boolean> = new Subject();
  
  constructor(
    private _productService: ProductService,
    private _formBuilder: FormBuilder,
    @Inject(NgxFileUploadFactory) private uploadFactory: NgxFileUploadFactory
  ) { 
    this.ProductViewModel = this.data;
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
