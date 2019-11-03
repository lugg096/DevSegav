import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Paginate } from 'src/app/models/paginate.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private _http: HttpClient) { }

  getAll(paginate: Paginate) {
    let URI = env.BASE.concat('proyecto/all');
    return this._http.post<any>(URI, { ...paginate });
  }

  listAll() {
    let URI = env.BASE.concat('proyecto/list');
    return this._http.get<any>(URI);
  }
  listAvances(id: string){
    let URI = 'https://08bxj8jfib.execute-api.us-east-1.amazonaws.com/dev/avance/usuario/?id='+ id;
    return this._http.get<any>(URI);
  }


  getById(id: string) {
    let URI = env.BASE.concat('proyecto/get?id=', id);
    return this._http.get<any>(URI).pipe(
      map(res => {
        console.log(res.f_inicio);
        res.f_inicio = new Date(res.f_inicio);
        res.vencimiento = new Date(res.vencimiento);

        return res;
      })
    );
  }

  montos() {
    let URL = env.BASE.concat('proyecto/montos');
    return this._http.get<any>(URL);
  }

  getWithRubro(id) {
    let URL = env.BASE.concat('proyecto/withRubro/', id);
    return this._http.get<any>(URL);
  }

  listRubrado(id) {
    let URL = env.BASE.concat('proyecto/listRubrado/', id);
    return this._http.get<any>(URL);
  }

}