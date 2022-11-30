import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { Ordenes } from '../models/ordenes';
import { OrdenesService } from '../services/ordenes.service';
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

  @ViewChild('closebutton') closebutton: { nativeElement: { click: () => void; }; }

  public form: FormGroup = new FormGroup({
    id : new FormControl(''),
    capacity : new FormControl(''),

  });

  @Output() onSave : EventEmitter<any> = new EventEmitter<any>();
  public inEdit = false
  public inView = false

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _EmpeladosService: OrdenesService,
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
