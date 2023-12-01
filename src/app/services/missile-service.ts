import { EventEmitter, Injectable } from "@angular/core";
import { Missile } from "../models/missile.model";


@Injectable({
  providedIn: 'root'
})
export class MissileService {
  private _missile : Missile;

  constructor() {
    this._missile = new Missile();
  }

  arrowRightEmitter = new EventEmitter<void>();
  arrowLeftEmitter = new EventEmitter<void>();
  launchEmitter = new EventEmitter<void>();

  emitMissileRight() {
    this.arrowRightEmitter.emit();
  }

  emitMissileLeft() {  
    this.arrowLeftEmitter.next();
  }

  emitMissileLaunch() {
    this.launchEmitter.emit();
  }

  get missile() {
    return this._missile;
  }

  isLaunched() {
    return this._missile.launched;
  }
}