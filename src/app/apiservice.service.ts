import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor( private _http:HttpClient) { }

  //conect frontend to backend
  apiUrl =  'http://localhost:3000/empleado';

   //get all data
  getAllData():Observable<any>
  {
    return this._http.get(`{$this.apiUrl}`);
  }

  //create data 
  createData(data:any):Observable<any>
  {
    console.log(data,'createapi=>');

    return this._http.post(`{$this.apiUrl}`,data);  
  }

  //delete
  deleteData(idempleado:any):Observable<any>
  {
    let ids = idempleado;
    return this._http.delete(`{$this.apiUrl}/${ids}`);
  }
  //update data
  updateData(data:any,idempleado:any):Observable<any>
  {
    let ids = idempleado;
  return this._http.put(`${this.apiUrl}/${ids}`,data);
  }
  //getsingledata
  getSingleData(idempleado:any):Observable<any>
  {
    let ids = idempleado;
    return this._http.get(`{$this.apiUrl}/${ids}`); 
  }



}





