import { ProductService } from '../../../Shared/services/product.service';
import { OrderService } from '../../../Shared/services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CartOrder } from 'src/app/Shared/services/order.service';
import {Supplier} from "../../../Shared/Models/Supplier.model";
import {SupplierService} from "../../../Shared/services/supplier.service";
import {Employee} from "../../../Shared/Models/Employee.model";
import {LogInService} from "../../../Shared/services/log-in.service";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  opValide = false;

  suppliers : Supplier[]=[];
  cartOrder$: CartOrder;
  myForm: FormGroup;

  currentEmployee : Employee;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private supplierService: SupplierService,
    private productService: ProductService,
    private logInService : LogInService
  ) {}
  // constructor(){}

  ngOnInit(): void {
    this.currentEmployee= this.logInService.currentEmployee
    console.log(this.currentEmployee)
    this.opValide = false;
    this.createForm();
    this.orderService.carts$.subscribe((res) => (this.cartOrder$ = res));
    this.getClient();
  }

  createForm(): any {
    this.myForm = this.fb.group({
      idClient: ['', [Validators.required]],
    });
  }

  valide(): any {
    let Supplier_name = this.myForm.get('idClient').value;
    let data = {
      idClient : 0,
      username : this.currentEmployee.fullName,
      supplier_name : Supplier_name,
      status : 'delivered'
    }
    this.orderService.setDataToCart(data);
    this.orderService.passOrder().subscribe(data=>{
      console.log("done !")
    },error=>{
      console.log(error)
    })
  }

  AjouterLign() {
    this.orderService.addLigne();
    console.log(this.cartOrder$.data)
  }

  getClient() {
    this.supplierService.getSuppliers().subscribe(
      (res) => {
        this.suppliers = res;
      },
      (err) => console.log(err)
    );
  }



  // Scan
  fermer() {

    this.opValide = false;
  }
}
