import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleados } from '../models/empleados';
import { UserServiceService } from '../services/user-service.service';
import { EmpeladosService } from '../services/empelados.service';
import Swal from 'sweetalert2';
import { AddEmpleadosComponent } from '../add-empleados/add-empleados.component';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  public url: any;
  public empleados: Array<Empleados>;
  public empleado: Empleados;
  public identity:any;
  public token: string;

  @ViewChild(AddEmpleadosComponent) addmodal: AddEmpleadosComponent;
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _empleadosService: EmpeladosService,
    private _userService: UserServiceService,
  ) {
    this.token = _userService.gettoken();
   }

  ngOnInit(): void {
    console.log(this._userService.gettoken())
    this.getEmpleados();
  }

  delete(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "Esta accion no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this._empleadosService.deleteEmpleados(id,this.token).subscribe({
          next:(res)=>{
            this.getEmpleados();
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Este registro fue eliminado correctamente!',
              'success'
            )
          },
          error:(err)=>{
            console.log(err);
          }
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Accion cancelada',
          'error'
        )
      }
    })


  }

  getEmpleados() {
    this._empleadosService.getEmpleados(this.token).subscribe({
      next:(res)=>{
        if (res
        ) {
          this.empleados = res.data
        }
      },
      error:(err)=>{
        console.log(err);
      }
  })
  }

  CreateMode(){
    this.addmodal.inView=false;
    this.addmodal.inEdit=false;
    this.addmodal.form.enable();
    this.addmodal.Clear();
  }

}
