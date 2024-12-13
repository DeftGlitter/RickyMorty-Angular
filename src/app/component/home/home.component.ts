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
  constructor(
    private restService: RestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  cargando: Boolean = false;
  personajes: Result[] = [];
  next?: string | null = null;
  prev: string | null = null;
  pageNum: number[] = [];
  currentPage: number = 1;

  public filtroNombre: string | null = null; // Indica si hay un filtro activo en la busqueda por nombre

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

  //Botones prev and next
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

  //seleccionar pagina
  cargarPagina(event: any): void {
    // const selectedPage = event.target.value; // Obtén el número de página seleccionado
    // const url = `https://rickandmortyapi.com/api/character?page=${selectedPage}`;
    // this.currentPage = +selectedPage; // Actualizamos la página actual
    // this.actualizarURL(); // Actualiza la URL con la página seleccionada
    // this.getAll(url); // Carga los datos de la página seleccionada
    const selectedPage = event.target.value; // Obtén la página seleccionada

    let url = '';
    if (this.filtroNombre) {
      // Si hay filtro de búsqueda, incluye el filtro en la URL
      url = `https://rickandmortyapi.com/api/character?name=${this.filtroNombre}&page=${selectedPage}`;
    } else {
      // Si no hay filtro, usa la URL general
      url = `https://rickandmortyapi.com/api/character?page=${selectedPage}`;
    }

    this.currentPage = selectedPage; // Actualiza el número de página actual
    this.getAll(url); // Llama al método para cargar los datos
  }

  // Método auxiliar para extraer el nombre del filtro desde la URL
  private getFilterFromUrl(url: string): string | null {
    const params = new URLSearchParams(url.split('?')[1]); // Obtén los parámetros
    return params.get('name'); // Devuelve el filtro si existe
  }

  // Actualiza la URL con el número de la página actual
  actualizarURL(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge', // Mantiene otros parámetros de la URL
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.cargando = true;
      this.route.queryParams.subscribe((response) => {
        const url = response['myUrl'];
        if (url) {
          this.filtroNombre = this.getFilterFromUrl(url); // Extrae el filtro de la URL
          this.getAll(url);
        } else {
          this.filtroNombre = null; // Reinicia el filtro si no hay búsqueda
          this.getAll('https://rickandmortyapi.com/api/character'); // Aquí simula obtener datos
        }
      });
    }, 1500); // Tiempo en milisegundos (3 segundos)
  }
}
