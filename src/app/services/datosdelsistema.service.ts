import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Constants } from '../utils/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatDatosdelSistema } from '../models/catdatosdelsistema';

@Injectable({
  providedIn: 'root'
})
export class DatosdelSistemaService {

  private datosdelsistemaApi = environment.baseUrl + Constants.datosdelsistemaApi;  
  private getDatosdelSistemaUrl = this.datosdelsistemaApi + Constants.read;  

  constructor(private _http: HttpClient) { }

  public getDatosdelSistema(): Observable<CatDatosdelSistema[]> {
    return this._http.get<CatDatosdelSistema[]>(this.getDatosdelSistemaUrl);
  }



}
