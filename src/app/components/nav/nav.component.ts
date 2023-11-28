import { Component } from "@angular/core";

@Component({
  selector: 'navigation-bar',
  templateUrl: './nav.component.html',
  styleUrls: []
})
export class NavigationBarComponent {
  title = 'ufoGame';
  token = sessionStorage.getItem("token")
  signupAvailable = this.token === "" || this.token === undefined ? true : false;
}