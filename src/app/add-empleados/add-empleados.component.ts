
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { Empleados } from '../models/empleados';
import { EmpeladosService } from '../services/empelados.service';

@Component({
  selector: 'app-add-empleados',
  templateUrl: './add-empleados.component.html',
  styleUrls: ['./add-empleados.component.css']
})
export class AddEmpleadosComponent implements OnInit {

  public url: any;
  public status: any;
  public empleados: Empleados;
  public identity:any;
  public token: any;

  @ViewChild('closebutton') closebutton: { nativeElement: { click: () => void; }; }

  public form: FormGroup = new FormGroup({
    id : new FormControl(''),
    first_name : new FormControl(''),
    last_name : new FormControl(''),
    phone : new FormControl(''),
    email : new FormControl(''),
    address : new FormControl(''),

  });

  @Output() onSave : EventEmitter<any> = new EventEmitter<any>();
  public inEdit = false
  public inView = false

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _EmpeladosService: EmpeladosService,
    private _userService: UserServiceService,

  ) {
    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
   }

  ngOnInit(): void {
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
