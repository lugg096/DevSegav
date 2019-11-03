import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProyectoService } from '../proyecto/proyecto.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoResolver implements Resolve<any> {

  constructor(private _proyecto: ProyectoService) { }

  resolve(route: ActivatedRouteSnapshot) {
    var id = route.queryParamMap.get('id');
    if (!id) return of({});
    return this._proyecto.getById(id).pipe(
      catchError(err => of(err))
    );
  }

}

@Injectable({
  providedIn: 'root'
})
export class ProyectoListaResolver implements Resolve<any> {

  constructor(private proyectoServ: ProyectoService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.proyectoServ.listAll().pipe(
      catchError(err => of(err))
    )
  }
}
