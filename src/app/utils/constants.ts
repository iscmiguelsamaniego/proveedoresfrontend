import { HttpHeaders } from "@angular/common/http";

export class Constants {
    
    public static typeJsonHeader = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    public static proveedoresApi: string = "/proveedores";
    public static datosdelsistemaApi: string = "/datosdelsistema";
    public static create: string = "/create";    
    public static read: string = "/getAll";
    public static update: string = "/update";
    public static delete: string = "/delete";

}