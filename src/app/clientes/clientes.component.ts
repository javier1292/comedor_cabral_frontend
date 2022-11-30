import { Component, OnInit, ViewChild } from '@angular/core';
import { Clientes } from '../models/clientes';
import { AddClienteComponent } from '../add-cliente/add-cliente.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { global } from '../services/Global';
import Swal from 'sweetalert2';
import { UserServiceService } from '../services/user-service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public url: any;
  public clientes: Array<Clientes>;
  public cliente: Clientes;
  public identity:any;
  public token: string;

  @ViewChild(AddClienteComponent) addmodal: AddClienteComponent;
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _clientesService: ClienteService,
    private _userService: UserServiceService,
  ) {
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.url = global.url;
  }

  ngOnInit(): void {
    console.log(this._userService.gettoken())
    this.getClientes();
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

        this._clientesService.deleteClientes(id,this.token).subscribe({
          next:(res)=>{
            this.getClientes();
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

  getClientes() {
    this._clientesService.getClientes(this.token).subscribe({
      next:(res)=>{
        if (res
        ) {
          this.clientes = res.data
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
