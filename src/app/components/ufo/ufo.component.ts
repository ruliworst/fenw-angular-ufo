import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ufo',
  templateUrl: './ufo.component.html',
  styleUrls: ['./ufo.component.css']
})
export class UfoComponent implements OnInit {
  @Input() height : number = 0;
  @Input() left : number = 0;
  @Input() step : number = 5;
  @Input() bottom : number = 450;
  width : number = 50;
  moveUfoPID : any;
  rightLimit = window.innerWidth;

  ngOnInit(): void {
    this.moveUfoPID = setInterval(() => this.moveUfo(), 25);
  }

  moveUfo() {
    const leftLimit = 0;

    let hPosition = this.left;
    const ufoWidth = this.width;

    if (hPosition + ufoWidth > this.rightLimit || hPosition < leftLimit) {
      this.step = this.step * (-1);
    }

    hPosition = hPosition + this.step;
    this.left = hPosition;
  }
}
