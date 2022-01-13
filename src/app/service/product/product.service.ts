import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductSearch } from 'app/viewmodel/product.viewmodel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productList: Array<Product>;
  public productSearch = new ProductSearch()
  public onProductListChange: BehaviorSubject<Product[] | any>;

  constructor(
    private _httpClient: HttpClient
  ) { 
    this.onProductListChange = new BehaviorSubject([{}]);
  }
  // /**
  //  * Resolver
  //  *
  //  * @param {ActivatedRouteSnapshot} route
  //  * @param {RouterStateSnapshot} state
  //  * @returns {Observable<any> | Promise<any> | any}
  //  */
  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

  //   return new Promise<void>((resolve, reject) => {
  //     Promise.all([this.getProducts()]).then(() => {
  //       resolve();
  //     }).catch((err) => {
  //       reject(err);
  //     });
  //   });
  // }
  

  addProduct(product: FormData): Observable<any> {
    return this._httpClient.post<any>(`/products`, product, { responseType: 'json'})
    // return this._httpClient.post<any>('/products', product.form_data).pipe(
    //   concatMap(resp1 => this._httpClient.post<any>(`/products`, product, { responseType: 'json'}))
    // )
  }

  getProducts(): void {
    this._httpClient.get<Array<Product>>(`/products?page=${this.productSearch.page}&size=${this.productSearch.size}&filterType=${this.productSearch.filterType}&filterValue=${this.productSearch.filterValue}&searchedProduct=${this.productSearch.searchedProduct}`, { responseType: 'json'})
      .subscribe((resp: Product[]) => {
        this.productList = resp;
        this.onProductListChange.next(resp)
    })
  }

  getProductById(productId: number): Observable<any> {
    return this._httpClient.get<any>(`/products/${productId}`, { responseType: 'json'})
  }

  updateProduct(product: Product): Observable<any>{
    return this._httpClient.put<any>(`/products/${product.productId}`, product, { responseType: 'json'})
  }

  deleteProduct(productId: number): Observable<any> {
    return this._httpClient.delete<any>(`/products/${productId}`, { responseType: 'json'})
  }

  getUserProductRating(productId: number, userId: number): Observable<any> {
    return this._httpClient.get<any>(`/product/${productId}/rating/user/${userId}`, { responseType: 'json'})
  }

  getProductRating(productId: number): Observable<any>{
    return this._httpClient.get<any>(`/product/${productId}/rating`, { responseType: 'json'})
  }

  getProductGalleries(productId: number): Observable<any> {
    return this._httpClient.get<any>(`/gallery/product/${productId}`, { responseType: 'json'})
  }

  rateProduct(productId: number, userId: number, productRating: number){
    return this._httpClient.post<any>(`/rate`, {
      productId: productId,
      userId: userId,
      productRating: productRating
    }, { responseType: 'json'})
  }
}
