import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { CitasComponent } from './mantenimientos/citas/citas.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate:[ AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Achecars' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Redes Sociales' }},
            { path: 'redes-sociales', component: Grafica1Component, data: { titulo: 'Redes Sociales' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
            { path: 'cita', component: PromesasComponent, data: { titulo: 'cita' }},
            { path: 'grafica', component: Grafica1Component, data: { titulo: 'Gráficas' }},
            // { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},


            // Mantenimientos
            { path: 'usuarios', canActivate: [AdminGuard ], component: UsuariosComponent, data: { titulo: 'Usuario de aplicación' }},
            { path: 'citas',canActivate: [AdminGuard ], component: CitasComponent, data: { titulo: 'Vistas de citas' }},

        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


