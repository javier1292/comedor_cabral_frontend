import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserServiceService } from './services/user-service.service';
import { global } from './services/Global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserServiceService]
})
export class AppComponent {
  public user: User;
  public status : any;
  public identity: any;
  public token: any;
  public url:any;


  constructor(
    private _userService: UserServiceService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {

    this.identity = this._userService.getidentity();
    this.token = this._userService.gettoken();
    this.url = global.url;
    this.user = new User(
      '', '', '', '', '', '', 'admin',''
    );
  }

  ngOnInit(): void {
    console.log(this.identity);
/*     console.log(this.token); */
  }

  ngDoCheck(): void {
    this.identity = this._userService.getidentity();
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/'])

  }

  onSubmit(form:any){
    try{
      this._userService.signup(this.user).subscribe(
        response =>{
          console.log(response.user)
          if (response.token && response.user){
            this.identity = response.user;
            localStorage.setItem('identity', JSON.stringify(this.identity));
            //conseguir token del usuario autentificado
            this._userService.signup(this.user, true).subscribe(
              response =>{
                if (response.token){
                  //guardar el token en una propiedad
                  this.token = response.token;
                  localStorage.setItem('token',this.token);

                  this.status = 'success';
                  this._router.navigate(['']);

                }else{
                  this.status = 'error'
                }
              },
              error=>{
                this.status = 'error'
                console.log(error)
              }
            )
          }else{
            this.status = 'error'
          }
        },
        error=>{
          this.status = 'error'
          console.log(error)
        }
      )
    }catch(error){

      error
    }


  }
}
