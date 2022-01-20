import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Fitur1RoutingModule } from './fitur1-routing.module';
import { Fitur1Component } from './fitur1.component';


@NgModule({
  declarations: [
    Fitur1Component
  ],
  imports: [
    CommonModule,
    Fitur1RoutingModule
  ]
})
export class Fitur1Module { }
