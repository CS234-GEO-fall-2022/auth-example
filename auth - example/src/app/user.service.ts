import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = "http://localhost:3000";

  register(email: string, name: string, password: string){
    return this.httpClient.post<AuthResult>(`${this.apiUrl}/register`, {
      email: email,
      name: name,
      password: password
    });
  }

  signIn(email: string, password: string)
  {
    return this.httpClient.post<AuthResult>(`${this.apiUrl}/login`, {
      email: email,
      password: password
    }).pipe(tap(c => this.localStorage.store('authData', c)));
  }

  signOut(){
    this.localStorage.clear('authData');
  }

  isSignedIn(){
    return this.localStorage.retrieve('authData') != null;
  }

  getAuthToken(){
    return this.localStorage.retrieve('authData').accessToken;
  }

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }
}


export interface AuthResult{
  accessToken: string;
  user: {
    id: number;
    name: string;
  };
}