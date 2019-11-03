import { RouterModule, Routes } from '@angular/router';

import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';


// Resolvers
import { ProyectoResolver, ProyectoListaResolver } from '../services/resolvers/proyecto.resolver';
import { PformularioComponent } from './proyecto/pformulario/pformulario.component';
import { PgestionComponent } from './proyecto/pgestion/pgestion.component';
import { VgestionComponent } from './valorizacion/vgestion/vgestion.component';
import { VformularioComponent } from './valorizacion/vformulario/vformulario.component';

const pagesRoutes: Routes = [
    { path: '', redirectTo: '/proyecto-gestion', pathMatch: 'full' },
    { path: 'proyecto-gestion', component: PgestionComponent, data: { titulo: 'Gestión de proyecto' } },
    { path: 'proyecto-formulario', component: PformularioComponent, resolve: { proyecto: ProyectoResolver }, data: { titulo: 'Proyecto formulario' } },
    { path: 'valorizacion-gestion', component: VgestionComponent, resolve: { proyectos: ProyectoListaResolver }, data: { titulo: 'Gestión de valorización' } },
  { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);