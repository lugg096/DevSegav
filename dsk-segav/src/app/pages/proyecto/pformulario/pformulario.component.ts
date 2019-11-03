import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pformulario',
  templateUrl: './pformulario.component.html',
  styleUrls: ['./pformulario.component.scss']
})
export class PformularioComponent implements OnInit, OnDestroy {

  public proyecto: any = {};
  public proyectoForm: FormGroup;

  private unsubscribe = new Subject<void>();

  constructor(private builder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.configForm();
    this.getProyecto();
  }

  private getProyecto() {
    this.route.data.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(res => {
      if (res.proyecto._id) {
        this.proyecto = res.proyecto;
        this.proyectoForm.patchValue({ estado: 2 });
      }
    });
  }

  public guardar() {
    console.log(this.proyectoForm.value);
  }

  private configForm() {
    let usuario = localStorage.getItem('user_name');

    this.proyectoForm = this.builder.group({
      usuarios: [[usuario], Validators.required],
      estado: [1, Validators.required]
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
