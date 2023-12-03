import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth-service";

@Component({
  standalone: true,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [],
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  title = 'Login';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.authenticationChanged.subscribe((isAuthenticated) => {
      if (isAuthenticated) this.router.navigateByUrl('/play');
    });
  }

  forbiddenStringValidator = (nameRe: RegExp): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  profileForm = new FormGroup({
    name: new FormControl('', this.forbiddenStringValidator(new RegExp("^[a-zA-Z0-9]{1,8}$"))),
    password: new FormControl(''),
  });

  onSubmit() {
    const profile = this.profileForm.value;
    const name = profile["name"];
    const passwd = profile["password"]
    
    if (name != null && passwd != null) {
      sessionStorage.setItem("username", name);
      this.authService.login(name, passwd);
      this.profileForm.reset();
    }
  }
}