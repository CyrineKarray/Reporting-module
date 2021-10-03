import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bailleur } from '../models/bailleur';

@Injectable({
  providedIn: 'root'
})

export class BailleurService {
  

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getBailleurs(): Observable<Bailleur[]> {
    return this.http.get<Bailleur[]>(`${this.apiServerUrl}/bailleur`);
  }

  public getBailleur(BailleurId: number): Observable<void> {
    return this.http.get<void>(`${this.apiServerUrl}/bailleur/${BailleurId}`);
  }


  public addBailleur(Bailleur: Bailleur): Observable<Bailleur> {
    return this.http.post<Bailleur>(`${this.apiServerUrl}/bailleur`, Bailleur);
  }

  public updateBailleur(Bailleur: Bailleur,BailleurId: number): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/bailleur/${BailleurId}`, Bailleur);
  }

  public deleteBailleur(BailleurId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/bailleur/${BailleurId}`);
  }

  public exportToPdf(): Observable<void>{
    return this.http.get<any>(`${this.apiServerUrl}/bailleur/report/pdf`);
  }

  public linkBailleurTofinancement(financementId:number, bailleurId:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/bailleur/link/${financementId}/${bailleurId}`)
  }
}