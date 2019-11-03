import { Component, OnInit, OnDestroy } from '@angular/core';
import { ValorizacionService } from 'src/app/services/valorizacion/valorizacion.service';
import { environment as env } from 'src/environments/environment';
import { Paginate } from 'src/app/models/paginate.model';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vgestion',
  templateUrl: './vgestion.component.html',
  styleUrls: ['./vgestion.component.scss']
})
export class VgestionComponent implements OnInit, OnDestroy {

  public last_id = '';
  public lista_proyectos = [];

  public loading = false;
  public paginate = new Paginate();
  public valorizaciones = [];

  private usuario = JSON.parse(localStorage.getItem('usuario'));
  private unsubscribe = new Subject<void>();

  constructor(private route: ActivatedRoute,
    private _valorizacion: ValorizacionService) { }

  ngOnInit() {
    this.getProyectos();

    if (this.lista_proyectos.length > 0) {
      this.last_id = this.lista_proyectos[0]._id;
      if (this.last_id) this.onPaginate(this.last_id);
    }
  }

  private getProyectos() {
    this.route.data.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(res => {
      if (res.proyectos)
        this.lista_proyectos = res.proyectos;
    })
  }

  public detalle(id: string) {
    this.last_id = id;
    this.onPaginate(id);
  }

  public onPaginate(id: string) {
    this.loading = true;
    this.valorizaciones = [];
    this._valorizacion.getListByProject(this.paginate, id)
      .subscribe(res => {
        this.valorizaciones = res.data;
        this.paginate.total = res.total;
      }, _ => this.loading = false,
      () => this.loading = false);
  }

  get allowAdd() {
    if (this.usuario.role == env.ROLE.EJECU) return true;
    return false;
  }

  public allowCheck(status: number) {
    if (this.usuario.role == env.ROLE.SUPER && status >= env.STATUS.ENVI) return true;
    else if (this.usuario.role == env.ROLE.FISCA && status >= env.STATUS.SUP_ACEP) return true;
    return false;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
