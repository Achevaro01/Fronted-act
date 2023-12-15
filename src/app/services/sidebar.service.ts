import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu =  [];

  cargarMenu() {
    this.menu = JSON.parse( localStorage.getItem('menu')) || [];
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Achecars',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Sobre nosotros', url: '/' },
  //       { titulo: 'Redes Sociales', url: 'redes-sociales' },
  //       { titulo: 'rxjs', url: 'rxjs' },
  //       { titulo: 'Promesas', url: 'promesas' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //     ]
  //   },

  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Citas', url: 'citas' },

  //     ]
  //   },
  // ];

  constructor() { }
}
