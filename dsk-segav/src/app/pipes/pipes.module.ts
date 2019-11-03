import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { NgxCurrencyPipe } from './ngx-currency.pipe';
import { NgxEstadoPipe } from './ngx-estado.pipe';



@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    NgxCurrencyPipe,
    NgxEstadoPipe
  ],
  exports: [
    ImagenPipe,
    NgxCurrencyPipe,
    NgxEstadoPipe
  ]
})
export class PipesModule { }
