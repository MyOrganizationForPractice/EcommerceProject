import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import baseUrl from '../constant';
import { Country } from '../model/country';
import { State } from '../model/state';

@Injectable({
  providedIn: 'root'
})
export class LuvToShopFormService {

  constructor(private http: HttpClient) { }

  getCreditCardMonth(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYear(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }
    return of(data);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${baseUrl}/country/All`);
  }

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${baseUrl}/state/all`);
  }

  getStatesByName(countryName:string): Observable<State[]>{
    return this.http.get<State[]>(`${baseUrl}/state/all/${countryName}`);
  }
}
