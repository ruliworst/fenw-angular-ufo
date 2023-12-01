import { Component, OnInit } from '@angular/core';
import { Missile } from 'src/app/models/missile.model';
import { MissileService } from 'src/app/services/missile-service';
import { PlayService } from 'src/app/services/play-service';

@Component({
  selector: 'app-missile',
  templateUrl: './missile.component.html',
  styleUrls: ['./missile.component.css']
})
export class MissileComponent implements OnInit {
  interval : any;
  step : number = 6;
  missile : Missile;

  constructor (private missileService : MissileService, private playService : PlayService) { 
    this.missile = new Missile();
  }

  ngOnInit(): void {
    this.missileService.arrowRightEmitter.subscribe(() => {
      this.moveRight();
    });

    this.missileService.arrowLeftEmitter.subscribe(() => {
      this.moveLeft();
    });

    this.missileService.launchEmitter.subscribe(() => {
      this.launch();
    });
  }

  moveRight() {
    if (this.missile.left + this.missile.width + 8 < window.innerWidth) {
      this.missile.left += this.step;
    }
  }

  moveLeft() {  
    if (this.missile.left > 0) {
      this.missile.left -= this.step;
    }
  } 

  launch() {
    this.missile.launched = true;
    this.interval = setInterval(() => {
      const upperLimit = this.playService.upperLimit;

      if (this.playService.checkHit()){    
        clearInterval(this.interval);
        this.missile.launched = false;
        this.missile.bottom = 0;
        this.playService.addHitPunctuation();
      }
  
      if (this.missile.bottom + this.missile.height < upperLimit) {
        this.missile.bottom += this.step;
      } else {
        clearInterval(this.interval); 
        this.missile.launched = false;
        this.missile.bottom = 0;
      }
  
      if (this.missile.bottom + this.missile.height >= upperLimit) {
        this.playService.substractFailPunctuation();
      }
    }, 25);
  }
}
