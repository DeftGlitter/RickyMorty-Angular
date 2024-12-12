import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPersonajes, Result } from 'src/app/model/IPersonajes.model';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private restService: RestService, private router: Router) {}

  cargando: Boolean = false;
  personajes: Result[] = [];
  getAll() {
    this.restService.getAll().subscribe((response: IPersonajes) => {
      this.personajes = response.results;
    });
  }

  getDetail(url: string) {
    this.router.navigate(['detail'], { queryParams: { url } });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.cargando = true;
      this.getAll(); // Aquí simula obtener datos
    }, 1500); // Tiempo en milisegundos (3 segundos)
  }
}
