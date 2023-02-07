import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../Shared/services/employee.service";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  myForm: FormGroup;
  isTrue=true;
  ErrorMessage: string="kjkjkj";
  isSbmitted = false;
  listRoles;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.listRoles = [
      {
        name : 'admin'
      },
      {
        name : 'user'
      }
    ]
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      username: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    this.isSbmitted = true;
    this.employeeService.addUser(this.myForm.value).subscribe(
      (res) => {
        // this.myForm.reset(this.myForm.value);
        this.isTrue=true;
        this.ConfirmationMessage();
        this.myForm.reset();
        this.ErrorMessage = 'Client ajouté avec succès';
      },
      (err) => {
        this.isTrue=false;
        this.isSbmitted = false;
        this.ConfirmationMessage();
        this.ErrorMessage = 'problème dans l\'ajout';
        console.log('error  : ' + err);
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
