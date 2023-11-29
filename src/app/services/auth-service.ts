import { Injectable, EventEmitter } from '@angular/core';
import { ApiClientService } from './apiclient-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _tokenKey = 'token';
  authenticationChanged = new EventEmitter<boolean>();

  constructor(private apiClient: ApiClientService) { }

  get isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this._tokenKey);
  }

  login(name: string, password: string) {
    this.apiClient
      .loginUser(name, password)
      .subscribe(value => {
        sessionStorage.setItem(this._tokenKey, value.toString());
        this.authenticationChanged.emit(true);
        setTimeout(() => {
          sessionStorage.removeItem(this._tokenKey);
        }, 10 * 60 * 1000);
      });
  }

  logout() {
    sessionStorage.removeItem(this._tokenKey);
    this.authenticationChanged.emit(false);
  }
}
