import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntregaInventarioComponent } from './dashboard/pages/entrega.component';
import { RegistroDeInventarioComponent } from './dashboard/pages/registro.component';
import { EquipoComponent } from './dashboard/pages/equipo.component';


export const routes: Routes = [


  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [

      {
        path: 'registro',
        title: 'Registro',
        data: { subtitle: 'Inventario' },
        component: RegistroDeInventarioComponent,
      },
     
      {
        path: 'entrega',
        title: 'Entrega',
        data: { subtitle: 'Inventario' },
        component: EntregaInventarioComponent
      },
      {
        path: 'equipo',
        title: 'Aspirante',
        data: { subtitle: 'FullStack' },
        component: EquipoComponent
      },
      {
        path: '',
        redirectTo: 'entrega',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }

];
