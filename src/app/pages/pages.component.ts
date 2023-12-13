import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../services/settings.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  imagePaths: string[] = [
    'assets/images/carrousel1.jpg',
    'assets/images/carrousel2.jpg',
    'assets/images/carrousel3.jpg',
    'assets/images/carrousel4.jpg',
  ];

  constructor( private settingsService: SettingsService ) { }

  ngOnInit(): void {
    customInitFunctions();
  }

}
