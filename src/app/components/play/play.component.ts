import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Missile } from 'src/app/models/missile.model';
import { Ufo } from 'src/app/models/ufo.model';
import { MissileService } from 'src/app/services/missile-service';
import { PlayService } from 'src/app/services/play-service';
import { PreferencesService } from 'src/app/services/preferences-service';
import { UfoService } from 'src/app/services/ufo-service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],  
})
export class PlayComponent implements OnInit, OnDestroy {
  time : number = 60;
  updateTimePID : any;
  score : number = 0;

  missile : Missile;
  missileInterval : any;
  missileStep : number = 6;

  ufos : Ufo[] = [];
  ufoIntervals : any[] = [];

  private missileService : MissileService;
  private ufoService : UfoService;

  constructor(private preferencesService : PreferencesService, private playService : PlayService) {
    this.missileService = new MissileService();
    this.ufoService = new UfoService(preferencesService);
    this.playService = new PlayService(this.ufoService, this.missileService);
    this.missile = this.missileService.missile;
    this.ufos = this.ufoService.ufos;
    this.playService.scoreChanged.subscribe((score) => {
      this.score = score;
    });
  }

  ngOnInit(): void {
    this.time = this.preferencesService.playTime;
    this.updateTimePID = setInterval(() => this.updateTime(), 1000);

    this.missileService.arrowRightEmitter.subscribe(() => {
      this.moveMissileRight();
    });

    this.missileService.arrowLeftEmitter.subscribe(() => {
      this.moveMissileLeft();
    });

    this.missileService.launchEmitter.subscribe(() => {
      this.launch();
    });

    this.ufoIntervals = this.ufoService.ufos.map(ufo => setInterval(() => this.moveUfo(ufo), 25))
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    console.log(event.key)
    switch (event.key) {
      case 'ArrowRight': this.missileService.emitMissileRight();
                          break;
      case 'ArrowLeft':  this.missileService.emitMissileLeft();
                          break;
      case ' ':      this.missileService.emitMissileLaunch();
                          break;
    }
  }

  updateTime() {
    if (--this.time === 0) {
      this.gameOver();
    }
  }

  gameOver() {
    clearInterval(this.updateTimePID);
    clearInterval(this.missileInterval);
    this.ufoIntervals.forEach(i => clearInterval(i));
  }

  moveMissileRight() {
    if (this.missile.left + this.missile.width + 8 < window.innerWidth && !this.missile.launched) {
      this.missile.left += this.missileStep;
    }
  }

  moveMissileLeft() {  
    if (this.missile.left > 0 && !this.missile.launched) {
      this.missile.left -= this.missileStep;
    }
  } 

  launch() {
    if (!this.missile.launched) {
      this.missile.launched = true;
      this.missileInterval = setInterval(() => {
        const upperLimit = this.playService.upperLimit;
  
        if (this.playService.checkHit()){    
          clearInterval(this.missileInterval);
          this.missile.launched = false;
          this.missile.bottom = 0;
          this.playService.addHitPunctuation();
        }
    
        if (this.missile.bottom + this.missile.height < upperLimit) {
          this.missile.bottom += this.missileStep;
        } else {
          clearInterval(this.missileInterval); 
          this.missile.launched = false;
          this.missile.bottom = 0;
        }
    
        if (this.missile.bottom + this.missile.height >= upperLimit) {
          this.playService.substractFailPunctuation();
        }
      }, 25); 
    }
  }

  moveUfo(ufo : Ufo) {
    const leftLimit = 0;

    if (ufo.left + ufo.width > window.innerWidth || ufo.left < leftLimit) {
      ufo.step = ufo.step * (-1);
    }

    ufo.left = ufo.left + ufo.step;
  }

  ngOnDestroy(): void {
    this.gameOver();
  }
}
