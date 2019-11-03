import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-financiamiento',
  templateUrl: './add-financiamiento.component.html',
  styleUrls: ['./add-financiamiento.component.scss']
})
export class AddFinanciamientoComponent implements OnInit {

  public componentes = ['Obras Civiles', 'Supervison', '(PRP)', 'Programas Sociales', 'Fiscalizacion', 'Imprevistos'];
  public financiers = ['BID', 'Aporte Local'];

  public financiamForm: FormGroup;

  constructor(public bsModalRef: BsModalRef,
    private builder: FormBuilder) { }

  ngOnInit() {
    this.configForm();
  }

  public guardar() {
    if(this.financiamForm.invalid) return;
    this.bsModalRef.content.proyecto = this.financiamForm.value;
    this.bsModalRef.hide();
  }

  private configForm() {
    this.financiamForm =  this.builder.group({
      financiador: ['', Validators.required],
      componente: ['', Validators.required],
      monto: ['', Validators.required]
    });
  }

}
