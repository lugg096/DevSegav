import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    // console.log('Guardado en el localStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {

    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log( 'Cargando del localstorage' );

      this.aplicarTema(this.ajustes.tema);

    } else {
      // console.log( 'Usando valores por defecto' );
      this.aplicarTema(this.ajustes.tema);
    }

  }

  aplicarTema(theme: string) {

    let tema = `fix-header card-no-border fix-sidebar ${theme}`;
    this._document.getElementById('tema').setAttribute('class', tema);

    this.ajustes.tema = tema;
    /* this.ajustes.temaUrl = url; */

    this.guardarAjustes();

  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
