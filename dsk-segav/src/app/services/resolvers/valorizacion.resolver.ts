import { Injectable } from '@angular/core';
import { ValorizacionService } from '../valorizacion/valorizacion.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValorizacionResolver implements Resolve<any> {

  constructor(private _valorizacion: ValorizacionService) { }

  resolve(route: ActivatedRouteSnapshot) {
    var id = route.queryParamMap.get('id');
    return this._valorizacion.getById(id).pipe(
      catchError(err => of(err))
    );
  }

}

@Injectable({
  providedIn: 'root'
})
export class ValorTotalResolver implements Resolve<any> {

  constructor(private _valorizacion: ValorizacionService) { }

  resolve(route: ActivatedRouteSnapshot) {
    var id = route.queryParamMap.get('id');
    return this._valorizacion.totalByProject(id).pipe(
      catchError(err => of(err))
    );
  }

}
