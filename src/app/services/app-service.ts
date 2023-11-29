import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private loginAvailable = new Subject<boolean>();

  sendLoginAvailable(loginAvailable: boolean) {
    this.loginAvailable.next(loginAvailable);
  }

  getLoginAvailable() {
    return this.loginAvailable.asObservable();
  }
}