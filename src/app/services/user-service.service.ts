import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from './Global';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public url: string;
  public identity: any;
  public token: any;
  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  Registro(user: any): Observable<any> {
    //comvertir el  objeto del usuario a un json
    let params = JSON.stringify(user);

    //definir las cabeseras
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    //hacer peticiones ajax
    return this._http.post(this.url + 'usuarios/store', params, { headers: headers });
  }
  signup(user: any, gettoken = true): Observable<any> {
    user.gettoken = true;

    let params = JSON.stringify(user);

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'profile/login', params, { headers: headers });
  }

  getidentity(){
    let identity = JSON.parse(localStorage.getItem('identity')!);

    if(identity && identity !=null && identity != undefined && identity !="undefined"){

      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }
  gettoken(){
    let token = localStorage.getItem('token');

    if(token && token !=null && token != undefined && token !="undefined"){

      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  update(user:any):Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.gettoken());

    return this._http.post(this.url + 'user/update', params, { headers: headers })

  }
}
