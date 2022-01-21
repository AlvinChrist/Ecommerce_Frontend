import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductComment } from '../models/comment.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class CommentService  {
  public commentList: Array<ProductComment>
  public onCommentChange: BehaviorSubject<ProductComment[] | any>

  constructor(private _httpClient: HttpClient) {
    this.onCommentChange = new BehaviorSubject({})
  }

  getAllComment(productId: number): void {
    this._httpClient.get<any>(`/product/${productId}/comments`, { responseType: 'json'}).subscribe((resp) => {
      if(resp?.comments){
        //@ts-ignore
        this.commentList = [...resp.comments]
        this.onCommentChange.next(this.commentList)
      }
    },(err) => {
      console.log(err)
    })
  }

  addComment(data: ProductComment): Observable<any> {
    return this._httpClient.post<any>(`/comments/`, data, { responseType: 'json'})
  }

  editComment(data: ProductComment): Observable<any> {
    return this._httpClient.post<any>(`/comment/${data.commentId}`, data, { responseType: 'json'})
  }

  deleteComment(commentId: number): Observable<any> {
    return this._httpClient.delete<any>(`/comment/${commentId}`, { responseType: 'json'})
  }
}
