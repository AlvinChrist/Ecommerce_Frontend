import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { UserService } from 'app/main/apps/authentication/service/user.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductComment } from './models/comment.viewmodel';
import { CommentService } from './service/comment.service';

@Component({
  selector: 'app-comment-content',
  templateUrl: './comment-content.component.html'
})
export class CommentContentComponent implements OnInit, OnDestroy {
  // Decorator
  @Input() productId: any;
  @ViewChild('scrollMe') scrollMe: ElementRef;
  scrolltop: number = null;
  userId: number;
  
  // Public
  public activeChat: Boolean;
  public comments: ProductComment[] = [];
  public commentText: any;
  public env = environment
  public currSkin = '';
  
  private newComment = new ProductComment();
  private _unsubscribeAll: Subject<any>;
  /**
   * Constructor
   *
   * @param {CommentService} _commentService
   */
  constructor(
    private _commentService: CommentService,
    private _userService: UserService,
    private _coreConfigService: CoreConfigService
    ) {
      this._unsubscribeAll = new Subject();
      this._coreConfigService
      .getConfig()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(config => {
        this.currSkin = config.layout.skin;
      });
    }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    setTimeout(() => {
      this.scrolltop = this.scrollMe?.nativeElement.scrollHeight;
    }, 0)
    this.userId = this._userService.currentUserValue.userId
    this._commentService.getAllComment(this.productId)
    this._commentService.onCommentChange.pipe(takeUntil(this._unsubscribeAll)).subscribe((resp) => {
      this.comments = resp
    })
    this.newComment.userId = this.userId
    this.newComment.productId = this.productId
  }

  ngOnDestroy(): void {
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  addComment(): void {
    this.newComment.commentText = this.commentText
    this._commentService.addComment(this.newComment).subscribe((resp) => {
      if(resp?.result){
        resp.result['user'] = this._userService.currentUserValue
        this.comments.push(resp.result)
      }
    },(err) => {
      console.log(err)
    }).add(() => {
      this.commentText = ''
      setTimeout(() => {
        this.scrolltop = this.scrollMe?.nativeElement.scrollHeight;
      }, 0);
    })
  }
}
