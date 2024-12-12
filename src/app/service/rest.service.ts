import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPersonajes } from '../model/IPersonajes.model';
import { IDetail } from '../model/IDetail.model';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private baseUrl: string = 'https://rickandmortyapi.com/api/character';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<IPersonajes> {
    return this.httpClient.get<IPersonajes>(this.baseUrl);
  }

  getDetail(url: string): Observable<IDetail> {
    return this.httpClient.get<IDetail>(url);
  }
}
