import { OrderProduct } from './OrderProduct';
import { Customer } from './Customer.model';
import {Product} from "./Products.model";
export class Order {
  id?: number;
  username: String;
  supplier_name: String;
  data: [dataOrder];
  status: String;
  orderDate?: Date;
  total: number;
}

export class dataOrder {
  product : Product[];
  total : number;
  unitPrice : number;
  quantity : number;
}
