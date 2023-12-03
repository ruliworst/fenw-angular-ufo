import { ElementRef, Renderer2 } from "@angular/core";

export class Missile {
  height : number = 80;
  width : number = 40;
  left : number = window.innerWidth / 2;
  bottom : number = 0;
  src : string = "../../assets/missile.png";
  launched : boolean = false;
  step : number = 6;

  missileRef: ElementRef;

  constructor(missileRef: ElementRef, private renderer: Renderer2) {
    this.missileRef = missileRef;
  }

  moveRight() {
    const left = this.getLeft();
    if (left + this.width + 8 < window.innerWidth && !this.launched) {
      this.left = left + this.step;
      this.renderer.setStyle(this.missileRef.nativeElement, 'left', this.left + 'px');
    }
  }

  moveLeft() {  
    const left = this.getLeft();
    if (left > 0 && !this.launched) {
      this.left = left - this.step;
      this.renderer.setStyle(this.missileRef.nativeElement, 'left', this.left + 'px');
    }
  } 

  moveUp(): void {
    this.bottom += this.step;
    this.renderer.setStyle(this.missileRef.nativeElement, 'bottom', this.bottom + 'px');
  }

  isMissileAtTop(): boolean {
    return this.missileRef.nativeElement.offsetTop <= 0;
  }

  getLeft(): number {
    return this.missileRef.nativeElement.offsetLeft;
  }

  reset(): void {
    this.bottom = 0;
    this.renderer.setStyle(this.missileRef.nativeElement, 'bottom', '0px');
  }
}