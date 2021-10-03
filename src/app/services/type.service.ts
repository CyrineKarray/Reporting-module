

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private apiServerUrl = environment.apiBaseUrl
  constructor(private http:HttpClient) {}

  public getTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/type`)
  }

  
  public getType(TypeId: number): Observable<void> {
    return this.http.get<void>(`${this.apiServerUrl}/type/${TypeId}`);
  }


  public addType(type:Type) :Observable<void>{
    return this.http.post<void>(`${this.apiServerUrl}/type`,type)
  }

  public updateType(type:Type, TypeId:number|undefined):Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/type/${TypeId}`,type)
  }

  public deleteType(TypeId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/type/${TypeId}`)

  }
}