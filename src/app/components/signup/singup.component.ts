import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ApiClientService } from "src/app/services/apiclient-service";

@Component({
  standalone: true,
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: [],
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  title = 'Sign up';

  constructor(private apiClient: ApiClientService) { }

  forbiddenStringValidator = (nameRe: RegExp): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  profileForm = new FormGroup({
    name: new FormControl('', this.forbiddenStringValidator(new RegExp("^[a-zA-Z0-9]{1,8}$"))),
    email: new FormControl('', this.forbiddenStringValidator(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"))),
    password: new FormControl(''),
    repeatPassword: new FormControl('')
  });

  onSubmit() {
    const profile = this.profileForm.value

    if (profile["password"] !== profile["repeatPassword"]) {
      alert("Passwords are not the same.")
      return
    }

    this.apiClient
      .registerUser(profile)
      .subscribe({complete: console.log});
    this.profileForm.reset();
  }

  onBlur() {
    const profile = this.profileForm.value
    const name = profile["name"]

    if (name !== undefined && name !== "" && name !== null) {
      this.apiClient.getUsername(name)
        .subscribe(response => {
          if (response.status === 200) alert("The username already exists. Change it.")
        })
    }
  }
}