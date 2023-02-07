import { Employee } from '../../../Shared/Models/Employee.model';
import { EmployeeService } from '../../../Shared/services/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css'],
})
export class ListCustomerComponent implements OnInit {
  users: Employee[];
  fullName;
  p = 1;
  isTrue: boolean;
  ErrorMessage: string;
  isSbmitted = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchdata();
  }

  fetchdata() {
    this.employeeService.getIEmployees().subscribe(
      (res) => {
        console.log(res)
        this.users = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  delete(id) {
    console.log(id)
    this.employeeService.deleteIEmployee(id).subscribe(
      (res) => {
        this.isTrue=true;
        this.fetchdata();
        this.ConfirmationMessage();
        this.ErrorMessage = 'supprimer avec succès';
      },
      (err) => {
        this.isTrue=false;
        this.ConfirmationMessage();
        this.ErrorMessage = 'impossible de supprimer cette utilisateur';
        console.log('error : ' + err);
      }
    );
  }

  ConfirmationMessage() {
    this.isSbmitted = true;
    setTimeout(() => {
      this.isSbmitted = false;
    }, 3000);
  }
}
