import { Order } from './../Models/Order.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = ' http://localhost:8080/api';
  private cartOrder: { idClient: number; data: Ligne[]; supplier_name: string; username: string; status: string } = {
    idClient: 0,
    data: [new Ligne('first')],
    username : '',
    supplier_name : '',
    status : '',
  };

  carts$ = new BehaviorSubject<CartOrder>(this.cartOrder);

  constructor(
    private http: HttpClient
  ) {}

  delete(id): any {
    if (this.cartOrder.data.length > 1) {
      this.cartOrder.data = this.cartOrder.data.filter((o) => o.id != id);
    }
    this.carts$.next(this.cartOrder);
  }

  getAllOrder(): Observable<any> {
    return this.http.get<any>(this.url + '/factures/all');
  }

  addLigne(): any {
    let prod = new Ligne(this.uuidv4());
    this.cartOrder.data.push(prod);
    this.carts$.next(this.cartOrder);
  }


  passOrder(): Observable<any>{
    return this.http.post(this.url + '/factures/', this.cartOrder,{responseType:"text"});
  }
  getCartOrder(): { idClient: number; data: Ligne[]; supplier_name: string; username: string; status: string }{
    return this.cartOrder;
  }

  getDetailsOrder(id): Observable<Order> {
    return this.http.get<Order>(this.url + '/factures/' + id);
  }

  valideLigne(item, id): any {
    let i = this.cartOrder.data.findIndex((p) => p.idLigne === id);
    this.cartOrder.data[i].quantity = item.quantity;
    this.cartOrder.data[i].unitPrice = item.unitPrice;
    this.cartOrder.data[i].id = item.idProduct;
  }
  setDataToCart(item): any{
    this.cartOrder.idClient = item.idClient;
    this.cartOrder.username = item.username;
    this.cartOrder.supplier_name = item.supplier_name;
    this.cartOrder.status = item.status
  }

  deleteOrderById(id): Observable<any> {
    return this.http.delete(this.url + '/factures/delete/' + id);
  }
  addToProducts(id): Observable<any> {
    return this.http.post(this.url + '/factures/addtoproducts/' + id,{});
  }
  getByIdProduct(id){
    return this.http.get(this.url+"/products/"+id);
  }
  uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

}

export class Ligne {
  public idLigne: string;

  public id : number;
  public quantity = 0;
  public unitPrice = 0;

  constructor(id: string) {
    this.idLigne = id;
  }
}

export class CartOrder {
  idClient: number;
  username : string;
  supplier_name : string;
  data: Ligne[];

  status : string;
}
