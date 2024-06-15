import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosdelSistemaService } from '../services/datosdelsistema.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NgIf],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {

  public listOfDatosdelSistema: Array<any> = [];
  public mensagealusuario = "";
  public versiondelsistema = "";

  constructor(
    private router: Router,
    private datosdelSistemaService: DatosdelSistemaService
  ) { }

  ngOnInit(): void {
    this.loadDatosdelSistema();
  }

  goToPage = (paramName: string) => {
    this.router.
      navigate([paramName]);
  }

  private loadDatosdelSistema() {
    this.datosdelSistemaService.getDatosdelSistema().subscribe(data => {
      this.listOfDatosdelSistema = data;        
        
        for (var values of this.listOfDatosdelSistema) {        
            this.mensagealusuario = values.msgAlUsuario;
            this.versiondelsistema = values.version;
        }
    },
      (err) => {
        console.log(err);
      }
    );
  }

}
