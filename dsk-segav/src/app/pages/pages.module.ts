
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';
import { NgxBootstrapModule } from './ngx-bootstrap.module';

import { ModalService } from '../services/shared/modal.service';

import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PformularioComponent } from './proyecto/pformulario/pformulario.component';
import { AddFinanciamientoComponent } from '../components/modals/add-financiamiento/add-financiamiento.component';
import { PgestionComponent } from './proyecto/pgestion/pgestion.component';
import { PdatosComponent } from '../components/proyecto/pdatos/pdatos.component';
import { VgestionComponent } from './valorizacion/vgestion/vgestion.component';
import { VformularioComponent } from './valorizacion/vformulario/vformulario.component';
import { NgxCurrencyComponent } from '../components/proyecto/pcurrency/ngx-currency.component';

@NgModule({
    declarations: [
        AccoutSettingsComponent,
        PformularioComponent,
        AddFinanciamientoComponent,
        PgestionComponent,
        PdatosComponent,
        VgestionComponent,
        VformularioComponent,
        NgxCurrencyComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        PipesModule,
        NgxBootstrapModule
    ],
    entryComponents: [
        AddFinanciamientoComponent
    ],
    providers: [
        ModalService
    ]
})
export class PagesModule { }
