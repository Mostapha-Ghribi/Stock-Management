import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Models/Employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  baseUrl ="http://localhost:8080/api";


  getIEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseUrl + '/users/all')
  }


  addUser(user): Observable<any>{
    return this.http.post(this.baseUrl + '/users/', user);
  }


  deleteIEmployee(id: number): Observable<any>{
   return this.http.delete(this.baseUrl + '/users/delete/' + id , {responseType:"text",observe:"body"});
  }


  getByEmployeeId(id: number): Observable<Employee>{
      return this.http.get<Employee>(this.baseUrl + '/users/' + id);
  }

  updateEmployee(item): Observable<any>{
    return this.http.patch(this.baseUrl + '/users/update', item,{responseType:"text",observe:"body"});
   }



}
