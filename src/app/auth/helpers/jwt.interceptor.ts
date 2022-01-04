import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from 'app/service/user/user.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {UserService} _userService
   */
  constructor(private _userService: UserService) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this._userService.currentUserValue;
    const accessToken = this._userService.getAccessToken();
    const isLoggedIn = currentUser && accessToken;
    if (isLoggedIn) {
      request = request.clone({
        url: `${environment.apiUrl}${request.url}`,
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    else{
      request = request.clone({
        url: `${environment.apiUrl}${request.url}`
      });
    }
    return next.handle(request);
  }
}
