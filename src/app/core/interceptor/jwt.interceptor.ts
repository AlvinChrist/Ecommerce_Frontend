import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'app/main/apps/authentication/service/user.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {UserService} _userService
   */
  constructor(
    private _userService: UserService,
    private _jwtHelper: JwtHelperService
    ) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this._userService.currentUserValue;
    const accessToken = this._userService.getAccessToken();
    const isLoggedIn = currentUser && accessToken;
    request = request.clone({
      url: `${environment.apiUrl}${request.url}`,
      withCredentials: true
    });
    if (isLoggedIn) {
      if(request.url.indexOf('token') !== -1) {
        return next.handle(request)
      }
      if(this._jwtHelper.isTokenExpired()){
        localStorage.removeItem('accessToken');
        return this._userService.refreshToken().pipe(
          switchMap((resp) => {
            if(resp.accessToken){
              localStorage.setItem('accessToken', JSON.stringify(resp.accessToken));// update token
              console.log("token refreshed!");
              return next.handle(this.injectToken(request));
            }
            else{
              this._userService.logout();
              return next.handle(request)
            }
          })
        )
      }
      return next.handle(this.injectToken(request))
    }
    else{
      return next.handle(request);
    }
  }

  injectToken(request: HttpRequest<any>) {
    const accessToken = this._userService.getAccessToken();
    return request.clone({
        setHeaders: {
            Authorization: `Bearer ${accessToken}`
        }
    });
}
}
