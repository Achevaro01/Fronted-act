import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component {

  public labels1: string[] = ['2020', '2022', '2023'];
  public data1 = [
    [10, 15, 40],
  ];

}
