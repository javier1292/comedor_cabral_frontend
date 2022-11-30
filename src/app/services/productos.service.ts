import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }


  getProd(token:string): Observable<any> {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );
    return this._http.get(this.url + 'product',{ headers: headers });
  }

  addProd(prod: any,token:string): Observable<any> {
    let params = JSON.stringify(prod);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );
    return this._http.post(this.url + 'product', params, { headers: headers });
  }

  editEmpleados(prod: any , id:any, token:any): Observable<any> {
    let params = JSON.stringify(prod);
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );

    return this._http.post(this.url + 'product/'+id+'/update', params, { headers: headers });
  }
  getClienteByID(id: any, token:any):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', token);
    return this._http.get(this.url+'product/'+id+'/show',{headers: headers});
  }

  deleteEmpleados(id: number, token:any): Observable<any> {
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' +token );
    return this._http.delete(this.url + 'product/'+id+'/delete', {headers: headers});
  }
}
