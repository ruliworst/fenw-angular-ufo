import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ApiClientService } from "src/app/apiclient-service";

@Component({
  standalone: true,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [],
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  title = 'Login';

  constructor(private apiClient: ApiClientService) { }

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
    const profile = this.profileForm.value

    this.apiClient
      .loginUser(profile)
      .subscribe(value => {
        sessionStorage.setItem('token', value.toString());
        setTimeout(() => {
          sessionStorage.removeItem('token');
        }, 10 * 60 * 1000);
      });
  }
}