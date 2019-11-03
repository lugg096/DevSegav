import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Avance',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Agregar', url: '/proyecto-formulario' },
        { titulo: 'Administrar', url: '/proyecto-gestion' }
      ]
    },

  ];

  constructor() { }

}
