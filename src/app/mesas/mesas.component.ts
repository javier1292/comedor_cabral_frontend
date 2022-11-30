import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddMesasComponent } from '../add-mesas/add-mesas.component';
import { Mesas } from '../models/mesas';
import { MesasService } from '../services/mesas.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {


  public url: any;
  public empleados: Array<Mesas>;
  public empleado: Mesas;
  public identity:any;
  public token: string;

  @ViewChild(
    AddMesasComponent
  ) addmodal: AddMesasComponent;
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _empleadosService: MesasService,
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
