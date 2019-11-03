import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { ValorizacionService } from 'src/app/services/valorizacion/valorizacion.service';
import { environment as env } from 'src/environments/environment';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import swal from 'sweetalert';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vformulario',
  templateUrl: './vformulario.component.html',
  styleUrls: ['./vformulario.component.scss']
})
export class VformularioComponent implements OnInit, OnDestroy {

  public saving = false;
  public sending = false;
  public f_instance = false;
  public s_instance = false;

  public usuario: any;
  public moneda: string;
  public valorForm: FormGroup;
  private const_anvance: Array<any> = [];
  private total_avance: Array<any> = [];

  private unsubscribe = new Subject<void>();

  constructor(private builder: FormBuilder,
    private route: ActivatedRoute,
    private _valorizacion: ValorizacionService) { }

  ngOnInit() {
    this.configForm();
    this.getValorizacion();
  }

  private getValorizacion() {
    this.route.data.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(res => {
      if (res.valor)
        this.configData(res.valor);
      if (res.total)
        this.total_avance = res.total;
    });
  }

  private configData(valor) {
    if (valor.avances.length > 0) {
      this.createRubrado(valor.avances);
      this.const_anvance = valor.avances;
    }
    this.checkForm(valor.estado);
    this.valorForm.patchValue(valor);
    this.moneda = valor.proyecto.tipo_moneda;
  }

  public guardar() {
    this.saving = true;
    this._valorizacion.save(
      this.valorForm.getRawValue()
    ).subscribe(_ => {
      swal('Genial!', env.MSG.SUCC_GUA, 'success');
    }, _ => {
      swal('Lo sentimos!', env.MSG.ERR_REGIS, 'error');
      this.saving = false;
    }, () => this.saving = false);
  }

  public enviar() {
    swal({
      title: 'Confirmación',
      text: env.MSG.SEND_VALOR,
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancelar', 'Aceptar']
    }).then(res => {
      if (res) {
        this.sending = true;
        this._valorizacion.send(
          this.valorForm.getRawValue()
        ).subscribe(_ => {
          swal('Genial!', env.MSG.SUCC_ENV, 'success');
          this.estado.setValue(env.STATUS.ENVI);
          this.valorForm.disable();
        }, _ => {
          swal('Lo sentimos!', env.MSG.ERR_REGIS, 'error');
          this.sending = false;
          this.saving = false;
        }, () => {
          this.sending = false;
          this.saving = false;
        });
      }
    });
  }

  public aceptar() {
    swal({
      title: 'Confirmación',
      text: env.MSG.ACPT_VALOR,
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancelar', 'Aceptar']
    }).then(res => {
      if (res) {
        this.saving = true;
        let estado = this.usuario.roel == env.ROLE.SUPER ? env.STATUS.SUP_ACEP : env.STATUS.FIS_ACEP;
        this._valorizacion.accept(
          this.valorForm.getRawValue(), estado
        ).subscribe(_ => {
          swal('Genial!', env.MSG.SUCC_ACP, 'success');
          this.estado.setValue(estado);
          this.valorForm.disable();
        }, _ => {
          swal('Lo sentimos!', env.MSG.ERR_REGIS, 'error');
          this.sending = false;
          this.saving = false;
        }, () => {
          this.sending = false;
          this.saving = false;
        });
      }
    });
  }

  public observar() {
    swal({
      title: 'Confirmación',
      text: env.MSG.OBSR_VALOR,
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancelar', 'Aceptar']
    }).then(res => {
      if (res) {
        this.sending = true;
        let estado = this.usuario.role == env.ROLE.SUPER ? env.STATUS.SUP_OBSE : env.STATUS.FIS_OBSE;
        this._valorizacion.observe(
          this.valorForm.getRawValue(), estado, res.value
        ).subscribe(_ => {
          swal('Genial!', env.MSG.SUCC_OBS, 'success');
          this.estado.setValue(estado);
          this.valorForm.disable();
        }, _ => {
          swal('Lo sentimos!', env.MSG.ERR_REGIS, 'error');
          this.sending = false;
          this.saving = false;
        }, () => {
          this.sending = false;
          this.saving = false;
        });
      }
    });
  }

  public isInvalid(fg: FormGroup) {
    if (fg.controls.monto_avance.invalid && fg.controls.monto_avance.touched) return true;
    return false;
  }

  public errMessage(fg: FormGroup) {
    let retorno = 0, rubro = fg.get('rubro').value;
    let { monto_avance } = this.total_avance.find(t => t._id === rubro._id);
    let init = this.const_anvance.find(c => c.rubro._id === rubro._id);

    if (monto_avance) {
      retorno = rubro.monto - monto_avance;
      if (init.monto_avance) retorno = rubro.monto - (monto_avance - init.monto_avance);
    } else retorno = rubro.monto;

    let pipe = new DecimalPipe('en-US');
    return pipe.transform(retorno, '1.2-2');
  }

  public blurMonto(fg: FormGroup, valor) {
    let avance = Number(valor);

    if (!isNaN(avance)) {
      let rubro = fg.get('rubro').value;
      let { monto_avance } = this.total_avance.find(t => t._id === rubro._id);
      let init = this.const_anvance.find(c => c.rubro._id === rubro._id);

      if (monto_avance) {
        let current_monto = monto_avance;
        if (init.monto_avance) current_monto = monto_avance - init.monto_avance;
        avance = avance + current_monto;
      }

      let porcent = (avance / rubro.monto) * 100;
      fg.get('porcentaje_avance').setValue(porcent);
    }
  }

  get firstIntance() {
    if (this.usuario.role == env.ROLE.EJECU && (this.estado.value == env.STATUS.N_ENV
      || this.estado.value == env.STATUS.SUP_OBSE)) return true;
    return false;
  }

  get secondIntance() {
    if (this.usuario.role == env.ROLE.SUPER && (this.estado.value == env.STATUS.ENVI
      || this.estado.value == env.STATUS.FIS_OBSE)) return true;
    else if (this.usuario.role == env.ROLE.FISCA && this.estado.value == env.STATUS.SUP_ACEP) return true;
    return false;
  }

  get showAlert() {
    if (this.usuario.role == env.ROLE.EJECU && this.estado.value == env.STATUS.SUP_OBSE) return true;
    else if (this.usuario.role == env.ROLE.SUPER && this.estado.value == env.STATUS.FIS_OBSE) return true;
    return false;
  }

  private createRubrado(rubros: any[]) {
    for (let i = 0; i < rubros.length; i++) {
      this.avances.push(this.builder.group({
        _id: ['', Validators.required],
        rubro: this.builder.group({
          _id: ['', Validators.required],
          nombre: [''],
          monto: [0]
        }),
        monto_avance: [0, Validators.required],
        porcentaje_avance: [0]
      }, {
          validator: this.mayorAvance.bind(this)
        }));
    }
  }

  private checkForm(e: number) {
    if (this.usuario.role == env.ROLE.EJECU && (e == env.STATUS.N_ENV || e == env.STATUS.SUP_OBSE)) { }
    else if (this.usuario.role == env.ROLE.SUPER && (e == env.STATUS.ENVI || e == env.STATUS.FIS_OBSE)) { }
    else if (this.usuario.role == env.ROLE.FISCA && e == env.STATUS.SUP_ACEP) { }
    else this.valorForm.disable();
  }

  private configForm() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));

    this.valorForm = this.builder.group({
      _id: ['', Validators.required],
      proyecto: this.builder.group({
        _id: [''],
        nombre: [{ value: '', disabled: true }],
        f_inicio: [{ value: '', disabled: true }]
      }),
      mes: [{ value: 0, disabled: true }, Validators.required],
      anio: [{ value: 0, disabled: true }, Validators.required],
      avances: this.builder.array([]),
      monto_total_avance: [0],
      porcentaje_total_avance: [0],
      estado: [''],
      observacion: ['']
    });
  }

  get estado() { return this.valorForm.get('estado'); }
  get avances() { return this.valorForm.get('avances') as FormArray; }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  mayorAvance(ac: AbstractControl): ValidatorFn {
    let avance = Number(ac.get('monto_avance').value);

    if (!isNaN(avance)) {
      let rubro = ac.get('rubro').value;
      let total = this.total_avance.find(t => t._id === rubro._id);
      let init = this.const_anvance.find(c => c.rubro._id === rubro._id);

      if (total) {
        if (total.monto_avance) {
          let current_monto = total.monto_avance;
          if (init.monto_avance) current_monto = total.monto_avance - init.monto_avance;
          avance = avance + current_monto;
        }
      }

      if (avance > rubro.monto)
        ac.get('monto_avance').setErrors({ ismayor: true });
    }

    return null;
  }

}
