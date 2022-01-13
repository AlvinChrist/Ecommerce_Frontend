import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../viewmodel/user.viewmodel';
import { AlertService } from '../alert/alert.service';

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
    private _jwtHelper: JwtHelperService,
    private _alertService: AlertService
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

  getUserRole(): string {
    return this.currentUserValue.role;
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
        this._alertService.toastrSuccess(`Welcome ${this.currentUserValue.userName}!`,2000, {hr: 'right', vr:'top'});
        if(user.role === 'Admin')
          this._router.navigate(['/dashboard'])
        else
          this._router.navigate(['/shop'])
        return;
      })
    );
  }

  logout(): Promise<void> {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('config')
    return new Promise((resolve, reject) => {
      this._httpClient.delete(`/logout`).subscribe((resp) => {
        // this.currentUserSubject.next(null)
        resolve()
      },(err) => {
        // console.log(err)
        reject(err);
      })
    })
  }

  refreshToken(): Observable<any> {
    return this._httpClient.get<any>(`/token`)
  }
}
