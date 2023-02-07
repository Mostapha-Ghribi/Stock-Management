import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap,map } from 'rxjs/operators';
import { Employee } from '../Models/Employee.model';
import {parseJson} from "@angular/cli/utilities/json-file";

@Injectable({
  providedIn: 'root'
})
export class LogInService {
   EmployeeSubject = new BehaviorSubject<Employee>(null);

  constructor(private http:HttpClient) { }
  baseUrl ="http://localhost:8080/api";

  public get currentEmployee(): Employee {
    let CurrentUser = localStorage.getItem('currentUser')
    let Emp = new Employee();
    let User = JSON.parse(CurrentUser);
    if(CurrentUser){
      Emp.isLoggedIn = User.isLoggedIn;
      Emp.fullName = User.fullName;
      Emp.username = User.username;
      Emp.role = User.role;
      Emp.id = User.id;
    }
    return Emp;
}

  LogIn(logindata): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/users/login',logindata,{observe : "response"}).pipe(map(data=>{
      const E = new Employee();
      E.username = data.body.username;
      E.role = data.body.role
      E.fullName = data.body.fullName;
      E.isLoggedIn = data.body.isLoggedIn;
      E.id = data.body.id;
     return E;
    }),tap(data=>{
      this.EmployeeSubject.next(data)
        localStorage.setItem("currentUser" ,JSON.stringify(data))
    }))
  }

  LogOut(_id): Observable<any>{
    console.log(_id)
    return this.http.post<any>(this.baseUrl + '/users/logout', {id : _id},{observe : "response"}).pipe(map(data=>{
      localStorage.removeItem('currentUser');
      return true;
    }),tap(data=>{
      this.EmployeeSubject.next(null);
    }))
  }

}
