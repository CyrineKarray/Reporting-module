

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import { Indicateur } from '../models/indicateur';

@Injectable({
  providedIn: 'root'
})
export class IndicateurService {
  private apiServerUrl = environment.apiBaseUrl
  constructor(private http:HttpClient) {}

  public getIndicateurs(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/indicateur`)
  }

  
  public getIndicateur(IndicateurId: number): Observable<void> {
    return this.http.get<void>(`${this.apiServerUrl}/indicateur/${IndicateurId}`);
  }



  public addIndicateur(indicateur:Indicateur) :Observable<void>{
    return this.http.post<void>(`${this.apiServerUrl}/indicateur`,indicateur)
  }

  public updateIndicateur(indicateur:Indicateur, IndicateurId:number|undefined):Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/indicateur/${IndicateurId}`,indicateur)
  }

  public deleteIndicateur(indicateurId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/indicateur/${indicateurId}`)

  }
}