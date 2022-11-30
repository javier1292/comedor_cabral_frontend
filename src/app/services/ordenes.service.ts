import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }


  getEmpleados(token:string): Observable<any> {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );
    return this._http.get(this.url + 'order',{ headers: headers });
  }

  addEmpleado(activo: any,token:string): Observable<any> {
    let params = JSON.stringify(activo);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );
    return this._http.post(this.url + 'order', params, { headers: headers });
  }

  editEmpleados(cliente: any , id:any, token:any): Observable<any> {
    let params = JSON.stringify(cliente);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );

    return this._http.post(this.url + 'order/'+id+'/update', params, { headers: headers });
  }
  getClienteByID(id: any, token:any):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
    return this._http.get(this.url+'order/'+id+'/show',{headers: headers});
  }

  deleteEmpleados(clienteid: number, token:any): Observable<any> {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );
    return this._http.delete(this.url + 'order/'+clienteid+'/delete', {headers: headers});
  }
}
