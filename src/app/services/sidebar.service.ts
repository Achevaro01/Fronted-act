import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Achecars',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Sobre nosotros', url: '/' },
        { titulo: 'Redes Sociales', url: 'redes-sociales' },
        { titulo: 'rxjs', url: 'rxjs' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'ProgressBar', url: 'progress' },
      ]
    },
  ];

  constructor() { }
}
