import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

export const routes: Routes = [
    {path: '', redirectTo: '/landing', pathMatch: 'full'},
    {path: 'landing', component: LandingComponent},
    {path: 'proveedores', component: ProveedoresComponent},
];
