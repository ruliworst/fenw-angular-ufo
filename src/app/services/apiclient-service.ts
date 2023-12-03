import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { PreferencesService } from './preferences-service';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private baseURL = "http://fenw.etsisi.upm.es:10000"

  constructor(private http: HttpClient, private preferencesService : PreferencesService) { }

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

  loginUser(name: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set("username", name)
      .set("password", password);

    return this.http.get(`${this.baseURL}/users/login`, { params });
  }

  getUsername(username: string) {
    return this.http.get(`${this.baseURL}/users/${username}`, { observe: 'response' });
  }

  getGlobalRecords() {
    return this.http.get(`${this.baseURL}/records`, { observe: 'body' });
  }

  getPersonalRecords() {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (token != null && username != null) {
      const headers = new HttpHeaders().set("Authorization", token);

      return this.http.get(`${this.baseURL}/records/${username}`, { observe: 'body', headers });
    }

    return of();
  }

  saveRecord(record : any) {
    const token = sessionStorage.getItem("token");
    const body = new URLSearchParams();
    body.set("punctuation", record["punctuation"]);
    body.set("ufos", record["ufos"]);
    body.set("disposedTime", record["disposedTime"]);

    if (token != null) {
      const headers = new HttpHeaders().set("Authorization", token);

      return this.http.post(`${this.baseURL}/records`, body.toString(), { headers })
        .pipe(
          tap(() => alert("The record was saved successfully.")),
          catchError(postError => {
            alert("It was not possible to save the record.")
            console.error('Error when trying to post record.', postError);
            return of();
          }));
    }

    return of();

  }
}