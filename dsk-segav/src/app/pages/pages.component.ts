import { Component, OnInit } from '@angular/core';
import { ParametroService } from '../services/parametro/parametro.service';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(private _parametro: ParametroService) { }

  ngOnInit() {
    init_plugins();
    this.getParametros();
  }

  private getParametros() {
    this._parametro.getAll()
      .subscribe(res => {
        if (res) this.saveLocalStorage(res);
      }, err => {
        console.error(err);
      });
  }

  private saveLocalStorage(parametros) {
    for (let p of parametros) {
      localStorage.setItem(p._id, JSON.stringify(p.parametros));
    }
  }

}
