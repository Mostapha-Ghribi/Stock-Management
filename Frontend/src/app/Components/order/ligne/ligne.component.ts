import { Product } from './../../../Shared/Models/Products.model';
import { ProductService } from './../../../Shared/services/product.service';
import { OrderService } from './../../../Shared/services/order.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ligne',
  templateUrl: './ligne.component.html',
  styleUrls: ['./ligne.component.css'],
})
export class LigneComponent implements OnInit {
  @Input()

  @Input() idLign : string;
  id: String;
  myForm: FormGroup;
  products = [];
  product;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getProducts();
  }

  createForm(): any {
    this.myForm = this.fb.group({
      quantity: ['', [Validators.required]],
      unitPrice: ['', [Validators.required]],
      total: ['', [Validators.required]],
      idClient: ['', [Validators.required]],
      idProduct: ['', [Validators.required]],
      idLigne:['', [Validators.required]]
    });
  }

  getProduct() {
    let id = this.myForm.get('idProduct').value;
    this.orderService.getByIdProduct(id).subscribe(
      (res) => {
        this.product = res;
    console.log("product",this.product);

      },
      (err) => {
        console.log(err);
      }
    );

  }

  deleteLign() {
    // console.log(this.id);
    this.orderService.delete(this.id);
  }

  valide(): any {
    console.log("valideLigne",this.myForm.value)

    this.orderService.valideLigne(this.myForm.value, this.idLign);
  }

  change(price,idProduct): any {
    let quantity = this.myForm.get('quantity').value;
    console.log(quantity)
    let total = quantity * price + ' DT'
    this.myForm.get('total').setValue(total);
    this.myForm.get('unitPrice').setValue(price);
    this.myForm.get('idProduct').setValue(idProduct);
    this.valide();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (res) => {
        console.log(res);
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
