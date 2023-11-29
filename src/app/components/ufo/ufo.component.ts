import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ufo',
  templateUrl: './ufo.component.html',
  styleUrls: ['./ufo.component.css']
})
export class UfoComponent {
  @Input() height: number | undefined;

}
