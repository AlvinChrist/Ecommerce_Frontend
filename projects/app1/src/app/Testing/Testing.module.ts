import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { TranslateModule } from '@ngx-translate/core';
import { ContentHeaderModule } from 'app/core/layout/components/content-header/content-header.module';
import { HomeComponent } from './home/home.component';
import { Fitur1Component } from './fitur1/fitur1.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home' }
  },
  {
    path: 'fitur1',
    component: Fitur1Component
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    Fitur1Component
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule
  ],
  exports: [HomeComponent, Fitur1Component]
})
export class TestingModule { }
