import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedoresService } from '../services/proveedores.service';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent implements OnInit {

  public listOfProveedores: Array<any> = [];
  public proveedoresForm: FormGroup;
  public createProveedorResult = "";
  public rowProveedorResult = "";
  private idProveedores = "";
  public saveBtn = false;
  public updateBtn = false;
  public cancelEditBtn = false;

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
    this.btnsOnEditMode(false);
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
    this.idProveedores = "";
    this.idProveedores = id;
  }

  public prefillForUpdate(proveedores: any) {
    this.btnsOnEditMode(true);
    this.getRowId(proveedores.id);

    this.proveedoresForm.setValue(
      {
        nombre: proveedores.nombre,
        razonsocial: proveedores.razonsocial,
        direccion: proveedores.direccion
      }
    );
  }

  btnsOnEditMode(isEdit: boolean) {
    if (isEdit) {
      this.saveBtn = false;
      this.updateBtn = true;
      this.cancelEditBtn = true;
    } else {
      this.saveBtn = true;
      this.updateBtn = false;
      this.cancelEditBtn = false;
    }
  }

  public deleteProveedor(id : any) {
    if (confirm("¿Eliminar el registro permanentemente?, La operacion no se puede deshacer.")) {

      this.btnsOnEditMode(false);

      this.proveedoresService.deleteProveedor(id).subscribe(
        data => {
          this.rowProveedorResult = data.response;
          location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  public updateProveedor() {
    
    this.proveedoresService.updateProveedor(
      this.idProveedores,
      this.proveedoresForm.value.nombre,
      this.proveedoresForm.value.razonsocial,
      this.proveedoresForm.value.direccion
    ).subscribe(
      data => {
        this.rowProveedorResult = data.response;
        location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public clearMessages() {
    this.createProveedorResult = "";
  }

  public cancelUpdate() {
    this.btnsOnEditMode(false);
  }

  private loadProveedores() {
    this.proveedoresService.getProveedores().subscribe(data => {
      this.listOfProveedores = data;      
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
