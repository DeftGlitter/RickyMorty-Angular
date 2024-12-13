import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  next?: string | null = null;
  prev: string | null = null;
  pageNum: number[] = [];
  currentPage: number = 1;

  getAll(url: any) {
    this.restService.getAll(url).subscribe((response: IPersonajes) => {
      this.personajes = response.results;

      this.next = response.info.next;
      this.prev = response.info.prev;

      // this.pageNum = response.info.pages;
      this.pageNum = Array.from(
        { length: response.info.pages },
        (_, i) => i + 1
      );
    });
  }

  getDetail(url: string) {
    this.router.navigate(['detail'], { queryParams: { url } });
  }

  cambiarPagina(direction: string): void {
    let url = '';

    if (direction === 'prev' && this.prev) {
      url = this.prev;
      this.currentPage--; // Decrementa la página actual
    } else if (direction === 'next' && this.next) {
      url = this.next;
      this.currentPage++; // Incrementa la página actual
    }

    if (url) {
      this.getAll(url); // Carga los datos de la nueva página
    }
  }

  cargarPagina(event: any): void {
    const selectedPage = event.target.value; // Obtén el número de página seleccionado
    const url = `https://rickandmortyapi.com/api/character?page=${selectedPage}`;
    this.currentPage = selectedPage; // Actualizamos la página actual
    this.getAll(url); // Carga los datos de la página seleccionada
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.cargando = true;
      this.getAll('https://rickandmortyapi.com/api/character'); // Aquí simula obtener datos
    }, 1500); // Tiempo en milisegundos (3 segundos)
  }
}
