import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'app/viewmodel/product.viewmodel';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() data: Product
  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
