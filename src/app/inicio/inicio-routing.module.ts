import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
  },
  {
    path: '',
    component: InicioPage,
    children: [
      {
        path: 'perfil',
        loadChildren: () =>
          import('../perfil/perfil.module').then((m) => m.PerfilPageModule),
      },
      {
        path: 'publicar',
        loadChildren: () =>
          import('../publicar/publicar.module').then(
            (m) => m.PublicarPageModule
          ),
      },
      {
        path: 'publicaciones',
        loadChildren: () =>
          import('../publicaciones/publicaciones.module').then(
            (m) => m.PublicacionesPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/inicio/publicaciones',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/inicio/publicaciones',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
