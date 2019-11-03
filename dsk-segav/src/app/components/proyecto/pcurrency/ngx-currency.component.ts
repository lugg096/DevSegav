import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'ngx-currency',
  templateUrl: './ngx-currency.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxCurrencyComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NgxCurrencyComponent), multi: true }
  ]
})
export class NgxCurrencyComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() moneda: string;
  @Input() placeholder: string;
  @Input() invalid : boolean = false;
  @Output() bEvent = new EventEmitter<any>();

  public display: any;
  private original: number;
  public state = false;

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (val: number) => void = () => { };

  constructor() { }

  ngOnInit() { }

  public onFocus() {
    this.display = this.original;
  }

  public onKeyup() {
    if (isNaN(Number(this.display))) {
      this.invalid = true;
      this.original = this.display;
      this.onChangeCallback(0);
    } else {
      this.invalid = false;
      this.onChangeCallback(0);
    }
  }

  public onBlur() {
    this.onTouchedCallback();
    if (!isNaN(Number(this.display))) {
      this.original = Number(this.display);
      this.bEvent.emit(this.original);
      this.onChangeCallback(this.original);
      this.display = this.pipeOriginal;
    }
  }

  public writeValue(value: number) {
    this.original = value ? value : 0;
    this.display = this.pipeOriginal;
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    this.state = isDisabled;
  }

  public validate(ac: FormControl) {
    return this.invalid ? { ngxcurrency: true } : null;
  }

  get pipeOriginal() {
    let value = new DecimalPipe('en-US').transform(this.original, '1.2-2');
    return this.moneda + '. ' + value;
  }

}
