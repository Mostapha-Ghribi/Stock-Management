import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import {ProductService} from "../../Shared/services/product.service";
import {SupplierService} from "../../Shared/services/supplier.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private productService:ProductService, private supplierService : SupplierService){

  }
  sumProducts;

  sumSuppliers;

  ngOnInit(): void {
          this.getTotalProducts()
          this.getTotalSuppliers();
  }

  getTotalProducts(){
    this.productService.getProducts().subscribe(data=>{
      this.sumProducts = data.length || 0
    })
  }

  getTotalSuppliers(){
    this.supplierService.getSuppliers().subscribe(data=>{
      this.sumSuppliers = data.length || 0
    })
  }

  }




