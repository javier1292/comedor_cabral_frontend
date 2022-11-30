import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }


  getClientes(token:string): Observable<any> {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );
    return this._http.get(this.url + 'customer',{ headers: headers });
  }

  addClietes(activo: any,token:string): Observable<any> {
    let params = JSON.stringify(activo);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );
    return this._http.post(this.url + 'customer', params, { headers: headers });
  }

  editClientes(cliente: any , id:any, token:any): Observable<any> {
    let params = JSON.stringify(cliente);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );

    return this._http.post(this.url + 'customer/'+id+'/update', params, { headers: headers });
  }
  getClienteByID(id: any, token:any):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );
    return this._http.get(this.url+'customer/'+id+'/show',{headers: headers});
  }

  deleteClientes(clienteid: number, token:any): Observable<any> {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );
    return this._http.delete(this.url + 'customer/'+clienteid+'/delete', {headers: headers});
  }
}
