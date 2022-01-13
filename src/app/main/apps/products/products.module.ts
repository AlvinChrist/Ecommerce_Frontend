import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxFileUploadUiCommonModule, NgxFileUploadUiProgressbarModule, NgxFileUploadUiToolbarModule } from "@ngx-file-upload/ui";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxMaskModule } from 'ngx-mask';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SharedModule } from 'app/shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
]

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgbModalModule,
    CardSnippetModule,
    NgxDatatableModule,
    NgxMaskModule,
    NgxFileUploadUiToolbarModule,
    NgxFileUploadUiProgressbarModule,
    NgxFileUploadUiCommonModule,
    NgxFileDropModule
  ]
})
export class ProductsModule { }
