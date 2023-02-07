import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../Models/Supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http:HttpClient) { }
  baseUrl ="http://localhost:8080/api";


  getSuppliers(): Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.baseUrl + '/suppliers/all',{responseType:"json"})
  }


  addSupplier(item): Observable<any>{
   return this.http.post(this.baseUrl + '/suppliers/', item,{responseType:"text",observe:"body"});
  }


  deleteSupplier(id:number): Observable<any>{
   return this.http.delete(this.baseUrl + '/suppliers/delete/' + id , {responseType:"text",observe:"body"});
  }


  getBySupplierId(id:number): Observable<Supplier>{
      return this.http.get<Supplier>(this.baseUrl + '/suppliers/' + id,{responseType:"json"});
  }
  updateSupplier(item): Observable<any>{
    return this.http.patch(this.baseUrl + '/suppliers/update', item,{responseType:"text",observe:"body"});
   }
   SuppliersByProudctId(id:number): Observable<any>{
    return this.http.get<any>(this.baseUrl + '/Supplier/product/' + id);
}
Supply(item): Observable<any>{
  return this.http.post(this.baseUrl + '/SupplierProduct/add', item);
 }


}
