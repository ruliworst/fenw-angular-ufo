import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: 'preferences',
  templateUrl: './preferences.component.html',
  styleUrls: [],
  imports: [ReactiveFormsModule],
})
export class PreferencesComponent {
  title = 'Preferences';
  preferencesForm = new FormGroup({
    ufosNumber: new FormControl(1),
    time: new FormControl(60)
  });

  onSubmit() {
    const preferences = this.preferencesForm.value;
    const ufosNumber = preferences['ufosNumber'];
    const time = preferences['time'];

    if (ufosNumber != null && time != null) {
      localStorage.setItem('ufosNumber', ufosNumber.toString());
      localStorage.setItem('time', time.toString());
    }
  }

}