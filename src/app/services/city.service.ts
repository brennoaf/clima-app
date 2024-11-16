import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl = 'https://countriesnow.space/api/v0.1/countries/population/cities';

  constructor(private http: HttpClient) {}

  getCities(): Observable<any> {
    return this.http.post<any>(this.baseUrl, {}); // Enviando um objeto vazio para retornar todas as cidades
  }

  getCityData(city: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { city });
  }
}
