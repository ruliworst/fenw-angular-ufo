export class Missile {
  height : number = 80;
  width : number = 40;
  left : number = window.innerWidth / 2;
  bottom : number = 0;
  src : string = "../../assets/missile.png";
  launched : boolean = false;

  constructor() { }
}