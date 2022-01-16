import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from 'app/main/apps/ecommerce/service/ecommerce.service';
import { User } from '../../authentication/model/user.viewmodel';
import { UserService } from '../../authentication/service/user.service';


@Component({
  selector: 'app-ecommerce-wishlist',
  templateUrl: './ecommerce-wishlist.component.html',
  styleUrls: ['./ecommerce-wishlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceWishlistComponent implements OnInit {
  // Public
  public contentHeader: object;
  public products;
  public wishlist$;

  /**
   *
   * @param {EcommerceService} _ecommerceService
   */

  private user: User;
  constructor(
    private _ecommerceService: EcommerceService,
    private _userService: UserService
    ) {
      this.user = this._userService.currentUserValue
      this._ecommerceService.getWishList(this.user.userId);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.wishlist$ = this._ecommerceService.onWishlistChange

    // content header
    this.contentHeader = {
      headerTitle: 'Wish List',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'eCommerce',
            isLink: true,
            link: '/'
          },
          {
            name: 'Wish List',
            isLink: false
          }
        ]
      }
    };
  }
}
