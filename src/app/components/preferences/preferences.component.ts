import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { PreferencesService } from "src/app/services/preferences-service";

@Component({
  standalone: true,
  selector: 'preferences',
  templateUrl: './preferences.component.html',
  styleUrls: [],
  imports: [ReactiveFormsModule],
})
export class PreferencesComponent {
  title = 'Preferences';

  constructor(private preferencesService: PreferencesService, private router: Router) { }

  preferencesForm = new FormGroup({
    ufosNumber: new FormControl(this.preferencesService.ufosNumber),
    time: new FormControl(this.preferencesService.playTime)
  });

  onSubmit() {
    const preferences = this.preferencesForm.value;
    const ufosNumber = preferences['ufosNumber'];
    const time = preferences['time'];

    if (ufosNumber != null && time != null) {
      localStorage.setItem('ufosNumber', ufosNumber.toString());
      localStorage.setItem('time', time.toString());
      this.router.navigateByUrl('/play');
    }
  }

}