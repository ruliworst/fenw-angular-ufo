import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Ufo } from 'src/app/models/ufo.model';
import { PlayService } from 'src/app/services/play-service';
import { PreferencesService } from 'src/app/services/preferences-service';
import { UfoService } from 'src/app/services/ufo-service';

@Component({
  selector: 'app-ufo',
  templateUrl: './ufo.component.html',
  styleUrls: ['./ufo.component.css']
})
export class UfoComponent implements OnInit, OnDestroy {
  intervals : any[] = [];

  constructor(public ufoService : UfoService) { }

  ngOnInit(): void {
    this.intervals = this.ufoService.ufos.map(ufo => setInterval(() => this.moveUfo(ufo), 25))
  }

  moveUfo(ufo : Ufo) {
    const leftLimit = 0;

    if (ufo.left + ufo.width > window.innerWidth || ufo.left < leftLimit) {
      ufo.step = ufo.step * (-1);
    }

    ufo.left = ufo.left + ufo.step;
  }

  ngOnDestroy(): void {
    this.intervals.forEach(i => clearInterval(i));
  }
}
