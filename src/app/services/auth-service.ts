import { Injectable } from '@angular/core';
import { ApiClientService } from './apiclient-service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _tokenKey = 'token';
  authenticationChanged = new Subject<boolean>();

  constructor(private apiClient: ApiClientService, private router : Router) { }

  get isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this._tokenKey);
  }

  get token(): any {
    return sessionStorage.getItem(this._tokenKey);
  }

  login(name: string, password: string) {
    this.apiClient
      .loginUser(name, password)
      .subscribe(value => {
        sessionStorage.setItem(this._tokenKey, value.toString());
        this.authenticationChanged.next(true);
        setTimeout(() => {
          sessionStorage.removeItem(this._tokenKey);
          const renewToken = window.confirm("The token has expired. Do you want to renew the token?");
          if (renewToken) { 
            this.login(name, password);
          } else {
            this.router.navigate(['/login']);
          }
        }, 10 * 60 * 1000);
      });
  }

  logout() {
    sessionStorage.removeItem(this._tokenKey);
    this.authenticationChanged.next(false);
  }
}
