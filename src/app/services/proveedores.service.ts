import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Constants } from '../utils/constants';
import { HttpClient } from '@angular/common/http';
import { CatProveedores } from '../models/catproveedores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private proveedoresApi = environment.baseUrl + Constants.proveedoresApi;
  private createProveedorUrl = this.proveedoresApi + Constants.create;
  private getProveedorsUrl = this.proveedoresApi + Constants.read;
  private updateProveedorUrl = this.proveedoresApi + Constants.update;
  private deleteProveedorUrl = this.proveedoresApi + Constants.delete;
  private jsonHeader = Constants.typeJsonHeader;

  constructor(private _http: HttpClient) { }

  public createProveedor(paramNombre: any, paramRazonsocial: any, paramDireccion: any): Observable<any> {
 
    return this._http.post<any[]>(
      this.createProveedorUrl,
      {
        nombre: paramNombre,
        razonsocial: paramRazonsocial,
        direccion: paramDireccion
      },
      this.jsonHeader
    );
  }

  public getProveedores(): Observable<CatProveedores[]> {
    return this._http.get<CatProveedores[]>(this.getProveedorsUrl);
  }


  public deleteProveedor(id: any): Observable<any> {
    return this._http.post<any>(this.deleteProveedorUrl, { id: id }, this.jsonHeader);
  }

  public updateProveedor(id: any, paramNombre: any, paramRazonsocial: any, paramDireccion: any): Observable<any> {

    return this._http.put<CatProveedores[]>(
      this.updateProveedorUrl, { 
        id: id,
        nombre: paramNombre,
        razonsocial: paramRazonsocial,
        direccion: paramDireccion 
      }, this.jsonHeader);
  }

}
