import { Component, HostListener, OnInit } from '@angular/core';
import { MissileService } from 'src/app/services/missile-service';
import { PlayService } from 'src/app/services/play-service';
import { PreferencesService } from 'src/app/services/preferences-service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],  
})
export class PlayComponent implements OnInit {
  time : number = 60;
  updateTimePID : any;
  score : number = 0;

  constructor(private preferencesService : PreferencesService, private missileService : MissileService, private playService : PlayService) {
    this.playService.scoreChanged.subscribe((score) => {
      this.score = score;
    });
  }

  ngOnInit(): void {
    this.missileService.ngOnInit();
    this.time = this.preferencesService.playTime;
    this.updateTimePID = setInterval(() => this.updateTime(), 1000);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight': this.missileService.emitMissileRight();
                          break;
      case 'ArrowLeft':  this.missileService.emitMissileLeft();
                          break;
      case ' ':          this.missileService.emitMissileLaunch();
                          break;
    }
  }

  updateTime() {
    if (--this.time === 0) {
      this.gameOver();
    }
  }

  gameOver() {
    clearInterval(this.updateTimePID)
  }
}
