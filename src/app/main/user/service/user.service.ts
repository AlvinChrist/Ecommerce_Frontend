import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/user.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: Observable<User>;

  //private
  public currentUserSubject: BehaviorSubject<User | any>;
  constructor(
    private _httpClient: HttpClient,
    private _jwtHelper: JwtHelperService,
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

  getUserDetail(): User {
    return this._jwtHelper.decodeToken(this.getAccessToken())
  }
  
  getAccessToken(): string {
    if(localStorage.getItem('accessToken')){
      return JSON.parse(localStorage.getItem('accessToken'))
    }
    return null
  }

  getUserRole(): string {
    return this.currentUserValue.role;
  }

}
