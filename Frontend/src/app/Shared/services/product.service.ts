import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/Products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) { }
  baseUrl ="http://localhost:8080/api";


  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + '/products/all',{responseType:"json"})
  }
  getProductsRefs(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + '/products/refs',{responseType:"json"})
  }
  addProduct(item): Observable<any>{
   return this.http.post(this.baseUrl + '/products/', item,{responseType:"text"});
  }
  deleteProduct(id): Observable<any>{
   return this.http.delete(this.baseUrl + '/products/delete/' + id , {responseType:"text",observe:"body"});
  }
  getByProductId(id:number): Observable<any>{
    return this.http.get<Product>(this.baseUrl + '/products/' + id,{responseType:"json"});
  }

  updateProduct(item): Observable<any>{
    return this.http.patch(this.baseUrl + '/products/update/', item,{responseType:"text",observe:"body"});
   }
   ProudctBYSupplierId(item:number): Observable<Product>{
    return this.http.get<Product>(this.baseUrl + '/product/supplier/'+item);
   }
}
