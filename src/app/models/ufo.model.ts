export class Ufo {
  height : number = 50;
  width : number = 50;
  left : number;
  bottom : number;
  top : number;
  src : string = "../../assets/ufo.png";
  step : number;

  constructor(left : number, top : number, bottom : number, step : number) {
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.step = step;
  }
}