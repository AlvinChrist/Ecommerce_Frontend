import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../viewmodel/user.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _jwtHelper: JwtHelperService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getUsers(): Observable<Array<User>> {
    return this._httpClient.get<Array<User>>(`/users`, { responseType: 'json'})
  }

  register(user: User): Observable<any> {
    return this._httpClient.post<any>(`/user`, user, { responseType: 'json'})
  }

  getUserDetail(): User {
    return this._jwtHelper.decodeToken(this.getAccessToken())
  }

  getAccessToken(): string {
    return JSON.parse(localStorage.getItem('accessToken'))
  }

  login(email: string, password: string): Observable<any>{
    return this._httpClient
    .post<any>(`/login`, { email, password })
    .pipe(
      map((resp: any) => {
        localStorage.setItem('accessToken', JSON.stringify(resp.accessToken));
        let user: User = this.getUserDetail()
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.currentUserSubject.next(user)
        if(user.role === 'Admin')
          this._router.navigate(['/dashboard'])
        else
          this._router.navigate(['/shop'])
        return;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('accessToken')
    this._httpClient.delete(`/logout`).subscribe((resp) => {
      this.currentUserSubject.next(null)
      this._router.navigate(['/login'])
    },(err) => {
      console.log(err)
      this._router.navigate(['/login'])
    })
  }

  refreshToken(): void {
    this._httpClient.get<any>(`/token`).subscribe((resp: any) => {
      if(resp.accessToken) {
        localStorage.setItem('accessToken', JSON.stringify(resp.accessToken));// update token
        const currentUser = this.currentUserValue
        localStorage.setItem('currentUser',JSON.stringify(currentUser))
      }
    },(err) => {
      console.log(err)
    })
  }
}
