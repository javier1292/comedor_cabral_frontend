import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public user: User;
  public status: string;

  constructor(private _userService:UserServiceService) {

    this.user = new User(
      '','','','1','','','',''
    );
   }

  ngOnInit(): void {


  }

  onSubmit(form:any){

    this._userService.Registro(this.user).subscribe(
      response =>{
        if(response.user && response.user._id){
          this.status = "success"
          form.reset();



        }else{
          this.status="error"
        }


      },
      error =>{
        this.status = "error"

      }
    )
  }

}
