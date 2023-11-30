import { Component, HostListener, OnInit } from '@angular/core';
import { PreferencesService } from 'src/app/services/preferences-service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],  
})
export class PlayComponent implements OnInit {
  step : number = 4;
  ufoFeatures : {
    height : number,
    left : number,
    step : number,
    bottom : number,
    src : any,
  }[] = [];
  missileLeft : number = window.innerWidth / 2;
  missileStep : number = 6;
  missileWidth : number = 40;
  missileBottom : number = 0;
  missileHeight : number = 50;
  ufoWidth : number = 50;
  time : number = 60;
  moveUfosPID : any;
  updateTimePID : any;
  missilePID : any;
  rightLimit = window.innerWidth;
  missileLaunched : boolean = false;
  headerHeight : number = 120;
  score : number = 0;
  defaultSrc : string = "../../../assets/ufo.png";

  constructor(private preferencesService : PreferencesService) { }

  ngOnInit(): void {
    let height = 0;
    let ufoBottom = 450;
    const ufosNumber = this.preferencesService.ufosNumber;

    for (let i = 0; i < ufosNumber; i++) {
      let randomNumber = Math.random() * 10;
      let left = randomNumber < 5 ? 0 : window.innerWidth - 50;
      let step = randomNumber < 5 ? this.step * (-1) : this.step;

      let randomSpeed = Math.random() * 3;
      randomSpeed = randomSpeed < 1 ? 1 : randomSpeed;
      step = this.step * randomSpeed;

      this.ufoFeatures.push({
        height: height,
        left: left,
        step: step,
        bottom: ufoBottom,
        src: this.defaultSrc,
      });

      height += 50;
      ufoBottom += 50;
    }

    this.time = this.preferencesService.playTime;
    this.updateTimePID = setInterval(() => this.updateTime(), 1000);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.missileLaunched) {
      switch (event.key) {
        case 'ArrowRight': this.moveMissileRight();
                          break;
        case 'ArrowLeft':  this.moveMissileLeft();
                          break;
        case ' ':          this.pullTrigger();
                          break;
      }
    }
  }

  pullTrigger() {
    this.missileLaunched = true;
    this.missilePID = setInterval(() => this.launch(), 25);
  }

  launch() {
    const upperLimit = window.innerHeight - this.headerHeight ;

    if (this.checkHit()){    
      clearInterval(this.missilePID);
      this.missileLaunched = false;
      this.missileBottom = 0;
      this.score += 100;
    }

    if (this.missileBottom + this.missileHeight < upperLimit) {
      this.missileBottom += this.missileStep;
    } else {
      clearInterval(this.missilePID); 
      this.missileLaunched = false;
      this.missileBottom = 0;
    }

    if (this.missileBottom + this.missileHeight >= upperLimit ) this.score -= 25;
  }  

  moveMissileRight() {
    if (this.missileLeft + this.missileWidth + 8 < this.rightLimit) {
      this.missileLeft += this.missileStep;
    }
  }

  checkHit() {
    const ufos = document.getElementsByClassName('ufo');
    
    for (let i = 0; i < ufos.length; i++) {
      const ufo = ufos[i] as HTMLImageElement;
      let hPositionUfo = parseInt(ufo.style.left);
      let vPositionUfo = parseInt(ufo.style.bottom);
      const widthUfo = this.ufoWidth;
      let vPositionMissile = this.missileBottom;
      let hPositionMissile = this.missileLeft;
      let missileWidth = this.missileWidth;

      let hit = (vPositionMissile + this.missileHeight >= vPositionUfo) &&
              (hPositionMissile + missileWidth / 2 >= hPositionUfo) && 
              (hPositionMissile + missileWidth / 2 <= hPositionUfo + widthUfo) &&
              (vPositionMissile <= vPositionUfo);
 
        
      if (hit) {
        console.log("HIT")
        ufo.src = '../../../assets/explosion.gif';
        setTimeout(() => ufo.src = '../../../assets/ufo.png', 2000);
        return true;
      }
    }

    return false;
  }

  moveMissileLeft() {  
    if (this.missileLeft > 0) {
      this.missileLeft -= this.missileStep;
    }
  } 

  updateTime() {
    this.time--;

    if (this.time === 0) {
      this.gameOver();
    }
  }

  gameOver() {
    clearInterval(this.updateTimePID)

  }
}
