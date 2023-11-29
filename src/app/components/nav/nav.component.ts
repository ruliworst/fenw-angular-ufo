import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth-service";

@Component({
  selector: 'navigation-bar',
  templateUrl: './nav.component.html',
  styleUrls: []
})
export class NavigationBarComponent {
  title = 'ufoGame';
  token = sessionStorage.getItem('token');

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.authenticationChanged.subscribe();
  }

  logout() {
    this.authService.logout();
  }
}