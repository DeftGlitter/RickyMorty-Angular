import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './component/detail/detail.component';
import { HomeComponent } from './component/home/home.component';
import { EpisodiosComponent } from './component/episodios/episodios.component';
import { LocationsComponent } from './component/locations/locations.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { DetailLocationComponent } from './component/detail-location/detail-location.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DetailComponent, HomeComponent, EpisodiosComponent, LocationsComponent, InicioComponent, DetailLocationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
