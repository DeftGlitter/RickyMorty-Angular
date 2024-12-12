import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPersonajes } from '../model/IPersonajes.model';
import { IDetail } from '../model/IDetail.model';
import { ILocation } from '../model/ILocation.model';
import { IDetailLocation } from '../model/IDetailLocation.model';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private baseUrl: string = 'https://rickandmortyapi.com/api/character';
  private localUrl: string = 'https://rickandmortyapi.com/api/location';
  constructor(private httpClient: HttpClient) {}

  //Peticion personajes
  getAll(): Observable<IPersonajes> {
    return this.httpClient.get<IPersonajes>(this.baseUrl);
  }

  //Peticion detalles de personaje
  getDetail(url: string): Observable<IDetail> {
    return this.httpClient.get<IDetail>(url);
  }

  //peticion de locations
  getLocal(): Observable<ILocation> {
    return this.httpClient.get<ILocation>(this.localUrl);
  }

  //peticion de detalles de location
  getDetailLocation(url: string): Observable<IDetailLocation> {
    return this.httpClient.get<IDetailLocation>(url);
  }
}
