import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Missile } from 'src/app/models/missile.model';
import { Ufo } from 'src/app/models/ufo.model';
import { PreferencesService } from 'src/app/services/preferences-service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],  
})
export class PlayComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('missileRef') missileRef!: ElementRef;
  @ViewChildren('ufoRef') ufosRef!: QueryList<ElementRef>;
  time : number = 60;
  updateTimePID : any;
  score : number = 0;
  headerHeight = 120;

  missile : Missile;
  missileInterval : any;
  missileStep : number = 6;

  ufos : Ufo[] = [];
  ufoIntervals : any[] = [];

  constructor(private preferencesService : PreferencesService, private renderer : Renderer2) {
    console.log(this.missileRef)
    this.missile = new Missile(this.missileRef, this.renderer);
    this.initializeUfos();
  }

  ngAfterViewInit(): void {
    this.missile = new Missile(this.missileRef, this.renderer);
    this.ufosRef.forEach((ufoRef, index) => this.ufos[index].ufoRef = ufoRef);
  }

  ngOnInit(): void {
    this.time = this.preferencesService.playTime;
    this.updateTimePID = setInterval(() => this.updateTime(), 1000);

    this.ufoIntervals = this.ufos.map(ufo => setInterval(() => ufo.moveUfo()), 25);
    console.log(this.ufoIntervals)
  }

  private initializeUfos(): void {
    let bottom = 650;
    for (let i = 0; i < this.preferencesService.ufosNumber; i++, bottom -= 50) {
      const ufo = new Ufo(this.renderer, bottom);
      ufo.setInitialLeft();
      ufo.setRandomStep();
      this.ufos.push(ufo);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight': this.missile.moveRight();
                          break;
      case 'ArrowLeft':  this.missile.moveLeft();
                          break;
      case ' ':      this.launch();
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

  launch() {
    if (this.missileInterval != null) {
      this.stopMissile();
    }
    this.missileInterval = setInterval(() => {
      this.missile.launched = true;

      if (this.checkHit()) {
        this.stopMissile();
        this.addHitPunctuation();
      }

      if (this.missile.isMissileAtTop()) {
        this.stopMissile();
        this.substractFailPunctuation();
      } else {
        this.missile.moveUp();
      }
    }, 25); 
  }

  stopMissile() {
    this.missile.launched = false;
    clearInterval(this.missileInterval);
    this.missile.reset();
  }

  checkHit() {
    for (let i = 0; i < this.ufos.length; i++) {
      const ufo = this.ufos[i];

      let horizontalPositionUfo = ufo.getLeft();
      let verticalPositionUfo = ufo.getBottom();
      let horizontalPositionMissile = this.missile.getLeft();
      let verticalPositionMissile = this.missile.bottom;
      let missileHeight = this.missile.height;
      let missileWidth = this.missile.width;
      let ufoWidth = ufo.width;

      console.log("HorizontalPositionUfo", horizontalPositionUfo,"VerticalPositionUfo",verticalPositionUfo,"HorizontalPositionMissile",horizontalPositionMissile,"VerticalPositionMissile",verticalPositionMissile,"MissileHeight",missileHeight,"MissileWidth",missileWidth,"UfoWidth",ufoWidth)

      let hit = (verticalPositionMissile + missileHeight >= verticalPositionUfo) &&
              (horizontalPositionMissile + missileWidth / 2 >= horizontalPositionUfo) && 
              (horizontalPositionMissile + missileWidth / 2 <= horizontalPositionUfo + ufoWidth) &&
              (verticalPositionMissile <= verticalPositionUfo);

      if (hit) {
        console.log("HIT")

        ufo.src = '../../assets/explosion.gif';
        setTimeout(() => ufo.src = '../../assets/ufo.png', 2000);
        return true;
      }
    }

    return false;
  }

  getUpperLimit() {
    return window.innerHeight - this.headerHeight;
  }

  addHitPunctuation() {
    this.score += 100;
  }

  substractFailPunctuation() {
    this.score -= 25;
  }

  ngOnDestroy(): void {
    this.gameOver();
  }
}
