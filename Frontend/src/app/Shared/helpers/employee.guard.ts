import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInService } from '../services/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(private loginService: LogInService , private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentEmployee = this.loginService.currentEmployee
      if(currentEmployee.role==="admin"){
        return true;
      }
    if(currentEmployee.role==="user"){
      this.router.navigate(["/home/products"]);
      return false
    }
    this.router.navigate(["/login"]);
    return false;
  }

}
