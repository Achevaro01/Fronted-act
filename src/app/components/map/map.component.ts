import {MouseEvent} from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { Coordenada } from '../../models/coordenada';

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  ubicacionCentral: Coordenada;
  ibicacionEnProceso: Coordenada;

  coordenadas: Coordenada[] = [];

  constructor() { }

  ngOnInit(): void {
    this.ubicacionCentral = new Coordenada(37.34314216219692, -5.9554033628759235);
  }


  mapClicked($event: MouseEvent) {
    console.log($event);
    let coord = new Coordenada($event.coords.lat, $event.coords.lng);
    this.coordenadas.push(coord);

  }
}
