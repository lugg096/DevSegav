import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/service.index';
import { Paginate } from 'src/app/models/paginate.model';

@Component({
  selector: 'app-pgestion',
  templateUrl: './pgestion.component.html',
  styleUrls: ['./pgestion.component.scss']
})
export class PgestionComponent implements OnInit {

  public loading = false;
  public paginate = new Paginate();
  public lista_proyectos = [];

  constructor(private _proyecto: ProyectoService) { }

  ngOnInit() {
    this.getProyectos();
    this.list_avances();
  }

  list_avances(){
    this._proyecto.listAvances("5dbd265f97df2f4ad455ea9d").subscribe(res => {
      console.log(res)
    });
  }


  getProyectos() {
    this.loading = true;
    this.lista_proyectos = [];
    this._proyecto.getAll(this.paginate)
      .subscribe(res => {
        this.lista_proyectos = res.data;
        this.paginate.total = res.total;
      }, _ => this.loading = false,
        () => this.loading = false);
  }

  pageChanged(event: any): void {
    this.paginate.page = event.page;
    this.paginate.skip = this.paginate.limit * (event.page - 1);
    this.getProyectos();
  }

}
