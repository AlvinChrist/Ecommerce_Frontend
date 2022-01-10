import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxFileUploadStorage } from '@ngx-file-upload/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AlertService } from 'app/service/alert/alert.service';
import { ProductService } from 'app/service/product/product.service';
import { Product } from 'app/viewmodel/product.viewmodel';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @Input() data: Product
  
  ProductViewModel = new Product();
  image: any;

  public ProductForm: FormGroup
  public submitted: boolean = false;
  public ColumnMode = ColumnMode;
  public storage: NgxFileUploadStorage;
  path: string =  '../../../../assets/images/illustration/Upload.jpg';
  public imagePath: any = this.path;
  
  constructor(
    private _productService: ProductService,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService
  ) {
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
    this._productService.getProductById(this.data.productId).subscribe((resp) => {
      this.ProductViewModel = resp.product
      this.ProductForm.patchValue(this.ProductViewModel)
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
