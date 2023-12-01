import { EventEmitter, Injectable } from "@angular/core";
import { UfoService } from "./ufo-service";
import { MissileService } from "./missile-service";


@Injectable({
  providedIn: 'root'
})
export class PlayService {
  private _headerHeight = 120;
  private _score = 0;

  scoreChanged = new EventEmitter<number>();

  constructor(private ufoService : UfoService, private missileService : MissileService) { }

  get upperLimit() {
    return window.innerHeight - this._headerHeight;
  }

  addHitPunctuation() {
    this._score += 100;
    this.emitScore(); 
  }

  substractFailPunctuation() {
    this._score -= 25;
    this.emitScore();
  }

  emitScore() {
    this.scoreChanged.emit(this._score);
  }

  checkHit() {
    const ufos = this.ufoService.ufos;
    const missile = this.missileService.missile;

    for (let i = 0; i < ufos.length; i++) {
      const ufo = ufos[i];

      let horizontalPositionUfo = ufo.left;
      let verticalPositionUfo = ufo.bottom;
      let verticalPositionMissile = missile.bottom;
      let horizontalPositionMissile = missile.left;
  
      let hit = (verticalPositionMissile + missile.height >= verticalPositionUfo) &&
              (horizontalPositionMissile + missile.width / 2 >= horizontalPositionUfo) && 
              (horizontalPositionMissile + missile.width / 2 <= horizontalPositionUfo + ufo.width) &&
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
}