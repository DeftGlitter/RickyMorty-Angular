import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { DetailComponent } from './component/detail/detail.component';
import { EpisodiosComponent } from './component/episodios/episodios.component';
import { LocationsComponent } from './component/locations/locations.component';
import { InicioComponent } from './component/inicio/inicio.component';

const appRoutes: Routes = [
  { path: 'Inicio', component: InicioComponent },
  { path: '', component: HomeComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'episodios', component: EpisodiosComponent },
  { path: 'location', component: LocationsComponent },
  // { path: 'actualiza/:id', component:  },
  // { path: 'login', component:  },
  // { path: '**', component: ErrorPersonalizadoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
