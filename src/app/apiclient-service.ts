import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private baseURL = "http://fenw.etsisi.upm.es:10000"
  constructor(private http: HttpClient) { }

  registerUser(user: any, token: string) : Observable<any> {
    const body = new URLSearchParams();
    body.set("username", user["name"]);
    body.set("email", user["email"]);
    body.set("password", user["password"]);

    const headers = new HttpHeaders()
    .set("Content-Type", "application/x-www-form-urlencoded")
    .set("Authorization", token);

    return this.http.post(`${this.baseURL}/users`, body.toString(), { headers });
  }
}