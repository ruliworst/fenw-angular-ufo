import { Injectable, OnDestroy } from "@angular/core";
import { Ufo } from "../models/ufo.model";
import { PreferencesService } from "./preferences-service";

@Injectable({
  providedIn: 'root'
})
export class UfoService {
  private _ufos : Ufo[] = [];

  constructor(private preferencesService : PreferencesService) {
    this.setUfos();
  }

  setUfos() {
    let top = 0;
    let bottom = 450;
    for (let i = 0; i < this.preferencesService.ufosNumber; i++, top += 50, bottom += 50) {
      let random = Math.random();
      let left = random > 0.5 ? 0 : window.innerWidth - 50;
      let step = 4;
      step = random < 5 ? step * (-1) : step;
      let randomSpeed = Math.random() * 3;
      randomSpeed = randomSpeed < 1 ? 1 : randomSpeed;
      step *= randomSpeed;

      this._ufos.push(new Ufo(left, top, bottom, step))
    }
  }

  get ufos() {
    return this._ufos;
  }
}