import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fitur1Component } from './fitur1.component';

const routes: Routes = [
  {
    path: '',
    component: Fitur1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Fitur1RoutingModule { }
