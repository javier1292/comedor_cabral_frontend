import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from '../models/menu';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { MenuService } from '../services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  public url: any;
  public empleados: Array<Menu>;
  public empleado: Menu;
  public identity: any;
  public token: string;

  @ViewChild(
    AddMenuComponent
  ) addmodal: AddMenuComponent;
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _empleadosService: MenuService,
    private _userService: UserServiceService,
  ) {
    this.token = _userService.gettoken();
    this.empleados = []
  }

  ngOnInit(): void {
    console.log(this._userService.gettoken())
    console.log(this.getEmpleados())
    this.getEmpleados();
  }

  delete(id: number) {
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

        this._empleadosService.deleteEmpleados(id, this.token).subscribe({
          next: (res) => {
            this.getEmpleados();
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Este registro fue eliminado correctamente!',
              'success'
            )
          },
          error: (err) => {
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
      next: (res) => {
        if (res.data
        ) {
          interface IProduct { id: number }
          type ItemType = { Product: IProduct }
          console.log(res.data)
          this.empleados = res.data.flatMap((item: ItemType) => item.Product)
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  CreateMode() {
    this.addmodal.inView = false;
    this.addmodal.inEdit = false;
    this.addmodal.form.enable();
    this.addmodal.Clear();
  }
}
