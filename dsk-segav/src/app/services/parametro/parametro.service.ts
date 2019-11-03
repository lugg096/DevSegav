import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(private http: HttpClient) { }

  getAll() {
    let URI = env.BASE.concat('parametro/all');
    return this.http.get<any[]>(URI);
  }

  getById(id) {
    let URI = env.BASE.concat('parametro/get/', id);
    return this.http.get<any>(URI);
  }

  getByGroup( grupo ){
    let URI = env.BASE.concat('parametro/grupo/', grupo);
    return this.http.get<any>(URI);
  }

}
