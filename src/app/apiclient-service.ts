import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private baseURL = "http://fenw.etsisi.upm.es:10000"
  constructor(private http: HttpClient) { }

  registerUser(user: any) : Observable<any> {
    const username = user["name"]
    const body = new URLSearchParams();
    body.set("username", username);
    body.set("email", user["email"]);
    body.set("password", user["password"]);

    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded");

    return this.http.post(`${this.baseURL}/users`, body.toString(), { headers })
      .pipe(
        tap(() => alert("The user was created successfully.")),
        catchError(postError => {
          alert("It was not possible to register the user.")
          console.error('Error when trying to post user.', postError);
          return of();
        })
      );
  }

  loginUser(user: any) {
    const params = new HttpParams()
      .set("username", user["name"])
      .set("password", user["password"]);

    return this.http.get(`${this.baseURL}/users/login`, { params });
  }

  getUsername(username: string) {
    return this.http.get(`${this.baseURL}/users/${username}`, { observe: 'response' });
  }
}