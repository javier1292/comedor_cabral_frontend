import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { Ordenes } from '../models/ordenes';
import { OrdenesService } from '../services/ordenes.service';
import { Productos } from '../models/productos';
import { Clientes } from '../models/clientes';
import { Mesas } from '../models/mesas';
import { ClienteService } from '../services/cliente.service';
import { MesasService } from '../services/mesas.service';
import { ProductosService } from '../services/productos.service';
@Component({
  selector: 'app-add-ordenes',
  templateUrl: './add-ordenes.component.html',
  styleUrls: ['./add-ordenes.component.css']
})
export class AddOrdenesComponent implements OnInit {
  public url: any;
  public status: any;
  public empleados: Ordenes;
  public identity:any;
  public token: any;
  public product: Array<Productos>;
  public customer: Array<Clientes>;
  public table: Array<Mesas>;

  @ViewChild('closebutton') closebutton: { nativeElement: { click: () => void; }; }

  public form: FormGroup = new FormGroup({
    id : new FormControl(''),
    table_id : new FormControl(''),
    customer_id : new FormControl(''),
    product_id : new FormControl(''),
    quantity : new FormControl(''),
  });

  @Output() onSave : EventEmitter<any> = new EventEmitter<any>();
  public inEdit = false
  public inView = false

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _EmpeladosService: OrdenesService,
    private _userService: UserServiceService,
    private _clienteS: ClienteService,
    private _mesasS: MesasService,
    private _prodS: ProductosService,

  ) {
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.product= []
    this.customer= []
    this.table= []
   }

  ngOnInit(): void {
    this.getmesas();
    this.getcleinte()
    this.getProducto();
  }
  getProducto() {
    this._prodS.getProd(this.token).subscribe({
      next:(res)=>{
        if (res
        ) {
          this.product = res.data
        }
      },
      error:(err)=>{
        console.log(err);
      }
  })
  }
  getmesas() {
    this._mesasS.getEmpleados(this.token).subscribe({
      next:(res)=>{
        if (res
        ) {
          this.table = res.data
        }
      },
      error:(err)=>{
        console.log(err);
      }
  })
  }
  getcleinte() {
    this._clienteS.getClientes(this.token).subscribe({
      next:(res)=>{
        if (res
        ) {
          this.customer = res.data
        }
      },
      error:(err)=>{
        console.log(err);
      }
  })
  }



  Save(){
    this._EmpeladosService.addEmpleado(this.form.value,this.token).subscribe({
      next:(res)=>{

        if (res.succeded) {
          this.onSave.emit(true);
          this.Clear();
          this.closebutton.nativeElement.click();
        } else {

          res.errors.forEach((element: any) => {
            console.log(element);
          });
        }

      },
      error:(err)=>{
        this.status = 'error'
        console.log(err)
      }

    });
  }


  onSubmit() {

      this.Save();

  }

  Clear(){
    this.form.patchValue({
      activoFijoId: 0,
      descripcion: '',
      departamentoId: 0,
      tipoActivoId: 0,
      fechaRegistro: null,
      valorCompra: 0,
      depreciacionAcumulada: 0
    })
  }

}
