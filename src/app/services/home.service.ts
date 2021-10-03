

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Financement } from '../models/financement';
import { Bailleur } from '../models/bailleur';
import { Type } from '../models/type';


@Injectable({
  providedIn: 'root'
})

export class HomeService {
  

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getFinancements(): Observable<Financement[]> {
    return this.http.get<Financement[]>(`${this.apiServerUrl}/financement`);
  }

  public getBailleurs(): Observable<Bailleur[]> {
    return this.http.get<Bailleur[]>(`${this.apiServerUrl}/bailleur`);
  }

  public getCountFinancement(): Observable<Financement[]> {
    return this.http.get<any>(`${this.apiServerUrl}/count`);
  }

  public addFinancement(financement: Financement): Observable<Financement> {
    return this.http.post<Financement>(`${this.apiServerUrl}/financement`, financement);
  }

  public updateFinancement(financement: Financement,financementId: number): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/financement/${financementId}`, financement);
  }

  public deleteFinancement(financementId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/financement/${financementId}`);
  }

  public exportToPdf(): Observable<void>{
    return this.http.get<any>(`${this.apiServerUrl}/financement/report/html`);
  }

  public linkBailleurTofinancement(financementId:number, bailleurId:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/bailleur/link/${financementId}/${bailleurId}`)
  }

  public getTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/type`)
  }


}