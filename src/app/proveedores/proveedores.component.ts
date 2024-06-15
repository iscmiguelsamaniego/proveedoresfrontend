import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedoresService } from '../services/proveedores.service';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {

  public listOfProveedores: Array<any> = [];
  public proveedoresForm: FormGroup;
  public createProveedorResult = "";
  public rowProveedorResult = "";
  private idProveedores = "";

  constructor(
    private router: Router,
    private proveedoresService: ProveedoresService,
    public fb: FormBuilder
  ) {
    this.proveedoresForm = fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        razonsocial: ['', [Validators.required, Validators.minLength(2)]],
        direccion: ['', [Validators.required, Validators.minLength(2)]],
      }
    );
  }

  ngOnInit(): void {
    this.loadProveedores();
  }

  saveData() {        
    this.proveedoresService.createProveedor(
      this.proveedoresForm.value.nombre,
      this.proveedoresForm.value.razonsocial,
      this.proveedoresForm.value.direccion
    ).subscribe(
      data => {
        this.createProveedorResult = "El registro se ha creado correctamente";
        this.loadProveedores();
        this.proveedoresForm.reset();
      },
      (err) => {
        console.log(err);
      }
    );
    
  }

  public getRowId(id: any) {
    this.idProveedores = ""; //todo clear this
    this.idProveedores = id;
  }

  public deleteProveedor(id: any) {
    this.proveedoresService.deleteProveedor(this.idProveedores).subscribe(
      data => {
        this.rowProveedorResult = data.response;
        location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private loadProveedores() {
    this.proveedoresService.getProveedores().subscribe(data => {
      this.listOfProveedores = data;

      console.log("loadProveedores-->" + data);
    },
      (err) => {
        console.log(err);
      }
    );
  }

  goToPage = (paramName: string) => {
    this.router.navigate([paramName]);
  }
}
