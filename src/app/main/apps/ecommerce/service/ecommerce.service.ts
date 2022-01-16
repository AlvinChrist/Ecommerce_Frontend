import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../products/model/product.viewmodel';


@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  public wishlist: Product[]
  public onWishlistChange: BehaviorSubject<any>;
  constructor(
    private _httpClient: HttpClient
  ){
    this.onWishlistChange = new BehaviorSubject([{}])
  }

  getWishList(userId: number) {
    this._httpClient.get<any>(`/user/${userId}/wishlist`, { responseType: 'json'}).subscribe((resp: any) => {
      if(resp.wishlist){
        this.wishlist = resp.wishlist;
        this.onWishlistChange.next(this.wishlist)
      }
    },(err) => {
      console.log(err)
    })
  }

  isInWishlist(productId: number): boolean{
    let idx = -1
    // console.log(this.wishlist)
    if(this.wishlist && productId){
      idx = this.wishlist.findIndex((x) => x.productId === productId)
      // console.log(idx,this.wishlist,productId)
    }
    return idx !== -1
  }

  addToWishlist(userId: number, productId: number): Promise<void>{
    return new Promise((resolve,reject) => {
      this._httpClient.post<any>(`/wishlist`, {userId: userId, productId: productId, productQty: 0}, { responseType: 'json'})
      .subscribe((resp: any) => {
        if(resp?.message){
          this.getWishList(userId)
          resolve();
        }
        else{
          console.log(resp)
          reject();
        }
      },(err) => {
        console.log(err)
        reject();
      })
    })
  }

  removeFromWishlist(userId: number, productId: number): Promise<void> {
    return new Promise((resolve,reject) => {
      this._httpClient.delete<any>(`/user/${userId}/product/${productId}`, { responseType: 'json'})
      .subscribe((resp: any) => {
        if(resp?.message === 'Item Removed!'){
          this.getWishList(userId);
          resolve();
        }
        else{
          console.log(resp)
          reject();
        }
      },(err) => {
        console.log(err)
        reject();
      })
    })
  }

}
