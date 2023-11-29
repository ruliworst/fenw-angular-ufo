import { Component } from '@angular/core';
import { PreferencesService } from 'src/app/services/preferences-service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],  
})
export class PlayComponent {

  
  constructor(private preferencesService : PreferencesService) { }


}
