import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ecommerce-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceSidebarComponent implements OnInit {
  // Public
  @Input() data: any;
  
  public sliderPriceValue = [1, 100];

  constructor() {}

  ngOnInit(): void {
    console.log(this.data)
  }

  categoryFilter(e: any) {
    console.log(e)
  }
}
