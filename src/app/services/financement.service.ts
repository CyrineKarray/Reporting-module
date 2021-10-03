import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Financement } from '../models/financement';


@Injectable({
  providedIn: 'root'
})

export class FinancementService {
  

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getFinancement(): Observable<Financement[]> {
    return this.http.get<Financement[]>(`${this.apiServerUrl}/financement`);
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


}