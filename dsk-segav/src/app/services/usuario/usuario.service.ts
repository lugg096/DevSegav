import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    this.cargarStorage();
  }


  renuevaToken() {

    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        console.log('Token renovado');

        return true;
      }),
      catchError(err => {
        this.router.navigate(['/login']);
        swal('No se pudo renovar token', 'No fue posible renovar token', 'error');
        return Observable.throw(err);
      })
    );
  }


  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage(usuario: Usuario, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token }).pipe(
      map((res: any) => {
        this.guardarStorage(res.usuario, res.token);
        return true;
      })
    );


  }

  login(usuario: Usuario) {
    let URI = "http://localhost:3000/login";
    return this.http.post(URI, usuario).pipe(
      map((res: any) => {
        if (!res.usuario.image_path) res.usuario.image_path = 'man.png';
        this.guardarStorage(res.usuario, res.token);
        return true;
      }),
      catchError(err => {
        swal('Error en el login', err.error.mensaje, 'error');
        return throwError(err);
      })
    );

  }


  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {

        swal('Usuario creado', usuario.username, 'success');
        return resp.usuario;
      }),
      catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {

        if (usuario._id === this.usuario._id) {
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB, this.token);
        }

        swal('Usuario actualizado', usuario.name, 'success');

        return true;
      }),
      catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      })
    );

  }



  cargarUsuarios(desde: number = 0) {

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);

  }

  buscarUsuarios(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => resp.usuarios)
    );

  }

  borrarUsuario(id: string) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(
      map(resp => {
        swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
        return true;
      })
    );

  }

}
