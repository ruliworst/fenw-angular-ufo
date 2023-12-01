import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private _ufosNumberKey = 'ufosNumber';
  private _playTimeKey = 'time';

  get ufosNumber(): number {
    let ufosNumberString = localStorage.getItem(this._ufosNumberKey);
    let ufosNumber = 1;

    if (ufosNumberString != null) {
      ufosNumber = parseInt(ufosNumberString);
    }

    return ufosNumber;
  }

  get playTime(): number {
    let playTimeString = localStorage.getItem(this._playTimeKey);
    let playTime = 60;

    if (playTimeString != null) {
      playTime = parseInt(playTimeString);
    }

    return playTime;
  }
}
