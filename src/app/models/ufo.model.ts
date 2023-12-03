import { ElementRef, Renderer2 } from "@angular/core";

export class Ufo {
  height : number = 50;
  width : number = 50;
  left : number = 0;
  bottom : number;
  src : string = "../../assets/ufo.png";
  ufoRef: ElementRef;
  step : number = 2;

  constructor(private renderer : Renderer2, bottom : number) {
    this.ufoRef = new ElementRef(this.renderer.createElement('img'));
    this.bottom = bottom;
  }

  setInitialLeft() {
    let random = Math.random();
    this.left = random > 0.5 ? 0 : window.innerWidth - 50;
    this.renderer.setStyle(this.ufoRef.nativeElement, 'left', this.left + 'px');
  }

  setRandomStep() {
    let random = Math.random();
    this.step = random < 5 ? this.step * (-1) : this.step;
    let randomSpeed = Math.random();
    randomSpeed = randomSpeed < 0.3 ? 1 : randomSpeed;
    this.step *= randomSpeed;
  }

  moveUfo() {
    const leftLimit = 0;
    const left = this.getLeft();
    if (left + this.width > window.innerWidth || left < leftLimit) {
      this.step = this.step * (-1);
    }
    this.left = left + this.step;
    this.renderer.setStyle(this.ufoRef.nativeElement, 'left', (left + this.step) + 'px');
  }

  getLeft(): number {
    console.log(this.ufoRef.nativeElement.offsetLeft)
    return this.ufoRef.nativeElement.offsetLeft;
  }

  getBottom(): number {
    return this.bottom;
  }

  getRight(): number {
    return this.getLeft() + this.width;
  }
}
