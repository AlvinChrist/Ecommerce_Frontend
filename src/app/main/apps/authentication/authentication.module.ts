import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AuthLoginV2Component } from 'app/main/apps/authentication/auth-login-v2/auth-login-v2.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthRegisterV2Component } from './auth-register-v2/auth-register-v2.component';



// routing
const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginV2Component,
    data: { animation: 'auth' }
  },
  {
    path: 'register',
    component: AuthRegisterV2Component,
    data: { animation: 'toastr'}
  }
];

@NgModule({
  declarations: [AuthLoginV2Component,AuthRegisterV2Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCommonModule,
    CardSnippetModule,
    ContentHeaderModule,
    ToastrModule
  ]
})
export class AuthenticationModule {}
