import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paginate } from 'src/app/models/paginate.model';
import { environment as env } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValorizacionService {

  constructor(private _http: HttpClient) { }

  getById(id: string) {
    let URI = env.BASE.concat('valorizacion/obtener/', id);
    return this._http.get<any>(URI).pipe(
      map(res => {
        if(res.proyecto) res.proyecto.f_inicio = new Date(res.proyecto.f_inicio);
        return res;
      })
    );
  }

  getListByProject(paginate: Paginate, id: string) {
    let URI = env.BASE.concat('valorizacion/list');
    return this._http.post<any>(URI, { ...paginate, id: id });
  }

  saveList(data) {
    let URI = env.BASE.concat('valorizacion/saveList');
    return this._http.post<any>(URI, data);
  }

  totalByProject(id: string) {
    let URI = env.BASE.concat('valorizacion/total/', id);
    return this._http.get<any>(URI);
  }

  save(data: any) {
    let URI = env.BASE.concat('valorizacion/actualizar');
    return this._http.post<any>(URI, data);
  }

  send(data: any) {
    data.estado = env.STATUS.ENVI;
    let URI = env.BASE.concat('valorizacion/enviar');
    return this._http.post<any>(URI, data);
  }

  accept(data: any, estado: number) {
    data.estado = estado;
    let URI = env.BASE.concat('valorizacion/aceptar');
    return this._http.post<any>(URI, data);
  }

  observe(data: any, estado: number, msg: string) {
    data.estado = estado;
    data.observacion = msg;
    let URI = env.BASE.concat('valorizacion/observar');
    return this._http.post<any>(URI, data);
  }

}
