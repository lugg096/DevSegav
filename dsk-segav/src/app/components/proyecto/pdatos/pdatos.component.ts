import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'proyecto-datos',
  templateUrl: './pdatos.component.html',
  styleUrls: ['./pdatos.component.scss']
})
export class PdatosComponent implements OnInit {

  @Input() proyectoForm: FormGroup;
  @Input() proyecto: any;

  public tipo_proyecto: Array<any> = [];
  public tipo_gerencia: Array<any> = [];
  public tipo_moneda: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.configForm();
    this.configData();
    this.getParametros();
  }

  private configData() {
    this.proyectoForm.patchValue(this.proyecto);
    if (this.proyecto.valorizacion)
      this.proyectoForm.get('f_inicio').disable();
  }

  private getParametros() {
    this.tipo_proyecto = JSON.parse(localStorage.getItem(env.PARAM.TIPO_PROYECTO));
    this.tipo_gerencia = JSON.parse(localStorage.getItem(env.PARAM.TIPO_GERENCIA));
    this.tipo_moneda = JSON.parse(localStorage.getItem(env.PARAM.TIPO_MONEDA));
  }

  private configForm() {
    this.proyectoForm.addControl('_id', new FormControl('', [Validators.required]));
    this.proyectoForm.addControl('tipo', new FormControl('', [Validators.required]));
    this.proyectoForm.addControl('longitud', new FormControl('', [Validators.required]));
    this.proyectoForm.addControl('poblacion', new FormControl('', [Validators.required]));
    this.proyectoForm.addControl('antecedente', new FormControl('', [Validators.required]));
    this.proyectoForm.addControl('alcance', new FormControl('', [Validators.required]));
    this.proyectoForm.addControl('nombre', new FormControl('', [Validators.required]));
    this.proyectoForm.addControl('codigo', new FormControl('', [Validators.required, Validators.pattern(/^\S{4,8}$/)]));
    this.proyectoForm.addControl('tipo_gerencia', new FormControl('', [Validators.required]));
    this.proyectoForm.addControl('tramo', new FormControl('', [Validators.required]));
    this.proyectoForm.addControl('sisin', new FormControl('', [Validators.required]));
    this.proyectoForm.addControl('f_inicio', new FormControl('', [Validators.required]));
    this.proyectoForm.addControl('tipo_moneda', new FormControl('', [Validators.required]));
  }

}
