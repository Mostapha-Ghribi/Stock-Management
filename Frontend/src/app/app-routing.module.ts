import { DetailOrderComponent } from './Components/order/detail-order/detail-order.component';
import { AddOrderComponent } from './Components/order/add-order/add-order.component';
import { AddSupplierComponent } from './Components/Supplier/add-Supplier/add-supplier/add-supplier.component';
import { AddCustomerComponent } from './Components/Customer/add-customer/add-customer.component';
import { EditCustomerComponent } from './Components/Customer/edit-customer/edit-customer.component';
import { ListCustomerComponent } from './Components/Customer/list-customer/list-customer.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { LoginComponent } from './Components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './Components/Product/edit-product/edit-product.component';
import { ListProductComponent } from './Components/Product/list-product/list-product.component';
import { ListSupplierComponent } from './Components/Supplier/list-Supplier/list-supplier/list-supplier.component';
import { ListOrderComponent } from './Components/order/list-order/list-order.component';
import { SupplierDetailsComponent } from './Components/Supplier/supplier-details/supplier-details.component';
import { ProdutDetailsComponent } from './Components/Product/produt-details/produt-details.component';
import { AuthGuardGuard } from './Shared/helpers/auth-guard.guard';
import { EmployeeGuard } from './Shared/helpers/employee.guard';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import {EditSupplierComponent} from "./Components/Supplier/edit-Supplier/edit-supplier.component";
import {AddProductComponent} from "./Components/Product/add-Product/add-product.component";

const routes: Routes = [
  {path: '', redirectTo : "home/dashboard"  , pathMatch :"full"  },
  {path: 'home', redirectTo : "home/dashboard"  , pathMatch :"full"  },
  {path: 'login', component: LoginComponent},
  {path: 'home',
  component: SidebarComponent,canActivate :[AuthGuardGuard],
  children: [
    {path: 'customer', component: ListCustomerComponent, canActivate:[EmployeeGuard]},
    {path: 'customer/edit/:id', component: EditCustomerComponent, canActivate:[EmployeeGuard]},
    {path: 'customer/add', component: AddCustomerComponent, canActivate:[EmployeeGuard]},
    {path: 'order/add', component: AddOrderComponent, canActivate:[EmployeeGuard]},
    {path: 'order', component: ListOrderComponent},
    {path: 'order/details/:id', component: DetailOrderComponent},
    //product routing
    {path: 'products', component: ListProductComponent},
    {path: 'products/add', component: AddProductComponent},
    {path: 'products/edit/:id', component: EditProductComponent, canActivate:[EmployeeGuard]},
    {path: 'products/product-details/:id', component:ProdutDetailsComponent},
    //supplier routing
    {path: 'suppliers', component:ListSupplierComponent },
    {path: 'suppliers/supplier-details/:id', component:SupplierDetailsComponent},
    {path: 'suppliers/add', component: AddSupplierComponent},
    {path: 'suppliers/edit/:id', component: EditSupplierComponent},
    //employee
    {path: 'dashboard', component:DashboardComponent  , canActivate:[EmployeeGuard]}
  ]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
