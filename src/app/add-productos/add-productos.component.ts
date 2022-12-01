import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { Productos } from '../models/productos';
import { ProductosService } from '../services/productos.service';
@Component({
  selector: 'app-add-productos',
  templateUrl: './add-productos.component.html',
  styleUrls: ['./add-productos.component.css']
})
export class AddProductosComponent implements OnInit {
  public url: any;
  public status: any;
  public productos: Productos;
  public identity:any;
  public token: any;

  @ViewChild('closebutton') closebutton: { nativeElement: { click: () => void; }; }

  public form: FormGroup = new FormGroup({
    id : new FormControl(''),
    name : new FormControl(''),
    description : new FormControl(''),
    price : new FormControl(''),
    category : new FormControl(''),
    quantity : new FormControl(''),

  });

  @Output() onSave : EventEmitter<any> = new EventEmitter<any>();
  public inEdit = false
  public inView = false

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _productosSevice: ProductosService,
    private _userService: UserServiceService,

  ) {
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
   }

  ngOnInit(): void {
  }

  Save(){
    this._productosSevice.addProd(this.form.value,this.token).subscribe({
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
