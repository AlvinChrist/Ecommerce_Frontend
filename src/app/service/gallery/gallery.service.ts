import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'app/viewmodel/gallery.viewmodel'

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getImageByProductId(productId: number): Observable<any> {
    return this._httpClient.get<any>(`/gallery/product/${productId}`, { responseType: 'json'})
  }

  uploadImage(image: Image): Observable<any> {
    return this._httpClient.post<any>(`/gallery`, image, { responseType: 'json'})
  }

  deleteImage (imageId: number): Observable<any> {
    return this._httpClient.delete<any>(`/gallery/${imageId}`, { responseType: 'json'})
  }
}
